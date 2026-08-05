import Image from "next/image";
import Page from "./pages/page";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-w-screen min-h-screen bg-amber-900">
      <Page />
    </main>
  );
}
