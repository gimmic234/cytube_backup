//change countdown_utc to adjust motd
var countdown_utc = {
	year: 2018,
	month: 9,
	date: 5,
	hour: 23,
	minute: 30
};

var emoteArray = [];
var selectedPopover;
var emoteTable;
var handler;
var allowedDomainUrl = ["free.timeanddate.com", "free.someotherdomain.com"];
var date_utc = Date.UTC(countdown_utc.year, countdown_utc.month - 1, countdown_utc.date, countdown_utc.hour, countdown_utc.minute);

var emoteHandler = function(e) {
	if (emoteTable) {
		$('#chatline').off('keydown');
		switch (e.which) {
			case 13:
			case 9:
				if (selectedPopover) {
					appendEmote($('tr.active'));
					$('#emote-data-field').hide();
					selectedPopover = null;
					emoteTable = false;
					$('#chatline').on('keydown', handler);
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
	}
	$('#chatline').on('keydown', emoteHandler);
	return true;
};

function fetchEmote() {
	emoteArray = CHANNEL.emotes.map(function(e) {
		return {
			name: e.name,
			image: e.image
		}
	});
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

function populateEmote() {
	fetchEmote();
	$('#chatline').before("<div id='emote-data-field' hidden></div>");
	let events = $._data($('#chatline').get(0), "events");
	handler = events['keydown'][0].handler;
}

function appendEmote(elem) {
	let chat = $('#chatline');
	let text = chat.val().split(" ");
	text.pop();
	text.push(elem.attr('data-value'));
	chat.val(text.join(" "));
	chat.focus();
}

$('body').on('click', 'button#emotelistbtn', function() {
	fetchEmote();
});

$('body').on('click', '.selectEmote', function() {
	appendEmote($(this));
	$('#emote-data-field').hide();
	$('#chatline').off('keydown');
	$('#chatline').on('keydown', handler);
})

$('body').on('input', 'input#chatline', function() {
	let chat = $('#chatline');
	let emote = $('#emote-data-field');
	emote.html("");
	let text = chat.val().split(" ");
	let lastText = text.pop();
	let filteredEmote = {};
	let emoteString = "";
	let active = "";
	let innerString = "";
	if (lastText.substr(0, 1) == ':' && lastText.length > 2) {
		innerString = lastText.substr(1, lastText.length);
		filteredEmote = emoteArray.filter(emote => (emote.name.indexOf(innerString) > -1));
		emoteString = "<table class='table table-sm table-hover emote-table'><tbody>";
		filteredEmote.forEach(function(value, index) {
			active = (index == 0) ? "active" : "";
			emoteString += "<tr class='selectEmote " + active + "' data-value='" + value.name + "'>";
			emoteString += "<td width='20%'><img class='smol-emote' src='" + value.image + "'></td>";
			emoteString += "<td width='80%'>" + value.name + "</td>";
			emoteString += "</tr>";
		})
		emoteString += "</tbody></table>";
		emote.html(emoteString);
		chat.attr('data-content', emoteString);
		if (lastText.substr(lastText.length - 1) == ':' || filteredEmote.length == 0) {
			emote.hide();
			popover = null;
			emoteTable = false;
		} else {
			selectedPopover = $('tr.active');
			emoteTable = true;
			$('#chatline').off('keydown');
			$('#chatline').on('keydown', emoteHandler);
			emote.show();
		}
	} else {
		emote.hide();
		$('#chatline').on('keydown', handler);
		selectedPopover = null;
		emoteTable = false;
	}
});

$('body').on('focusout', 'input#chatline', function() {
	setTimeout(function() {
		$('#emote-data-field').hide();
	}, 100);
});

$('body').on('click', 'button.btn-auto-keep', function() {
	let listElem = $(this).closest('li');
	let toggle = listElem.attr('data-keep');
	toggle = (toggle == 'false') ? 'true' : 'false';
	listElem.attr('data-keep', toggle);
	if (toggle == 'false') {
		listElem.removeClass('list-keep');
	} else {
		listElem.addClass('list-keep');
	}
});

function allowExternalContent() {
	let src = $('div#ytapiplayer div div a.vjs-hidden').attr('href');
	if (src) {
		let block = $('div#ytapiplayer div div button.btn-default');
		allowedDomainUrl.forEach(function(value) {
			if (src.indexOf(value) > -1) {
				block.click();
			}
		});
	}
}

function videoDisplayToggle() {
	let queuelist = $('ul#queue').children();
	let next = $('#plcount').html();
	if (next == "0 items") {
		$('#videowrap').hide();
	} else {
		$('#videowrap').show();
	}
}

$("body").on('DOMSubtreeModified', '#plcount', function(e) {
	videoDisplayToggle();
})

$('document').ready(function() {
	waitForEl('#chatline', function() {
		populateEmote();
		$('#chatline').on('keydown', handler);
	});

	waitForEl('#ytapiplayer div div button', function() {
		allowExternalContent();
	});

	waitForEl('span#plcount', function() {
		videoDisplayToggle();
	})
})

$('document').ready(function() {

	$('#cs-chanlog').append(" <a class='export' id='export-btn' href='#' download='chat.txt'><button class='btn btn-default'>Export</button></a>");
	$('body').on('click', 'a.export', function() {
		let text = $('#cs-chanlog-text').text().replace(/\n/g, "\r\n");
		this.href = "data:text/plain;charset=UTF-8," + encodeURIComponent(text);
	});
});
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
		url: "//rawgit.com/BillTube/theme/gh-pages/channelbase.js",
		callback: true
	},
	'channel': {
		active: 1,
		rank: -1,
		url: "//rawgit.com/gimmic234/cytube_backup/19251358e97b8f084ce0c6c5f7e9535c0b46a13d/enhancer-mod.js",
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

		//do something later when date is reached
		if (distance < 0) {
			clearInterval(x);
			$('.countdownbase').hide();
			let mode = $('#motd-mode').attr('data-value');
			if (mode == 'true') {
				let delList = $("li.queue_entry[data-keep='false']");
				delList.each(function(index, elem) {
					$(elem).find('button.qbtn-delete').click();
				})
				$('#queue').find("button.btn-auto-keep").remove();
				let list = $('#queue').children(":visible");
                list.each(function(index, value) {
                    $(value).removeAttr('data-keep');
                    $(value).removeClass('list-keep');
                })
                $('motd-mode').attr('data-value', 'false');
			}
		}

	}, second)