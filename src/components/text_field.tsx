import { useId } from 'react';
import type { InputHTMLAttributes } from 'react';

export interface TextFieldProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'placeholder'
> {
  label: string;
  className?: string;
}

export function TextField({ label, className, id, ...props }: TextFieldProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;

  return (
    <div className={`relative ${className ?? ''}`.trim()}>
      <input
        id={inputId}
        placeholder=" "
        className="peer block h-14 w-full rounded-t-lg border-0 border-b-2 border-outline bg-surface-container-high px-4 pt-6 pb-1.5 text-[15px] text-on-surface outline-none transition-colors focus:border-primary"
        {...props}
      />
      <label
        htmlFor={inputId}
        className="pointer-events-none absolute left-4 top-4 text-[15px] text-on-surface-variant transition-all peer-focus:top-2 peer-focus:text-xs peer-focus:text-primary peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-xs"
      >
        {label}
      </label>
    </div>
  );
}
