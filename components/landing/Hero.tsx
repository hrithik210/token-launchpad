import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Reveal from "./Reveal";

export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden px-5 sm:px-8">
      {/* One faint radial — sits behind the coin (right side) so it reads as
          the light source for the render. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-sky-500/[0.07] blur-[120px] lg:left-auto lg:right-[12%]"
      />

      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-2 lg:gap-8">
        <Reveal className="w-full text-center lg:text-left">
          <h1 className="text-balance text-4xl font-semibold tracking-tight text-zinc-50 sm:text-6xl">
            spin up a token on solana. no code, no bs.
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-pretty text-lg leading-relaxed text-zinc-400 lg:mx-0">
            everyone makes this complicated. you don&apos;t have to. connect
            wallet, name it, set the supply, done. it&apos;s live on-chain.
          </p>

          <div className="mt-9 flex justify-center lg:justify-start">
            <Link
              href="/launch"
              className="group inline-flex h-11 items-center justify-center gap-2 rounded-md bg-white px-6 text-sm font-medium text-black transition-colors hover:bg-zinc-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a]"
            >
              launch it
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>

          <p className="mt-6 text-sm text-zinc-500">
            free. you just pay network fees — basically nothing.
          </p>
        </Reveal>

        <Reveal delay={150} className="order-first lg:order-none">
          {/* Square crop of the 16:9 clip (object-cover centers on the coin),
              with a radial mask feathering the edges into #0a0a0a and hiding the
              generator watermark in the corner. */}
          <video
            src="/make_it_spin.mp4"
            autoPlay
            loop
            muted
            playsInline
            aria-hidden="true"
            className="mx-auto aspect-square w-full max-w-[300px] object-cover sm:max-w-[420px] lg:max-w-[520px] [mask-image:radial-gradient(circle_at_center,#000_46%,transparent_74%)] [-webkit-mask-image:radial-gradient(circle_at_center,#000_46%,transparent_74%)]"
          />
        </Reveal>
      </div>
    </section>
  );
}
