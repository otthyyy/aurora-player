'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'secondary' | 'success' | 'warning' | 'danger' | 'info';
  size?: 'sm' | 'md' | 'lg';
  rounded?: boolean;
  animated?: boolean;
}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  (
    {
      className,
      variant = 'default',
      size = 'md',
      rounded = false,
      animated = false,
      children,
      ...props
    },
    ref
  ) => {
    const baseClasses = 'inline-flex items-center font-medium transition-all duration-200';
    
    const variants = {
      default: 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200',
      secondary: 'bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200',
      success: 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200',
      warning: 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200',
      danger: 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200',
      info: 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200',
    };

    const sizes = {
      sm: 'px-2 py-1 text-xs',
      md: 'px-2.5 py-1.5 text-sm',
      lg: 'px-3 py-2 text-base',
    };

    const roundedClasses = rounded ? 'rounded-full' : 'rounded-md';

    return (
      <motion.div
        ref={ref}
        className={cn(
          baseClasses,
          variants[variant],
          sizes[size],
          roundedClasses,
          className
        )}
        animate={animated ? { scale: [1, 1.05, 1] } : {}}
        transition={animated ? { duration: 2, repeat: Infinity } : {}}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

Badge.displayName = 'Badge';

export default Badge;
