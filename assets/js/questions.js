var templates = [
	// [问题, 答案],
	["{{id}} 号元素是?", "{{cn}}"],
	["符号为 {{sym}} 的元素是?", "{{cn}}"],
	["位于 {{pr}} 周期 {{group}} 族的元素是?", "{{cn}}"],
	["{{sym}} 元素在元素周期表的位置是?", "{{pr}} 周期 {{group}} 族"],
	["{{cn}} 元素的相对原子量是?", "{{ram}}"],
	["位于 {{sym}} 元素 {{pos}} 的元素是什么？", "{{relcn}}"]
];

var pos = [
	"上方",
	"右面",
	"下方",
	"左面"
]