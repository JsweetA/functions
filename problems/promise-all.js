const promiseAll = function (queryArr = []) {
	// 得先取出promise的res，rej
	const resQueue = [];
	return new Promise((resolve, reject) => {
		const len = queryArr.length;
		queryArr.forEach((i, index) => {
			Promise.resolve(i)
				.then((res) => {
					// console.log(index, "完成");
					resQueue[index] = res;
					if (resQueue.length === len) {
						console.log("全部完成！");
						resolve(resQueue);
					}
				})
				.catch((e) => {
					resQueue[index] = "第" + (index + 1) + "个:error";
					if (resQueue.length === len) {
						reject(resQueue);
					}
				});
		});
	});
};

const query = (time) => {
	return new Promise((res, rej) => {
		setTimeout(() => {
			console.log(time);
			if (time === 2000) rej(1);
			res(time);
		}, time);
	});
};

const a = async () => {
	// const res = await Promise.all([1, 2, 3, 4].map((i) => query(i * 1000)));
	// console.log("promise.all", res);
	const res1 = await promiseAll([3, 2, 3, 8].map((i) => query(i * 1000)));
	console.log(res1);
};

await a();
Promise.race([3, 2, 3, 8].map((i) => query(i * 1000)));
