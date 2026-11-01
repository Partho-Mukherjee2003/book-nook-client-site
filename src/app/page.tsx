import Banner from "@/components/Banner";
import HowItWorks from "@/components/Howitworks";
import NewArrivalsPage from "@/components/NewArrivals";
import Testimonials from "@/components/Testimonials";
import { Suspense } from "react";

export default function Home() {
  return (
    <div>
      <Suspense fallback={<div className="min-h-107 bg-[#FDFBF7]" />}>
        <Banner />
        <NewArrivalsPage/>
        <HowItWorks/>
        <Testimonials/>
      </Suspense>

    </div>
  );
}
