# Quick install

Copy:

`frankys-stuff-room-card.js`

to:

`/config/www/frankys-stuff/room-card/frankys-stuff-room-card.js`

Register this dashboard resource:

`/local/frankys-stuff/room-card/frankys-stuff-room-card.js?v=0.3.1`

Resource type:

`module`

Minimal card:

```yaml
type: custom:frankys-stuff-room-card
name: Raum
climate_entity: climate.raum
```

Use the visual editor for normal setup. Open **Experteneinstellungen** only for separate helpers, scripts, schedule overrides, heating-status sensors or weather model options.
