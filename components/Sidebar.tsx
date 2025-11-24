'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const modules = [
  {
    name: 'Resume Matcher',
    href: '/resume-matcher',
    icon: '📄',
    description: 'Match resume with JD',
  },
  {
    name: 'PPT Frameworks',
    href: '/ppt-frameworks',
    icon: '📊',
    description: 'Business frameworks',
  },
  {
    name: 'Case Solver',
    href: '/case-solver',
    icon: '🧩',
    description: 'Solve case studies',
  },
  {
    name: 'Guesstimate',
    href: '/guesstimate',
    icon: '🔢',
    description: 'Market sizing help',
  },
  {
    name: 'Company Intel',
    href: '/company-intel',
    icon: '🏢',
    description: 'Company research',
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-navy-light border-r border-gold/20 min-h-screen p-4">
      <div className="space-y-2">
        {modules.map((module) => (
          <Link
            key={module.href}
            href={module.href}
            className={`block p-3 rounded-lg transition-all ${
              pathname === module.href
                ? 'bg-gold text-navy'
                : 'text-cream hover:bg-navy hover:border-gold/40 border border-transparent'
            }`}
          >
            <div className="flex items-center space-x-3">
              <span className="text-2xl">{module.icon}</span>
              <div>
                <div className="font-semibold text-sm">{module.name}</div>
                <div className={`text-xs ${pathname === module.href ? 'text-navy/70' : 'text-cream/60'}`}>
                  {module.description}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </aside>
  );
}


