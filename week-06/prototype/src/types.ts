export interface Booking {
  id: string;
  start: number; // minutes from midnight
  end: number; // minutes from midnight
  title: string;
}

export interface Room {
  id: string;
  name: string;
  building: string;
  capacity: number;
  blocked: boolean;
  blockedReason?: string;
  bookings: Booking[];
}

export type Decision = "available" | "unavailable" | "pending";

export interface CheckResult {
  decision: Decision;
  reasons: string[];
}

export interface IntervalInput {
  start: number;
  end: number;
  currentTime: number;
}
