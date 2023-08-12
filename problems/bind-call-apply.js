globalThis.name = "global";
const obj = {
	name: "thisChange",
};
function show() {
	console.log(this.name, ...arguments);
	return this.name;
}

// call 和 apply 差别就是一个参数是列表，一个是数组
// 原理：this的指向是指向调用它的人，根据这个特性。利用高阶函数包一层，使得改变this指向
// 将新改方法绑定到需要指向的对象里,并且最后再删除该属性.
Function.prototype.mycall = function () {
	// 解析参数
	let [obj, ...rest] = arguments;

	// 将方法挂载到obj上(新指向)
	let fn = Symbol();
	obj = Object(obj);
	obj[fn] = this;

	// 调用
	let res = obj[fn](...rest);

	// 删除
	delete obj[fn];
	return res;
};
// 同理可实现
Function.prototype.myApply = function () {
	let [obj, rest] = arguments;

	let fn = Symbol();
	obj = Object(obj);
	obj[fn] = this;

	let res = obj[fn](...rest);

	delete obj[fn];
	return res;
};
show("raw");
show.mycall(obj, "call", "call1");
show.myApply(obj, ["apply", "aplly1"]);

// 就是高阶函数包装一层
Function.prototype.myBind = function () {
	let [obj, ...rest] = arguments;
	return (...newArgs) => [this.mycall(obj, ...rest, ...newArgs)];
};
// show("raw");
const objShow = show.myBind(obj, "bind");
objShow("bing2");
