export interface QuantityStepperProps {
  value: number;
  max: number;
  label: string;
  onIncrement: () => void;
  onDecrement: () => void;
  onChange: (value: number) => void;
}

const iconBtn =
  'grid size-9 place-items-center rounded-full border border-outline text-lg leading-none text-on-surface transition-colors hover:bg-on-surface/10 disabled:pointer-events-none disabled:opacity-40';

export function QuantityStepper({
  value,
  max,
  label,
  onIncrement,
  onDecrement,
  onChange,
}: QuantityStepperProps) {
  return (
    <div className="inline-flex items-center gap-1.5">
      <button
        type="button"
        className={iconBtn}
        onClick={onDecrement}
        disabled={value <= 0}
        aria-label={`Remove one ${label}`}
      >
        −
      </button>
      <input
        type="number"
        min={0}
        max={max}
        value={value}
        aria-label={`Quantity of ${label}`}
        onChange={(e) => onChange(Number(e.target.value))}
        className="h-9 w-14 rounded-lg border border-outline-variant bg-surface-container-high text-center text-[15px] text-on-surface outline-none focus-visible:border-primary"
      />
      <button
        type="button"
        className={iconBtn}
        onClick={onIncrement}
        disabled={value >= max}
        aria-label={`Add one ${label}`}
      >
        +
      </button>
    </div>
  );
}
