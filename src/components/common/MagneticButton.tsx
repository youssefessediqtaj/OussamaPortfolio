import React, { useRef, useEffect } from 'react';
import { useCursor } from '../../context/CursorContext';
import { gsap } from '../../utils/gsap';

interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'text';
  children: React.ReactNode;
  cursorLabel?: string;
  onClick?: () => void;
  className?: string;
  href?: string;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  variant = 'primary',
  children,
  cursorLabel,
  onClick,
  className = '',
  href,
  ...rest
}) => {
  const buttonRef = useRef<HTMLElement | null>(null);
  const { setCursor, resetCursor } = useCursor();

  useEffect(() => {
    const el = buttonRef.current;
    if (!el) return;

    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (isTouch) return;

    const onMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - (rect.left + rect.width / 2);
      const y = e.clientY - (rect.top + rect.height / 2);

      gsap.to(el, {
        x: x * 0.25,
        y: y * 0.25,
        duration: 0.3,
        ease: 'power2.out',
      });
    };

    const onMouseLeave = () => {
      gsap.to(el, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: 'elastic.out(1, 0.4)',
      });
    };

    el.addEventListener('mousemove', onMouseMove);
    el.addEventListener('mouseleave', onMouseLeave);

    return () => {
      el.removeEventListener('mousemove', onMouseMove);
      el.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  const baseStyles =
    'relative inline-flex items-center justify-center font-display tracking-widest text-sm uppercase transition-all duration-300 select-none group focus:outline-none';

  const variants = {
    primary:
      'bg-[#B93434] hover:bg-[#a12929] text-[#F1F1F1] px-7 py-3.5 border border-[#B93434] shadow-[0_0_20px_rgba(185,52,52,0.3)]',
    secondary:
      'bg-[#161616] hover:bg-[#202020] text-[#F1F1F1] px-7 py-3.5 border border-white/20 hover:border-white/40',
    outline:
      'bg-transparent hover:bg-white/5 text-[#F1F1F1] px-6 py-3 border border-white/20 hover:border-[#B93434] hover:text-[#B93434]',
    text: 'bg-transparent text-[#F1F1F1] hover:text-[#B93434] p-0 underline-offset-4',
  };

  const combinedClass = `${baseStyles} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <a
        ref={buttonRef as React.Ref<HTMLAnchorElement>}
        href={href}
        onClick={onClick}
        onMouseEnter={() => (cursorLabel ? setCursor('pointer', cursorLabel) : setCursor('pointer'))}
        onMouseLeave={resetCursor}
        className={combinedClass}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      ref={buttonRef as React.Ref<HTMLButtonElement>}
      onClick={onClick}
      onMouseEnter={() => (cursorLabel ? setCursor('pointer', cursorLabel) : setCursor('pointer'))}
      onMouseLeave={resetCursor}
      className={combinedClass}
      {...rest}
    >
      {children}
    </button>
  );
};
