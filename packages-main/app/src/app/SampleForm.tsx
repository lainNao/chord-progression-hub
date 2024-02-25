"use client";

export function SampleForm({
  onSubmit,
  onClick,
}: {
  onSubmit: (formData: FormData) => void;
  onClick: () => void;
}) {
  return (
    <form action={onSubmit}>
      <label>
        Name:
        <input type="text" name="name" />
      </label>
      <input type="submit" value="Submit" />
      <button type="button" onClick={() => onClick()}>button</button>
    </form>
  );
}
