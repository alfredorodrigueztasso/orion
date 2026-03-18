/**
 * Registry — Fetch component data from HTTP API or local files
 */

import * as fs from "node:fs";
import * as path from "node:path";
import * as https from "node:https";
import * as http from "node:http";
import type { RegistryIndex, RegistryItem } from "../types.js";

function fetchUrl(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const client = url.startsWith("https") ? https : http;
    client
      .get(url, (res) => {
        if (
          res.statusCode &&
          res.statusCode >= 300 &&
          res.statusCode < 400 &&
          res.headers.location
        ) {
          fetchUrl(res.headers.location).then(resolve, reject);
          return;
        }
        if (res.statusCode && res.statusCode >= 400) {
          reject(new Error(`HTTP ${res.statusCode} for ${url}`));
          return;
        }
        let data = "";
        res.on("data", (chunk) => {
          data += chunk;
        });
        res.on("end", () => resolve(data));
        res.on("error", reject);
      })
      .on("error", reject);
  });
}

export async function fetchIndex(registryUrl: string): Promise<RegistryIndex> {
  const url = `${registryUrl}/index.json`;
  const data = await fetchUrl(url);
  return JSON.parse(data) as RegistryIndex;
}

export async function fetchComponent(
  registryUrl: string,
  name: string,
): Promise<RegistryItem> {
  const url = `${registryUrl}/${name}.json`;
  const data = await fetchUrl(url);
  return JSON.parse(data) as RegistryItem;
}

export function fetchIndexLocal(cwd: string): RegistryIndex {
  const indexPath = path.join(cwd, "public", "r", "index.json");
  if (!fs.existsSync(indexPath)) {
    throw new Error(`Local registry not found at ${indexPath}`);
  }
  const data = fs.readFileSync(indexPath, "utf-8");
  return JSON.parse(data) as RegistryIndex;
}

export function fetchComponentLocal(cwd: string, name: string): RegistryItem {
  const filePath = path.join(cwd, "public", "r", `${name}.json`);
  if (!fs.existsSync(filePath)) {
    throw new Error(
      `Component "${name}" not found in local registry at ${filePath}`,
    );
  }
  const data = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(data) as RegistryItem;
}
