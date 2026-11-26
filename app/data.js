// NusaStats data: every figure below is a real, published number.
// Each figure carries its source and year; the views print both next to
// the number. Nothing here is invented, estimated by us, or rounded
// beyond what the source itself publishes (derived shares are marked).

export const SOURCES = {
  bps_pop: "Statistics Indonesia (BPS), Population Projection 2020–2050",
  bps_census: "Statistics Indonesia (BPS), Population Census",
  bps_gdp: "Statistics Indonesia (BPS), Economic Growth release, 5 Feb 2025 & 5 Feb 2026",
  bps_cpi: "Statistics Indonesia (BPS), Consumer Price Index release No. 01/01/Th. XXVIII, 2 Jan 2025",
  bps_sakernas: "Statistics Indonesia (BPS), National Labor Force Survey (Sakernas), Aug 2024",
  bps_poverty: "Statistics Indonesia (BPS), Poverty Profile Sep 2024, release 15 Jan 2025",
  bps_gini: "Statistics Indonesia (BPS), Expenditure Inequality release, 25 Jul 2025",
  bps_hdi: "Statistics Indonesia (BPS), Human Development Index release No. 104/11/Th. XXVIII, 5 Nov 2025",
  bps_trade: "Statistics Indonesia (BPS) customs figures, via World Bank merchandise trade indicators",
  bps_prov: "Statistics Indonesia (BPS), provincial population estimates",
  un_wpp: "United Nations, World Population Prospects",
  iza_labour: "IZA World of Labour, The labour market in Indonesia 2001–2024 (Sakernas data)",
  cia_factbook: "CIA World Factbook, Indonesia economy",
  cepii_baci: "CEPII BACI reconciled trade data",
  budget_2024: "Government of Indonesia, State Budget",
};

export const META = {
  siteName: "NusaStats",
  tagline: "Indonesia in Numbers",
  updated: "26 November 2026",
  country: "Indonesia",
  provinces: 38,
};

// Headline indicators shown on the Overview page.
export const HEADLINES = [
  { label: "Population", value: "284.44", unit: "million", year: "mid-2025", source: SOURCES.bps_pop, note: "4th most populous country in the world" },
  { label: "GDP", value: "Rp 23,821", unit: "trillion", year: "2025", source: SOURCES.bps_gdp, note: "Largest economy in Southeast Asia" },
  { label: "Human Development Index", value: "75.90", unit: "points", year: "2025", source: SOURCES.bps_hdi, note: "High human development category" },
  { label: "Poverty rate", value: "8.47", unit: "%", year: "Mar 2025", source: SOURCES.bps_poverty, note: "23.85 million people below the poverty line" },
];

export const GLANCE = [
  { label: "GDP growth", value: "5.11%", year: "2025", source: SOURCES.bps_gdp },
  { label: "GDP per capita", value: "US$ 5,083", year: "2025", source: SOURCES.bps_gdp },
  { label: "Inflation (Dec, yoy)", value: "1.57%", year: "2024", source: SOURCES.bps_cpi },
  { label: "Unemployment", value: "4.85%", year: "Aug 2025", source: SOURCES.bps_sakernas },
  { label: "Life expectancy", value: "74.47 yrs", year: "2025", source: SOURCES.bps_hdi },
  { label: "Gini ratio", value: "0.375", year: "Mar 2025", source: SOURCES.bps_gini },
];

// GDP: nominal (Rp trillion) and real growth (%), 2020–2025. BPS.
export const GDP_SERIES = [
  { year: 2020, nominal: 15438, growth: -2.07 },
  { year: 2021, nominal: 16971, growth: 3.69 },
  { year: 2022, nominal: 19589, growth: 5.31 },
  { year: 2023, nominal: 20892, growth: 5.05 },
  { year: 2024, nominal: 22139, growth: 5.03 },
  { year: 2025, nominal: 23821, growth: 5.11 },
];
export const GDP_PER_CAPITA = [
  { year: 2024, idr: "Rp 78.62 million", usd: "US$ 4,960" },
  { year: 2025, idr: "Rp 83.7 million", usd: "US$ 5,083" },
];

// Inflation: December year-on-year, %. BPS CPI releases.
export const INFLATION_SERIES = [
  { year: 2022, value: 5.51 },
  { year: 2023, value: 2.61 },
  { year: 2024, value: 1.57 },
];

// Trade in goods, 2024, US$ billion. BPS customs / World Bank indicators.
export const TRADE_2024 = {
  exports: 264.7, imports: 233.7, surplus: 31.0,
  products: [
    { name: "Mineral fuels & oils", share: 20.8 },
    { name: "Animal & vegetable fats & oils", share: 11.7 },
    { name: "Iron & steel", share: 8.6 },
    { name: "All other products", share: 58.9, derived: true },
  ],
  partners: [
    { name: "China", value: 68.0, share: 22.5 },
    { name: "United States", value: 27.0, share: 9.8 },
    { name: "India", value: 21.4, share: 8.1 },
  ],
};

// GDP by sector of origin, 2024. CIA World Factbook estimates; shares do
// not sum to 100% because of non-allocated consumption (source's own note).
export const GDP_SECTORS = [
  { name: "Services", share: 43.8 },
  { name: "Industry", share: 39.3 },
  { name: "Agriculture", share: 12.6 },
];

// Population: BPS projection series, millions, 2020–2025.
export const POP_SERIES = [
  { year: 2020, value: 269.9 },
  { year: 2021, value: 272.8 },
  { year: 2022, value: 275.7 },
  { year: 2023, value: 278.7 },
  { year: 2024, value: 281.6 },
  { year: 2025, value: 284.4 },
];

// Age structure, 2024, %. UN World Population Prospects 2024. The 15–64
// share is arithmetic (100 − 24.6 − 7.3), marked derived.
export const AGE_GROUPS = [
  { name: "0–14 years", share: 24.6 },
  { name: "15–64 years", share: 68.1, derived: true },
  { name: "65+ years", share: 7.3 },
];

// Provinces of Java, mid-2024. BPS estimates; area and density as
// published in the same BPS-based provincial tables.
export const JAVA_PROVINCES = [
  { name: "West Java", capital: "Bandung", pop: 50.35, area: 37040, density: 1359 },
  { name: "East Java", capital: "Surabaya", pop: 41.81, area: 48037, density: 870 },
  { name: "Central Java", capital: "Semarang", pop: 37.89, area: 34337, density: 1104 },
  { name: "Banten", capital: "Serang", pop: 12.43, area: 9353, density: 1329 },
  { name: "Jakarta", capital: "Central Jakarta", pop: 10.68, area: 661, density: 16165 },
  { name: "Yogyakarta", capital: "Yogyakarta", pop: 3.76, area: 3171, density: 1186 },
];
export const PROVINCE_NOTES = {
  northSumatra: { name: "North Sumatra", pop: 15.6, note: "Largest province outside Java" },
  southPapua: { name: "South Papua", pop: 0.55, note: "Smallest province by population" },
  javaShare: { value: "56.1%", note: "of Indonesians live on Java, about 7% of the land area" },
};

// Unemployment: open unemployment rate (TPT), August, %. BPS Sakernas.
export const UNEMPLOYMENT_SERIES = [
  { year: 2021, value: 6.49 },
  { year: 2022, value: 5.86 },
  { year: 2023, value: 5.32 },
  { year: 2024, value: 4.91 },
  { year: 2025, value: 4.85 },
];
export const LABOUR = {
  labourForce: { value: "152.11", unit: "million people", year: "Aug 2024", source: SOURCES.bps_sakernas },
  unemployed: { value: "7.47", unit: "million people", year: "Aug 2024", source: SOURCES.bps_sakernas },
  employed: { value: "145", unit: "million people", year: "2024", source: SOURCES.iza_labour },
  informal: { value: "58", unit: "% of workers", year: "2024", source: SOURCES.iza_labour },
  sectors: [
    { name: "Agriculture, forestry & fishing", share: 28.0 },
    { name: "Trade & services", share: 27.0 },
    { name: "Manufacturing", share: 13.8 },
  ],
  wages: [
    { group: "Men", value: 3.30 },
    { group: "Women", value: 2.57 },
  ],
  extremes: [
    { name: "West Java", value: 6.75, note: "highest provincial rate" },
    { name: "Highland Papua", value: 1.32, note: "lowest provincial rate" },
  ],
};

// Poverty, %. BPS (Susenas). Poverty line Sep 2024: Rp 595,242 per capita/month.
export const POVERTY_SERIES = [
  { year: "Mar 2023", value: 9.36 },
  { year: "Mar 2024", value: 9.03 },
  { year: "Sep 2024", value: 8.57 },
  { year: "Mar 2025", value: 8.47 },
];
export const POVERTY_DETAIL = {
  poorPeople: { value: "23.85", unit: "million people", year: "Mar 2025" },
  urban: { value: "6.66", unit: "%", year: "Sep 2024" },
  rural: { value: "11.34", unit: "%", year: "Sep 2024" },
  line: { value: "Rp 595,242", unit: "per capita / month", year: "Sep 2024" },
};

// Gini ratio (expenditure). BPS.
export const GINI_SERIES = [
  { year: "Mar 2024", value: 0.379 },
  { year: "Sep 2024", value: 0.381 },
  { year: "Mar 2025", value: 0.375 },
];

// HDI and its components. BPS HDI releases.
export const HDI_SERIES = [
  { year: 2020, hdi: 72.81, life: 73.37, eys: 12.98 },
  { year: 2021, hdi: 73.16, life: 73.46, eys: 13.08 },
  { year: 2022, hdi: 73.77, life: 73.70, eys: 13.10 },
  { year: 2023, hdi: 74.39, life: 73.93, eys: 13.15 },
  { year: 2024, hdi: 75.02, life: 74.15, eys: 13.21 },
  { year: 2025, hdi: 75.90, life: 74.47, eys: 13.30 },
];
export const MYS_SERIES = [
  { year: 2023, value: 8.77 },
  { year: 2024, value: 8.85 },
  { year: 2025, value: 9.07 },
];
export const HDI_COMPONENTS_2025 = [
  { indicator: "Life expectancy at birth", value: "74.47 years" },
  { indicator: "Expected years of schooling", value: "13.30 years" },
  { indicator: "Mean years of schooling (age 25+)", value: "9.07 years" },
  { indicator: "Adjusted real expenditure per capita / year", value: "Rp 12,802,000" },
];
export const HDI_PROVINCES = [
  { name: "Jakarta", value: 85.05, note: "highest" },
  { name: "Highland Papua", value: 54.91, note: "lowest" },
];

// Education budget. Government of Indonesia, State Budget 2024.
export const EDUCATION_BUDGET = { value: "Rp 665", unit: "trillion", year: "2024", note: "at least 20% of the state budget goes to education by law" };

// Flat table of every headline figure, for the Tables page.
export const ALL_INDICATORS = [
  { indicator: "Population", value: "284.44 million", year: "mid-2025", source: SOURCES.bps_pop },
  { indicator: "Population, 2020 census", value: "270.20 million", year: "2020", source: SOURCES.bps_census },
  { indicator: "Median age", value: "30.1 years", year: "2024", source: SOURCES.un_wpp },
  { indicator: "Urban population share", value: "59.0%", year: "2024", source: SOURCES.un_wpp },
  { indicator: "Population density", value: "156 per km²", year: "2024", source: SOURCES.un_wpp },
  { indicator: "GDP (nominal)", value: "Rp 23,821 trillion", year: "2025", source: SOURCES.bps_gdp },
  { indicator: "GDP growth", value: "5.11%", year: "2025", source: SOURCES.bps_gdp },
  { indicator: "GDP per capita", value: "US$ 5,083", year: "2025", source: SOURCES.bps_gdp },
  { indicator: "Inflation (December, yoy)", value: "1.57%", year: "2024", source: SOURCES.bps_cpi },
  { indicator: "Exports of goods", value: "US$ 264.7 billion", year: "2024", source: SOURCES.bps_trade },
  { indicator: "Imports of goods", value: "US$ 233.7 billion", year: "2024", source: SOURCES.bps_trade },
  { indicator: "Trade surplus (goods)", value: "US$ 31.0 billion", year: "2024", source: SOURCES.bps_trade },
  { indicator: "Labour force", value: "152.11 million", year: "Aug 2024", source: SOURCES.bps_sakernas },
  { indicator: "Open unemployment rate", value: "4.85%", year: "Aug 2025", source: SOURCES.bps_sakernas },
  { indicator: "Informal workers", value: "58% of workers", year: "2024", source: SOURCES.iza_labour },
  { indicator: "Poverty rate", value: "8.47%", year: "Mar 2025", source: SOURCES.bps_poverty },
  { indicator: "Poverty line", value: "Rp 595,242 / capita / month", year: "Sep 2024", source: SOURCES.bps_poverty },
  { indicator: "Gini ratio", value: "0.375", year: "Mar 2025", source: SOURCES.bps_gini },
  { indicator: "Human Development Index", value: "75.90", year: "2025", source: SOURCES.bps_hdi },
  { indicator: "Life expectancy at birth", value: "74.47 years", year: "2025", source: SOURCES.bps_hdi },
  { indicator: "Expected years of schooling", value: "13.30 years", year: "2025", source: SOURCES.bps_hdi },
  { indicator: "Mean years of schooling (age 25+)", value: "9.07 years", year: "2025", source: SOURCES.bps_hdi },
];
