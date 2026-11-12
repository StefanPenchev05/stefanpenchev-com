import Link from "next/link";

export default function NotFound() {
  return (
    <section className="site-container section space-y-4">
      <h1>Page not found</h1>
      <p>The page you requested could not be found.</p>
      <Link href="/">Back to home</Link>
    </section>
  );
}
