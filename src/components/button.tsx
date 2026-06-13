import type { ButtonHTMLAttributes } from 'react';

export type ButtonVariant = 'primary' | 'danger' | 'link';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

export function Button({
  variant = 'primary',
  type = 'button',
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`btn-${variant} ${className ?? ''}`.trim()}
      {...props}
    />
  );
}
