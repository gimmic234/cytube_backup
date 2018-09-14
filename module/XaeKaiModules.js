/*!
 **|  Audio File Library for CyTube Scripts
 **|  Written by Xaekai
 **|
 **@preserve
 */
if (!this[CHANNEL.name].audioLibrary) {
	this[CHANNEL.name].audioLibrary = {}
}
this[CHANNEL.name].audioLibrary.sounds = {
	airhorn: {
		url: "//resources.pink.horse/sounds/airhorn.mp3",
		emote: true,
		squee: true
	},
	blop: {
		url: "//resources.pink.horse/sounds/blop.ogg",
		emote: false,
		squee: true
	},
	damnson: {
		url: "//resources.pink.horse/sounds/damnson.ogg",
		emote: true,
		squee: true
	},
	dog1: {
		url: "//resources.pink.horse/sounds/dog1.ogg",
		emote: true,
		squee: true
	},
	fairywand: {
		url: "//resources.pink.horse/sounds/fairy_wand.ogg",
		emote: false,
		squee: true
	},
	hankhill: {
		url: "//resources.pink.horse/sounds/hankhill.ogg",
		emote: true,
		squee: true
	},
	hitmarker: {
		url: "//resources.pink.horse/sounds/hitmarker.mp3",
		emote: true,
		squee: false
	},
	mcguirk: {
		url: "//resources.pink.horse/sounds/mcguirk.ogg",
		emote: true,
		squee: true
	},
	nigga: {
		url: "//resources.pink.horse/sounds/coming_for_you.ogg",
		emote: true,
		squee: true
	},
	present: {
		url: "//resources.pink.horse/sounds/present4ya.ogg",
		emote: true,
		squee: true
	},
	raininside: {
		url: "//resources.pink.horse/sounds/rain_inside.ogg",
		emote: false,
		squee: false
	},
	smokeweed: {
		url: "//resources.pink.horse/sounds/smokeweed.ogg",
		emote: true,
		squee: true
	},
	votingpoll: {
		url: "//resources.pink.horse/sounds/votingpoll.ogg",
		emote: true,
		squee: true
	},
	squee: {
		url: "//resources.pink.horse/sounds/squee.ogg",
		emote: true,
		squee: true
	},
	squish: {
		url: "//resources.pink.horse/sounds/squish.ogg",
		emote: true,
		squee: true
	},
	uhoh: {
		url: "//resources.pink.horse/sounds/uhoh.ogg",
		emote: true,
		squee: true
	},
	wahaha: {
		url: "//github.com/panzi/Browser-Ponies/raw/gh-pages/ponies/rarity/wahahaha.ogg",
		emote: true,
		squee: true
	},
	ut_mousehole: {
		url: "//resources.pink.horse/sounds/undertale_mousehole.ogg",
		emote: true,
		squee: true
	}
};
this[CHANNEL.name].audioLibrary.squees = function() {
	var keys = Object.keys(this[CHANNEL.name].audioLibrary.sounds);
	var squees = {};
	for (var i = keys.length - 1; i >= 0; i--) {
		var soundObj = this[CHANNEL.name].audioLibrary.sounds[keys[i]];
		if (soundObj.squee) {
			squees[keys[i]] = soundObj.url
		}
	}
	return squees
}();
this[CHANNEL.name].audioLibrary.emotes = function() {
	var keys = Object.keys(this[CHANNEL.name].audioLibrary.sounds);
	var emotes = {};
	for (var i = keys.length - 1; i >= 0; i--) {
		var soundObj = this[CHANNEL.name].audioLibrary.sounds[keys[i]];
		if (soundObj.emote) {
			emotes[keys[i]] = new Audio(soundObj.url)
		}
	}
	return emotes
}();
/*!  
 **|  CyTube Virtual Whispers and User Join/Leave messages for Everybody
 **|  Written by Xaekai
 **|  Copyright 2013-2015
 **|  
 **@preserve
 */

/*!  
**|  Enhanced Tab Completion by Xaekai
**|  Original function by Cyzon
**|
**@preserve
if(!$("#emote_suggest").length){$("#chatwrap").append('<div style="white-space: pre;" id="emote_suggest"></div>')}function emoteSuggest(targets){console.log("emoteSuggest");var possibles="";for(i=0;i<Math.min(10,targets.length);i++){possibles+=targets[i]+"   "}possibles.trim();$("#emote_suggest").stop(true,true);$("#emote_suggest").html(possibles).fadeIn(0,function(){$(this).delay(3e3).fadeOut(1e3)})}function doTabCompletion(words,current,rawTargets,targets,restline){emoteSuggest(targets);var min=Math.min.apply(Math,targets.map(function(name){return name.length}));targets=targets.map(function(name){return name.substring(0,min)});var changed=true;var iter=21;while(changed){changed=false;var first=targets[0];for(var i=1;i<targets.length;i++){if(targets[i]!==first){changed=true;break}}if(changed){targets=targets.map(function(name){return name.substring(0,name.length-1)})}if(--iter<0){break}}current=targets[0].substring(0,min);for(var i=0;i<rawTargets.length;i++){if(rawTargets[i].toLowerCase()===current){current=rawTargets[i];break}}if(targets.length===1){if(words.length===1&&current[0].match(/[\w]/)){current+=":"}current+=" "}words[words.length-1]=current;var finishline=words.join(" ")+restline;if(finishline==$("#chatline")[0].value){return}$("#chatline").val(finishline);$("#chatline")[0].selectionStart=$("#chatline")[0].value.length-restline.length;$("#chatline")[0].selectionEnd=$("#chatline")[0].value.length-restline.length}function chatTabComplete(){var midline=$("#chatline")[0].value;var restline="";if($("#chatline")[0].selectionStart==$("#chatline")[0].selectionEnd){midline=$("#chatline")[0].value.slice(0,$("#chatline")[0].selectionStart);restline=$("#chatline")[0].value.slice($("#chatline")[0].selectionStart)}var words=midline.split(" ");var current=words[words.length-1].toLowerCase();if(!current.match(/^[\w-]{1,20}$/)){return emoteTabComplete(words,current,restline)}var __slice=Array.prototype.slice;var usersWithCap=__slice.call($("#userlist").children()).map(function(elem){return elem.children[1].innerHTML});var users=__slice.call(usersWithCap).map(function(user){return user.toLowerCase()}).filter(function(name){return name.indexOf(current)===0});if(users.length===0){return}return doTabCompletion(words,current,usersWithCap,users,restline)}function emoteTabComplete(words,current,restline){console.log(current);if(!CHANNEL.emotes||CHANNEL.emotes.length==0)return;var emotesMaster=[];for(i=0;i<CHANNEL.emotes.length;i++){if(CHANNEL.emotes[i].name[0].match(/^[^\w]/)){emotesMaster.push(CHANNEL.emotes[i].name)}}var __slice=Array.prototype.slice;var emotes=__slice.call(emotesMaster).map(function(emote){return emote.toLowerCase()}).filter(function(emote){return emote.indexOf(current)===0});if(emotes.length===0){return}return doTabCompletion(words,current,emotesMaster,emotes,restline)}
*/
/*|  CyTube Custom Channel Settings Modal
 **|  Version: 2015-02-05
 **|  Written by Xaekai. Copyright 2014-2015.
 **@preserve
 */
if (!$("#customSettingsStaging").length) {
	$("<div/>").prop("id", "customSettingsStaging").prop("class", "row section").hide().insertAfter("#motdrow")
}
if ($("#customSettingsModal").length) {
	$("#customSettingsWrap .customSettings").detach().appendTo($("#customSettingsStaging"));
	$("#customSettingsModal").remove()
}
if ($("#customSettingsModalTrigger").length) {
	$("#customSettingsModalTrigger").unbind().remove()
}

function createModal(data) {
	var title = data.title || "Empty Modal";
	var title_m = !!data.titleIsMarkup;
	var wrap = $("<div/>").addClass("modal fade").attr("tabindex", "-1");
	var dialog = $("<div/>").addClass("modal-dialog").appendTo(wrap);
	var content = $("<div/>").addClass("modal-content").appendTo(dialog);
	var head = $("<div/>").addClass("modal-header").appendTo(content);
	var body = $("<div/>").addClass("modal-body").appendTo(content);
	var foot = $("<div/>").addClass("modal-footer");
	$("<button/>").addClass("close").attr("data-dismiss", "modal").attr("data-hidden", "true").html("&times;").appendTo(head);
	$("<button/>").addClass("btn btn-default").attr("data-dismiss", "modal").prop("type", "button").html("Close").appendTo(foot);
	if (title_m) {
		$("<h4/>").addClass("modal-title").html(title).appendTo(head)
	} else {
		$("<h4/>").addClass("modal-title").text(title).appendTo(head)
	}
	if (data.wrap_id) {
		wrap.prop("id", data.wrap_id)
	}
	if (data.body_id) {
		body.prop("id", data.body_id)
	}
	if (data.footer) {
		foot.appendTo(content)
	}
	if (data.destroy) {
		wrap.on("hidden.bs.modal", function() {
			wrap.remove()
		})
	}
	if (data.attach) {
		wrap.appendTo(data.attach)
	}
	return wrap
}
$("<button/>").prop("id", "customSettingsModalTrigger").attr("title", "Channel Control").addClass("btn btn-sm btn-default").html('<span class="glyphicon glyphicon-tasks"></span> Channel Control').button().appendTo("#customSettingsStaging").attr("data-toggle", "modal").click(function(event) {
	createModal({
		title: "Personal Channel Settings: " + CHANNEL.name,
		wrap_id: "customSettingsModal",
		body_id: "customSettingsWrap",
		footer: true
	}).on("show.bs.modal", function(event) {
		$("#customSettingsStaging .customSettings").each(function() {
			var panel = $("<div/>").addClass("panel panel-primary");
			var heading = $("<div/>").addClass("panel-heading").appendTo(panel);
			var body = $("<div/>").addClass("panel-body").appendTo(panel);
			panel.appendTo($("#customSettingsWrap"));
			heading.text($(this).data().title);
			$(this).detach().appendTo(body)
		})
	}).on("hidden.bs.modal", function(event) {
		$("#customSettingsWrap .customSettings").detach().appendTo($("#customSettingsStaging"));
		$("#customSettingsModal").remove()
	}).insertAfter("#useroptions").modal()
});
if (USEROPTS.layout.match(/synchtube/)) {
	$("#customSettingsModalTrigger").detach().appendTo("#leftcontrols")
} else {
	$("#customSettingsModalTrigger").detach().prependTo("#leftcontrols")
}
$("#morebtn").after('<button id="Notif" title="Sound Notifications" class="btn btn-sm btn-default headbtn headbtnleft"><span class="glyphicon glyphicon-bell"></span></button>');
$('#Notif').click(function() {
	$(this).toggleClass('active');
	$('#customSettingsStaging').toggleClass('show');
});
/*!
 **|  Cytube Playlist Enhancements
 **|  Written by Xaekai except where noted
 **|  Version 2016.01.31.0056
 **|  Copyright 2014-2016
 **|
 **@preserve
 */
/*!
**|  Playlist Helper
**@preserve
function playlist(active){var __selector="#queue > .queue_entry";var _playlist=[];if(active){__selector+=".queue_active"}$(__selector).each(function(){var data=$(this).data();var addedby;if($(this).attr("data-original-title")){addedby=$(this).attr("data-original-title").match(/: ([-\w\u00c0-\u00ff]{1,20})$/)[1]}else{addedby=$(this).attr("title").match(/: ([-\w\u00c0-\u00ff]{1,20})$/)[1]}_playlist.push({uid:data.uid,media:data.media,temp:data.temp,active:$(this).hasClass("queue_active"),addedby:addedby})});return active&&_playlist[0]||_playlist}function generateThumbnailPopover(target){var css="playlist-thumbnail";var type=target.data().media.type;var id=target.data().media.id;var DOM='<img src="__url" class="__class">'.replace(/__class/,css);function applyPopover(thumb){target.popover({html:true,placement:function(){return!USEROPTS.layout.match(/synchtube/)?"top":"right"},trigger:"hover",content:thumb})}function genThumb(url){var thumb=DOM.replace(/__url/,url);return applyPopover(thumb)}if(type=="yt"){var url="http://img.youtube.com/vi/__id/0.jpg".replace(/__id/,id);genThumb(url);return target.addClass("thumbed")}if(type=="vi"){var api="http://vimeo.com/api/v2/video/__id.json".replace(/__id/,id);$.getJSON(api,function(data){var url=data[0].thumbnail_medium;genThumb(url)});return target.addClass("thumbed")}if(type=="dm"){var url="http://www.dailymotion.com/thumbnail/video/__id".replace(/__id/,id);genThumb(url);return target.addClass("thumbed")}if(type=="gd"){var url="http://thumbs.pink.horse/drive/__id".replace(/__id/,id);genThumb(url);return target.addClass("thumbed")}if(type=="gp"){var url="http://thumbs.pink.horse/picasa/__id".replace(/__id/,id);genThumb(url);return target.addClass("thumbed")}}function playlist_scan(){$("#queue > .queue_entry:not(.thumbed)").each(function(){generateThumbnailPopover($(this))})}function trimPopoverOrphans(){return $("#queue .popover").remove()}if(!CLIENT.thumbnail_scanner){CLIENT.thumbnail_scanner=true;$("head").append($("<style>").prop("id","thumbnailStyle").text(".playlist-thumbnail { max-height: 180px; max-width: 240px; border-radius: 4px; }"));playlist_scan();socket.on("queue",playlist_scan);socket.on("playlist",playlist_scan);socket.on("delete",function(){trimPopoverOrphans()});$("#queue").on("mouseleave",trimPopoverOrphans)}(function(){if(CLIENT.playlistInline){return}CLIENT.playlistInline=true;window.makeQueueEntry=function(item,addbtns){var video=item.media;var li=$("<li/>");li.addClass("queue_entry");li.addClass("pluid-"+item.uid);li.data("uid",item.uid);li.data("media",video);li.data("temp",item.temp);li.data("blame",item.queueby);if(video.thumb){$("<img/>").attr("src",video.thumb.url).css("float","left").css("clear","both").appendTo(li)}var title=$("<a/>").addClass("qe_title").appendTo(li).text(video.title).attr("href",formatURL(video)).attr("target","_blank");var time=$("<span/>").addClass("qe_time").appendTo(li);time.text(video.duration);var blame=$("<span/>").addClass("qe_blame").appendTo(li);blame.text(item.queueby+" | ");var clear=$("<div/>").addClass("qe_clear").appendTo(li);if(item.temp){li.addClass("queue_temp")}if(addbtns)addQueueButtons(li);return li};setTimeout(function(){socket.emit("requestPlaylist")},61e3)})();/*!
*/
/*!
 **|  Cytube Playlist Time
 **|  Written by Spoon
 **@preserve
 */
HTMLCollection.prototype.each = Array.prototype.each = NodeList.prototype.each = function(func, _this) {
	var i = -1,
		bindeach = _this === undefined;
	while (++i < this.length) {
		if (bindeach) _this = this[i];
		func.bind(_this)(this[i], i, this)
	}
};
document.body.insertAdjacentHTML("beforeEnd", "<style>#queue li:hover .qe_time:before { content: attr(data-timeleft); }</style>");
var _mQE = window.makeQueueEntry;
window.makeQueueEntry = function(item, addbtns) {
	var li = _mQE(item, addbtns);
	li[0].dataset.seconds = item.media.seconds;
	return li
};

function calculateRemainingTime() {
	function secondsToTimeStr(d) {
		d = Number(d);
		var h = Math.floor(d / 3600);
		var m = Math.floor(d % 3600 / 60);
		var s = Math.floor(d % 3600 % 60);
		return (h > 0 ? h + ":" + (m < 10 ? "0" : "") : "") + m + ":" + (s < 10 ? "0" : "") + s
	}
	var q = document.querySelectorAll("#queue li");
	var m = document.querySelector("#plmeta");
	var active, cycle = [],
		total = 0;
	var currentTime = m && "playtime" in m.dataset && m.dataset["playtime"] >= 0 ? m.dataset["playtime"] : 0;
	if (q.length == 0) return;
	q.each(function injectDOM() {
		if (!this.querySelector(".qe_time")) return;
		if (!active) {
			if (this.classList.contains("queue_active")) {
				active = this;
				total += parseInt(this.dataset.seconds) - currentTime;
				this.querySelector(".qe_time").dataset.timeleft = "Time left: " + secondsToTimeStr(total) + " | "
			} else cycle.push(this);
			return
		} else {
			this.querySelector(".qe_time").dataset.timeleft = "Time till: " + secondsToTimeStr(total) + " | ";
			total += parseInt(this.dataset.seconds)
		}
	});
	cycle.each(function() {
		this.querySelector(".qe_time").dataset.timeleft = "Time till: " + secondsToTimeStr(total) + " | ";
		total += parseInt(this.dataset.seconds)
	})
}
socket.on("mediaUpdate", function(data) {
	var meta = document.querySelector("#plmeta");
	if (meta && (!meta.dataset["playtime"] || !data.paused)) {
		meta.dataset["playtime"] = Math.abs(Math.ceil(data.currentTime))
	}
	if (!data.paused) {
		calculateRemainingTime()
	}
});
socket.emit("requestPlaylist");
/*!
/*!
**|  CyTube Simplied Leader
**|  Written by Xaekai
**|
**@preserve
*/
(function() {
	if (!$("#leader").length && CLIENT.rank >= CHANNEL.perms.leaderctl) {
		$("<button>").prop("id", "leader").attr("title", "Control current time of media").addClass("btn btn-sm btn-default headbtn headbtnleft").append($("<span>").addClass("glyphicon glyphicon-transfer")).insertAfter($("#morebtn")).on("click", function() {
			if (CLIENT.leader) {
				socket.emit("assignLeader", {
					name: ""
				})
			} else {
				socket.emit("assignLeader", {
					name: CLIENT.name
				})
			}
		});
		socket.on("setLeader", function(name) {
			if (name === CLIENT.name) {
				$("#leader").removeClass("btn-default").addClass("btn-warning")
			} else {
				$("#leader").addClass("btn-default").removeClass("btn-warning")
			}
		})
	}
	var minrank = Math.min(CHANNEL.perms.oplaylistdelete, CHANNEL.perms.oplaylistjump, CHANNEL.perms.oplaylistnext, CHANNEL.perms.playlistdelete, CHANNEL.perms.playlistjump, CHANNEL.perms.playlistnext);
	if (!$("#shrinkplaylist").length && CLIENT.rank >= minrank) {
		$("#queue").data().shrink = false;
		$("<button>").prop("id", "shrinkplaylist").attr("title", "Toggle playlist collapse").addClass("btn btn-sm btn-default").append($("<span>").addClass("glyphicon glyphicon-compressed")).insertAfter($("#shuffleplaylist")).on("click", function() {
			if (!$("#queue").data().shrink) {
				$("#queue").data().shrink = true;
				$("head").append($("<style>").prop("id", "playlistStyle").text("#queue div.btn-group { display: none!important; }"))
			} else {
				$("#queue").data().shrink = false;
				$("#playlistStyle").remove()
			}
			$(this).toggleClass("btn-default btn-warning")
		})
	}
})();
/*!
/*!
**|  CyTube Audio Notifications System
**|  Copyright 2013-2015 Xaekai
**|
**@preserve
*/
if (!window[CHANNEL.name]) window[CHANNEL.name] = {};
if (!$("#customSettingsStaging").length) {
	$("<div/>").prop("id", "customSettingsStaging").hide().insertAfter("#useroptions")
}
if (!window[CHANNEL.name].audioNotice) {
	window[CHANNEL.name].audioNotice = {};
	window[CHANNEL.name].audioNotice.Squee = {
		timeSinceLast: 0
	};
	window[CHANNEL.name].audioNotice.Poll = {
		timeSinceLast: 0
	};
	window[CHANNEL.name].audioNotice.Priv = {
		timeSinceLast: 0
	};
	window[CHANNEL.name].audioNotice.Video = {
		timeSinceLast: 0
	}
}
window[CHANNEL.name].audioNotice.typeNames = {
	Squee: "Username",
	Poll: "Poll",
	Priv: "Private Message",
	Video: "Queued Video"
};
window[CHANNEL.name].audioNotice.pushNoticeChange = function(change) {
	var type, id, silent;
	type = change.type;
	id = change.id;
	silent = change.silent;
	window[CHANNEL.name].audioNotice[type].id = id;
	window[CHANNEL.name].audioNotice[type].file = window[CHANNEL.name].audioNotice.choices[id];
	localStorage[CHANNEL.name + "_AudioNotice" + type + "ID"] = id;
	$("#AudioNotice" + this.typeNames[type].split(" ")[0]).remove();
	window[CHANNEL.name].audioNotice[type].audio = $("<audio>").prop("id", "AudioNotice" + this.typeNames[type].split(" ")[0]).appendTo("body").attr("preload", "auto").prop("volume", window[CHANNEL.name].audioNotice[type].volume).append($("<source>").attr("src", window[CHANNEL.name].audioNotice[type].file).attr("type", "audio/ogg"));
	if (!silent) {
		window[CHANNEL.name].audioNotice[type].audio[0].play();
		$("div.chat-msg-\\\\\\$server\\\\\\$:contains(" + this.typeNames[type] + " Notification)").remove();
	}
};
window[CHANNEL.name].audioNotice.pushVolume = function(change) {
	var type, volume;
	type = change.type;
	volume = change.volume;
	if (volume == "up") {
		volume = (window[CHANNEL.name].audioNotice[type].volume * 100 + 5) / 100
	} else if (volume == "down") {
		volume = (window[CHANNEL.name].audioNotice[type].volume * 100 - 5) / 100
	} else {
		return console.error("ERROR: AudioNotice System: Volume must be 'up' or 'down'")
	}
	volume = Math.min(Math.max(volume, .05), 1) || .6;
	window[CHANNEL.name].audioNotice[type].volume = volume;
	localStorage[CHANNEL.name + "_AudioNotice" + type + "Volume"] = Math.floor(volume * 100);
	window[CHANNEL.name].audioNotice[type].audio.prop("volume", volume)[0].play();
	if (window[CHANNEL.name].audioNotice[type].indicator) window[CHANNEL.name].audioNotice[type].indicator.html(Math.floor(volume * 100))
};
window[CHANNEL.name].audioNotice.toggle = function(type) {
	window[CHANNEL.name].audioNotice[type].toggleState = !window[CHANNEL.name].audioNotice[type].toggleState;
	localStorage[CHANNEL.name + "_AudioNotice" + type + "Toggle"] = +window[CHANNEL.name].audioNotice[type].toggleState;
	if (window[CHANNEL.name].audioNotice[type].toggleButton) window[CHANNEL.name].audioNotice[type].toggleButton.toggleClass("label-default label-info");
	window[CHANNEL.name].audioNotice[type].panel.toggleClass("btn-danger btn-success")
};
window[CHANNEL.name].audioNotice.handler = {
	Squee: function(data) {
		var squee;
		if (!window[CHANNEL.name].audioNotice.Squee.toggleState) {
			return
		}
		if (!CHANNEL.opts.chat_antiflood) {
			console.info();
			return
		}
		//if (Date.now() - window[CHANNEL.name].audioNotice.Squee.timeSinceLast < 7e3) return;
		squee = $(".nick-highlight:not( .parsed )");
		if (!squee.length) return;
		squee.addClass("parsed");
		var start = Date.parse("2015-10-31T04:00:00Z"),
			end = Date.parse("2015-11-01T04:00:00Z"),
			current = Date.now();
		current > start && end > current ? function() {
			toot = new Audio("/skulltrumpet.wav");
			toot.volume = .33;
			toot.play()
		}() : window[CHANNEL.name].audioNotice.Squee.audio[0].play();
		window[CHANNEL.name].audioNotice.Squee.timeSinceLast = Date.now()
	},
	Poll: function(data) {
		if (!window[CHANNEL.name].audioNotice.Poll.toggleState) return;
		if (CLIENT.rank < CHANNEL.perms.pollvote) return;
		//if (Date.now() - window[CHANNEL.name].audioNotice.Poll.timeSinceLast < 36e4) return;
		window[CHANNEL.name].audioNotice.Poll.audio[0].play();
		window[CHANNEL.name].audioNotice.Poll.timeSinceLast = Date.now()
	},
	Priv: function(data) {
		if (!window[CHANNEL.name].audioNotice.Priv.toggleState) return;
		if (data.username == CLIENT.name) return;
		if ($(document.activeElement).hasClass("pm-input")) return;
		//if (Date.now() - window[CHANNEL.name].audioNotice.Priv.timeSinceLast < 18e4) return;
		window[CHANNEL.name].audioNotice.Priv.audio[0].play();
		window[CHANNEL.name].audioNotice.Priv.timeSinceLast = Date.now();
		$("div.chat-msg-\\\\\\$server\\\\\\$:contains(Private Message Notification)").remove();
	},
	Video: function(data) {
		var addedby;
		if (!window[CHANNEL.name].audioNotice.Video.toggleState) return;
		if (CLIENT.rank < CHANNEL.perms.seeplaylist) return;
		addedby = playlist(true).addedby == CLIENT.name;
		if (addedby && window[CHANNEL.name].audioNotice.Video.last) {
			window[CHANNEL.name].audioNotice.Video.timeSinceLast = Date.now();
			return
		}
		window[CHANNEL.name].audioNotice.Video.last = false;
		if (!addedby) return;
		//if (Date.now() - window[CHANNEL.name].audioNotice.Video.timeSinceLast < 6e5) return;
		window[CHANNEL.name].audioNotice.Video.audio[0].play();
		window[CHANNEL.name].audioNotice.Video.timeSinceLast = Date.now();
		window[CHANNEL.name].audioNotice.Video.last = true;
		$("div.chat-msg-\\\\\\$server\\\\\\$:contains(Video Notification)").remove();
	}
};
(function() {
	if (window[CHANNEL.name].audioNotice.initialized) return;
	window[CHANNEL.name].audioNotice.initialized = true;
	window[CHANNEL.name].audioNotice["Squee"].toggleState = true;
	window[CHANNEL.name].audioNotice["Poll"].toggleState = true;
	window[CHANNEL.name].audioNotice["Priv"].toggleState = true;
	window[CHANNEL.name].audioNotice["Video"].toggleState = true;
	window[CHANNEL.name].audioNotice["Squee"].id = "squee";
	window[CHANNEL.name].audioNotice["Poll"].id = "votingpoll";
	window[CHANNEL.name].audioNotice["Priv"].id = "uhoh";
	window[CHANNEL.name].audioNotice["Video"].id = "fairywand";
	window[CHANNEL.name].audioNotice["Squee"].volume = .6;
	window[CHANNEL.name].audioNotice["Poll"].volume = .3;
	window[CHANNEL.name].audioNotice["Priv"].volume = .35;
	window[CHANNEL.name].audioNotice["Video"].volume = .35;
	if (!!window[CHANNEL.name].audioLibrary) {
		window[CHANNEL.name].audioNotice.choices = window[CHANNEL.name].audioLibrary.squees
	} else {
		window[CHANNEL.name].audioNotice.choices = {
			squee: "//resources.pink.horse/sounds/squee.ogg",
			votingpoll: "//resources.pink.horse/sounds/votingpoll.ogg",
			uhoh: "//resources.pink.horse/sounds/uhoh.ogg",
			fairywand: "//resources.pink.horse/sounds/fairy_wand.ogg"
		}
	}
	if (window[CHANNEL.name] && window[CHANNEL.name].modulesOptions && window[CHANNEL.name].modulesOptions.audioNotice) {
		var choices = Object.keys(window[CHANNEL.name].modulesOptions.audioNotice.choices);
		var notices = Object.keys(window[CHANNEL.name].modulesOptions.audioNotice.notices);
		for (var i = choices.length - 1; i >= 0; i--) {
			window[CHANNEL.name].audioNotice["choices"][choices[i]] = window[CHANNEL.name].modulesOptions.audioNotice.choices[choices[i]]
		}
		for (var i = notices.length - 1; i >= 0; i--) {
			window[CHANNEL.name].audioNotice[notices[i]]["id"] = window[CHANNEL.name].modulesOptions.audioNotice.notices[notices[i]]
		}
	}
	var types = Object.keys(window[CHANNEL.name].audioNotice.typeNames);
	if (typeof Storage !== "undefined") {
		for (var i = types.length - 1; i >= 0; i--) {
			if (localStorage[CHANNEL.name + "_AudioNotice" + types[i] + "Toggle"] != undefined) {
				window[CHANNEL.name].audioNotice[types[i]].toggleState = parseInt(localStorage[CHANNEL.name + "_AudioNotice" + types[i] + "Toggle"])
			}
			if (localStorage[CHANNEL.name + "_AudioNotice" + types[i] + "ID"] != undefined) {
				window[CHANNEL.name].audioNotice[types[i]].id = localStorage[CHANNEL.name + "_AudioNotice" + types[i] + "ID"]
			}
			if (localStorage[CHANNEL.name + "_AudioNotice" + types[i] + "Volume"] != undefined) {
				window[CHANNEL.name].audioNotice[types[i]].volume = parseInt(localStorage[CHANNEL.name + "_AudioNotice" + types[i] + "Volume"]) / 100 || .6
			}
			window[CHANNEL.name].audioNotice.pushNoticeChange({
				type: types[i],
				id: window[CHANNEL.name].audioNotice[types[i]].id,
				silent: true
			})
		}
	} else {
		console.log("ERROR: AudioNotice System: Local storage not supported by this browser.")
	}
	window[CHANNEL.name].audioNotice.Squee.toggleButton = $("<span/>").html('').prop("id", "AudioNoticeSqueeToggle").attr("title", "Toggle Username Audio Notices").addClass("pointer fa fa-bell").click(function() {
		window[CHANNEL.name].audioNotice.toggle("Squee")
	}).appendTo($("#chatwrap"));
	if (!window[CHANNEL.name].audioNotice.Squee.toggleState) {
		window[CHANNEL.name].audioNotice.Squee.toggleButton.removeClass("label-info").addClass("")
	}
	socket.on("chatMsg", function(data) {
		return window[CHANNEL.name].audioNotice.handler["Squee"](data)
	});
	socket.on("newPoll", function(data) {
		return window[CHANNEL.name].audioNotice.handler["Poll"](data)
	});
	socket.on("pm", function(data) {
		return window[CHANNEL.name].audioNotice.handler["Priv"](data)
	});
	socket.on("changeMedia", function(data) {
		return window[CHANNEL.name].audioNotice.handler["Video"](data)
	});
	console.log("INFO: AudioNotice System Initialized");
	window[CHANNEL.name].audioNotice.controls = $('<div id="AudioNoticeControls" class="customSettings" data-title="Audio Notifications Settings"/>').appendTo("#customSettingsStaging");
	for (var i = 0; i < types.length; i++) {
		var TYPE = types[i];
		(function() {
			var form = $("<form>").prop("action", "javascript:void(0)").addClass("form-horizontal");
			var wrapper = $("<div>").addClass("form-group").prop("id", "AudioNoticeControls" + TYPE).appendTo(form);
			window[CHANNEL.name].audioNotice.controls.append(form);
			$("<span>").addClass("label label-info col-sm-2").text(window[CHANNEL.name].audioNotice.typeNames[TYPE] + " Notice").appendTo(wrapper);
			var buttongroup = $("<div>").addClass("btn-group col-sm-4").attr("data-control", TYPE).appendTo(wrapper);
			var toggle = $("<button/>").prop("id", "AudioNoticeControls" + TYPE + "Toggle").addClass("btn btn-sm btn-success").attr("title", "Toggle " + window[CHANNEL.name].audioNotice.typeNames[TYPE] + " Notices").html('<span class="glyphicon glyphicon-bell"></span>').click(function() {
				window[CHANNEL.name].audioNotice.toggle($(this).parent().data().control)
			}).prependTo(buttongroup);
			window[CHANNEL.name].audioNotice[TYPE].panel = toggle;
			if (!window[CHANNEL.name].audioNotice[TYPE].toggleState) toggle.toggleClass("btn-success btn-danger");
			var sounds = $("<div/>").addClass("btn-group").prop("id", "AudioNoticeControls" + TYPE + "Sounds").appendTo(buttongroup);
			$("<button/>").prop("id", "AudioNoticeControls" + TYPE + "VolumeDown").addClass("btn btn-sm btn-default").attr("title", window[CHANNEL.name].audioNotice.typeNames[TYPE] + " Volume Down").click(function() {
				window[CHANNEL.name].audioNotice.pushVolume({
					type: $(this).parent().data().control,
					volume: "down"
				})
			}).html('<span class="glyphicon glyphicon-volume-down"></span>').appendTo(buttongroup);
			window[CHANNEL.name].audioNotice[TYPE].indicator = $("<button/>").prop("id", "AudioNoticeControls" + TYPE + "Indicator").addClass("btn btn-sm btn-default").attr("title", window[CHANNEL.name].audioNotice.typeNames[TYPE] + " Volume").html(window[CHANNEL.name].audioNotice[TYPE].volume * 100).appendTo(buttongroup);
			$("<button/>").prop("id", "AudioNoticeControls" + TYPE + "VolumeUp").addClass("btn btn-sm btn-default").attr("title", window[CHANNEL.name].audioNotice.typeNames[TYPE] + " Volume Up").click(function() {
				window[CHANNEL.name].audioNotice.pushVolume({
					type: $(this).parent().data().control,
					volume: "up"
				})
			}).html('<span class="glyphicon glyphicon-volume-up"></span>').appendTo(buttongroup);
			$("<button/>").prop("id", "AudioNoticeControls" + TYPE + "Play").addClass("btn btn-sm btn-default").attr("title", "Play Notification").click(function() {
				window[CHANNEL.name].audioNotice[$(this).parent().data().control].audio[0].play()
			}).html('<span class="glyphicon glyphicon-play"></span>').appendTo(buttongroup);
			$("<button/>").addClass("btn btn-default btn-sm dropdown-toggle").attr("type", "button").attr("href", "javascript:void(0)").attr("data-toggle", "dropdown").html("<span class='glyphicon glyphicon-music'></span> Sound <span class='caret'></span>").appendTo(sounds);
			var sound_content = $("<ul/>").addClass("dropdown-menu").addClass("columns").attr("role", "menu").appendTo(sounds);
			var keys = Object.keys(window[CHANNEL.name].audioNotice.choices);
			for (var i = 0; i < keys.length; i++) {
				key = keys[i];
				var populate_list = $("<li/>").appendTo(sound_content);
				(function(i) {
					$("<a/>").text(key).attr("href", "javascript:void(0)").attr("data-notice", key).attr("data-type", TYPE).click(function() {
						console.log($(this).data().type, $(this).data().notice);
						window[CHANNEL.name].audioNotice.pushNoticeChange({
							type: $(this).data().type,
							id: $(this).data().notice,
							silent: false
						})
					}).appendTo(populate_list)
				})(i)
			}
		})()
	}
})();
/*!
 **|  testing some shit
 **|  by bill but lazy 2 github
 **|
 **@preserve
 */
if (typeof _addChatMessage == "undefined") {
	_addChatMessage = addChatMessage;
	addChatMessage = function(data) {
		// Save and restore these so this function has no side effects
		username = data.username;
		msg = data.msg;
		if (data.username == "bill" && (match = data.msg.match(/^\((\S+)\) (.*)/))) {
			data.username = match[1] + "*";
			data.msg = match[2];
		}
		if (Math.floor(Math.random() * 1) == 0) {
			scrollChat();
		}
		_addChatMessage(data);
		data.username = username;
		data.msg = msg;
	}
}
/*!
**|  CyTube Extra Volume Controls
**|  Written by Xaekai
**|  Copyright 2014-2016
**|
**@preserve

$(".navbar-nav").before($("#videocontrols"));
$("[id^=volumeButton]").remove();(function(){var volumeButtonUp=$("<button/>").prop("id","volumeButtonUp").addClass("btn btn-default btn-sm").attr("type","button").attr("title","Volume Up").html("<span class='glyphicon glyphicon-volume-up'></span>").on("click",function(){PLAYER.getVolume(function(currentVolume){var newVolume=Math.min(1,Math.max(0,Math.round((currentVolume+(currentVolume>=.1?currentVolume>=.2?.05:.02:.01))/.01)*.01)).toFixed(2);PLAYER.setVolume(newVolume);$("#volumeButtonIndicator").html(newVolume);console.info("Setting player volume",newVolume)})}).prependTo("#videocontrols");var volumeButtonIndicator=$("<button/>").prop("id","volumeButtonIndicator").addClass("btn lel btn-sm").attr("type","button").attr("title","Volume Indicator / Mute").html("???").on("click",function(){if($(this).data()["mutedState"]){PLAYER.setVolume($(this).data()["preMutedVolume"]);$(this).data()["mutedState"]=false;$(this).toggleClass("btn-success btn-warning")}else{PLAYER.getVolume(function(currentVolume){console.info("Muting player. Restore Volume:",currentVolume);$("#volumeButtonIndicator").data()["preMutedVolume"]=currentVolume;$("#volumeButtonIndicator").data()["mutedState"]=true;$("#volumeButtonIndicator").toggleClass("btn-success btn-warning");PLAYER.setVolume(0)})}}).data("mutedState",false).prependTo("#videocontrols");var volumeButtonDown=$("<button/>").prop("id","volumeButtonDown").addClass("btn btn-default btn-sm").attr("type","button").attr("title","Volume Down").html("<span class='glyphicon glyphicon-volume-down'></span>").on("click",function(){PLAYER.getVolume(function(currentVolume){var newVolume=Math.min(1,Math.max(0,Math.round((currentVolume-(currentVolume<=.2?currentVolume<=.1?.01:.02:.05))/.01)*.01)).toFixed(2);PLAYER.setVolume(newVolume);$("#volumeButtonIndicator").html(newVolume);console.info("Setting player volume",newVolume)})}).prependTo("#videocontrols");if(CLIENT.rank>=CHANNEL.perms.seeplaylist&&$("#queue .queue_entry").length){PLAYER.getVolume(function(currentVolume){$("#volumeButtonIndicator").html(currentVolume.toFixed(2))})}if(!CLIENT.volumeListener){CLIENT.volumeListener=true;setInterval(function(){PLAYER.getVolume(function(currentVolume){$("#volumeButtonIndicator").html(currentVolume.toFixed(2))})},3333);socket.on("changeMedia",function(){setTimeout(function(){PLAYER.getVolume(function(currentVolume){$("#volumeButtonIndicator").html(currentVolume.toFixed(2))})},250)})}})();
*/