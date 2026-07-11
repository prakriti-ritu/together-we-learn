# Practice games

Three lightweight, **pure CSS/JS** interactions (no animation library) so they stay fast on budget phones and 4G. All live in `components/games/`.

| Game | File | What it does |
| --- | --- | --- |
| Transformation Toggle | `TransformationToggle.tsx` | Signature hero element. A nervous Hindi/Hinglish thought morphs into a confident English sentence; a confidence meter fills from 20% → 100%. Demonstrates the "understand, don't translate" method. |
| Word Flip | `WordFlip.tsx` | Grid of cards; tap to flip (3D CSS `rotateY`) from a Hindi word to its English word + pronunciation. |
| Sentence Builder | `SentenceBuilder.tsx` | A Hindi sentence + scrambled English word chips; tap to build in order, then Check → success tick. Tap-based (works on touch). |

`PracticeSection.tsx` is the homepage band that tabs between Word Flip and Sentence Builder. The Transformation Toggle sits in the Hero.

## Content

- UI labels are localized under the `practice` namespace in `messages/en.json` / `hi.json`.
- The **word/sentence/thought data is intentionally in-code** (inside each component) so the interaction is instant with no fetch. To change the examples, edit the arrays at the top of each file. (This is the one bit of content not editable in Sanity — noted for the tutor in [CONTENT_EDITING.md](../CONTENT_EDITING.md).)

## Performance

All animation is CSS `transform`/`opacity` transitions (GPU-cheap). No GSAP/Framer/Lottie. `Math.random` shuffling runs only in the browser.
