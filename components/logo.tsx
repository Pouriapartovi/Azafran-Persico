import { FLOWER_PATHS, LOGO_PATHS } from "./logo-paths";

// The logo takes the colour of the text around it, so it works on photos and on cream.
export function Logo({ className = "", title = "Azafrán Pérsico" }: { className?: string; title?: string }) {
  return (
    <svg viewBox="142 147 560 236" fill="currentColor" role="img" aria-label={title} className={className}>
      <g dangerouslySetInnerHTML={{ __html: LOGO_PATHS }} />
    </svg>
  );
}

export function Flower({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="336 146 170 175" fill="currentColor" aria-hidden="true" className={className}>
      <g dangerouslySetInnerHTML={{ __html: FLOWER_PATHS }} />
    </svg>
  );
}
