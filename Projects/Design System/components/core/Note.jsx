import React from 'react';

/* Note. A caption-size aside marked by a 2px structural rule, not a coloured bar. */
export function Note({ label, children, style, ...rest }) {
  return (
    <p
      style={{
        borderLeft: '2px solid var(--g24)',
        padding: 'var(--space-sm) 0 var(--space-sm) var(--space-md)',
        margin: 'var(--space-md) 0 0',
        maxWidth: '62ch',
        fontSize: 'var(--fs-caption)',
        lineHeight: 'var(--lh-caption)',
        color: 'var(--text-primary)',
        ...style,
      }}
      {...rest}
    >
      {label ? <strong style={{ fontWeight: 600 }}>{label}</strong> : null}
      {label ? ' ' : null}
      {children}
    </p>
  );
}
