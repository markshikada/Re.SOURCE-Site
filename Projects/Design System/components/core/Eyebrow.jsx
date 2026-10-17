import React from 'react';

/* Eyebrow. Mono, caption size, uppercase, secondary grey. The small meta layer. */
export function Eyebrow({ children, style, ...rest }) {
  return (
    <p
      style={{
        margin: 0,
        fontFamily: 'var(--font-mono)',
        fontSize: 'var(--fs-caption)',
        lineHeight: 'var(--lh-caption)',
        fontWeight: 400,
        textTransform: 'uppercase',
        color: 'var(--text-secondary)',
        ...style,
      }}
      {...rest}
    >
      {children}
    </p>
  );
}
