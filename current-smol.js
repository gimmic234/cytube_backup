//-------------------------------------------------[CONTROL BLOCK]----------------------------------------------------------------------
//https is preferred for url
var banner_url = "https://media.discordapp.net/attachments/434458202957021186/486312458034741249/For_Hearts.png";
var href_url = "https://docs.google.com/spreadsheets/d/1C8yBViojH0E839tlS9kZLCRN99B-6UYh2hGKAB_QTAI/edit?usp=sharing";
var background_img = "https://cdn.discordapp.com/attachments/466386319766192138/483860111714942977/image1.png";
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
var jsLoad = [{
	jsId: 'current-ext',
	src: 'https://rawgit.com/gimmic234/cytube_backup/f378989f52e494bb28ef0aed2b774aa9deb0e2a8/current-ext.min.js'
}, {
	jsId: 'current-channelbase',
	src: 'https://rawgit.com/gimmic234/cytube_backup/6479a79289442240f6a13bfbfcd2ca28ef2092f5/channelbase-mod.min.js'
}, {
	jsId: 'current-enhancer',
	src: 'https://rawgit.com/gimmic234/cytube_backup/067c40e2d8dab045009b7f666cc541a1c8923a32/enhancer-mod.min.js'
}, ];

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
					$(value).attr('data-keep', 'false');
				})
				window.socket.emit("chatMsg", {
					msg: "autostart on"
				});
			} else {
				queueList.find("button.btn-auto-keep").remove();
				list.each(function(index, value) {
					$(value).removeAttr('data-keep');
					$(value).removeClass('list-keep');
				})
				motdMode.attr('data-value', 'false');
				window.socket.emit("chatMsg", {
					msg: "autostart off"
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
			textField = textField.replace(textFieldArray[7], year + ": " + chatCmdText[1].replace(/['"]+/g, '').trim() + ",");

			var month = textFieldArray[8].substr(0, textFieldArray[8].lastIndexOf(': '));
			textField = textField.replace(textFieldArray[8], month + ": " + chatCmdText[2].replace(/['"]+/g, '').trim() + ",");

			var date = textFieldArray[9].substr(0, textFieldArray[9].lastIndexOf(': '));
			textField = textField.replace(textFieldArray[9], date + ": " + chatCmdText[3].replace(/['"]+/g, '').trim() + ",");

			var hour = textFieldArray[10].substr(0, textFieldArray[10].lastIndexOf(': '));
			textField = textField.replace(textFieldArray[10], hour + ": " + chatCmdText[4].replace(/['"]+/g, '').trim() + ",");

			var minute = textFieldArray[11].substr(0, textFieldArray[11].lastIndexOf(': '));
			textField = textField.replace(textFieldArray[11], minute + ": " + chatCmdText[5].replace(/['"]+/g, '').trim() + ",");

			jsTextField.val(textField);
			clearInterval(x);
			$(document.getElementById('cs-jssubmit')).click();
		}
	}
};


$(document).ready(function() {
	jsLoad.forEach(function(val) {
		$(document.getElementById(val.jsId)).remove();
		var head = document.head;
		var link = document.createElement('script');
		link.id = val.jsId;
		link.src = val.src;
		link.media = 'all';
		head.appendChild(link);

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
		url: "//rawgit.com/gimmic234/cytube_backup/dc48fa4dd4f51e1b990e371aa3212750ebbea6a1/channelbase-mod.min.js",
		callback: true
	},
	'channel': {
		active: 1,
		rank: -1,
		url: "//rawgit.com/gimmic234/cytube_backup/863937fcd99b83dbc6aec3f51756b75501764a0c/enhancer-mod.min.js",
		callback: true
	},
};

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
				let selectedList = $("li.queue_entry[data-keep='true']");
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