import { Button } from './button';

export interface PaginationProps {
  page: number;
  totalPages: number;
  onPrev: () => void;
  onNext: () => void;
  disabled?: boolean;
}

export function Pagination({
  page,
  totalPages,
  onPrev,
  onNext,
  disabled,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-between gap-3 px-4 py-3">
      <Button variant="link" disabled={disabled || page <= 1} onClick={onPrev}>
        Previous
      </Button>
      <span className="text-sm text-on-surface-variant">
        Page {page} of {totalPages}
      </span>
      <Button
        variant="link"
        disabled={disabled || page >= totalPages}
        onClick={onNext}
      >
        Next
      </Button>
    </div>
  );
}
