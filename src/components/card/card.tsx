import { ComponentPropsWithoutRef } from 'react';
import './card.css';

type CardProps = {
  children: React.ReactNode;
} & ComponentPropsWithoutRef<'div'>;

export function Card({ children, className, ...rest }: CardProps) {
  return (
    <div className={`card ${className ? className : ''}`} {...rest}>
      {children}
    </div>
  );
}
