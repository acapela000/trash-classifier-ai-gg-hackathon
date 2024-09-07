import TrashScheduler from "@/components/TrashScheduler";


export const runtime = 'edge';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between mx-8 mt-8">
      <TrashScheduler />
    </main>
  );
}
