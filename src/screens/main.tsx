import { CyberSecurityServices, Hero, SecondaryServices, Testimonials } from "../components";

export const HomePage = () =>{
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
