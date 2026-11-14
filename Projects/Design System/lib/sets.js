/* The canonical set catalog. One entry per set, in the order the sheet settled them:
   Abstract REALM, Aspect STATE, Anchor TAG, Arrow KEY (Colour LINGO, lingo-seed.js).
   Adding a set to the system starts here: give it a key, a name, its word length, and
   whether it prints cards. Everything downstream (Colour FLOWER's ring pickers, Word
   CARD/DECK) reads the list from this one place rather than each hardcoding its own.
   field: which per-position word field a master's own POS-style array uses for this
   set (Colour FLOWER's static POS entries key by these letters: rl/s/tag/key). */
window.RS_SETS = [
  { key: 'r', name: 'Abstract REALM', wordLength: 4, carded: true, field: 'rl' },
  { key: 's', name: 'Aspect STATE', wordLength: 4, carded: true, field: 's' },
  { key: 't', name: 'Anchor TAG', wordLength: 3, carded: true, field: 'tag' },
  { key: 'k', name: 'Arrow KEY', wordLength: 2, carded: true, field: 'key' }
];
