import type { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

export default function Container({ children, className = "" }: ContainerProps) {
  return (
    <div className="w-full flex justify-center px-4 sm:px-6 lg:px-8">
      
      <div
        className={`
          w-full
          max-w-[1280px]
          ${className}
        `}
      >
        {children}
      </div>

    </div>
  );
}