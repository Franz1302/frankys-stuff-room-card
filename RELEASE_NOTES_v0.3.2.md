# Frankys_Stuff Room Card v0.3.2

### Bugfix
- Fixed the Home Assistant visual-editor error **`self._state is not a function`** when adding or editing the Room Card.
- Corrected how the editor looks up supported climate AUTO modes from Home Assistant states.
- Works when no climate entity is configured yet or the entity is temporarily unavailable.

### Compatibility
- **No YAML migration required.**
- Existing lighting, shutters, weather, thermostat and visual design remain unchanged.
- The separate Frankys_Stuff Climate Card is not affected.

### Installation
Update **Frankys_Stuff Room Card** in HACS to v0.3.2, then reload the browser once.
