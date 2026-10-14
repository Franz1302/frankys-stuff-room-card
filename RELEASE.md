# Release verification — v0.3.0

Date: 2026-10-14

## Status

**Function test passed. Release candidate approved for publication.**

## Verified in Home Assistant

- Public card type: `custom:frankys-stuff-room-card`
- Separate release resource loaded in parallel with the private RoomCard
- Light controls
- Cover controls and popup
- Rollo/window background including fully open position
- Display battery / charging information
- Current weather view
- Embedded weather backgrounds
- 7-day weather forecast and view switching
- Integrated climate UI
- Expert settings editor
- No replacement of the active private `custom:jarvis-room-card`

## Packaging

Required repository/release files:
- `frankys-stuff-room-card.js`
- `README.md`
- `INSTALL.md`
- `CHANGELOG.md`
- `hacs.json`
- `LICENSE`
- `THIRD_PARTY_NOTICES.md`
- `LICENSES/GPL-3.0.txt`

The release JavaScript intentionally contains embedded image data and is therefore several megabytes in size.
