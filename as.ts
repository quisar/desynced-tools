#!/usr/bin/env node
import * as fs from "fs";
import { ObjectToDesyncedString } from "./dsconvert";
import { assemble } from "./assembler";

const code = fs.readFileSync(process.argv[2], "utf8");
assemble(code).then((obj) => {
  let typ = 'C'
  if ('frame' in obj) {
    typ = 'B';
  }
  const str = ObjectToDesyncedString(obj, typ);
  fs.writeFileSync(process.argv[2] + ".txt", str);
  fs.writeFileSync(
    process.argv[2] + ".json",
    JSON.stringify(obj, undefined, 2)
  );
});
