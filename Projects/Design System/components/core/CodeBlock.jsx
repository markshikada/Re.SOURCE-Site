import React from 'react';

/* CodeBlock. Page-black inset on a card, mono at caption size. */
export function CodeBlock({ children, style, ...rest }) {
  return (
    <pre
      style={{
        background: 'var(--surface-page)',
        border: '1px solid var(--surface-border)',
        borderRadius: 'var(--radius-sm)',
        padding: 'var(--space-md)',
        overflowX: 'auto',
        margin: 'var(--space-md) 0 0',
        fontFamily: 'var(--font-mono)',
        fontSize: 'var(--fs-caption)',
        lineHeight: 'var(--lh-caption)',
        color: 'var(--text-primary)',
        ...style,
      }}
      {...rest}
    >
      {children}
    </pre>
  );
}
