"use client";

import { useState, useEffect, useRef } from "react";

const WEBHOOK_URL = "/api/request-membership";

const CLIP_PATH =
  "polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))";

export default function MembershipModal({ open, onClose }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [errorMsg, setErrorMsg] = useState("");
  const backdropRef = useRef(null);

  // Close on ESC
  useEffect(() => {
    if (!open) return;
    const handler = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  // Auto-close on success
  useEffect(() => {
    if (status !== "success") return;
    const timer = setTimeout(() => {
      onClose();
      setStatus("idle");
      setName("");
      setEmail("");
    }, 2000);
    return () => clearTimeout(timer);
  }, [status, onClose]);

  // Reset form when modal closes
  useEffect(() => {
    if (!open) {
      setStatus("idle");
      setErrorMsg("");
    }
  }, [open]);

  const handleBackdropClick = (e) => {
    if (e.target === backdropRef.current) onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");

    try {
      const res = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email }),
      });

      if (!res.ok) throw new Error(`Request failed (${res.status})`);
      setStatus("success");
    } catch (err) {
      setErrorMsg(err.message || "Something went wrong. Please try again.");
      setStatus("error");
    }
  };

  if (!open) return null;

  return (
    <div
      ref={backdropRef}
      onClick={handleBackdropClick}
      className="fixed inset-0 z-[2000] flex items-center justify-center bg-[rgba(0,0,0,0.7)] backdrop-blur-sm px-4"
    >
      <div className="bg-surface border border-border relative w-full max-w-md p-8 md:p-10">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-text-dim hover:text-white transition-colors text-xl leading-none cursor-pointer bg-transparent border-none font-mono"
        >
          &times;
        </button>

        {status === "success" ? (
          <div className="text-center py-8">
            <div className="text-accent text-4xl mb-4">&#10003;</div>
            <h3 className="font-display text-2xl text-white mb-2">
              Request Sent
            </h3>
            <p className="text-text-dim text-sm">
              We&apos;ll be in touch shortly.
            </p>
          </div>
        ) : (
          <>
            <h3 className="font-display text-[2rem] text-white tracking-[0.05em] mb-1">
              Request Membership
            </h3>
            <p className="font-mono text-[0.65rem] tracking-[0.2em] uppercase text-text-dim mb-8">
              Join the FOMO Protocol
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div>
                <label className="font-mono text-[0.65rem] tracking-[0.15em] uppercase text-text-dim mb-2 block">
                  Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  className="w-full bg-bg border border-border text-text px-4 py-3 text-sm font-body outline-none focus:border-accent transition-colors placeholder:text-text-dim/50"
                />
              </div>

              <div>
                <label className="font-mono text-[0.65rem] tracking-[0.15em] uppercase text-text-dim mb-2 block">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full bg-bg border border-border text-text px-4 py-3 text-sm font-body outline-none focus:border-accent transition-colors placeholder:text-text-dim/50"
                />
              </div>

              {status === "error" && (
                <p className="text-accent3 text-xs font-mono">{errorMsg}</p>
              )}

              <button
                type="submit"
                disabled={status === "sending"}
                className="font-mono text-xs md:text-sm tracking-[0.15em] uppercase py-[1.1rem] px-8 bg-accent text-bg font-bold border-none cursor-pointer transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed mt-2"
                style={{ clipPath: CLIP_PATH }}
              >
                {status === "sending" ? "Sending..." : "Send Request \u2192"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
