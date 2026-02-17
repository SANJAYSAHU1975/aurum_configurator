'use client';

import { cn } from '@/lib/utils';

const steps = [
  { label: 'Brand', icon: '1' },
  { label: 'Theme', icon: '2' },
  { label: 'Size', icon: '3' },
  { label: 'Add-ons', icon: '4' },
  { label: 'Estimate', icon: '5' },
];

interface StepperProps {
  currentStep: number;
  onStepClick: (step: number) => void;
  maxReached: number;
}

export default function Stepper({ currentStep, onStepClick, maxReached }: StepperProps) {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        {steps.map((step, i) => {
          const isCompleted = i < currentStep;
          const isCurrent = i === currentStep;
          const isClickable = i <= maxReached;

          return (
            <div key={i} className="flex items-center flex-1 last:flex-none">
              <button
                onClick={() => isClickable && onStepClick(i)}
                disabled={!isClickable}
                className={cn(
                  'flex items-center gap-2 shrink-0',
                  isClickable ? 'cursor-pointer' : 'cursor-default'
                )}
              >
                <div
                  className={cn(
                    'w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-colors',
                    isCurrent
                      ? 'bg-blue-600 text-white'
                      : isCompleted
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-200 text-gray-500'
                  )}
                >
                  {isCompleted ? (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    step.icon
                  )}
                </div>
                <span
                  className={cn(
                    'text-sm font-medium hidden sm:block',
                    isCurrent ? 'text-blue-600' : isCompleted ? 'text-green-600' : 'text-gray-400'
                  )}
                >
                  {step.label}
                </span>
              </button>
              {i < steps.length - 1 && (
                <div
                  className={cn(
                    'flex-1 h-0.5 mx-3',
                    i < currentStep ? 'bg-green-400' : 'bg-gray-200'
                  )}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
