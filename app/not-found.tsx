import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-cream px-5 text-center">
      <p className="section-label">404</p>
      <h1 className="mt-3 font-display text-4xl text-ink md:text-5xl">
        This page couldn&apos;t be found.
      </h1>
      <p className="mt-4 max-w-md text-muted">
        The space you&apos;re looking for may have moved. Let&apos;s take you
        back to something beautiful.
      </p>
      <Link href="/" className="btn-primary mt-8">
        Back to Home
      </Link>
    </div>
  );
}
