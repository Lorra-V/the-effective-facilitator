import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Get Started | The Effective Facilitator",
  description:
    "Enter your email to begin The Effective Facilitator — you'll be taken straight into the course.",
};

type Props = {
  searchParams: Promise<{ error?: string }>;
};

export default async function GetStartedPage({ searchParams }: Props) {
  const params = await searchParams;
  const showError = params.error === "1";

  return (
    <main className="tef-get-started">
      <p className="tef-get-started-back">
        <Link href="/">← Home</Link>
      </p>

      <h1>Get Started</h1>
      <p className="tef-get-started-lead">
        Enter your details below and you&apos;ll be taken straight into the
        course — no separate account setup, no waiting for an invite email.
      </p>

      {showError ? (
        <p className="tef-get-started-error" role="alert">
          Something went wrong. Please try again.
        </p>
      ) : null}

      <form
        className="tef-get-started-form"
        action="/api/get-started"
        method="post"
        autoComplete="on"
      >
        {/*
          Honeypot: checkbox (not a text field named company/website/etc.).
          Password managers and browser autofill routinely fill those text
          names and were silently rejecting real learners. Bots that toggle
          every control still get dropped.
        */}
        <div className="tef-hp" aria-hidden="true">
          <label htmlFor="tef_extra">Leave blank</label>
          <input
            id="tef_extra"
            name="tef_extra"
            type="checkbox"
            value="1"
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        <label htmlFor="name">
          Name <span className="tef-get-started-optional">(optional)</span>
        </label>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          maxLength={120}
        />

        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          inputMode="email"
          maxLength={254}
        />

        <p className="tef-get-started-why">
          We use your email only to start your learning session and keep your
          progress tied to you — not for marketing lists.
        </p>

        <button type="submit" className="tef-btn-bevel">
          Begin the Programme
        </button>
      </form>
    </main>
  );
}
