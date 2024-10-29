import React from 'react';


interface MainProps {
  renderContent: () => React.ReactNode; // Function to render content based on the active tab
}

export const Main: React.FC<MainProps> = ({ renderContent }) => {
  return (
    <main className="container mx-auto px-1 md:pr-4 md:px-0 py-2">
      <div className="space-y-6">
        {renderContent()} {/* Dynamically render content based on the active tab */}
      </div>
     
     
    </main>
  );
};
