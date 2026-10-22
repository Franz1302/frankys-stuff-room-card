# Frankys_Stuff Room Card v0.3.1

Maintenance update to the standalone Home Assistant RoomCard.

## What's new
- Added optional `auto_hvac_mode` to the embedded climate controller for thermostats with device-side AUTO schedules (such as Homematic IP).
- Existing installations retain `heat` as the default. No migration is necessary.
- The visual editor offers supported `heat` and `auto` modes based on the climate entity's `hvac_modes` attribute.
- If the configured mode is unavailable, the RoomCard falls back to a supported alternative; if neither mode is supported, it avoids an invalid service call.
- Existing mode helpers and OFF/MANUAL scripts retain precedence.
- Restored a prominent Ko-fi support link at the top of the README.

## Compatibility
- No changes to lights, covers, weather, batteries, layouts or the separate Frankys_Stuff Climate Card.
- The `auto_hvac_mode` setting applies only when no separate `mode_entity` helper is configured.
- Device schedules may override manually selected target temperatures.

## Verification
- 20 simulated RoomCard regression cases and JavaScript syntax check were reported in PR #1.
- Live Homematic device testing and an iOS 12.5 UI check remain pending.

## Installation
Update Frankys_Stuff Room Card through HACS (custom Dashboard repository) or replace `frankys-stuff-room-card.js` manually, then refresh the dashboard.

☕ Support development: https://ko-fi.com/Frankys_Stuff
