var templates = [
	// [问题, 答案],
	["<span class=\"keyword\">{{id}}</span> 号元素是", "{{cn}}"],
	["符号为 <span class=\"keyword\">{{sym}}</span> 的元素是", "{{cn}}"],
	["位于 <span class=\"keyword\">{{pr}}</span> 周期 <span class=\"keyword\">{{group}}</span> 族的元素是", "{{cn}}"],
	["<span class=\"keyword\">{{sym}}</span> 元素的位置是", "{{pr}} 周期 {{group}} 族"],
	["<span class=\"keyword\">{{cn}}</span> 元素的相对原子量是", "{{ram}}"],
	["<span class=\"keyword\">{{sym}}</span> 元素 <span class=\"keyword\">{{pos}}</span> 的元素是", "{{relcn}}"]
];

var pos = [
	"上方",
	"右面",
	"下方",
	"左面"
]