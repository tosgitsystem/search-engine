import React from 'react';

interface OrganicResult {
  title?: string;
  link?: string;
  snippet?: string;
  snippetHighlighted?: string[]; // Array of words/phrases to highlight
  sitelinks?: {
    title?: string;
    link?: string;
  }[];
  position?: number;
  date?: string; // Optional
  attributes?: { [key: string]: string }; // Optional
}

interface ResultsProps {
  organicResults?: OrganicResult[];
}

export const Results: React.FC<ResultsProps> = ({ organicResults }) => {
  const highlightText = (text: string, highlights: string[] | undefined) => {
    if (!highlights || highlights.length === 0) return text;

    // Create a regex from the highlighted terms to match within the snippet
    const regex = new RegExp(`(${highlights.join('|')})`, 'gi');
    const parts = text.split(regex);

    // Return text where matched words are wrapped in a highlight span
    return parts.map((part, i) =>
      highlights.includes(part.toLowerCase()) ? (
        <span key={i} className="bg-yellow-200 font-semibold">{part}</span>
      ) : (
        part
      )
    );
  };

  return (
    <div>
      <div className="space-y-6 pt-4 ">
        {organicResults?.map((result, index) => (
          <div
            key={index}
            className="max-w-full md:max-w-2xl bg-white p-4 rounded-2xl shadow-sm"
          >
            {result.link && (
              <div className="text-sm text-[#21784A] max-w-[250px] overflow-x-hidden text-nowrap">{result.link}</div>
            )}
            <a
              href={result.link}
              className="text-lg text-[#7119c0] font-[1400] cursor-pointer"
            >
              {result.title}
            </a>
            <p className="text-sm text-gray-700">
              {highlightText(result.snippet || '', result.snippetHighlighted)}
            </p>
            {result.sitelinks && result.sitelinks.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {result.sitelinks.map((sitelink, index) => (
                  <a
                    key={index}
                    href={sitelink.link}
                    className="px-4 py-1.5 bg-white text-gray-700 border border-gray-300 rounded-md hover:bg-gray-100 cursor-pointer"
                  >
                    {sitelink.title}
                  </a>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
