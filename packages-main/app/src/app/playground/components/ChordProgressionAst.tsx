import { parseChordProgressionString } from "@/wrappers/chordProgressionParser";

export function ChordProgressionAst({
  value,
}: {
  readonly value: string;
}): JSX.Element {
  const result = parseChordProgressionString(value);
  const indent = 2;
  return <pre>{JSON.stringify(result, undefined, indent)}</pre>;
}
