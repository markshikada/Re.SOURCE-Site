// Single source for the Aspect States 13-card sequence: the six words, the
// four named subsets, and the three polar pairs. Introduction.dc.html renders
// all 13 from this list; Master.dc.html's specimen picker looks entries up
// by id. Edit copy here once and both pages update.
//
// type is the only axis a card sorts on: Core, Single, Pair, Triad, Base,
// Blend, Set or Shape. Core, Set and Shape have no entries of their own in
// this file. Pair, Triad, Base and Blend are Multi, collectively.
// Every entry here belongs to one Set. Cards name it on the frame line at
// their foot, so it costs the reading no height.
window.ASPECT_SET = { conceptName: 'Aspect', setName: 'State' };

// The words at each position, Base at 0°, 60°, 120°, 180°, 240°, 300° and
// Blend at 30°, 90°, 150°, 210°, 270°, 330°. Passed into aspect-render so a
// card that holds several positions can show them: a Triad as a mono sub
// line, Base, Blend and a Set as the six-column grid. Kept here rather than
// in the render helper because these assignments still move.
window.ASPECT_WORDS = {
  base: ['BODY', 'HIGH', 'SOUL', 'WILL', 'MIND', 'SELF'],
  blend: ['MOOD', 'TRUE', 'NEED', 'WANT', 'VIEW', 'MODE']
};

window.ASPECT_STATES = [
  { id: 'word-self', type: 'Single', picks: [5], titles: ['SELF'],
    gloss: 'The individual boundary separates the observer from the whole.',
    reading: 'An internal anchor that defines personal territory. It is the conscious witness of experience, maintaining a distinct perspective.',
    question: 'How much space are you claiming for yourself here?', lastLabel: 'Polar', last: 'SOUL' },
  { id: 'word-will', type: 'Single', picks: [3], titles: ['WILL'],
    gloss: 'The focused engine drives deliberate intent forward.',
    reading: 'An internal command that refuses to yield. It marshals available energy to break through obstacles, imposing its own order on the world.',
    question: 'What are you determined to bring about?', lastLabel: 'Polar', last: 'BODY' },
  { id: 'word-high', type: 'Single', picks: [1], titles: ['HIGH'],
    gloss: 'Peak intensity elevates perspective above the baseline.',
    reading: 'An amplification of state that brings clarity or intoxication. It marks the maximum threshold, a vivid contrast to the ordinary routine.',
    question: 'Where is the current surge of energy taking you?', lastLabel: 'Polar', last: 'MIND' },
  { id: 'word-mind', type: 'Single', picks: [4], titles: ['MIND'],
    gloss: 'The internal processor analyzes and structures information.',
    reading: 'The active space of logic, strategy, and calculation. It translates raw data into concepts, seeking to comprehend and control the environment.',
    question: 'What calculation is running through your thoughts?', lastLabel: 'Polar', last: 'HIGH' },
  { id: 'word-body', type: 'Single', picks: [0], titles: ['BODY'],
    gloss: 'The physical vessel anchors experience in concrete reality.',
    reading: 'The tangible weight of existence demands attention. It acts as the primary interface, registering every impact with literal presence.',
    question: 'What sensation is the physical self holding right now?', lastLabel: 'Polar', last: 'WILL' },
  { id: 'word-soul', type: 'Single', picks: [2], titles: ['SOUL'],
    gloss: 'The essential spark defines individual character.',
    reading: 'An internal depth that resists external formatting. It holds the unique resonance of identity, independent of social utility or role.',
    question: 'What speaks to your innermost nature in this choice?', lastLabel: 'Polar', last: 'SELF' },

  { id: 'set-prime', type: 'Triad', picks: [5, 3, 1], titles: ['PRIME'],
    gloss: 'One triad of Base, four steps apart.',
    reading: 'Being seen, getting something done, and standing far enough out to judge it. None of the three answers another directly, so the set holds without argument.',
    question: 'Which of the three are you leaning on today?', lastLabel: 'COUNTER', last: 'PART' },
  { id: 'set-part', type: 'Triad', picks: [4, 0, 2], titles: ['PART'],
    gloss: 'The triad PRIME leaves, four steps apart.',
    reading: 'Turning a question over before deciding, the plain fact of the body, and what refuses to perform. Together they hold what image and effort do not reach.',
    question: 'Which of the three is doing the most work?', lastLabel: 'COUNTER', last: 'PRIME' },
  { id: 'set-base', type: 'Base', picks: [0, 1, 2, 3, 4, 5], titles: ['BASE'],
    gloss: 'Prime and Part together, six words most days fit inside.',
    reading: 'An image, an effort, a distance, a thought, a fact and a private ground. Most of what happens in a day sits somewhere across these six before anything more specific gets said about it.',
    question: 'Which two feel furthest apart to you?', lastLabel: 'COUNTER', last: 'BLEND' },
  { id: 'set-blend', type: 'Blend', blendPicks: [0, 1, 2, 3, 4, 5], titles: ['BLEND'],
    gloss: 'The six words Base leaves unnamed, each its own position.',
    reading: 'A Blend position sits where two Base words meet, but isn\u2019t the two of them mixed together. It shows up only once you\u2019re already between two of the six you already have names for.',
    question: 'Which of the six is hardest to name?', lastLabel: 'COUNTER', last: 'BASE' },

  { id: 'pair-body-will', type: 'Pair', picks: [0, 3], titles: ['BODY', 'WILL'],
    gloss: 'Doing runs the show, meaning to catches up after.',
    reading: 'The plain fact of what\u2019s happening physically is running the show. Effort and intention are still there, just behind it, waiting to catch up.',
    question: 'What is your body doing without your say?', lastLabel: 'Polar', last: 'WILL \u2022 BODY', counterId: 'pair-will-body' },
  { id: 'pair-will-body', type: 'Pair', picks: [3, 0], titles: ['WILL', 'BODY'],
    gloss: 'Meaning to runs the show, doing catches up after.',
    reading: 'The effort behind an intention is running the show. What\u2019s happening physically is still there, just behind it, waiting to catch up.',
    question: 'What are you willing your body hasn\u2019t met?', lastLabel: 'Polar', last: 'BODY \u2022 WILL', counterId: 'pair-body-will' },
  { id: 'pair-mind-high', type: 'Pair', picks: [4, 1], titles: ['MIND', 'HIGH'],
    gloss: 'Reasoning runs first, letting go waits its turn.',
    reading: 'Working the question over from every side comes first. The view that doesn\u2019t argue with itself is what\u2019s left for afterward, if it\u2019s needed at all.',
    question: 'What could you just let go of?', lastLabel: 'Polar', last: 'HIGH \u2022 MIND', counterId: 'pair-high-mind' },
  { id: 'pair-high-mind', type: 'Pair', picks: [1, 4], titles: ['HIGH', 'MIND'],
    gloss: 'Letting go runs first, reasoning waits its turn.',
    reading: 'The view from outside your own stake in it comes first. The arguing and re-arguing is what\u2019s left for afterward, if it happens at all.',
    question: 'What have you let go of too fast?', lastLabel: 'Polar', last: 'MIND \u2022 HIGH', counterId: 'pair-mind-high' },
  { id: 'pair-self-soul', type: 'Pair', picks: [5, 2], titles: ['SELF', 'SOUL'],
    gloss: 'Image runs the show, what\u2019s underneath waits behind it.',
    reading: 'How you come across is running the show. What you actually care about is still there, just behind it, not yet asked.',
    question: 'What are you presenting right now?', lastLabel: 'Polar', last: 'SOUL \u2022 SELF', counterId: 'pair-soul-self' },
  { id: 'pair-soul-self', type: 'Pair', picks: [2, 5], titles: ['SOUL', 'SELF'],
    gloss: 'What\u2019s underneath runs the show, image waits behind it.',
    reading: 'What you actually care about is running the show. How you come across is still there, just behind it, not doing the deciding.',
    question: 'What haven\u2019t you let show yet?', lastLabel: 'Polar', last: 'SELF \u2022 SOUL', counterId: 'pair-self-soul' }
];
