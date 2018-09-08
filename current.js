//-------------------------------------------------[CONTROL BLOCK]----------------------------------------------------------------------
//https is preferred for url
var banner_url = "https://media.discordapp.net/attachments/434458202957021186/486312458034741249/For_Hearts.png";
var href_url = "https://docs.google.com/spreadsheets/d/1C8yBViojH0E839tlS9kZLCRN99B-6UYh2hGKAB_QTAI/edit?usp=sharing";
var background_img = 'http://i.imgur.com/R4vXIoV.jpg';
var autostart_msg = ":excited: start!";
var countdown_utc = {
	year: 2018,
	month: 9,
	date: 9,
	hour: 19,
	minute: 0,
	second: 0
};
var anime = "parasyte";
//-----------------------------------------------------------------------------------------------------------------------------------
//ControlBlockEnd

var emoteArray = [];
var selectedPopover;
var emoteTable;
var handlerKeydown;
var date_utc = Date.UTC(countdown_utc.year, countdown_utc.month - 1, countdown_utc.date, countdown_utc.hour, countdown_utc.minute, countdown_utc.second);
var chatlineElem;
var queueList;
var emoteList;
var motdMode = $(document.getElementById('motd-mode'));
var collapseArrow;
var jsTextField = $(document.getElementById('cs-jstext'));
var bodyElem = document.body;
var keyInjectionList = [9, 13, 38, 40];
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
					msg: "[autostart on]"
				});
			} else {
				queueList.find("button.btn-auto-keep").remove();
				list.each(function(index, value) {
					$(value).removeClass('list-keep');
				})
				motdMode.attr('data-value', 'false');
				window.socket.emit("chatMsg", {
					msg: "[autostart off]"
				});
			}
		}
	},
	'/editbg': function(chatCmdText) {
		editJs(4, chatCmdText);
		window.socket.emit("chatMsg", {
			msg: "background updated"
		});
	},
	'/editbanner': function(chatCmdText) {
		editJs(2, chatCmdText);
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

			var date = textFieldArray[9].substr(0, textFieldArray[9].lastIndexOf(': '));
			textField = isNaN(chatCmdText[3]) ? textField : textField.replace(textFieldArray[9], date + ": " + chatCmdText[3].replace(/['"]+/g, '').trim() + ",");

			var hour = textFieldArray[10].substr(0, textFieldArray[10].lastIndexOf(': '));
			textField = isNaN(chatCmdText[4]) ? textField : textField.replace(textFieldArray[10], hour + ": " + chatCmdText[4].replace(/['"]+/g, '').trim() + ",");

			var minute = textFieldArray[11].substr(0, textFieldArray[11].lastIndexOf(': '));
			textField = isNaN(chatCmdText[5]) ? textField : textField.replace(textFieldArray[11], minute + ": " + chatCmdText[5].replace(/['"]+/g, '').trim() + ",");

			jsTextField.val(textField);
			clearInterval(x);
			$(document.getElementById('cs-jssubmit')).click();
		}
	},
	'/dateutc': function() {
		var date = countdown_utc.year + "-" + pad(countdown_utc.month) + "-" + pad(countdown_utc.date) + " " + pad(countdown_utc.hour) + ":" + pad(countdown_utc.minute);
		window.socket.emit("chatMsg", {
			msg: "stream date: [" + date + "] (UTC)"
		});
	},
	'/datelocal': function() {
		var dateLocal = new Date(date_utc);
		window.socket.emit("chatMsg", {
			msg: "stream date: [" + dateLocal.toString() + "] (Local)"
		});
	}	
};

var emoteKeyLookup = {
	13: function(e) {
		emoteSelectSubmit(e);
	},
	40: function(e) {
		if (selectedPopover) {
			selectedPopover.removeClass('active');
			next = selectedPopover.next();
			if (next.length > 0) {
				selectedPopover = next.addClass('active');
			} else {
				selectedPopover = selectedPopover.eq(0).addClass('active');
			}
		} else {
			selectedPopover = selectedPopover.eq(0).addClass('active');
		}
	},
	38: function(e) {
		if (selectedPopover) {
			selectedPopover.removeClass('active');
			next = selectedPopover.prev();
			if (next.length > 0) {
				selectedPopover = next.addClass('active');
			} else {
				selectedPopover = selectedPopover.last().addClass('active');
			}
		} else {
			selectedPopover = selectedPopover.last().addClass('active');
		}
	},
	9: function(e) {
		emoteSelectSubmit(e);
	}
};

var chatKeyLookup = {
	13: function(e) {
		if (window.CHATTHROTTLE) {
			return;
		}

		var msg = chatlineElem.val().trim();

		if (msg !== '') {
			var meta = {};

			if (window.USEROPTS.adminhat && window.CLIENT.rank >= 255) {
				msg = "/a " + msg;
			} else if (window.USEROPTS.modhat && window.CLIENT.rank >= window.Rank.Moderator) {
				meta.modflair = window.CLIENT.rank;
			}

			// The /m command no longer exists, so emulate it clientside
			if (window.CLIENT.rank >= 2 && msg.indexOf("/m ") === 0) {
				meta.modflair = window.CLIENT.rank;
				msg = msg.substring(3);
			}

			var chatCmdText = msg.split(" ");

			if (chatCmdLookup.hasOwnProperty(chatCmdText[0])) {
				chatCmdLookup[chatCmdText[0]](chatCmdText);
			} else {
				window.socket.emit("chatMsg", {
					msg: msg,
					meta: meta
				});
			}


			window.CHATHIST.push(chatlineElem.val());
			window.CHATHISTIDX = window.CHATHIST.length;
			chatlineElem.val('');
		}

		return;
	},
	9: function(e) {
		e.preventDefault();
		return false;
	},
	38: function(e) {
		if (window.CHATHISTIDX === window.CHATHIST.length) {
			window.CHATHIST.push(chatlineElem.val());
		}
		if (window.CHATHISTIDX > 0) {
			window.CHATHISTIDX--;
			chatlineElem.val(window.CHATHIST[window.CHATHISTIDX]);
		}

		e.preventDefault();
		return false;
	},
	40: function(e) {
		if (window.CHATHISTIDX < window.CHATHIST.length - 1) {
			window.CHATHISTIDX++;
			chatlineElem.val(window.CHATHIST[window.CHATHISTIDX]);
		}

		e.preventDefault();
		return false;
	}
}

var emoteSelectSubmit = function(e) {
	if (selectedPopover) {
		e.preventDefault();
		appendEmote($('tr.active'));
		emoteList.hide();
		selectedPopover = null;
		emoteTable = false;
	}
	return false;
}

var editJs = function(fieldIndex, chatCmdText) {
	if (chatCmdText.length > 1 && window.CLIENT.rank >= 2) {
		var textField = jsTextField.val();
		var textFieldArray = textField.split("\n");
		var firstBlock = textFieldArray[fieldIndex].substr(0, textFieldArray[fieldIndex].lastIndexOf(' = ') + 1);
		textField = textField.replace(textFieldArray[fieldIndex], firstBlock + "= '" + chatCmdText[1].replace(/['"]+/g, '').trim() + "';");
		jsTextField.val(textField);
		clearInterval(x);
		$(document.getElementById('cs-jssubmit')).click();
	}
}

var waitForEl = function(selector, callback) {
	if ($(selector).length) {
		callback();
	} else {
		setTimeout(function() {
			waitForEl(selector, callback);
		}, 100);
	}
};

function pad(d) {
	return (d < 10) ? '0' + d.toString() : d.toString();
}

function chatHandler(e) {

	if (emoteTable) {
		e.stopImmediatePropagation();
		if (emoteKeyLookup.hasOwnProperty(e.which)) {
			emoteKeyLookup[e.which](e);
		}
	} else {
		if (chatKeyLookup.hasOwnProperty(e.which)) {
			chatKeyLookup[e.which](e);
		}
	}

	return true;
};

function preloadImages(array) {
	if (!preloadImages.list) {
		preloadImages.list = [];
	}
	var list = preloadImages.list;
	for (var i = 0; i < array.length; i++) {
		var img = new Image();
		img.onload = function() {
			var index = list.indexOf(this);
			if (index !== -1) {
				list.splice(index, 1);
			}
		}
		list.push(img);
		img.src = array[i];
	}
}

function deleteAllPlaylist(delList) {
	delList.each(function(index, elem) {
		$(elem).find('button.qbtn-delete').click();
	})
}

function cleanAutoStart() {
	let list = queueList.children(":visible");
	queueList.find("button.btn-auto-keep").remove();
	list.each(function(index, value) {
		$(value).removeClass('list-keep');
	})
}

function fetchEmote() {
	emoteArray = CHANNEL.emotes.map(function(e) {
		return {
			name: e.name,
			image: e.image
		}
	});
}

function videoDisplayToggle() {
	let next = $(document.getElementById('plcount'))[0].innerHTML;
	if (next == "0 items") {
		$(document.getElementById('videowrap')).hide();
	} else {
		$(document.getElementById('videowrap')).show();
	}
}

function autoStartHandler() {
	let mode = motdMode.attr('data-value');
	if (mode == "true") {
		queueList.find("button.btn-auto-keep").remove();
		let list = queueList.children(":visible");
		list.each(function(index, value) {
			$(value).find("button.qbtn-next").before("<button class='btn btn-xs btn-default btn-auto-keep'><span class='glyphicon glyphicon-ok'></span>AutoStart</button>");
		})
	}
}

function populateEmote() {
	fetchEmote();
	chatlineElem.before("<div id='emote-data-field' hidden></div>");
	emoteList = $(document.getElementById('emote-data-field'));
	preloadImages(emoteArray.map(emote => emote.image));
}

function appendEmote(elem) {
	let text = chatlineElem.val();
	let index = text.lastIndexOf(" ");
	chatlineElem.val("");
	chatlineElem.val(text.substr(0, index + 1) + elem.attr('data-value'));
	chatlineElem.focus();
}

function bindEventHandler() {

	$(bodyElem).on('click', '#emote-data-field', function(e) {
		appendEmote($(e.target).closest('tr'));
		emoteList.hide();
		emoteTable = false;
	})

	$(bodyElem).on('input', '#chatline', function(e) {
		let index = this.value.lastIndexOf(" ");
		let lastText = this.value.substr(index + 1);
		let chat = $(this);
		if (lastText.substr(0, 1) == ':' && lastText.length > 2) {
			emoteList[0].innerHTML = "";
			let filteredEmote = emoteArray.filter(emote => (emote.name.indexOf(lastText.substr(1, lastText.length)) > -1));
			if (lastText.substr(lastText.length - 1) == ':' || filteredEmote.length == 0) {
				emoteList.hide();
				selectedPopover = null;
				emoteTable = false;
			} else {
				let emoteString = "<table class='table table-sm table-hover emote-table'><tbody>";
				filteredEmote.forEach(function(value, index) {
					let active = (index == 0) ? "active" : "";
					emoteString += "<tr class='selectEmote " + active + "' data-value='" + value.name + "'>";
					emoteString += "<td width='20%'><img class='smol-emote' src='" + value.image + "'></td>";
					emoteString += "<td width='80%'>" + value.name + "</td>";
					emoteString += "</tr>";
				})
				emoteString += "</tbody></table>";
				emoteList[0].innerHTML = emoteString;
				selectedPopover = $('tr.active');
				emoteTable = true;
				emoteList.show();
			}
		} else {
			chatlineElem.on('keydown', handlerKeydown);
			emoteList.hide();
			selectedPopover = null;
			emoteTable = false;
		}
	});

	$(bodyElem).on('click', '#emotelistbtn', function() {
		fetchEmote();
	})

	$(bodyElem).on('focusout', '#chatline', function() {
		if (emoteList[0].matches(':hover')) {
			return false;
		}
		emoteList.hide();
		emoteTable = false;
	});

	$(bodyElem).on('click', '.btn-auto-keep', function() {
		let listElem = $(this).closest('li');
		let list = queueList.children(":visible");
		let toggle = listElem.hasClass('list-keep');

		list.each(function(index, value) {
			$(value).removeClass('list-keep');
		});

		if (toggle) {
			listElem.removeClass('list-keep');
		} else {
			listElem.addClass('list-keep');
		}
		let name = listElem.find('a.qe_title')[0].innerHTML;
		window.socket.emit("chatMsg", {
			msg: "Autostart - [" + name + "]"
		});
	});

	$(bodyElem).on('DOMSubtreeModified', '#plcount', function(e) {
		videoDisplayToggle();
		autoStartHandler();
	});

	$(bodyElem).on('click', '.export', function() {
		let text = $('#cs-chanlog-text').text().replace(/\n/g, "\r\n");
		this.href = "data:text/plain;charset=UTF-8," + encodeURIComponent(text);
	});

	$(bodyElem).on('hidden.bs.collapse', '#collapseMessage', function() {
		collapseArrow[0].classList.remove('glyphicon-chevron-up');
		collapseArrow[0].classList.add('glyphicon-chevron-down');
	});

	$(bodyElem).on('show.bs.collapse', '#collapseMessage', function() {
		collapseArrow[0].classList.remove('glyphicon-chevron-down');
		collapseArrow[0].classList.add('glyphicon-chevron-up');
	});

	$(bodyElem).on('mousedown', '.qbtn-delete', function() {
		$(this).prop('disabled', true);
		$(this).click();
		window.socket.emit("chatMsg", {
			msg: "video deleted"
		});
	});

}

$(document).ready(function() {
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
})
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
	'layout': {
		active: 1,
		rank: -1,
		url: "https://rawgit.com/gimmic234/cytube_backup/6479a79289442240f6a13bfbfcd2ca28ef2092f5/channelbase-mod.min.js",
		callback: true
	},
	'channel': {
		active: 1,
		rank: -1,
		url: "https://rawgit.com/gimmic234/cytube_backup/067c40e2d8dab045009b7f666cc541a1c8923a32/enhancer-mod.min.js",
		callback: true
	},
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
			console.log("Xaekai's Script Sequencer: Loading Complete.")
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
window[CHANNEL.name].sequencerLoader()

$(".navbar-brand").text("Anime Club");

const second = 1000,
	minute = second * 60,
	hour = minute * 60,
	day = hour * 24;

let countDown = new Date(date_utc).getTime(),
	x = setInterval(function() {
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
			clearInterval(x);
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