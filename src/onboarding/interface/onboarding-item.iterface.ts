export interface OnboardingItem {
  id: string;

  itemHeader: string;

  description: string;

  enabledForOrgs: boolean;

  confirmationEndpoint: string;

  mobileRedirectUrl: string;

  webRedirectUrl: string;

  order: string;

  icon: string;

  userType: string;

  active: boolean;

  deleted: boolean;

  dateCreated: Date;

  lastModified: Date;
}
