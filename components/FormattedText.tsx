interface FormattedTextProps {
  text: string;
  className?: string;
}

export default function FormattedText({ text, className = '' }: FormattedTextProps) {
  // Convert **text** to <strong>text</strong>
  const formatText = (input: string) => {
    const parts = input.split(/(\*\*.*?\*\*)/g);
    
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        const boldText = part.slice(2, -2);
        return <strong key={index} className="font-semibold text-gold">{boldText}</strong>;
      }
      return <span key={index}>{part}</span>;
    });
  };

  return <span className={className}>{formatText(text)}</span>;
}

