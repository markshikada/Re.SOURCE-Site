import React from 'react';

/* PositionNode. A wheel node: dark fill, position colour as a 3px stroke,
   white label. Size is 3u on whatever unit the canvas has chosen. */
export function PositionNode({ colour = 'var(--cl-12-life)', size = 48, label, sublabel, style, ...rest }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        background: 'var(--surface-page)',
        border: `var(--stroke) solid ${colour}`,
        color: 'var(--text-primary)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'var(--font-mono)',
        fontSize: 'var(--fs-caption)',
        lineHeight: 'var(--lh-caption)',
        ...style,
      }}
      {...rest}
    >
      {label ? <span style={{ fontWeight: 700 }}>{label}</span> : null}
      {sublabel ? <span style={{ color: 'var(--text-secondary)' }}>{sublabel}</span> : null}
    </div>
  );
}
