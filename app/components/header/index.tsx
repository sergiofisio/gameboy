import Part from "./part";

const DIVIDER = "self-end border-l-6 border-l-[#8e8c8b] h-7.5";

type HeaderProps = {
  isOn: boolean;
  onToggle: () => void;
};

export default function Header({ isOn, onToggle }: HeaderProps) {
  const parts = [
    { className: "rounded-tr-sm rounded-tl-xl w-8", middle: false },
    { className: "rounded-t-sm w-full", middle: true },
    { className: "rounded-tr-xl rounded-tl-sm w-10", middle: false },
  ];

  return (
    <header className="relative z-20 flex h-9 w-full">
      {parts.map((part, i) => (
        <div key={part.className} className="contents">
          {i > 0 && <div className={DIVIDER} />}
          <Part
            className={part.className}
            middle={part.middle}
            isOn={isOn}
            onToggle={onToggle}
          />
        </div>
      ))}
    </header>
  );
}
