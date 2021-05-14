import { UserInfoResult } from './userinforesult';
import { Request } from 'express';

export default interface ExtendedRequest extends Request {
  user?: UserInfoResult;
  acceptLanguageCode: string;
  userIdentityCompositeKey: {
    currentProduct: string;
    currentOrg: string;
    currentBranch: string;
    currentUserType: string;
  };
}
