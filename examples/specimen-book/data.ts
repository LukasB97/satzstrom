export type SpecimenData = {
  issue: string;
  published: string;
  journal: { author: string; institution: string };
  cities: Array<{ name: string; heat: number; canopy: number; population: string }>;
  quarters: Array<{ label: string; actual: number; plan: number }>;
  portfolio: Array<{ name: string; revenue: string; growth: string; margin: string }>;
};
