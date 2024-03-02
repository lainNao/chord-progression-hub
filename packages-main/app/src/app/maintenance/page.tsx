/* eslint-disable */
import Image from "next/image";
import logo from "../../../public/next.svg";

export const metadata = {
  title: "Maintenance",
  robots: "noindex",
};

export default function Maintenance(): JSX.Element {
  return (
    /*
     * <main className="p-24">
     *   <Image
     *     alt="Next.js Logo"
     *     className="relative w-20 dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
     *     height={37}
     *     priority
     *     // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
     *     src={logo}
     *     width={180}
     *   />
     */

    //   <h1 className="mt-2 text-2xl font-bold">Maintenance</h1>

    /*
     *   <div className="mt-2">
     *     <Link className="underline" href="/">
     *       Top
     *     </Link>
     *   </div>
     * </main>
     */
    <section className="bg-primary-500/40 flex items-center justify-center py-20 lg:h-screen">
      <div className="container bg-blue-700">
        <div className="rounded-3xl lg:p-10 ">
          <div className="grid items-center lg:grid-cols-2">
            <div>
              <Image alt="" height={300} src={logo} width={300} />
            </div>

            <div className="px-5 py-6 text-center lg:px-12 lg:py-28">
              <Image
                alt=""
                className="mx-auto h-12"
                height={300}
                src={logo}
                width={300}
              />
              <h2 className="mt-8 text-xl font-bold text-gray-950 md:text-3xl/snug">
                Website is undergoing maintenance
              </h2>
              <p className="mt-5 text-sm font-semibold text-gray-700 md:text-lg">
                Lorem ipsum dolor sit amet, consectetur adipiscing nec id
                pellentesque tempus donec pellentesque ridiclus vestibuium
                solicitudin.
              </p>
              <a
                className="bg-primary hover:bg-primary-600 mt-10 inline-block rounded-md px-6 py-3 text-base font-semibold uppercase text-white transition-all duration-500"
                href="#"
              >
                Notify
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
