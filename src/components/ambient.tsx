// Soft drifting light behind every page. Purely decorative.
export function Ambient() {
  return (
    <div className="ambient" aria-hidden="true">
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />
    </div>
  );
}

// Splits a headline into words that blur in one after another.
export function RevealHeading({ lines }: { lines: { text: string; em?: boolean }[] }) {
  let i = 0;
  return (
    <h1>
      {lines.map((line, li) => {
        const words = line.text.split(" ").map((word) => (
          <span key={i} className="word" style={{ "--i": i++ } as React.CSSProperties}>{word}&nbsp;</span>
        ));
        return <span key={li} className="line">{line.em ? <em>{words}</em> : words}</span>;
      })}
    </h1>
  );
}
