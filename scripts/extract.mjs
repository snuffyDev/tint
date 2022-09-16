#!/usr/bin/env node

import { readFileSync, writeFileSync, readdirSync, existsSync, mkdirSync } from "fs";
import { resolve, dirname, sep, join } from "path";
import { fileURLToPath } from "url";

const args = process.argv.slice(2);
const BASE_PATH = resolve(".");
const SEP = sep;
async function main() {
	const raw_path = args[args.findIndex((item) => item === "-p") + 1];
	const out_dir = args[args.findIndex((item) => item === "-o") + 1];
	const path_to_input = resolve(BASE_PATH, raw_path);
	const path_to_output = resolve(BASE_PATH, out_dir);
	console.log(args, BASE_PATH, raw_path, path_to_input);
	if (!existsSync(path_to_output)) {
		mkdirSync(path_to_output, { recursive: true });
	}
	const read_file = readFileSync(path_to_input, { encoding: "utf-8" });
	// const fn_names = read_file.match(/(?<=export function[\s])(\w+)/gm);
	const fn_blocks = read_file.split("/**");
	fn_blocks.forEach((block) => {
		// console.log(block);
		const name = block.match(/(?<=export function[\s])(\w+)/gm);
		if (!name) return;
		writeFileSync(join(path_to_output, `${name}.ts`), `/**${block}`, { encoding: "utf-8" });
	});

	// console.log(fn_names, read_file.split("/**"));
}

main();
