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
				
			default:
				return false;
		}

		var randArr = elem.genRandArr();
		var disordered = new Array(20);
		for (var i = 0; i < 20; i++) {
			disordered[i] = picked[randArr[i]];
		}
		return disordered;
	},
	
	genRandArr: function() {
		// 这是网上抄来的打乱数组的代码，原理我也不知道 quq
		var arr1 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];
		var arr2 = [];
		while(arr1.length > 0){
			var elem = arr1.splice(Math.random() * arr1.length << 0, 1);
			arr2.push(elem);
		}
		return arr2;
	},
	
	genQuestion: function(mode) {
		// 随机取出打乱的20个元素
		var qElem = elem.pick(mode);
		var questions = new Array(20);
		for (var i = 0; i < qElem.length; i++) {
			// 随机生成题目类型序号0-5，见templates
			var rand = Math.floor(Math.random() * 6);
			switch (rand) {
				case 0:
					questions[i] = [
						templates[0][0].replace("{{id}}", qElem[i]["id"]),
						qElem[i]["cn"]
					];
					break;
				
				case 1:
					questions[i] = [
						templates[1][0].replace("{{sym}}", qElem[i]["sym"]),
						qElem[i]["cn"]
					];
					break;
				
				case 2:
					questions[i] = [
						templates[2][0].replace("{{group}}", groups[qElem[i]["gid"]]).replace("{{pr}}", qElem[i]["pr"]),
						qElem[i]["cn"]
					];
					break;
				
				case 3:
					questions[i] = [
						templates[3][0].replace("{{sym}}", qElem[i]["sym"]),
						groups[qElem[i]["gid"]] + "族" + qElem[i]["pr"] + "周期"
					];
					break;
				
				case 4:
					questions[i] = [
						templates[4][0].replace("{{cn}}", qElem[i]["cn"]),
						qElem[i]["ram"]
					];
					break;
				
				case 5:
					// 生成随机位置id，见pos
					var posId = Math.floor(Math.random() * 4);
					while (qElem[i]["rel"][posId] == 0) {
						posId = Math.floor(Math.random() * 4);
					}
					questions[i] = [
						templates[5][0].replace("{{sym}}", qElem[i]["sym"]).replace("{{pos}}", pos[posId]),
						elements[qElem[i]["rel"][posId] - 1]["cn"]
					];
					break;
				
				default:
					// code
			}
			$('#game-area').append('<br>' + questions[i][0] + '<br>' + questions[i][1] + '<br>')
		}
		return questions;
	}
};

var score = [0, 0];

var game = {
	start: function(mode) {
		var questions = elem.genQuestion(mode);
		$('#score-bar').slideDown();
	},
	
	correct: function() {
		$('#correct-bar').animate({width: (++score[0] * 5) + '%'}, 30);
	},
	incorrect: function() {
		$('#incorrect-bar').animate({width: (++score[1] * 5) + '%'}, 30);
	},
	
	genBinArray: function() {
		var binArray = new Array();
		for (var i = 0; i < 21; i++) {
			binArray[i] = [0, 1, 2, 3, 4, 5, 6, 7];
		};
	}
};

var timer = {
	start: function(timeout) {
		
	},
	
	reset: function() {
		
	}
};

jQuery(document).ready(function($) {
	$('#mode1').click(function() {
		game.start(1);
	})
});