import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--bg-app)] px-4">
      <div className="max-w-md w-full text-center space-y-6 p-8 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)]">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-500/10 text-blue-500 text-2xl font-mono font-bold">
          404
        </div>
        <h1 className="text-2xl font-heading font-bold text-[var(--text-main)]">
          Page Not Found
        </h1>
        <p className="text-sm text-[var(--text-muted)] font-sans">
          The requested page could not be located. Return to the single-page metrology suite.
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-sm font-heading font-semibold transition-colors"
        >
          Return to Overview
        </Link>
      </div>
    </div>
  );
}
