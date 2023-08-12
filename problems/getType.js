export function getType(a) {
	let type = typeof a;
	if (type != "object") return type;

	return Object.prototype.toString.call(a).split(" ")[1].replace("]", "");
}
