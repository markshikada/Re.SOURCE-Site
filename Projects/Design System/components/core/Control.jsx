import React from 'react';

/* Control. The system's only button, lifted from Colour FLOWER, 19 August
   2026, which is where it was first defined. Page-black fill, one 1px g24
   border, radius-sm, mono caption uppercase, 44px minimum in both directions
   because input is touch first.

   Three states and nothing else. Off is g48 text on a g24 border, on is white
   text on the same border, and active, meaning the option currently in force,
   lifts the border to g66. Unavailable holds its state and drops to 0.4
   opacity rather than changing colour. Colour never enters a control: a
   position colour is a stroke on a diagram shape, not a UI accent.

   Retired: the claim that Re.SOURCE has never defined a button. The Flower
   defines one, so it is recorded here rather than reinvented per build. */

export function Control({
  on = true, active = false, disabled = false, square = false,
  row = false, meta, as: Tag = 'button', style, children, ...rest
}) {
  const shared = {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--space-sm)',
    minHeight: 44,
    font: `400 var(--fs-caption)/var(--lh-caption) var(--font-mono)`,
    textTransform: 'uppercase',
    color: on || active ? 'var(--text-primary)' : 'var(--g48)',
    borderRadius: 'var(--radius-sm)',
    opacity: disabled ? 0.4 : 1,
    cursor: disabled ? 'default' : 'pointer',
    touchAction: 'manipulation',
    transition: 'color var(--dur) var(--ease), border-color var(--dur) var(--ease), background var(--dur) var(--ease)',
  };
  const box = row
    ? {
        ...shared,
        justifyContent: 'space-between',
        width: '100%',
        padding: '0 var(--space-md)',
        background: 'transparent',
        border: 0,
        textAlign: 'left',
      }
    : {
        ...shared,
        justifyContent: 'center',
        height: 44,
        minWidth: 44,
        width: square ? 44 : undefined,
        padding: square ? 0 : '0 var(--space-md)',
        background: 'var(--surface-page)',
        border: `1px solid ${active ? 'var(--g66)' : 'var(--surface-border)'}`,
      };
  return (
    <Tag type={Tag === 'button' ? 'button' : undefined} disabled={Tag === 'button' ? disabled : undefined} style={{ ...box, ...style }} {...rest}>
      <span>{children}</span>
      {row && meta ? <span style={{ color: 'var(--g48)' }}>{meta}</span> : null}
    </Tag>
  );
}
