import React from 'react';

/* Card. Surface g06 on the black page, one structural border, radius-md. */
export function Card({ padding = 'lg', as: Tag = 'div', style, children, ...rest }) {
  const pad = { sm: 'var(--space-sm)', md: 'var(--space-md)', lg: 'var(--space-lg)' }[padding];
  return (
    <Tag
      style={{
        background: 'var(--surface-card)',
        border: '1px solid var(--surface-border)',
        borderRadius: 'var(--radius-md)',
        padding: pad,
        color: 'var(--text-primary)',
        ...style,
      }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
