import type { ComponentType, FC, SVGProps } from "react";

interface IconButtonWithTooltipProps {
    icon: ComponentType<SVGProps<SVGSVGElement> & { size?: number }>;
    onClick: () => void;
    tooltip: string;
    isActive?: boolean;
    ariaLabel?: string;
}


export const IconButtonWithTooltip: FC<IconButtonWithTooltipProps> = ({
    icon: Icon,
    onClick,
    tooltip,
    isActive = false,
    ariaLabel,
}) => (
    <button
        onClick={onClick}
        aria-label={ariaLabel || tooltip}
        title={tooltip}
        className={`transition p-2 cursor-pointer ${isActive ? "text-blue-400" : "text-gray-400 hover:text-white"
            }`}
    >
        <Icon size={18} />
    </button>
);