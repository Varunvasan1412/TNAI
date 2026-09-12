import React, { useEffect, useRef, useState, useCallback} from 'react';
import type { KeyboardEvent } from 'react';

interface SelectOption {
    id?: number;
    value: string;
    label: string;
}

interface CustomSelectProps {
    optionArray: SelectOption[];
    value?: string;
    onChange?: (value: string) => void;
    placeholder?: string;
    className?: string;
    disabled?: boolean;
    name?: string;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
    optionArray,
    value,
    onChange,
    placeholder,
    className = '',
    disabled = false,
    name,
}) => {
    const initialValue = value ?? (placeholder ? '' : optionArray[0]?.value ?? '');
    const [isOpen, setIsOpen] = useState(false);
    const [internalSelected, setInternalSelected] = useState<string>(initialValue);
    const containerRef = useRef<HTMLDivElement>(null);

    // Derive current selection — controlled prop takes precedence over internal state
    const selected = value !== undefined ? value : internalSelected;

    // Close on outside click
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [setIsOpen]);

    const handleToggle = useCallback(() => {
        if (!disabled) setIsOpen((prev) => !prev);
    }, [disabled]);

    const handleSelect = useCallback(
        (val: string) => {
            // Only update internal state in uncontrolled mode
            if (value === undefined) {
                setInternalSelected(val);
            }
            onChange?.(val);
            setIsOpen(false);
        },
        [value, onChange]
    );

    // Keyboard accessibility
    const handleKeyDown = useCallback(
        (e: KeyboardEvent<HTMLDivElement>) => {
            if (disabled) return;
            const currentIndex = optionArray.findIndex((opt) => opt.value === selected);
            switch (e.key) {
                case 'Enter':
                case ' ':
                    e.preventDefault();
                    setIsOpen((prev) => !prev);
                    break;
                case 'Escape':
                    setIsOpen(false);
                    break;
                case 'ArrowDown':
                    e.preventDefault();
                    if (!isOpen) {
                        setIsOpen(true);
                    } else {
                        const next = optionArray[currentIndex + 1];
                        if (next) handleSelect(next.value);
                    }
                    break;
                case 'ArrowUp':
                    e.preventDefault();
                    if (isOpen) {
                        const prev = optionArray[currentIndex - 1];
                        if (prev) handleSelect(prev.value);
                    }
                    break;
                default:
                    break;
            }
        },
        [disabled, isOpen, selected, optionArray, handleSelect]
    );

    const displayLabel = selected
        ? optionArray.find((opt) => opt.value === selected)?.label
        : placeholder;

    return (
        <div
            ref={containerRef}
            role="combobox"
            aria-expanded={isOpen}
            aria-haspopup="listbox"
            aria-disabled={disabled}
            tabIndex={disabled ? -1 : 0}
            className={`nice-select selectmenu wide ${isOpen ? 'open' : ''} ${disabled ? 'disabled' : ''} ${className}`.trim()}
            onClick={handleToggle}
            onKeyDown={handleKeyDown}
        >
            {/* Hidden native input for form support */}
            {name && <input type="hidden" name={name} value={selected} />}

            <span className="current">{displayLabel}</span>

            <ul className="list" role="listbox">
                {optionArray.map((option, index) => {
                    const isSelected = selected === option.value;
                    return (
                        <li
                            key={option.id ?? index}
                            role="option"
                            aria-selected={isSelected}
                            data-value={option.value}
                            className={`option ${isSelected ? 'selected focus' : ''}`}
                            onClick={(e) => {
                                e.stopPropagation();
                                handleSelect(option.value);
                            }}
                        >
                            {option.label}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default React.memo(CustomSelect);