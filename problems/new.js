function Car() {
	this.a = { b: 1 };
}

const a = new Car();
// console.log(a);

function myNew(fn, ...args) {
	// 创建一个新对象，并且把原型指向这个fn的原型
	const instance = Object.create(fn.prototype);

	// apply改变this指向，指向新对象
	const res = fn.apply(instance, args);

	// 如果有返回值，且返回值是对象或者函数，就直接放回，反之返回新对象
	return typeof res === "object" || typeof res === "function" ? res : instance;
}

// 这也解释了为什么这里互不干扰的原因，因为是重新赋值，并且没有依赖外部
const res = myNew(Car);
const res1 = myNew(Car);
