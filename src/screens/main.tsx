'use client'

import { CyberSecurityServices, Hero, SecondaryServices, Testimonials } from "../components";
import SearchBar from "../components/main/autoSuggest";

export const HomePage = () =>{
  const customers = [
    'Adam', 'Bella', 'Charlie', 'David', 'Fiona', 'George', 'Kelly',
    'Samantha', 'Harry', 'Olivia', 'Isabella', 'Mason', 'Sophia', 'James', 
    'Ava', 'Liam', 'Ethan', 'Noah', 'Emma', 'Michael', 'Lucas', 'Amelia',
    'Alexander', 'Mia', 'Benjamin', 'Charlotte', 'Jack', 'Lily', 'Daniel',
    'Ella', 'Henry', 'Grace', 'Matthew', 'Zoe', 'Owen', 'Scarlett', 
    'Ryan', 'Hazel', 'Gabriel', 'Aria', 'William', 'Chloe', 'Sebastian'
  ];
  const handleSelect = (value: string) => {
   console.log("Selected value: ", value);
  };
  return (
    <div>
<Hero/>
<div className="absolute top-24 md:top-1/2 flex flex-col md:flex-row gap-3 w-full items-center justify-start md:justify-center  z-10  md:-mt-28 px-4 overflow-visible">
        <div className="flex flex-col md:flex-row gap-2 ">
       <SearchBar  suggestions={customers}           onSelect={(value) => handleSelect(value)} />
        </div>
        
      </div>
<main>
  <CyberSecurityServices/>
  <SecondaryServices/>
  <Testimonials/>
</main>
    </div>
  );
}
