"use client"

import { useRef, useState } from "react"
import type { ProcessStep } from "../../../content/home"

export default function CircularProcessSteps({
  steps,
}: {
  steps: ProcessStep[]
}) {
  const [active, setActive] = useState(0)
  const buttons = useRef<(HTMLButtonElement | null)[]>([])

  return (
    <>
      <div className="dk2-process dk2-process--enhanced">
        <div
          role="tablist"
          aria-label="Etapas de investigación"
          className="dk2-process-tabs"
        >
          {steps.map((step, index) => (
            <button
              key={step.title}
              ref={(node) => {
                buttons.current[index] = node
              }}
              id={`process-tab-${index}`}
              type="button"
              role="tab"
              aria-selected={active === index}
              aria-controls={`process-panel-${index}`}
              tabIndex={active === index ? 0 : -1}
              onClick={() => setActive(index)}
              onKeyDown={(event) => {
                let next: number | undefined
                if (event.key === "ArrowRight")
                  next = (index + 1) % steps.length
                if (event.key === "ArrowLeft")
                  next = (index - 1 + steps.length) % steps.length
                if (event.key === "Home") next = 0
                if (event.key === "End") next = steps.length - 1
                if (next !== undefined) {
                  event.preventDefault()
                  setActive(next)
                  buttons.current[next]?.focus()
                }
              }}
            >
              <span className="dk2-step-number" aria-hidden="true">
                0{index + 1}
              </span>
              <span>{step.shortTitle}</span>
            </button>
          ))}
        </div>
        <div className="dk2-process-panels">
          {steps.map((step, index) => (
            <div
              key={step.title}
              id={`process-panel-${index}`}
              role="tabpanel"
              aria-labelledby={`process-tab-${index}`}
              hidden={active !== index}
              tabIndex={0}
              className="dk2-process-panel"
            >
              <p className="dk2-eyebrow">Etapa 0{index + 1}</p>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </div>
          ))}
        </div>
      </div>
      <noscript>
        <style>{".dk2-process--enhanced{display:none}"}</style>
        <ol className="dk2-process-fallback">
          {steps.map((step, index) => (
            <li className="dk2-process-panel" key={step.title}>
              <p className="dk2-eyebrow">Etapa 0{index + 1}</p>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </li>
          ))}
        </ol>
      </noscript>
    </>
  )
}
