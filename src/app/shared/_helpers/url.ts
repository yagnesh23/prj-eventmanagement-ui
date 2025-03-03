export default class Url {
  // EVENTS API
  static GET_EVENT_INFO = `${'v1/sam2api/portal/event/{id}'}`;
  static GET_MASTER = `${'v1/sam2api/portal/event/{id}/masters'}`;
  static REGISTER_MEMBER = `${'v1/sam2api/portal/event/{id}/register'}`;
  static VERIFY_MEMBER_MOBILE_NUMBER = `${'v1/sam2api/portal/event/{id}/search/member'}`;
  static GET_MEMBER_REFERENCES_LIST = `${'v1/sam2api/portal/event/{id}/member/{regId}/referers'}`;
  static SET_MEMBER_PAYMENT_STATUS = `${'v1/sam2api/portal/event/{id}/member/{regId}/status/{status}'}`;
}
