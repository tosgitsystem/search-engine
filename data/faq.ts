// data/faqData.ts
export interface FAQItem {
    id: number;
    question: string;
    answer: string;
  }
  
  export const faqData: FAQItem[] = [
    {
      id: 1,
      question: "What are the most popular cars in 2024?",
      answer: "The most popular cars of 2024 include models like the Tesla Model Y, Ford Mustang Mach-E, and Toyota Corolla Hybrid, known for their efficiency, performance, and advanced technology."
    },
    {
      id: 2,
      question: "What is the best electric car available?",
      answer: "The Tesla Model S Plaid is considered one of the best electric cars due to its long range, rapid acceleration, and innovative features. Other great options include the Lucid Air and Porsche Taycan."
    },
    {
      id: 3,
      question: "What factors should I consider when buying a new car?",
      answer: "When buying a new car, consider factors like fuel efficiency, safety features, reliability, and your budget. Additionally, think about your driving habits, insurance costs, and the vehicle's resale value."
    },
    {
      id: 4,
      question: "What are the advantages of hybrid cars?",
      answer: "Hybrid cars offer the benefits of both gasoline and electric power, providing better fuel efficiency, lower emissions, and reduced dependency on fuel, while still offering the convenience of longer driving ranges."
    },
    {
      id: 5,
      question: "How do I maintain my car to ensure its longevity?",
      answer: "Regular maintenance such as oil changes, tire rotations, brake inspections, and keeping up with the manufacturer’s recommended service schedule are key to ensuring your car lasts longer and performs reliably."
    }
  ];
  