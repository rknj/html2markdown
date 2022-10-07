import * as fs from "fs";
import * as core from "@actions/core";

const htmlFile = core.getInput("html-file");
core.info("Input file:" + htmlFile);

const html = fs.readFileSync(htmlFile, "utf8");

const TurndownService = require("turndown");
const TurndownPluginGfm = require("turndown-plugin-gfm");
const turndownService = new TurndownService();
const markdown = turndownService.use(TurndownPluginGfm.gfm).turndown(html);
core.debug("Generated markdown:" + markdown);

core.setOutput("markdown-content", markdown);

const Path = require("path");
const markdownFile =
  Path.parse(htmlFile).dir + "/" + Path.parse(htmlFile).name + ".md";

fs.writeFileSync(markdownFile, markdown);
core.info("Output file:" + markdownFile);

core.setOutput("markdown-file", markdownFile);
