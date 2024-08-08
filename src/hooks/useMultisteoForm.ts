import { ReactElement, useState } from "react";

export function useMultistepForm(steps: ReactElement[]) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  function next() {
    setCurrentStepIndex((prevSt) => {
      if (prevSt >= steps.length - 1) return prevSt;
      return prevSt + 1;
    });
  }
  function back() {
    setCurrentStepIndex((prevSt) => {
      if (prevSt <= 0) return prevSt;
      return prevSt - 1;
    });
  }

  function goTo(index: number) {
    setCurrentStepIndex(index);
  }

  return {
    currentStepIndex,
    step: steps[currentStepIndex],
    steps,
    isFirstStep: currentStepIndex === 0,
    isLastStep: currentStepIndex === steps.length - 1,
    goTo,
    next,
    back,
  };
}
