"use client";

import { changeTheme } from "./theme";

export function SampleForm({
  onSubmit,
  onClick,
}: {
  readonly onSubmit: (formData: Readonly<FormData>) => Promise<void>;
  readonly onClick: () => Promise<void>;
}): JSX.Element {
  return (
    <div>
      <div className="m-4">
        <button
          type="button"
          onClick={() => {
            changeTheme("darkBlue");
          }}
          className="bg-blue-800 p-4"
        >
          darkBlue
        </button>
        <button
          type="button"
          onClick={() => {
            changeTheme("darkGreen");
          }}
          className="bg-green-800 p-4"
        >
          darkGreen
        </button>
      </div>
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
