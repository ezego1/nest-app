export interface Tracker {
  id: string;

  itemCompleted: boolean;

  dateCompleted: Date;

  company: string;

  user: string;

  onboardingItem: string;

  active: boolean;

  deleted: boolean;

  dateCreated: Date;

  lastModified: Date;
}
