import { getType } from "./getType.js";

var array = [
	1,
	1,
	"1",
	"1",
	null,
	null,
	undefined,
	undefined,
	new Object("/a/"),
	new String("1"),
	new String("1"),
	/a/,
	/a/,
	NaN,
	NaN,
	function a() {},
];
// 简单粗暴set去重
let unique_1 = (arr) => [...new Set(arr)];

// 利用类型+值形成map去重
function unique_2(array) {
	var obj = {};
	return array.filter(function (item, index, array) {
		return obj.hasOwnProperty(getType(item) + item) ? false : (obj[getType(item) + item] = true);
	});
}
// function unique_3(array) {
// 	var res = array.filter(function (item, index, array) {
// 		return array.indexOf(item) === index;
// 	});
// 	return res;
// }

console.log(unique_1(array));
console.log(unique_2(array));
