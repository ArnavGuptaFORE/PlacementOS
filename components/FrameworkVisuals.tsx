'use client';

import { useEffect, useRef } from 'react';
import mermaid from 'mermaid';

interface FrameworkVisualsProps {
  frameworkName: string;
  data?: any;
}

export default function FrameworkVisuals({ frameworkName, data }: FrameworkVisualsProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    mermaid.initialize({
      startOnLoad: true,
      theme: 'dark',
      themeVariables: {
        primaryColor: '#D4A857',
        primaryTextColor: '#F4F6FB',
        primaryBorderColor: '#D4A857',
        lineColor: '#D4A857',
        secondaryColor: '#1A1F3C',
        tertiaryColor: '#0C1024',
        background: '#0C1024',
        mainBkg: '#1A1F3C',
        secondBkg: '#0C1024',
        textColor: '#F4F6FB',
        fontSize: '14px',
      },
    });

    if (containerRef.current) {
      const diagram = generateDiagram(frameworkName, data);
      if (diagram) {
        mermaid.render('mermaid-diagram-' + Date.now(), diagram).then((result) => {
          if (containerRef.current) {
            containerRef.current.innerHTML = result.svg;
          }
        });
      }
    }
  }, [frameworkName, data]);

  return (
    <div className="bg-navy rounded-lg p-6 border border-gold/20 overflow-x-auto">
      <div ref={containerRef} className="flex justify-center items-center min-h-[300px]" />
    </div>
  );
}

function generateDiagram(frameworkName: string, data?: any): string | null {
  const name = frameworkName.toLowerCase();

  if (name.includes('swot')) {
    return `
graph TB
    subgraph "SWOT Analysis"
        S[<b>Strengths</b><br/>Internal Positive]
        W[<b>Weaknesses</b><br/>Internal Negative]
        O[<b>Opportunities</b><br/>External Positive]
        T[<b>Threats</b><br/>External Negative]
    end
    S -.-> O
    W -.-> T
    style S fill:#2ecc71,stroke:#27ae60,color:#000
    style W fill:#e74c3c,stroke:#c0392b,color:#fff
    style O fill:#3498db,stroke:#2980b9,color:#fff
    style T fill:#f39c12,stroke:#e67e22,color:#000
`;
  }

  if (name.includes('porter') || name.includes('5 forces')) {
    return `
graph TB
    Center[<b>Industry<br/>Competition</b>]
    
    Rivalry[<b>Competitive Rivalry</b><br/>Current Competitors]
    Suppliers[<b>Supplier Power</b><br/>Bargaining Power]
    Buyers[<b>Buyer Power</b><br/>Customer Power]
    NewEntry[<b>New Entrants</b><br/>Market Entry Threat]
    Substitutes[<b>Substitutes</b><br/>Alternative Products]
    
    Rivalry --> Center
    Suppliers --> Center
    Buyers --> Center
    NewEntry --> Center
    Substitutes --> Center
    
    style Center fill:#D4A857,stroke:#D4A857,color:#000
    style Rivalry fill:#1A1F3C,stroke:#D4A857,color:#F4F6FB
    style Suppliers fill:#1A1F3C,stroke:#D4A857,color:#F4F6FB
    style Buyers fill:#1A1F3C,stroke:#D4A857,color:#F4F6FB
    style NewEntry fill:#1A1F3C,stroke:#D4A857,color:#F4F6FB
    style Substitutes fill:#1A1F3C,stroke:#D4A857,color:#F4F6FB
`;
  }

  if (name.includes('bcg')) {
    return `
quadrantChart
    title BCG Matrix
    x-axis Low Market Share --> High Market Share
    y-axis Low Market Growth --> High Market Growth
    quadrant-1 Stars
    quadrant-2 Question Marks
    quadrant-3 Dogs
    quadrant-4 Cash Cows
`;
  }

  if (name.includes('pestle') || name.includes('pestel')) {
    return `
mindmap
  root((PESTLE<br/>Analysis))
    Political
      Government Policy
      Political Stability
      Tax Policy
    Economic
      Economic Growth
      Interest Rates
      Exchange Rates
    Social
      Demographics
      Cultural Trends
      Lifestyle Changes
    Technological
      Innovation
      R&D Activity
      Automation
    Legal
      Employment Law
      Consumer Law
      Health & Safety
    Environmental
      Climate Change
      Sustainability
      Carbon Footprint
`;
  }

  if (name.includes('value chain')) {
    return `
graph LR
    subgraph "Primary Activities"
        A[Inbound<br/>Logistics] --> B[Operations]
        B --> C[Outbound<br/>Logistics]
        C --> D[Marketing<br/>& Sales]
        D --> E[Service]
    end
    
    subgraph "Support Activities"
        F[Firm Infrastructure]
        G[Human Resources]
        H[Technology]
        I[Procurement]
    end
    
    F -.-> A & B & C & D & E
    G -.-> A & B & C & D & E
    H -.-> A & B & C & D & E
    I -.-> A & B & C & D & E
    
    E --> J[Margin]
    
    style J fill:#2ecc71,stroke:#27ae60,color:#000
`;
  }

  if (name.includes('4p') || name.includes('marketing mix') || name.includes('7p')) {
    return `
graph TB
    Center[<b>Marketing<br/>Mix</b>]
    
    Product[<b>Product</b><br/>Features & Quality]
    Price[<b>Price</b><br/>Pricing Strategy]
    Place[<b>Place</b><br/>Distribution]
    Promotion[<b>Promotion</b><br/>Marketing Comms]
    People[<b>People</b><br/>Staff & Service]
    Process[<b>Process</b><br/>Delivery Systems]
    Physical[<b>Physical Evidence</b><br/>Tangible Elements]
    
    Product --> Center
    Price --> Center
    Place --> Center
    Promotion --> Center
    People --> Center
    Process --> Center
    Physical --> Center
    
    style Center fill:#D4A857,stroke:#D4A857,color:#000
`;
  }

  if (name.includes('ansoff')) {
    return `
graph TB
    subgraph "Ansoff Matrix"
        subgraph "Existing Products"
            A[Market Penetration<br/>Existing Markets]
            B[Market Development<br/>New Markets]
        end
        subgraph "New Products"
            C[Product Development<br/>Existing Markets]
            D[Diversification<br/>New Markets]
        end
    end
    
    style A fill:#2ecc71,stroke:#27ae60,color:#000
    style B fill:#3498db,stroke:#2980b9,color:#fff
    style C fill:#f39c12,stroke:#e67e22,color:#000
    style D fill:#e74c3c,stroke:#c0392b,color:#fff
`;
  }

  if (name.includes('tam') || name.includes('sam') || name.includes('som')) {
    return `
graph TB
    TAM[<b>TAM</b><br/>Total Addressable Market<br/>Entire market demand]
    SAM[<b>SAM</b><br/>Serviceable Addressable Market<br/>Market you can reach]
    SOM[<b>SOM</b><br/>Serviceable Obtainable Market<br/>Market you can capture]
    
    TAM --> SAM
    SAM --> SOM
    
    style TAM fill:#3498db,stroke:#2980b9,color:#fff
    style SAM fill:#D4A857,stroke:#D4A857,color:#000
    style SOM fill:#2ecc71,stroke:#27ae60,color:#000
`;
  }

  // Default visualization for unknown frameworks
  return `
graph TB
    A[${frameworkName}] --> B[Analysis]
    B --> C[Strategy]
    C --> D[Implementation]
    D --> E[Results]
    
    style A fill:#D4A857,stroke:#D4A857,color:#000
`;
}

