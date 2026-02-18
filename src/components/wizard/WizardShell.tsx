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
  const [showPulse, setShowPulse] = useState(false);

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
        return true;
      case 4:
        return false;
      default:
        return false;
    }
  };

  // Pulse the Next button when user makes a selection
  useEffect(() => {
    if (canProceed() && currentStep < 4) {
      setShowPulse(true);
      const timer = setTimeout(() => setShowPulse(false), 2000);
      return () => clearTimeout(timer);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [brand, theme, size, currentStep]);

  const proceed = canProceed();
  const v = brand?.visuals;
  const accentColor = v?.accent ?? '#2563eb';

  const StepComponent = stepComponents[currentStep];

  const navButtons = (position: 'top' | 'bottom') => (
    <div className={`flex justify-between ${position === 'top' ? 'mb-6' : 'mt-8'}`}>
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
          disabled={!proceed}
          style={proceed ? { backgroundColor: accentColor, color: v?.accentText ?? '#ffffff' } : {}}
          className={`px-8 py-3 rounded-xl font-bold text-base transition-all cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-500 ${
            showPulse && proceed ? 'animate-bounce shadow-lg scale-105' : ''
          } ${proceed ? 'shadow-md hover:shadow-lg hover:scale-105' : ''}`}
        >
          {currentStep === 3 ? 'Review Estimate →' : 'Next →'}
        </button>
      )}
    </div>
  );

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
        {/* Top Navigation */}
        {navButtons('top')}

        <StepComponent />

        {/* Bottom Navigation */}
        {navButtons('bottom')}

        {/* Hint text when selection is made */}
        {proceed && currentStep < 3 && (
          <p className="text-center mt-3 text-sm animate-pulse" style={{ color: accentColor }}>
            Click &quot;Next →&quot; to continue
          </p>
        )}
      </main>

      {/* Sticky Price Bar */}
      <PriceBar />
    </div>
  );
}
