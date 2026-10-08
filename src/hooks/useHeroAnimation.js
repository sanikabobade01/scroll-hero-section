import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CAR_VIEWBOX_WIDTH, CAR_WHEEL_RADIUS } from "../components/Car";

gsap.registerPlugin(ScrollTrigger);

const CAR_NOSE_RATIO = 0.95; // where the car's front sits within its width
const SCROLL_DISTANCE = "+=250%";

function playIntro(hero) {
  const intro = gsap.timeline({ defaults: { ease: "power3.out" } });

  hero.querySelectorAll("[data-headline-layer]").forEach((layer) => {
    intro.from(
      layer.querySelectorAll("[data-letter]"),
      { autoAlpha: 0, y: 32, duration: 1.1, stagger: 0.07 },
      0,
    );
  });

  intro.from(
    "[data-stat]",
    { autoAlpha: 0, y: 24, duration: 0.9, stagger: 0.16 },
    0.9,
  );
}

function buildScrollTimeline(hero) {
  const car = hero.querySelector("[data-car]");
  const wheels = hero.querySelectorAll("[data-wheel]");
  const mask = hero.querySelector("[data-mask]");
  const maskContent = hero.querySelector("[data-mask-content]");

  // Measured lazily so values are recomputed on resize (invalidateOnRefresh).
  const heroWidth = () => hero.offsetWidth;
  const carWidth = () => car.offsetWidth;
  const startX = () => heroWidth() * 0.05;
  const endX = () => heroWidth();

  // The reveal mask is 3x the hero width, so its right edge sits at 2 * heroWidth
  // when its x is 0. Shifting it by (carNose - 2 * heroWidth) pins that edge to the car.
  const maskX = (carX) => carX + carWidth() * CAR_NOSE_RATIO - heroWidth() * 2;
  const wheelDegrees = () => {
    const pixelsPerUnit = carWidth() / CAR_VIEWBOX_WIDTH;
    const travel = endX() - startX();
    return (travel / (CAR_WHEEL_RADIUS * pixelsPerUnit)) * (180 / Math.PI);
  };

  const timeline = gsap.timeline({
    defaults: { ease: "none", duration: 1 },
    scrollTrigger: {
      trigger: hero,
      start: "top top",
      end: SCROLL_DISTANCE,
      pin: true,
      scrub: 0.8,
      anticipatePin: 1,
      invalidateOnRefresh: true,
    },
  });

  timeline
    .fromTo(car, { x: startX }, { x: endX }, 0)
    .fromTo(mask, { x: () => maskX(startX()) }, { x: () => maskX(endX()) }, 0)
    .fromTo(
      maskContent,
      { x: () => -maskX(startX()) },
      { x: () => -maskX(endX()) },
      0,
    )
    .fromTo(
      car,
      { scale: 0.9, transformOrigin: "50% 100%" },
      { scale: 1.08, ease: "power1.inOut" },
      0,
    )
    .fromTo(
      car,
      { rotation: 0 },
      { rotation: -1.5, ease: "sine.inOut", duration: 0.5, yoyo: true, repeat: 1 },
      0,
    )
    .fromTo(
      wheels,
      { rotation: 0, transformOrigin: "50% 50%" },
      { rotation: wheelDegrees },
      0,
    );
}

export default function useHeroAnimation(heroRef) {
  useLayoutEffect(() => {
    const hero = heroRef.current;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const context = gsap.context(() => {
      if (!prefersReducedMotion) playIntro(hero);
      buildScrollTimeline(hero);
    }, hero);

    // Web fonts change text metrics, so re-measure once they have loaded.
    document.fonts.ready.then(() => ScrollTrigger.refresh());

    return () => context.revert();
  }, [heroRef]);
}
