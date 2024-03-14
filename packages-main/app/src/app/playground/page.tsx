import { HamburgerMenuIcon, CameraIcon } from "@radix-ui/react-icons";
import { ChordProgressionAst } from "./_ChordProgressionAst";
import { SampleForm } from "./_SampleForm";
import { t } from "@/locales/dictionaries";

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
  const tmpLang = "ja";
  return (
    <main>
      {t[tmpLang].hello_world}
      <HamburgerMenuIcon />
      <CameraIcon />
      <SampleForm onClick={handleClick} onSubmit={handleSubmit} />
      <ChordProgressionAst value="C" />
    </main>
  );
}
