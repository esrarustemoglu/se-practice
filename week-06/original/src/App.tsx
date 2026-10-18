import { useMemo, useState } from "react";
import { Building2, Clock, DoorOpen, CheckCircle2, XCircle, Info } from "lucide-react";
import { sampleRooms } from "./data";
import type { CheckResult, Decision, Room } from "./types";
import { checkAvailability, minutesToTime, timeToMinutes } from "./utils/availability";

const nowMinutes = (now = new Date()): number =>
  now.getHours() * 60 + now.getMinutes();

const DecisionBadge = ({
  decision,
  reasonCount,
}: {
  decision: Decision;
  reasonCount: number;
}) => {
  if (decision === "pending") return null;
  const isAvailable = decision === "available";
  return (
    <div
      className={`rounded-lg px-4 py-3 text-sm ring-1 ${
        isAvailable
          ? "flex items-center gap-2 bg-emerald-50 text-emerald-700 ring-emerald-200"
          : "bg-rose-50 text-rose-700 ring-rose-200"
      }`}
      role="status"
      aria-live="polite"
    >
      {isAvailable ? (
        <div className="flex items-center gap-2 font-semibold">
          <CheckCircle2 size={18} />
          <span>Available</span>
        </div>
      ) : (
        <div>
          <div className="flex items-center gap-2 font-semibold">
            <XCircle size={18} />
            <span>Unavailable</span>
          </div>
          {reasonCount > 0 && (
            <p className="mt-1 text-xs font-normal text-rose-600">
              {reasonCount === 1
                ? "1 issue found — see details below."
                : `${reasonCount} issues found — see details below.`}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

const ReasonList = ({ result }: { result: CheckResult | null }) => {
  if (!result || result.reasons.length === 0) return null;
  return (
    <div className="mt-3" aria-label="Reasons this room is unavailable">
      <p className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-rose-600">
        Why it’s unavailable
      </p>
      <ul className="space-y-1.5">
        {result.reasons.map((r, i) => (
          <li
            key={i}
            className="flex items-start gap-2 text-sm text-rose-800 bg-rose-50 rounded-md px-3 py-2 ring-1 ring-rose-100"
          >
            <Info size={15} className="mt-0.5 shrink-0 text-rose-500" />
            <span>{r}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

function App() {
  const [rooms] = useState<Room[]>(sampleRooms);
  const [roomId, setRoomId] = useState<string>(sampleRooms[0].id);
  const [startTime, setStartTime] = useState<string>("10:30");
  const [endTime, setEndTime] = useState<string>("11:30");
  const [currentTime, setCurrentTime] = useState<number>(() => nowMinutes());

  const room = useMemo(() => rooms.find((r) => r.id === roomId)!, [rooms, roomId]);

  const startMin = timeToMinutes(startTime);
  const endMin = timeToMinutes(endTime);

  const result = useMemo<CheckResult | null>(() => {
    if (startMin === null || endMin === null) return null;
    return checkAvailability(room, startMin, endMin, currentTime);
  }, [room, startMin, endMin, currentTime]);

  const decision: Decision = result?.decision ?? "pending";

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto max-w-3xl px-4 py-8 sm:py-12">
        <header className="mb-8">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-sky-600 p-2.5 text-white shadow-sm">
              <DoorOpen size={22} />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight sm:text-2xl">
                Smart Campus Room Availability
              </h1>
              <p className="text-sm text-slate-500">
                Check whether a campus room is available for a time interval.
              </p>
            </div>
          </div>
        </header>

        <section className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200 sm:p-6">
          <h2 className="mb-4 text-base font-semibold text-slate-800">
            Check a room
          </h2>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label htmlFor="room" className="mb-1.5 block text-sm font-medium text-slate-700">
                Room
              </label>
              <div className="relative">
                <Building2
                  size={16}
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <select
                  id="room"
                  value={roomId}
                  onChange={(e) => setRoomId(e.target.value)}
                  className="w-full appearance-none rounded-lg border border-slate-300 bg-white py-2.5 pl-9 pr-3 text-sm shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
                >
                  {rooms.map((r) => (
                    <option key={r.id} value={r.id} disabled={r.blocked}>
                      {r.name} — {r.building} (cap. {r.capacity})
                      {r.blocked ? " · Blocked" : ""}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="start" className="mb-1.5 block text-sm font-medium text-slate-700">
                Start time
              </label>
              <div className="relative">
                <Clock
                  size={16}
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  id="start"
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 bg-white py-2.5 pl-9 pr-3 text-sm shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
                />
              </div>
            </div>

            <div>
              <label htmlFor="end" className="mb-1.5 block text-sm font-medium text-slate-700">
                End time
              </label>
              <div className="relative">
                <Clock
                  size={16}
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  id="end"
                  type="time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 bg-white py-2.5 pl-9 pr-3 text-sm shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="current" className="mb-1.5 block text-sm font-medium text-slate-700">
                Current time (minutes from midnight)
              </label>
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                <input
                  id="current"
                  type="number"
                  min={0}
                  max={1440}
                  value={currentTime}
                  onChange={(e) =>
                    setCurrentTime(Number(e.target.value))
                  }
                  className="w-full rounded-lg border border-slate-300 bg-white py-2.5 px-3 text-sm shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:max-w-xs"
                />
                <button
                  type="button"
                  onClick={() => setCurrentTime(nowMinutes())}
                  className="rounded-lg bg-slate-100 px-3 py-2 text-sm font-medium text-slate-700 ring-1 ring-slate-200 transition hover:bg-slate-200"
                >
                  Use actual now ({minutesToTime(nowMinutes())})
                </button>
              </div>
              <p className="mt-1 text-xs text-slate-500">
                Adjust to simulate “now” for validating AC1. 0 = 00:00, 1440 = 24:00.
              </p>
            </div>
          </div>

          <div className="mt-5">
            <DecisionBadge
              decision={decision}
              reasonCount={result?.reasons.length ?? 0}
            />
            <ReasonList result={result} />
            {decision === "available" && (
              <p className="mt-3 text-sm text-emerald-700 bg-emerald-50 rounded-md px-3 py-2">
                {room.name} is available from {minutesToTime(startMin ?? 0)} to{" "}
                {minutesToTime(endMin ?? 0)}. Existing bookings are unchanged.
              </p>
            )}
          </div>
        </section>

        <section className="mt-6 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200 sm:p-6">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-base font-semibold text-slate-800">
              {room.name} · existing bookings
            </h2>
            <span
              className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                room.blocked
                  ? "bg-rose-100 text-rose-700"
                  : "bg-emerald-100 text-emerald-700"
              }`}
            >
              {room.blocked ? "Blocked" : "Open"}
            </span>
          </div>

          {room.bookings.length === 0 ? (
            <p className="text-sm text-slate-500">No existing bookings.</p>
          ) : (
            <ul className="divide-y divide-slate-100">
              {room.bookings.map((b) => (
                <li key={b.id} className="flex items-center justify-between py-2.5 text-sm">
                  <span className="font-medium text-slate-700">{b.title}</span>
                  <span className="tabular-nums text-slate-500">
                    {minutesToTime(b.start)} – {minutesToTime(b.end)}
                  </span>
                </li>
              ))}
            </ul>
          )}

          {room.blocked && room.blockedReason && (
            <p className="mt-3 rounded-md bg-rose-50 px-3 py-2 text-sm text-rose-700">
              {room.blockedReason}
            </p>
          )}
        </section>

        <footer className="mt-6 text-center text-xs text-slate-400">
          Fictional sample data · No bookings are actually created or modified.
        </footer>
      </div>
    </div>
  );
}

export default App;
