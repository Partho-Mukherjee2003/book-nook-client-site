import Banner from "@/components/Banner";
import { Suspense } from "react";

export default function Home() {
  return (
    <div>
      <Suspense fallback={<div className="min-h-107 bg-[#FDFBF7]" />}>
        <Banner />
      </Suspense>
    </div>
  );
}
