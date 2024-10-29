import { ReactNode } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const KnowledgeGraphCard = ({ knowledgeGraph }:any) => {
    return (
      <div className="max-w-full mx-auto my-6 border border-gray-300 rounded-xl shadow-lg bg-white">
        {/* Title and Subtitle */}
        <div className="p-4">
          <h2 className="text-2xl font-semibold">{knowledgeGraph.title}</h2>
          <p className="text-gray-500">{knowledgeGraph.type}</p>
        </div>
  
  <div className="lg:flex px-4  ">
        {/* Image and Gallery */}
        {knowledgeGraph.imageUrl && (
          <div className="flex overflow-hidden rounded-t-lg w-[30%]">
            <img
              src={knowledgeGraph.imageUrl}
              alt={knowledgeGraph.title}
              className="w-[300px] h-[300px] object-contain "
            />
          </div>
        )}
  
  <div className="flex flex-col w-[70%]">
        {/* Description */}
        <div className="p-4">
          <p className="text-gray-700">{knowledgeGraph.description}</p>
          {knowledgeGraph.descriptionSource && knowledgeGraph.descriptionLink && (
            <a
              href={knowledgeGraph.descriptionLink}
              className="text-blue-600 hover:underline mt-2 block"
              target="_blank"
              rel="noopener noreferrer"
            >
              {knowledgeGraph.descriptionSource}
            </a>
          )}
        </div>
        
  
        {/* Factsheet and Profiles */}
        <div className="p-4">
          <details className="mb-2">
            <summary className="cursor-pointer text-blue-600">Factsheet</summary>
            <ul className="ml-4 mt-2 text-gray-700">
              {Object.entries(knowledgeGraph.attributes).map(([key, value]) => (
                <li key={key}>
                  <strong>{key}:</strong> {value as ReactNode}
                </li>
              ))}
            </ul>
          </details>
  
          <details>
            <summary className="cursor-pointer text-blue-600">Profiles</summary>
            <p className="ml-4 mt-2 text-gray-700">Coming soon...</p>
          </details>
        </div>
        </div>
        </div>
      </div>
    );
  };
  
  // Example data (you can replace it with actual dynamic data)
  const exampleKnowledgeGraph = {
    title: "Dog",
    type: "Domestic animal",
    imageUrl: "https://encrypted-tbn0.gstatic.com/licensed-image?q=tbn:ANd9GcTEwOKs9MeGzwagVaczInnhOK32WZ-Hryz4hJtrEAzWl7Lq0jrNm9rWeseVaTOGax07YGNx&s=19",
    description: "The dog (Canis familiaris or Canis lupus familiaris) is a domesticated descendant of the wolf...",
    descriptionSource: "Wikipedia",
    descriptionLink: "https://en.wikipedia.org/wiki/Dog",
    attributes: {
      "Lifespan": "10 – 13 years",
      "Gestation period": "58 – 68 days",
      "Class": "Mammalia",
      "Domain": "Eukaryota",
      "Family": "Canidae",
      "Genus": "Canis",
    },
  };
  
  export default function App() {
    return <KnowledgeGraphCard knowledgeGraph={exampleKnowledgeGraph} />;
  }
  