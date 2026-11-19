export interface Link {
  name: string;
  url: string;
}

// Months use YYYY-MM; null means the role is ongoing.
export class Period {
  constructor(readonly from: string, readonly to: string | null) {}

  get current(): boolean {
    return this.to === null;
  }
}

export interface Experience {
  company: string;
  role: string;
  period: Period;
  achievements: string[];
}

export interface Profile {
  name: string;
  description: string;
  links: Link[];
  skills: string[];
  experience: Experience[];
  projects: Link[];
}
