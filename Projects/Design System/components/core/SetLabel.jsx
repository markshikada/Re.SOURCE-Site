import React from 'react';

/* SetLabel. The label a diagram's set carries, lifted from Colour FLOWER.
   It sits outside the geometry and is tied to its ring by a hairline leader,
   never laid inside a word band.

   Page-black fill so the rings do not read through it, one 1px border with the
   top edge removed where the leader meets it, and the bottom two corners
   rounded at radius-sm. Mono caption uppercase, 28px tall, 2px by 8px padding:
   smaller than a Control on purpose, since it labels rather than invites. When
   its set is in view the border lifts from g24 to g66. */

export function SetLabel({ on = false, leader = 'top', length = 22, style, children, ...rest }) {
  const vertical = leader === 'top' || leader === 'bottom';
  const line = (
    <span
      style={{
        background: 'var(--g48)',
        flex: '0 0 auto',
        width: vertical ? 1 : length,
        height: vertical ? length : 1,
      }}
    />
  );
  const edge = `1px solid ${on ? 'var(--g66)' : 'var(--surface-border)'}`;
  const sm = 'var(--radius-sm)';
  const radius = {
    top: `0 0 ${sm} ${sm}`,
    bottom: `${sm} ${sm} 0 0`,
    left: `0 ${sm} ${sm} 0`,
    right: `${sm} 0 0 ${sm}`,
  }[leader];
  const box = (
    <span
      style={{
        display: 'flex',
        alignItems: 'center',
        minHeight: 28,
        padding: '2px 8px',
        background: 'var(--surface-page)',
        borderTop: leader === 'top' ? 0 : edge,
        borderBottom: leader === 'bottom' ? 0 : edge,
        borderLeft: leader === 'left' ? 0 : edge,
        borderRight: leader === 'right' ? 0 : edge,
        borderRadius: radius,
        whiteSpace: 'nowrap',
        font: `400 var(--fs-caption)/var(--lh-caption) var(--font-mono)`,
        textTransform: 'uppercase',
        color: 'var(--text-primary)',
        transition: 'border-color var(--dur) var(--ease)',
      }}
    >
      {children}
    </span>
  );
  return (
    <span
      style={{
        display: 'inline-flex',
        flexDirection: vertical ? 'column' : 'row',
        alignItems: 'center',
        gap: 6,
        ...style,
      }}
      {...rest}
    >
      {leader === 'bottom' || leader === 'right' ? <>{box}{line}</> : <>{line}{box}</>}
    </span>
  );
}
