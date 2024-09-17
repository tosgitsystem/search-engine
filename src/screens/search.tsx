
import React from 'react';
import { LargeHeader, Main } from '../components';

const searchResults = [
  {
    title: "New Cars in India 2024",
    url: "https://www.carwale.com › new-cars",
    description: "The 5 most popular cars are Skoda Kushaq, Tata Curvy, MG Windsor EV, Mahindra Thar Roxx and Hyundai Alcazar. Explore the complete list of cars by exploring ...",
    tags: ['Under 5 Lakh', 'New Launches', 'Popular Cars', 'New Car Search']
  },
  {
    title: "New Cars in 2024 : New Cars Price in India",
    url: "https://www.cardekho.com › newcars",
    description: "Upcoming cars : BMW M3, Rs1.47 Cr, Estimated Price · Kia Carnival, Rs40 Lakh · Electric, Kia EV9 · Facelift, Nissan Magnite 2024 · Electric, BYD eMAX 7."
  },
  {
    title: "5466 Second Hand Cars in New Delhi",
    url: "https://www.cardekho.com › Second Hand Cars",
    description: "Used cars are available in every segment be it SUV, Sedan, Hatchback, MUV, Convertible, Minivan, Coupe, Pickup Truck, Wagon, Hybrid in New Delhi. At CarDekho we ..."
  },
  {
    title: "New Cars in 2024 : New Cars Price in India",
    url: "https://www.cardekho.com › newcars",
    description: "Upcoming cars : BMW M3, Rs1.47 Cr, Estimated Price · Kia Carnival, Rs40 Lakh · Electric, Kia EV9 · Facelift, Nissan Magnite 2024 · Electric, BYD eMAX 7."
  },
  {
    title: "5466 Second Hand Cars in New Delhi",
    url: "https://www.cardekho.com › Second Hand Cars",
    description: "Used cars are available in every segment be it SUV, Sedan, Hatchback, MUV, Convertible, Minivan, Coupe, Pickup Truck, Wagon, Hybrid in New Delhi. At CarDekho we ..."
  }
];

export const Search: React.FC = () => {
  return (
    <div className="min-h-screen min-w-screen bg-white">
      <LargeHeader />
      <div className=' md:px-52'>
        <Main searchResults={searchResults} />
      </div>
    </div>
  );
};
