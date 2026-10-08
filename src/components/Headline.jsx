const WORDS = ["WELCOME", "ITZFIZZ"];

const VARIANT_CLASSES = {
  outline: "text-transparent [-webkit-text-stroke:1.5px_var(--color-ink)]",
  solid: "text-ink",
};

/**
 * Letter-spaced headline. The "outline" variant is the base layer; the "solid"
 * variant is an identical copy that the car's motion progressively reveals.
 */
export default function Headline({ variant }) {
  const isDecorativeCopy = variant === "solid";
  const Tag = isDecorativeCopy ? "div" : "h1";

  return (
    <Tag
      data-headline-layer
      aria-hidden={isDecorativeCopy || undefined}
      className={`flex flex-wrap justify-center gap-x-[1em] px-[5vw] py-[2vw] font-display text-[10.5vw] font-medium leading-none tracking-[0.28em] md:text-[5vw] ${VARIANT_CLASSES[variant]}`}
    >
      {WORDS.map((word) => (
        <span key={word} className="-mr-[0.28em] whitespace-nowrap">
          {[...word].map((letter, index) => (
            <span key={index} data-letter className="inline-block">
              {letter}
            </span>
          ))}
        </span>
      ))}
    </Tag>
  );
}
