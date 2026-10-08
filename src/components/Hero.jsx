import { useRef } from "react";
import Car from "./Car";
import Headline from "./Headline";
import useHeroAnimation from "../hooks/useHeroAnimation";

const STATS = [
  { value: "58%", description: "Faster parcel pickups" },
  { value: "23%", description: "Fewer customer support calls" },
  { value: "27%", description: "More repeat customers" },
  { value: "40%", description: "Lower delivery costs" },
];

export default function Hero() {
  const heroRef = useRef(null);
  useHeroAnimation(heroRef);

  return (
    <section
      ref={heroRef}
      className="relative h-svh overflow-hidden bg-linear-to-b from-[#f2f5f7] to-[#d8dfe5] text-ink"
    >
      <div className="relative mt-[10svh] md:mt-[14svh]">
        <Headline variant="outline" />
        <div
          data-mask
          className="absolute inset-y-0 -left-full w-[300%] overflow-hidden will-change-transform"
        >
          <div
            data-mask-content
            className="absolute inset-y-0 left-1/3 w-1/3 will-change-transform"
          >
            <Headline variant="solid" />
          </div>
        </div>
      </div>

      <ul className="mx-auto mt-[6svh] md:mt-[8svh] grid max-w-6xl grid-cols-2 gap-x-6 gap-y-7 px-[5vw] md:grid-cols-4">
        {STATS.map(({ value, description }) => (
          <li key={value} data-stat className="border-l border-ink/25 pl-4">
            <p className="font-display text-[8.5vw] font-medium leading-none md:text-[3.4vw]">
              {value}
            </p>
            <p className="mt-2 max-w-[18ch] text-sm leading-snug text-ink/70 md:text-base">
              {description}
            </p>
          </li>
        ))}
      </ul>

      <div className="absolute inset-x-0 bottom-0 h-[22svh] bg-asphalt">
        <div className="absolute inset-x-0 top-1/2 h-0.5 bg-[repeating-linear-gradient(90deg,#e8ecef_0_48px,transparent_48px_96px)] opacity-50" />
      </div>

      <div
        data-car
        className="absolute bottom-[22svh] left-0 w-[72vw] translate-y-[5.7%] will-change-transform md:w-[34vw]"
      >
        <Car />
      </div>
    </section>
  );
}
