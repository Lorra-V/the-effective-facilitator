import Link from "next/link";
import { ShortAttribution } from "@/components/Attribution";

export default function AboutPage() {
  return (
    <main style={{ maxWidth: "40rem", margin: "0 auto", padding: "3rem 1.5rem" }}>
      <p style={{ marginBottom: "1.5rem" }}>
        <Link href="/">← Home</Link>
      </p>
      <h1>About</h1>
      <div style={{ marginTop: "1.5rem", lineHeight: 1.7 }}>
        <ShortAttribution />
      </div>
      <p style={{ marginTop: "1.5rem", color: "var(--tef-muted)", lineHeight: 1.7 }}>
        The full attribution, including the Intellectual Distinction between
        source framework elements and programme adaptations, appears at the end
        of{" "}
        <strong>Welcome and Introduction</strong> (
        <code>/paths/welcome</code>) after you launch through Ludwitt/Hult.
      </p>
      <p style={{ marginTop: "1.5rem" }}>
        <Link href="/explore">Explore the Paths</Link>
        {" · "}
        <Link href="/launch">Launch from Ludwitt/Hult</Link>
      </p>
    </main>
  );
}
