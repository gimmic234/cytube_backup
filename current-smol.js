//-------------------------------------------------[CONTROL BLOCK]----------------------------------------------------------------------
//https is preferred for url
var banner_url = 'https://media.discordapp.net/attachments/434458202957021186/486312458034741249/For_Hearts.png?width=1300&height=250';
var href_url = "https://docs.google.com/spreadsheets/d/1C8yBViojH0E839tlS9kZLCRN99B-6UYh2hGKAB_QTAI/edit?usp=sharing";
var background_img = 'http://i.imgur.com/JYf9dgm.jpg';
var autostart_msg = "start!";
var countdown_utc = {
	year: 2018,
	month: 9,
	day: 19,
	hour: 23,
	minute: 0,
	second: 0,
};
var countdown_utc2 = {
	year2: 2018,
	month2: 9,
	day2: 21,
	hour2: 23,
	minute2: 0,
	second2: 0
};
var background_img_auto = 'http://i.imgur.com/JYf9dgm.jpg';
var background_img_auto2 = 'http://i.imgur.com/FXGe5Fq.jpg';
var addVidMsg = "true";
//-----------------------------------------------------------------------------------------------------------------------------------
//ControlBlockEnd
const second = 1000,
	minute = second * 60,
	hour = minute * 60,
	day = hour * 24;
var emoteArray = [];
var selectedPopover;
var emoteTable = false;
var handlerKeydown;
var date_utc = Date.UTC(countdown_utc.year, countdown_utc.month - 1, countdown_utc.day, countdown_utc.hour, countdown_utc.minute, countdown_utc.second);
var date_utc2 = Date.UTC(countdown_utc2.year2, countdown_utc2.month2 - 1, countdown_utc2.day2, countdown_utc2.hour2, countdown_utc2.minute2, countdown_utc2.second2);
var chatlineElem;
var queueList;
var emoteList;
var countDown;
var countDownTimer;
var countDown2;
var countDownTimer2;
var collapseArrow;
var autoPosition = -1;
var countdown1, countdown2;
var rankMod = (window.CLIENT.rank >= 2),
	rankAdmin = (window.CLIENT.rank >= 3);
var motdMode = $(document.getElementById('motd-mode'));
var jsTextField = $(document.getElementById('cs-jstext'));
var bodyElem = document.body;
var chatCmdLookup = {
	'/addq': function(chatCmdText) {
		if (chatCmdText.length > 1 && chatCmdText.length <= 10) {
			chatCmdText.shift();
			chatCmdText.forEach(function(value) {
				$(document.getElementById('mediaurl')).val(value);
				$(document.getElementById('queue_end')).click();
			})
		}
	},
	'/autostart': function() {
		if (rankAdmin) {
			let toggle_mode = motdMode.attr('data-value');
			toggle_mode = (toggle_mode == "true") ? "false" : "true";
			motdMode.attr('data-value', toggle_mode);
			let list = queueList.children(":visible");
			let new_mode = motdMode.attr('data-value');
			if (new_mode == "true") {
				list.each(function(index, value) {
					$(value).find("button.qbtn-next").before("<button class='btn btn-xs btn-default btn-auto-keep'><span class='glyphicon glyphicon-ok'></span>AutoStart</button>");
				})
				window.socket.emit("chatMsg", {
					msg: "autostart [on]"
				});
			} else {
				queueList.find("button.btn-auto-keep").remove();
				list.each(function(index, value) {
					$(value).removeClass('list-keep');
				})
				motdMode.attr('data-value', 'false');
				window.socket.emit("chatMsg", {
					msg: "autostart [off]"
				});
			}
		}
	},
	'/editbg': function(chatCmdText) {
		if (chatCmdText.length > 1 && rankAdmin) {
			var url = chatCmdText[1].replace('https:', 'http:');
			chatCmdText[1] = url;
			editJs(4, chatCmdText);
			window.socket.emit("chatMsg", {
				msg: "background updated"
			});
		}
	},
	'/autobg': function(chatCmdText) {
		if (chatCmdText.length > 1 && rankAdmin) {
			var url = chatCmdText[1].replace('https:', 'http:');
			chatCmdText[1] = url;
			editJs(22, chatCmdText);
			window.socket.emit("chatMsg", {
				msg: "autostart background set to " + url
			});
		}
	},
	'/autobg2': function(chatCmdText) {
		if (chatCmdText.length > 1 && rankAdmin) {
			var url = chatCmdText[1].replace('https:', 'http:');
			chatCmdText[1] = url;
			editJs(23, chatCmdText);
			window.socket.emit("chatMsg", {
				msg: "autostart background2 set to " + url
			});
		}
	},

	'/editbanner': function(chatCmdText) {
		if (chatCmdText.length > 1 && rankAdmin) {
			var textField = jsTextField.val();
			var textFieldArray = textField.split("\n");
			var bannerUrl = chatCmdText[1].replace(/['"]+/g, '').trim();
			bannerUrl = bannerUrl.replace('https:', 'http:');
			if (bannerUrl.lastIndexOf('?') > -1) {
				bannerUrl = bannerUrl.substr(0, bannerUrl.lastIndexOf('?'));
			}
			bannerUrl += "?width=1300&height=250";
			var firstBlock = textFieldArray[2].substr(0, textFieldArray[2].lastIndexOf(' = ') + 1);
			textField = textField.replace(textFieldArray[2], firstBlock + "= '" + bannerUrl + "';");
			jsTextField.val(textField);
			$(document.getElementById('cs-jssubmit')).click();
		}
		window.socket.emit("chatMsg", {
			msg: "banner updated"
		});
	},
	'/purge': function() {
		if (window.CLIENT.rank >= rankMod) {
			let list = queueList.children(":visible");
			deleteAllPlaylist(list);
		}
	},
	'/date': function() {
		var dateLocal = new Date(date_utc);
		window.socket.emit("chatMsg", {
			msg: "[" + dateLocal.toString() + "] (Local)"
		});
	},
	'/date2': function() {
		var dateLocal = new Date(date_utc2);
		window.socket.emit("chatMsg", {
			msg: "[" + dateLocal.toString() + "] (Local)"
		});
	},
	'/cdlocal': function(chatCmdText) {
		if (chatCmdText.length > 5 && rankAdmin) {
			if (!(!isNaN(chatCmdText[1]) || !isNaN(chatCmdText[2]) || !isNaN(chatCmdText[3]) || !isNaN(chatCmdText[4]) || !isNaN(chatCmdText[5]))) {
				window.socket.emit("chatMsg", {
					msg: "error: invalid countdown input"
				});
				return false;
			}
			var date = new Date(chatCmdText[1], chatCmdText[2], chatCmdText[3], chatCmdText[4], chatCmdText[5]);
			var textField = jsTextField.val();
			var textFieldArray = textField.split("\n");
			var year = textFieldArray[7].substr(0, textFieldArray[7].lastIndexOf(': '));
			textField = textField.replace(textFieldArray[7], year + ": " + date.getUTCFullYear() + ",");
			var month = textFieldArray[8].substr(0, textFieldArray[8].lastIndexOf(': '));
			textField = textField.replace(textFieldArray[8], month + ": " + date.getUTCMonth() + ",");
			var day = textFieldArray[9].substr(0, textFieldArray[9].lastIndexOf(': '));
			textField = textField.replace(textFieldArray[9], day + ": " + date.getUTCDate() + ",");
			var hour = textFieldArray[10].substr(0, textFieldArray[10].lastIndexOf(': '));
			textField = textField.replace(textFieldArray[10], hour + ": " + date.getUTCHours() + ",");
			var minute = textFieldArray[11].substr(0, textFieldArray[11].lastIndexOf(': '));
			textField = textField.replace(textFieldArray[11], minute + ": " + date.getUTCMinutes() + ",");

			jsTextField.val(textField);
			window.socket.emit("chatMsg", {
				msg: "countdown date updated"
			});
			$(document.getElementById('cs-jssubmit')).click();
		}
	},

	'/addemote': function(chatCmdText) {
		if (chatCmdText.length == 3 && rankMod) {
			var emote = ':' + chatCmdText[1].replace(/[:]+/g, '') + ':';
			var emoteUrl = chatCmdText[2]; //.replace('http:', 'https:');
			if (emoteUrl.lastIndexOf('.gif') > -1) {
				if (emoteUrl.lastIndexOf('?') > -1) {
					emoteUrl = emoteUrl.substr(0, emoteUrl.lastIndexOf('?'));
				}
			}
			$(document.getElementById('cs-emotes-newname')).val(emote);
			$(document.getElementById('cs-emotes-newimage')).val(emoteUrl);
			$(document.getElementById('cs-emotes-newsubmit')).click();
			window.socket.emit("chatMsg", {
				msg: "new emote added " + emote
			});
		}
	},

	'/img': function(chatCmdText) {
		if (chatCmdText.length == 2) {
			var url = chatCmdText[1].replace('https:', '');
			url = url.replace('http:', '');
			if (url.lastIndexOf('?') > -1) {
				url = url.substr(0, url.lastIndexOf('?'));
			}

			window.socket.emit("chatMsg", {
				msg: "@" + url + "@"
			});
		}
	},

	'/spimg': function(chatCmdText) {
		if (chatCmdText.length == 2) {
			var url = chatCmdText[1].replace('https:', '');
			url = url.replace('http:', '');
			if (url.lastIndexOf('?') > -1) {
				url = url.substr(0, url.lastIndexOf('?'));
			}

			window.socket.emit("chatMsg", {
				msg: ";;" + url + ";;"
			});
		}
	},

	'/skip': function(chatCmdText) {
		if (rankMod) {
			var target = $(document.getElementsByClassName('queue_active'));
			if (target.length > 0) {
				var name = target.find('.qe_title')[0].innerHTML;
				window.socket.emit("chatMsg", {
					msg: "removed [" + name + "]"
				});
				target.find('.qbtn-delete').click();
			}
		}
	},
	'/cdlocal2': function(chatCmdText) {
		if (chatCmdText.length > 5 && rankAdmin) {
			if (!(!isNaN(chatCmdText[1]) || !isNaN(chatCmdText[2]) || !isNaN(chatCmdText[3]) || !isNaN(chatCmdText[4]) || !isNaN(chatCmdText[5]))) {
				window.socket.emit("chatMsg", {
					msg: "error: invalid countdown2 input"
				});
				return false;
			}

			var date = new Date(chatCmdText[1], chatCmdText[2], chatCmdText[3], chatCmdText[4], chatCmdText[5]);
			var textField = jsTextField.val();
			var textFieldArray = textField.split("\n");
			var year = textFieldArray[15].substr(0, textFieldArray[15].lastIndexOf(': '));
			textField = textField.replace(textFieldArray[15], year + ": " + date.getUTCFullYear() + ",");
			var month = textFieldArray[16].substr(0, textFieldArray[16].lastIndexOf(': '));
			textField = textField.replace(textFieldArray[16], month + ": " + date.getUTCMonth() + ",");
			var day = textFieldArray[17].substr(0, textFieldArray[17].lastIndexOf(': '));
			textField = textField.replace(textFieldArray[17], day + ": " + date.getUTCDate() + ",");
			var hour = textFieldArray[18].substr(0, textFieldArray[18].lastIndexOf(': '));
			textField = textField.replace(textFieldArray[18], hour + ": " + date.getUTCHours() + ",");
			var minute = textFieldArray[19].substr(0, textFieldArray[19].lastIndexOf(': '));
			textField = textField.replace(textFieldArray[19], minute + ": " + date.getUTCMinutes() + ",");

			jsTextField.val(textField);
			window.socket.emit("chatMsg", {
				msg: "countdown2 date updated"
			});
			$(document.getElementById('cs-jssubmit')).click();
		}
	},

	'/setbg': function() {
		if (rankAdmin) {
			setAutobg();
			window.socket.emit("chatMsg", {
				msg: "loading bg1"
			});
		}
	},
	'/setbg2': function() {
		if (rankAdmin) {
			setAutobg2();
			window.socket.emit("chatMsg", {
				msg: "loading bg2"
			});
		}
	},

	'/addmsg': function() {
		if (rankMod) {
			var msg = (addVidMsg == "true") ? "false" : "true";
			editJs(24, [0, msg]);
			alert("addmsg: " + msg);
		}
	},

	'/log': function() {
		if (rankAdmin) {
			$(document.getElementById('export-btn')).find('button').click();
		}
	}
};


function setAutobg2() {
	let textArray = [0, background_img_auto2];
	editJs(4, textArray);
}

function countdownComplete2() {
	let mode = motdMode.attr('data-value');
	if (mode == 'true') {
		let selectedList = $("li.list-keep");

		setAutobg2();

		if (selectedList.length != 0) {
			let delList = selectedList.prevAll();
			deleteAllPlaylist(delList);
			selectedList.find('button.qbtn-play').click();
			window.socket.emit("chatMsg", {
				msg: autostart_msg
			});
		}
		cleanAutoStart();
		motdMode.attr('data-value', 'false');
	}
}


/*!
 **|   XaeMae Sequenced Module Loader
 **|   
 **@preserve
 */
// -- Channel Namespace --
if (!this[CHANNEL.name])
	this[CHANNEL.name] = {};
// -- The Module Library
window[CHANNEL.name].sequenceList = {
	'event-ext': {
		active: 1,
		rank: -1,
		url: "https://rawgit.com/gimmic234/cytube_backup/54b8f18e1949384a916ae0fca4568981c7e8997e/current-ext.js",
		callback: true
	},
	'layout': {
		active: 1,
		rank: -1,
		url: "https://rawgit.com/gimmic234/cytube_backup/2ab12db731bf9490470e6ca0b5a628891eb4e651/module/channelbase-mod.js",
		callback: true
	},
	'channel': {
		active: 1,
		rank: -1,
		url: "https://rawgit.com/gimmic234/cytube_backup/067c40e2d8dab045009b7f666cc541a1c8923a32/enhancer-mod.min.js",
		callback: true
	}
};

window[CHANNEL.name].sequencePrev = window[CHANNEL.name].sequencePrev || "";
window[CHANNEL.name].sequenceState = window[CHANNEL.name].sequenceState || 0;
window[CHANNEL.name].sequenceIndex = Object.keys(window[CHANNEL.name].sequenceList);
window[CHANNEL.name].sequencerLoader = function() {
	// After first run we curry the previous modules callback
	// This is mainly used to reassign variables in modules/scripts that don't use module options
	if (window[CHANNEL.name].sequencePrev) {
		setTimeout(window[CHANNEL.name].sequenceList[window[CHANNEL.name].sequencePrev].callback, 0)
		window[CHANNEL.name].sequencePrev = "";
	}

	if (window[CHANNEL.name].sequenceState >= window[CHANNEL.name].sequenceIndex.length) {
		return (function() {
			if (!document.getElementById('export-btn')) {
				$(document.getElementById('cs-chanlog')).append(" <a class='export' id='export-btn' href='#' download='chat.txt'><button class='btn btn-default'>Export</button></a>");
				bindEventHandler();
				$(document.body).on('click', '.imgContainer', function() {
					if ($(this).find('img').css('filter') != 'blur(0px)') {
						$(this).find('img').css('filter', 'blur(0px)');
						$(this).removeClass('imgContainer');
						$(this).attr('title', '');
						var elem = $(this).find('a');
						setTimeout(function() {
							elem.attr('href', elem.find('img').attr('src'));
						}, 1000)
					}
				});
			}

			waitForEl('#club_redirect', function() {
				$('#club_redirect').attr('href', href_url);
				collapseArrow = $(document.getElementById('collapseArrow'));
			});
			waitForEl('#club_banner', function() {
				$('#club_banner').attr('src', banner_url);
			});

			waitForEl('#chatline', function() {
				chatlineElem = $(document.getElementById('chatline'))
				populateEmote();
				chatlineElem.off('keydown');
				chatlineElem.on('keydown', function(e) {
					chatHandler(e);
				});
			});

			waitForEl('span#plcount', function() {
				queueList = $(document.getElementById('queue'));
				videoDisplayToggle();
				autoStartHandler();
			});

			waitForEl('#motd-mode', function() {
				motdMode = $(document.getElementById('motd-mode'));
			});

			waitForEl('#backg', function() {
				$(document.getElementById('backg')).css('background-image', "url(" + background_img + ")");
			});

			waitForEl('#countdown1', function() {
				countdown1 = document.getElementById('countdown1');
				countdown2 = document.getElementById('countdown2');
			});

			countDown = new Date(date_utc).getTime();
			clearInterval(countDownTimer);
			countDownTimer = setInterval(function() {
				if ($('#countdown1:hidden').length > 0) {
					$('#countdown1').show();
				}
				let now = new Date().getTime(),
					distance = countDown - now;
				document.getElementById('days').innerText = Math.floor(distance / (day)),
					document.getElementById('hours').innerText = Math.floor((distance % (day)) / (hour)),
					document.getElementById('minutes').innerText = Math.floor((distance % (hour)) / (minute)),
					document.getElementById('seconds').innerText = Math.floor((distance % (minute)) / second);

				let totalSeconds = Math.floor(distance / second);

				if (totalSeconds < 86400 && !countdown1.classList.contains('countdownbaseActive')) {
					$(countdown1).removeClass('countdownbase');
					$(countdown1).addClass('countdownbaseActive');
				}

				if (totalSeconds > 86400 && countdown1.classList.contains('countdownbaseActive')) {
					$(countdown1).removeClass('countdownbaseActive');
					$(countdown1).addClass('countdownbase');
				}

				countdownMsg(totalSeconds);
				//do something later when date is reached
				if (distance < 0) {
					clearInterval(countDownTimer);
					$('#countdown1').hide();

					countdownComplete();
				}

			}, second)
			countDown2 = new Date(date_utc2).getTime();
			clearInterval(countDownTimer2);
			countDownTimer2 = setInterval(function() {
				if ($('#countdown2:hidden').length > 0) {
					$('#countdown2').show();
				}
				let now2 = new Date().getTime(),
					distance2 = countDown2 - now2;
				document.getElementById('days2').innerText = Math.floor(distance2 / (day)),
					document.getElementById('hours2').innerText = Math.floor((distance2 % (day)) / (hour)),
					document.getElementById('minutes2').innerText = Math.floor((distance2 % (hour)) / (minute)),
					document.getElementById('seconds2').innerText = Math.floor((distance2 % (minute)) / second);
				let totalSeconds = Math.floor(distance2 / second);

				if (totalSeconds < 86400 && !countdown2.classList.contains('countdownbaseActive')) {
					$(countdown2).removeClass('countdownbase');
					$(countdown2).addClass('countdownbaseActive');
				}

				if (totalSeconds > 86400 && countdown2.classList.contains('countdownbaseActive')) {
					$(countdown2).removeClass('countdownbaseActive');
					$(countdown2).addClass('countdownbase');
				}

				countdownMsg(totalSeconds);

				//do something later when date is reached
				if (distance2 < 0) {
					clearInterval(countDownTimer2);
					$('#countdown2').hide();

					countdownComplete2();
				}
			}, second)

		})();
	}

	var currKey = window[CHANNEL.name].sequenceIndex[window[CHANNEL.name].sequenceState];
	if (window[CHANNEL.name].sequenceState < window[CHANNEL.name].sequenceIndex.length) {
		if (window[CHANNEL.name].sequenceList[currKey].active &&
			window[CHANNEL.name].sequenceList[currKey].rank <= CLIENT.rank
		) {
			console.log("Xaekai's Script Sequencer: Loading " + currKey);
			window[CHANNEL.name].sequencePrev = currKey;
			window[CHANNEL.name].sequenceState++;
			$.getScript(window[CHANNEL.name].sequenceList[currKey].url, window[CHANNEL.name].sequencerLoader)
		} else {
			window[CHANNEL.name].sequenceState++;
			window[CHANNEL.name].sequencerLoader()
		}
	}
};
window[CHANNEL.name].sequencerLoader();


$(".navbar-brand").text("Anime Club");