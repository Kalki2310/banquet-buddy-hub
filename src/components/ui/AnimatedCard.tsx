
import { ReactNode, useRef, useState, useEffect, CSSProperties } from 'react';
import { cn } from '@/lib/utils';

interface AnimatedCardProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  glareSize?: number;
  glareOpacity?: number;
  rotationIntensity?: number;
  isHoverable?: boolean;
  isTiltEnabled?: boolean;
  isGlareEnabled?: boolean;
}

const AnimatedCard = ({
  children,
  className,
  style,
  glareSize = 100,
  glareOpacity = 0.15,
  rotationIntensity = 10,
  isHoverable = true,
  isTiltEnabled = true,
  isGlareEnabled = true,
}: AnimatedCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [glarePosition, setGlarePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  // Reset card position on component unmount
  useEffect(() => {
    return () => {
      setRotation({ x: 0, y: 0 });
      setGlarePosition({ x: 0, y: 0 });
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isTiltEnabled || !cardRef.current) return;

    const card = cardRef.current;
    const rect = card.getBoundingClientRect();

    // Calculate center of the card
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Calculate mouse position relative to center (from -1 to 1)
    const relativeX = (e.clientX - centerX) / (rect.width / 2);
    const relativeY = (e.clientY - centerY) / (rect.height / 2);

    // Calculate rotation (inverse Y axis for natural feel)
    setRotation({
      x: relativeY * -rotationIntensity, // Inverse for natural feel
      y: relativeX * rotationIntensity,
    });

    // Update glare position
    if (isGlareEnabled) {
      // Normalize to card dimensions (0 to 100%)
      const normalizedX = ((e.clientX - rect.left) / rect.width) * 100;
      const normalizedY = ((e.clientY - rect.top) / rect.height) * 100;
      setGlarePosition({ x: normalizedX, y: normalizedY });
    }
  };

  const handleMouseEnter = () => {
    if (isHoverable) {
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    // Reset on mouse leave
    setRotation({ x: 0, y: 0 });
    setIsHovered(false);
  };

  return (
    <div
      ref={cardRef}
      className={cn(
        'relative overflow-hidden transition-all duration-200',
        isHoverable && 'hover:shadow-lg',
        className
      )}
      style={{
        transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale(${isHovered ? 1.02 : 1})`,
        transition: 'transform 0.2s ease',
        ...style,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {isGlareEnabled && isHovered && (
        <div
          className="absolute pointer-events-none"
          style={{
            background: `radial-gradient(circle at ${glarePosition.x}% ${glarePosition.y}%, rgba(255, 255, 255, ${glareOpacity}) 0%, rgba(255, 255, 255, 0) ${glareSize}%)`,
            width: '100%',
            height: '100%',
            top: 0,
            left: 0,
            zIndex: 2,
          }}
        />
      )}
      {children}
    </div>
  );
};

export default AnimatedCard;
