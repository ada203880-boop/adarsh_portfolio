import * as React from 'react';
import { cn } from '../../lib/utils';
export function Badge({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) { return <span className={cn('inline-flex items-center border border-white/15 px-2 py-1 text-[10px] uppercase tracking-wider text-white/60', className)} {...props}/> }
