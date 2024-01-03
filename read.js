"use strict";

const fsP = require("fs/promises");

async function readMyFile(path) {
  try {
    let contents = await fsP.readFile(path, "utf8");
    // console.log("file contents", contents);
  } catch (err) {
    process.exit(1);
  }
}

readMyFile(process.argv[2])

module.exports = {
  readMyFile,
};