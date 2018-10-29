function makeAlert(e, t, a, n) {
	a || (a = "alert-info");
	var s = $("<div/>").addClass("col-md-12"),
		o = $("<div/>").addClass("alert").addClass(a).appendTo(s);
	return n ? o.text(t) : o.html(t), $("<br/>").prependTo(o), $("<strong/>").text(e).prependTo(o),
		$("<button/>").addClass("close pull-right").html("&times;").click(
			function() {
				o.hide("fade", function() {
					s.remove()
				})
			}).prependTo(o), s
}


function formatURL(e) {
	switch (e.type) {
		case "yt":
			return "https://youtube.com/watch?v=" + e.id;
		case "vi":
			return "https://vimeo.com/" + e.id;
		case "dm":
			return "https://dailymotion.com/video/" + e.id;
		case "sc":
			return e.id;
		case "li":
			return "https://livestream.com/" + e.id;
		case "tw":
			return "https://twitch.tv/" + e.id;
		case "rt":
			return e.id;
		case "im":
			return "https://imgur.com/a/" + e.id;
		case "us":
			return "https://ustream.tv/channel/" + e.id;
		case "gd":
			return "https://docs.google.com/file/d/" + e.id;
		case "fi":
			return e.id;
		case "hb":
			return "https://www.smashcast.tv/" + e.id;
		case "hl":
			return e.id;
		case "sb":
			return "https://streamable.com/" + e.id;
		case "tc":
			return "https://clips.twitch.tv/" + e.id;
		case "cm":
			return e.id;
		case "mx":
			return "https://mixer.com/" + e.meta.mixer.channelToken;
		default:
			return "#"
	}
}

function findUserlistItem(e) {
	var t = $("#userlist .userlist_item");
	if (0 == t.length) return null;
	e = e.toLowerCase();
	var a = Object.keys(t);
	for (var n in a) {
		var s = a[n];
		if (!isNaN(parseInt(s))) {
			var o = t[s];
			if ($(o.children[1]).text().toLowerCase() == e) return $(o)
		}
	}
	return null
}

function formatUserlistItem(s) {
	var o = {
			name: s.data("name") || "",
			rank: s.data("rank"),
			profile: s.data("profile") || {
				image: "",
				text: ""
			},
			leader: s.data("leader") || !1,
			icon: s.data("icon") || !1
		},
		e = $(s.children()[1]);
	e.removeClass(), e.css("font-style", ""), e.addClass(getNameColor(o.rank)), s.find(".profile-box").remove();
	var t = s.data().meta || {};
	t.afk ? s.addClass("userlist_afk") : s.removeClass("userlist_afk"), t.muted ? s.addClass("userlist_muted") : s.removeClass("userlist_muted"), t.smuted ? s.addClass("userlist_smuted") : s.removeClass("userlist_smuted");
	var i = null;
	e.unbind("mouseenter"), e.unbind("mousemove"), e.unbind("mouseleave"), e.mouseenter(function(e) {
		i && i.remove();
		var t = e.clientY + 5,
			a = e.clientX;
		i = $("<div/>").addClass("profile-box linewrap").css("top", t + "px").appendTo(s), o.profile.image && $("<img/>").addClass("profile-image").attr("src", o.profile.image).appendTo(i),
			$("<strong/>").text(o.name).appendTo(i);
		var n = s.data("meta") || {};
		n.ip && ($("<br/>").appendTo(i),
				$("<em/>").text(n.ip).appendTo(i)), n.aliases && ($("<br/>").appendTo(i), $("<em/>").text("aliases: " + n.aliases.join(", ")).appendTo(i)),
			$("<hr/>").css("margin-top", "5px").css("margin-bottom", "5px").appendTo(i),
			$("<p/>").text(o.profile.text).appendTo(i),
			$("body").hasClass("synchtube") && (a -= i.outerWidth()), i.css("left", a + "px")
	}), e.mousemove(function(e) {
		var t = e.clientY + 5,
			a = e.clientX;
		$("body").hasClass("synchtube") && (a -= i.outerWidth()), i.css("left", a + "px").css("top", t + "px")
	}), e.mouseleave(function() {
		i.remove()
	});
	var a = s.children()[0];
	a.innerHTML = "", o.leader && $("<span/>").addClass("glyphicon glyphicon-star-empty").appendTo(a), s.data().meta.afk && (e.css("font-style", "italic"), $("<span/>").addClass("glyphicon glyphicon-time").appendTo(a)), o.icon && $("<span/>").addClass("glyphicon " + o.icon).prependTo(a)
}

function getNameColor(e) {
	return e >= Rank.Siteadmin ? "userlist_siteadmin" : e >= Rank.Admin ? "userlist_owner" : e >= Rank.Moderator ? "userlist_op" : e == Rank.Guest ? "userlist_guest" : ""
}

function addUserDropdown(t) {
	var a = t.data("name"),
		e = (t.data("rank"), t.data("leader")),
		n = t.data("meta") || {};
	t.find(".user-dropdown").remove();
	var s = $("<div/>").addClass("user-dropdown").appendTo(t).hide();
	$("<strong/>").text(a).appendTo(s), $("<br/>").appendTo(s);
	var o = $("<div/>").addClass("btn-group-vertical").appendTo(s),
		i = $("<button/>").addClass("btn btn-xs btn-default").appendTo(o).click(function() {
			-1 == IGNORED.indexOf(a) ? (i.text("Unignore User"), IGNORED.push(a)) : (i.text("Ignore User"), IGNORED.splice(IGNORED.indexOf(a), 1))
		});
	if (-1 == IGNORED.indexOf(a) ? i.text("Ignore User") : i.text("Unignore User"), a !== CLIENT.name) $("<button/>").addClass("btn btn-xs btn-default").text("Private Message").appendTo(o).click(function() {
		initPm(a).find(".panel-heading").click(), s.hide()
	});
	if (hasPermission("leaderctl")) {
		var r = $("<button/>").addClass("btn btn-xs btn-default").appendTo(o);
		e ? (r.text("Remove Leader"), r.click(function() {
			socket.emit("assignLeader", {
				name: ""
			})
		})) : (r.text("Give Leader"), r.click(function() {
			socket.emit("assignLeader", {
				name: a
			})
		}))
	}
	if (hasPermission("kick") && $("<button/>").addClass("btn btn-xs btn-default").text("Kick").click(function() {
			var e = prompt("Enter kick reason (optional)");
			null !== e && socket.emit("chatMsg", {
				msg: "/kick " + a + " " + e,
				meta: {}
			})
		}).appendTo(o), hasPermission("mute")) {
		var l = $("<button/>").addClass("btn btn-xs btn-default").text("Mute").click(function() {
				socket.emit("chatMsg", {
					msg: "/mute " + a,
					meta: {}
				})
			}).appendTo(o),
			d = $("<button/>").addClass("btn btn-xs btn-default").text("Shadow Mute").click(function() {
				socket.emit("chatMsg", {
					msg: "/smute " + a,
					meta: {}
				})
			}).appendTo(o),
			p = $("<button/>").addClass("btn btn-xs btn-default").text("Unmute").click(function() {
				socket.emit("chatMsg", {
					msg: "/unmute " + a,
					meta: {}
				})
			}).appendTo(o);
		n.muted ? (l.hide(), d.hide()) : p.hide()
	}
	hasPermission("ban") && ($("<button/>").addClass("btn btn-xs btn-default").text("Name Ban").click(function() {
		var e = prompt("Enter ban reason (optional)");
		null !== e && socket.emit("chatMsg", {
			msg: "/ban " + a + " " + e,
			meta: {}
		})
	}).appendTo(o), $("<button/>").addClass("btn btn-xs btn-default").text("IP Ban").click(function() {
		var e = prompt("Enter ban reason (optional)");
		null !== e && socket.emit("chatMsg", {
			msg: "/ipban " + a + " " + e,
			meta: {}
		})
	}).appendTo(o));
	var c = function(e) {
		return !!e.shiftKey || (e.preventDefault(), "none" == s.css("display") ? ($(".user-dropdown").hide(), $(document).bind("mouseup.userlist-ddown", function(e) {
			0 === s.has(e.target).length && 0 === t.parent().has(e.target).length && (s.hide(), $(document).unbind("mouseup.userlist-ddown"))
		}), s.show(), s.css("top", t.position().top)) : s.hide(), !1)
	};
	t.contextmenu(c), t.click(c)
}

function calcUserBreakdown() {
	var n = {
			"Site Admins": 0,
			"Channel Admins": 0,
			Moderators: 0,
			"Regular Users": 0,
			Guests: 0,
			Anonymous: 0,
			AFK: 0
		},
		s = 0;
	return $("#userlist .userlist_item").each(function(e, t) {
		var a = $(t).data("rank");
		255 <= a ? n["Site Admins"]++ : 3 <= a ? n["Channel Admins"]++ : 2 == a ? n.Moderators++ : 1 <= a ? n["Regular Users"]++ : n.Guests++, s++, $(t).data().meta.afk && n.AFK++
	}), n.Anonymous = CHANNEL.usercount - s, n
}

function sortUserlist() {
	var e = Array.prototype.slice.call($("#userlist .userlist_item"));
	e.sort(function(e, t) {
		var a = $(e).data("rank"),
			n = $(t).data("rank"),
			s = 0 < $(e).find(".glyphicon-time").length,
			o = 0 < $(t).find(".glyphicon-time").length,
			i = e.children[1].innerHTML.toLowerCase(),
			r = t.children[1].innerHTML.toLowerCase();
		if (USEROPTS.sort_afk) {
			if (s && !o) return 1;
			if (!s && o) return -1
		}
		if (USEROPTS.sort_rank) {
			if (a < n) return 1;
			if (n < a) return -1
		}
		return i === r ? 0 : i < r ? -1 : 1
	}), e.forEach(function(e) {
		$(e).detach()
	}), e.forEach(function(e) {
		$(e).appendTo($("#userlist"))
	})
}

function scrollQueue() {
	var e = playlistFind(PL_CURRENT);
	if (e) {
		e = $(e), $("#queue").scrollTop(0);
		var t = e.position().top - $("#queue").position().top;
		$("#queue").scrollTop(t)
	}
}

function makeQueueEntry(e, t) {
	var a = e.media,
		n = $("<li/>");
	n.addClass("queue_entry"), n.addClass("pluid-" + e.uid), n.data("uid", e.uid), n.data("media", a), n.data("temp", e.temp), a.thumb && $("<img/>").attr("src", a.thumb.url).css("float", "left").css("clear", "both").appendTo(n);
	$("<a/>").addClass("qe_title").appendTo(n).text(a.title).attr("href", formatURL(a)).attr("target", "_blank");
	$("<span/>").addClass("qe_time").appendTo(n).text(a.duration);
	$("<div/>").addClass("qe_clear").appendTo(n);
	return e.temp && n.addClass("queue_temp"), t && addQueueButtons(n), n
}

function makeSearchEntry(e) {
	var t = $("<li/>");
	t.addClass("queue_entry"), t.data("media", e), e.thumb && $("<img/>").attr("src", e.thumb.url).css("float", "left").css("clear", "both").appendTo(t);
	$("<a/>").addClass("qe_title").appendTo(t).text(e.title).attr("href", formatURL(e)).attr("target", "_blank");
	$("<span/>").addClass("qe_time").appendTo(t).text(e.duration);
	$("<div/>").addClass("qe_clear").appendTo(t);
	return t
}

function addQueueButtons(e) {
	e.find(".btn-group").remove();
	var t = $("<div/>").addClass("btn-group").appendTo(e);
	if (hasPermission("playlistjump") && $("<button/>").addClass("btn btn-xs btn-default qbtn-play").html("<span class='glyphicon glyphicon-play'></span>Play").click(function() {
			socket.emit("jumpTo", e.data("uid"))
		}).appendTo(t), hasPermission("playlistmove") && $("<button/>").addClass("btn btn-xs btn-default qbtn-next").html("<span class='glyphicon glyphicon-share-alt'></span>Queue Next").click(function() {
			socket.emit("moveMedia", {
				from: e.data("uid"),
				after: PL_CURRENT
			})
		}).appendTo(t), hasPermission("settemp")) {
		var a = e.data("temp") ? "Make Permanent" : "Make Temporary";
		$("<button/>").addClass("btn btn-xs btn-default qbtn-tmp").html("<span class='glyphicon glyphicon-flag'></span>" + a).click(function() {
			socket.emit("setTemp", {
				uid: e.data("uid"),
				temp: !e.data("temp")
			})
		}).appendTo(t)
	}
	hasPermission("playlistdelete") && $("<button/>").addClass("btn btn-xs btn-default qbtn-delete").html("<span class='glyphicon glyphicon-trash'></span>Delete").click(function() {
		socket.emit("delete", e.data("uid"))
	}).appendTo(t), (USEROPTS.qbtn_hide && !USEROPTS.qbtn_idontlikechange || 0 == t.find(".btn").length) && t.hide(), USEROPTS.qbtn_idontlikechange ? (t.addClass("pull-left"), t.detach().prependTo(e), t.find(".btn").each(function() {
		var e = $(this).find(".glyphicon");
		$(this).html(""), e.appendTo(this)
	}), t.find(".qbtn-play").addClass("btn-success"), t.find(".qbtn-delete").addClass("btn-danger")) : 0 != t.find(".btn").length && (e.unbind("contextmenu"), e.contextmenu(function(e) {
		return !!e.shiftKey || (e.preventDefault(), "none" == t.css("display") ? t.show("blind") : t.hide("blind"), !1)
	}))
}

function rebuildPlaylist() {
	var n = $("#queue li");
	if (0 != n.length) {
		REBUILDING = Math.random() + "";
		var s = REBUILDING,
			o = 0;
		n.each(function() {
			var e, t, a = $(this);
			e = o, t = s, setTimeout(function() {
				REBUILDING == t && (addQueueButtons(a), e == n.length - 1 && (scrollQueue(), REBUILDING = !1))
			}, 10 * e), o++
		})
	}
}

function showUserOptions() {
	CLIENT.rank < 2 ? $("a[href='#us-mod']").parent().hide() : $("a[href='#us-mod']").parent().show(), $("#us-theme").val(USEROPTS.theme), $("#us-layout").val(USEROPTS.layout), $("#us-no-channelcss").prop("checked", USEROPTS.ignore_channelcss), $("#us-no-channeljs").prop("checked", USEROPTS.ignore_channeljs), $("#us-synch").prop("checked", USEROPTS.synch), $("#us-synch-accuracy").val(USEROPTS.sync_accuracy), $("#us-wmode-transparent").prop("checked", USEROPTS.wmode_transparent), $("#us-hidevideo").prop("checked", USEROPTS.hidevid), $("#us-playlistbuttons").prop("checked", USEROPTS.qbtn_hide), $("#us-oldbtns").prop("checked", USEROPTS.qbtn_idontlikechange), $("#us-default-quality").val(USEROPTS.default_quality || "auto"), $("#us-chat-timestamp").prop("checked", USEROPTS.show_timestamps), $("#us-sort-rank").prop("checked", USEROPTS.sort_rank), $("#us-sort-afk").prop("checked", USEROPTS.sort_afk), $("#us-blink-title").val(USEROPTS.blink_title), $("#us-ping-sound").val(USEROPTS.boop), $("#us-sendbtn").prop("checked", USEROPTS.chatbtn), $("#us-no-emotes").prop("checked", USEROPTS.no_emotes), $("#us-strip-image").prop("checked", USEROPTS.strip_image), $("#us-chat-tab-method").val(USEROPTS.chat_tab_method), $("#us-modflair").prop("checked", USEROPTS.modhat), $("#us-shadowchat").prop("checked", USEROPTS.show_shadowchat), formatScriptAccessPrefs(), $("a[href='#us-general']").click(), $("#useroptions").modal()
}

function saveUserOptions() {
	USEROPTS.theme = $("#us-theme").val(), createCookie("cytube-theme", USEROPTS.theme, 1e3), USEROPTS.layout = $("#us-layout").val(), USEROPTS.ignore_channelcss = $("#us-no-channelcss").prop("checked"), USEROPTS.ignore_channeljs = $("#us-no-channeljs").prop("checked"), USEROPTS.synch = $("#us-synch").prop("checked"), USEROPTS.sync_accuracy = parseFloat($("#us-synch-accuracy").val()) || 2, USEROPTS.wmode_transparent = $("#us-wmode-transparent").prop("checked"), USEROPTS.hidevid = $("#us-hidevideo").prop("checked"), USEROPTS.qbtn_hide = $("#us-playlistbuttons").prop("checked"), USEROPTS.qbtn_idontlikechange = $("#us-oldbtns").prop("checked"), USEROPTS.default_quality = $("#us-default-quality").val(), USEROPTS.show_timestamps = $("#us-chat-timestamp").prop("checked"), USEROPTS.sort_rank = $("#us-sort-rank").prop("checked"), USEROPTS.sort_afk = $("#us-sort-afk").prop("checked"), USEROPTS.blink_title = $("#us-blink-title").val(), USEROPTS.boop = $("#us-ping-sound").val(), USEROPTS.chatbtn = $("#us-sendbtn").prop("checked"), USEROPTS.no_emotes = $("#us-no-emotes").prop("checked"), USEROPTS.strip_image = $("#us-strip-image").prop("checked"), USEROPTS.chat_tab_method = $("#us-chat-tab-method").val(), 2 <= CLIENT.rank && (USEROPTS.modhat = $("#us-modflair").prop("checked"), USEROPTS.show_shadowchat = $("#us-shadowchat").prop("checked")), storeOpts(), applyOpts()
}

function storeOpts() {
	for (var e in USEROPTS) setOpt(e, USEROPTS[e])
}

function applyOpts() {
	if ($("#usertheme").attr("href") !== USEROPTS.theme) {
		$("#usertheme").attr("id", "usertheme_old");
		var e = USEROPTS.theme;
		"default" === e && (e = DEFAULT_THEME), $("<link/>").attr("rel", "stylesheet").attr("type", "text/css").attr("id", "usertheme").attr("href", e).attr("onload", "$('#usertheme_old').remove()").appendTo($("head")), fixWeirdButtonAlignmentIssue()
	}
	switch (USEROPTS.layout) {
		case "synchtube-fluid":
			fluidLayout();
		case "synchtube":
			synchtubeLayout();
			break;
		case "fluid":
			fluidLayout();
			break;
		case "hd":
			hdLayout();
			break;
		default:
			compactLayout()
	}(USEROPTS.hidevid && removeVideo(), $("#chatbtn").remove(), USEROPTS.chatbtn) && $("<button/>").addClass("btn btn-default btn-block").text("Send").attr("id", "chatbtn").appendTo($("#chatwrap")).click(function() {
		$("#chatline").val().trim() && (socket.emit("chatMsg", {
			msg: $("#chatline").val(),
			meta: {}
		}), $("#chatline").val(""))
	});
	USEROPTS.modhat ? $("#modflair").removeClass("label-default").addClass("label-success") : $("#modflair").removeClass("label-success").addClass("label-default")
}

function parseTimeout(e) {
	var t;
	if (t = e.match(/^(\d+):(\d+):(\d+)$/)) return 3600 * parseInt(t[1], 10) + 60 * parseInt(t[2], 10) + parseInt(t[3], 10);
	if (t = e.match(/^(\d+):(\d+)$/)) return 60 * parseInt(t[1], 10) + parseInt(t[2], 10);
	if (t = e.match(/^(\d+)$/)) return parseInt(t[1], 10);
	throw new Error("Invalid timeout value '" + e + "'")
}

function showPollMenu() {
	$("#pollwrap .poll-menu").remove();
	var a = $("<div/>").addClass("well poll-menu").prependTo($("#pollwrap"));
	$("<button/>").addClass("btn btn-sm btn-danger pull-right").text("Cancel").appendTo(a).click(function() {
		a.remove()
	}), $("<strong/>").text("Title").appendTo(a);
	var n = $("<input/>").addClass("form-control").attr("maxlength", "255").attr("type", "text").appendTo(a);
	$("<strong/>").text("Timeout (optional)").appendTo(a), $("<p/>").text("If you specify a timeout, the poll will automatically be closed after that amount of time.  You can either specify the number of seconds or use the format minutes:seconds.  Examples: 90 (90 seconds), 5:30 (5 minutes, 30 seconds)").addClass("text-muted").appendTo(a);
	var s = $("<input/>").addClass("form-control").attr("type", "text").appendTo(a),
		o = null,
		e = $("<div/>").addClass("checkbox").appendTo(a),
		t = $("<label/>").text("Hide poll results until it closes").appendTo(e),
		i = $("<input/>").attr("type", "checkbox").prependTo(t);
	$("<strong/>").text("Options").appendTo(a);
	var r = $("<button/>").addClass("btn btn-sm btn-default").text("Add Option").appendTo(a);

	function l() {
		$("<input/>").addClass("form-control").attr("type", "text").attr("maxlength", "255").addClass("poll-menu-option").insertBefore(r)
	}
	r.click(l), l(), l(), $("<button/>").addClass("btn btn-default btn-block").text("Open Poll").appendTo(a).click(function() {
		var e = s.val().trim();
		if (e) try {
			e = parseTimeout(e)
		} catch (e) {
			return o && o.remove(), (o = $("<p/>").addClass("text-danger").text(e.message)).insertAfter(s), void s.focus()
		} else e = void 0;
		var t = [];
		a.find(".poll-menu-option").each(function() {
			"" != $(this).val() && t.push($(this).val())
		}), socket.emit("newPoll", {
			title: n.val(),
			opts: t,
			obscured: i.prop("checked"),
			timeout: e
		}, function(e) {
			e.error ? modalAlert({
				title: "Error creating poll",
				textContent: e.error.message
			}) : a.remove()
		})
	})
}

function scrollChat() {
	scrollAndIgnoreEvent($("#messagebuffer").prop("scrollHeight")), $("#newmessages-indicator").remove()
}

function scrollAndIgnoreEvent(e) {
	IGNORE_SCROLL_EVENT = !0, $("#messagebuffer").scrollTop(e)
}

function hasPermission(e) {
	if (0 == e.indexOf("playlist") && CHANNEL.openqueue) {
		var t = "o" + e;
		if ("number" == typeof(a = CHANNEL.perms[t]) && CLIENT.rank >= a) return !0
	}
	var a;
	return "number" == typeof(a = CHANNEL.perms[e]) && CLIENT.rank >= a
}

function setVisible(e, t) {
	if ($(e) && $(e).attr("id") != e.substring(1)) setTimeout(function() {
		setVisible(e, t)
	}, 100);
	else {
		var a = t ? "" : "none";
		$(e).css("display", a)
	}
}

function setParentVisible(e, t) {
	var a = t ? "" : "none";
	$(e).parent().css("display", a)
}

function handleModPermissions() {
	$("#cs-chanranks-adm").attr("disabled", CLIENT.rank < 4), $("#cs-chanranks-owner").attr("disabled", CLIENT.rank < 4), $("#cs-pagetitle").val(CHANNEL.opts.pagetitle), $("#cs-pagetitle").attr("disabled", CLIENT.rank < 3), $("#cs-externalcss").val(CHANNEL.opts.externalcss), $("#cs-externalcss").attr("disabled", CLIENT.rank < 3), $("#cs-externaljs").val(CHANNEL.opts.externaljs), $("#cs-externaljs").attr("disabled", CLIENT.rank < 3), $("#cs-chat_antiflood").prop("checked", CHANNEL.opts.chat_antiflood), "chat_antiflood_params" in CHANNEL.opts && ($("#cs-chat_antiflood_burst").val(CHANNEL.opts.chat_antiflood_params.burst), $("#cs-chat_antiflood_sustained").val(CHANNEL.opts.chat_antiflood_params.sustained)), $("#cs-show_public").prop("checked", CHANNEL.opts.show_public), $("#cs-show_public").attr("disabled", CLIENT.rank < 3), $("#cs-password").val(CHANNEL.opts.password || ""), $("#cs-password").attr("disabled", CLIENT.rank < 3), $("#cs-enable_link_regex").prop("checked", CHANNEL.opts.enable_link_regex), $("#cs-afk_timeout").val(CHANNEL.opts.afk_timeout), $("#cs-allow_voteskip").prop("checked", CHANNEL.opts.allow_voteskip), $("#cs-voteskip_ratio").val(CHANNEL.opts.voteskip_ratio), $("#cs-allow_dupes").prop("checked", CHANNEL.opts.allow_dupes), $("#cs-torbanned").prop("checked", CHANNEL.opts.torbanned), $("#cs-block_anonymous_users").prop("checked", CHANNEL.opts.block_anonymous_users), $("#cs-allow_ascii_control").prop("checked", CHANNEL.opts.allow_ascii_control), $("#cs-playlist_max_per_user").val(CHANNEL.opts.playlist_max_per_user || 0), $("#cs-playlist_max_duration_per_user").val(formatTime(CHANNEL.opts.playlist_max_duration_per_user)), $("#cs-new_user_chat_delay").val(formatTime(CHANNEL.opts.new_user_chat_delay || 0)), $("#cs-new_user_chat_link_delay").val(formatTime(CHANNEL.opts.new_user_chat_link_delay || 0)), $("#cs-maxlength").val(formatTime(CHANNEL.opts.maxlength)), $("#cs-csstext").val(CHANNEL.css), $("#cs-jstext").val(CHANNEL.js), $("#cs-motdtext").val(CHANNEL.motd), setParentVisible("a[href='#cs-motdeditor']", hasPermission("motdedit")), setParentVisible("a[href='#cs-permedit']", 3 <= CLIENT.rank), setParentVisible("a[href='#cs-banlist']", hasPermission("ban")), setParentVisible("a[href='#cs-csseditor']", 3 <= CLIENT.rank), setParentVisible("a[href='#cs-jseditor']", 3 <= CLIENT.rank), setParentVisible("a[href='#cs-chatfilters']", hasPermission("filteredit")), setParentVisible("a[href='#cs-emotes']", hasPermission("emoteedit")), setParentVisible("a[href='#cs-chanranks']", 3 <= CLIENT.rank), setParentVisible("a[href='#cs-chanlog']", 3 <= CLIENT.rank), $("#cs-chatfilters-import").attr("disabled", !hasPermission("filterimport")), $("#cs-emotes-import").attr("disabled", !hasPermission("filterimport"))
}

function handlePermissionChange() {
	if (2 <= CLIENT.rank && handleModPermissions(), $("#qlockbtn").attr("disabled", !hasPermission("playlistlock")), setVisible("#showchansettings", 2 <= CLIENT.rank), setVisible("#playlistmanagerwrap", 1 <= CLIENT.rank), setVisible("#modflair", 2 <= CLIENT.rank), setVisible("#guestlogin", CLIENT.rank < 0), setVisible("#chatline", 0 <= CLIENT.rank), setVisible("#queue", hasPermission("seeplaylist")), setVisible("#plmeta", hasPermission("seeplaylist")), $("#getplaylist").attr("disabled", !hasPermission("seeplaylist")), setVisible("#showplaylistmanager", hasPermission("seeplaylist")), setVisible("#showmediaurl", hasPermission("playlistadd")), setVisible("#showcustomembed", hasPermission("playlistaddcustom")), $("#queue_next").attr("disabled", !hasPermission("playlistnext")), (hasPermission("playlistadd") || hasPermission("playlistmove") || hasPermission("playlistjump") || hasPermission("playlistdelete") || hasPermission("settemp")) && USEROPTS.first_visit && 0 == $("#plonotification").length) {
		var e = makeAlert("Playlist Options", ["From the Options menu, you can choose to automatically", " hide the buttons on each entry (and show them when", " you right click).  You can also choose to use the old", " style of playlist buttons.", "<br>"].join("")).attr("id", "plonotification").insertAfter($("#queuefail"));
		e.find(".close").remove(), $("<button/>").addClass("btn btn-primary").text("Dismiss").appendTo(e.find(".alert")).click(function() {
			USEROPTS.first_visit = !1, storeOpts(), e.hide("fade", function() {
				e.remove()
			})
		})
	}
	var t;
	(hasPermission("playlistmove") ? ($("#queue").sortable("enable"), $("#queue").addClass("queue_sortable")) : ($("#queue").sortable("disable"), $("#queue").removeClass("queue_sortable")), setVisible("#clearplaylist", hasPermission("playlistclear")), setVisible("#shuffleplaylist", hasPermission("playlistshuffle")), hasPermission("addnontemp") ? $(".add-temp").attr("disabled", !1) : ($(".add-temp").prop("checked", !0), $(".add-temp").attr("disabled", !0)), fixWeirdButtonAlignmentIssue(), setVisible("#newpollbtn", hasPermission("pollctl")), $("#voteskip").attr("disabled", !hasPermission("voteskip") || !CHANNEL.opts.allow_voteskip), $("#pollwrap .active").find(".btn-danger").remove(), hasPermission("pollctl")) && (0 < (t = $("#pollwrap .active")).length && $("<button/>").addClass("btn btn-danger pull-right").text("End Poll").insertAfter(t.find(".close")).click(function() {
		socket.emit("closePoll")
	}));
	0 < (t = $("#pollwrap .active")).length && t.find(".btn").attr("disabled", !hasPermission("pollvote"));
	for (var a = $("#userlist").children(), n = 0; n < a.length; n++) addUserDropdown($(a[n]));
	$("#chatline").attr("disabled", !hasPermission("chat")), rebuildPlaylist()
}

function fixWeirdButtonAlignmentIssue() {
	var e = $("#videocontrols").removeClass("pull-right");
	setTimeout(function() {
		e.addClass("pull-right")
	}, 1)
}

function clearSearchResults() {
	$("#library").html(""), $("#search_clear").remove();
	var e = $("#library").data("paginator");
	e && e.paginator.html("")
}

function addLibraryButtons(e, t, a) {
	var n = $("<div/>").addClass("btn-group").addClass("pull-left").prependTo(e),
		s = t.id,
		o = t.type;
	hasPermission("playlistadd") && (hasPermission("playlistnext") && $("<button/>").addClass("btn btn-xs btn-default").text("Next").click(function() {
		socket.emit("queue", {
			id: s,
			pos: "next",
			type: o,
			temp: $(".add-temp").prop("checked")
		})
	}).appendTo(n), $("<button/>").addClass("btn btn-xs btn-default").text("End").click(function() {
		socket.emit("queue", {
			id: s,
			pos: "end",
			type: o,
			temp: $(".add-temp").prop("checked")
		})
	}).appendTo(n)), hasPermission("deletefromchannellib") && "library" === a && $("<button/>").addClass("btn btn-xs btn-danger").html("<span class='glyphicon glyphicon-trash'></span>").click(function() {
		socket.emit("uncache", {
			id: s
		}), e.hide("fade", function() {
			e.remove()
		})
	}).appendTo(n)
}
var AsyncQueue = function() {
	this._q = [], this._lock = !1, this._tm = 0
};
AsyncQueue.prototype.next = function() {
	if (0 < this._q.length) {
		if (!this.lock()) return;
		var e = this._q.shift(),
			t = e[0];
		e[1];
		this._tm = Date.now() + e[1], t(this)
	}
}, AsyncQueue.prototype.lock = function() {
	return this._lock ? 0 < this._tm && Date.now() > this._tm && !(this._tm = 0) : this._lock = !0
}, AsyncQueue.prototype.release = function() {
	return !!this._lock && (this._lock = !1, this.next(), !0)
}, AsyncQueue.prototype.queue = function(e) {
	this._q.push([e, 2e4]), this.next()
}, AsyncQueue.prototype.reset = function() {
	this._q = [], this._lock = !1
};
var PL_ACTION_QUEUE = new AsyncQueue;

function playlistFind(e) {
	var t = document.getElementById("queue").children;
	for (var a in t)
		if ("string" == typeof t[a].className && 0 < t[a].className.split(" ").indexOf("pluid-" + e)) return t[a];
	return !1
}

function playlistMove(e, t, a) {
	var n = $(".pluid-" + e);
	if (0 != n.length) {
		var s = $("#queue");
		if ("prepend" === t) n.hide("blind", function() {
			n.detach(), n.prependTo(s), n.show("blind", a)
		});
		else if ("append" === t) n.hide("blind", function() {
			n.detach(), n.appendTo(s), n.show("blind", a)
		});
		else {
			var o = $(".pluid-" + t);
			if (0 == o.length) return void a(!1);
			n.hide("blind", function() {
				n.detach(), n.insertAfter(o), n.show("blind", a)
			})
		}
	} else a(!1)
}

function extractQueryParam(e, t) {
	var a = {};
	return e.split("&").forEach(function(e) {
		e = e.split("="), a[e[0]] = e[1]
	}), a[t]
}

function parseMediaLink(e) {
	if ("string" != typeof e) return {
		id: null,
		type: null
	};
	if (0 == (e = (e = e.trim()).replace("feature=player_embedded&", "")).indexOf("rtmp://")) return {
		id: e,
		type: "rt"
	};
	var t;
	if (t = e.match(/youtube\.com\/watch\?([^#]+)/)) return {
		id: extractQueryParam(t[1], "v"),
		type: "yt"
	};
	if (t = e.match(/youtu\.be\/([^\?&#]+)/)) return {
		id: t[1],
		type: "yt"
	};
	if (t = e.match(/youtube\.com\/playlist\?([^#]+)/)) return {
		id: extractQueryParam(t[1], "list"),
		type: "yp"
	};
	if (t = e.match(/clips\.twitch\.tv\/([A-Za-z]+)/)) return {
		id: t[1],
		type: "tc"
	};
	if (t = e.match(/twitch\.tv\/(?:.*?)\/([cv])\/(\d+)/)) return {
		id: t[1] + t[2],
		type: "tv"
	};
	if (t = e.match(/twitch\.tv\/videos\/(\d+)/)) return {
		id: "v" + t[1],
		type: "tv"
	};
	if (t = e.match(/twitch\.tv\/([\w-]+)/)) return {
		id: t[1],
		type: "tw"
	};
	if (t = e.match(/livestream\.com\/([^\?&#]+)/)) return {
		id: t[1],
		type: "li"
	};
	if (t = e.match(/ustream\.tv\/([^\?&#]+)/)) return {
		id: t[1],
		type: "us"
	};
	if (t = e.match(/(?:hitbox|smashcast)\.tv\/([^\?&#]+)/)) return {
		id: t[1],
		type: "hb"
	};
	if (t = e.match(/vimeo\.com\/([^\?&#]+)/)) return {
		id: t[1],
		type: "vi"
	};
	if (t = e.match(/dailymotion\.com\/video\/([^\?&#_]+)/)) return {
		id: t[1],
		type: "dm"
	};
	if (t = e.match(/imgur\.com\/a\/([^\?&#]+)/)) return {
		id: t[1],
		type: "im"
	};
	if (t = e.match(/soundcloud\.com\/([^\?&#]+)/)) return {
		id: e,
		type: "sc"
	};
	if ((t = e.match(/(?:docs|drive)\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/)) || (t = e.match(/drive\.google\.com\/open\?id=([a-zA-Z0-9_-]+)/))) return {
		id: t[1],
		type: "gd"
	};
	if ((t = e.match(/vid\.me\/embedded\/([\w-]+)/)) || (t = e.match(/vid\.me\/([\w-]+)/))) return {
		id: t[1],
		type: "vm"
	};
	if (t = e.match(/(.*\.m3u8)/)) return {
		id: e,
		type: "hl"
	};
	if (t = e.match(/streamable\.com\/([\w-]+)/)) return {
		id: t[1],
		type: "sb"
	};
	if (t = e.match(/\bmixer\.com\/([\w-]+)/)) return {
		id: t[1],
		type: "mx"
	};
	if (t = e.match(/^dm:([^\?&#_]+)/)) return {
		id: t[1],
		type: "dm"
	};
	if (t = e.match(/^fi:(.*)/)) return {
		id: t[1],
		type: "fi"
	};
	if (t = e.match(/^cm:(.*)/)) return {
		id: t[1],
		type: "cm"
	};
	if (t = e.match(/^([a-z]{2}):([^\?&#]+)/)) return {
		id: t[2],
		type: t[1]
	};
	var a = e.split("?")[0];
	if (a.match(/^https?:\/\//)) {
		if (a.match(/^http:/)) throw Callbacks.queueFail({
			link: e,
			msg: "Raw files must begin with 'https'.  Plain http is not supported."
		}), new Error("ERROR_QUEUE_HTTP");
		if (a.match(/\.json$/)) return {
			id: e,
			type: "cm"
		};
		if (a.match(/\.(mp4|flv|webm|og[gv]|mp3|mov|m4a)$/)) return {
			id: e,
			type: "fi"
		};
		throw Callbacks.queueFail({
			link: e,
			msg: "The file you are attempting to queue does not match the supported file extensions mp4, flv, webm, ogg, ogv, mp3, mov, m4a. For more information about why other filetypes are not supported, see https://git.io/va9g9"
		}), new Error("ERROR_QUEUE_UNSUPPORTED_EXTENSION")
	}
	return {
		id: null,
		type: null
	}
}

function sendVideoUpdate() {
	CLIENT.leader && PLAYER.getTime(function(e) {
		socket.emit("mediaUpdate", {
			id: PLAYER.mediaId,
			currentTime: e,
			paused: PLAYER.paused,
			type: PLAYER.mediaType
		})
	})
}

function stripImages(e) {
	return USEROPTS.strip_image ? e.replace(IMAGE_MATCH, function(e, t) {
		return CHANNEL.opts.enable_link_regex ? '<a target="_blank" href="' + t + '">' + t + "</a>" : t
	}) : e
}

function formatChatMessage(e, t) {
	e.meta && !e.msgclass || (e.meta = {
		addClass: e.msgclass,
		addClassToNameAndTimestamp: e.msgclass
	});
	var a = e.username === t.name;
	"server-whisper" === e.meta.addClass && (a = !0), e.msg.match(/^\s*<strong>\w+\s*:\s*<\/strong>\s*/) && (a = !1), e.meta.forceShowName && (a = !1), e.msg = stripImages(e.msg), e.msg = execEmotes(e.msg), t.name = e.username;
	var n = $("<div/>");
	if ("drink" === e.meta.addClass && (n.addClass("drink"), e.meta.addClass = ""), USEROPTS.show_timestamps) {
		var s = $("<span/>").addClass("timestamp").appendTo(n),
			o = new Date(e.time).toTimeString().split(" ")[0];
		s.text("[" + o + "] "), e.meta.addClass && e.meta.addClassToNameAndTimestamp && s.addClass(e.meta.addClass)
	}
	var i = $("<span/>");
	a || i.appendTo(n), $("<strong/>").addClass("username").text(e.username + ": ").appendTo(i), e.meta.modflair && i.addClass(getNameColor(e.meta.modflair)), e.meta.addClass && e.meta.addClassToNameAndTimestamp && i.addClass(e.meta.addClass), e.meta.superadminflair && (i.addClass("label").addClass(e.meta.superadminflair.labelclass), $("<span/>").addClass(e.meta.superadminflair.icon).addClass("glyphicon").css("margin-right", "3px").prependTo(i));
	var r = $("<span/>").appendTo(n);
	return r[0].innerHTML = e.msg, e.meta.action && (i.remove(), r[0].innerHTML = e.username + " " + e.msg), e.meta.addClass && r.addClass(e.meta.addClass), e.meta.shadow && n.addClass("chat-shadow"), n
}

function addChatMessage(e) {
	if (-1 === IGNORED.indexOf(e.username) && (!e.meta.shadow || USEROPTS.show_shadowchat)) {
		var t = $("#messagebuffer"),
			a = formatChatMessage(e, LASTCHAT),
			n = e.username.replace(/[^\w-]/g, "\\$");
		a.addClass("chat-msg-" + n), a.appendTo(t), a.mouseover(function() {
			$(".chat-msg-" + n).addClass("nick-hover")
		}), a.mouseleave(function() {
			$(".nick-hover").removeClass("nick-hover")
		});
		var s = t.prop("scrollHeight"),
			o = trimChatBuffer();
		if (SCROLLCHAT) scrollChat();
		else {
			var i = $("#newmessages-indicator");
			if (!i.length) {
				i = $("<div/>").attr("id", "newmessages-indicator").insertBefore($("#chatline"));
				var r = $("<span/>").attr("id", "newmessages-indicator-bghack").appendTo(i);
				$("<span/>").addClass("glyphicon glyphicon-chevron-down").appendTo(r), $("<span/>").text("New Messages Below").appendTo(r), $("<span/>").addClass("glyphicon glyphicon-chevron-down").appendTo(r), i.click(function() {
					SCROLLCHAT = !0, scrollChat()
				})
			}
			if (0 < o) {
				IGNORE_SCROLL_EVENT = !0;
				var l = s - t.prop("scrollHeight");
				scrollAndIgnoreEvent(t.scrollTop() - l)
			}
		}
		a.find("img").load(function() {
			SCROLLCHAT ? scrollChat() : $(this).position().top < 0 && scrollAndIgnoreEvent(t.scrollTop() + $(this).height())
		});
		var d = !1;
		CLIENT.name && e.username != CLIENT.name && -1 != e.msg.toLowerCase().indexOf(CLIENT.name.toLowerCase()) && (a.addClass("nick-highlight"), d = !0), pingMessage(d)
	}
}

function trimChatBuffer() {
	var e = window.CHATMAXSIZE;
	e && "number" == typeof e || (e = parseInt(e || 100, 10) || 100);
	for (var t = document.getElementById("messagebuffer"), a = t.childNodes.length - e, n = 0; n < a; n++) t.firstChild.remove();
	return a
}

function pingMessage(e) {
	FOCUSED || (!TITLE_BLINK && ("always" === USEROPTS.blink_title || "onlyping" === USEROPTS.blink_title && e) && (TITLE_BLINK = setInterval(function() {
		"*Chat*" == document.title ? document.title = PAGETITLE : document.title = "*Chat*"
	}, 1e3)), ("always" === USEROPTS.boop || "onlyping" === USEROPTS.boop && e) && CHATSOUND.play())
}

function undoHDLayout() {
	$("body").removeClass("hd"), $("#drinkbar").detach().removeClass().addClass("col-lg-12 col-md-12").appendTo("#drinkbarwrap"), $("#chatwrap").detach().removeClass().addClass("col-lg-5 col-md-5").appendTo("#main"), $("#videowrap").detach().removeClass().addClass("col-lg-7 col-md-7").appendTo("#main"), $("#leftcontrols").detach().removeClass().addClass("col-lg-5 col-md-5").prependTo("#controlsrow"), $("#plcontrol").detach().appendTo("#rightcontrols"), $("#videocontrols").detach().appendTo("#rightcontrols"), $("#playlistrow").prepend('<div id="leftpane" class="col-lg-5 col-md-5" />'), $("#leftpane").append('<div id="leftpane-inner" class="row" />'), $("#pollwrap").detach().removeClass().addClass("col-lg-12 col-md-12").appendTo("#leftpane-inner"), $("#playlistmanagerwrap").detach().removeClass().addClass("col-lg-12 col-md-12").css("margin-top", "10px").appendTo("#leftpane-inner"), $("#rightpane").detach().removeClass().addClass("col-lg-7 col-md-7").appendTo("#playlistrow"), $("nav").addClass("navbar-fixed-top"), $("#mainpage").css("padding-top", "60px"), $("#queue").css("max-height", "500px"), $("#messagebuffer, #userlist").css("max-height", "")
}

function compactLayout() {
	$("body").hasClass("synchtube") && ($("body").removeClass("synchtube"), $("#chatwrap").detach().insertBefore($("#videowrap")), $("#leftcontrols").detach().insertBefore($("#rightcontrols")), $("#leftpane").detach().insertBefore($("#rightpane")), $("#userlist").css("float", "left"), $("#userlisttoggle").hasClass("glyphicon-chevron-left") && $("#userlisttoggle").removeClass("glyphicon-chevron-left").addClass("glyphicon-chevron-right"), $("#userlisttoggle").removeClass("pull-right").addClass("pull-left")), $("body").hasClass("fluid") && ($("body").removeClass("fluid"), $(".container-fluid").removeClass("container-fluid").addClass("container")), $("body").hasClass("hd") && undoHDLayout(), $("body").addClass("compact"), handleVideoResize()
}

function fluidLayout() {
	$("body").hasClass("hd") && undoHDLayout(), $(".container").removeClass("container").addClass("container-fluid"), $("footer .container-fluid").removeClass("container-fluid").addClass("container"), $("body").addClass("fluid"), handleVideoResize()
}

function synchtubeLayout() {
	$("body").hasClass("hd") && undoHDLayout(), $("#userlisttoggle").hasClass("glyphicon-chevron-right") && $("#userlisttoggle").removeClass("glyphicon-chevron-right").addClass("glyphicon-chevron-left"), $("#userlisttoggle").removeClass("pull-left").addClass("pull-right"), $("#videowrap").detach().insertBefore($("#chatwrap")), $("#rightcontrols").detach().insertBefore($("#leftcontrols")), $("#rightpane").detach().insertBefore($("#leftpane")), $("#userlist").css("float", "right"), $("body").addClass("synchtube")
}

function hdLayout() {
	var e = $("#videowrap"),
		t = $("#chatwrap"),
		a = $("#rightpane");
	e.detach().insertAfter($("#drinkbar")).removeClass().addClass("col-md-8 col-md-offset-2"), a.detach().insertBefore(t).removeClass().addClass("col-md-6"), t.removeClass().addClass("col-md-6");
	$("#messagebuffer").css("max-height", "320px"), $("#userlist").css("max-height", "320px"), $("#queue").css("max-height", "312px"), $("#leftcontrols").detach().insertAfter(t).removeClass().addClass("col-md-6"), $("#playlistmanagerwrap").detach().insertBefore($("#leftcontrols")).css("margin-top", "0").removeClass().addClass("col-md-6"), $("#showplaylistmanager").addClass("btn-sm");
	var n = $("<div/>").addClass("col-md-12").prependTo($("#rightpane-inner"));
	$("#plcontrol").detach().appendTo(n), $("#videocontrols").detach().appendTo(n), $("#controlswrap").remove(), $("#pollwrap").detach().insertAfter($("#leftcontrols")).removeClass().addClass("col-md-6 col-md-offset-6"), $("#leftpane").remove(), $("nav.navbar-fixed-top").removeClass("navbar-fixed-top"), $("#mainpage").css("padding-top", "0"), $("body").addClass("hd"), handleVideoResize()
}

function chatOnly() {
	var e = $("#chatwrap").detach();
	removeVideo(), $("#wrap").remove(), $("footer").remove(), e.prependTo($("body")), e.css({
		"min-height": "100%",
		"min-width": "100%",
		margin: "0",
		padding: "0"
	}), $("<span/>").addClass("label label-default pull-right pointer").text("User Options").appendTo($("#chatheader")).click(showUserOptions), $("<span/>").addClass("label label-default pull-right pointer").attr("id", "showchansettings").text("Channel Settings").appendTo($("#chatheader")).click(function() {
		$("#channeloptions").modal()
	}), $("<span/>").addClass("label label-default pull-right pointer").text("Emote List").appendTo($("#chatheader")).click(function() {
		EMOTELIST.show()
	}), setVisible("#showchansettings", 2 <= CLIENT.rank), $("body").addClass("chatOnly"), handleWindowResize()
}

function handleWindowResize() {
	if ($("body").hasClass("chatOnly")) {
		var e = $("body").outerHeight() - $("#chatline").outerHeight() - $("#chatheader").outerHeight();
		return $("#messagebuffer").outerHeight(e), void $("#userlist").outerHeight(e)
	}
	handleVideoResize(), scrollChat()
}

function handleVideoResize() {
	if (0 !== $("#ytapiplayer").length) {
		var a, n = 0,
			e = function() {
				if (10 < ++n && clearInterval(a), !($("#ytapiplayer").parent().outerHeight() <= 0)) {
					clearInterval(a);
					var e = $("#ytapiplayer").parent(),
						t = e.outerHeight() - $("#chatline").outerHeight() - 2;
					$("#messagebuffer").height(t), $("#userlist").height(t), $("#ytapiplayer").attr("height", VHEIGHT = e.outerHeight()), $("#ytapiplayer").attr("width", VWIDTH = e.outerWidth())
				}
			};
		0 < $("#ytapiplayer").height() ? e() : a = setInterval(e, 500)
	}
}

function removeVideo(e) {
	try {
		PLAYER.setVolume(0)
	} catch (e) {}
	$("#videowrap").remove(), $("#chatwrap").removeClass("col-lg-5 col-md-5").addClass("col-md-12"), e && e.preventDefault()
}

function genPermissionsEditor() {
	$("#cs-permedit").html("");
	var l = $("<form/>").addClass("form-horizontal").attr("action", "javascript:void(0)").appendTo($("#cs-permedit"));

	function e(e, t, a, n) {
		var s = $("<div/>").addClass("form-group").appendTo(l);
		$("<label/>").addClass("control-label col-sm-4").text(e).appendTo(s);
		for (var o = $("<div/>").addClass("col-sm-8").appendTo(s), i = $("<select/>").addClass("form-control").appendTo(o).data("key", t), r = 0; r < a.length; r++) $("<option/>").attr("value", a[r][1]).text(a[r][0]).attr("selected", n === a[r][1]).appendTo(i)
	}

	function t(e, t) {
		$("<hr/>").appendTo(l), t || $("<h3/>").text(e).appendTo(l)
	}
	var a = [
			["Anonymous", "-1"],
			["Guest", "0"],
			["Registered", "1"],
			["Leader", "1.5"],
			["Moderator", "2"],
			["Channel Admin", "3"],
			["Nobody", "1000000"]
		],
		n = [
			["Leader", "1.5"],
			["Moderator", "2"],
			["Channel Admin", "3"],
			["Nobody", "1000000"]
		],
		s = [
			["Moderator", "2"],
			["Channel Admin", "3"],
			["Nobody", "1000000"]
		];
	$("<h3/>").text("Open playlist permissions").appendTo(l), e("Add to playlist", "oplaylistadd", a, CHANNEL.perms.oplaylistadd + ""), e("Add/move to next", "oplaylistnext", a, CHANNEL.perms.oplaylistnext + ""), e("Move playlist items", "oplaylistmove", a, CHANNEL.perms.oplaylistmove + ""), e("Delete playlist items", "oplaylistdelete", a, CHANNEL.perms.oplaylistdelete + ""), e("Jump to video", "oplaylistjump", a, CHANNEL.perms.oplaylistjump + ""), e("Queue playlist", "oplaylistaddlist", a, CHANNEL.perms.oplaylistaddlist + ""), t("General playlist permissions"), e("View the playlist", "seeplaylist", a, CHANNEL.perms.seeplaylist + ""), e("Add to playlist", "playlistadd", a, CHANNEL.perms.playlistadd + ""), e("Add/move to next", "playlistnext", a, CHANNEL.perms.playlistnext + ""), e("Move playlist items", "playlistmove", a, CHANNEL.perms.playlistmove + ""), e("Delete playlist items", "playlistdelete", a, CHANNEL.perms.playlistdelete + ""), e("Jump to video", "playlistjump", a, CHANNEL.perms.playlistjump + ""), e("Queue playlist", "playlistaddlist", a, CHANNEL.perms.playlistaddlist + ""), e("Queue livestream", "playlistaddlive", a, CHANNEL.perms.playlistaddlive + ""), e("Embed custom media", "playlistaddcustom", a, CHANNEL.perms.playlistaddcustom + ""), e("Add raw video file", "playlistaddrawfile", a, CHANNEL.perms.playlistaddrawfile + ""), e("Exceed maximum media length", "exceedmaxlength", a, CHANNEL.perms.exceedmaxlength + ""), e("Exceed maximum total media length", "exceedmaxdurationperuser", a, CHANNEL.perms.exceedmaxdurationperuser + ""), e("Exceed maximum number of videos per user", "exceedmaxitems", a, CHANNEL.perms.exceedmaxitems + ""), e("Add nontemporary media", "addnontemp", a, CHANNEL.perms.addnontemp + ""), e("Temp/untemp playlist item", "settemp", a, CHANNEL.perms.settemp + ""), e("Lock/unlock playlist", "playlistlock", n, CHANNEL.perms.playlistlock + ""), e("Shuffle playlist", "playlistshuffle", a, CHANNEL.perms.playlistshuffle + ""), e("Clear playlist", "playlistclear", a, CHANNEL.perms.playlistclear + ""), e("Delete from channel library", "deletefromchannellib", a, CHANNEL.perms.deletefromchannellib + ""), t("Polls"), e("Open/Close poll", "pollctl", n, CHANNEL.perms.pollctl + ""), e("Vote", "pollvote", a, CHANNEL.perms.pollvote + ""), e("View hidden poll results", "viewhiddenpoll", a, CHANNEL.perms.viewhiddenpoll + ""), e("Voteskip", "voteskip", a, CHANNEL.perms.voteskip + ""), e("View voteskip results", "viewvoteskip", a, CHANNEL.perms.viewvoteskip + ""), t("Moderation"), e("Assign/Remove leader", "leaderctl", s, CHANNEL.perms.leaderctl + ""), e("Mute users", "mute", n, CHANNEL.perms.mute + ""), e("Kick users", "kick", n, CHANNEL.perms.kick + ""), e("Ban users", "ban", s, CHANNEL.perms.ban + ""), e("Edit MOTD", "motdedit", s, CHANNEL.perms.motdedit + ""), e("Edit chat filters", "filteredit", s, CHANNEL.perms.filteredit + ""), e("Import chat filters", "filterimport", s, CHANNEL.perms.filterimport + ""), e("Edit chat emotes", "emoteedit", s, CHANNEL.perms.emoteedit + ""), e("Import chat emotes", "emoteimport", s, CHANNEL.perms.emoteimport + ""), t("Misc"), e("Drink calls", "drink", n, CHANNEL.perms.drink + ""), e("Chat", "chat", [
		["Guest", "0"],
		["Registered", "1"],
		["Leader", "1.5"],
		["Moderator", "2"],
		["Channel Admin", "3"],
		["Nobody", "1000000"]
	], CHANNEL.perms.chat + ""), e("Clear Chat", "chatclear", n, CHANNEL.perms.chatclear + "");
	var o = $("<div/>").addClass("form-group").appendTo(l),
		i = $("<div/>").addClass("col-sm-8 col-sm-offset-4").appendTo(o),
		r = $("<button/>").addClass("btn btn-primary").appendTo(i);
	r.text("Save"), r.click(function() {
		var e = {};
		l.find("select").each(function() {
			e[$(this).data("key")] = parseFloat($(this).val())
		}), socket.emit("setPermissions", e)
	});
	var d = $("<div/>").addClass("form-group").insertAfter(o),
		p = $("<div/>").addClass("col-sm-8 col-sm-offset-4").appendTo(d);
	$("<span/>").addClass("text-info").text("Permissions updated").appendTo(p);
	setTimeout(function() {
		d.hide("fade", function() {
			d.remove()
		})
	}, 5e3)
}

function waitUntilDefined(e, t, a) {
	void 0 !== e[t] ? a() : setTimeout(function() {
		waitUntilDefined(e, t, a)
	}, 100)
}

function chatDialog(e) {
	var t = $("<div/>").addClass("profile-box").css({
		padding: "10px",
		"z-index": "auto",
		position: "absolute"
	}).appendTo($("#chatwrap"));
	e.appendTo(t);
	var a = $("#chatwrap").width(),
		n = $("#chatwrap").height(),
		s = a / 2 - t.width() / 2,
		o = n / 2 - t.height() / 2;
	return t.css("left", s + "px"), t.css("top", o + "px"), t
}

function errDialog(e) {
	var t = $("<div/>").addClass("profile-box").css("padding", "10px").text(e).appendTo($("body"));
	$("<br/>").appendTo(t), $("<button/>").addClass("btn btn-xs btn-default").css("width", "100%").text("OK").click(function() {
		t.remove()
	}).appendTo(t);
	var a = $("#chatwrap").width(),
		n = $("#chatwrap").height(),
		s = $("#chatwrap").offset(),
		o = s.left + a / 2 - t.width() / 2,
		i = s.top + n / 2 - t.height() / 2;
	return t.css("left", o + "px").css("top", i + "px").css("position", "absolute"), t
}

function modalAlert(e) {
	if ("object" != typeof e || null === e) throw new Error("modalAlert() called without required parameter");
	var t = makeModal();
	t.addClass("cytube-modal-alert"), t.removeClass("fade"), t.find(".modal-dialog").addClass("modal-dialog-nonfluid"), e.title && $("<h3/>").text(e.title).appendTo(t.find(".modal-header"));
	var a = $("<div/>").addClass("modal-body");
	e.htmlContent ? a.html(e.htmlContent) : e.textContent && a.text(e.textContent), a.appendTo(t.find(".modal-content"));
	var n = $("<div/>").addClass("modal-footer");
	$("<button/>").addClass("btn btn-primary").attr({
		"data-dismiss": "modal"
	}).text(e.dismissText || "OK").appendTo(n);
	n.appendTo(t.find(".modal-content")), t.appendTo(document.body), t.modal()
}

function queueMessage(e, t) {
	e || (e = {
		link: null
	}), e.msg && !0 !== e.msg || (e.msg = "Queue failed.  Check your link to make sure it is valid.");
	var a = "label-danger",
		n = "Error";
	"alert-warning" === t && (a = "label-warning", n = "Warning");
	for (var s = $(".qfalert.qf-" + t + " .alert"), o = 0; o < s.length; o++) {
		var i = $(s[o]);
		if (i.data("reason") === e.msg) {
			if (0 < (d = i.find("." + a)).length) {
				var r = i.find(".qflinks");
				$("<a/>").attr("href", e.link).attr("target", "_blank").text(e.link).appendTo(r), $("<br/>").appendTo(r);
				var l = parseInt(d.text().match(/\d+/)[0]) + 1;
				d.text(d.text().replace(/\d+/, "" + l))
			} else {
				var d = $("<span/>").addClass("label pull-right pointer " + a).text("+ 1 more").appendTo(i);
				r = $("<div/>").addClass("qflinks").appendTo(i).hide();
				$("<a/>").attr("href", e.link).attr("target", "_blank").text(e.link).appendTo(r), $("<br/>").appendTo(r), d.click(function() {
					r.toggle()
				})
			}
			return
		}
	}
	var p = e.msg;
	p = p.replace(/(https?:[^ ]+)/g, "<a href='$1' target='_blank'>$1</a>"), "string" == typeof e.link && (p += "<br><a href='" + e.link + "' target='_blank'>" + e.link + "</a>"), makeAlert(n, p, t).addClass("linewrap qfalert qf-" + t).prependTo($("#queuefail")).find(".alert").data("reason", e.msg)
}

function setupChanlogFilter(e) {
	e = e.split("\n").filter(function(e) {
		return 0 === e.indexOf("[") && 0 < e.indexOf("]")
	});
	var t = $("#cs-chanlog-text"),
		a = $("#cs-chanlog-filter");
	a.html(""), t.data("lines", e);
	var n = {};
	e.forEach(function(e) {
		var t = e.match(/^\[.*?\] \[(\w+?)\].*$/);
		t && (n[t[1]] = !0)
	}), Object.keys(n).forEach(function(e) {
		$("<option/>").attr("value", e).text(e).appendTo(a)
	}), $("<option/>").attr("value", "chat").text("chat").prependTo(a)
}

function filterChannelLog() {
	var e = $("#cs-chanlog-text"),
		o = $("#cs-chanlog-filter").val(),
		i = [];
	(e.data("lines") || []).forEach(function(e) {
		var t, a, n, s = (a = (t = e).indexOf("[", 1), n = t.indexOf("]", a), -1 !== a && t.substring(a + 1, n));
		!o || !s && -1 !== o.indexOf("chat") ? i.push(e) : 0 <= o.indexOf(s) && i.push(e)
	}), e.text(i.join("\n")), e.scrollTop(e.prop("scrollHeight"))
}

function makeModal() {
	var e = $("<div/>").addClass("modal fade"),
		t = $("<div/>").addClass("modal-dialog").appendTo(e),
		a = $("<div/>").addClass("modal-content").appendTo(t),
		n = $("<div/>").addClass("modal-header").appendTo(a);
	return $("<button/>").addClass("close").attr("data-dismiss", "modal").attr("data-hidden", "true").html("&times;").appendTo(n), e.on("hidden.bs.modal", function() {
		e.remove()
	}), e
}

function formatCSModList() {
	var i = $("#cs-chanranks table");
	i.find("tbody").remove();
	var e = i.data("entries") || [];
	e.sort(function(e, t) {
		if (e.rank === t.rank) {
			var a = e.name.toLowerCase(),
				n = t.name.toLowerCase();
			return n == a ? 0 : a < n ? -1 : 1
		}
		return t.rank - e.rank
	}), e.forEach(function(n) {
		var e = $("<tr/>").addClass("cs-chanrank-tr-" + n.name);
		$("<td/>").text(n.name).appendTo(e).addClass(getNameColor(n.rank));
		var t = $("<td/>"),
			a = ($("<span/>").text(n.rank).appendTo(t), $("<div/>").addClass("btn-group")),
			s = $("<button/>").addClass("btn btn-xs btn-default dropdown-toggle").attr("data-toggle", "dropdown").html("Edit <span class=caret></span>").appendTo(a);
		CLIENT.rank <= n.rank && (4 !== CLIENT.rank || 4 !== n.rank) && s.addClass("disabled");
		var o = $("<ul/>").addClass("dropdown-menu").attr("role", "menu").appendTo(a);
		[{
			name: "Remove Moderator",
			rank: 1
		}, {
			name: "Moderator",
			rank: 2
		}, {
			name: "Admin",
			rank: 3
		}, {
			name: "Owner",
			rank: 4
		}, {
			name: "Founder",
			rank: 5
		}].forEach(function(e) {
			var t = $("<li/>").appendTo(o),
				a = $("<a/>").addClass(getNameColor(e.rank)).attr("href", "javascript:void(0)").text(e.name).appendTo(t);
			e.rank !== n.rank ? a.click(function() {
				socket.emit("setChannelRank", {
					name: n.name,
					rank: e.rank
				})
			}) : ($("<span/>").addClass("glyphicon glyphicon-ok").appendTo(a), t.addClass("disabled")), (e.rank > CLIENT.rank || CLIENT.rank < 4 && e.rank === CLIENT.rank) && t.addClass("disabled")
		}), a.css("margin-right", "10px").prependTo(t), t.appendTo(e), e.appendTo(i)
	})
}

function formatCSBanlist() {
	var s = $("#cs-banlist table");
	s.find("tbody").remove();
	for (var e = s.data("entries") || [], t = {}, a = 0; a < e.length; a++) e[a].name in t || (t[e[a].name] = []), t[e[a].name].push(e[a]);
	var n = [];
	for (var o in t) n.push({
		name: o,
		bans: t[o]
	});
	n.sort(function(e, t) {
		var a = e.name.toLowerCase(),
			n = t.name.toLowerCase();
		return a === n ? 0 : n < a ? 1 : -1
	});
	var i = function(e, t) {
		var a = $("<tr/>");
		t ? a.insertAfter(t) : a.appendTo(s);
		var n = $("<button/>").addClass("btn btn-xs btn-danger").appendTo($("<td/>").appendTo(a));
		return n.click(function() {
			socket.emit("unban", {
				id: e.id,
				name: e.name
			})
		}), $("<span/>").addClass("glyphicon glyphicon-remove-circle").appendTo(n), $("<td/>").text(e.ip).appendTo(a), $("<td/>").text(e.name).appendTo(a), $("<td/>").text(e.bannedby).appendTo(a), a.attr("title", "Ban Reason: " + e.reason), a
	};
	n.forEach(function(e) {
		var a = e.bans,
			n = (e.name, i(a.shift()));
		if (0 < a.length) {
			var s = $("<button/>").addClass("btn btn-xs btn-default pull-right");
			$("<span/>").addClass("glyphicon glyphicon-list").appendTo(s), s.appendTo(n.find("td")[1]), s.click(function() {
				if (s.data("elems")) s.data("elems").forEach(function(e) {
					e.remove()
				}), s.data("elems", null);
				else {
					var t = [];
					a.forEach(function(e) {
						t.push(i(e, n))
					}), s.data("elems", t)
				}
			})
		}
	})
}

function checkEntitiesInStr(e) {
	var t = {
			"&": "&amp;",
			"<": "&lt;",
			">": "&gt;",
			'"': "&quot;",
			"'": "&#39;",
			"\\(": "&#40;",
			"\\)": "&#41;"
		},
		a = e.match(/([&<>"'])|(\\\()|(\\\))/);
	return !!(a && a[1] in t) && {
		src: a[1].replace(/^\\/, ""),
		replace: t[a[1]]
	}
}

function formatCSChatFilterList() {
	var f = $("#cs-chatfilters table");
	f.find("tbody").remove(), f.find(".ui-sortable").remove(), (f.data("entries") || []).forEach(function(c) {
		var m = $("<tr/>").appendTo(f),
			e = $("<div/>").addClass("btn-group").appendTo($("<td/>").appendTo(m)),
			u = $("<button/>").addClass("btn btn-xs btn-default").attr("title", "Edit this filter").appendTo(e);
		$("<span/>").addClass("glyphicon glyphicon-list").appendTo(u);
		var t = $("<button/>").addClass("btn btn-xs btn-danger").appendTo(e);
		$("<span/>").addClass("glyphicon glyphicon-trash").appendTo(t), t.click(function() {
			socket.emit("removeFilter", c)
		});
		$("<code/>").text(c.name).appendTo($("<td/>").appendTo(m));
		var a = $("<td/>").appendTo(m),
			h = ($("<input/>").attr("type", "checkbox").prop("checked", c.active).appendTo(a).change(function() {
				c.active = $(this).prop("checked"), socket.emit("updateFilter", c)
			}), function() {
				u.data("editor") && u.data("editor").remove(), u.data("editor", null), u.parent().find(".btn-success").remove();
				var e = $(f.children()[1]);
				0 === e.find(".filter-edit-row").length && e.sortable("enable")
			});
		u.click(function() {
			if (u.data("editor")) return h();
			$(f.children()[1]).sortable("disable");
			var e = $("<tr/>").insertAfter(m).addClass("filter-edit-row"),
				t = $("<td/>").attr("colspan", "3").appendTo(e),
				a = $("<form/>").addClass("form-inline").attr("role", "form").attr("action", "javascript:void(0)").appendTo(t),
				n = function(e) {
					var t = $("<div/>").addClass("form-group").appendTo(a).css("margin-right", "10px");
					return $("<input/>").addClass("form-control").attr("type", "text").attr("placeholder", e).attr("title", e).appendTo(t)
				},
				s = n("Filter regex").val(c.source),
				o = n("Regex flags").val(c.flags),
				i = n("Replacement text").val(c.replace),
				r = $("<div/>").addClass("checkbox").appendTo(a),
				l = $("<label/>").text("Filter Links").appendTo(r),
				d = $("<input/>").attr("type", "checkbox").prependTo(l).prop("checked", c.filterlinks),
				p = $("<button/>").addClass("btn btn-xs btn-success").attr("title", "Save changes").insertAfter(u);
			$("<span/>").addClass("glyphicon glyphicon-floppy-save").appendTo(p), p.click(function() {
				c.source = s.val();
				var e = checkEntitiesInStr(c.source);
				e && alert("Warning: " + e.src + " will be replaced by " + e.replace + " in the message preprocessor.  This regular expression may not match what you intended it to match."), c.flags = o.val(), c.replace = i.val(), c.filterlinks = d.prop("checked"), socket.emit("updateFilter", c), socket.once("updateFilterSuccess", function() {
					h()
				})
			}), u.data("editor", e)
		})
	}), $(f.children()[1]).sortable({
		start: function(e, t) {
			FILTER_FROM = t.item.prevAll().length
		},
		update: function(e, t) {
			FILTER_TO = t.item.prevAll().length, FILTER_TO != FILTER_FROM && socket.emit("moveFilter", {
				from: FILTER_FROM,
				to: FILTER_TO
			})
		}
	})
}

function formatTime(e) {
	var t = Math.floor(e / 3600) + "",
		a = Math.floor(e % 3600 / 60) + "",
		n = e % 60 + "";
	return t.length < 2 && (t = "0" + t), a.length < 2 && (a = "0" + a), n.length < 2 && (n = "0" + n), "00" === t ? [a, n].join(":") : [t, a, n].join(":")
}

function formatUserPlaylistList() {
	var e = $("#userpl_list").data("entries") || [];
	e.sort(function(e, t) {
		var a = e.name.toLowerCase(),
			n = t.name.toLowerCase();
		return a == n ? 0 : a < n ? -1 : 1
	}), $("#userpl_list").html(""), e.forEach(function(e) {
		var t = $("<li/>").addClass("queue_entry").appendTo($("#userpl_list")),
			a = ($("<span/>").addClass("qe_title").appendTo(t).text(e.name), $("<span/>").addClass("pull-right").appendTo(t).text(e.count + " items, playtime " + formatTime(e.duration)), $("<div/>").addClass("qe_clear").appendTo(t), $("<div/>").addClass("btn-group pull-left").prependTo(t));
		hasPermission("playlistadd") && $("<button/>").addClass("btn btn-xs btn-default").text("End").appendTo(a).click(function() {
			socket.emit("queuePlaylist", {
				name: e.name,
				pos: "end",
				temp: $(".add-temp").prop("checked")
			})
		}), hasPermission("playlistadd") && hasPermission("playlistnext") && $("<button/>").addClass("btn btn-xs btn-default").text("Next").prependTo(a).click(function() {
			socket.emit("queuePlaylist", {
				name: e.name,
				pos: "next",
				temp: $(".add-temp").prop("checked")
			})
		}), $("<button/>").addClass("btn btn-xs btn-danger").html("<span class='glyphicon glyphicon-trash'></span>").attr("title", "Delete playlist").appendTo(a).click(function() {
			confirm("Are you sure you want to delete this playlist? This cannot be undone.") && socket.emit("deletePlaylist", {
				name: e.name
			})
		})
	})
}

function loadEmotes(e) {
	CHANNEL.emotes = [], CHANNEL.emoteMap = {}, CHANNEL.badEmotes = [], e.forEach(function(e) {
		var t;
		e.image && e.name ? (e.regex = new RegExp(e.source, "gi"), CHANNEL.emotes.push(e), /\s/g.test(e.name) ? CHANNEL.badEmotes.push(e) : CHANNEL.emoteMap[(t = e.name, t = t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"))] = e) : console.error("Rejecting invalid emote: " + JSON.stringify(e))
	})
}

function execEmotes(t) {
	return USEROPTS.no_emotes ? t : CyTube.featureFlag && CyTube.featureFlag.efficientEmotes ? execEmotesEfficient(t) : (CHANNEL.emotes.forEach(function(e) {
		t = t.replace(e.regex, '$1<img class="channel-emote" src="' + e.image + '" title="' + e.name + '">')
	}), t)
}

function execEmotesEfficient(t) {
	return CHANNEL.badEmotes.forEach(function(e) {
		t = t.replace(e.regex, '$1<img class="channel-emote" src="' + e.image + '" title="' + e.name + '">')
	}), t = t.replace(/[^\s]+/g, function(e) {
		if (CHANNEL.emoteMap.hasOwnProperty(e)) {
			var t = CHANNEL.emoteMap[e];
			return '<img class="channel-emote" src="' + t.image + '" title="' + t.name + '">'
		}
		return e
	})
}

function initPm(n) {
	if (0 < $("#pm-" + n).length) return $("#pm-" + n);
	var t = $("<div/>").addClass("panel panel-default pm-panel").appendTo($("#pmbar")).data("last", {
			name: ""
		}).attr("id", "pm-" + n),
		e = $("<div/>").addClass("panel-heading").text(n).appendTo(t),
		a = ($("<button/>").addClass("close pull-right").html("&times;").appendTo(e).click(function() {
			t.remove(), $("#pm-placeholder-" + n).remove()
		}), $("<div/>").addClass("panel-body").appendTo(t).hide());
	e.click(function() {
		if (a.toggle(), t.removeClass("panel-primary").addClass("panel-default"), a.is(":hidden")) t.css("position", ""), $("#pm-placeholder-" + n).remove();
		else {
			$("<div/>").addClass("pm-panel-placeholder").attr("id", "pm-placeholder-" + n).insertAfter(t);
			var e = t.position().left;
			t.css("position", "absolute").css("bottom", "0px").css("left", e)
		}
	});
	$("<div/>").addClass("pm-buffer linewrap").appendTo(a);
	$("<hr/>").appendTo(a);
	var s = $("<input/>").addClass("form-control pm-input").attr("type", "text").attr("maxlength", 240).appendTo(a);
	return s.keydown(function(e) {
		if (13 === e.keyCode) {
			if (CHATTHROTTLE) return;
			var t = {},
				a = s.val();
			if ("" === a.trim()) return;
			USEROPTS.modhat && CLIENT.rank >= Rank.Moderator && (t.modflair = CLIENT.rank), 2 <= CLIENT.rank && 0 === a.indexOf("/m ") && (t.modflair = CLIENT.rank, a = a.substring(3)), socket.emit("pm", {
				to: n,
				msg: a,
				meta: t
			}), s.val("")
		}
	}), t
}

function checkScriptAccess(e, t, a) {
	var n = JSPREF[CHANNEL.name.toLowerCase() + "_" + t];
	if ("ALLOW" === n) return a("ALLOW");
	if ("DENY" !== n) {
		var s = $("#chanjs-allow-prompt");
		if (0 < s.length) return void setTimeout(function() {
			checkScriptAccess(e, t, a)
		}, 500);
		s = $("<div/>").attr("id", "chanjs-allow-prompt");
		var o = $("<button/>").addClass("close pull-right").html("&times;").appendTo(s),
			i = $("<form/>").attr("action", "javascript:void(0)").attr("id", "chanjs-allow-prompt").attr("style", "text-align: center").appendTo(s);
		"embedded" === t ? i.append("<span>This channel has special features that require your permission to run.</span><br>") : i.append("<span>This channel has special features that require your permission to run.  This script is hosted on a third-party website and is not endorsed by the owners of the website hosting this channel.</span><br>"), $(e).appendTo(i), i.append("<div id='chanjs-allow-prompt-buttons'><button id='chanjs-allow' class='btn btn-xs btn-danger'>Allow</button><button id='chanjs-deny' class='btn btn-xs btn-danger'>Deny</button></div>"), i.append("<div class='checkbox'><label><input type='checkbox' id='chanjs-save-pref'/>Remember my choice for this channel</label></div>");
		var r = chatDialog(s);
		o.click(function() {
			r.remove(), a("DENY")
		}), $("#chanjs-allow").click(function() {
			var e = $("#chanjs-save-pref").is(":checked");
			r.remove(), e && (JSPREF[CHANNEL.name.toLowerCase() + "_" + t] = "ALLOW", setOpt("channel_js_pref", JSPREF)), a("ALLOW")
		}), $("#chanjs-deny").click(function() {
			var e = $("#chanjs-save-pref").is(":checked");
			r.remove(), e && (JSPREF[CHANNEL.name.toLowerCase() + "_" + t] = "DENY", setOpt("channel_js_pref", JSPREF)), a("DENY")
		})
	}
}

function formatScriptAccessPrefs() {
	var c = $("#us-scriptcontrol table");
	c.find("tbody").remove(), Object.keys(JSPREF).sort().forEach(function(e) {
		var t = String(e).lastIndexOf("_");
		if (t < 0) return console.error("Channel JS pref: invalid key '" + e + "', deleting it"), delete JSPREF[e], void setOpt("channel_js_pref", JSPREF);
		var a = e.substring(0, t),
			n = e.substring(t + 1);
		if (console.log(a, n), "external" !== n && "embedded" !== n) return console.error("Channel JS pref: invalid key '" + e + "', deleting it"), delete JSPREF[e], void setOpt("channel_js_pref", JSPREF);
		var s = JSPREF[e],
			o = $("<tr/>").appendTo(c);
		$("<td/>").text(a).appendTo(o), $("<td/>").text(n).appendTo(o);
		var i = $("<td/>").appendTo(o),
			r = $("<label/>").addClass("radio-inline").text("Allow").appendTo(i),
			l = $("<input/>").attr("type", "radio").prop("checked", "ALLOW" === s).prependTo(r);
		l.change(function() {
			l.is(":checked") && (JSPREF[e] = "ALLOW", setOpt("channel_js_pref", JSPREF), p.prop("checked", !1))
		});
		var d = $("<label/>").addClass("radio-inline").text("Deny").appendTo(i),
			p = $("<input/>").attr("type", "radio").prop("checked", "DENY" === s).prependTo(d);
		p.change(function() {
			p.is(":checked") && (JSPREF[e] = "DENY", setOpt("channel_js_pref", JSPREF), l.prop("checked", !1))
		});
		$("<button/>").addClass("btn btn-sm btn-danger").text("Clear Preference").appendTo($("<td/>").appendTo(o)).click(function() {
			delete JSPREF[e], setOpt("channel_js_pref", JSPREF), o.remove()
		})
	})
}

function EmoteList(e, t) {
	this.elem = $(e), this.initSearch(), this.initSortOption(), this.table = this.elem.find(".emotelist-table")[0], this.paginatorContainer = this.elem.find(".emotelist-paginator-container"), this.cols = 5, this.itemsPerPage = 25, this.emotes = [], this.page = 0, this.emoteClickCallback = t || function() {}
}

function onEmoteClicked(e) {
	var t = chatline.value;
	t ? (t.charAt(t.length - 1).match(/\s/) || (chatline.value += " "), chatline.value += e.name) : chatline.value = e.name, window.EMOTELISTMODAL.modal("hide"), chatline.focus()
}

function CSEmoteList(e) {
	EmoteList.call(this, e)
}

function showChannelSettings() {
	$("#channeloptions").modal()
}

function startQueueSpinner(e) {
	if (!(0 < $("#queueprogress").length)) {
		var t = e.id;
		"yp" === e.type && (t = "$any");
		var a = $("<div/>").addClass("progress").attr("id", "queueprogress").data("queue-id", t);
		$("<div/>").addClass("progress-bar progress-bar-striped active").attr({
			role: "progressbar",
			"aria-valuenow": "100",
			"aria-valuemin": "0",
			"aria-valuemax": "100"
		}).css({
			width: "100%"
		}).appendTo(a);
		a.appendTo($("#addfromurl"))
	}
}

function stopQueueSpinner(e) {
	e && "us" === e.type ? e = {
		id: e.title.match(/Ustream.tv - (.*)/)[1]
	} : e && "mx" === e.type && (e = {
		id: e.meta.mixer.channelToken
	});
	var t = null !== e && "object" == typeof e && $("#queueprogress").data("queue-id") === e.id;
	(t = (t = t || null === e) || "$any" === $("#queueprogress").data("queue-id")) && $("#queueprogress").remove()
}

function maybePromptToUpgradeUserscript() {
	if (!document.getElementById("prompt-upgrade-drive-userscript") && window.hasDriveUserscript) {
		var e = GS_VERSION.toString(),
			t = window.driveUserscriptVersion;
		t || (t = "1.0"), e = e.split(".").map(function(e) {
			return parseInt(e, 10)
		}), t = t.split(".").map(function(e) {
			return parseInt(e, 10)
		});
		for (var a = !1, n = 0; n < e.length; n++) t[n] < e[n] && (a = !0);
		if (a) {
			var s = document.createElement("div");
			s.id = "prompt-upgrade-drive-userscript", s.className = "alert alert-info", s.innerHTML = "A newer version of the Google Drive userscript is available.", s.appendChild(document.createElement("br"));
			var o = document.createElement("a");
			o.className = "btn btn-info", o.href = "/google_drive_userscript", o.textContent = "Click here for installation instructions", o.target = "_blank", s.appendChild(o);
			var i = document.createElement("button");
			i.className = "close pull-right", i.innerHTML = "&times;", i.onclick = function() {
				s.parentNode.removeChild(s)
			}, s.insertBefore(i, s.firstChild), document.getElementById("videowrap").appendChild(s)
		}
	}
}

function backoffRetry(o, i, r) {
	var l = r.jitter || 0,
		d = r.factor || 1,
		p = r.isRetryable || function() {
			return !0
		},
		c = 0;
	o(function e(t, a) {
		if (c++, d *= d, t) {
			if (c >= r.maxTries) console.log("Max tries exceeded"), i(t, a);
			else if (p(t)) {
				var n = Math.random() * l,
					s = r.delay * d + n;
				console.log("Retrying on error: " + t), console.log("Waiting " + s + " ms before retrying"), setTimeout(function() {
					o(e)
				}, s)
			}
		} else i(t, a)
	})
}
$(window).resize(handleWindowResize), handleWindowResize(), EmoteList.prototype.initSearch = function() {
	this.searchbar = this.elem.find(".emotelist-search");
	var e = this;
	this.searchbar.keyup(function() {
		var t = this.value.toLowerCase();
		e.filter = t ? function(e) {
			return 0 <= e.name.toLowerCase().indexOf(t)
		} : null, e.handleChange(), e.loadPage(0)
	})
}, EmoteList.prototype.initSortOption = function() {
	this.sortOption = this.elem.find(".emotelist-alphabetical"), this.sortAlphabetical = !1;
	var e = this;
	this.sortOption.change(function() {
		e.sortAlphabetical = this.checked, e.handleChange(), e.loadPage(0)
	})
}, EmoteList.prototype.handleChange = function() {
	this.emotes = CHANNEL.emotes.slice(), this.sortAlphabetical && this.emotes.sort(function(e, t) {
		var a = e.name.toLowerCase(),
			n = t.name.toLowerCase();
		return a < n ? -1 : n < a ? 1 : 0
	}), this.filter && (this.emotes = this.emotes.filter(this.filter)), this.paginator = new NewPaginator(this.emotes.length, this.itemsPerPage, this.loadPage.bind(this)), this.paginatorContainer.html(""), this.paginatorContainer.append(this.paginator.elem), this.paginator.loadPage(this.page)
}, EmoteList.prototype.loadPage = function(e) {
	var s, t = this.table.children[0];
	t.innerHTML = "";
	var a = e * this.itemsPerPage;
	if (!(a >= this.emotes.length)) {
		for (var n = Math.min(a + this.itemsPerPage, this.emotes.length), o = this, i = a; i < n; i++)(i - a) % this.cols == 0 && (s = document.createElement("tr"), t.appendChild(s)),
			function(e) {
				var t = document.createElement("td");
				t.className = "emote-preview-container";
				var a = document.createElement("span");
				a.className = "emote-preview-hax", t.appendChild(a);
				var n = document.createElement("img");
				n.src = e.image, n.className = "emote-preview", n.title = e.name, n.onclick = o.emoteClickCallback.bind(null, e), t.appendChild(n), s.appendChild(t)
			}(this.emotes[i]);
		this.page = e
	}
}, window.EMOTELIST = new EmoteList("#emotelist", onEmoteClicked), window.EMOTELIST.sortAlphabetical = USEROPTS.emotelist_sort, CSEmoteList.prototype = Object.create(EmoteList.prototype), CSEmoteList.prototype.loadPage = function(e) {
	var t = this.table.children[1];
	t.innerHTML = "";
	var a = e * this.itemsPerPage;
	if (!(a >= this.emotes.length)) {
		var n = Math.min(a + this.itemsPerPage, this.emotes.length);
		this.page = e;
		for (var s = a; s < n; s++) {
			var o = document.createElement("tr");
			t.appendChild(o),
				function(d, i) {
					var e = document.createElement("td"),
						t = document.createElement("button");
					t.className = "btn btn-xs btn-danger";
					var a = document.createElement("span");
					a.className = "glyphicon glyphicon-trash", t.appendChild(a), e.appendChild(t), i.appendChild(e), t.onclick = function() {
						document.getElementById("cs-emotes-newname").value = d.name, document.getElementById("cs-emotes-newimage").value = d.image, socket.emit("removeEmote", d)
					};
					var r = document.createElement("td"),
						l = document.createElement("code");
					l.textContent = d.name, r.appendChild(l), i.appendChild(r);
					var n = $(l);
					n.click(function(e) {
						n.detach();
						var o = document.createElement("input");

						function t() {
							var t = o.value;
							if (r.removeChild(o), r.appendChild(l), t !== d.name) {
								if (CHANNEL.emotes.filter(function(e) {
										return e.name === t
									}).length) {
									var e = document.createElement("tr"),
										a = document.createElement("td");
									e.appendChild(a);
									var n = document.createElement("td");
									e.appendChild(n);
									var s = document.createElement("p");
									return n.appendChild(s), s.className = "text-warning", s.textContent = "An emote of that name already exists.", n.colSpan = "2", i.insertAdjacentElement("beforebegin", e), void $(e).delay(2500).fadeOut("slow", function() {
										$(this).remove()
									})
								}
								socket.emit("renameEmote", {
									old: d.name,
									image: d.image,
									name: t
								})
							}
						}
						o.className = "form-control", o.type = "text", o.value = d.name, r.appendChild(o), o.focus(), o.onblur = t, o.onkeyup = function(e) {
							13 === e.keyCode && t()
						}
					});
					var p = document.createElement("td"),
						c = document.createElement("code");
					c.textContent = d.image, p.appendChild(c), i.appendChild(p);
					var m = $(c);
					m.popover({
						html: !0,
						trigger: "hover",
						content: '<img src="' + d.image + '" class="channel-emote">'
					}), m.click(function(e) {
						$(p).find(".popover").remove(), m.detach();
						var t = document.createElement("div");
						t.className = "input-group";
						var a = document.createElement("input");
						a.className = "form-control", a.type = "text", a.value = d.image, t.appendChild(a);
						var n = document.createElement("div");
						n.className = "input-group-btn";
						var s = document.createElement("button");
						s.className = "btn btn-success", s.textContent = "Save", s.type = "button", n.appendChild(s);
						var o = document.createElement("button");
						o.className = "btn btn-danger", o.textContent = "Cancel", o.type = "button", n.appendChild(o), t.appendChild(n), p.appendChild(t);
						var i = document.createElement("span");

						function r() {
							var e = a.value;
							e !== d.image ? /imgur\.com/i.test(e) ? /has-error/.test(t.className) || (t.className += " has-error", i.textContent = IMGUR_EMOTE_MSG, p.appendChild(i)) : (socket.emit("updateEmote", {
								name: d.name,
								image: e
							}), l()) : l()
						}

						function l() {
							p.removeChild(t), p.appendChild(c), i.parentElement === p && p.removeChild(i)
						}
						i.className = "text-danger", a.focus(), o.onclick = l, s.onclick = r, a.onkeyup = function(e) {
							13 === e.keyCode && r()
						}
					})
				}(this.emotes[s], o)
		}
	}
}, window.CSEMOTELIST = new CSEmoteList("#cs-emotes"), window.CSEMOTELIST.sortAlphabetical = USEROPTS.emotelist_sort, CyTube.ui.changeVideoWidth = function(e) {
	var t = document.body;
	if (/hd/.test(t.className)) throw new Error("ui::changeVideoWidth does not work with the 'hd' layout");
	var a = document.getElementById("videowrap"),
		n = document.getElementById("leftcontrols"),
		s = document.getElementById("leftpane"),
		o = document.getElementById("chatwrap"),
		i = document.getElementById("rightcontrols"),
		r = document.getElementById("rightpane"),
		l = a.className.match(/col-md-(\d+)/);
	if (!l) throw new Error("ui::changeVideoWidth: videowrap is missing bootstrap class!");
	var d = parseInt(l[1], 10) + e;
	if (!(d < 3 || 9 < d)) {
		var p = 12 - d;
		a.className = "col-md-" + d + " col-lg-" + d, i.className = "col-md-" + d + " col-lg-" + d, r.className = "col-md-" + d + " col-lg-" + d, o.className = "col-md-" + p + " col-lg-" + p, n.className = "col-md-" + p + " col-lg-" + p, s.className = "col-md-" + p + " col-lg-" + p, handleVideoResize()
	}
}, CyTube._internal_do_not_use_or_you_will_be_banned.addUserToList = function(e, t) {
	if (t) {
		var a = findUserlistItem(e.name);
		null !== a && a.remove()
	}
	var n = $("<div/>").addClass("userlist_item");
	$("<span/>").appendTo(n), $("<span/>").text(e.name).appendTo(n);
	n.data("name", e.name), n.data("rank", e.rank), n.data("leader", Boolean(e.leader)), n.data("profile", e.profile), n.data("meta", e.meta), e.meta.muted || e.meta.smuted ? n.data("icon", "glyphicon-volume-off") : n.data("icon", !1), formatUserlistItem(n), addUserDropdown(n, e), n.appendTo($("#userlist"))
};