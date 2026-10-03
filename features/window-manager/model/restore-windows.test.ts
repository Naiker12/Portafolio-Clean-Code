import { strict as assert } from "node:assert";
import { test } from "node:test";
import { restoreWindows } from "./restore-windows.ts";
const bounds = { width: 390, height: 844 };
test("restoration rejects unknown apps, invalid geometry and duplicates", () => {
  const state = restoreWindows({ windows: [
    { id: "about", position: { x: 9999, y: -42 }, maximized: true },
    { id: "about", position: { x: 10, y: 50 } },
    { id: "unknown", position: { x: 1, y: 1 } },
    { id: "cv", position: { x: "bad", y: 50 } },
  ], focused: "unknown" }, ["about", "cv"], bounds);
  assert.equal(state.windows.length, 1);
  assert.equal(state.focused, "about");
  assert.equal(state.windows[0].position.y, 43);
  assert.equal(state.windows[0].maximized, true);
});
test("restoration handles damaged records and minimized focus", () => {
  assert.deepEqual(restoreWindows(null, ["cv"], bounds), { windows: [], focused: null });
  const state = restoreWindows({ windows: [{ id: "cv", position: { x: 20, y: 50 }, minimized: true }], focused: "cv" }, ["cv"], bounds);
  assert.equal(state.focused, null);
  assert.equal(state.windows[0].minimized, true);
});
