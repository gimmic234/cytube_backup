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
				selectedPopover = $('.emote-table tbody').children().first().addClass('active');
			}
		} else {
			selectedPopover = $('.emote-table tbody').children().first().addClass('active');
		}
	},
	38: function(e) {
		if (selectedPopover) {
			selectedPopover.removeClass('active');
			next = selectedPopover.prev();
			if (next.length > 0) {
				selectedPopover = next.addClass('active');
			} else {
				selectedPopover = $('.emote-table tbody').children().last().addClass('active');
			}
		} else {
			selectedPopover = $('.emote-table tbody').children().last().addClass('active');
		}
	},
	9: function(e) {
		emoteSelectSubmit(e);
	}
};

var chatKeyLookup = {
	13: function(e) {
		if (window.CHATTHROTTLE || (window.CLIENT.rank < 2 && chatMute)) {
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

function setAutobg() {
	let textArray = [0, background_img_auto];
	editJs(4, textArray);
}

function countdownMsg(totalSeconds) {
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
}

function countdownComplete() {
	let mode = motdMode.attr('data-value');
	if (mode == 'true') {
		let selectedList = $("li.list-keep");

		setAutobg();

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

function getAutoPosition() {
	let mode = motdMode.attr('data-value');
	if (mode == "true") {
		var target = $("li.list-keep");
		if (target.length > 0) {
			autoPosition = queueList.children().index(target);
			console.log(autoPosition);
		}
	}
}

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
	//autoPosition = -1;
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
		});
		//getAutoPosition();
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
			//autoPosition = -1;
		});

		if (!toggle) {
			listElem.addClass('list-keep');
			//getAutoPosition();
			let name = listElem.find('a.qe_title')[0].innerHTML;
			window.socket.emit("chatMsg", {
				msg: "Autostart - [" + name + "]"
			});
		}
	});

	$(bodyElem).on('DOMSubtreeModified', '#plcount', function(e) {
		videoDisplayToggle();
		autoStartHandler();
		//getAutoPosition();
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
		var video = $(this).parent().parent().children('a')[0].innerHTML;
		/*window.socket.emit("chatMsg", {
			msg: "removed [" + video + "]"
		});*/
		$(this).click();
	});

	$(window).focus(function(e) {
		$(document.getElementById('chatline')).focus();
	});
	$(bodyElem).on('keydown', function(e) {
		if (!document.activeElement.classList.contains('form-control') && !document.getElementById('channeloptions').classList.contains('in') && (document.activeElement != document.getElementById('chatline')) && (e.which == 13 || e.which == 9)) {
			e.preventDefault();
			$(document.getElementById('chatline')).focus();
		}
	});

	$(bodyElem).on('mouseover', '.lazy', function() {
		$(this).attr('src', $(this).attr('data-src'));
		$(this).removeClass('lazy');
	});

	window.socket.on('updateEmote', function() {
		fetchEmote();
	});

	window.socket.on('removeEmote', function() {
		fetchEmote();
	});

	window.socket.on('renameEmote', function() {
		fetchEmote();
	});

}