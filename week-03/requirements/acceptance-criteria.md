# Acceptance criteria — three selected stories

---

## Assumptions

- **Overlap:** a booking that ends exactly when another begins is allowed under R3, because back-to-back bookings maximize room utilization and do not create a schedule conflict for the same minute slot.
- **Duration:** a booking of exactly two hours is allowed under R2, because 120 minutes is inclusive of the maximum allowed duration limit.
- **Future Start Time:** all booking start times must be strictly after the current system clock time under R1.
- **Blocked Precedence:** an administrative block immediately prevents any student booking during that period under R4.

---

## US-01 — View room availability

### AC-01
- **Given** Room A is unblocked and has no existing reservations from 14:00 to 15:00 tomorrow,
- **When** a Student checks room availability for 14:00 to 15:00 tomorrow,
- **Then** the system lists Room A as available for booking.

### AC-02
- **Given** Room B is blocked for servicing by an Administrator tomorrow,
- **When** a Student checks room availability for any slot tomorrow,
- **Then** Room B is excluded from the list of available rooms.

### AC-03
- **Given** a Student opens the availability search form,
- **When** they submit a search query for a time slot in the past or a duration exceeding two hours,
- **Then** the system displays a validation error message and returns no available rooms.

---

## US-02 — Book a study room

### AC-04
- **Given** Room A is unblocked and has no bookings from 14:00 to 16:00 tomorrow,
- **When** a Student submits a booking request for Room A from 14:00 to 16:00 tomorrow,
- **Then** the system creates the booking and generates a confirmation.

### AC-05
- **Given** the current time is 10:00 AM today,
- **When** a Student attempts to book Room A for 09:00 to 10:00 AM today,
- **Then** the system rejects the booking with an error stating that bookings must be in the future.

### AC-06
- **Given** Room A is available,
- **When** a Student attempts to book Room A for 2 hours and 1 minute (e.g., 13:00 to 15:01),
- **Then** the system rejects the booking with an error stating the maximum duration limit is two hours.

### AC-07
- **Given** Room A is booked from 14:00 to 15:00 tomorrow,
- **When** another Student attempts to book Room A from 14:30 to 15:30 tomorrow,
- **Then** the system denies the request due to an overlapping schedule conflict.

### AC-08
- **Given** Room B is currently blocked by an Administrator,
- **When** a Student attempts to submit a booking for Room B,
- **Then** the system rejects the request stating the room is out of service.

---

## US-03 — Cancel a booking

### AC-09
- **Given** a Student has an active future booking for Room A,
- **When** the Student cancels the booking,
- **Then** the system cancels the reservation and releases the slot.

### AC-10
- **Given** a Student successfully cancels a booking for Room A from 14:00 to 15:00 tomorrow,
- **When** another Student checks room availability for that same slot,
- **Then** Room A is displayed as available and can be booked immediately.

### AC-11
- **Given** a booking was already cancelled or does not exist,
- **When** a Student attempts to cancel the booking again,
- **Then** the system displays an error message stating the booking cannot be found or is already inactive.