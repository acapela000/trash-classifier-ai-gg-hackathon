import SelectLanguage from "@/components/SelectLanguage";
import TrashScheduler from "@/components/TrashScheduler";


export const runtime = 'edge';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <TrashScheduler />
      <SelectLanguage />
    </main>
  );
}