import React from 'react';
import { Pill } from './Pill.jsx';

/* PillSet. Twelve positions arranged so polar pairs stay together.
   Two columns flowing down puts each pair in a row on a phone;
   six columns flowing across puts each pair in a column on a wide canvas.
   One DOM order serves both, because the list is sorted by angle.

   The run leads with P12 at 0 degrees and follows the clock from there, so a
   six-column grid stacks P12 over P06 and every other pair falls in line under
   it. Every twelve-item run in the system starts at the same place. */
export function PillSet({ items = [], chars = 4, columns = 6, style, ...rest }) {
  return (
    <div
      style={{
        display: 'grid',
        gap: 'var(--space-sm)',
        justifyContent: 'center',
        gridTemplateColumns: `repeat(${columns}, calc(${chars} * var(--pill-char)))`,
        gridAutoFlow: 'row',
        ...style,
      }}
      {...rest}
    >
      {items.map((it, i) => (
        <Pill key={i} colour={it.colour} chars={chars}>{it.label}</Pill>
      ))}
    </div>
  );
}
