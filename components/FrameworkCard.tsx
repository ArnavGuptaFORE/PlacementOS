import FormattedText from './FormattedText';

interface Framework {
  name: string;
  relevance: string;
  application: string;
}

export default function FrameworkCard({ framework }: { framework: Framework }) {
  return (
    <div className="bg-navy border border-gold/20 rounded-lg p-5">
      <h4 className="text-gold font-semibold text-lg mb-2">{framework.name}</h4>
      <div className="space-y-3">
        <div>
          <span className="text-cream/60 text-xs uppercase tracking-wider">Relevance</span>
          <p className="text-cream/90 text-sm mt-1">
            <FormattedText text={framework.relevance} />
          </p>
        </div>
        <div>
          <span className="text-cream/60 text-xs uppercase tracking-wider">How to Apply</span>
          <p className="text-cream/90 text-sm mt-1">
            <FormattedText text={framework.application} />
          </p>
        </div>
      </div>
    </div>
  );
}


