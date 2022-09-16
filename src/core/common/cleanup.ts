import { Callback } from "$/types/callbacks";
import { forEach } from "../../collections/array";
import { browser } from "../env";

let hasBeenInitialized = false;
type CallbackID = string;
type CallbacksToUnload = Map<string, Callback[]>;
const tasksToDo: CallbacksToUnload = new Map<CallbackID, Callback[]>();
if (browser) {
	window.addEventListener(
		"beforeunload",
		(event) => {
			event.preventDefault();
			for (const [id, task] of tasksToDo.entries()) {
				// alert("testing");
				console.log(id);
				forEach(task, (cb) => cb());
			}
			tasksToDo.clear();
		},
		{ capture: true }
	);
}

export function doOnUnload(id: string, ...tasks: Callback[]): void {
	hasBeenInitialized = true;
	const taskQueue = tasksToDo.get(id) ?? [];
	if (Array.isArray(tasks)) {
		taskQueue.push(...tasks);
	} else {
		taskQueue.push(tasks);
	}
	tasksToDo.set(id, taskQueue);
	if (hasBeenInitialized) {
		console.log("already initialized!");
		return;
	}
}

doOnUnload('wow', () => { return; }, () => { });