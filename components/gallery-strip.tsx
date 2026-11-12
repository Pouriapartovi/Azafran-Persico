import Image from "next/image";

// A slow, endless strip of photos from the kitchen. Pauses on hover; still for reduced motion.
export function GalleryStrip({ images }: { images: { src: string; alt: string }[] }) {
  const loop = [...images, ...images];
  return (
    <div className="group overflow-hidden" aria-label="Photos from our kitchen">
      <ul className="flex w-max animate-marquee gap-4 group-hover:[animation-play-state:paused] md:gap-6">
        {loop.map((img, i) => (
          <li key={i} className="relative h-[210px] w-[280px] shrink-0 overflow-hidden md:h-[330px] md:w-[440px]" aria-hidden={i >= images.length}>
            <Image src={img.src} alt={i >= images.length ? "" : img.alt} fill sizes="(min-width: 768px) 440px, 280px" className="object-cover transition-transform duration-[1200ms] ease-soft hover:scale-105" />
          </li>
        ))}
      </ul>
    </div>
  );
}
