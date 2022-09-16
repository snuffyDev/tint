import { uuid } from "$/core/common/uuid";
import { mpmc } from "$/sync/mpmc";

// DOM Nodes
const senders = document.querySelector<HTMLDivElement>("#senders")!;
const logs = document.querySelector<HTMLDivElement>("#logs")!;

const recv = document.querySelector<HTMLElement>("#recv")!;
const addBtn = document.querySelector<HTMLButtonElement>("#add")!;
const closeBtn = document.querySelector<HTMLButtonElement>("#close")!;

const counter = document.querySelector<HTMLSpanElement>("#counter")!;


/// Create new MPMC Channel
const [sender, receiver] = mpmc<string>();

/// Clone the sender
const sender2 = sender.clone();

let messages = 0;

/// Unsubscriber for the observable
const unsubscriber = receiver.subscribe((value) => {
	logs.innerHTML += `<li>${value}</li>` + "";
});
recv.innerText = "State: " + receiver.state;
async function testing() {
	const res = await fetch('https://favifetch.beatbump.workers.dev/get?url=https://youtube.com');
	const data = await res.text();
	return data;

}
async function MESSAGE() {
	sender.send("from original sender");
	sender2.send("from sender 2");

	const test1 = await testing();

	sender.send(test1.slice(0, 100));
	const test2 = await testing();

	sender.send(test2.slice(0, 100));
	const test3 = await testing();
	sender.send(test3.slice(0, 100));



}

MESSAGE();

window.addEventListener("beforeunload", () => {
	if (typeof unsubscriber === "function") unsubscriber();
});

function setup() {
	addBtn.addEventListener("click", () => {
		const temp = document.createElement("article");
		const id = uuid();
		temp.id = id;
		const form = document.createElement("form");
		const label = document.createElement("label");
		const input = document.createElement("input");
		const header = document.createElement("header");
		const btn = document.createElement("button");

		btn.addEventListener("click", () => {
			sender.send(input.value);
			counter.innerHTML = `${parseInt(counter.innerHTML) + 1}`;
		});
		form.addEventListener("submit", (event) => {
			event.preventDefault();
		});
		label.htmlFor = `input${id}`;
		btn.textContent = "Send Message";
		input.name = `input${id}`;
		input.id = `input${id}`;
		input.placeholder = "Message";
		input.type = "text";
		label.appendChild(input);
		header.textContent = "Sender " + id;
		temp.appendChild(header);
		form.appendChild(label);
		btn.type = "submit";

		form.appendChild(btn);
		temp.appendChild(form);

		senders.appendChild(temp);
	});
	closeBtn.addEventListener('click', () => {
		receiver.close();
		recv.innerText = "State: " + receiver.state;

	});


}
setup();