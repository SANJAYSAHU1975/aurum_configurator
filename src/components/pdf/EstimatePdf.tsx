'use client';

import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { Brand, Theme, SizePlan } from '@/types';
import { PriceBreakdown } from '@/lib/pricing';

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: 'Helvetica',
    fontSize: 10,
    color: '#1a1a1a',
  },
  header: {
    marginBottom: 30,
    borderBottom: '2px solid #1a1a1a',
    paddingBottom: 15,
  },
  title: {
    fontSize: 22,
    fontFamily: 'Helvetica-Bold',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 10,
    color: '#666',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 13,
    fontFamily: 'Helvetica-Bold',
    marginBottom: 10,
    color: '#1a1a1a',
    backgroundColor: '#f5f5f5',
    padding: '6 10',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderBottom: '0.5px solid #eee',
  },
  label: {
    fontSize: 10,
    color: '#444',
    flex: 1,
  },
  value: {
    fontSize: 10,
    fontFamily: 'Helvetica-Bold',
    textAlign: 'right',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: '#1a1a1a',
    marginTop: 5,
  },
  totalLabel: {
    fontSize: 14,
    fontFamily: 'Helvetica-Bold',
    color: '#ffffff',
  },
  totalValue: {
    fontSize: 14,
    fontFamily: 'Helvetica-Bold',
    color: '#ffffff',
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 40,
    right: 40,
    borderTop: '1px solid #ddd',
    paddingTop: 10,
  },
  footerText: {
    fontSize: 8,
    color: '#999',
    textAlign: 'center',
  },
  customerSection: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#fafafa',
    borderLeft: '3px solid #1a1a1a',
  },
  customerName: {
    fontSize: 12,
    fontFamily: 'Helvetica-Bold',
    marginBottom: 3,
  },
  customerDetail: {
    fontSize: 9,
    color: '#666',
  },
  brandBadge: {
    fontSize: 11,
    fontFamily: 'Helvetica-Bold',
    color: '#ffffff',
    backgroundColor: '#1a1a1a',
    padding: '4 12',
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
});

function formatINR(amount: number): string {
  return `Rs. ${amount.toLocaleString('en-IN')}`;
}

interface EstimatePdfProps {
  brand: Brand;
  theme: Theme;
  size: SizePlan;
  estimate: PriceBreakdown;
  g1Option: boolean;
  customerName?: string;
  customerPhone?: string;
  customerEmail?: string;
}

export default function EstimatePdf({
  brand,
  theme,
  size,
  estimate,
  g1Option,
  customerName,
  customerPhone,
  customerEmail,
}: EstimatePdfProps) {
  const date = new Date().toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>AURUM LIFE SPACES</Text>
          <Text style={styles.subtitle}>Home Configuration Estimate | {date}</Text>
        </View>

        {/* Customer Info */}
        {customerName && (
          <View style={styles.customerSection}>
            <Text style={styles.customerName}>Prepared for: {customerName}</Text>
            {customerPhone && <Text style={styles.customerDetail}>Phone: {customerPhone}</Text>}
            {customerEmail && <Text style={styles.customerDetail}>Email: {customerEmail}</Text>}
          </View>
        )}

        {/* Brand */}
        <Text style={styles.brandBadge}>{brand.name}</Text>

        {/* Configuration */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Configuration Details</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Brand</Text>
            <Text style={styles.value}>{brand.name}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Design Theme</Text>
            <Text style={styles.value}>{theme.name} ({theme.style})</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Size</Text>
            <Text style={styles.value}>{size.label} - {size.sqft} sqft</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Bedrooms / Bathrooms</Text>
            <Text style={styles.value}>{size.bedrooms} BHK / {size.bathrooms} Bath</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Ceiling Height</Text>
            <Text style={styles.value}>{brand.ceilingHeight}</Text>
          </View>
          {g1Option && (
            <View style={styles.row}>
              <Text style={styles.label}>G+1 Second Floor</Text>
              <Text style={styles.value}>Yes (Stackable)</Text>
            </View>
          )}
          <View style={styles.row}>
            <Text style={styles.label}>Construction</Text>
            <Text style={styles.value}>RCC Panels (GFRC/TRC)</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Delivery Timeline</Text>
            <Text style={styles.value}>45-90 Days</Text>
          </View>
        </View>

        {/* Price Breakdown */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Price Breakdown</Text>
          <View style={styles.row}>
            <Text style={styles.label}>
              Base Home ({size.sqft} sqft x Rs. {brand.pricePerSqft.toLocaleString('en-IN')}/sqft)
            </Text>
            <Text style={styles.value}>{formatINR(estimate.basePrice)}</Text>
          </View>
          {estimate.addonItems.map((item, i) => (
            <View key={i} style={styles.row}>
              <Text style={styles.label}>{item.name}</Text>
              <Text style={styles.value}>+ {formatINR(item.price)}</Text>
            </View>
          ))}
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>ESTIMATED TOTAL</Text>
            <Text style={styles.totalValue}>{formatINR(estimate.grandTotal)}</Text>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            * This is an indicative estimate. Final pricing may vary based on site conditions, location, and customization requests.
          </Text>
          <Text style={styles.footerText}>
            AURUM LIFE SPACES | Factory Perfect. 45 Days. | www.aurumlifespaces.com
          </Text>
        </View>
      </Page>
    </Document>
  );
}
