import { EventConfig } from '..';

export interface GetEventDetailsResponse {
  eventId: number;
  name: string;
  eventType: string;
  eventStartDate: string;
  eventEndDate: string;
  noOfSessions: number;
  addressId: number;
  createdBy: number;
  updatedBy: number;
  preMemberLoad: boolean;
  eventConfig: Array<EventConfig>;
  rightsApplicable: boolean;
}
