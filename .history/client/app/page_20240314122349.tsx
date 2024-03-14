import Image from "next/image";
import NotesComponent from "./components/NotesComponent";
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <NotesComponent/>
    </main>
  );
}
