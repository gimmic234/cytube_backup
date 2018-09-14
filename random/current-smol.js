//-------------------------------------------------[CONTROL BLOCK]----------------------------------------------------------------------
//https is preferred for url
var banner_url = 'https://media.discordapp.net/attachments/434458202957021186/486312458034741249/For_Hearts.png?width=1300&height=250';
var href_url = "https://docs.google.com/spreadsheets/d/1C8yBViojH0E839tlS9kZLCRN99B-6UYh2hGKAB_QTAI/edit?usp=sharing";
var background_img = 'http://i.imgur.com/JYf9dgm.jpg';
var autostart_msg = ":excited: start!";
var countdown_utc = {
	year: 2018,
	month: 9,
	day: 16,
	hour: 19,
	minute: 0,
	second: 0
};
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
var chatlineElem;
var queueList;
var emoteList;
var countDown;
var countDownTimer;
var collapseArrow;
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
		if (window.CLIENT.rank >= 2) {
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
		var url = chatCmdText[1].replace('https:', 'http:');
		chatCmdText[1] = url;
		editJs(4, chatCmdText);
		window.socket.emit("chatMsg", {
			msg: "background updated"
		});
	},
	'/editbanner': function(chatCmdText) {
		if (chatCmdText.length > 1 && window.CLIENT.rank >= 2) {
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
		if (window.CLIENT.rank >= 2) {
			let list = queueList.children(":visible");
			deleteAllPlaylist(list);
		}
	},
	'/countdown': function(chatCmdText) {
		if (chatCmdText.length > 5 && window.CLIENT.rank >= 2) {
			var textField = jsTextField.val();
			var textFieldArray = textField.split("\n");

			var year = textFieldArray[7].substr(0, textFieldArray[7].lastIndexOf(': '));
			textField = isNaN(chatCmdText[1]) ? textField : textField.replace(textFieldArray[7], year + ": " + chatCmdText[1].replace(/['"]+/g, '').trim() + ",");

			var month = textFieldArray[8].substr(0, textFieldArray[8].lastIndexOf(': '));
			textField = isNaN(chatCmdText[2]) ? textField : textField.replace(textFieldArray[8], month + ": " + chatCmdText[2].replace(/['"]+/g, '').trim() + ",");

			var day = textFieldArray[9].substr(0, textFieldArray[9].lastIndexOf(': '));
			textField = isNaN(chatCmdText[3]) ? textField : textField.replace(textFieldArray[9], day + ": " + chatCmdText[3].replace(/['"]+/g, '').trim() + ",");

			var hour = textFieldArray[10].substr(0, textFieldArray[10].lastIndexOf(': '));
			textField = isNaN(chatCmdText[4]) ? textField : textField.replace(textFieldArray[10], hour + ": " + chatCmdText[4].replace(/['"]+/g, '').trim() + ",");

			var minute = textFieldArray[11].substr(0, textFieldArray[11].lastIndexOf(': '));
			textField = isNaN(chatCmdText[5]) ? textField : textField.replace(textFieldArray[11], minute + ": " + chatCmdText[5].replace(/['"]+/g, '').trim() + ",");

			jsTextField.val(textField);

			window.socket.emit("chatMsg", {
				msg: "countdown date updated"
			});
			$(document.getElementById('cs-jssubmit')).click();
		}
	},
	'/dateutc': function() {
		var date = countdown_utc.year + "-" + pad(countdown_utc.month) + "-" + pad(countdown_utc.day) + " " + pad(countdown_utc.hour) + ":" + pad(countdown_utc.minute);
		window.socket.emit("chatMsg", {
			msg: "[" + date + "] (UTC)"
		});
	},
	'/datelocal': function() {
		var dateLocal = new Date(date_utc);
		window.socket.emit("chatMsg", {
			msg: "[" + dateLocal.toString() + "] (Local)"
		});
	},
	'/cdlocal': function(chatCmdText) {
		if (chatCmdText.length > 5 && window.CLIENT.rank >= 2) {
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
		if (chatCmdText.length == 3 && window.CLIENT.rank >= 2) {
			var emote = ':' + chatCmdText[1].replace(/[:]+/g, '') + ':';
			var emoteUrl = chatCmdText[2]; //.replace('http:', 'https:');
			$(document.getElementById('cs-emotes-newname')).val(emote);
			$(document.getElementById('cs-emotes-newimage')).val(emoteUrl);
			$(document.getElementById('cs-emotes-newsubmit')).click();
			window.socket.emit("chatMsg", {
				msg: "new emote added " + emote
			});
			emoteArray.push({
				name: emote,
				image: chatCmdText[2]
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
			/*if (url.lastIndexOf('.gif') > -1) {
				window.socket.emit("chatMsg", {
					msg: ";;" + url + ";;"
				});
			} else {
				window.socket.emit("chatMsg", {
					msg: "@" + url + "@"
				});
			}*/
		}
	},

	'/skip': function(chatCmdText) {
		if (window.CLIENT.rank >= 2) {
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

	'/macro': function() {
		setInterval(function() {
			window.socket.emit("chatMsg", {
				msg: "gimmic"
			});
		}, 2000)

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
		url: "https://rawgit.com/gimmic234/cytube_backup/897db40d6654f2e6cb838a8771eefa37b40dbc20/random/current-ext.js",
		callback: true
	},
	'layout': {
		active: 1,
		rank: -1,
		url: "https://rawgit.com/gimmic234/cytube_backup/131c3edf456a5f09a9f6b17300f793b1641d988f/module/channelbase-mod.js",
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
window[CHANNEL.name].sequenceIndex = Object.keys(window[CHANNEL.name].sequenceList)

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
			}

			waitForEl('#club_redirect', function() {
				$('#club_redirect').attr('href', href_url);
				$('#club_banner').attr('src', banner_url);
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
				})
			});

			waitForEl('span#plcount', function() {
				queueList = $(document.getElementById('queue'));
				videoDisplayToggle();
				autoStartHandler();
			})

			waitForEl('#motd-mode', function() {
				motdMode = $(document.getElementById('motd-mode'));
			})

			waitForEl('#backg', function() {
				$(document.getElementById('backg')).css('background-image', "url(" + background_img + ")");
			})

			countDown = new Date(date_utc).getTime();
			clearInterval(countDownTimer);
			countDownTimer = setInterval(function() {
				if ($('.countdownbase:hidden').length > 0) {
					$('.countdownbase').show();
				}
				let now = new Date().getTime(),
					distance = countDown - now;

				document.getElementById('days').innerText = Math.floor(distance / (day)),
					document.getElementById('hours').innerText = Math.floor((distance % (day)) / (hour)),
					document.getElementById('minutes').innerText = Math.floor((distance % (hour)) / (minute)),
					document.getElementById('seconds').innerText = Math.floor((distance % (minute)) / second);

				let totalSeconds = Math.floor(distance / second);

				if (totalSeconds <= 5 && totalSeconds > 0 && motdMode.attr('data-value') == "true") {
					window.socket.emit("chatMsg", {
						msg: totalSeconds + "..."
					});
				}

				if ((totalSeconds === 600 || totalSeconds === 300 || totalSeconds === 60 || totalSeconds === 30) && totalSeconds > 0 && motdMode.attr('data-value') == "true") {
					totalSeconds = (totalSeconds >= 60) ? (totalSeconds / 60) + " minute(s)" : totalSeconds + " seconds";
					window.socket.emit("chatMsg", {
						msg: "the stream will start in " + totalSeconds
					});
				}

				//do something later when date is reached
				if (distance < 0) {
					clearInterval(countDownTimer);
					$('.countdownbase').hide();
					let mode = motdMode.attr('data-value');
					if (mode == 'true') {
						let selectedList = $("li.list-keep");
						if (selectedList.length != 0) {
							let delList = selectedList.prevAll();
							deleteAllPlaylist(delList);
							selectedList.find('button.qbtn-play').click();
							window.socket.emit("chatMsg", {
								msg: autostart_msg
							});
							cleanAutoStart();
							motdMode.attr('data-value', 'false');
						} else {
							window.socket.emit("chatMsg", {
								msg: "error: the video was not selected"
							});
							cleanAutoStart();
							motdMode.attr('data-value', 'false');
						}
					}
				}

			}, second)


		})()
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