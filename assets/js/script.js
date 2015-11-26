var elem = {
	pick: function(mode) {
		var picked = new Array(20);
		switch (mode) {
			// 简单0，一般1，困难2，吊打3
			case 0:
				picked = elements.slice(0, 20);
				break;
			case 1:
				picked = elements.slice(0, 36);
				break;
			case 2:
				picked = elements;
				break;
			case 3:
				picked = elements;
				break;
		}

		var randArr = elem.genRandArr();
		var questionElements = new Array(20);
		for (i = 0; i < 20; i++) {
			questionElements[i] = picked[randArr[i]];
		}
		alert(JSON.stringify(questionElements));
	},
	
	genRandArr: function() {
		// 这是网上抄来的打乱数组的代码，原理我也不知道 qwq
		var arr1 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];
		var arr2 = [];
		while(arr1.length > 0){
			var elem = arr1.splice(Math.random() * arr1.length << 0, 1);
			arr2.push(elem);
		}
		return arr2;
	}
};

jQuery(document).ready(function($) {
	$('#mode1').click(function() {
		elem.pick(1)
	})
});