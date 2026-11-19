/**
 * One-time Spotify authorization for the footer and /about listening data. Run `npm run spotify-auth`,
 * paste the client secret when asked, approve in the browser, and it writes SPOTIFY_CLIENT_ID,
 * SPOTIFY_CLIENT_SECRET and SPOTIFY_REFRESH_TOKEN into .env.local and Vercel production. Rerun when the refresh token's
 * 180-day lifetime runs out. Nothing secret is printed.
 */
import { execFile, spawnSync } from "node:child_process";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { createServer } from "node:http";
import { createInterface } from "node:readline";

const CLIENT_ID = "eeb46eef94c140a19ed685311cf01e53";
const REDIRECT_URI = "http://127.0.0.1:8888/callback";
const SCOPES =
  "user-read-currently-playing user-read-recently-played user-top-read user-read-playback-state user-library-read";
const ENV_FILE = ".env.local";

/** Reads one line from the terminal without echoing it. */
const askHidden = (question) =>
  new Promise((resolve) => {
    const rl = createInterface({ input: process.stdin, output: process.stdout, terminal: true });
    rl._writeToOutput = () => {};
    process.stdout.write(question);
    rl.question("", (answer) => {
      rl.close();
      process.stdout.write("\n");
      resolve(answer.trim());
    });
  });

/** Opens the consent page and resolves with the code Spotify sends back to the local callback. */
const waitForCode = () =>
  new Promise((resolve, reject) => {
    const server = createServer((req, res) => {
      const url = new URL(req.url, REDIRECT_URI);
      if (url.pathname !== "/callback") return res.end();
      res.end("spotify connected. you can close this tab.");
      server.close();
      const code = url.searchParams.get("code");
      code ? resolve(code) : reject(new Error(url.searchParams.get("error") ?? "no code"));
    });
    server.listen(8888, "127.0.0.1", () => {
      const auth = new URL("https://accounts.spotify.com/authorize");
      auth.search = new URLSearchParams({
        client_id: CLIENT_ID,
        response_type: "code",
        redirect_uri: REDIRECT_URI,
        scope: SCOPES,
      }).toString();
      console.log("approve in the browser that just opened");
      execFile("open", [auth.toString()]);
    });
  });

const exchange = async (secret, code) => {
  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(`${CLIENT_ID}:${secret}`).toString("base64")}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code,
      redirect_uri: REDIRECT_URI,
    }),
  });
  if (!response.ok) throw new Error(`token exchange failed: ${response.status}`);
  return (await response.json()).refresh_token;
};

/** Replaces any existing SPOTIFY_ lines in .env.local and appends the new ones. */
const writeEnv = (values) => {
  const kept = existsSync(ENV_FILE)
    ? readFileSync(ENV_FILE, "utf8")
        .split("\n")
        .filter((line) => line && !line.startsWith("SPOTIFY_"))
    : [];
  const added = Object.entries(values).map(([key, value]) => `${key}=${value}`);
  writeFileSync(ENV_FILE, `${[...kept, ...added].join("\n")}\n`);
};

/** Links the Vercel project if needed, then replaces each value in production through the Vercel CLI. */
const pushToVercel = (values) => {
  const vercel = (args, input) =>
    spawnSync("npx", ["--yes", "vercel", ...args], {
      input,
      stdio: [input === undefined ? "inherit" : "pipe", "inherit", "inherit"],
    }).status === 0;
  if (!existsSync(".vercel/project.json") && !vercel(["link"])) {
    throw new Error("vercel link failed: add the three SPOTIFY_ values in the Vercel dashboard");
  }
  for (const [key, value] of Object.entries(values)) {
    vercel(["env", "rm", key, "--environment", "production", "--yes"], "");
    if (!vercel(["env", "add", key, "--environment", "production"], value)) {
      throw new Error(`vercel env add ${key} failed: add it in the Vercel dashboard`);
    }
  }
};

const secret = await askHidden("spotify client secret (hidden): ");
const refreshToken = await exchange(secret, await waitForCode());
const values = {
  SPOTIFY_CLIENT_ID: CLIENT_ID,
  SPOTIFY_CLIENT_SECRET: secret,
  SPOTIFY_REFRESH_TOKEN: refreshToken,
};
writeEnv(values);
console.log(`three SPOTIFY_ values written to ${ENV_FILE}`);
pushToVercel(values);
console.log("pushed to vercel production. redeploy for it to take effect.");
