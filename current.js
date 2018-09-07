//-------CONTROL BLOCK-------------------------------------------------------------------------------------------------------------
var banner_url = "http://media.discordapp.net/attachments/434458202957021186/486312458034741249/For_Hearts.png";
var href_url = "https://docs.google.com/spreadsheets/d/1C8yBViojH0E839tlS9kZLCRN99B-6UYh2hGKAB_QTAI/edit?usp=sharing";
var autostart_msg = ":excited: start!";
var countdown_utc = {
	year: 2018,
	month: 9,
	date: 9,
	hour: 19,
	minute: 0,
	second: 0
};
//-----------------------------------------------------------------------------------------------------------------------------------

var emoteArray = [];
var selectedPopover;
var emoteTable;
var handlerKeydown;
var date_utc = Date.UTC(countdown_utc.year, countdown_utc.month - 1, countdown_utc.date, countdown_utc.hour, countdown_utc.minute, countdown_utc.second);
var chatline;
var queueList;
var emoteList;
var motdMode = $(document.getElementById('motd-mode'));


var waitForEl = function(selector, callback) {
	if ($(selector).length) {
		callback();
	} else {
		setTimeout(function() {
			waitForEl(selector, callback);
		}, 100);
	}
};

function chatHandler(e) {
	if (emoteTable) {
		e.stopImmediatePropagation();
		switch (e.which) {
			case 13:
			case 9:
				if (selectedPopover) {
					e.preventDefault();
					appendEmote($('tr.active'));
					emoteList.hide();
					selectedPopover = null;
					emoteTable = false;
				}
				return false;
				break;

			case 40:
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
				break;

			case 38:
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
				break;

			default:
				break;
		}
	} else {
		//not emote
        if(e.keyCode === 13) {
            if (window.CHATTHROTTLE) {
                return;
            }

            var msg = chatline.val().trim();

            if(msg !== '') {
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
                
                let text = msg.split(" ");
               
                if (text[0] == '/addq') {
                    if (text.length > 1) {
                        text.shift();
                        text.forEach(function(value) {
                            $(document.getElementById('mediaurl')).val(value);
                            $(document.getElementById('queue_end')).click();
                        })
                    }
                }
                else if (text[0] == "/autostart" && window.CLIENT.rank >= 2){
				    let toggle_mode = motdMode.attr('data-value');
                    toggle_mode = (toggle_mode == "true") ? "false" : "true";
                    motdMode.attr('data-value', toggle_mode);

                    let list = queueList.children(":visible");
                    let new_mode = motdMode.attr('data-value');
                    if (new_mode == "true") {
                        list.each(function(index, value) {
                            $(value).find("button.qbtn-next").before("<button class='btn btn-xs btn-default btn-auto-keep'><span class='glyphicon glyphicon-ok'></span>AutoStart</button>");
                            $(value).attr('data-keep', 'false');
                        })
                        window.socket.emit("chatMsg", {msg: "autostart on"});
                    } else {
                        queueList.find("button.btn-auto-keep").remove();
                        list.each(function(index, value) {
                            $(value).removeAttr('data-keep');
                            $(value).removeClass('list-keep');
                        })
                        motdMode.attr('data-value', 'false');
                        window.socket.emit("chatMsg", {msg: "autostart off"});
                    }


				} else {
                    window.socket.emit("chatMsg", {msg: msg, meta: meta});
                }


                window.CHATHIST.push($("#chatline").val());
                window.CHATHISTIDX = window.CHATHIST.length;
                chatline.val('');
            }

            return;
        } else if(e.keyCode === 9) { // Tab completion
            window.chatTabComplete();
            e.preventDefault();
            return false;
        } else if(e.keyCode === 38) { // Up arrow (input history)
            if(window.CHATHISTIDX === window.CHATHIST.length) {
                window.CHATHIST.push($("#chatline").val());
            }
            if(window.CHATHISTIDX > 0) {
                window.CHATHISTIDX--;
                chatline.val(window.CHATHIST[window.CHATHISTIDX]);
            }

            e.preventDefault();
            return false;
        } else if(e.keyCode === 40) { // Down arrow (input history)
            if(window.CHATHISTIDX < window.CHATHIST.length - 1) {
                window.CHATHISTIDX++;
                chatline.val(window.CHATHIST[window.CHATHISTIDX]);
            }

            e.preventDefault();
            return false;
        }
	}
	return true;
};

function cleanAutoStart() {
	let list = queueList.children(":visible");
	queueList.find("button.btn-auto-keep").remove();
    list.each(function(index, value) {
        $(value).removeAttr('data-keep');
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
			$(value).attr('data-keep', 'false');
		})
	}
}

function populateEmote() {
	fetchEmote();
	chatline.before("<div id='emote-data-field' hidden></div>");
	let events = $._data(chatline.get(0), "events");
	handlerKeydown = events['keydown'][0].handler;
	emoteList = $(document.getElementById('emote-data-field'));
}

function appendEmote(elem) {
	let text = chatline.val();
	let index = text.lastIndexOf(" ");
	chatline.val("");
	chatline.val(text.substr(0, index+1) + elem.attr('data-value'));
	chatline.focus();
}

$('body').on('click', '#emote-data-field', function(e) {
	appendEmote($(e.target).closest('tr'));
	emoteList.hide();
})

$('body').on('input', 'input#chatline', function(e) {
	let index = this.value.lastIndexOf(" ");
	let lastText = this.value.substr(index+1);
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
		chatline.on('keydown', handlerKeydown);
		emoteList.hide();
		selectedPopover = null;
		emoteTable = false;
	}
});

$('body').on('click', '#emotelistbtn', function() {
	fetchEmote();
})

$('body').on('focusout', 'input#chatline', function() {
	setTimeout(function() {
		emoteList.hide();
	}, 1000);
});

$('body').on('click', 'button.btn-auto-keep', function() {
	let listElem = $(this).closest('li');
	let list = queueList.children(":visible");
	let toggle = listElem.attr('data-keep');

	toggle = (toggle == 'false') ? 'true' : 'false';

	list.each(function(index, value) {
		$(value).attr('data-keep', 'false');
        $(value).removeClass('list-keep');
	});

	if (toggle == 'false') {
		listElem.removeClass('list-keep');
	} else {
		listElem.addClass('list-keep');
	}
	listElem.attr('data-keep', toggle);
	let name = listElem.find('a.qe_title')[0].innerHTML;
	window.socket.emit("chatMsg", {msg: "Autostart - ["+ name+"]"});	
});

$("body").on('DOMSubtreeModified', '#plcount', function(e) {
	videoDisplayToggle();
	autoStartHandler();
})

$('body').on('click', 'a.export', function() {
	let text = $('#cs-chanlog-text').text().replace(/\n/g, "\r\n");
	this.href = "data:text/plain;charset=UTF-8," + encodeURIComponent(text);
});

$('document').ready(function() {
	$('#cs-chanlog').append(" <a class='export' id='export-btn' href='#' download='chat.txt'><button class='btn btn-default'>Export</button></a>");

	waitForEl('#club_redirect', function() {
		$('#club_redirect').attr('href', href_url);
	});

	waitForEl('#club_banner', function() {
		$('#club_banner').attr('src', banner_url);
	});

	waitForEl('#chatline', function() {
		chatline = $(document.getElementById('chatline'))
		populateEmote();
		chatline.off('keydown');
		chatline.on('keydown', function(e) {
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
		url: "//rawgit.com/gimmic234/cytube_backup/863937fcd99b83dbc6aec3f51756b75501764a0c/channelbase-mod.min.js",
		callback: true
	},
	'channel': {
		active: 1,
		rank: -1,
		url: "https://rawgit.com/gimmic234/cytube_backup/863937fcd99b83dbc6aec3f51756b75501764a0c/enhancer-mod.min.js",
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
			window.socket.emit("chatMsg", {msg: totalSeconds + "..."});	
		}

		if ((totalSeconds === 600 || totalSeconds === 300 || totalSeconds === 60 || totalSeconds === 30) && totalSeconds > 0 && motdMode.attr('data-value') == "true") {
			totalSeconds = (totalSeconds >= 60) ? (totalSeconds/60) + " minute(s)" : totalSeconds + " seconds";
			window.socket.emit("chatMsg", {msg: "the stream will start in " + totalSeconds});
		}

		//do something later when date is reached
		if (distance < 0) {
			clearInterval(x);
			$('.countdownbase').hide();
			let mode = motdMode.attr('data-value');
			if (mode == 'true') {
				let selectedList = $("li.queue_entry[data-keep='true']");
				if (selectedList.length != 0) {
					let delList = selectedList.prevAll();
					delList.each(function(index, elem) {
						$(elem).find('button.qbtn-delete').click();		
					})
					selectedList.find('button.qbtn-play').click();
					window.socket.emit("chatMsg", {msg: autostart_msg});	
					cleanAutoStart();
					motdMode.attr('data-value', 'false');
				} else {
					window.socket.emit("chatMsg", {msg: "error: the video was not selected"});	
					cleanAutoStart();
					motdMode.attr('data-value', 'false');
				}
			}
		}

	}, second)