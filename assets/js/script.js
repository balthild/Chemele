var elem = {
	pick: function(mode) {
		var picked = [];
		switch (mode) {
			// 简单0，一般1，困难2，吊打3
			case 0:
				picked = elements.slice(0, 20);
				break;
			case 1:
				picked = elements.slice(0, 36);
				break;
			case 2:
				for (var i = 0; i < elements.length; i++) {
					if (elements[i]["gid"] == 1 || elements[i]["gid"] == 2 || (elements[i]["gid"] >= 13 && elements[i]["gid"] <= 17)) {
						picked.push(elements[i]);
					}
				}
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
		while (arr1.length > 0) {
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
				/*
				case 类型序号:
					questions[i] = [
						问题,
						正确选项,
						干扰选项1,
						干扰选项2,
						干扰选项3
					];
					break;
				*/
				case 0:
					var r = elem.genIncorrectElementId(i);
					questions[i] = [
						templates[0][0].replace("{{id}}", qElem[i]["id"]),
						qElem[i]["cn"],
						qElem[r[0]]["cn"],
						qElem[r[1]]["cn"],
						qElem[r[2]]["cn"]
					];
					break;
				
				case 1:
					var r = elem.genIncorrectElementId(i);
					questions[i] = [
						templates[1][0].replace("{{sym}}", qElem[i]["sym"]),
						qElem[i]["cn"],
						qElem[r[0]]["cn"],
						qElem[r[1]]["cn"],
						qElem[r[2]]["cn"]
					];
					break;
				
				case 2:
					var r = elem.genIncorrectElementId(i);
					questions[i] = [
						templates[2][0].replace("{{group}}", groups[qElem[i]["gid"]]).replace("{{pr}}", qElem[i]["pr"]),
						qElem[i]["cn"],
						qElem[r[0]]["cn"],
						qElem[r[1]]["cn"],
						qElem[r[2]]["cn"]
					];
					break;
				
				case 3:
					var r = elem.genIncorrectElementId(i);
					questions[i] = [
						templates[3][0].replace("{{sym}}", qElem[i]["sym"]),
						groups[qElem[i]["gid"]] + "族" + qElem[i]["pr"] + "周期",
						groups[qElem[r[0]]["gid"]] + "族" + qElem[r[2]]["pr"] + "周期",
						groups[qElem[r[1]]["gid"]] + "族" + qElem[r[1]]["pr"] + "周期",
						groups[qElem[r[2]]["gid"]] + "族" + qElem[r[0]]["pr"] + "周期"
					];
					break;
				
				case 4:
					var r = elem.genIncorrectElementId(i);
					questions[i] = [
						templates[4][0].replace("{{cn}}", qElem[i]["cn"]),
						qElem[i]["ram"],
						qElem[r[0]]["ram"],
						qElem[r[1]]["ram"],
						qElem[r[2]]["ram"]
					];
					break;
				
				case 5:
					// 生成随机位置id，见pos
					var posId = Math.floor(Math.random() * 4);
					while (qElem[i]["rel"][posId] == 0) {
						posId = Math.floor(Math.random() * 4);
					}
					var r = elem.genIncorrectElementId(qElem[i]["rel"][posId] - 1);
					questions[i] = [
						templates[5][0].replace("{{sym}}", qElem[i]["sym"]).replace("{{pos}}", pos[posId]),
						elements[qElem[i]["rel"][posId] - 1]["cn"],
						qElem[r[0]]["cn"],
						qElem[r[1]]["cn"],
						qElem[r[2]]["cn"]
					];
					break;
				
				default:
					// nothing to do
			}
			// $('#game-area').append('<br>' + questions[i][0] + '<br>' + questions[i][1] + '<br>');
		}
		return questions;
	},
	genIncorrectElementId: function(correctId) {
		var r = new Array(3);
		r[0] = Math.floor(Math.random() * 20);
		while (r[0] == correctId) {
			r[0] = Math.floor(Math.random() * 20);
		}
		r[1] = Math.floor(Math.random() * 20);
		while (r[1] == r[0] || r[1] == correctId) {
			r[1] = Math.floor(Math.random() * 20);
		}
		r[2] = Math.floor(Math.random() * 20);
		while (r[2] == r[1] || r[2] == r[0] || r[2] == correctId) {
			r[2] = Math.floor(Math.random() * 20);
		}
		return r;
	}
};

var score, q, count;
var game = {
	start: function(mode) {
		score = [0, 0, 0];
		q = elem.genQuestion(mode);
		count = 0;
		$('#score-bar').slideDown();
		$('#correct-bar').css('width', 0);
		$('#incorrect-bar').css('width', 0);
		$('#timeout-bar').css('width', 0);
		
		// generate question content
		$('#game-area').show();
		$('#game-desc').hide();
		
		game.next();
	},
	next: function() {
		if (count < 20) {
			$('#question-text').text(q[count][0]);
			$('#game-area .option').removeClass('correct-option').removeClass('incorrect-option');
			// 正确选项
			var correctOption = Math.floor(Math.random() * 4);
			$('#game-area .option').eq(correctOption).text(q[count][1]).addClass('correct-option');
			// 干扰选项
			var j = 2;
			for (var i = 0; i < 4; i++) {
				if (i != correctOption) {
					$('#game-area .option').eq(i).text(q[count][j++]).addClass('incorrect-option');
				}
			}
			
			// 时间以毫秒为单位
			timer.start(5000);
			
			count++;
		} else {
			game.end();
		}
	},
	end: function() {
		$('#correct-option').off('click');
		$('.incorrect-options').off('click');
		$(document).off('keydown');
		
		$('#game-area').hide();
		$('#game-desc').show();
	},
	
	correct: function() {
		$('#correct-bar').animate({width: (++score[0] * 5) + '%'}, 200);
		timer.break(true);
		game.next();
	},
	incorrect: function() {
		$('#incorrect-bar').animate({width: (++score[1] * 5) + '%'}, 200);
		timer.break(false);
		game.next();
	},
	timeout: function() {
		$('#timeout-bar').animate({width: (++score[2] * 5) + '%'}, 200);
		game.next();
	},
	
	listen: function() {
		// 给选项委托点击事件
		$(document).on('click', '.correct-option', function() {
			game.correct();
		});
		$(document).on('click', '.incorrect-option', function() {
			game.incorrect();
		});
		// 委托键盘事件
		$(document).on('keydown', function(e) {
			switch (e.keyCode) {
				case 49:
					// 1
					break;
				case 50:
					// 2
					break;
				case 51:
					// 3
					break;
				case 52:
					// 4
					break;
					
				case 97:
					// num 1
					break;
				case 98:
					// num 2
					break;
				case 99:
					// num 3
					break;
				case 100:
					// num 4
					break;
				
				default:
					// nothing to do
			}
		});
	}
};

var timerHandler;
var timer = {
	start: function(timeout) {
		$('#time-bar').css('width', '100%');
		timerHandler = setTimeout("game.timeout();", timeout);
		$('#time-bar').animate({width: '0%'}, timeout, 'linear', function() {
			$('#time-bar').css('width', '100%');
		});
	},
	break: function() {
		clearTimeout(timerHandler);
		$('#time-bar').stop().css('width', '100%');
	}
};

jQuery(document).ready(function($) {
	game.listen()
	$('.start-game').click(function() {
		game.start(parseInt($(this).attr('data-mode')));
	})
});
