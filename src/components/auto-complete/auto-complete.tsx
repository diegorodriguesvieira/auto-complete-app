import { Card } from 'components/card';
import { SearchIcon } from 'components/icons';
import { Option, OptionType } from 'components/option/option';
import { TextField } from 'components/text-field';
import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';
import { HighlightedText } from 'components/highlighted-text';
import './auto-complete.css';

export type AutoCompleteProps = {
  id?: string;
  isOpen?: boolean;
  loading?: boolean;
  noOptionsText?: string;
  noResultsText?: string;
  onChangeTextField?: (value: string) => void;
  onSelect?: (option?: OptionType) => void;
  options?: Array<OptionType>;
  placeholder?: string;
  value?: OptionType;
};

export function AutoComplete({
  id,
  loading,
  noOptionsText = 'Do a search to find users',
  noResultsText = 'No users found. Try a new search.',
  onChangeTextField,
  onSelect,
  options,
  placeholder,
  value,
}: AutoCompleteProps) {
  const autoCompleteRef = useRef<HTMLDivElement>(null);

  const [textFieldValue, setTextFieldValue] = useState(value?.label ?? '');

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (!autoCompleteRef?.current?.contains(event.target as HTMLElement)) {
        setIsDropdownOpen(false);
      }
    },
    [setIsDropdownOpen],
  );

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleClickOutside]);

  const handleFocusEvent = () => setIsDropdownOpen(true);

  const handleBlurEvent = () => {
    if (value && textFieldValue.length) {
      if (onChangeTextField) {
        onChangeTextField(value.label);
      }
      return setTextFieldValue(value.label);
    }
    if (onSelect) {
      return onSelect(undefined);
    }
  };

  const handleSelect = (option: OptionType) => {
    setTextFieldValue(option.label);
    setIsDropdownOpen(false);
    if (onChangeTextField) {
      onChangeTextField(option.label);
    }
    if (onSelect) {
      onSelect(option);
    }
  };

  const renderOptions = () => {
    if (loading) {
      return <Option disabled>Loading...</Option>;
    }

    if (options?.length && textFieldValue.length) {
      return options?.map((option) => {
        const isSelected = value?.value === option.value;
        return (
          <Option
            key={option.value}
            onSelect={handleSelect}
            option={option}
            selected={isSelected}
          >
            <HighlightedText text={option.label} highlight={textFieldValue} />
          </Option>
        );
      });
    }

    return (
      <Option disabled>
        {textFieldValue.length ? noResultsText : noOptionsText}
      </Option>
    );
  };

  const handleTextFieldChange = (event: ChangeEvent<HTMLInputElement>) => {
    const text = event.target.value;
    if (onChangeTextField) {
      onChangeTextField(text);
    }
    setTextFieldValue(text);
  };

  return (
    <div className="auto-complete" ref={autoCompleteRef}>
      <div className="auto-complete__field-holder">
        <TextField
          autoComplete="off"
          className="complete__text-field"
          id={id}
          onBlur={handleBlurEvent}
          onChange={handleTextFieldChange}
          onFocus={handleFocusEvent}
          placeholder={placeholder}
          value={textFieldValue}
        />
        <SearchIcon className="auto-complete__arrow-icon" />
      </div>
      {isDropdownOpen && (
        <Card className="auto-complete__dropdown" role="listbox">
          {renderOptions()}
        </Card>
      )}
    </div>
  );
}
