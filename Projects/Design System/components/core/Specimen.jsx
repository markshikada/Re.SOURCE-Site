import React from 'react';

/* Specimen. A type sample set at its real size and weight, with the spec as
   its caption. The system shows type rather than describing it in a table. */
export function Specimen({ spec, size = 18, weight = 400, leading = 30, font = 'sans', children, style, ...rest }) {
  return (
    <div
      style={{
        borderBottom: '1px solid var(--surface-border)',
        padding: 'var(--space-md) 0',
        ...style,
      }}
      {...rest}
    >
      <p style={{
        margin: '0 0 var(--space-sm)', fontFamily: 'var(--font-mono)',
        fontSize: 'var(--fs-caption)', lineHeight: 'var(--lh-caption)',
        textTransform: 'uppercase', color: 'var(--text-secondary)',
      }}>{spec}</p>
      <p style={{
        margin: 0,
        fontFamily: font === 'mono' ? 'var(--font-mono)' : 'var(--font-sans)',
        fontSize: size, fontWeight: weight, lineHeight: `${leading}px`,
        color: 'var(--text-primary)',
      }}>{children}</p>
    </div>
  );
}
