"use client";

import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { Calendar } from "@/components/shadcnui/calendar";

export function SampleForm({
  onSubmit,
  onClick,
}: {
  readonly onSubmit: (formData: Readonly<FormData>) => Promise<void>;
  readonly onClick: () => Promise<void>;
}): JSX.Element {
  return (
    <div>
      <Calendar
        mode="single"
        selected={new Date()}
        className="rounded-md border"
      />
      <ThemeToggle />

      <form action={onSubmit}>
        <label>
          Name:
          <input name="name" type="text" className="border-8" />
        </label>
        <button
          onClick={() => {
            onClick();
          }}
          type="button"
        >
          button
        </button>
      </form>
    </div>
  );
}
