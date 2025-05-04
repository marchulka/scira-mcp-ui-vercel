import fs from "fs";
import path from "path";
import os from "os";
import { execSync } from "child_process";

export default async function run() {
  const snapshotDir = path.join(process.cwd(), "snapshot");
  if (!fs.existsSync(snapshotDir)) {
    fs.mkdirSync(snapshotDir);
  }

  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  const snapshotMeta = {
    timestamp,
    system: os.platform(),
    arch: os.arch(),
    node: process.version,
  };

  const envFiles = [".env", ".env.local", ".env.production"];
  const copied = [];

  for (const file of envFiles) {
    const fullPath = path.join(process.cwd(), file);
    if (fs.existsSync(fullPath)) {
      const dest = path.join(snapshotDir, `${file}.${timestamp}`);
      fs.copyFileSync(fullPath, dest);
      copied.push(file);
    }
  }

  try {
    const gitStatus = execSync("git status", { encoding: "utf-8" });
    const gitLog = execSync("git log -1", { encoding: "utf-8" });
    fs.writeFileSync(
      path.join(snapshotDir, `git-info-${timestamp}.txt`),
      `=== GIT STATUS ===\\n${gitStatus}\\n\\n=== GIT LOG ===\\n${gitLog}`
    );
  } catch (err) {
    fs.writeFileSync(
      path.join(snapshotDir, `git-error-${timestamp}.txt`),
      "Git status/log not available."
    );
  }

  fs.writeFileSync(
    path.join(snapshotDir, `snapshot-meta-${timestamp}.json`),
    JSON.stringify({ ...snapshotMeta, copied }, null, 2)
  );

  return {
    status: "snapshot_complete",
    copied,
    timestamp,
  };
}
