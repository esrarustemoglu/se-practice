import type { Room } from "./types";

export const sampleRooms: Room[] = [
  {
    id: "room-a101",
    name: "A101",
    building: "Engineering Block",
    capacity: 30,
    blocked: false,
    bookings: [
      { id: "b1", start: 540, end: 600, title: "CS 201 Lecture" }, // 9:00–10:00
      { id: "b2", start: 780, end: 840, title: "Faculty Meeting" }, // 13:00–14:00
    ],
  },
  {
    id: "room-b220",
    name: "B220",
    building: "Science Wing",
    capacity: 18,
    blocked: false,
    bookings: [
      { id: "b3", start: 600, end: 720, title: "Physics Lab" }, // 10:00–12:00
    ],
  },
  {
    id: "room-c305",
    name: "C305",
    building: "Library Tower",
    capacity: 12,
    blocked: true,
    blockedReason: "Under maintenance until further notice.",
    bookings: [],
  },
  {
    id: "room-d110",
    name: "D110",
    building: "Business Center",
    capacity: 40,
    blocked: false,
    bookings: [
      { id: "b4", start: 870, end: 930, title: "Guest Seminar" }, // 14:30–15:30
    ],
  },
  {
    id: "room-e002",
    name: "E002",
    building: "Arts Hall",
    capacity: 24,
    blocked: false,
    bookings: [],
  },
];
