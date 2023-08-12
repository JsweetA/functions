const _ = require("loadsh");
const { getType } = require("getType");
function isObject(obj) {
	return getType(obj) === "object";
}

// hash是用来解决循环引用的问题
function cloneDeep(target, hash = new WeakMap()) {
	// 普通类型直接返回
	if (!isObject(target)) return target;
	if (hash.get(target)) return hash.get(target);

	// 如果是数组就给数组，反之就给对象
	let newObj = Array.isArray(target) ? [] : {};
	hash.set(target, newObj);
	for (let key in target) {
		if (isObject(target[key])) {
			newObj[key] = cloneDeep(target[key], hash);
		} else {
			newObj[key] = target[key];
		}
	}
	return newObj;
}
const objA = {
	a: new Date(),
	b: /123/,
	c: 1123,
};
const objB = {
	a: new Date(),
	b: /123/,
	c: 1123,
};

// 循环引用
objA.objB = objB;
objB.objA = objA;

console.log(_.cloneDeep(objA));
console.log(cloneDeep(objA));
