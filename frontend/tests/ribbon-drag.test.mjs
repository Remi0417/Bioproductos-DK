import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import vm from "node:vm";
import ts from "typescript";

// Run the real interaction controller against a controlled animation timeline.
// Native pointer capture, touch scrolling and painted continuity need a browser.
const compiled = ts.transpileModule(
  readFileSync("apps/storefront/src/lib/util/ribbon-drag.ts", "utf8"),
  {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
    },
  },
).outputText;

class Target extends EventTarget {
  handlers = new Map();
  addEventListener(name, handler, options) {
    if (!this.handlers.has(name)) this.handlers.set(name, new Set());
    this.handlers.get(name).add(handler);
    super.addEventListener(name, handler, options);
  }
  removeEventListener(name, handler, options) {
    this.handlers.get(name)?.delete(handler);
    if (!this.handlers.get(name)?.size) this.handlers.delete(name);
    super.removeEventListener(name, handler, options);
  }
}

function emit(target, name, properties = {}) {
  const event = Object.assign(new Event(name, { cancelable: true }), {
    pointerId: 1,
    isPrimary: true,
    button: 0,
    clientX: 500,
    ...properties,
  });
  target.dispatchEvent(event);
  return event;
}

function mount({ reducedMotion = false, width = 1000 } = {}) {
  const viewport = new Target();
  const frames = new Map();
  let now = 0;
  let frameId = 0;
  viewport.performance = { now: () => now };
  viewport.requestAnimationFrame = (callback) => {
    frames.set(++frameId, callback);
    return frameId;
  };
  viewport.cancelAnimationFrame = (id) => frames.delete(id);
  const motion = Object.assign(new Target(), { matches: reducedMotion });
  viewport.matchMedia = () => motion;
  const animation = {
    animationName: "dk2-ribbon-loop",
    currentTime: 4500,
    playState: "running",
    playCalls: 0,
    effect: { getComputedTiming: () => ({ duration: 45000 }) },
    pause() {
      this.playState = "paused";
    },
    play() {
      this.playState = "running";
      this.playCalls++;
    },
  };
  const group = { getBoundingClientRect: () => ({ width }) };
  const track = { getAnimations: () => (motion.matches ? [] : [animation]) };
  const attributes = new Map([["aria-description", "Original description"]]);
  const captures = new Set();
  const region = Object.assign(new Target(), {
    dataset: {},
    keyboardFocus: false,
    captureUnavailable: false,
    querySelector(selector) {
      return selector === ".dk2-ribbon-track" ? track : group;
    },
    getAttribute: (name) => attributes.get(name) ?? null,
    setAttribute: (name, value) => attributes.set(name, value),
    removeAttribute: (name) => attributes.delete(name),
    matches() {
      return this.keyboardFocus;
    },
    setPointerCapture(id) {
      if (this.captureUnavailable) throw new Error("Capture unavailable");
      captures.add(id);
    },
    hasPointerCapture: (id) => captures.has(id),
    releasePointerCapture(id) {
      captures.delete(id);
      emit(region, "lostpointercapture", { pointerId: id });
    },
  });
  // A separate realm per mount supplies the controller's actual window binding.
  const module = {};
  vm.runInNewContext(compiled, { exports: module, window: viewport });
  const cleanup = module.attachRibbonDrag(region);
  return {
    region,
    viewport,
    motion,
    animation,
    captures,
    frames,
    cleanup,
    advance(milliseconds) {
      now += milliseconds;
      const pending = [...frames.values()];
      frames.clear();
      pending.forEach((callback) => callback(now));
    },
    setMotion(value) {
      motion.matches = value;
      emit(motion, "change");
    },
  };
}

test("ribbon keeps playing on hover; drag follows both directions and resumes at its new phase", () => {
  const view = mount();
  emit(view.region, "pointerenter");
  assert.equal(view.animation.playState, "running");
  emit(view.region, "pointerdown");
  assert.equal(view.animation.playState, "paused");
  assert.equal(view.region.dataset.dragging, "true");
  assert.equal(view.captures.size, 1);
  const move = emit(view.viewport, "pointermove", { clientX: 400 });
  assert.equal(move.defaultPrevented, true);
  assert.equal(view.animation.currentTime, 9000);
  emit(view.viewport, "pointermove", { clientX: 600 });
  assert.equal(view.animation.currentTime, 0);
  emit(view.viewport, "pointermove", { clientX: 800 });
  assert.equal(view.animation.currentTime, 36000);
  emit(view.viewport, "pointerup");
  assert.equal(view.animation.currentTime, 36000);
  assert.equal(view.animation.playState, "running");
  assert.equal(view.region.dataset.dragging, undefined);
  assert.equal(view.captures.size, 0);
  emit(view.viewport, "pointermove", { clientX: 100 });
  assert.equal(view.animation.currentTime, 36000);
  view.cleanup();
});

function flick(view, direction = -1, releasePhase) {
  emit(view.region, "pointerdown", { clientX: 500 });
  view.advance(40);
  emit(view.viewport, "pointermove", { clientX: 500 + direction * 120 });
  if (releasePhase !== undefined) view.animation.currentTime = releasePhase;
  emit(view.viewport, "pointerup");
  return view.animation.currentTime;
}

function pixelsBetween(from, to) {
  const phase = ((to - from + 67500) % 45000) - 22500;
  return (phase * 1000) / 45000;
}

test("fast flicks coast at a bounded speed, decelerate and return to normal playback", () => {
  const view = mount();
  const start = flick(view);
  assert.equal(view.region.dataset.coasting, "true");
  assert.equal(view.region.dataset.dragging, undefined);
  assert.equal(view.animation.playState, "paused");
  assert.equal(view.captures.size, 0);
  let previous = start;
  let previousSpeed = Infinity;
  for (const interval of [16, 200, 200]) {
    view.advance(interval);
    const speed =
      pixelsBetween(previous, view.animation.currentTime) / interval;
    assert.ok(speed > 1000 / 45000);
    assert.ok(speed <= 0.45);
    assert.ok(speed < previousSpeed);
    previousSpeed = speed;
    previous = view.animation.currentTime;
  }
  view.advance(2000);
  assert.equal(view.animation.playState, "running");
  assert.equal(view.region.dataset.coasting, undefined);
  assert.equal(view.frames.size, 0);
  const travel = pixelsBetween(start, view.animation.currentTime);
  assert.ok(travel > 100 && travel < 250);
  view.cleanup();
});

test("inertia crosses either loop boundary and a new grab stops it without resetting position", () => {
  for (const [direction, start] of [
    [-1, 44990],
    [1, 10],
  ]) {
    const view = mount();
    flick(view, direction, start);
    view.advance(16);
    const position = view.animation.currentTime;
    assert.ok(position >= 0 && position < 45000);
    assert.ok(pixelsBetween(start, position) * -direction > 0);
    if (direction === -1) assert.ok(position < 1000);
    else assert.ok(position > 44000);
    emit(view.region, "pointerdown");
    assert.equal(view.region.dataset.coasting, undefined);
    assert.equal(view.frames.size, 0);
    assert.equal(view.animation.currentTime, position);
    assert.equal(view.animation.playState, "paused");
    view.advance(500);
    assert.equal(view.animation.currentTime, position);
    emit(view.viewport, "pointerup");
    assert.equal(view.animation.playState, "running");
    view.cleanup();
  }
});

test("slow drags, a held release, tiny movements and pointer cancellation do not launch inertia", () => {
  for (const kind of ["slow", "held", "tiny", "cancelled", "lost capture"]) {
    const view = mount();
    emit(view.region, "pointerdown");
    view.advance(kind === "slow" ? 500 : 40);
    emit(view.viewport, "pointermove", {
      clientX: kind === "tiny" ? 506 : 450,
    });
    if (kind === "held") view.advance(120);
    if (kind === "lost capture") view.region.releasePointerCapture(1);
    else
      emit(view.viewport, kind === "cancelled" ? "pointercancel" : "pointerup");
    assert.equal(view.region.dataset.coasting, undefined, kind);
    assert.equal(view.frames.size, 0, kind);
    assert.equal(view.animation.playState, "running", kind);
    view.cleanup();
  }
});

test("holding before a fresh flick does not dilute the release velocity", () => {
  const view = mount();
  emit(view.region, "pointerdown");
  view.advance(500);
  emit(view.viewport, "pointermove", { clientX: 490 });
  view.advance(20);
  emit(view.viewport, "pointermove", { clientX: 390 });
  const start = view.animation.currentTime;
  emit(view.viewport, "pointerup");
  assert.equal(view.region.dataset.coasting, "true");
  view.advance(16);
  const speed = pixelsBetween(start, view.animation.currentTime) / 16;
  assert.ok(speed > 0.35 && speed <= 0.45);
  view.cleanup();
});

test("keyboard, viewport changes, reduced motion and cleanup cancel every pending inertia frame", () => {
  for (const kind of ["keyboard", "resize", "blur", "motion", "cleanup"]) {
    const view = mount();
    flick(view);
    view.advance(16);
    assert.equal(view.frames.size, 1);
    const plays = view.animation.playCalls;
    if (kind === "keyboard") {
      view.region.keyboardFocus = true;
      emit(view.region, "focusin");
      assert.equal(view.animation.playState, "paused");
      emit(view.region, "keydown", { key: "ArrowRight" });
    } else if (kind === "motion") {
      view.setMotion(true);
      assert.equal(view.animation.playCalls, plays);
    } else if (kind === "cleanup") view.cleanup();
    else emit(view.viewport, kind);
    assert.equal(view.frames.size, 0, kind);
    assert.equal(view.region.dataset.coasting, undefined, kind);
    const position = view.animation.currentTime;
    view.advance(500);
    assert.equal(view.animation.currentTime, position, kind);
    if (kind !== "cleanup") view.cleanup();
    for (const target of [view.region, view.viewport, view.motion])
      assert.equal(target.handlers.size, 0);
  }
});

test("inertial travel is independent of display frame rate and background frame delays stay bounded", () => {
  const fast = mount();
  const slow = mount();
  const background = mount();
  for (const view of [fast, slow, background]) flick(view);
  for (let t = 0; t < 2000; t += 16) fast.advance(16);
  for (let t = 0; t < 2000; t += 40) slow.advance(40);
  background.advance(60000);
  assert.ok(
    Math.abs(fast.animation.currentTime - slow.animation.currentTime) < 0.001,
  );
  assert.ok(
    Math.abs(fast.animation.currentTime - background.animation.currentTime) <
      0.001,
  );
  for (const view of [fast, slow, background]) {
    assert.equal(view.animation.playState, "running");
    assert.equal(view.frames.size, 0);
    view.cleanup();
  }
});

test("ribbon wraps multiple laps and ignores secondary buttons and unrelated pointers", () => {
  const view = mount();
  emit(view.region, "pointerdown", { button: 2 });
  emit(view.region, "pointerdown", { isPrimary: false });
  assert.equal(view.region.dataset.dragging, undefined);
  view.animation.currentTime = 0;
  emit(view.region, "pointerdown", { pointerId: 2, clientX: 0 });
  emit(view.region, "pointerdown", { pointerId: 3 });
  emit(view.viewport, "pointermove", { pointerId: 3, clientX: 100 });
  assert.equal(view.animation.currentTime, 0);
  emit(view.viewport, "pointermove", { pointerId: 2, clientX: 2250 });
  assert.equal(view.animation.currentTime, 33750);
  emit(view.viewport, "pointermove", { pointerId: 2, clientX: -2250 });
  assert.equal(view.animation.currentTime, 11250);
  emit(view.viewport, "pointerup", { pointerId: 3 });
  assert.equal(view.animation.playState, "paused");
  emit(view.viewport, "pointercancel", { pointerId: 2 });
  assert.equal(view.animation.playState, "running");
  assert.equal(view.captures.size, 0);
  view.cleanup();
});

test("release outside the ribbon, lost capture, resize and unmount cannot leave it dragging", () => {
  const view = mount();
  view.region.captureUnavailable = true;
  emit(view.region, "pointerdown");
  emit(view.viewport, "pointermove", { clientX: 400 });
  emit(view.viewport, "pointerup");
  assert.equal(view.animation.currentTime, 9000);
  assert.equal(view.animation.playState, "running");
  view.region.captureUnavailable = false;
  emit(view.region, "pointerdown");
  view.region.releasePointerCapture(1);
  assert.equal(view.region.dataset.dragging, undefined);
  assert.equal(view.animation.playState, "running");
  emit(view.region, "pointerdown");
  emit(view.viewport, "resize");
  assert.equal(view.region.dataset.dragging, undefined);
  emit(view.region, "pointerdown");
  view.cleanup();
  assert.equal(view.captures.size, 0);
  assert.equal(view.animation.playState, "running");
  assert.equal(view.region.dataset.draggable, undefined);
  assert.equal(
    view.region.getAttribute("aria-description"),
    "Original description",
  );
  for (const target of [view.region, view.viewport, view.motion])
    assert.equal(target.handlers.size, 0);
});

test("keyboard arrows move messages while focused, preserve browser shortcuts and resume on blur", () => {
  const view = mount();
  view.region.keyboardFocus = true;
  emit(view.region, "focusin");
  assert.equal(view.animation.playState, "paused");
  assert.equal(
    emit(view.region, "keydown", { key: "ArrowRight" }).defaultPrevented,
    true,
  );
  assert.equal(view.animation.currentTime, 9900);
  emit(view.region, "keydown", { key: "ArrowLeft" });
  assert.equal(view.animation.currentTime, 4500);
  assert.equal(
    emit(view.region, "keydown", { key: "ArrowRight", altKey: true })
      .defaultPrevented,
    false,
  );
  assert.equal(
    emit(view.region, "keydown", { key: "Tab" }).defaultPrevented,
    false,
  );
  assert.equal(view.animation.currentTime, 4500);
  view.region.keyboardFocus = false;
  emit(view.region, "focusout");
  assert.equal(view.animation.playState, "running");
  view.cleanup();
});

test("reduced motion disables interaction and changing preference cancels an active touch drag", () => {
  const view = mount({ reducedMotion: true });
  assert.equal(view.region.dataset.draggable, undefined);
  emit(view.region, "pointerdown", { pointerType: "touch" });
  assert.equal(view.region.dataset.dragging, undefined);
  assert.equal(
    emit(view.region, "keydown", { key: "ArrowRight" }).defaultPrevented,
    false,
  );
  view.setMotion(false);
  assert.equal(view.region.dataset.draggable, "true");
  emit(view.region, "pointerdown", { pointerType: "touch" });
  const plays = view.animation.playCalls;
  view.setMotion(true);
  assert.equal(view.animation.playCalls, plays);
  assert.equal(view.region.dataset.dragging, undefined);
  assert.equal(view.region.dataset.draggable, undefined);
  assert.equal(view.captures.size, 0);
  emit(view.viewport, "pointerup");
  assert.equal(view.animation.playCalls, plays);
  view.cleanup();
  const zeroWidth = mount({ width: 0 });
  emit(zeroWidth.region, "pointerdown");
  assert.equal(zeroWidth.region.dataset.dragging, undefined);
  zeroWidth.cleanup();
});
