//-------------------------------------------------[CONTROL BLOCK]----------------------------------------------------------------------
//https is preferred for url
var banner_url = 'http://cdn.discordapp.com/attachments/428195862963814413/506140754574442504/inprogress.png?width=1300&height=250';
var href_url = "https://docs.google.com/spreadsheets/d/1C8yBViojH0E839tlS9kZLCRN99B-6UYh2hGKAB_QTAI/edit#gid=1605247657";
var background_img = 'http://cdn.discordapp.com/attachments/423966721020395525/504644028445229056/houroumusuko_bg3.png';
var autostart_msg = "start!";
var countdown_utc = {
	year: 2018,
	month: 10,
	day: 31,
	hour: 23,
	minute: 0,
	second: 0,
};
var countdown_utc2 = {
	year2: 2018,
	month2: 11,
	day2: 2,
	hour2: 23,
	minute2: 0,
	second2: 0
};
var background_img_auto = 'http://cdn.discordapp.com/attachments/423966721020395525/504644028445229056/houroumusuko_bg3.png';
var background_img_auto2 = 'http://cdn.discordapp.com/attachments/466386319766192138/482682073799196674/hxh_wallpaper_4.jpg';
var chatMute = 'false';
var background_img_auto3 = 'http://getreelcinemas.com//wp-content/uploads/2015/02/Background-Narrow.jpg';
//-----------------------------------------------------------------------------------------------------------------------------------
//ControlBlockEnd
console.log = function() {}
var emoteTable = "false";
const second = 1000,
	minute = second * 60,
	hour = minute * 60,
	day = hour * 24;
var emoteArray = [];
var selectedPopover;
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
	'/savebg1': function(chatCmdText) {
		if (chatCmdText.length > 1 && rankAdmin) {
			var url = chatCmdText[1].replace('https:', 'http:');
			chatCmdText[1] = url;
			editJs(22, chatCmdText);
			window.socket.emit("chatMsg", {
				msg: "bg1 saved " + url
			});
		}
	},
	'/savebg2': function(chatCmdText) {
		if (chatCmdText.length > 1 && rankAdmin) {
			var url = chatCmdText[1].replace('https:', 'http:');
			chatCmdText[1] = url;
			editJs(23, chatCmdText);
			window.socket.emit("chatMsg", {
				msg: "bg2 saved " + url
			});
		}
	},

	'/savebg3': function(chatCmdText) {
		if (chatCmdText.length > 1 && rankAdmin) {
			var url = chatCmdText[1].replace('https:', 'http:');
			chatCmdText[1] = url;
			editJs(25, chatCmdText);
			window.socket.emit("chatMsg", {
				msg: "bg3 saved " + url
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
	'/cdlocal1': function(chatCmdText) {
		if (chatCmdText.length > 5 && rankAdmin) {
			if (!(!isNaN(chatCmdText[1]) || !isNaN(chatCmdText[2]) || !isNaN(chatCmdText[3]) || !isNaN(chatCmdText[4]) || !isNaN(chatCmdText[5]))) {
				window.socket.emit("chatMsg", {
					msg: "error: invalid countdown input"
				});
				return false;
			}
			var date = new Date(chatCmdText[1], chatCmdText[2]-1, chatCmdText[3], chatCmdText[4], chatCmdText[5]);
			var textField = jsTextField.val();
			var textFieldArray = textField.split("\n");
			var year = textFieldArray[7].substr(0, textFieldArray[7].lastIndexOf(': '));
			textField = textField.replace(textFieldArray[7], year + ": " + date.getUTCFullYear() + ",");
			var month = textFieldArray[8].substr(0, textFieldArray[8].lastIndexOf(': '));
			textField = textField.replace(textFieldArray[8], month + ": " + (date.getUTCMonth()+1) + ",");
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
			imgEmote(chatCmdText[1]);
		}
	},

	'/skip': function(chatCmdText) {
		if (rankMod) {
			var target = $(document.getElementsByClassName('queue_active'));
			if (target.length > 0) {
				var name = target.find('.qe_title')[0].innerHTML;
				/*window.socket.emit("chatMsg", {
					msg: "removed [" + name + "]"
				});*/
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

			var date = new Date(chatCmdText[1], chatCmdText[2]-1, chatCmdText[3], chatCmdText[4], chatCmdText[5]);
			var textField = jsTextField.val();
			var textFieldArray = textField.split("\n");
			var year = textFieldArray[15].substr(0, textFieldArray[15].lastIndexOf(': '));
			textField = textField.replace(textFieldArray[15], year + ": " + date.getUTCFullYear() + ",");
			var month = textFieldArray[16].substr(0, textFieldArray[16].lastIndexOf(': '));
			textField = textField.replace(textFieldArray[16], month + ": " + (date.getUTCMonth()+1) + ",");
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
	'/setbg1': function() {
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

	'/setbg3': function() {
		if (rankAdmin) {
			let textArray = [0, background_img_auto3];
			editJs(4, textArray);
			window.socket.emit("chatMsg", {
				msg: "loading bg3"
			});
		}
	},

	'/muteall': function() {
		if (rankAdmin) {
			chatMute = "false";
			editJs(24, [0, chatMute]);
			window.socket.emit("chatMsg", {
				msg: "chatMute: " + chatMute
			});
		}
	},
	'/unmuteall': function() {
		if (rankAdmin) {
			chatMute = "true";
			editJs(24, [0, chatMute]);
			window.socket.emit("chatMsg", {
				msg: "chatMute: " + chatMute
			});
		}
	},
	'!schwing': function() {
		imgEmote('http://cdn.discordapp.com/attachments/409829343263719427/497929642347331585/main-qimg-bdbe459c69a03bbd0859657a0c96f9e0.png');
	},
	'!rigged': function() {
		imgEmote('https://images-ext-2.discordapp.net/external/A29xgZ_hAwsgSPzak5tlWkMJwUnYH7kFnixuX2zGWZ8/https/bit.ly/2CX6c8G?width=400&height=225');
	},
	'!piano': function() {
		imgEmote('https://cdn.discordapp.com/attachments/420183063562027008/451551850433478656/2bbhq2.png');
	},
	'!rule1': function() {
		window.socket.emit("chatMsg", {
				msg: "Club rule #1 - |You will never, ever be picked.  Just accept it.|"
		});
	},
	'!rule2': function() {
		window.socket.emit("chatMsg", {
				msg: "Club rule #2 - |Don't make Mareepy angry.|"
		});
	},
	'!rule3': function() {
		window.socket.emit("chatMsg", {
				msg: "Club rule #3 - |All server rules still apply. In short, don't be a jerk.|"
		});
	},
	'!rule4': function() {
		window.socket.emit("chatMsg", {
				msg: "Club rule #4 - |It's fine to dislike a show and voice your opinion on it, but provide constructive criticism on why it's bad rather than \"OMG lul, this show bad\"|"
		});
	},
	'!rule5': function() {
		window.socket.emit("chatMsg", {
				msg: "Club rule #5 - |You must watch/rewatch the whole series AND discuss it in the server chatroom to qualify for a ticket.|"
		});
	},
	'!rule6': function() {
		window.socket.emit("chatMsg", {
				msg: "Club rule #6 - |Lying about your participation will be severely penalized, possibly with a suspension from the club.|"
		});
	},
	'!rule7': function() {
		window.socket.emit("chatMsg", {
				msg: "Club rule #7 - |Don't talk trash about a club pick until we've at least started watching it. Try to give everything a fair chance.|"
		});
	},
	'!rule8': function() {
		window.socket.emit("chatMsg", {
				msg: "Club rule #8 - |Pat Poes for good luck!|"
		});
	}
};

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
		url: "https://rawgit.com/gimmic234/cytube_backup/266e64019aca11d7c69051ce2308096b5bbecf46/current-ext.js",
		callback: true
	},
	'layout': {
		active: 1,
		rank: -1,
		url: "https://raw.githack.com/gimmic234/cytube_backup/5ad2e4d46b08301053c7083b419f0e41c4168eec/module/channelbase-mod.js",
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
				$(document.getElementById('date1')).html(new Date(date_utc).toString());
				countdown2 = document.getElementById('countdown2');
				$(document.getElementById('date2')).html(new Date(date_utc2).toString());
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

				if (distance < 0) {
					clearInterval(countDownTimer);
					$('#countdown1').hide();
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

				if (distance2 < 0) {
					clearInterval(countDownTimer2);
					$('#countdown2').hide();
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