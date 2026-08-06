import PowerSwitch from "../power-switch";

type PartProps = {
  className: string;
  middle?: boolean;
  isOn?: boolean;
  onToggle?: () => void;
};

export default function Part({
  className,
  middle = false,
  isOn = false,
  onToggle,
}: PartProps) {
  return (
    <div className={`relative h-full bg-[#b3b1af] ${className}`}>
      {middle && onToggle && (
        <PowerSwitch isOn={isOn} onToggle={onToggle} />
      )}
    </div>
  );
}
