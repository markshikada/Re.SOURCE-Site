import React from 'react';

/* Pill. Black fill, position colour on the stroke, white label.
   Width is the set's longest word x 18px, so width to height is characters to 2. */
export function Pill({ colour = 'var(--cl-12-life)', chars = 4, children, style, ...rest }) {
  return (
    <span
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: `calc(${chars} * var(--pill-char))`,
        height: 'var(--pill-height)',
        borderRadius: 'var(--pill-radius)',
        background: 'var(--surface-page)',
        border: `var(--stroke) solid ${colour}`,
        color: 'var(--text-primary)',
        fontFamily: 'var(--font-sans)',
        fontWeight: 700,
        fontSize: 'var(--fs-caption)',
        lineHeight: 'var(--lh-caption)',
        textTransform: 'uppercase',
        ...style,
      }}
      {...rest}
    >
      {children}
    </span>
  );
}
