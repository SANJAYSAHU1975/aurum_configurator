'use client';

import { useState } from 'react';
import { pdf } from '@react-pdf/renderer';
import { useConfiguratorStore } from '@/store/configurator-store';
import { calculateEstimate } from '@/lib/pricing';
import EstimatePdf from './EstimatePdf';

export default function PdfDownloadButton() {
  const [loading, setLoading] = useState(false);
  const { brand, theme, size, selectedAddons, g1Option, customerName, customerPhone, customerEmail } =
    useConfiguratorStore();

  const handleDownload = async () => {
    if (!brand || !theme || !size) return;

    setLoading(true);
    try {
      const estimate = calculateEstimate(brand, size, selectedAddons, g1Option);
      const doc = (
        <EstimatePdf
          brand={brand}
          theme={theme}
          size={size}
          estimate={estimate}
          g1Option={g1Option}
          customerName={customerName}
          customerPhone={customerPhone}
          customerEmail={customerEmail}
        />
      );

      const blob = await pdf(doc).toBlob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `AURUM_Estimate_${brand.name}_${size.sqft}sqft.pdf`;
      link.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('PDF generation failed:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleDownload}
      disabled={loading}
      className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
    >
      {loading ? (
        <>
          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          Generating PDF...
        </>
      ) : (
        <>
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Download PDF Estimate
        </>
      )}
    </button>
  );
}
