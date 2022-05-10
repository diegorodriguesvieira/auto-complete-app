import './label.css';

export type LabelProps = {
  children: React.ReactNode;
} & React.ComponentPropsWithoutRef<'label'>;

export function Label({ children, ...rest }: LabelProps) {
  return (
    <label className="label" {...rest}>
      {children}
    </label>
  );
}
