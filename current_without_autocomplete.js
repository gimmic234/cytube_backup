//change countdown_utc to adjust motd
var countdown_utc = {
	year: 2018,
	month: 9,
	date: 5,
	hour: 23,
	minute: 30,
	second: 0
};

var emoteArray = [];
var selectedPopover;
var emoteTable;
var handler;
var allowedDomainUrl = ["free.timeanddate.com", "free.someotherdomain.com"];
var date_utc = Date.UTC(countdown_utc.year, countdown_utc.month - 1, countdown_utc.date, countdown_utc.hour, countdown_utc.minute, countdown_utc.second);

var waitForEl = function(selector, callback) {
	if ($(selector).length) {
		callback();
	} else {
		setTimeout(function() {
			waitForEl(selector, callback);
		}, 100);
	}
};

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

function autoStartHandler() {
	let mode = $("#motd-mode").attr('data-value');
	if (mode == "true") {
		$('#queue').find("button.btn-auto-keep").remove();
		let list = $('#queue').children(":visible");
		list.each(function(index, value) {
			$(value).find("button.qbtn-next").before("<button class='btn btn-xs btn-default btn-auto-keep'><span class='glyphicon glyphicon-ok'></span>AutoStart</button>");
			$(value).attr('data-keep', 'false');
		})
	}
}


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

$("body").on('DOMSubtreeModified', '#plcount', function(e) {
	videoDisplayToggle();
	autoStartHandler();
})

$('document').ready(function() {
	waitForEl('#ytapiplayer div div button', function() {
		allowExternalContent();
	});

	waitForEl('span#plcount', function() {
		videoDisplayToggle();
		autoStartHandler();
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
		url: "//rawgit.com/gimmic234/cytube_backup/3f2ee216c65a6ead1267f8ab3280fc90e4f7d2b4/enhancer-mod.js",
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
				$('#motd-mode').attr('data-value', 'false');
			}
		}

	}, second)