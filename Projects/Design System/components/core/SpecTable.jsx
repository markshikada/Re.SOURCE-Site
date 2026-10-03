import React from 'react';

/* SpecTable. Value columns hug their content so the description column absorbs
   the rest. Width goes on the cells only, never on the header. */
export function SpecTable({ columns = [], rows = [], style, ...rest }) {
  const cell = {
    borderBottom: '1px solid var(--surface-border)',
    padding: 'var(--space-sm) var(--space-sm) var(--space-sm) 0',
    verticalAlign: 'middle',
    lineHeight: 'var(--lh-caption)',
  };
  return (
    <div style={{ overflowX: 'auto', ...style }} {...rest}>
      <table style={{ borderCollapse: 'collapse', width: '100%', fontSize: 'var(--fs-caption)' }}>
        <thead>
          <tr>
            {columns.map((c, i) => (
              <th key={i} style={{
                ...cell, textAlign: 'left', whiteSpace: 'nowrap', fontWeight: 400,
                fontFamily: 'var(--font-mono)', textTransform: 'uppercase',
                color: 'var(--text-secondary)',
              }}>{c.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, ri) => (
            <tr key={ri}>
              {columns.map((c, ci) => {
                const mono = c.kind === 'value';
                return (
                  <td key={ci} style={{
                    ...cell,
                    width: c.kind === 'text' ? 'auto' : '1%',
                    whiteSpace: c.kind === 'text' ? 'normal' : 'nowrap',
                    fontFamily: mono ? 'var(--font-mono)' : 'var(--font-sans)',
                    fontVariantNumeric: mono ? 'tabular-nums' : 'normal',
                    color: 'var(--text-primary)',
                  }}>{r[c.key]}</td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
