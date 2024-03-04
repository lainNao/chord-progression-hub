"use client";

const themes: Record<
  string,
  {
    ["colorAppMainTop"]: string;
    ["colorAppMainBottom"]: string;
  }
> = {
  "dark-blue": {
    colorAppMainTop: "200deg 100% 90%",
    colorAppMainBottom: "200deg 100% 10%",
  },
  "dark-green": {
    colorAppMainTop: "100deg 100% 90%",
    colorAppMainBottom: "100deg 100% 10%",
  },
};

const changeTheme = (themeName: string): void => {
  const setting = themes[themeName];
  if (!setting) {
    return;
  }
  for (const [key, value] of Object.entries(setting)) {
    document.documentElement.style.setProperty(`--${key}`, value);
  }
};

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
            changeTheme("dark-blue");
          }}
          className="bg-blue-800 p-4"
        >
          dark-blue
        </button>
        <button
          type="button"
          onClick={() => {
            changeTheme("dark-green");
          }}
          className="bg-green-800 p-4"
        >
          dark-green
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
