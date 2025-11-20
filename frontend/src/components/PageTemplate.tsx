import React from "react";

interface PageTemplateProps {
  title: string;
  children?: React.ReactNode;
}

const PageTemplate: React.FC<PageTemplateProps> = ({ title, children }) => {
  return (
    <div className="container mx-auto py-16 px-4 min-h-[calc(100vh-200px)]"> {/* Adjusted min-height */}
      <h1 className="text-5xl font-bold text-center mb-12 text-marzetti-text-primary">
        {title}
      </h1>
      <div className="text-lg text-marzetti-text-secondary text-center">
        {children || <p>Contenido de la página {title} en construcción.</p>}
      </div>
    </div>
  );
};

export default PageTemplate;