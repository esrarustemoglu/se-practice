import type { CheckResult, Room } from "../types";

export const minutesToTime = (m: number): string => {
  const h = Math.floor(m / 60);
  const min = m % 60;
  return `${String(h).padStart(2, "0")}:${String(min).padStart(2, "0")}`;
};

export const timeToMinutes = (t: string): number | null => {
  if (!t || !/^\d{2}:\d{2}$/.test(t)) return null;
  const [h, m] = t.split(":").map(Number);
  if (Number.isNaN(h) || Number.isNaN(m)) return null;
  return h * 60 + m;
};

const overlaps = (aStart: number, aEnd: number, bStart: number, bEnd: number) =>
  aStart < bEnd && bStart < aEnd;

export function checkAvailability(
  room: Room,
  start: number,
  end: number,
  currentTime: number
): CheckResult {
  const reasons: string[] = [];

  if (!Number.isFinite(start) || !Number.isFinite(end)) {
    return {
      decision: "unavailable",
      reasons: ["Enter valid start and end times using the HH:MM format."],
    };
  }

  if (start < 0) {
    reasons.push("Start time is before 00:00, the earliest allowed time.");
  }
  if (end > 1440) {
    reasons.push("End time is after 24:00, the latest allowed time.");
  }
  if (start >= end) {
    reasons.push(
      "Start time must be earlier than end time — the times look reversed."
    );
  }

  if (start <= currentTime) {
    reasons.push(
      `Start time must be after the current time (now ${minutesToTime(currentTime)}).`
    );
  }

  if (end - start > 120) {
    reasons.push(
      `Booking duration is ${end - start} minutes, which exceeds the 120-minute maximum.`
    );
  }

  if (room.blocked) {
    reasons.push(
      room.blockedReason
        ? `Room is blocked: ${room.blockedReason}`
        : "This room is currently blocked."
    );
  }

  const overlapping = room.bookings.filter((b) =>
    overlaps(start, end, b.start, b.end)
  );
  if (overlapping.length > 0) {
    const first = overlapping[0];
    reasons.push(
      `This interval overlaps the existing booking "${first.title}" (${minutesToTime(first.start)}–${minutesToTime(first.end)}). Intervals that only touch at endpoints are allowed.`
    );
  }

  return {
    decision: reasons.length === 0 ? "available" : "unavailable",
    reasons,
  };
}
