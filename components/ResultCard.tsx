import FormattedText from './FormattedText';

interface ResultCardProps {
  title: string;
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning';
}

export default function ResultCard({ title, children, variant = 'default' }: ResultCardProps) {
  const borderColor = {
    default: 'border-gold/20',
    success: 'border-green-500/40',
    warning: 'border-yellow-500/40',
  }[variant];

  return (
    <div className={`bg-navy-light rounded-xl border ${borderColor} p-6`}>
      <h3 className="text-lg font-semibold text-cream mb-4">{title}</h3>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

export function ResultItem({ label, value }: { label: string; value: string | number }) {
  const displayValue = typeof value === 'string' ? value : value.toString();
  
  return (
    <div className="flex justify-between items-start">
      <span className="text-cream/70 text-sm">{label}</span>
      <span className="text-cream font-medium text-sm text-right ml-4">
        <FormattedText text={displayValue} />
      </span>
    </div>
  );
}

export function ResultList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2">
      {items.map((item, index) => (
        <li key={index} className="flex items-start space-x-2">
          <span className="text-gold mt-1">•</span>
          <span className="text-cream/80 text-sm flex-1">
            <FormattedText text={item} />
          </span>
        </li>
      ))}
    </ul>
  );
}


