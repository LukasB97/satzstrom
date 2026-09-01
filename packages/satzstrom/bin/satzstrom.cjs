#!/usr/bin/env node
/* global console, process, require */
/* eslint-disable @typescript-eslint/no-require-imports */
const { spawnSync } = require("node:child_process");
const { dirname, join } = require("node:path");

const targets = {
  "win32-x64": ["@satzstrom/win32-x64", "satzstrom.exe"],
  "linux-x64": ["@satzstrom/linux-x64", "satzstrom"],
};

const key = `${process.platform}-${process.arch}`;
const target = targets[key];
if (!target) {
  console.error(`Satzstrom unterstützt diese Plattform noch nicht: ${key}`);
  process.exit(1);
}

let executable;
try {
  executable = join(dirname(require.resolve(`${target[0]}/package.json`)), "bin", target[1]);
} catch {
  console.error(
    `Die Satzstrom-Binary für ${key} fehlt. Installiere Satzstrom erneut:\n\nnpm uninstall -g satzstrom\nnpm install -g satzstrom`,
  );
  process.exit(1);
}

const result = spawnSync(executable, process.argv.slice(2), {
  stdio: "inherit",
});
if (result.error) {
  console.error(`Satzstrom konnte nicht gestartet werden: ${result.error.message}`);
  process.exit(1);
}
process.exit(result.status ?? 1);
