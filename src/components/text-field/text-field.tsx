import './text-field.css';

export type TextFieldProps = React.ComponentPropsWithoutRef<'input'>;

export function TextField({ className, ...rest }: TextFieldProps) {
  return (
    <input className={`text-field ${className ? className : ''}`} {...rest} />
  );
}
