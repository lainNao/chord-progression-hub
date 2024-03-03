"use client";

export function SampleForm({
  onSubmit,
  onClick,
}: {
  readonly onSubmit: (formData: Readonly<FormData>) => Promise<void>;
  readonly onClick: () => Promise<void>;
}): JSX.Element {
  return (
    <form action={onSubmit}>
      <label>
        Name:
        <input name="name" type="text" />
      </label>
      <input type="submit" value="Submit" />
      <button
        onClick={() => {
          onClick();
        }}
        type="button"
      >
        button
      </button>
    </form>
  );
}
