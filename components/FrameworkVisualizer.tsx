'use client';

import FormattedText from './FormattedText';

interface FrameworkVisualizerProps {
  frameworkName: string;
  data: any;
}

export default function FrameworkVisualizer({ frameworkName, data }: FrameworkVisualizerProps) {
  const name = frameworkName.toLowerCase();

  // SWOT Analysis Visual
  if (name.includes('swot')) {
    return (
      <div className="bg-navy rounded-xl border border-gold/20 p-6">
        <h4 className="text-gold font-semibold text-lg mb-4 text-center">SWOT Matrix</h4>
        <div className="grid grid-cols-2 gap-4">
          <SWOTQuadrant 
            title="Strengths" 
            subtitle="Internal Positive"
            color="bg-green-500/10 border-green-500/30"
            items={extractBulletPoints(data, 'strength')}
          />
          <SWOTQuadrant 
            title="Weaknesses" 
            subtitle="Internal Negative"
            color="bg-red-500/10 border-red-500/30"
            items={extractBulletPoints(data, 'weakness')}
          />
          <SWOTQuadrant 
            title="Opportunities" 
            subtitle="External Positive"
            color="bg-blue-500/10 border-blue-500/30"
            items={extractBulletPoints(data, 'opportunit')}
          />
          <SWOTQuadrant 
            title="Threats" 
            subtitle="External Negative"
            color="bg-yellow-500/10 border-yellow-500/30"
            items={extractBulletPoints(data, 'threat')}
          />
        </div>
        <p className="text-xs text-cream/50 mt-4 text-center">
          Fill in each quadrant based on your analysis
        </p>
      </div>
    );
  }

  // Porter's 5 Forces
  if (name.includes('porter') || name.includes('5 forces') || name.includes('five forces')) {
    return (
      <div className="bg-navy rounded-xl border border-gold/20 p-6">
        <h4 className="text-gold font-semibold text-lg mb-6 text-center">Porter's Five Forces</h4>
        <div className="relative">
          {/* Center */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gold/20 border-2 border-gold rounded-lg flex items-center justify-center z-10">
            <span className="text-gold font-bold text-sm text-center">Industry Competition</span>
          </div>
          
          {/* Forces arranged around center */}
          <div className="grid grid-cols-3 gap-4" style={{ minHeight: '400px' }}>
            {/* Top */}
            <div className="col-start-2">
              <ForceCard title="New Entrants" subtitle="Threat of Entry" points={extractBulletPoints(data, 'new entrant|entry|barrier')} />
            </div>
            
            {/* Left */}
            <div className="col-start-1 row-start-2">
              <ForceCard title="Supplier Power" subtitle="Bargaining Power" points={extractBulletPoints(data, 'supplier')} />
            </div>
            
            {/* Right */}
            <div className="col-start-3 row-start-2">
              <ForceCard title="Buyer Power" subtitle="Customer Power" points={extractBulletPoints(data, 'buyer|customer')} />
            </div>
            
            {/* Bottom Left */}
            <div className="col-start-1 row-start-3">
              <ForceCard title="Rivalry" subtitle="Competitive Intensity" points={extractBulletPoints(data, 'rival|compet')} />
            </div>
            
            {/* Bottom Right */}
            <div className="col-start-3 row-start-3">
              <ForceCard title="Substitutes" subtitle="Threat of Substitution" points={extractBulletPoints(data, 'substitute|alternative')} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // BCG Matrix
  if (name.includes('bcg')) {
    return (
      <div className="bg-navy rounded-xl border border-gold/20 p-6">
        <h4 className="text-gold font-semibold text-lg mb-4 text-center">BCG Growth-Share Matrix</h4>
        <div className="grid grid-cols-2 gap-4">
          <BCGQuadrant 
            title="Question Marks" 
            subtitle="High Growth, Low Share"
            color="bg-purple-500/10 border-purple-500/30"
            description="High investment, uncertain returns"
          />
          <BCGQuadrant 
            title="Stars" 
            subtitle="High Growth, High Share"
            color="bg-yellow-500/10 border-yellow-500/30"
            description="Invest to maintain position"
          />
          <BCGQuadrant 
            title="Dogs" 
            subtitle="Low Growth, Low Share"
            color="bg-gray-500/10 border-gray-500/30"
            description="Divest or harvest"
          />
          <BCGQuadrant 
            title="Cash Cows" 
            subtitle="Low Growth, High Share"
            color="bg-green-500/10 border-green-500/30"
            description="Milk for cash generation"
          />
        </div>
        <div className="mt-4 flex justify-between text-xs text-cream/50">
          <span>← Low Market Share</span>
          <span>High Market Share →</span>
        </div>
        <div className="flex justify-center mt-2">
          <div className="flex flex-col items-center text-xs text-cream/50">
            <span>↑</span>
            <span>High</span>
            <span>Growth</span>
            <span>↓</span>
            <span>Low</span>
          </div>
        </div>
      </div>
    );
  }

  // PESTLE Analysis
  if (name.includes('pestle') || name.includes('pestel') || name.includes('pest')) {
    return (
      <div className="bg-navy rounded-xl border border-gold/20 p-6">
        <h4 className="text-gold font-semibold text-lg mb-4 text-center">PESTLE Analysis</h4>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          <PESTLECard title="Political" icon="🏛️" points={extractBulletPoints(data, 'political|government|policy|regulation')} />
          <PESTLECard title="Economic" icon="💰" points={extractBulletPoints(data, 'economic|gdp|inflation|interest')} />
          <PESTLECard title="Social" icon="👥" points={extractBulletPoints(data, 'social|demographic|cultural|lifestyle')} />
          <PESTLECard title="Technological" icon="💻" points={extractBulletPoints(data, 'technolog|innovation|digital|automation')} />
          <PESTLECard title="Legal" icon="⚖️" points={extractBulletPoints(data, 'legal|law|compliance|regulation')} />
          <PESTLECard title="Environmental" icon="🌍" points={extractBulletPoints(data, 'environment|climate|sustainability|green')} />
        </div>
      </div>
    );
  }

  // Value Chain
  if (name.includes('value chain')) {
    return (
      <div className="bg-navy rounded-xl border border-gold/20 p-6">
        <h4 className="text-gold font-semibold text-lg mb-4 text-center">Value Chain Analysis</h4>
        
        {/* Primary Activities */}
        <div className="mb-4">
          <h5 className="text-cream font-semibold text-sm mb-2">Primary Activities</h5>
          <div className="flex gap-2 overflow-x-auto pb-2">
            <ValueChainStep title="Inbound Logistics" />
            <span className="text-gold text-xl self-center">→</span>
            <ValueChainStep title="Operations" />
            <span className="text-gold text-xl self-center">→</span>
            <ValueChainStep title="Outbound Logistics" />
            <span className="text-gold text-xl self-center">→</span>
            <ValueChainStep title="Marketing & Sales" />
            <span className="text-gold text-xl self-center">→</span>
            <ValueChainStep title="Service" />
            <span className="text-gold text-xl self-center">→</span>
            <div className="bg-green-500/20 border-2 border-green-500 rounded-lg p-3 min-w-[100px] flex items-center justify-center">
              <span className="text-green-400 font-bold text-sm">Margin</span>
            </div>
          </div>
        </div>

        {/* Support Activities */}
        <div>
          <h5 className="text-cream font-semibold text-sm mb-2">Support Activities</h5>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            <SupportActivity title="Infrastructure" subtitle="Planning, Finance, Legal" />
            <SupportActivity title="HR Management" subtitle="Recruiting, Training" />
            <SupportActivity title="Technology" subtitle="R&D, IT Systems" />
            <SupportActivity title="Procurement" subtitle="Purchasing, Sourcing" />
          </div>
        </div>
      </div>
    );
  }

  // Marketing Mix (4P/7P)
  if (name.includes('4p') || name.includes('7p') || name.includes('marketing mix')) {
    const is7P = name.includes('7p');
    return (
      <div className="bg-navy rounded-xl border border-gold/20 p-6">
        <h4 className="text-gold font-semibold text-lg mb-4 text-center">
          {is7P ? '7Ps Marketing Mix' : '4Ps Marketing Mix'}
        </h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <MarketingP title="Product" icon="📦" points={extractBulletPoints(data, 'product|feature|quality')} />
          <MarketingP title="Price" icon="💵" points={extractBulletPoints(data, 'price|pricing|cost')} />
          <MarketingP title="Place" icon="📍" points={extractBulletPoints(data, 'place|distribution|channel')} />
          <MarketingP title="Promotion" icon="📢" points={extractBulletPoints(data, 'promotion|marketing|advertising')} />
          {is7P && (
            <>
              <MarketingP title="People" icon="👤" points={extractBulletPoints(data, 'people|staff|service')} />
              <MarketingP title="Process" icon="⚙️" points={extractBulletPoints(data, 'process|system|delivery')} />
              <MarketingP title="Physical Evidence" icon="🏪" points={extractBulletPoints(data, 'physical|evidence|environment')} />
            </>
          )}
        </div>
      </div>
    );
  }

  // Ansoff Matrix
  if (name.includes('ansoff')) {
    return (
      <div className="bg-navy rounded-xl border border-gold/20 p-6">
        <h4 className="text-gold font-semibold text-lg mb-4 text-center">Ansoff Growth Matrix</h4>
        <div className="grid grid-cols-2 gap-4">
          <AnsoffQuadrant 
            title="Market Penetration"
            subtitle="Existing Products × Existing Markets"
            risk="Low Risk"
            color="bg-green-500/10 border-green-500/30"
          />
          <AnsoffQuadrant 
            title="Product Development"
            subtitle="New Products × Existing Markets"
            risk="Medium Risk"
            color="bg-blue-500/10 border-blue-500/30"
          />
          <AnsoffQuadrant 
            title="Market Development"
            subtitle="Existing Products × New Markets"
            risk="Medium Risk"
            color="bg-yellow-500/10 border-yellow-500/30"
          />
          <AnsoffQuadrant 
            title="Diversification"
            subtitle="New Products × New Markets"
            risk="High Risk"
            color="bg-red-500/10 border-red-500/30"
          />
        </div>
      </div>
    );
  }

  // TAM/SAM/SOM
  if (name.includes('tam') || name.includes('sam') || name.includes('som')) {
    return (
      <div className="bg-navy rounded-xl border border-gold/20 p-6">
        <h4 className="text-gold font-semibold text-lg mb-4 text-center">Market Sizing Framework</h4>
        <div className="flex flex-col items-center space-y-4">
          <MarketSizeCircle 
            title="TAM" 
            subtitle="Total Addressable Market"
            description="Entire market demand"
            size="w-64 h-64"
            color="bg-blue-500/10 border-blue-500"
          />
          <MarketSizeCircle 
            title="SAM" 
            subtitle="Serviceable Addressable Market"
            description="Market you can reach"
            size="w-48 h-48"
            color="bg-gold/10 border-gold"
          />
          <MarketSizeCircle 
            title="SOM" 
            subtitle="Serviceable Obtainable Market"
            description="Market you can capture"
            size="w-32 h-32"
            color="bg-green-500/10 border-green-500"
          />
        </div>
        <p className="text-xs text-cream/50 mt-4 text-center">
          TAM ⊃ SAM ⊃ SOM (Nested markets from broadest to most specific)
        </p>
      </div>
    );
  }

  // Default: Show framework structure
  return (
    <div className="bg-navy rounded-xl border border-gold/20 p-6">
      <h4 className="text-gold font-semibold text-lg mb-4 text-center">{frameworkName}</h4>
      <p className="text-cream/70 text-sm text-center">
        Visual framework template
      </p>
      <div className="mt-4 space-y-2">
        {extractBulletPoints(data, '').slice(0, 4).map((point, i) => (
          <div key={i} className="bg-navy-light border border-gold/20 rounded p-3">
            <p className="text-cream/80 text-sm"><FormattedText text={point} /></p>
          </div>
        ))}
      </div>
    </div>
  );
}

// Helper function to extract relevant points from framework data
function extractBulletPoints(data: any, keyword: string): string[] {
  if (!data) return ['Analysis point 1', 'Analysis point 2', 'Analysis point 3'];
  
  const text = typeof data === 'string' ? data : JSON.stringify(data);
  const regex = new RegExp(keyword, 'i');
  
  // Extract sentences that match the keyword
  const sentences = text.split(/[.!?]\s+/);
  const matches = sentences
    .filter(s => regex.test(s) && s.length > 20)
    .slice(0, 3);
  
  if (matches.length > 0) {
    return matches.map(m => m.trim());
  }
  
  // Fallback: return generic placeholder
  return [
    `Consider ${keyword} factors`,
    'Analyze key elements',
    'Evaluate impact'
  ];
}

// Sub-components for each framework type

function SWOTQuadrant({ title, subtitle, color, items }: any) {
  return (
    <div className={`${color} border-2 rounded-lg p-4 min-h-[150px]`}>
      <h5 className="font-bold text-cream mb-1">{title}</h5>
      <p className="text-xs text-cream/50 mb-3">{subtitle}</p>
      <ul className="space-y-1">
        {items.map((item: string, i: number) => (
          <li key={i} className="text-xs text-cream/70">• {item}</li>
        ))}
      </ul>
    </div>
  );
}

function ForceCard({ title, subtitle, points }: any) {
  return (
    <div className="bg-navy-light border border-gold/20 rounded-lg p-3">
      <h5 className="font-semibold text-cream text-sm mb-1">{title}</h5>
      <p className="text-xs text-cream/50 mb-2">{subtitle}</p>
      {points.length > 0 && (
        <p className="text-xs text-cream/70">{points[0]}</p>
      )}
    </div>
  );
}

function BCGQuadrant({ title, subtitle, color, description }: any) {
  return (
    <div className={`${color} border-2 rounded-lg p-4 min-h-[120px]`}>
      <h5 className="font-bold text-cream mb-1">{title}</h5>
      <p className="text-xs text-cream/50 mb-2">{subtitle}</p>
      <p className="text-xs text-cream/70 italic">{description}</p>
    </div>
  );
}

function PESTLECard({ title, icon, points }: any) {
  return (
    <div className="bg-navy-light border border-gold/20 rounded-lg p-3">
      <div className="text-2xl mb-2">{icon}</div>
      <h5 className="font-semibold text-cream text-sm mb-2">{title}</h5>
      {points.length > 0 && (
        <p className="text-xs text-cream/60">{points[0].substring(0, 60)}...</p>
      )}
    </div>
  );
}

function ValueChainStep({ title }: any) {
  return (
    <div className="bg-gold/10 border border-gold/30 rounded-lg p-3 min-w-[100px]">
      <span className="text-cream text-xs font-semibold text-center block">{title}</span>
    </div>
  );
}

function SupportActivity({ title, subtitle }: any) {
  return (
    <div className="bg-navy-light border border-gold/20 rounded p-2">
      <h6 className="text-cream text-xs font-semibold">{title}</h6>
      <p className="text-cream/50 text-xs">{subtitle}</p>
    </div>
  );
}

function MarketingP({ title, icon, points }: any) {
  return (
    <div className="bg-navy-light border border-gold/20 rounded-lg p-3 text-center">
      <div className="text-2xl mb-1">{icon}</div>
      <h5 className="font-semibold text-cream text-sm">{title}</h5>
      {points.length > 0 && (
        <p className="text-xs text-cream/60 mt-2">{points[0].substring(0, 40)}...</p>
      )}
    </div>
  );
}

function AnsoffQuadrant({ title, subtitle, risk, color }: any) {
  return (
    <div className={`${color} border-2 rounded-lg p-4 min-h-[120px]`}>
      <h5 className="font-bold text-cream mb-1">{title}</h5>
      <p className="text-xs text-cream/50 mb-2">{subtitle}</p>
      <span className="text-xs text-cream/70 bg-navy/50 px-2 py-1 rounded">{risk}</span>
    </div>
  );
}

function MarketSizeCircle({ title, subtitle, description, size, color }: any) {
  return (
    <div className={`${size} ${color} border-4 rounded-full flex flex-col items-center justify-center`}>
      <h5 className="font-bold text-cream text-xl">{title}</h5>
      <p className="text-xs text-cream/70 font-semibold">{subtitle}</p>
      <p className="text-xs text-cream/50 mt-1 text-center px-4">{description}</p>
    </div>
  );
}

