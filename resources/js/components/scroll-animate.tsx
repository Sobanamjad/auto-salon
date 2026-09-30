import { useScrollAnimate } from '@/hooks/use-scroll-animate';

interface ScrollAnimateProps {
    children: React.ReactNode;
    className?: string;
    animation?: 'fadeUp' | 'fadeDown' | 'fadeLeft' | 'fadeRight' | 'scaleIn';
}

export default function ScrollAnimate({ children, className = '', animation = 'fadeUp' }: ScrollAnimateProps) {
    const { ref, isVisible } = useScrollAnimate();

    return (
        <div
            ref={ref}
            className={`scroll-animate ${animation} ${isVisible ? 'is-visible' : ''} ${className}`}
        >
            {children}
        </div>
    );
}
