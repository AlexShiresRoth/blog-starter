import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const heroVariants = cva('w-full flex justify-center', {
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
});

const containerVariants = cva('', {
  variants: {
    variant: {
      Basic: '',
      Modern: 'relative w-3/4 flex justify-center rounded my-8 items-end',
      Playful: '',
      Elegant: '',
    },
  },
  defaultVariants: {
    variant: 'Basic',
  },
});

export interface HeroProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof heroVariants> {}

const Hero = React.forwardRef<HTMLDivElement, HeroProps>(
  ({ className, variant, ...props }, ref) => {
    return (
      <div
        className={cn(heroVariants({ variant }))}
        ref={ref}
        data-component-type="hero"
      >
        <div className={cn(containerVariants({ variant }))}>
          {props.children}
        </div>
      </div>
    );
  }
);

Hero.displayName = 'Hero';

export { Hero, heroVariants };
