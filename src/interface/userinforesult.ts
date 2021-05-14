export interface RolePojo {
  id: string;
  roles: Array<string>;
  privileges: Array<string>;
}

export interface OrganisationProductRolePojo {
  organizationBaseId: string;
  productBaseId: string;
  roles: Array<string>;
  privileges: Array<string>;
}

export interface UserInfoResult {
  id: string;
  superAdmin: boolean;
  active: boolean;
  locked: boolean;
  emailVerified: boolean;
  firstName: string;
  middleName: string;
  title: string;
  email: string;
  gender: string;
  phoneNumber: string;
  username: string;
  orgId: string;
  organizationIds: Array<string>;
  branchId: string;
  privileges: Array<string>;
  roles: Array<string>;
  productRoles: Array<RolePojo>;
  organizationRoles: Array<RolePojo>;
  organizationProductRoles: Array<OrganisationProductRolePojo>;
}
