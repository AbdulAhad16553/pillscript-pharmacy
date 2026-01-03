import HomeModule from "@/modules/home-module";
import { Suspense } from "react";


export default function LandingPage() {

  return (
   <Suspense>
      <HomeModule />
   </Suspense>
  );
}
