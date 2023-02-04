
import { DenonConfig } from "https://deno.land/x/denon@2.5.0/mod.ts";

const config: DenonConfig = {
  scripts: {
    start: {
      cmd: "deno run server.ts",
      desc: "run server system",
    },
    start_toku: {
      cmd: "deno run server_toku.ts",
      desc: "run toku system",
    },
  },
};

export default config;