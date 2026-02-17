'use client';

import { useConfiguratorStore } from '@/store/configurator-store';
import { calculateEstimate } from '@/lib/pricing';
import { formatCurrencyFull, formatCurrency } from '@/lib/utils';
import dynamic from 'next/dynamic';

const PdfDownloadButton = dynamic(() => import('@/components/pdf/PdfDownloadButton'), { ssr: false });

export default function StepReview() {
  const store = useConfiguratorStore();
  const { brand, theme, size, selectedAddons, g1Option, customerName, customerPhone, customerEmail, setCustomerName, setCustomerPhone, setCustomerEmail, reset } = store;

  if (!brand || !theme || !size) return null;

  const estimate = calculateEstimate(brand, size, selectedAddons, g1Option);

  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Your Home Estimate</h2>
        <p className="text-gray-500 mt-2">Review your configuration and download the estimate</p>
      </div>

      <div className="max-w-2xl mx-auto space-y-6">
        {/* Configuration Summary */}
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Configuration Summary</h3>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Brand</span>
              <span className="font-medium">{brand.name}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Theme</span>
              <span className="font-medium">{theme.name}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Size</span>
              <span className="font-medium">{size.label} ({size.sqft} sqft)</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Bedrooms / Bathrooms</span>
              <span className="font-medium">{size.bedrooms} BHK / {size.bathrooms} Bath</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Ceiling Height</span>
              <span className="font-medium">{brand.ceilingHeight}</span>
            </div>
            {g1Option && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">G+1 Second Floor</span>
                <span className="font-medium text-emerald-600">Yes</span>
              </div>
            )}
          </div>
        </div>

        {/* Price Breakdown */}
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Price Breakdown</h3>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">
                Base Home ({size.sqft} sqft × ₹{brand.pricePerSqft.toLocaleString('en-IN')}/sqft)
              </span>
              <span className="font-medium">{formatCurrencyFull(estimate.basePrice)}</span>
            </div>
            {estimate.addonItems.map((item, i) => (
              <div key={i} className="flex justify-between text-sm">
                <span className="text-gray-600">{item.name}</span>
                <span className="font-medium">+ {formatCurrencyFull(item.price)}</span>
              </div>
            ))}
            <div className="border-t border-gray-200 pt-3 mt-3">
              <div className="flex justify-between">
                <span className="text-lg font-bold text-gray-900">Estimated Total</span>
                <span className="text-2xl font-bold text-gray-900">
                  {formatCurrency(estimate.grandTotal)}
                </span>
              </div>
              <p className="text-xs text-gray-400 mt-1 text-right">
                * Prices are indicative. Final quote may vary based on site conditions and customization.
              </p>
            </div>
          </div>
        </div>

        {/* Customer Info (Optional) */}
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Your Details (Optional)</h3>
          <p className="text-sm text-gray-500 mb-4">Add your details to personalize the estimate PDF</p>
          <div className="space-y-3">
            <input
              type="text"
              placeholder="Your Name"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <input
              type="tel"
              placeholder="Phone Number"
              value={customerPhone}
              onChange={(e) => setCustomerPhone(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <input
              type="email"
              placeholder="Email Address"
              value={customerEmail}
              onChange={(e) => setCustomerEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <PdfDownloadButton />
          <button
            onClick={reset}
            className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors cursor-pointer"
          >
            Start Over
          </button>
        </div>
      </div>
    </div>
  );
}
