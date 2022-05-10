import './option.css';

export type OptionType = {
  label: string;
  value: string;
};

export type OptionProps = {
  children: React.ReactNode;
  disabled?: boolean;
  onSelect?: (option: OptionType) => void;
  option?: OptionType;
  selected?: boolean;
};

export function Option({
  children,
  disabled = false,
  onSelect,
  option,
  selected = false,
}: OptionProps) {
  const handleSelect = () => {
    if (onSelect && option && !disabled) {
      onSelect(option);
    }
  };

  return (
    <div
      aria-disabled={disabled}
      aria-selected={selected}
      className={`option ${disabled ? 'option--disabled' : ''}`}
      onClick={handleSelect}
      role="option"
    >
      {children}
    </div>
  );
}
