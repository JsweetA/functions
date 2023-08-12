const promiseRace = function (queryArr = []) {
	return new Promise((resolve, reject) => {
		queryArr.forEach((func) => {
			// 谁第一个结束谁直接resolve出去
			Promise.resolve(func).then(resolve, reject);
		});
	});
};

// 模拟数据
const query = (time) => {
	return new Promise((res, rej) => {
		setTimeout(() => {
			res(time);
		}, time);
	});
};

(async (arr) => {
	const res1 = await promiseRace(arr);
	console.log("myRace", res1);
})([3, 2, 3, 8].map((i) => query(i * 1000)));
