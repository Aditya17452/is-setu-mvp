// ============================================================
// IS-Setu Demo Data
// This file contains all mock/hardcoded data for the hackathon MVP.
// In production, this would be replaced by live BIS standards database queries.
// ============================================================

export type StandardStatus = 'Active' | 'Withdrawn' | 'Under Revision';
export type CertificationScheme = 'ISI Mark' | 'CRS' | 'Hallmarking' | 'None';
export type AlliedCategory = 'Test Methods' | 'Safety' | 'Installation' | 'Terminology' | 'Chemical Analysis' | 'Sampling' | 'Application' | 'Conductor';

export interface AlliedStandard {
  isNumber: string;
  title: string;
  category: AlliedCategory;
  connection: string;
  clause?: string;
}

export interface Amendment {
  number: number;
  year: number;
  description: string;
}

export interface VersionInfo {
  currentEdition: number;
  reaffirmedYear?: number;
  amendments: Amendment[];
  referencedEdition?: string;
  isOutdated?: boolean;
  outdatedDetails?: {
    referencedVersion: string;
    currentVersion: string;
    outdatedBadge: string;
    recommendedBadge: string;
  };
}

export interface CertificationInfo {
  required: boolean;
  scheme?: CertificationScheme;
  qcoName?: string;
  schemeName?: string;
  note?: string;
}

export interface SpecGap {
  field: string;
  description: string;
  whyItMatters: string;
}

export interface ReasoningStep {
  step: string;
  detail: string;
}

export interface StandardRecommendation {
  id: string;
  queryDescription: string;
  summary: string;
  confidence: number;
  primaryStandard: {
    isNumber: string;
    title: string;
    status: StandardStatus;
    scopeMatchReasoning: string;
    clause?: string;
  };
  alliedStandards: AlliedStandard[];
  versionInfo: VersionInfo;
  certification: CertificationInfo;
  specGaps?: SpecGap[];
  reasoning: ReasoningStep[];
}

// ──────────────────────────────────────────────
// Scenario 1 — Electric Storage Water Heater
// ──────────────────────────────────────────────
export const waterHeaterScenario: StandardRecommendation = {
  id: 'water-heater',
  queryDescription: '25 litre electric storage water heater for government hostel',
  summary: 'Primary IS standard for electric storage water heaters (geysers) covering domestic and institutional installations.',
  confidence: 94,
  primaryStandard: {
    isNumber: 'IS 2082:2018',
    title: 'Electric Storage Type Water Heaters (Geysers) — Specification',
    status: 'Active',
    scopeMatchReasoning:
      'Scope clause 1.2 explicitly covers electric storage water heaters for domestic and institutional use. The 25-litre capacity falls within the defined range of 1–100 litres. The term "government hostel" maps to the "institutional" use category in the standard.',
    clause: 'Clause 1.2 – Scope',
  },
  alliedStandards: [
    {
      isNumber: 'IS 302 (Part 2/Sec 1)',
      title: 'Safety of Household and Similar Electrical Appliances — Particular Requirements for Electric Instantaneous Water Heaters',
      category: 'Safety',
      connection: 'Referenced as a normative standard in Clause 4.2 of IS 2082:2018. Mandatory safety performance requirements.',
      clause: 'Clause 4.2',
    },
    {
      isNumber: 'IS 8451',
      title: 'Methods of Test for Electric Storage Water Heaters',
      category: 'Test Methods',
      connection: 'All type-testing and BIS certification testing must follow procedures defined in IS 8451. Referenced in Clause 5.1 of IS 2082:2018.',
      clause: 'Clause 5.1',
    },
    {
      isNumber: 'IS 2082 Clause 8',
      title: 'Rating Plate and Marking Requirements for Electric Water Heaters',
      category: 'Terminology',
      connection: 'Specifies mandatory markings including ISI Mark location, rated voltage, capacity, and safety symbols required on the product.',
      clause: 'Clause 8',
    },
  ],
  versionInfo: {
    currentEdition: 2018,
    amendments: [{ number: 1, year: 2021, description: 'Updated insulation resistance test procedure and revised energy efficiency thresholds.' }],
    isOutdated: false,
  },
  certification: {
    required: true,
    scheme: 'ISI Mark',
    qcoName: 'Electrical Appliances Quality Control Order, 2023',
    schemeName: 'ISI Certification Mark Scheme (IS 2082)',
    note: 'ISI Mark is mandatory under the Electrical Appliances QCO. Procurement without valid ISI Mark is non-compliant.',
  },
  reasoning: [
    { step: 'Product Understanding', detail: 'Parsed query into key attributes: type=electric storage water heater, capacity=25L, use=institutional (government hostel).' },
    { step: 'Hybrid Standards Search', detail: 'Matched against 23,613 IS records. Top candidate IS 2082 scored highest on semantic similarity (scope text match) + structural similarity (product category: electrical appliances > water heating).' },
    { step: 'Scope Clause Verification', detail: 'IS 2082:2018 Clause 1.2 scope confirmed: "electric storage water heaters of capacity 1 L to 100 L for domestic and institutional use." 25L institutional use is an exact match.' },
    { step: 'Allied Standards Graph Traversal', detail: 'Queried normative references in IS 2082. Found IS 302 (Pt 2/Sec 1) and IS 8451 as direct normative references. Added Clause 8 for marking requirements.' },
    { step: 'Version & Amendment Check', detail: 'Confirmed IS 2082:2018 is the current active edition. Amendment 1 (2021) is applicable. No supersession or withdrawal found in BIS records.' },
    { step: 'Certification Registry Lookup', detail: 'Cross-referenced with Electrical Appliances QCO 2023 schedule. IS 2082 products are listed under mandatory ISI Mark certification. QCO is currently enforced.' },
  ],
};

// ──────────────────────────────────────────────
// Scenario 2 — OPC Cement
// ──────────────────────────────────────────────
export const cementScenario: StandardRecommendation = {
  id: 'cement',
  queryDescription: '43 grade ordinary portland cement for building foundation',
  summary: 'Primary IS standard for 43-grade ordinary Portland cement — the most common structural grade used in Indian construction.',
  confidence: 97,
  primaryStandard: {
    isNumber: 'IS 8112:2013',
    title: '43 Grade Ordinary Portland Cement — Specification',
    status: 'Active',
    scopeMatchReasoning:
      'The standard scope directly states "43 grade ordinary portland cement" as the exact subject. The query text "43 grade ordinary portland cement" is a verbatim match to the IS title and scope definition. Use in "building foundation" maps to the normative application standard IS 456:2000.',
    clause: 'Clause 1 – Scope',
  },
  alliedStandards: [
    {
      isNumber: 'IS 4031 (Part 1–15)',
      title: 'Methods of Physical Tests for Hydraulic Cement',
      category: 'Test Methods',
      connection: 'All physical property tests (fineness, soundness, compressive strength) required for BIS certification of IS 8112 must follow IS 4031 procedures.',
      clause: 'Clause 7',
    },
    {
      isNumber: 'IS 4032',
      title: 'Method of Chemical Analysis of Hydraulic Cement',
      category: 'Chemical Analysis',
      connection: 'Chemical composition limits in IS 8112 Table 1 (MgO, SO3, etc.) are verified using test procedures in IS 4032. Referenced normatively in Clause 6.',
      clause: 'Clause 6',
    },
    {
      isNumber: 'IS 3535',
      title: 'Methods of Sampling Hydraulic Cement',
      category: 'Sampling',
      connection: 'Sampling procedures for quality assurance testing of cement lots must follow IS 3535, as referenced in IS 8112 Clause 9.',
      clause: 'Clause 9',
    },
    {
      isNumber: 'IS 456:2000',
      title: 'Code of Practice for Plain and Reinforced Concrete',
      category: 'Application',
      connection: 'Specifies usage requirements when IS 8112 cement is used in structural concrete (water-cement ratio, mix design, curing). Essential for "building foundation" application.',
      clause: 'Table 5',
    },
  ],
  versionInfo: {
    currentEdition: 2013,
    amendments: [
      { number: 1, year: 2015, description: 'Revised compressive strength requirement at 28 days.' },
      { number: 2, year: 2019, description: 'Updated alkali content limits and test frequency for QCO compliance.' },
    ],
    isOutdated: false,
  },
  certification: {
    required: true,
    scheme: 'ISI Mark',
    qcoName: 'Cement Quality Control Order, 2018',
    schemeName: 'ISI Certification Mark Scheme (IS 8112)',
    note: 'ISI Mark is mandatory for 43 grade OPC under the Cement QCO. Bulk procurement without ISI Mark certification is a statutory violation.',
  },
  reasoning: [
    { step: 'Product Understanding', detail: 'Parsed query: type=cement, grade=43 OPC, application=building foundation.' },
    { step: 'Hybrid Standards Search', detail: 'Matched "43 grade ordinary portland cement" verbatim against IS title index. Confidence 97% — highest possible for a direct title match.' },
    { step: 'Scope Clause Verification', detail: 'IS 8112:2013 Clause 1 scope is: "This standard prescribes requirements for 43 grade ordinary portland cement." Exact match confirmed.' },
    { step: 'Allied Standards Graph Traversal', detail: 'Traversed normative reference graph. IS 4031, IS 4032, IS 3535 are direct normative references. IS 456 added as the primary application standard for foundation concrete.' },
    { step: 'Version & Amendment Check', detail: 'IS 8112:2013 confirmed as current active edition. Two amendments (2015, 2019) are applicable. No supersession found.' },
    { step: 'Certification Registry Lookup', detail: 'Cement QCO 2018 schedules IS 8112 under mandatory ISI Mark. Applies to all grades of OPC manufactured/sold in India.' },
  ],
};

// ──────────────────────────────────────────────
// Scenario 3 — Submersible Pump (bonus chip)
// ──────────────────────────────────────────────
export const pumpScenario: StandardRecommendation = {
  id: 'pump',
  queryDescription: 'Submersible pump set for agricultural tube well, 5HP 3-phase',
  summary: 'Primary IS standard for submersible pump sets used in agricultural borewell and tube-well applications.',
  confidence: 89,
  primaryStandard: {
    isNumber: 'IS 14220:2018',
    title: 'Submersible Pump Sets for Agricultural Purposes — Specification',
    status: 'Active',
    scopeMatchReasoning:
      'IS 14220 Clause 1.1 covers "submersible pump sets for agricultural purposes including borewell and tube-well applications." The specified 5HP (3.73 kW) 3-phase motor falls within the rated power range of the standard (0.37 kW to 75 kW). Agricultural tube-well is an explicit use case.',
    clause: 'Clause 1.1 – Scope',
  },
  alliedStandards: [
    {
      isNumber: 'IS 9283',
      title: 'Motors for Submersible Pump Sets — Specification',
      category: 'Safety',
      connection: 'The 3-phase submersible motor component must comply with IS 9283, referenced normatively in IS 14220 Clause 4.1.',
      clause: 'Clause 4.1',
    },
    {
      isNumber: 'IS 8034',
      title: 'Submersible Pump Sets — Methods of Test',
      category: 'Test Methods',
      connection: 'Performance testing (head, discharge, efficiency) must follow IS 8034 procedures. Referenced in IS 14220 Clause 6.',
      clause: 'Clause 6',
    },
    {
      isNumber: 'IS 1554 (Part 1)',
      title: 'PVC Insulated Cables for Working Voltages — Conductor',
      category: 'Conductor',
      connection: 'Submersible cable connecting pump to starter panel must comply with IS 1554 (Pt 1). Referenced in IS 14220 Annex B.',
      clause: 'Annex B',
    },
    {
      isNumber: 'IS 325',
      title: 'Three Phase Induction Motors — Specification',
      category: 'Application',
      connection: 'General electrical motor requirements applicable to the 3-phase motor used in this pump set. Referenced as informative standard.',
      clause: 'Informative Reference',
    },
  ],
  versionInfo: {
    currentEdition: 2018,
    amendments: [{ number: 1, year: 2022, description: 'Added minimum efficiency requirements aligned with BEE star labelling for agricultural pumps.' }],
    isOutdated: false,
  },
  certification: {
    required: true,
    scheme: 'ISI Mark',
    qcoName: 'Agricultural Pumps Quality Control Order, 2022',
    schemeName: 'ISI Certification Mark Scheme (IS 14220)',
    note: 'ISI Mark is mandatory for submersible pump sets under the Agricultural Pumps QCO 2022. Also check BEE star labelling requirement for 5HP range.',
  },
  reasoning: [
    { step: 'Product Understanding', detail: 'Parsed: type=submersible pump set, application=agricultural tube well, power=5HP (3.73kW), phase=3-phase.' },
    { step: 'Hybrid Standards Search', detail: 'Matched against pump & motor standards category. IS 14220 scored highest for agricultural submersible pump sets.' },
    { step: 'Scope Clause Verification', detail: 'IS 14220:2018 Clause 1.1 confirmed agricultural borewell/tube-well scope with 5HP within rated range.' },
    { step: 'Allied Standards Graph Traversal', detail: 'Extracted IS 9283 (motor), IS 8034 (test methods), IS 1554 (cable), IS 325 (3-phase motor) from normative and informative reference graph.' },
    { step: 'Version & Amendment Check', detail: 'IS 14220:2018 is current. Amendment 1 (2022) adds BEE efficiency requirements. Confidence slightly lower (89%) due to some scope ambiguity for 5HP boundary.' },
    { step: 'Certification Registry Lookup', detail: 'Agricultural Pumps QCO 2022 mandates ISI Mark for IS 14220. BEE star labelling is a parallel requirement for pumps above 0.37kW.' },
  ],
};

// ──────────────────────────────────────────────
// Tender Audit Report — Scenario 3
// ──────────────────────────────────────────────
export type TenderItemStatus = 'compliant' | 'outdated' | 'missing';

export interface TenderLineItem {
  itemNo: number;
  itemName: string;
  tenderText: string;
  status: TenderItemStatus;
  finding: string;
  recommendation: StandardRecommendation | Partial<StandardRecommendation>;
  missingAllied?: string[];
  certification: CertificationInfo;
}

export interface TenderAuditReport {
  tenderTitle: string;
  tenderRef: string;
  analyzedDate: string;
  totalItems: number;
  compliantCount: number;
  outdatedCount: number;
  missingCount: number;
  lineItems: TenderLineItem[];
}

export const tenderAuditReport: TenderAuditReport = {
  tenderTitle: 'CPWD Electrical Works — Government Hostel (Block-C), New Delhi',
  tenderRef: 'CPWD_Electrical_Hostel_Tender_2026.pdf',
  analyzedDate: '2026-09-27',
  totalItems: 3,
  compliantCount: 1,
  outdatedCount: 1,
  missingCount: 1,
  lineItems: [
    {
      itemNo: 1,
      itemName: 'XLPE Insulated Power Cables (1.1 kV grade)',
      tenderText: 'Cables shall conform to IS 7098 (Part 1): 1988',
      status: 'outdated',
      finding: 'OUTDATED STANDARD REFERENCE — The referenced edition IS 7098 (Part 1):1988 has been superseded. The current active edition is IS 7098 (Part 1):2015 with Amendment 2 applicable.',
      recommendation: {
        id: 'cables',
        queryDescription: 'XLPE Insulated Power Cables 1.1 kV grade',
        confidence: 96,
        primaryStandard: {
          isNumber: 'IS 7098 (Part 1):2015',
          title: 'Cross-Linked Polyethylene Insulated PVC Sheathed Cables — For Working Voltage up to and including 1.1 kV',
          status: 'Active',
          scopeMatchReasoning: 'IS 7098 (Part 1):2015 is the current superseding edition. Amendment 2 (2021) is also applicable.',
        },
        versionInfo: {
          currentEdition: 2015,
          reaffirmedYear: 2020,
          amendments: [
            { number: 1, year: 2018, description: 'Revised conductor resistance requirements.' },
            { number: 2, year: 2021, description: 'Updated insulation test voltage and conductor cross-section table.' },
          ],
          isOutdated: true,
          outdatedDetails: {
            referencedVersion: 'IS 7098 (Part 1):1988',
            currentVersion: 'IS 7098 (Part 1):2015 (Reaffirmed 2020, Amendment 2)',
            outdatedBadge: 'Outdated Reference',
            recommendedBadge: 'Current Active Edition',
          },
        },
        alliedStandards: [
          {
            isNumber: 'IS 10810',
            title: 'Methods of Test for Cables — Various Parts',
            category: 'Test Methods',
            connection: 'All cable testing must follow IS 10810 procedures. Not referenced in tender document — must be added.',
            clause: 'Clause 7',
          },
          {
            isNumber: 'IS 8130',
            title: 'Conductors for Insulated Electric Cables and Flexible Cords — Specification',
            category: 'Conductor',
            connection: 'Conductor specifications (annealing, stranding) are governed by IS 8130, which must be referenced alongside IS 7098.',
            clause: 'Clause 4',
          },
        ],
      },
      missingAllied: ['IS 10810 (Test Methods)', 'IS 8130 (Conductor Specification)'],
      certification: {
        required: true,
        scheme: 'ISI Mark',
        qcoName: 'Electrical Wires and Cables Quality Control Order, 2023',
        schemeName: 'ISI Certification Mark Scheme (IS 7098)',
        note: 'ISI Mark mandatory. Ensure supplier holds valid BIS licence for IS 7098 (Part 1):2015, not the outdated 1988 edition.',
      },
    },
    {
      itemNo: 2,
      itemName: 'LED Luminaires for Indoor Lighting',
      tenderText: '"General LED lights as per site requirement" — No IS code referenced',
      status: 'missing',
      finding: 'MISSING IS REFERENCE — Tender does not specify any IS standard for LED luminaires. This is a mandatory Compulsory Registration Scheme (CRS) product.',
      recommendation: {
        id: 'led',
        queryDescription: 'LED Luminaires for Indoor Lighting',
        confidence: 91,
        primaryStandard: {
          isNumber: 'IS 16102 (Part 1 & 2):2012',
          title: 'Self-Ballasted LED Lamps for General Lighting Services — Safety and Performance Requirements',
          status: 'Active',
          scopeMatchReasoning: 'IS 16102 covers LED lamps and luminaires for general indoor lighting. Also check IS 10322 (Part 5/Sec 3) for LED luminaire fixtures.',
        },
        alliedStandards: [
          {
            isNumber: 'IS 10322 (Part 5/Sec 3)',
            title: 'Luminaires — Particular Requirements for LED Luminaires',
            category: 'Safety',
            connection: 'Covers luminaire-level safety requirements (thermal, electrical, mechanical) for LED-based indoor fixtures.',
            clause: 'Clause 4',
          },
          {
            isNumber: 'IS 15885 (Part 2/Sec 23)',
            title: 'Safety of LED Drivers and Drivers for General Lighting Purpose',
            category: 'Safety',
            connection: 'LED driver/ballast safety requirements — must be referenced for integrated LED luminaires.',
            clause: 'Clause 6',
          },
        ],
        versionInfo: {
          currentEdition: 2012,
          amendments: [{ number: 1, year: 2018, description: 'Updated photometric and colorimetric test requirements.' }],
          isOutdated: false,
        },
      },
      missingAllied: [],
      certification: {
        required: true,
        scheme: 'CRS',
        qcoName: 'LED Lights and Fixtures (Quality Control) Order, 2017',
        schemeName: 'Compulsory Registration Scheme (CRS) — BIS',
        note: 'CRS registration is mandatory for all LED lamps and luminaires. Each model must have a valid CRS registration number. This is a critical gap in the tender document.',
      },
    },
    {
      itemNo: 3,
      itemName: 'Electric Storage Water Heater (Geyser), 25L',
      tenderText: 'Electric storage water heaters shall conform to IS 2082:2018',
      status: 'compliant',
      finding: 'COMPLIANT — Tender correctly references the current active edition IS 2082:2018. Amendment 1 (2021) is applicable and should be noted.',
      recommendation: {
        ...waterHeaterScenario,
        queryDescription: 'Electric Storage Water Heater (Geyser), 25L — Tender Reference',
      },
      certification: waterHeaterScenario.certification,
    },
  ],
};

// ──────────────────────────────────────────────
// Quick search routing map
// ──────────────────────────────────────────────
export const queryToScenario: Record<string, StandardRecommendation> = {
  '25 litre electric storage water heater for government hostel': waterHeaterScenario,
  '43 grade ordinary portland cement for building foundation': cementScenario,
  'submersible pump set for agricultural tube well, 5hp 3-phase': pumpScenario,
};

export const exampleChips = [
  '25 litre electric storage water heater for government hostel',
  '43 grade ordinary portland cement for building foundation',
  'Submersible pump set for agricultural tube well, 5HP 3-phase',
];

export const STATS = [
  { label: 'Indian Standards Indexed', value: '23,613' },
  { label: 'Zero Hallucination Guarantee', value: '100%' },
  { label: 'Full Audit Trail', value: 'Always On' },
  { label: 'QCOs Tracked', value: '142' },
];
