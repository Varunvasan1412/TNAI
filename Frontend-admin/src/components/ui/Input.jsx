import React from 'react';
import { cn } from '../../lib/utils';

const Input = React.forwardRef(({ className, type = 'text', error, ...props }, ref) => {
  return (
    <input
      type={type}
      ref={ref}
      className={cn(
        'flex w-full rounded-lg border bg-white px-3 py-2 text-sm',
        'transition-colors duration-200',
        'placeholder:text-gray-400',
        'focus:outline-none focus:ring-2 focus:ring-offset-0',
        'disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-gray-50',
        'dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-400',
        error
          ? 'border-danger focus:ring-danger/50 focus:border-danger'
          : 'border-gray-300 dark:border-slate-600 focus:ring-primary/50 focus:border-primary',
        className
      )}
      {...props}
    />
  );
});
Input.displayName = 'Input';

const Textarea = React.forwardRef(({ className, error, ...props }, ref) => {
  return (
    <textarea
      ref={ref}
      className={cn(
        'flex w-full rounded-lg border bg-white px-3 py-2 text-sm',
        'transition-colors duration-200',
        'placeholder:text-gray-400',
        'focus:outline-none focus:ring-2 focus:ring-offset-0',
        'disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-gray-50',
        'dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-400',
        'min-h-[80px] resize-y',
        error
          ? 'border-danger focus:ring-danger/50 focus:border-danger'
          : 'border-gray-300 dark:border-slate-600 focus:ring-primary/50 focus:border-primary',
        className
      )}
      {...props}
    />
  );
});
Textarea.displayName = 'Textarea';

const Select = React.forwardRef(({ className, error, children, ...props }, ref) => {
  return (
    <select
      ref={ref}
      className={cn(
        'flex w-full rounded-lg border bg-white px-3 py-2 text-sm',
        'transition-colors duration-200 appearance-none',
        'focus:outline-none focus:ring-2 focus:ring-offset-0',
        'disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-gray-50',
        'dark:bg-slate-800 dark:text-white',
        'bg-[url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2020%2020%22%20fill%3D%22%236b7280%22%3E%3Cpath%20fill-rule%3D%22evenodd%22%20d%3D%22M5.23%207.21a.75.75%200%20011.06.02L10%2011.168l3.71-3.938a.75.75%200%20111.08%201.04l-4.25%204.5a.75.75%200%2001-1.08%200l-4.25-4.5a.75.75%200%2001.02-1.06z%22%20clip-rule%3D%22evenodd%22%2F%3E%3C%2Fsvg%3E")]',
        'bg-no-repeat bg-[length:1.25rem_1.25rem] bg-[position:right_0.5rem_center] pr-8',
        error
          ? 'border-danger focus:ring-danger/50 focus:border-danger'
          : 'border-gray-300 dark:border-slate-600 focus:ring-primary/50 focus:border-primary',
        className
      )}
      {...props}
    >
      {children}
    </select>
  );
});
Select.displayName = 'Select';

const FormLabel = React.forwardRef(({ className, required, children, ...props }, ref) => (
  <label
    ref={ref}
    className={cn('block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5', className)}
    {...props}
  >
    {children}
    {required && <span className="text-danger ml-1">*</span>}
  </label>
));
FormLabel.displayName = 'FormLabel';

const FormHelperText = React.forwardRef(({ className, error, children, ...props }, ref) => (
  <p
    ref={ref}
    className={cn(
      'mt-1.5 text-xs',
      error ? 'text-danger' : 'text-gray-500 dark:text-gray-400',
      className
    )}
    {...props}
  >
    {children}
  </p>
));
FormHelperText.displayName = 'FormHelperText';

const Checkbox = React.forwardRef(({ className, label, ...props }, ref) => (
  <label className="inline-flex items-center gap-2 cursor-pointer">
    <input
      type="checkbox"
      ref={ref}
      className={cn(
        'w-4 h-4 rounded border-gray-300 text-primary',
        'focus:ring-2 focus:ring-primary/50 focus:ring-offset-0',
        'dark:border-slate-600 dark:bg-slate-800',
        'transition-colors duration-200',
        className
      )}
      {...props}
    />
    {label && <span className="text-sm text-gray-700 dark:text-gray-300">{label}</span>}
  </label>
));
Checkbox.displayName = 'Checkbox';

const Radio = React.forwardRef(({ className, label, ...props }, ref) => (
  <label className="inline-flex items-center gap-2 cursor-pointer">
    <input
      type="radio"
      ref={ref}
      className={cn(
        'w-4 h-4 border-gray-300 text-primary',
        'focus:ring-2 focus:ring-primary/50 focus:ring-offset-0',
        'dark:border-slate-600 dark:bg-slate-800',
        'transition-colors duration-200',
        className
      )}
      {...props}
    />
    {label && <span className="text-sm text-gray-700 dark:text-gray-300">{label}</span>}
  </label>
));
Radio.displayName = 'Radio';

const Switch = React.forwardRef(({ className, label, ...props }, ref) => (
  <label className="inline-flex items-center gap-3 cursor-pointer group">
    <div className="relative">
      <input
        type="checkbox"
        ref={ref}
        className="sr-only peer"
        {...props}
      />
      <div className={cn(
        "w-10 h-5.5 bg-gray-200 dark:bg-slate-700 rounded-full peer transition-all duration-200",
        "peer-checked:bg-primary",
        "peer-focus:ring-2 peer-focus:ring-primary/50",
        className
      )} />
      <div className={cn(
        "absolute left-0.75 top-0.75 bg-white w-4 h-4 rounded-full transition-all duration-200",
        "peer-checked:left-5.25"
      )} />
    </div>
    {label && <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">{label}</span>}
  </label>
));
Switch.displayName = 'Switch';

const InputGroup = ({ children, className }) => (
  <div className={cn('flex items-stretch -space-x-px', className)}>
    {React.Children.map(children, (child, index) => {
      if (!React.isValidElement(child)) return child;
      
      const isFirst = index === 0;
      const isLast = index === React.Children.count(children) - 1;
      
      return React.cloneElement(child, {
        className: cn(
          child.props.className,
          !isFirst && 'rounded-l-none',
          !isLast && 'rounded-r-none',
          'relative z-10 focus:z-20'
        )
      });
    })}
  </div>
);

const InputGroupText = ({ children, className }) => (
  <span className={cn(
    'flex items-center px-3 py-2 text-sm text-gray-500 bg-gray-50 border border-gray-300 dark:bg-slate-700 dark:text-gray-400 dark:border-slate-600',
    className
  )}>
    {children}
  </span>
);

export { Input, Textarea, Select, FormLabel, FormHelperText, Checkbox, Radio, Switch, InputGroup, InputGroupText };
