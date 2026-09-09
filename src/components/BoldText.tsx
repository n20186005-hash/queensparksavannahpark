import type { ReactNode } from 'react';

/**
 * Renders localized strings that use **double-asterisk** emphasis
 * as semantic <strong> elements.
 */
export default function BoldText({ text }: { text: string }) {
  const parts = text.split(/\*\*(.+?)\*\*/g);
  const nodes: ReactNode[] = [];
  parts.forEach((part, i) => {
    if (i % 2 === 1) {
      nodes.push(<strong key={i}>{part}</strong>);
    } else if (part) {
      nodes.push(<span key={i}>{part}</span>);
    }
  });
  return <>{nodes}</>;
}
