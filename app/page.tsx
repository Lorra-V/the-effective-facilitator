import Image from "next/image";
import Link from "next/link";
import { ShortAttribution } from "@/components/Attribution";

export default function HomePage() {
  return (
    <div className="tef-home">
      {/* Section 1 — Hero (no header/nav); Discover CTA → Ludwitt /launch */}
      <section className="tef-home-hero" aria-label="Introduction">
        <Image
          src="/images/hero-image.png"
          alt=""
          fill
          priority
          className="tef-home-hero-img"
          sizes="100vw"
        />
        <div className="tef-home-hero-copy">
          <h1>
            The Effective
            <br />
            Facilitator
          </h1>
          <p className="tef-home-hero-tagline">
            AI makes creation abundant; human judgment sets the limit
          </p>
          <Link href="/launch" className="tef-btn-bevel">
            Discover Your Facilitator Profile
          </Link>
        </div>
      </section>

      {/* Section 2 — porcelain (top) / lilac (bottom); diagram floats across */}
      <section
        className="tef-home-disciplines"
        aria-labelledby="nine-disciplines-title"
      >
        <div className="tef-home-disciplines-split" aria-hidden />
        <div className="tef-home-disciplines-inner">
          <p className="tef-home-disciplines-copy">
            <strong>The Effective Facilitator</strong> is a developmental
            programme that strengthens the judgment, self-awareness and human
            agency required to navigate authority, ambiguity and control —
            without surrendering to the machine.
          </p>
          <div className="tef-home-disciplines-visual">
            <h2 id="nine-disciplines-title">The Nine Disciplines</h2>
            <Image
              src="/images/the-nine-disciplines.png"
              alt="Diagram of nine disciplines across Regarding Others, Regarding Myself, and Regarding Life"
              width={1600}
              height={900}
              className="tef-home-disciplines-img"
              sizes="(max-width: 960px) 92vw, 820px"
            />
          </div>
          <Link href="/explore" className="tef-btn-bevel">
            Explore the Nine Disciplines
          </Link>
        </div>
      </section>

      {/* Section 3 — self copy, green strip CTA, short attribution */}
      <section
        className="tef-home-self"
        aria-labelledby="facilitation-self-title"
      >
        <div className="tef-home-self-copy">
          <h2 id="facilitation-self-title">
            Facilitation Begins with the Facilitation of Self
          </h2>
          <p>
            This programme is for people working and making decisions with AI.
            Through the Nine Disciplines, it helps learners examine how they
            respond to influence, uncertainty, responsibility and
            control—strengthening the judgment, self-awareness and human agency
            needed to use AI without surrendering independent thought.
          </p>
          <p>
            The Effective Facilitator combines practical scenarios,
            self-assessment and real-world exercises to help participants remain
            purposeful, accountable, creative and fully human in an age of
            abundant machine-generated possibilities.
          </p>
        </div>

        <div className="tef-home-profile-strip">
          <Link href="/launch" className="tef-btn-bevel">
            Discover Your Facilitator Profile
          </Link>
        </div>

        <footer className="tef-home-footer">
          <ShortAttribution />
        </footer>
      </section>
    </div>
  );
}
