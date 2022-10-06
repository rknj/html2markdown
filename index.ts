import * as fs from "fs";
import * as core from "@actions/core";

const htmlFile = core.getInput("html-file");
console.log(htmlFile);

const html = fs.readFileSync(htmlFile, "utf8");

const TurndownService = require("turndown");
const TurndownPluginGfm = require("turndown-plugin-gfm");
const turndownService = new TurndownService();
const markdown = turndownService
  .remove("head")
  .remove("img")
  .remove("a")
  .remove("hr")
  .use(TurndownPluginGfm.tables)
  .turndown(html);
console.log(markdown);

core.setOutput("markdown-content", markdown);
