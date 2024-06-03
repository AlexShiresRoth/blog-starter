import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const headerVariants = cva(
  'flex flex-col w-full fixed top-0 left-0 z-40 md:relative',
  {
    variants: {
      variant: {
        Basic: '',
        Modern: '',
        Playful: 'bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-700',
        Elegant: 'bg-white',
      },
    },
    defaultVariants: {
      variant: 'Basic',
    },
  }
);

const innnerVariants = cva(
  'flex flex-row w-full px-8 lg:px-0 md:w-11/12 lg:w-3/4 gap-8 items-center',
  {
    variants: {
      variant: {
        Basic: '',
        Modern: 'justify-between',
        Playful: '',
        Elegant: '',
      },
    },
  }
);

export interface HeaderProps
  extends React.HTMLAttributes<HTMLHeadElement>,
    VariantProps<typeof headerVariants> {}

const Header = React.forwardRef<HTMLButtonElement, HeaderProps>(
  ({ className, variant, ...props }, ref) => {
    return (
      <header
        data-component-type="header"
        ref={ref}
        className={cn(headerVariants({ variant }))}
        data-type-header-variant={variant}
        role="banner"
      >
        <div className="w-full flex flex-col items-center md:py-4 border-b border-b-stone-100 dark:border-b-gray-900">
          <div className={cn(innnerVariants({ variant }))}>
            {props.children}
          </div>
          <div className="w-11/12 mx-4 mt-2 flex gap-4 items-center justify-between md:hidden"></div>
        </div>
      </header>
    );
  }
);

Header.displayName = 'Header';

export { Header, headerVariants };
