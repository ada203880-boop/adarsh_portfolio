import * as React from 'react';
import { cn } from '../../lib/utils';
export const Button = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(({className,...props},ref)=><button ref={ref} className={cn('inline-flex min-h-11 items-center justify-center border border-white/15 px-4 text-xs text-white/70 transition hover:border-white/40 hover:text-white',className)} {...props}/>);
Button.displayName='Button';
