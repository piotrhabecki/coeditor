import { writeFileSync } from "fs";
import { writeFile } from "fs/promises";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { NodeVM, VMScript } = require("vm2");
    let code = req.body.code as string;
    let ext = {};
    const vm = new NodeVM({
      console: "redirect",
      timeout: 1000,
      allowAsync: false,
      sandbox: { ext },
      require: {
        external: ["request"],
        builtin: ["fs", "path"],
        root: "./",
        mock: {
          fs: {
            readFileSync: () => "Nice try!",
            writeFile: () => "Nope",
            writeFileSync: () => "Nope",
            eval: () => "No evals",
          },
        },
      },
    });

    let vmdata: string[] = [];
    vm.on("console.log", (data: any) => {
      console.log(`VM Output: ${data}`);
      vmdata.push(`${data}`);
      return `${data}`;
    });

    let evalResult: any = "";

    try {
      var script = new VMScript(`ext.exports = ${code}`).compile();
    } catch (err) {
      evalResult = err.toString();
    }

    try {
      evalResult = vm.run(new VMScript(code));
    } catch (err) {
      evalResult = err.toString();
    }

    res.status(200).json({ evalOutput: evalResult, consoleOutput: vmdata });
    return;
  } else {
    //Response for other than POST method
    res.status(500).json({ message: "Route not valid" });
  }
}
