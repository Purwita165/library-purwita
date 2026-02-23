interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

export default function Container({ children, className = "" }: ContainerProps) {
  return (
    <div className="w-full px-4">
      <div className={`max-w-[1280px] mx-auto ${className}`}>
        {children}
      </div>
    </div>
  );
}