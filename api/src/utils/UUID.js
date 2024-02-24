function UUID() {
	const chars = "0123456789abcdef".split("");
	const uuid = [];
	let timestamp = new Date().getTime();

	uuid[8] = uuid[13] = uuid[18] = uuid[23] = "-";
	uuid[14] = "4"; // Version 4

	for (let i = 0; i < 36; i++) {
		if (!uuid[i]) {
			const r = 0 | (Math.random() * 16);
			uuid[i] = chars[i === 19 ? (r & 0x3) | 0x8 : r].toString(16);
		}
	}
	return uuid.join("");
}
module.exports = UUID;
