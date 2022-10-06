//import TurndownService from "turndown";
import * as fs from "fs";
import * as core from "@actions/core";

const htmlFile = core.getInput("html-file");
console.log(htmlFile);

fs.readFile(htmlFile, function read(err, data) {
  if (err) {
    throw err;
  }

  const TurndownService = require("turndown");
  const turndownService = new TurndownService();
  const markdown = turndownService.turndown(data);
  console.log(markdown);

  core.setOutput("markdown-content", markdown);
});
