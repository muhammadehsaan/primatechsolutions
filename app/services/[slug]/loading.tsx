export default function ServiceLoading() {
  return (
    <div className="px-4 pb-16 sm:px-6">
      <div className="mx-auto max-w-5xl animate-pulse">
        <div className="mb-8 h-5 w-36 rounded-full bg-white/10" />

        <section className="surface-panel rounded-3xl px-5 py-10 sm:px-8 sm:py-12">
          <div className="mb-5 h-14 w-14 rounded-2xl bg-cyanPrimary/15" />
          <div className="h-4 w-40 rounded-full bg-cyanPrimary/20" />
          <div className="mt-5 h-10 w-full max-w-xl rounded-2xl bg-white/10" />
          <div className="mt-4 h-24 w-full rounded-3xl bg-white/5" />
        </section>

        <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2">
          <section className="surface-panel rounded-2xl p-7">
            <div className="h-8 w-52 rounded-full bg-cyanPrimary/20" />
            <div className="mt-5 space-y-3">
              <div className="h-5 w-full rounded-full bg-white/10" />
              <div className="h-5 w-11/12 rounded-full bg-white/10" />
              <div className="h-5 w-10/12 rounded-full bg-white/10" />
            </div>
          </section>

          <section className="surface-panel rounded-2xl p-7">
            <div className="h-8 w-52 rounded-full bg-cyanPrimary/20" />
            <div className="mt-5 space-y-3">
              <div className="h-5 w-full rounded-full bg-white/10" />
              <div className="h-5 w-11/12 rounded-full bg-white/10" />
              <div className="h-5 w-10/12 rounded-full bg-white/10" />
            </div>
          </section>
        </div>

        <section className="mt-10 rounded-3xl border border-cyanPrimary/25 bg-[linear-gradient(135deg,rgba(9,33,58,0.92),rgba(15,59,96,0.82))] p-6 sm:p-8">
          <div className="h-4 w-28 rounded-full bg-cyanPrimary/20" />
          <div className="mt-4 h-8 w-full max-w-sm rounded-full bg-white/10" />
          <div className="mt-4 h-20 w-full rounded-3xl bg-white/5" />
        </section>

        <div className="mt-10 space-y-6">
          {Array.from({ length: 3 }).map((_, index) => (
            <section key={index} className="surface-panel rounded-3xl p-6 sm:p-8">
              <div className="h-4 w-24 rounded-full bg-cyanPrimary/20" />
              <div className="mt-3 h-8 w-full max-w-md rounded-full bg-white/10" />
              <div className="mt-6 space-y-4">
                <div className="h-5 w-full rounded-full bg-white/10" />
                <div className="h-5 w-11/12 rounded-full bg-white/10" />
                <div className="h-5 w-10/12 rounded-full bg-white/10" />
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
