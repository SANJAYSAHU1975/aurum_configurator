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
  // Contract page styles
  contractHeader: {
    marginBottom: 20,
    borderBottom: '2px solid #1a1a1a',
    paddingBottom: 10,
  },
  contractTitle: {
    fontSize: 16,
    fontFamily: 'Helvetica-Bold',
    marginBottom: 4,
    textAlign: 'center',
  },
  contractSubtitle: {
    fontSize: 9,
    color: '#666',
    textAlign: 'center',
  },
  contractSectionTitle: {
    fontSize: 12,
    fontFamily: 'Helvetica-Bold',
    marginBottom: 8,
    marginTop: 14,
    color: '#1a1a1a',
    backgroundColor: '#f5f5f5',
    padding: '5 8',
  },
  contractText: {
    fontSize: 9,
    lineHeight: 1.5,
    marginBottom: 4,
    color: '#333',
  },
  contractBullet: {
    fontSize: 9,
    lineHeight: 1.5,
    marginBottom: 3,
    paddingLeft: 15,
    color: '#333',
  },
  contractBold: {
    fontSize: 9,
    fontFamily: 'Helvetica-Bold',
    lineHeight: 1.5,
    marginBottom: 4,
    color: '#1a1a1a',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#1a1a1a',
    paddingVertical: 5,
    paddingHorizontal: 8,
  },
  tableHeaderCell: {
    fontSize: 8,
    fontFamily: 'Helvetica-Bold',
    color: '#ffffff',
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderBottom: '0.5px solid #eee',
  },
  tableCell: {
    fontSize: 8,
    color: '#333',
  },
  signatureSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 40,
    paddingTop: 15,
    borderTop: '1px solid #ccc',
  },
  signatureBlock: {
    width: '45%',
  },
  signatureLine: {
    borderBottom: '1px solid #333',
    marginTop: 40,
    marginBottom: 5,
  },
  signatureLabel: {
    fontSize: 9,
    color: '#666',
  },
  pageNumber: {
    position: 'absolute',
    bottom: 20,
    right: 40,
    fontSize: 8,
    color: '#999',
  },
});

function formatINR(amount: number): string {
  return `Rs. ${amount.toLocaleString('en-IN')}`;
}

function getBrandEntity(brandName: string): string {
  const name = brandName.toUpperCase();
  if (name.includes('LUXURIA')) return 'LUXURIA Pvt. Ltd.';
  if (name.includes('MODURA')) return 'MODURA Pvt. Ltd.';
  if (name.includes('NOMAD')) return 'NOMAD Pvt. Ltd.';
  return 'NIVASA Pvt. Ltd.';
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

  const entity = getBrandEntity(brand.name);
  const totalSqft = g1Option ? size.sqft * 2 : size.sqft;
  const clientName = customerName || '________________________';

  return (
    <Document>
      {/* ==================== PAGE 1: ESTIMATE ==================== */}
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>AURUM LIFE SPACES</Text>
          <Text style={styles.subtitle}>Home Configuration Estimate | {date}</Text>
        </View>

        {customerName && (
          <View style={styles.customerSection}>
            <Text style={styles.customerName}>Prepared for: {customerName}</Text>
            {customerPhone && <Text style={styles.customerDetail}>Phone: {customerPhone}</Text>}
            {customerEmail && <Text style={styles.customerDetail}>Email: {customerEmail}</Text>}
          </View>
        )}

        <Text style={styles.brandBadge}>{brand.name}</Text>

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
            <Text style={styles.value}>Factory-Built RCC Panels (GFRC/TRC)</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Delivery Timeline</Text>
            <Text style={styles.value}>45-90 Days</Text>
          </View>
        </View>

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

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            * This is an indicative estimate. Final pricing may vary based on site conditions, location, and customization requests.
          </Text>
          <Text style={styles.footerText}>
            {entity} | A unit of AURUM LIFE SPACES | Factory Perfect. 45 Days. | www.aurumlifespaces.com
          </Text>
        </View>
      </Page>

      {/* ==================== PAGE 2: CONSTRUCTION CONTRACT ==================== */}
      <Page size="A4" style={styles.page}>
        <View style={styles.contractHeader}>
          <Text style={styles.contractTitle}>CONSTRUCTION CONTRACT</Text>
          <Text style={styles.contractSubtitle}>{entity} | A unit of AURUM LIFE SPACES</Text>
        </View>

        <Text style={styles.contractBold}>
          SUB: CONSTRUCTION CONTRACT @ Rs. {brand.pricePerSqft.toLocaleString('en-IN')}/- per Sq Ft
        </Text>
        <Text style={styles.contractText}>
          Built Up Area: {totalSqft} sq ft {g1Option ? `(G+1: ${size.sqft} sqft x 2 floors)` : ''}
        </Text>
        <Text style={styles.contractText}>
          Net Amount: Rs. {brand.pricePerSqft.toLocaleString('en-IN')} x {totalSqft.toLocaleString('en-IN')} = {formatINR(estimate.grandTotal)}
        </Text>
        <Text style={styles.contractText}>
          ({numberToWords(estimate.grandTotal)} Only.)
        </Text>
        <Text style={styles.contractText}>
          Date: {date}
        </Text>
        <Text style={styles.contractText}>
          Client: {clientName}
        </Text>

        <Text style={styles.contractSectionTitle}>Structure</Text>
        <Text style={styles.contractText}>
          Factory-built RCC Panel System (GFRC/TRC) with M40 grade concrete, 40-50mm thickness.
        </Text>
        <Text style={styles.contractBullet}>- Steel reinforcement: TMT bar Fe550 with glass fiber mesh</Text>
        <Text style={styles.contractBullet}>- Panel joints: EPDM gasket + structural silicone + steel Z-flashing</Text>
        <Text style={styles.contractBullet}>- Module width: Max 2.5m (9 ft) for road transport compliance</Text>
        <Text style={styles.contractBullet}>- Ceiling Height: {brand.ceilingHeight} (Finished Floor to Finished Floor)</Text>
        <Text style={styles.contractBullet}>- Foundation: Screw pile or conventional RCC footing as per site conditions</Text>
        <Text style={styles.contractBullet}>- All structural panels manufactured in controlled factory environment with quality certification</Text>

        <Text style={styles.contractSectionTitle}>Kitchen</Text>
        <Text style={styles.contractBullet}>- Kitchen counter with granite/quartz slab as per brand specification</Text>
        <Text style={styles.contractBullet}>- Ceramic/vitrified wall tiles (height as per design)</Text>
        <Text style={styles.contractBullet}>- Stainless steel sink (brand specification)</Text>
        <Text style={styles.contractBullet}>- Provision for water purifier inlet near kitchen sink</Text>
        <Text style={styles.contractBullet}>- Provision for washing machine inlet and outlet in utility area</Text>
        <Text style={styles.contractBullet}>- Provision for chimney/exhaust</Text>
        <Text style={styles.contractBullet}>- Utility area with water inlet and outlet provision</Text>

        <Text style={styles.contractSectionTitle}>Doors and Windows</Text>
        <Text style={styles.contractText}>
          All doors and windows are factory-fitted in panels before delivery.
        </Text>
        <Text style={styles.contractBullet}>- Main Door: Solid wood/engineered wood, 3&apos;6&quot; x 8&apos;, with premium hardware, lock set, and factory finish</Text>
        <Text style={styles.contractBullet}>- Internal Doors: 32mm flush/membrane doors, 3&apos; x 7&apos;, with frame, hinges, tower bolts, and cylindrical lock</Text>
        <Text style={styles.contractBullet}>- Bathroom Doors: 32mm WPC doors, 2&apos;6&quot; x 7&apos;, with WPC frame and hardware</Text>
        <Text style={styles.contractBullet}>- Windows: UPVC windows with glass and mesh shutters, factory-sealed in panels</Text>

        <Text style={styles.pageNumber}>2</Text>
      </Page>

      {/* ==================== PAGE 3: BATHROOM, PAINTING, FLOORING ==================== */}
      <Page size="A4" style={styles.page}>
        <View style={styles.contractHeader}>
          <Text style={styles.contractTitle}>CONSTRUCTION CONTRACT (Contd.)</Text>
          <Text style={styles.contractSubtitle}>{entity}</Text>
        </View>

        <Text style={styles.contractSectionTitle}>Fabrication</Text>
        <Text style={styles.contractBullet}>- Staircase MS railing (if G+1 applicable)</Text>
        <Text style={styles.contractBullet}>- Balcony railing: MS railing as per design</Text>
        <Text style={styles.contractBullet}>- Any additional fabrication beyond standard scope will be quoted separately</Text>

        <Text style={styles.contractSectionTitle}>Bathroom</Text>
        <Text style={styles.contractBullet}>- Bathroom flooring: Anti-skid tiles as per brand specification</Text>
        <Text style={styles.contractBullet}>- Wall tiles: Full height ceramic/vitrified tiles as per brand specification</Text>
        <Text style={styles.contractBullet}>- Sanitary ware and CP fittings as per brand tier (factory pre-fitted in bathroom pod)</Text>
        <Text style={styles.contractBullet}>- Included per bathroom: Floor-mounted EWC, health faucet, wash basin with mixer, overhead shower with wall mixer</Text>
        <Text style={styles.contractBullet}>- CPVC pipes: Ashirwad/Supreme or equivalent</Text>
        <Text style={styles.contractBullet}>- Provision for exhaust fan</Text>
        <Text style={styles.contractBullet}>- Bathroom pods factory-assembled and tested for waterproofing before dispatch</Text>

        <Text style={styles.contractSectionTitle}>Painting</Text>
        <Text style={styles.contractBullet}>- Exterior: Factory-applied primer + 2 coats weather-shield exterior emulsion (Asian Paints or equivalent)</Text>
        <Text style={styles.contractBullet}>- Interior: 2 coats putty + 1 coat primer + 2 coats emulsion (brand tier specification)</Text>
        <Text style={styles.contractBullet}>- Colour choices: Up to 2 per room, up to 6 overall. Additional colours chargeable.</Text>
        <Text style={styles.contractBullet}>- All MS grills and railings: Anti-corrosion coat + final enamel paint</Text>

        <Text style={styles.contractSectionTitle}>Flooring</Text>
        <Text style={styles.contractBullet}>- Living and Dining: Vitrified/marble tiles as per brand tier specification</Text>
        <Text style={styles.contractBullet}>- Bedrooms and Kitchen: Tiles as per brand tier specification</Text>
        <Text style={styles.contractBullet}>- Balcony and open areas: Anti-skid tiles</Text>
        <Text style={styles.contractBullet}>- Staircase flooring: Granite as per brand specification (if G+1)</Text>
        <Text style={styles.contractBullet}>- All wet areas: Epoxy grouting</Text>
        <Text style={styles.contractBullet}>- All dry areas: Polymeric cement grout</Text>
        <Text style={styles.contractBullet}>- Skirting: Matching tiles, height not more than 100mm</Text>

        <Text style={styles.contractSectionTitle}>Electrical</Text>
        <Text style={styles.contractBullet}>- Bathroom: 2 light points, 1 geyser point, 1 exhaust fan point</Text>
        <Text style={styles.contractBullet}>- Bedrooms: 3 light points, 1 fan point, 2 plug points, 1 AC point (16 amp)</Text>
        <Text style={styles.contractBullet}>- Living/Dining: 2 fan points, 4 light points, 3 plug points, 1 TV point, 1 AC point</Text>
        <Text style={styles.contractBullet}>- Kitchen: 2 light points, 4 x 15 amp plug points (fridge, mixer, oven, purifier)</Text>
        <Text style={styles.contractBullet}>- Two-way switch connection for each room, living area, and staircase</Text>
        <Text style={styles.contractBullet}>- All wiring: Anchor/Polycab or equivalent (factory pre-wired in panels)</Text>
        <Text style={styles.contractBullet}>- All switches: Anchor Roma/Schneider or equivalent</Text>
        <Text style={styles.contractBullet}>- One MCB distribution board per home</Text>
        <Text style={styles.contractBullet}>- One earthing pit per project</Text>

        <Text style={styles.pageNumber}>3</Text>
      </Page>

      {/* ==================== PAGE 4: MISC, EXCLUSIONS, TERMS ==================== */}
      <Page size="A4" style={styles.page}>
        <View style={styles.contractHeader}>
          <Text style={styles.contractTitle}>CONSTRUCTION CONTRACT (Contd.)</Text>
          <Text style={styles.contractSubtitle}>{entity}</Text>
        </View>

        <Text style={styles.contractSectionTitle}>Miscellaneous</Text>
        <Text style={styles.contractBullet}>- Overhead Tank: 1 Sintex double-layered 1,500 litres (or as per design)</Text>
        <Text style={styles.contractBullet}>- Underground sump: As per site design, RCC construction with waterproofing</Text>
        <Text style={styles.contractBullet}>- Sewer line connection to main drain line included up to 10 feet from building</Text>
        <Text style={styles.contractBullet}>- Foundation type determined after site soil assessment</Text>

        <Text style={styles.contractSectionTitle}>Out of Scope / Additional Charges</Text>
        <Text style={styles.contractBullet}>- Landscape, external area development outside plinth area, and interior decoration works are not included. If required, will be executed at actual costs with mutual agreement.</Text>
        <Text style={styles.contractBullet}>- Specialized foundation design for difficult soil conditions: additional charges applicable</Text>
        <Text style={styles.contractBullet}>- Rocky terrain excavation: extra charges for foundation, sump, and soak pit</Text>
        <Text style={styles.contractBullet}>- Site level more than 12 inches below road level: additional filling charges</Text>
        <Text style={styles.contractBullet}>- Italian/Indian marble laying, buffing, chamfering, nosing, and treatment: additional cost</Text>
        <Text style={styles.contractBullet}>- Elevation decorative elements (CNC cutting jalli, RCC/MS pergolas): additional</Text>
        <Text style={styles.contractBullet}>- Main gate automation: additional</Text>
        <Text style={styles.contractBullet}>- Main electrical panel board, water connection, and monthly bills: Client scope</Text>
        <Text style={styles.contractBullet}>- Plan sanction, local authority approvals, BESCOM/BWSSB: Client scope</Text>

        <Text style={styles.contractSectionTitle}>Terms and Conditions</Text>
        <Text style={styles.contractBullet}>- All designed elements of structure and elevation are part of this agreement and shall be executed by {entity}.</Text>
        <Text style={styles.contractBullet}>- Any item, activity or specification not mentioned in this contract is additional, charged at actuals with mutual agreement.</Text>
        <Text style={styles.contractBullet}>- The quotation value will change if the customer adds or updates any specification after agreement signing.</Text>
        <Text style={styles.contractBullet}>- All plumbing and electrical work as per approved drawings.</Text>
        <Text style={styles.contractBullet}>- Construction carried out as per the specifications, dimensions and quantities in this contract. Differential charges applicable for any changes.</Text>
        <Text style={styles.contractBullet}>- This contract is exempt from liability during lockdown scenarios and other force majeure events.</Text>
        <Text style={styles.contractBullet}>- Colours in 3D renders/images may not match actual materials exactly.</Text>
        <Text style={styles.contractBullet}>- {entity} reserves the right to photograph completed work for portfolio and marketing purposes.</Text>
        <Text style={styles.contractBullet}>- The project shall be deemed delivered when complete structure is erected with all specified fittings and accessories.</Text>
        <Text style={styles.contractBullet}>- All prices are FIXED as quoted. No negotiation.</Text>

        <Text style={styles.pageNumber}>4</Text>
      </Page>

      {/* ==================== PAGE 5: WARRANTY ==================== */}
      <Page size="A4" style={styles.page}>
        <View style={styles.contractHeader}>
          <Text style={styles.contractTitle}>WARRANTY</Text>
          <Text style={styles.contractSubtitle}>{entity}</Text>
        </View>

        <Text style={styles.contractSectionTitle}>1. Structural Warranty - 10 Years</Text>
        <Text style={styles.contractText}>
          Covers the structural integrity of RCC panels, columns, beams, slabs, and load-bearing elements against major structural defects arising solely from defective workmanship or use of sub-standard structural materials.
        </Text>
        <Text style={styles.contractBold}>Exclusions:</Text>
        <Text style={styles.contractBullet}>- Damage caused due to design changes by client, modifications by third parties, excessive loading, natural disasters, or lack of maintenance.</Text>

        <Text style={styles.contractSectionTitle}>2. Waterproofing and Seepage Warranty - 3 Years</Text>
        <Text style={styles.contractText}>
          Seepage/leakage repair will be covered if it arises from workmanship or improper waterproofing by {entity}.
        </Text>
        <Text style={styles.contractBold}>This warranty shall be void if:</Text>
        <Text style={styles.contractBullet}>- Drilling, nailing, plumbing or electrical work by others damages waterproof layers</Text>
        <Text style={styles.contractBullet}>- Client changes tiles, bathrooms, terrace flooring, plumbing, or introduces new installations</Text>
        <Text style={styles.contractBullet}>- No maintenance of drainage outlets, terrace cleaning, water stagnation</Text>
        <Text style={styles.contractText}>
          If no seepage is observed within 36 months of handover, the structure shall be deemed to have been constructed with sound waterproofing practices.
        </Text>

        <Text style={styles.contractSectionTitle}>3. Electrical and Plumbing Warranty - 1 Year</Text>
        <Text style={styles.contractText}>
          Covers manufacturing defects of materials provided by {entity} and workmanship defects identified within 12 months of handover.
        </Text>
        <Text style={styles.contractBold}>Not covered:</Text>
        <Text style={styles.contractBullet}>- Damage due to overloading, misuse, negligence, improper usage, or alterations by client/third party</Text>
        <Text style={styles.contractBullet}>- Choked pipes due to external material, hair, food, debris</Text>
        <Text style={styles.contractBullet}>- Electrical fluctuations, short circuits from appliances or external sources</Text>

        <Text style={styles.contractSectionTitle}>4. What is NOT Covered Under Warranty</Text>
        <Text style={styles.contractBold}>Natural Behaviour:</Text>
        <Text style={styles.contractBullet}>- Hairline cracks (up to 3mm), tile grout discoloration, normal material expansion/contraction are natural in RCC buildings</Text>
        <Text style={styles.contractBold}>External Factors:</Text>
        <Text style={styles.contractBullet}>- Natural calamities, flooding, lightning, earthquakes, vandalism, accidents</Text>
        <Text style={styles.contractBold}>Third-Party Interference:</Text>
        <Text style={styles.contractBullet}>- Any work done by other contractors or client-hired labour</Text>
        <Text style={styles.contractBold}>Wear and Tear:</Text>
        <Text style={styles.contractBullet}>- Paint fading, polish fading, sealant degradation, rusting</Text>
        <Text style={styles.contractBold}>Material Choices:</Text>
        <Text style={styles.contractBullet}>- Issues arising from brands/materials specifically chosen by the Client against recommendation</Text>

        <Text style={styles.contractSectionTitle}>5. Warranty Claim Process</Text>
        <Text style={styles.contractBullet}>- Client must submit claim in writing with photographs</Text>
        <Text style={styles.contractBullet}>- Site visit within 7-10 working days</Text>
        <Text style={styles.contractBullet}>- Work scheduling based on severity (not emergency on-demand)</Text>
        <Text style={styles.contractBullet}>- Repairs carried out during normal working hours</Text>

        <Text style={styles.pageNumber}>5</Text>
      </Page>

      {/* ==================== PAGE 6: PAYMENT SCHEDULE ==================== */}
      <Page size="A4" style={styles.page}>
        <View style={styles.contractHeader}>
          <Text style={styles.contractTitle}>PAYMENT SCHEDULE</Text>
          <Text style={styles.contractSubtitle}>{entity}</Text>
        </View>

        <Text style={styles.contractBold}>
          Total Contract Value: {formatINR(estimate.grandTotal)}
        </Text>
        <Text style={styles.contractText}>
          Built Up Area: {totalSqft} sq ft | Rate: Rs. {brand.pricePerSqft.toLocaleString('en-IN')}/sq ft
        </Text>

        {/* Payment schedule table */}
        <View style={{ marginTop: 15 }}>
          <View style={styles.tableHeader}>
            <Text style={[styles.tableHeaderCell, { width: '6%' }]}>No.</Text>
            <Text style={[styles.tableHeaderCell, { width: '44%' }]}>Stage of Work</Text>
            <Text style={[styles.tableHeaderCell, { width: '12%', textAlign: 'center' }]}>%</Text>
            <Text style={[styles.tableHeaderCell, { width: '22%', textAlign: 'right' }]}>Amount</Text>
            <Text style={[styles.tableHeaderCell, { width: '16%', textAlign: 'right' }]}>Milestone</Text>
          </View>

          {getPaymentSchedule(estimate.grandTotal).map((row, i) => (
            <View key={i} style={[styles.tableRow, i % 2 === 0 ? { backgroundColor: '#fafafa' } : {}]}>
              <Text style={[styles.tableCell, { width: '6%' }]}>{row.no}</Text>
              <Text style={[styles.tableCell, { width: '44%' }]}>{row.stage}</Text>
              <Text style={[styles.tableCell, { width: '12%', textAlign: 'center' }]}>{row.pct}</Text>
              <Text style={[styles.tableCell, { width: '22%', textAlign: 'right', fontFamily: 'Helvetica-Bold' }]}>{formatINR(row.amount)}</Text>
              <Text style={[styles.tableCell, { width: '16%', textAlign: 'right' }]}>{row.milestone}</Text>
            </View>
          ))}

          <View style={[styles.tableRow, { backgroundColor: '#1a1a1a' }]}>
            <Text style={[styles.tableHeaderCell, { width: '6%' }]}></Text>
            <Text style={[styles.tableHeaderCell, { width: '44%' }]}>TOTAL</Text>
            <Text style={[styles.tableHeaderCell, { width: '12%', textAlign: 'center' }]}>100%</Text>
            <Text style={[styles.tableHeaderCell, { width: '22%', textAlign: 'right' }]}>{formatINR(estimate.grandTotal)}</Text>
            <Text style={[styles.tableHeaderCell, { width: '16%', textAlign: 'right' }]}></Text>
          </View>
        </View>

        <View style={{ marginTop: 15 }}>
          <Text style={styles.contractBold}>Payment Terms:</Text>
          <Text style={styles.contractBullet}>- All payments via bank transfer / cheque / UPI to {entity} account only.</Text>
          <Text style={styles.contractBullet}>- No production shall commence without receipt of advance payment (Stage 1).</Text>
          <Text style={styles.contractBullet}>- Each milestone payment must be cleared before proceeding to next stage.</Text>
          <Text style={styles.contractBullet}>- Delay in payment may result in proportionate delay in project delivery.</Text>
          <Text style={styles.contractBullet}>- GST as applicable will be charged in addition to the quoted amount.</Text>
        </View>

        <Text style={styles.pageNumber}>6</Text>
      </Page>

      {/* ==================== PAGE 7: SIGNATURES ==================== */}
      <Page size="A4" style={styles.page}>
        <View style={styles.contractHeader}>
          <Text style={styles.contractTitle}>AGREEMENT SIGNATURES</Text>
          <Text style={styles.contractSubtitle}>{entity} | {date}</Text>
        </View>

        <Text style={styles.contractText}>
          This agreement is entered into between {entity} (hereinafter referred to as &quot;The Company&quot;) and {clientName} (hereinafter referred to as &quot;The Client&quot;) for the construction and delivery of a factory-built home as detailed in the preceding pages of this contract.
        </Text>

        <View style={{ marginTop: 10 }}>
          <Text style={styles.contractBold}>Project Summary:</Text>
          <Text style={styles.contractBullet}>- Brand: {brand.name}</Text>
          <Text style={styles.contractBullet}>- Theme: {theme.name} ({theme.style})</Text>
          <Text style={styles.contractBullet}>- Size: {totalSqft} sq ft {g1Option ? '(G+1)' : ''}</Text>
          <Text style={styles.contractBullet}>- Contract Value: {formatINR(estimate.grandTotal)}</Text>
          <Text style={styles.contractBullet}>- Estimated Delivery: 45-90 days from advance payment</Text>
        </View>

        <View style={{ marginTop: 10 }}>
          <Text style={styles.contractBold}>Both parties agree to the following:</Text>
          <Text style={styles.contractBullet}>1. The specifications, terms, conditions, warranty, and payment schedule as detailed in this contract (Pages 1-6) are mutually agreed upon.</Text>
          <Text style={styles.contractBullet}>2. Any changes to specifications after signing will be documented as an addendum with revised pricing.</Text>
          <Text style={styles.contractBullet}>3. This contract is subject to the jurisdiction of Bengaluru courts.</Text>
          <Text style={styles.contractBullet}>4. Force majeure events (natural disasters, government orders, pandemics) shall extend delivery timelines proportionately without penalty.</Text>
          <Text style={styles.contractBullet}>5. Cancellation by client after production begins: Advance is non-refundable. Additional payments refunded minus materials already procured/manufactured.</Text>
          <Text style={styles.contractBullet}>6. Dispute resolution: First through mutual discussion, then mediation, then arbitration under the Arbitration and Conciliation Act, 1996.</Text>
        </View>

        <View style={styles.signatureSection}>
          <View style={styles.signatureBlock}>
            <Text style={styles.contractBold}>For {entity}</Text>
            <View style={styles.signatureLine} />
            <Text style={styles.signatureLabel}>Authorized Signatory</Text>
            <Text style={[styles.signatureLabel, { marginTop: 3 }]}>Name: ________________________</Text>
            <Text style={[styles.signatureLabel, { marginTop: 3 }]}>Designation: ________________________</Text>
            <Text style={[styles.signatureLabel, { marginTop: 3 }]}>Date: {date}</Text>
          </View>
          <View style={styles.signatureBlock}>
            <Text style={styles.contractBold}>Client</Text>
            <View style={styles.signatureLine} />
            <Text style={styles.signatureLabel}>Signature</Text>
            <Text style={[styles.signatureLabel, { marginTop: 3 }]}>Name: {clientName}</Text>
            <Text style={[styles.signatureLabel, { marginTop: 3 }]}>Phone: {customerPhone || '________________________'}</Text>
            <Text style={[styles.signatureLabel, { marginTop: 3 }]}>Date: {date}</Text>
          </View>
        </View>

        <View style={{ marginTop: 30, padding: 10, backgroundColor: '#f5f5f5', borderLeft: '3px solid #1a1a1a' }}>
          <Text style={styles.contractBold}>Witness 1:</Text>
          <Text style={styles.signatureLabel}>Name: ________________________  Signature: ________________________</Text>
          <Text style={[styles.contractBold, { marginTop: 10 }]}>Witness 2:</Text>
          <Text style={styles.signatureLabel}>Name: ________________________  Signature: ________________________</Text>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            {entity} | A unit of AURUM LIFE SPACES | Factory Perfect. 45 Days. | www.aurumlifespaces.com
          </Text>
        </View>

        <Text style={styles.pageNumber}>7</Text>
      </Page>
    </Document>
  );
}

// Helper: Payment schedule based on factory-built model
function getPaymentSchedule(total: number) {
  const schedule = [
    { no: '1', stage: 'Booking Advance (on agreement signing)', pct: '50%', pctVal: 0.50, milestone: 'Day 0' },
    { no: '2', stage: 'Factory Production Start (panels, bathroom pods)', pct: '10%', pctVal: 0.10, milestone: 'Day 7' },
    { no: '3', stage: 'Factory QC Complete (ready for dispatch)', pct: '10%', pctVal: 0.10, milestone: 'Day 25' },
    { no: '4', stage: 'Site Foundation Complete', pct: '5%', pctVal: 0.05, milestone: 'Day 20' },
    { no: '5', stage: 'Modules Dispatched to Site', pct: '5%', pctVal: 0.05, milestone: 'Day 30' },
    { no: '6', stage: 'Assembly and Connections Complete', pct: '5%', pctVal: 0.05, milestone: 'Day 38' },
    { no: '7', stage: 'Finishing Works (paint, fixtures, cleanup)', pct: '5%', pctVal: 0.05, milestone: 'Day 42' },
    { no: '8', stage: 'Final Inspection and Handover', pct: '10%', pctVal: 0.10, milestone: 'Day 45' },
  ];

  return schedule.map((s) => ({
    ...s,
    amount: Math.round(total * s.pctVal),
  }));
}

// Helper: Convert number to Indian words (Lakhs/Crore system)
function numberToWords(amount: number): string {
  if (amount === 0) return 'Zero Rupees';

  const crore = Math.floor(amount / 10000000);
  const lakh = Math.floor((amount % 10000000) / 100000);
  const thousand = Math.floor((amount % 100000) / 1000);
  const hundred = Math.floor((amount % 1000) / 100);
  const remainder = amount % 100;

  const ones = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten',
    'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
  const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

  function twoDigits(n: number): string {
    if (n < 20) return ones[n];
    return tens[Math.floor(n / 10)] + (n % 10 ? ' ' + ones[n % 10] : '');
  }

  const parts: string[] = [];
  if (crore > 0) parts.push(twoDigits(crore) + ' Crore');
  if (lakh > 0) parts.push(twoDigits(lakh) + ' Lakh');
  if (thousand > 0) parts.push(twoDigits(thousand) + ' Thousand');
  if (hundred > 0) parts.push(ones[hundred] + ' Hundred');
  if (remainder > 0) parts.push(twoDigits(remainder));

  return 'Rupees ' + parts.join(' ') + ' Only';
}
