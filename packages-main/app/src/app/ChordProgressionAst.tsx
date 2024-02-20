export async function ChordProgressionAst({ value }: { value: string }) {
  const { parseChordProgressionString } = await import(
    "@lainnao/chord-progression-parser-bundler"
  );
  const result = parseChordProgressionString(value);
  return <pre>{JSON.stringify(result, null, 2)}</pre>;
}
