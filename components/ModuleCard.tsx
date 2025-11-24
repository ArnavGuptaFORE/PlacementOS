import Link from 'next/link';

interface ModuleCardProps {
  title: string;
  description: string;
  icon: string;
  href: string;
}

export default function ModuleCard({ title, description, icon, href }: ModuleCardProps) {
  return (
    <Link
      href={href}
      className="block p-6 bg-navy-light rounded-xl border border-gold/20 hover:border-gold/60 transition-all hover:scale-105"
    >
      <div className="flex items-start space-x-4">
        <div className="text-4xl">{icon}</div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-cream mb-2">{title}</h3>
          <p className="text-sm text-cream/70">{description}</p>
        </div>
      </div>
    </Link>
  );
}


