Callbacks = {
	connect: function() {
		HAS_CONNECTED_BEFORE = !0, SOCKETIO_CONNECT_ERROR_COUNT = 0, $("#socketio-connect-error").remove(), socket.emit("joinChannel", {
			name: CHANNEL.name
		}), CHANNEL.opts.password && socket.emit("channelPassword", CHANNEL.opts.password), CLIENT.name && CLIENT.guest && socket.emit("login", {
			name: CLIENT.name
		}), $("<div/>").addClass("server-msg-reconnect").text("Connected").appendTo($("#messagebuffer")), scrollChat(), stopQueueSpinner(null)
	},
	disconnect: function() {
		KICKED || ($("<div/>").addClass("server-msg-disconnect").text("Disconnected from server.").appendTo($("#messagebuffer")), scrollChat())
	},
	error: function(e) {
		window.SOCKET_ERROR_REASON = e, $("<div/>").addClass("server-msg-disconnect").text("Unable to connect: " + e).appendTo($("#messagebuffer"))
	},
	errorMsg: function(e) {
		e.alert ? alert(e.msg) : errDialog(e.msg)
	},
	costanza: function(e) {
		$("#costanza-modal").modal("hide");
		var t = makeModal();
		t.attr("id", "costanza-modal").appendTo($("body"));
		var n = $("<div/>").addClass("modal-body").appendTo(t.find(".modal-content"));
		$("<img/>").attr("src", "http://i0.kym-cdn.com/entries/icons/original/000/005/498/1300044776986.jpg").appendTo(n), $("<strong/>").text(e.msg).appendTo(n), t.modal()
	},
	announcement: function(e) {
		if (!e.id || !CyTube.ui.suppressedAnnouncementId || e.id !== CyTube.ui.suppressedAnnouncementId) {
			$("#announcements").html("");
			var t = "<br>—" + e.from,
				n = makeAlert(e.title, e.text + t).appendTo($("#announcements"));
			e.id && n.find(".close").click(function() {
				CyTube.ui.suppressedAnnouncementId = e.id, setOpt("suppressed_announcement_id", e.id)
			})
		}
	},
	kick: function(e) {
		KICKED = !0, $("<div/>").addClass("server-msg-disconnect").text("Kicked: " + e.reason).appendTo($("#messagebuffer")), scrollChat()
	},
	noflood: function(e) {
		$("<div/>").addClass("server-msg-disconnect").text(e.action + ": " + e.msg).appendTo($("#messagebuffer")), scrollChat()
	},
	spamFiltered: function(e) {
		var t = "Spam Filtered.";
		switch (e.reason) {
			case "NEW_USER_CHAT":
				t = "Your account is too new to chat in this channel.  Please wait a while and try again.";
				break;
			case "NEW_USER_CHAT_LINK":
				t = "Your account is too new to post links in this channel.  Please wait a while and try again."
		}
		errDialog(t)
	},
	needPassword: function(e) {
		var t = $("<div/>");
		$("<strong/>").text("Channel Password").appendTo(t), e && ($("<br/>").appendTo(t), $("<span/>").addClass("text-error").text("Wrong Password").appendTo(t));
		var n = $("<input/>").addClass("form-control").attr("type", "password").appendTo(t),
			a = $("<button/>").addClass("btn btn-xs btn-default btn-block").css("margin-top", "5px").text("Submit").appendTo(t),
			o = chatDialog(t);
		o.attr("id", "needpw");
		var s = function() {
			socket.emit("channelPassword", n.val()), o.remove()
		};
		a.click(s), n.keydown(function(e) {
			13 == e.keyCode && s()
		}), n.focus()
	},
	cancelNeedPassword: function() {
		$("#needpw").remove()
	},
	cooldown: function(e) {
		e += 200, $("#chatline").css("color", "#ff0000"), $(".pm-input").css("color", "#ff0000"), CHATTHROTTLE && $("#chatline").data("throttle_timer") && clearTimeout($("#chatline").data("throttle_timer")), CHATTHROTTLE = !0, $("#chatline").data("throttle_timer", setTimeout(function() {
			CHATTHROTTLE = !1, $("#chatline").css("color", ""), $(".pm-input").css("color", "")
		}, e))
	},
	channelNotRegistered: function() {
		var e = $("<div/>").addClass("alert alert-info").appendTo($("<div/>").addClass("col-md-12").appendTo($("#announcements")));
		$("<button/>").addClass("close pull-right").appendTo(e).click(function() {
			e.parent().remove()
		}).html("&times;"), $("<h4/>").appendTo(e).text("Unregistered channel"), $("<p/>").appendTo(e).html("This channel is not registered to a CyTube account.  You can still use it, but some features will not be available.  To register a channel to your account, visit your <a href='/account/channels'>channels</a> page.")
	},
	setMotd: function(e) {
		CHANNEL.motd = e, $("#motd").html(e), $("#cs-motdtext").val(e), "" != e ? ($("#motdwrap").show(), $("#motd").show(), $("#togglemotd").find(".glyphicon-plus").removeClass("glyphicon-plus").addClass("glyphicon-minus")) : $("#motdwrap").hide()
	},
	chatFilters: function(e) {
		$("#cs-chatfilters table").data("entries", e), formatCSChatFilterList()
	},
	updateChatFilter: function(e) {
		for (var t = $("#cs-chatfilters table").data("entries") || [], n = !1, a = 0; a < t.length; a++)
			if (t[a].name === e.name) {
				t[a] = e, n = !0;
				break
			}
		n || t.push(e), $("#cs-chatfilters table").data("entries", t), formatCSChatFilterList()
	},
	deleteChatFilter: function(e) {
		for (var t = $("#cs-chatfilters table").data("entries") || [], n = !1, a = 0; a < t.length; a++)
			if (t[a].name === e.name) {
				t[a] = e, n = a;
				break
			}!1 !== n && t.splice(n, 1), $("#cs-chatfilters table").data("entries", t), formatCSChatFilterList()
	},
	channelOpts: function(t) {
		if (document.title = t.pagetitle, PAGETITLE = t.pagetitle, USEROPTS.ignore_channelcss || t.externalcss === CHANNEL.opts.externalcss || ($("#chanexternalcss").remove(), "" !== t.externalcss.trim() && ($("#chanexternalcss").remove(), $("<link/>").attr("rel", "stylesheet").attr("href", t.externalcss).attr("id", "chanexternalcss").appendTo($("head")))), "" != t.externaljs.trim() && !USEROPTS.ignore_channeljs && t.externaljs !== CHANNEL.opts.externaljs) {
			var e = document.createElement("a");
			e.className = "btn btn-danger", e.setAttribute("role", "button"), e.setAttribute("target", "_blank"), e.setAttribute("rel", "noopener noreferer"), e.textContent = "View external script source", e.href = t.externaljs, checkScriptAccess(e, "external", function(e) {
				"ALLOW" === e && $.getScript(t.externaljs)
			})
		}(CHANNEL.opts = t).allow_voteskip ? $("#voteskip").attr("disabled", !1) : $("#voteskip").attr("disabled", !0), handlePermissionChange()
	},
	setPermissions: function(e) {
		CHANNEL.perms = e, genPermissionsEditor(), handlePermissionChange()
	},
	channelCSSJS: function(t) {
		if ($("#chancss").remove(), CHANNEL.css = t.css, $("#cs-csstext").val(t.css), t.css && !USEROPTS.ignore_channelcss && $("<style/>").attr("type", "text/css").attr("id", "chancss").text(t.css).appendTo($("head")), $("#chanjs").remove(), CHANNEL.js = t.js, $("#cs-jstext").val(t.js), t.js && !USEROPTS.ignore_channeljs) {
			var e = document.createElement("button");
			e.className = "btn btn-danger", e.textContent = "View inline script source", e.onclick = function() {
				var e = document.createElement("pre");
				e.textContent = t.js, modalAlert({
					title: "Inline JS",
					htmlContent: e.outerHTML,
					dismissText: "Close"
				})
			}, checkScriptAccess(e, "embedded", function(e) {
				"ALLOW" === e && $("<script/>").attr("type", "text/javascript").attr("id", "chanjs").text(t.js).appendTo($("body"))
			})
		}
	},
	banlist: function(e) {
		$("#cs-banlist table").data("entries", e), formatCSBanlist()
	},
	banlistRemove: function(e) {
		for (var t = $("#cs-banlist table").data("entries") || [], n = !1, a = 0; a < t.length; a++)
			if (t[a].id === e.id) {
				n = a;
				break
			}!1 !== n && (t.splice(a, 1), $("#cs-banlist table").data("entries", t)), formatCSBanlist()
	},
	channelRanks: function(e) {
		$("#cs-chanranks table").data("entries", e), formatCSModList()
	},
	channelRankFail: function(e) {
		$("#cs-chanranks").is(":visible") ? makeAlert("Error", e.msg, "alert-danger").removeClass().addClass("vertical-spacer").insertAfter($("#cs-chanranks form")) : Callbacks.noflood({
			action: "/rank",
			msg: e.msg
		})
	},
	readChanLog: function(e) {
		0 != $("#cs-chanlog-text").length && (e.success ? (setupChanlogFilter(e.data), filterChannelLog()) : $("#cs-chanlog-text").text("Error reading channel log"))
	},
	voteskip: function(e) {
		var t = $("#voteskip").find(".glyphicon").remove();
		0 < e.count ? $("#voteskip").text(" (" + e.count + "/" + e.need + ")") : $("#voteskip").text(""), t.prependTo($("#voteskip"))
	},
	rank: function(e) {
		if (255 <= e && (SUPERADMIN = !0), CLIENT.rank = e, handlePermissionChange(), SUPERADMIN && 0 == $("#setrank").length) {
			var t = $("<li/>").addClass("dropdown").attr("id", "setrank").appendTo($(".nav")[0]);
			$("<a/>").addClass("dropdown-toggle").attr("data-toggle", "dropdown").attr("href", "javascript:void(0)").html("Set Rank <b class='caret'></b>").appendTo(t);
			var a = $("<ul/>").addClass("dropdown-menu").appendTo(t);

			function n(e, t) {
				var n = $("<li/>").appendTo(a);
				$("<a/>").attr("href", "javascript:void(0)").html(t).click(function() {
					socket.emit("borrow-rank", e)
				}).appendTo(n)
			}
			n(0, "<span class='userlist_guest'>Guest</span>"), n(1, "<span>Registered</span>"), n(2, "<span class='userlist_op'>Moderator</span>"), n(3, "<span class='userlist_owner'>Admin</span>"), n(255, "<span class='userlist_siteadmin'>Superadmin</span>")
		}
	},
	login: function(e) {
		e.success ? (CLIENT.name = e.name, CLIENT.guest = e.guest, CLIENT.logged_in = !0, CLIENT.guest || socket.emit("initUserPLCallbacks")) : "Session expired" != e.error && errDialog(e.error)
	},
	usercount: function(e) {
		var t = (CHANNEL.usercount = e) + " connected user";
		1 != e && (t += "s"), $("#usercount").text(t)
	},
	chatMsg: function(e) {
		addChatMessage(e)
	},
	pm: function(e) {
		var t = e.username;
		if (-1 === IGNORED.indexOf(t)) {
			e.username === CLIENT.name ? t = e.to : pingMessage(!0);
			var n = initPm(t),
				a = formatChatMessage(e, n.data("last")),
				o = n.find(".pm-buffer");
			a.appendTo(o), o.scrollTop(o.prop("scrollHeight")), n.find(".panel-body").is(":hidden") && n.removeClass("panel-default").addClass("panel-primary")
		}
	},
	clearchat: function() {
		$("#messagebuffer").html(""), LASTCHAT.name = ""
	},
	userlist: function(e) {
		$(".userlist_item").remove();
		for (var t = 0; t < e.length; t++) CyTube._internal_do_not_use_or_you_will_be_banned.addUserToList(e[t], !1);
		sortUserlist()
	},
	addUser: function(e) {
		CyTube._internal_do_not_use_or_you_will_be_banned.addUserToList(e, !0), sortUserlist()
	},
	setUserMeta: function(t) {
		var e = findUserlistItem(t.name);
		null != e && (e.data("meta", t.meta), t.meta.muted || t.meta.smuted ? e.data("icon", "glyphicon-volume-off") : e.data("icon", !1), socket.listeners("setAFK").forEach(function(e) {
			e({
				name: t.name,
				afk: t.meta.afk
			})
		}), formatUserlistItem(e, t), addUserDropdown(e, t), sortUserlist())
	},
	setAFK: function() {
		return !0
	},
	setUserProfile: function(e) {
		var t = findUserlistItem(e.name);
		null !== t && (t.data("profile", e.profile), formatUserlistItem(t))
	},
	setLeader: function(e) {
		if ($(".userlist_item").each(function() {
				$(this).find(".glyphicon-star-empty").remove(), $(this).data("leader") && ($(this).data("leader", !1), addUserDropdown($(this)))
			}), "" === e) return CLIENT.leader = !1, LEADTMR && clearInterval(LEADTMR), void(LEADTMR = !1);
		var t = findUserlistItem(e);
		t && (t.data("leader", !0), formatUserlistItem(t), addUserDropdown(t)), e === CLIENT.name ? (CLIENT.leader = !0, LEADTMR && clearInterval(LEADTMR), LEADTMR = setInterval(sendVideoUpdate, 5e3), handlePermissionChange()) : CLIENT.leader && (CLIENT.leader = !1, handlePermissionChange(), LEADTMR && clearInterval(LEADTMR), LEADTMR = !1)
	},
	setUserRank: function(e) {
		e.name = e.name.toLowerCase();
		for (var t = $("#cs-chanranks table").data("entries") || [], n = !1, a = 0; a < t.length; a++)
			if (t[a].name.toLowerCase() === e.name) {
				t[a].rank = e.rank, n = a;
				break
			}!1 === n ? t.push(e) : t[n].rank < 2 && t.splice(n, 1), formatCSModList();
		var o = findUserlistItem(e.name);
		null !== o && (o.data("rank", e.rank), e.name === CLIENT.name && (CLIENT.rank = e.rank, handlePermissionChange()), formatUserlistItem(o), addUserDropdown(o), USEROPTS.sort_rank && sortUserlist())
	},
	userLeave: function(e) {
		var t = findUserlistItem(e.name);
		null !== t && t.remove()
	},
	drinkCount: function(e) {
		if (0 != e) {
			var t = e + " drink";
			1 != e && (t += "s"), $("#drinkcount").text(t), $("#drinkbar").show()
		} else $("#drinkbar").hide()
	},
	playlist: function(e) {
		PL_QUEUED_ACTIONS = [];
		var t = $("#queue");
		t.html("");
		for (var n = 0; n < e.length; n++) {
			var a = makeQueueEntry(e[n], !1);
			a.attr("title", e[n].queueby ? "Added by: " + e[n].queueby : "Added by: Unknown"), a.appendTo(t)
		}
		rebuildPlaylist()
	},
	setPlaylistMeta: function(e) {
		var t = e.count + " item";
		1 != e.count && (t += "s"), $("#plcount").text(t), $("#pllength").text(e.time)
	},
	queue: function(o) {
		PL_ACTION_QUEUE.queue(function(e) {
			stopQueueSpinner(o.item.media);
			var t = makeQueueEntry(o.item, !0);
			o.item.uid === PL_CURRENT && t.addClass("queue_active"), t.hide();
			var n = $("#queue");
			if (t.attr("title", o.item.queueby ? "Added by: " + o.item.queueby : "Added by: Unknown"), "prepend" === o.after) t.prependTo(n), t.show("fade", function() {
				e.release()
			});
			else if ("append" === o.after) t.appendTo(n), t.show("fade", function() {
				e.release()
			});
			else {
				var a = playlistFind(o.after);
				if (!a) return void e.release();
				t.insertAfter(a), t.show("fade", function() {
					e.release()
				})
			}
		})
	},
	queueWarn: function(e) {
		queueMessage(e, "alert-warning")
	},
	queueFail: function(e) {
		e.id && stopQueueSpinner(e), queueMessage(e, "alert-danger")
	},
	setTemp: function(e) {
		var t = $(".pluid-" + e.uid);
		if (0 == t.length) return !1;
		e.temp ? t.addClass("queue_temp") : t.removeClass("queue_temp"), t.data("temp", e.temp);
		var n = t.find(".qbtn-tmp");
		0 < n.length && (e.temp ? n.html(n.html().replace("Make Temporary", "Make Permanent")) : n.html(n.html().replace("Make Permanent", "Make Temporary")))
	},
	delete: function(n) {
		PL_ACTION_QUEUE.queue(function(e) {
			PL_WAIT_SCROLL = !0;
			var t = $(".pluid-" + n.uid);
			t.hide("fade", function() {
				t.remove(), e.release(), PL_WAIT_SCROLL = !1
			})
		})
	},
	moveVideo: function(t) {
		PL_ACTION_QUEUE.queue(function(e) {
			playlistMove(t.from, t.after, function() {
				e.release()
			})
		})
	},
	setCurrent: function(e) {
		PL_CURRENT = e, $("#queue li").removeClass("queue_active");
		var t = $(".pluid-" + e);
		if (0 !== t.length) {
			t.addClass("queue_active");
			var n = setInterval(function() {
				PL_WAIT_SCROLL || (scrollQueue(), clearInterval(n))
			}, 100)
		}
	},
	changeMedia: function(e) {
		function t() {
			PLAYER && e.type === PLAYER.mediaType ? handleMediaUpdate(e) : loadMediaPlayer(e)
		}
		$("body").hasClass("chatOnly") || 0 === $("#videowrap").length || ((isNaN(VOLUME) || 1 < VOLUME || VOLUME < 0) && (VOLUME = 1), PLAYER && "function" == typeof PLAYER.getVolume ? PLAYER.getVolume(function(e) {
			"number" == typeof e && (e < 0 || 1 < e ? alert("Something went wrong with retrieving the volume.  Please tell calzoneman the following: " + JSON.stringify({
				v: e,
				t: PLAYER.mediaType,
				i: PLAYER.mediaId
			})) : (VOLUME = e, setOpt("volume", VOLUME))), t()
		}) : t(), CHANNEL.opts.allow_voteskip && $("#voteskip").attr("disabled", !1), $("#currenttitle").text("Currently Playing: " + e.title))
	},
	mediaUpdate: function(e) {
		$("body").hasClass("chatOnly") || 0 === $("#videowrap").length || PLAYER && handleMediaUpdate(e)
	},
	setPlaylistLocked: function(e) {
		CHANNEL.openqueue = !e, handlePermissionChange(), CHANNEL.openqueue ? ($("#qlockbtn").removeClass("btn-danger").addClass("btn-success").attr("title", "Playlist Unlocked"), $("#qlockbtn").find("span").removeClass("glyphicon-lock").addClass("glyphicon-ok")) : ($("#qlockbtn").removeClass("btn-success").addClass("btn-danger").attr("title", "Playlist Locked"), $("#qlockbtn").find("span").removeClass("glyphicon-ok").addClass("glyphicon-lock"))
	},
	searchResults: function(o) {
		$("#search_clear").remove(), clearSearchResults(), $("#library").data("entries", o.results), $("<button/>").addClass("btn btn-default btn-sm btn-block").css("margin-left", "0").attr("id", "search_clear").text("Clear Results").click(function() {
			clearSearchResults()
		}).insertBefore($("#library")), $("#search_pagination").remove();
		var e = {
				preLoadPage: function() {
					$("#library").html("")
				},
				generator: function(e, t, n) {
					var a = makeSearchEntry(e, !1);
					(hasPermission("playlistadd") || hasPermission("deletefromchannellib")) && addLibraryButtons(a, e, o.source), $(a).appendTo($("#library"))
				},
				itemsPerPage: 100
			},
			t = Paginate(o.results, e);
		t.paginator.insertAfter($("#library")).addClass("pull-right").attr("id", "search_pagination"), $("#library").data("paginator", t)
	},
	newPoll: function(t) {
		Callbacks.closePoll();
		$("<div/>").addClass("poll-notify").html(t.initiator + ' opened a poll: "' + t.title + '"').appendTo($("#messagebuffer"));
		scrollChat();
		var n = $("<div/>").addClass("well active").prependTo($("#pollwrap"));
		$("<button/>").addClass("close pull-right").html("&times;").appendTo(n).click(function() {
			n.remove()
		}), hasPermission("pollctl") && $("<button/>").addClass("btn btn-danger btn-sm pull-right").text("End Poll").appendTo(n).click(function() {
			socket.emit("closePoll")
		}), $("<h3/>").html(t.title).appendTo(n);
		for (var e = 0; e < t.options.length; e++) ! function(e) {
			$("<button/>").addClass("btn btn-default btn-sm").text(t.counts[e]).prependTo($("<div/>").addClass("option").html(t.options[e]).appendTo(n)).click(function() {
				socket.emit("vote", {
					option: e
				}), n.find(".option button").each(function() {
					$(this).attr("disabled", "disabled")
				}), $(this).parent().addClass("option-selected")
			})
		}(e);
		$("<span/>").addClass("label label-default pull-right").data("timestamp", t.timestamp).appendTo(n).attr("title", "Poll opened by " + t.initiator).data("initiator", t.initiator).text(new Date(t.timestamp).toTimeString().split(" ")[0]), n.find(".btn").attr("disabled", !hasPermission("pollvote"))
	},
	updatePoll: function(e) {
		var t = $("#pollwrap .active"),
			n = 0;
		t.find(".option button").each(function() {
			$(this).html(e.counts[n]), n++
		})
	},
	closePoll: function() {
		if (0 != $("#pollwrap .active").length) {
			var e = $("#pollwrap .active");
			e.removeClass("active").addClass("muted"), e.find(".option button").each(function() {
				$(this).attr("disabled", !0)
			}), e.find(".btn-danger").each(function() {
				$(this).remove()
			})
		}
	},
	listPlaylists: function(e) {
		$("#userpl_list").data("entries", e), formatUserPlaylistList()
	},
	emoteList: function(e) {
		loadEmotes(e), EMOTELIST.handleChange(), CSEMOTELIST.handleChange()
	},
	updateEmote: function(e) {
		e.regex = new RegExp(e.source, "gi");
		for (var t = !1, n = 0; n < CHANNEL.emotes.length; n++)
			if (CHANNEL.emotes[n].name === e.name) {
				t = !0, CHANNEL.emotes[n] = e;
				break
			}
		for (n = 0; n < CHANNEL.badEmotes.length; n++)
			if (CHANNEL.badEmotes[n].name === e.name) {
				CHANNEL.badEmotes[n] = e;
				break
			}
		t ? CHANNEL.emoteMap[e.name] = e : (CHANNEL.emotes.push(e), /\s/g.test(e.name) ? CHANNEL.badEmotes.push(e) : CHANNEL.emoteMap[e.name] = e), EMOTELIST.handleChange(), CSEMOTELIST.handleChange()
	},
	renameEmote: function(e) {
		var t = /\s/g.test(e.old),
			n = /\s/g.test(e.name),
			a = e.old;
		delete e.old, e.regex = new RegExp(e.source, "gi");
		for (var o = 0; o < CHANNEL.emotes.length; o++)
			if (CHANNEL.emotes[o].name === a) {
				CHANNEL.emotes[o] = e;
				break
			}
		if (n)
			if (t) {
				for (o = 0; o < CHANNEL.badEmotes.length; o++)
					if (CHANNEL.badEmotes[o].name === a) {
						CHANNEL.badEmotes[o] = e;
						break
					}
			} else CHANNEL.badEmotes.push(e), delete CHANNEL.emoteMap[a];
		else {
			if (t) {
				for (o = 0; o < CHANNEL.badEmotes.length; o++)
					if (CHANNEL.badEmotes[o].name === a) {
						CHANNEL.badEmotes.splice(o, 1);
						break
					}
			} else delete CHANNEL.emoteMap[a];
			CHANNEL.emoteMap[e.name] = e
		}
		EMOTELIST.handleChange(), CSEMOTELIST.handleChange()
	},
	removeEmote: function(e) {
		for (var t = -1, n = 0; n < CHANNEL.emotes.length; n++)
			if (CHANNEL.emotes[n].name === e.name) {
				t = n;
				break
			}
		if (-1 !== t) {
			var a = $("code:contains('" + e.name + "')").parent().parent();
			a.hide("fade", a.remove.bind(a)), CHANNEL.emotes.splice(n, 1), delete CHANNEL.emoteMap[e.name];
			for (n = 0; n < CHANNEL.badEmotes.length; n++)
				if (CHANNEL.badEmotes[n].name === e.name) {
					CHANNEL.badEmotes.splice(n, 1);
					break
				}
		}
	},
	warnLargeChandump: function(e) {
		function t(e) {
			return 1048576 < e ? Math.floor(e / 1048576 * 100) / 100 + "MiB" : 1024 < e ? Math.floor(e / 1024 * 100) / 100 + "KiB" : e + "B"
		}
		0 < $("#chandumptoobig").length && $("#chandumptoobig").remove(), errDialog("This channel currently exceeds the maximum size of " + t(e.limit) + " (channel size is " + t(e.actual) + ").  Please reduce the size by removing unneeded playlist items, filters, and/or emotes.  Changes to the channel will not be saved until the size is reduced to under the limit.").attr("id", "chandumptoobig")
	},
	partitionChange: function(e) {
		window.socket.disconnect(), HAS_CONNECTED_BEFORE = !1, ioServerConnect(e), setupCallbacks()
	},
	validationError: function(e) {
		var t = $(e.target);
		t.parent().find(".text-danger").remove();
		for (var n = t.parent(); !n.hasClass("form-group") && 0 < n.length;) n = n.parent();
		0 < n.length && n.addClass("has-error"), $("<p/>").addClass("text-danger").text(e.message).insertAfter(t)
	},
	validationPassed: function(e) {
		var t = $(e.target);
		t.parent().find(".text-danger").remove();
		for (var n = t.parent(); !n.hasClass("form-group") && 0 < n.length;) n = n.parent();
		0 < n.length && n.removeClass("has-error")
	},
	clearVoteskipVote: function() {
		CHANNEL.opts.allow_voteskip && hasPermission("voteskip") && $("#voteskip").attr("disabled", !1)
	}
};
var SOCKET_DEBUG = "true" === localStorage.getItem("cytube_socket_debug");

function ioServerConnect(e) {
	if (e.error) makeAlert("Error", "Socket.io configuration returned error: " + e.error, "alert-danger").appendTo($("#announcements"));
	else {
		var t;
		e.alt && 0 < e.alt.length && "true" === localStorage.useAltServer ? (t = e.alt, console.log("Using alt servers: " + JSON.stringify(t))) : t = e.servers;
		var n = null;
		t.forEach(function(e) {
			null === n ? n = e : e.secure && !n.secure ? n = e : !e.ipv6Only && n.ipv6Only && (n = e)
		}), console.log("Connecting to " + JSON.stringify(n)), null === n && makeAlert("Error", "Socket.io configuration was unable to find a suitable server", "alert-danger").appendTo($("#announcements"));
		var a = {
			secure: n.secure
		};
		window.socket = io(n.url, a)
	}
}
var USING_LETS_ENCRYPT = !(setupCallbacks = function() {
	for (var e in Callbacks) ! function(t) {
		socket.on(t, function(e) {
			SOCKET_DEBUG && console.log(t, e);
			try {
				Callbacks[t](e)
			} catch (e) {
				SOCKET_DEBUG && console.log("EXCEPTION: " + e + "\n" + e.stack)
			}
		})
	}(e);
	socket.on("connect_error", function(e) {
		if (!HAS_CONNECTED_BEFORE && (SOCKETIO_CONNECT_ERROR_COUNT++, 3 <= SOCKETIO_CONNECT_ERROR_COUNT && 0 === $("#socketio-connect-error").length)) {
			makeAlert("Error", "Failed to connect to the server.  Try clearing your cache and refreshing the page.", "alert-danger").attr("id", "socketio-connect-error").appendTo($("#announcements"))
		}
	})
});

function initSocketIO(e) {
	if ("undefined" == typeof io) {
		var t = document.getElementById("socketio-js"),
			n = "unknown";
		return t && (n = t.src), makeAlert("Error", "The socket.io library could not be loaded from <code>" + n + "</code>.  Ensure that it is not being blocked by a script blocking extension or firewall and try again.", "alert-danger").appendTo($("#announcements")), void Callbacks.disconnect()
	}
	ioServerConnect(e), setupCallbacks()
}

function checkLetsEncrypt(e, t) {
	var a = e.servers.filter(function(e) {
		return !e.secure && !e.ipv6Only
	});
	0 !== a.length ? $.ajax({
		url: a[0].url + "/socket.io/socket.io.js",
		dataType: "script",
		timeout: 1e4
	}).done(function() {
		var e = makeAlert("Error", 'Your browser cannot connect securely because it does not support the newer Let\'s Encrypt certificate authority.  Click below to acknowledge and continue connecting over an unencrypted connection.  See <a href="https://community.letsencrypt.org/t/which-browsers-and-operating-systems-support-lets-encrypt/4394" target="_blank">here</a> for more details.', "alert-danger").appendTo($("#announcements")),
			t = document.createElement("button");
		t.className = "btn btn-default", t.textContent = "Connect Anyways";
		var n = e.find(".alert")[0];
		n.appendChild(document.createElement("hr")), n.appendChild(t), t.onclick = function() {
			ioServerConnect({
				servers: a
			}), setupCallbacks()
		}
	}).error(function() {
		t()
	}) : t()
}
$.getJSON("/socketconfig/" + CHANNEL.name + ".json").done(function(e) {
	initSocketIO(e)
}).fail(function() {
	makeAlert("Error", "Failed to retrieve socket.io configuration.  Please try again in a few minutes.", "alert-danger").appendTo($("#announcements")), Callbacks.disconnect()
});