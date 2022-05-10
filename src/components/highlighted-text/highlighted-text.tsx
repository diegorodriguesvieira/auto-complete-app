import { Fragment } from 'react';
import './highlighted-text.css';

type HighlightedTextProps = {
  text: string;
  highlight: string;
};

export const HighlightedText = ({ text, highlight }: HighlightedTextProps) => {
  const regex = new RegExp(`(${highlight})`, 'gi');
  const parts = text.split(regex);

  return (
    <span>
      {parts.filter(String).map((part, i) => {
        return regex.test(part) ? (
          <mark
            data-testid="highlighted-text"
            className="highlighted--text"
            key={i}
          >
            {part}
          </mark>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        );
      })}
    </span>
  );
};
