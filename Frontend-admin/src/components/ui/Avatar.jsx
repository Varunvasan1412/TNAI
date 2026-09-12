import React from 'react';
import { cn } from '../../lib/utils';

const sizeStyles = {
  xs: 'w-6 h-6 text-2xs',
  sm: 'w-8 h-8 text-xs',
  md: 'w-10 h-10 text-sm',
  lg: 'w-12 h-12 text-base',
  xl: 'w-16 h-16 text-lg',
  '2xl': 'w-20 h-20 text-xl',
};

const statusColors = {
  online:  'bg-success',
  offline: 'bg-gray-400',
  busy:    'bg-danger',
  away:    'bg-warning',
};

const Avatar = React.forwardRef(({
  src,
  alt = '',
  name,
  size = 'md',
  status,
  className,
  ...props
}, ref) => {
  const initials = name
    ? name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)
    : '?';

  return (
    <div ref={ref} className={cn('relative inline-flex flex-shrink-0', className)} {...props}>
      {src ? (
        <img
          src={src}
          alt={alt || name || ''}
          className={cn(
            'rounded-full object-cover ring-2 ring-white dark:ring-slate-800',
            sizeStyles[size]
          )}
        />
      ) : (
        <div
          className={cn(
            'rounded-full flex items-center justify-center font-semibold',
            'bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-200',
            'ring-2 ring-white dark:ring-slate-800',
            sizeStyles[size]
          )}
        >
          {initials}
        </div>
      )}
      {status && (
        <span
          className={cn(
            'absolute bottom-0 right-0 block rounded-full ring-2 ring-white dark:ring-slate-800',
            statusColors[status],
            size === 'xs' || size === 'sm' ? 'w-2 h-2' : 'w-3 h-3'
          )}
        />
      )}
    </div>
  );
});

Avatar.displayName = 'Avatar';

const AvatarGroup = ({ children, max = 4, className }) => {
  const childArray = React.Children.toArray(children);
  const shown = childArray.slice(0, max);
  const remaining = childArray.length - max;

  return (
    <div className={cn('flex -space-x-2', className)}>
      {shown}
      {remaining > 0 && (
        <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium bg-gray-200 text-gray-600 ring-2 ring-white dark:ring-slate-800 dark:bg-slate-700 dark:text-gray-300">
          +{remaining}
        </div>
      )}
    </div>
  );
};

export { Avatar, AvatarGroup };
