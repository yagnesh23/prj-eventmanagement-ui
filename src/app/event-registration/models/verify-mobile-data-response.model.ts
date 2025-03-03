import { memberPersonalInfo } from './member-personal-info.model';

export interface VerifyMobileDataResponse {
  memberId?: string;
  firstName?: string;
  lastName?: string;
  gender?: string;
  mobile?: string;
  email?: string;
  regId?: string;
  regDate?: string;
  register?: number;
  eventId?: string;
  refName?: string;
  refererCode?: string;
  personalInfo?: memberPersonalInfo;
}
