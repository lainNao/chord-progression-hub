export async function ChordProgressionAst({
  value,
}: {
  readonly value: string;
}): Promise<JSX.Element> {
  const { parseChordProgressionString } = await import(
    "@lainnao/chord-progression-parser-bundler"
  );
  const result = parseChordProgressionString(value);
  const indent = 2;
  return <pre>{JSON.stringify(result, undefined, indent)}</pre>;
}
