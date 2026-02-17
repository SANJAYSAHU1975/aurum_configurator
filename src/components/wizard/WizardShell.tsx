'use client';

import { useState, useEffect } from 'react';
import { useConfiguratorStore } from '@/store/configurator-store';
import Stepper from './Stepper';
import StepBrand from './StepBrand';
import StepTheme from './StepTheme';
import StepSize from './StepSize';
import StepAddons from './StepAddons';
import StepReview from './StepReview';
import PriceBar from '@/components/ui/PriceBar';

const stepComponents = [StepBrand, StepTheme, StepSize, StepAddons, StepReview];

export default function WizardShell() {
  const { currentStep, setStep, nextStep, prevStep, brand, theme, size } = useConfiguratorStore();
  const [maxReached, setMaxReached] = useState(0);

  useEffect(() => {
    if (currentStep > maxReached) {
      setMaxReached(currentStep);
    }
  }, [currentStep, maxReached]);

  const canProceed = () => {
    switch (currentStep) {
      case 0:
        return !!brand;
      case 1:
        return !!theme;
      case 2:
        return !!size;
      case 3:
        return true; // Add-ons are optional
      case 4:
        return false; // Last step
      default:
        return false;
    }
  };

  const StepComponent = stepComponents[currentStep];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-xl font-bold text-gray-900">AURUM HOME CONFIGURATOR</h1>
              <p className="text-xs text-gray-400">by Aurum Life Spaces</p>
            </div>
            {brand && (
              <div className="text-right">
                <p className="text-sm font-medium text-gray-600">{brand.name}</p>
                {theme && <p className="text-xs text-gray-400">{theme.name}</p>}
              </div>
            )}
          </div>
          <Stepper currentStep={currentStep} onStepClick={setStep} maxReached={maxReached} />
        </div>
      </header>

      {/* Step Content */}
      <main className="max-w-4xl mx-auto px-4 py-8 pb-28">
        <StepComponent />

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8">
          <button
            onClick={prevStep}
            disabled={currentStep === 0}
            className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
          >
            Back
          </button>
          {currentStep < 4 && (
            <button
              onClick={nextStep}
              disabled={!canProceed()}
              className="px-8 py-2.5 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
            >
              {currentStep === 3 ? 'Review Estimate' : 'Next'}
            </button>
          )}
        </div>
      </main>

      {/* Sticky Price Bar */}
      <PriceBar />
    </div>
  );
}
