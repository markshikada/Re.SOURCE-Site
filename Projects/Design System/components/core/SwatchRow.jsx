import React from 'react';

/* SwatchRow. A grey or surface value shown at its real value, with its name
   and its use. Structural greys are shown as fills; position colours are not. */
export function SwatchRow({ swatch, name, use, stroke = false, style, ...rest }) {
  return (
    <div
      style={{
        display: 'flex', alignItems: 'center', gap: 'var(--space-md)',
        border: '1px solid var(--surface-border)',
        borderRadius: 'var(--radius-sm)',
        padding: 'var(--space-sm) var(--space-md)',
        ...style,
      }}
      {...rest}
    >
      <div style={{
        width: 48, height: 32, flex: '0 0 48px', borderRadius: 'var(--radius-sm)',
        background: stroke ? 'var(--surface-page)' : swatch,
        border: stroke ? `var(--stroke) solid ${swatch}` : '1px solid var(--surface-border)',
      }} />
      <div style={{ minWidth: 0 }}>
        <div style={{
          fontFamily: 'var(--font-mono)', fontSize: 'var(--fs-caption)',
          lineHeight: 'var(--lh-caption)', color: 'var(--text-primary)',
        }}>{name}</div>
        <div style={{
          fontSize: 'var(--fs-caption)', lineHeight: 'var(--lh-caption)',
          color: 'var(--text-secondary)',
        }}>{use}</div>
      </div>
    </div>
  );
}
