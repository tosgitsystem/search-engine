import { Hero } from "@/src/components/hero";
import { SecondaryServices } from "@/src/components/secondaryServices";
import CyberSecurityServices from "@/src/components/services";
import { Testimonials } from "@/src/components/testimonial";


export default function Home() {
  return (
    <div>
<Hero/>
<main>
  <CyberSecurityServices/>
  <SecondaryServices/>
  <Testimonials/>
</main>
    </div>
  );
}
