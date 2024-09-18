"use client";
import { faqData, FAQItem } from "@/data/faq";
import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react"; // Import the icons

export const RelatedFAQSection: React.FC = () => {
  const [activeId, setActiveId] = useState<number | null>(null);

  const handleToggle = (id: number) => {
    setActiveId(activeId === id ? null : id);
  };

  return (
    <section className="text-gray-900">
      <div className="max-w-full p-4">
        <div className="flex flex-col justify-start items-start divide-y-2">
          <div className="font-semibold text-xl leading-tight ">
            People also ask
          </div>
          <div className="mt-2">
            <ul className="list-none w-full">
              {faqData.map((item: FAQItem) => (
                <li
                  key={item.id}
                  className="w-full border-b border-gray-200 last:border-none"
                >
                  <div
                    className={`flex justify-between items-start py-3 cursor-pointer transition duration-300 ease-in-out`}
                    onClick={() => handleToggle(item.id)}
                  >
                    <div className="text-lg w-full">
                      {item.question}
                    </div>
                    <span className="text-lg text-gray-400 rounded-lg">
                      {activeId === item.id ? <ChevronUp /> : <ChevronDown />} {/* Use arrow icons here */}
                    </span>
                  </div>
                  <div
                    className={`overflow-hidden transition-max-height duration-500 ease-in-out ${
                      activeId === item.id ? "max-h-48" : "max-h-0"
                    }`}
                  >
                    <div className="text-md text-gray-500 p-2">
                      {item.answer}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
