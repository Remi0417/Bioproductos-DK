import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import vm from "node:vm";
import ts from "typescript";

// Execute the actual component effect with a controlled viewport/event loop.
// Browser layout, transitions and native focus still require Playwright.
const compiled = ts.transpileModule(
  readFileSync(
    "apps/storefront/src/modules/dk/editorial/site-enhancements.tsx",
    "utf8",
  ),
  {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
    },
  },
).outputText;

function mount({ initialY = 0, reducedMotion = false } = {}) {
  const events = new Map();
  const headerEvents = new Map();
  const frames = new Map();
  const styles = new Map();
  const motionEvents = new Map();
  let frameId = 0;
  let cleanup;
  const header = {
    dataset: {},
    style: {
      setProperty(name, value) {
        styles.set(name, value);
      },
    },
    offsetHeight: 104,
    open: false,
    keyboardFocus: false,
    querySelector(selector) {
      return this.open ||
        (selector.includes(":focus-visible") && this.keyboardFocus)
        ? {}
        : null;
    },
    addEventListener(name, callback) {
      headerEvents.set(name, callback);
    },
    removeEventListener(name) {
      headerEvents.delete(name);
    },
  };
  const motion = {
    matches: reducedMotion,
    addEventListener(name, callback) {
      motionEvents.set(name, callback);
    },
    removeEventListener(name) {
      motionEvents.delete(name);
    },
  };
  const viewport = {
    scrollY: initialY,
    innerHeight: 900,
    matchMedia: () => motion,
    addEventListener(name, callback) {
      events.set(name, callback);
    },
    removeEventListener(name) {
      events.delete(name);
    },
  };
  const site = { querySelector: () => header, querySelectorAll: () => [] };
  const exports = {};
  vm.runInNewContext(compiled, {
    exports,
    require(name) {
      assert.equal(name, "react");
      return {
        useEffect(effect) {
          cleanup = effect();
        },
      };
    },
    document: {
      querySelector: () => site,
      documentElement: { scrollHeight: 3000 },
    },
    window: viewport,
    requestAnimationFrame(callback) {
      frames.set(++frameId, callback);
      return frameId;
    },
    cancelAnimationFrame(id) {
      frames.delete(id);
    },
  });
  exports.default();
  function flush() {
    const queued = [...frames.values()];
    frames.clear();
    queued.forEach((callback) => callback());
  }
  function scroll(y, shouldFlush = true) {
    viewport.scrollY = y;
    events.get("scroll")?.();
    if (shouldFlush) flush();
  }
  return {
    header,
    headerEvents,
    events,
    frames,
    scroll,
    flush,
    offset: () => parseFloat(styles.get("--dk2-header-offset")),
    setReducedMotion(value) {
      motion.matches = value;
      motionEvents.get("change")?.();
    },
    cleanup: () => cleanup(),
  };
}

test("header movement follows scroll distance, including slow upward travel, stops and reversals", () => {
  const view = mount();
  assert.equal(view.header.dataset.scrollHidden, "false");
  view.scroll(80);
  assert.equal(view.header.dataset.scrollHidden, "false");
  view.scroll(600);
  assert.equal(view.header.dataset.scrollHidden, "true");
  assert.equal(view.offset(), 104);
  view.scroll(1500);
  assert.equal(view.header.dataset.scrollHidden, "true");
  view.scroll(1499);
  assert.equal(view.header.dataset.scrollHidden, "false");
  assert.equal(view.offset(), 103);
  view.scroll(1499);
  view.flush();
  assert.equal(view.offset(), 103);
  view.scroll(1498);
  assert.equal(view.offset(), 102);
  view.scroll(1490);
  assert.equal(view.offset(), 94);
  view.scroll(1495);
  assert.equal(view.offset(), 99);
  view.scroll(1500);
  assert.equal(view.header.dataset.scrollHidden, "true");
  view.scroll(1396);
  assert.equal(view.offset(), 0);
  assert.equal(view.header.dataset.scrollShifted, "false");
  view.scroll(0);
  assert.equal(view.header.dataset.scrollHidden, "false");
  assert.equal(view.header.dataset.scrolled, "false");
  view.cleanup();
});

test("a fast scroll moves the header farther per frame; both speeds preserve one-to-one travel", () => {
  const slow = mount({ initialY: 1000 });
  const fast = mount({ initialY: 1000 });
  slow.scroll(1200);
  fast.scroll(1200);
  for (const y of [1198, 1196, 1194]) slow.scroll(y);
  fast.scroll(1140);
  assert.equal(slow.offset(), 98);
  assert.equal(fast.offset(), 44);
  slow.scroll(1140);
  assert.equal(slow.offset(), fast.offset());
  fast.scroll(1000);
  assert.equal(fast.offset(), 0);
  assert.equal(fast.header.dataset.scrollHidden, "false");
  slow.cleanup();
  fast.cleanup();
});

test("initial scroll threshold and a resized header keep the travel within its actual height", () => {
  const view = mount();
  view.scroll(100);
  assert.equal(view.offset(), 0);
  view.scroll(110);
  assert.equal(view.offset(), 6);
  view.scroll(210);
  assert.equal(view.offset(), 104);
  view.header.offsetHeight = 90;
  view.scroll(211);
  assert.equal(view.offset(), 90);
  view.scroll(201);
  assert.equal(view.offset(), 80);
  view.scroll(90);
  assert.equal(view.offset(), 0);
  view.cleanup();
});

test("menus, cart and keyboard focus reveal the header and pin it during interaction", () => {
  const view = mount();
  view.scroll(500);
  assert.equal(view.header.dataset.scrollHidden, "true");
  view.header.open = true;
  view.headerEvents.get("toggle")();
  assert.equal(view.header.dataset.scrollHidden, "false");
  view.scroll(600);
  assert.equal(view.header.dataset.scrollHidden, "false");
  view.header.open = false;
  view.scroll(700);
  assert.equal(view.header.dataset.scrollShifted, "true");
  assert.equal(view.offset(), 100);
  view.header.keyboardFocus = true;
  view.headerEvents.get("focusin")();
  assert.equal(view.header.dataset.scrollHidden, "false");
  view.scroll(800);
  assert.equal(view.header.dataset.scrollHidden, "false");
  assert.equal(view.offset(), 0);
  view.header.keyboardFocus = false;
  view.scroll(900);
  assert.equal(view.offset(), 100);
  assert.equal(view.header.dataset.scrollShifted, "true");
  view.cleanup();
});

test("scroll bounce outside document bounds cannot reverse the header direction", () => {
  const view = mount();
  view.scroll(2100);
  view.scroll(2300);
  view.scroll(2200);
  assert.equal(view.header.dataset.scrollHidden, "true");
  view.scroll(2099);
  assert.equal(view.header.dataset.scrollHidden, "false");
  view.scroll(-50);
  view.scroll(0);
  assert.equal(view.header.dataset.scrollHidden, "false");
  view.cleanup();
});

test("restored scroll positions and reduced motion start visible; scroll work is batched and cleaned up", () => {
  const view = mount({ initialY: 800, reducedMotion: true });
  assert.equal(view.header.dataset.scrollHidden, "false");
  assert.equal(view.header.dataset.scrolled, "true");
  view.scroll(801, false);
  view.scroll(802, false);
  assert.equal(view.frames.size, 1);
  view.flush();
  assert.equal(view.header.dataset.scrollHidden, "true");
  view.scroll(801);
  assert.equal(view.header.dataset.scrollHidden, "false");
  view.scroll(900, false);
  view.cleanup();
  assert.equal(view.frames.size, 0);
  assert.equal(view.events.size, 0);
  assert.equal(view.headerEvents.size, 0);
});

test("changing to reduced motion clears partial travel and switches to immediate directional reveal", () => {
  const view = mount({ initialY: 500 });
  view.scroll(520);
  assert.equal(view.offset(), 20);
  view.setReducedMotion(true);
  assert.equal(view.offset(), 0);
  view.scroll(521);
  assert.equal(view.offset(), 104);
  view.scroll(520);
  assert.equal(view.offset(), 0);
  view.cleanup();
});
