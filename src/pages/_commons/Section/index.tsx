import React, { ReactNode } from 'react';

export interface SectionProps {
  label?: string;
  children?: ReactNode;
}

const Section: React.FC<SectionProps> = ({ children, label }) => {
  return (
    <div className="p-24 mt-24 br-radius-4 bg-gray-d03">
      {label && <h3>{label}</h3>}
      {children}
    </div>
  );
};

export default Section;
