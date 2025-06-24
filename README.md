# Mess UI

This project contains the source code for the UI of The Mess Project.

## Open questions and considerations

- I'm not sure the movement patterns should reside inside each peace. When piece interactions come up, they will probably be calculated dynamically in the board itself
- I'm not sure getDistancesFromBoundary should reside inside movement patterns
- There's probably a smarter, algoritmic way to detect the obstacles. The code looks too complex and "OO-powered" right now. But a bad model is better than no model at all
