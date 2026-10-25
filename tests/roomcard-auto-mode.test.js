"use strict";
// Regression tests for the RoomCard's embedded thermostat AUTO mode.
// Run with: node tests/roomcard-auto-mode.test.js
const fs = require("node:fs");
const path = require("node:path");
const assert = require("node:assert/strict");
const source = fs.readFileSync(path.join(__dirname, "..", "frankys-stuff-room-card.js"), "utf8");
const from = source.indexOf("  _roomAutoMode(control) {");
const to = source.indexOf("  async _toggleManual() {", from);
assert(from >= 0 && to > from, "Room climate mode methods must exist");
const Climate = Function(`return class ClimateStub {
  constructor(config, modes, state="off") {
    this._config = Object.assign({profile:"advanced", control_entity:"climate.test"}, config);
    this._modes = modes; this._current = state; this.calls = []; this._error = ""; this.renders = 0;
    this._manualArmed = true;
  }
  _profile() { return this._config.profile; }
  _state(id) { return {state:this._current, attributes:this._modes === undefined ? {} : {hvac_modes:this._modes}}; }
  _call(domain, action, data) { this.calls.push([domain, action, data]); return Promise.resolve(true); }
  _t(key) { return key === "noAutoMode" ? "AUTO NOT SUPPORTED" : key; }
  _render() { this.renders++; }
  ${source.slice(from, to)}
}`)();
const cases = [
  [{}, ["off", "auto", "heat"], "heat"],
  [{auto_hvac_mode:"auto"}, ["off", "auto", "heat"], "auto"],
  [{auto_hvac_mode:"auto"}, ["off", "heat"], "heat"],
  [{}, ["off", "auto"], "auto"],
  [{auto_hvac_mode:"auto"}, undefined, "auto"],
  [{}, undefined, "heat"],
  [{auto_hvac_mode:"unknown"}, ["off", "auto", "heat"], "heat"],
  [{}, ["off", "cool"], null],
  [{mode_entity:"input_select.heating"}, ["off", "auto", "heat"], "input_select"]
];
(async () => {
  let count = 0;
  for (const [config, modes, expected] of cases) {
    const card = new Climate(config, modes);
    await card._setMode("AUTO");
    const actual = card.calls.length
      ? (card.calls[0][0] === "input_select" ? "input_select" : card.calls[0][2].hvac_mode)
      : null;
    assert.equal(actual, expected);
    if (expected === null) {
      assert.equal(card._error, "AUTO NOT SUPPORTED");
      assert.equal(card.renders, 1);
    }
    count++;
  }
  for (const profile of ["advanced", "thermostat", "pool_heatpump"]) {
    const card = new Climate({profile}, ["off", "auto", "heat"]);
    await card._setMode("AUS");
    assert.equal(card.calls.length, 1);
    assert.equal(card.calls[0][1], "turn_off");
    count++;
  }
  for (const profile of ["advanced", "thermostat", "pool_heatpump"]) {
    const card = new Climate({profile}, ["off", "auto", "heat"]);
    await card._setMode("AUTO");
    assert.equal(card.calls[0][2].hvac_mode, "heat");
    count++;
  }
  const editorStart = source.indexOf("  _options(){var self=this");
  const editorEnd = source.indexOf("  _change(f,input)", editorStart);
  assert(editorStart >= 0 && editorEnd > editorStart, "RoomCard editor options must exist");
  const Editor = Function("attrs", "langOf", "document", `return class EditorStub {
    constructor(modes, selected="heat") {
      this._config = {climate_entity:"climate.test", auto_hvac_mode:selected, language:"de"};
      this._hass = {states:{"climate.test":{state:"off", attributes:{hvac_modes:modes}}}};
      this._control = {_signature:null, options:[], appendChild(o){this.options.push(o)},
        set textContent(v){this.options=[]}, value:""};
      this._controls = {auto_hvac_mode:{field:{kind:"select"},input:this._control}};
      this.shadowRoot = {activeElement:null};
    }
    // Do not add _state(): the real visual editor has no _state method.
    ${source.slice(editorStart, editorEnd)}
  }`)(
    x => x && x.attributes || {},
    x => x._config.language === "de" ? "de" : "en",
    {createElement: () => ({value:"", textContent:""})}
  );
  for (const [modes, selected, expected] of [
    [["off", "auto", "heat"], "heat", "heat,auto"],
    [["off", "auto"], "heat", "auto,heat"],
    [["off", "heat"], "auto", "heat,auto"],
    [["off", "heat"], "heat", "heat"],
    [undefined, "auto", "heat,auto"]
  ]) {
    const editor = new Editor(modes, selected);
    editor._options();
    assert.equal(editor._control.options.map(o => o.value).join(","), expected);
    count++;
  }
  // Entity choices must also load without HA state data or a selected climate entity.
  const absent = new Editor(undefined, "heat");
  absent._config.climate_entity = "climate.unknown";
  absent._options();
  assert.equal(absent._control.options.map(o => o.value).join(","), "heat,auto");
  absent._hass = null;
  absent._options();
  assert.equal(absent._control.options.map(o => o.value).join(","), "heat,auto");
  count += 2;
  console.log(count + " RoomCard AUTO-mode regression cases passed");
})().catch(error => { console.error(error); process.exitCode = 1; });
