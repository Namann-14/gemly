import { cn } from '@/lib/utils'

export const Logo = ({ className, uniColor }: { className?: string; uniColor?: boolean }) => {
    return (
        <img
            src="/logo.svg"
            className={cn('text-foreground h-6 w-auto object-contain', className)}
            alt="Logo"
        />
    )
}

export const LogoIcon = ({ className, uniColor }: { className?: string; uniColor?: boolean }) => {
    return (
        <img
            src="/logo.svg"
            className={cn('size-6 object-contain', className)}
            alt="Logo Icon"
        />
    )
}
