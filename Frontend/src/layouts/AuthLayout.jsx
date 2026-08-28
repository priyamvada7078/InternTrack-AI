import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-slate-950">

      {/* Left Side */}
      <div className="hidden lg:flex flex-col justify-center px-20 bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white">

        <h1 className="text-5xl font-bold leading-tight">
          Every Application.
          <br />
          One Track.
        </h1>

        <p className="mt-6 text-slate-400 max-w-md">
          InternTrack AI helps you organize internships,
          applications, interviews and offers in one place.
        </p>

        <div className="mt-12 space-y-8">

          <div>
            <p className="text-indigo-400 font-semibold">01 APPLIED</p>
            <p className="text-slate-400">
              Application sent automatically tracked.
            </p>
          </div>

          <div>
            <p className="text-indigo-400 font-semibold">02 SCREEN</p>
            <p className="text-slate-400">
              Resume and OA status updates.
            </p>
          </div>

          <div>
            <p className="text-indigo-400 font-semibold">03 INTERVIEW</p>
            <p className="text-slate-400">
              Schedule interviews and notes.
            </p>
          </div>

          <div>
            <p className="text-indigo-400 font-semibold">04 OFFER</p>
            <p className="text-slate-400">
              Receive and track offers.
            </p>
          </div>

        </div>
      </div>

      {/* Right Side */}
      <div className="flex items-center justify-center px-6">

        <Outlet />

      </div>

    </div>
  );
}