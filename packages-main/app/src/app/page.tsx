import { ChordProgressionAst } from "./ChordProgressionAst";
import { SampleForm } from "./SampleForm";

const handleClick = async (): Promise<void> => {
  "use server";
  // console.log(222);
};

const handleSubmit = async (formData: Readonly<FormData>): Promise<void> => {
  "use server";
  const aaa = 1;
  console.log(aaa, formData);
};

export default function Home(): JSX.Element {
  return (
    <main>
      <SampleForm onClick={handleClick} onSubmit={handleSubmit} />
      <ChordProgressionAst value="C" />
    </main>
  );
}
