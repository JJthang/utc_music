import React from 'react';

interface SidebarItemProps {
    icon: React.ElementType;
    label: string;
    id: string;
    active: boolean;
    onClick: (id: string) => void;
    badge?: string;
}

const MenuItems: React.FC<SidebarItemProps> = ({ icon: Icon, label, id, active, onClick, badge }) => (
    <li>
        <button
            onClick={() => onClick(id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all cursor-pointer ${active ? 'bg-[#ffffff1a] text-white' : 'text-gray-300 hover:bg-[#ffffff0d] hover:text-white'
                }`}
        >
            <Icon size={22} />
            <span className="text-[15px] font-medium">{label}</span>
            {badge && (
                <span className="ml-auto bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                    {badge}
                </span>
            )}
        </button>
    </li>
);

export default MenuItems;
