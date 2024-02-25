import Image from "next/image";
import { ChordProgressionAst } from "./ChordProgressionAst";
import { Suspense } from "react";
import { SampleForm } from "./SampleForm";

export default function Home() {

  const handleSubmit = async (formData: FormData) => {
    'use server'
    console.log(111, formData);
  }

  const handleClick = async () => {
    'use server'
    console.log(222);
  }

  console.log(333)

  return (
    <main>
      aaaa
      <SampleForm onSubmit={handleSubmit} onClick={handleClick} />
      <Suspense fallback={<div>aaa</div>}>
        <ChordProgressionAst value={"C"} />
      </Suspense>
    </main>
  );
}
