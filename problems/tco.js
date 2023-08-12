function tco(fn) {
	let value;
	let active = false;
	let accumulated = [];

	return function () {
		// debugger;
		accumulated.push(arguments);
		console.log(...arguments);
		if (!active) {
			active = true;

			while (accumulated.length) {
				value = fn.apply(this, accumulated.shift());
			}

			active = false;
			return value;
		}
	};
}

// 重复利用函数调用帧
// 调用帧1
// 初始状态：active = false
// 执行函数：active = true 进入优化状态
// 收集参数的数组length + 1；

// 再次执行fn，开启调用帧2
// 但是此时的active = true
// 直接将参数push进去后,就退出了,return undefined.调用帧2释放

// 回到调用帧1
// while循环的条件暂不支持退出循环,重复再次执行的步骤,以此类推

// 尾调用优化就是这么个利用while循环实现复用调用帧,也就是将递归优化成循环
const sum = tco(function (x, y) {
	if (!y) return x;
	const a = sum(x + 1, y - 1);
	console.log(x, ":", a);
	return a;
});

// y个函数调用帧 12345 54321
function sum1(x, y) {
	if (!y) return x;

	return sum1(x + 1, y - 1);
}

console.log(sum(1, 10));
