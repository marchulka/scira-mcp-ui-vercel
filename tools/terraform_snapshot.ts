import fs from "fs";
import path from "path";
import os from "os";
import { execSync } from "child_process";

export default async function run() {
  const snapshotDir = path.join(process.cwd(), "snapshot");
  if (!fs.existsSync(snapshotDir)) {
    fs.mkdirSync(snapshotDir);
  }

  const timestamp = new Date().toISOString().replace(/[:]/g, "-");

  const snapshotData = {
    timestamp,
    system: {
      os: os.platform(),
      arch: os.arch(),
      node: process.version,
    },
  };

  const files = [".env", ".env.local", ".env.production"];
  const copied: string[] = [];

  for (const file of files) {
    const fullPath = path.join(process.cwd(), file);
    if (fs.existsSync(fullPath)) {
      const dest = path.join(snapshotDir, `${file}.${timestamp}`);
      fs.copyFileSync(fullPath, dest);
      copied.push(file);
    }
  }

  try {
    const gitstatus = execSync("git status", { encoding: "utf-8" });
    const gitlog = execSync("git log -n 3", { encoding: "utf-8" });

    fs.writeFileSync(path.join(snapshotDir, `git-status-${timestamp}.txt`), gitstatus);
    fs.writeFileSync(path.join(snapshotDir, `git-log-${timestamp}.txt`), gitlog);
  } catch (e) {
    fs.writeFileSync(path.join(snapshotDir, `git-error-${timestamp}.txt`), "git status/log not available.");
  }

  fs.writeFileSync(
    path.join(snapshotDir, `snapshot-meta-${timestamp}.json`),
    JSON.stringify({ ...snapshotData, copied }, null, 2)
  );

  return {
    status: "snapshot_complete",
    timestamp,
    copied,
  };
}
