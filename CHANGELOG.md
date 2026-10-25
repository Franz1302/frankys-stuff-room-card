# Changelog

## v0.3.2 — 2026-10-25

- Fixed `self._state is not a function` when editing the Room Card in Home Assistant's visual editor.
- The editor now reads the selected climate entity directly from `hass.states`; this also handles missing entities while configuring a new card.
- Strengthened the regression tests to reproduce this error without accidentally defining the missing editor method.
- No changes to card controls, thermostat regulation, covers, light controls, or design.


## 0.3.0 — 2026-10-14

### Added
- Integrated climate controller directly into the Room Card.
- Recorder-backed 24-hour temperature history.
- Heating schedule editor with automatic schedule discovery and creation.
- Optional heating-status `binary_sensor`.
- Integrated 7-day weather forecast.
- Tap/click switching between daily weather values and 7-day forecast.
- Collapsible **Experteneinstellungen** section in the visual editor.
- Eight embedded Weather Card WebP backgrounds.
- Embedded shutter/window background.

### Changed
- Public card type: `custom:frankys-stuff-room-card`.
- Public branding: **Frankys_Stuff Room Card**.
- Normal setup kept intentionally simple; helper/script/model overrides moved to advanced settings.
- Release build is self-contained at runtime.

### Removed
- Runtime dependency on a separately installed Climate Card.
- Runtime dependency on a separately installed Weather Card.
- Runtime dependency on Enhanced Shutter Card installation.
- Runtime dependency on `/local/jarvis_weather/` and Enhanced Shutter image paths.

### Tested
- Separate release resource and release-test view loaded successfully.
- Light, cover, display, weather and climate UI tested.
- 7-day weather switching tested.
- Rollo background verified in the open state.
- Weather background images verified after embedding.
- Function test approved on 2026-10-14.

### Compatibility
The public card uses its own custom-element name and does not replace existing private `custom:jarvis-room-card` dashboards.
