import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import IconCalendar from '../icons/IconCalendar';
import IconSearch from '../icons/IconSearch';
import IconMuseum from '../icons/IconMuseum';
import IconProfile from '../icons/IconProfile';

type NavItem = {
  name: string;
  Icon: React.FC<{ isActive: boolean }>;
  path: string;
};

const navItems: NavItem[] = [
    // 오늘의 작품 path 추후 작품 상세 PATH로 수정해야 함
  { name: '오늘의 작품', Icon: IconCalendar, path: '/today' },
  { name: '검색하기', Icon: IconSearch, path: '/search' },
  { name: '마이뮤지엄', Icon: IconMuseum, path: '/mymuseum' },
  { name: '프로필', Icon: IconProfile, path: '/profile' },
];

const Navbar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;

  return (
    <nav className="w-full max-w-[412px] h-[60px] mx-auto flex justify-around items-center bg-white border-t border-gray-200 fixed bottom-0 left-1/2 -translate-x-1/2 z-50">
      {navItems.map(({ name, Icon, path }) => {
        const isActive = currentPath.startsWith(path);
        return (
          <button
            key={name}
            onClick={() => navigate(path)}
            className="flex flex-col items-center text-xs focus:outline-none"
          >
            <Icon isActive={isActive} />
            <span
              className={`mt-1 text-[10px] whitespace-nowrap ${
                isActive
                  ? 'text-[var(--color-navbar-active)] font-semibold'
                  : 'text-[var(--color-netural-6)]'
              }`}
            >
              {name}
            </span>
          </button>
        );
      })}
    </nav>
  );
};

export default Navbar;
