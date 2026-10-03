import { strict as assert } from "node:assert";
import { test } from "node:test";
import { clampPosition, initialWindows, windowReducer } from "./windows.ts";

const bounds = { width: 1440, height: 900 };
test("custom dimensions stay within bounds and survive maximize and restore", () => {
  let state = windowReducer(initialWindows, {type:"open",id:"about",bounds});
  state=windowReducer(state,{type:"geometry",id:"about",position:{x:200,y:100},size:{width:500,height:400},bounds});
  assert.deepEqual(state.windows[0].size,{width:500,height:400});
  state=windowReducer(state,{type:"maximize",id:"about"});
  state=windowReducer(state,{type:"maximize",id:"about"});
  assert.deepEqual(state.windows[0].size,{width:500,height:400});
  state=windowReducer(state,{type:"geometry",id:"about",position:{x:-500,y:9000},size:{width:9000,height:9000},bounds});
  assert.deepEqual(state.windows[0].size,{width:1426,height:752});
  assert.deepEqual(state.windows[0].position,{x:7,y:43});
  state=windowReducer(state,{type:"geometry",id:"about",position:{x:7,y:43},size:{width:1,height:1},bounds});
  assert.deepEqual(state.windows[0].size,{width:360,height:260});
});
test("split placement keeps both apps and restores the original floating position", () => {
  let state = windowReducer(initialWindows, { type: "open", id: "about", bounds });
  const original = state.windows[0].position;
  state = windowReducer(state, { type: "open", id: "cv", bounds });
  state = windowReducer(state, { type: "snap", id: "about", side: "left" });
  state = windowReducer(state, { type: "snap", id: "cv", side: "right" });
  assert.deepEqual(state.windows.map(window => window.snap), ["left", "right"]);
  state = windowReducer(state, { type: "snap", id: "about", side: undefined });
  assert.deepEqual(state.windows.at(-1)?.position, original);
  assert.equal(state.windows.at(-1)?.snap, undefined);
  state = windowReducer(state, { type: "maximize", id: "cv" });
  assert.equal(state.windows.at(-1)?.snap, undefined);
  assert.equal(state.windows.at(-1)?.maximized, true);
});
test("project applications keep independent windows and restore without duplicates", () => {
  let state = windowReducer(initialWindows, { type: "open", id: "project:dragonball-api", bounds });
  state = windowReducer(state, { type: "open", id: "project:portal-datos-abiertos", bounds });
  state = windowReducer(state, { type: "minimize", id: "project:dragonball-api" });
  assert.equal(state.focused, "project:portal-datos-abiertos");
  state = windowReducer(state, { type: "open", id: "project:dragonball-api", bounds });
  assert.equal(state.windows.length, 2);
  assert.equal(state.focused, "project:dragonball-api");
  assert.equal(state.windows.at(-1)?.minimized, false);
});
test("open preserves other windows, restores without duplicates and orders focus", () => {
  let state = windowReducer(initialWindows, { type: "open", id: "about", bounds });
  state = windowReducer(state, { type: "open", id: "cv", bounds });
  state = windowReducer(state, { type: "minimize", id: "about" });
  state = windowReducer(state, { type: "open", id: "about", bounds });
  assert.equal(state.windows.length, 2);
  assert.equal(state.focused, "about");
  assert.equal(state.windows.at(-1)?.minimized, false);
});
test("closing and minimizing transfer focus to the next visible window", () => {
  let state = windowReducer(initialWindows, { type: "open", id: "projects", bounds });
  state = windowReducer(state, { type: "open", id: "cv", bounds });
  state = windowReducer(state, { type: "minimize", id: "cv" });
  assert.equal(state.focused, "projects");
  state = windowReducer(state, { type: "close", id: "projects" });
  assert.equal(state.focused, null);
  assert.equal(state.windows[0].id, "cv");
});
test("maximize retains position, prevents dragging and restores geometry", () => {
  let state = windowReducer(initialWindows, { type: "open", id: "about", bounds });
  const original = state.windows[0].position;
  state = windowReducer(state, { type: "maximize", id: "about" });
  state = windowReducer(state, { type: "move", id: "about", position: { x: 9999, y: 9999 }, bounds });
  assert.deepEqual(state.windows[0].position, original);
  state = windowReducer(state, { type: "maximize", id: "about" });
  assert.equal(state.windows[0].maximized, false);
  assert.deepEqual(state.windows[0].position, original);
});
test("drag and viewport resize keep windows within the usable desktop", () => {
  assert.deepEqual(clampPosition({ x: -100, y: -100 }, bounds), { x: 7, y: 43 });
  assert.deepEqual(clampPosition({ x: 9999, y: 9999 }, bounds), { x: 533, y: 175 });
  let state = windowReducer(initialWindows, { type: "open", id: "about", bounds });
  state = windowReducer(state, { type: "resize", bounds: { width: 390, height: 844 } });
  assert.ok(state.windows[0].position.x <= 43);
  assert.equal(windowReducer(state, { type: "close", id: "cv" }), state);
});
