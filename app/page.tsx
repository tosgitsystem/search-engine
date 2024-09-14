import { Hero } from "@/src/components/hero";
import { SecondaryServices } from "@/src/components/secondaryServices";
import CyberSecurityServices from "@/src/components/services";


export default function Home() {
  return (
    <div>
<Hero/>
<main>
  <CyberSecurityServices/>
  <SecondaryServices/>
</main>
    </div>
  );
}
