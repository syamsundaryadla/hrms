import React, { useState, useRef, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store';
import { logout } from '@/store/slices/authSlice';
import { toggleSidebar, toggleMobileMenu } from '@/store/slices/uiSlice';
import maayaLogo from '@/assets/logo-new.png';
import {
  Menu,
  User as UserIcon,
  LogOut,
  ChevronDown,
  Clock,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { CommandPalette } from '@/components/common/CommandPalette';

export const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.auth);

  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);

  const userMenuRef = useRef<HTMLDivElement>(null);

  // Global Ctrl+K / Cmd+K listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setCommandPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/admin/dashboard');
  };

  return (
    <>
      <header className="sticky top-0 z-30 flex h-14 w-full items-center justify-between border-b border-[#E4E7EC] bg-white/90 px-4 backdrop-blur-md sm:px-6">
        {/* Left: Hamburger & Maaya World Top Branding */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => dispatch(toggleMobileMenu())}
            className="rounded-lg p-1.5 text-[#667085] hover:bg-[#F0F2F5] hover:text-[#101828] lg:hidden focus:outline-none"
            aria-label="Toggle navigation"
          >
            <Menu className="w-4 h-4" />
          </button>
          <button
            onClick={() => dispatch(toggleSidebar())}
            className="hidden rounded-lg p-1.5 text-[#667085] hover:bg-[#F0F2F5] hover:text-[#101828] lg:flex focus:outline-none"
            aria-label="Toggle sidebar"
          >
            <Menu className="w-4 h-4" />
          </button>

          {/* Maaya World Branding at Top */}
          <div className="flex items-center gap-2.5 pl-1 border-l border-[#E4E7EC] lg:border-l-0 lg:pl-0">
            <img
              src={maayaLogo}
              alt="Maaya World Logo"
              className="h-7 w-auto object-contain lg:hidden"
            />
          </div>
        </div>

        {/* Right: User Profile Menu */}
        <div className="flex items-center gap-2 sm:gap-3">

          {/* User Profile Menu */}
          <div className="relative" ref={userMenuRef}>
            <button
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className="flex items-center gap-2 rounded-lg p-1 hover:bg-[#F0F2F5] transition-colors focus:outline-none"
            >
              <div className="w-8 h-8 rounded-full bg-[#101828] text-white flex items-center justify-center font-semibold text-xs ring-1 ring-[#E4E7EC]">
                {user?.name
                  .split(' ')
                  .map((n) => n[0])
                  .join('')
                  .slice(0, 2)
                  .toUpperCase() || 'MW'}
              </div>
              <div className="hidden text-left md:block">
                <p className="text-xs font-semibold text-[#101828] leading-tight">{user?.name || 'Staff'}</p>
                <p className="text-[11px] text-[#667085] leading-tight">{user?.employeeId || 'Maaya World'}</p>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-[#667085] hidden md:block" />
            </button>

            {userMenuOpen && (
              <div className="absolute right-0 mt-1.5 w-56 rounded-xl border border-[#E4E7EC] bg-white p-1.5 shadow-lg ring-1 ring-black/5 z-50">
                <div className="px-3 py-2 border-b border-[#E4E7EC]">
                  <p className="text-xs font-semibold text-[#101828]">{user?.name}</p>
                  <p className="text-[11px] text-[#667085] truncate">{user?.email}</p>
                  <p className="text-[11px] text-[#2A4FE0] font-medium mt-0.5">
                    {user?.employeeId} • Maaya World
                  </p>
                </div>

                <div className="py-1">
                  <button
                    onClick={() => {
                      setUserMenuOpen(false);
                      navigate('/employee/profile');
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-[#344054] hover:bg-[#F0F2F5] rounded-lg transition-colors text-left"
                  >
                    <UserIcon className="w-3.5 h-3.5 text-[#667085]" />
                    <span>My Profile</span>
                  </button>
                  <button
                    onClick={() => {
                      setUserMenuOpen(false);
                      navigate('/employee/attendance');
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-[#344054] hover:bg-[#F0F2F5] rounded-lg transition-colors text-left"
                  >
                    <Clock className="w-3.5 h-3.5 text-[#667085]" />
                    <span>My Attendance</span>
                  </button>
                </div>

                <div className="border-t border-[#E4E7EC] pt-1">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-[#B42318] hover:bg-[#FEF3F2] rounded-lg transition-colors text-left"
                  >
                    <LogOut className="w-3.5 h-3.5 text-[#F04438]" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Global Command Palette */}
      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
      />
    </>
  );
};
