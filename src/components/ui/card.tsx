import * as React from 'react';
import { cn } from '../../lib/utils';
export const Card=React.forwardRef<HTMLDivElement,React.HTMLAttributes<HTMLDivElement>>(({className,...props},ref)=><div ref={ref} className={cn('border border-white/10 bg-white/[.02]',className)} {...props}/>); Card.displayName='Card';
