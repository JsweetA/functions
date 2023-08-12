const promise = () => {
	return new Promise((res, rej) => {
		res(x + 1);
		console.log(123);
	});
};
await promise()
	.then((res) => console.log(res))
	.catch((res) => console.log(1, 2, 3, res));
console.log(321);
console.log(1);
// p1.then((res) => console.log(res, p, p1));
