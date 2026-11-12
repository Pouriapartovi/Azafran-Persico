"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Pause, Play } from "lucide-react";
import { useLocale } from "./locale-provider";
import { cn } from "@/lib/utils";

// Silent looping film. It only plays while on screen (saves data and battery), has a pause button,
// and stays on its still image for visitors who prefer reduced motion.
export function StoryVideo({ src, poster, className }: { src: string; poster: string; className?: string }) {
  const { t } = useLocale();
  const ref = useRef<HTMLVideoElement>(null);
  const reduce = useReducedMotion();
  const [paused, setPaused] = useState(false);
  const userPaused = useRef(false);

  useEffect(() => {
    const v = ref.current;
    if (!v || reduce) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !userPaused.current) v.play().catch(() => setPaused(true));
      else v.pause();
    }, { threshold: 0.25 });
    io.observe(v);
    return () => io.disconnect();
  }, [reduce]);

  const toggle = () => {
    const v = ref.current;
    if (!v) return;
    if (v.paused) { userPaused.current = false; v.play().catch(() => {}); }
    else { userPaused.current = true; v.pause(); }
  };

  return (
    <motion.div
      className={cn("relative overflow-hidden bg-earth-deep", className)}
      initial={reduce ? false : { clipPath: "inset(12% 0% 0% 0%)", opacity: 0 }}
      whileInView={{ clipPath: "inset(0% 0% 0% 0%)", opacity: 1 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
    >
      <video
        ref={ref}
        className="absolute inset-0 h-full w-full object-cover"
        src={src}
        poster={poster}
        muted
        loop
        playsInline
        preload="metadata"
        aria-label={t.storyTeaser.videoLabel}
        onPlay={() => setPaused(false)}
        onPause={() => setPaused(true)}
      />
      <button
        type="button"
        onClick={toggle}
        aria-label={paused ? t.storyTeaser.play : t.storyTeaser.pause}
        className="absolute bottom-4 end-4 flex h-11 w-11 items-center justify-center bg-ink/60 text-cream backdrop-blur-sm transition-colors hover:bg-saffron hover:text-ink"
      >
        {paused ? <Play className="h-4 w-4" aria-hidden="true" /> : <Pause className="h-4 w-4" aria-hidden="true" />}
      </button>
    </motion.div>
  );
}
