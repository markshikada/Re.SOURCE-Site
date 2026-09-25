import React from 'react';
import { POSITIONS } from './positions.js';

/* ColourWheel. Twelve positions at 30 degree steps, placed by rotation so no
   decimal coordinate is ever authored. Position 12 sits at 0 degrees, at the
   top, and the count runs clockwise. Core is a void and carries no colour.
   The positions themselves come from positions.js, which is the only place
   an index, an angle or a hex is written down. */

export function ColourWheel({ unit = 24, showAngles = true, onSelect, selected, style, ...rest }) {
  const radius = unit * 6;
  const node = unit * 3;
  const box = radius * 2 + node;
  return (
    <div
      style={{ position: 'relative', width: box, height: box, margin: '0 auto', ...style }}
      {...rest}
    >
      <div style={{
        position: 'absolute', inset: node / 2, borderRadius: '50%',
        border: '1px solid var(--surface-border)',
      }} />
      {POSITIONS.map((p) => {
        const active = selected === p.i;
        return (
          <button
            key={p.i}
            onClick={onSelect ? () => onSelect(p) : undefined}
            aria-label={`Position ${p.i}, ${p.a} degrees`}
            style={{
              position: 'absolute', left: '50%', top: '50%', width: node, height: node,
              margin: `${-node / 2}px 0 0 ${-node / 2}px`,
              transform: `rotate(${p.a}deg) translateY(${-radius}px) rotate(${-p.a}deg)`,
              borderRadius: '50%',
              background: active ? 'var(--surface-raised)' : 'var(--surface-page)',
              border: `var(--stroke) solid ${p.c}`,
              color: 'var(--text-primary)',
              font: `700 var(--fs-caption)/var(--lh-caption) var(--font-mono)`,
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              cursor: onSelect ? 'pointer' : 'default', padding: 0,
              transition: 'background var(--dur) var(--ease)',
            }}
          >
            <span>{p.i}</span>
            {showAngles ? <span style={{ color: 'var(--text-secondary)', fontWeight: 400 }}>{p.a}°</span> : null}
          </button>
        );
      })}
      <div style={{
        position: 'absolute', left: '50%', top: '50%', width: node, height: node,
        margin: `${-node / 2}px 0 0 ${-node / 2}px`, borderRadius: '50%',
        background: 'var(--surface-page)', border: '1px dashed var(--surface-border)',
        color: 'var(--text-secondary)',
        font: `400 var(--fs-caption)/var(--lh-caption) var(--font-mono)`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>00</div>
    </div>
  );
}
