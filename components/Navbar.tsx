'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      // Clear all localStorage data
      localStorage.clear();
      
      await logout();
      router.push('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <nav className="bg-navy-light border-b border-gold/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3">
              <Image
                src="/logo.png"
                alt="PlacementOS Logo"
                width={40}
                height={40}
                className="rounded-lg"
              />
              <span className="text-xl font-semibold text-cream">PlacementOS</span>
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                <NavLink href="/dashboard" active={pathname === '/dashboard'}>
                  Dashboard
                </NavLink>
                <NavLink href="/chat" active={pathname === '/chat'}>
                  AI Mentor
                </NavLink>
                <div className="flex items-center space-x-3 ml-4 pl-4 border-l border-gold/20">
                  <span className="text-cream/70 text-sm">{user.email}</span>
                  <button
                    onClick={handleLogout}
                    className="text-sm text-cream/80 hover:text-gold transition-colors"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <>
                <NavLink href="/dashboard" active={pathname === '/dashboard'}>
                  Dashboard
                </NavLink>
                <NavLink href="/chat" active={pathname === '/chat'}>
                  AI Mentor
                </NavLink>
                <div className="ml-4 flex items-center space-x-3">
                  <Link
                    href="/login"
                    className="text-sm text-cream hover:text-gold transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    href="/signup"
                    className="text-sm bg-gold text-navy font-semibold px-4 py-2 rounded-lg hover:bg-gold-light transition-colors"
                  >
                    Sign Up
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

function NavLink({ href, children, active }: { href: string; children: React.ReactNode; active: boolean }) {
  return (
    <Link
      href={href}
      className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
        active
          ? 'bg-gold text-navy'
          : 'text-cream hover:bg-navy hover:text-gold'
      }`}
    >
      {children}
    </Link>
  );
}


