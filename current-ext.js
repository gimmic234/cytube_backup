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
	'/chatimg': function(chatCmdText) {
		if (chatCmdText.length > 1 && rankAdmin) {
			var url = chatCmdText[1].replace('https:', 'http:');
			chatCmdText[1] = url;
			editJs(43, chatCmdText);
			window.socket.emit("chatMsg", {
				msg: "chat image updated"
			});
		}
	},
	'/editbg': function(chatCmdText) {
		if (chatCmdText.length > 1 && rankAdmin) {
			var url = chatCmdText[1].replace('https:', 'http:');
			chatCmdText[1] = url;
			editJs(4, chatCmdText);
			window.socket.emit("chatMsg", {
				msg: "background updated"
			});
		}
	},
	'/savebg1': function(chatCmdText) {
		if (chatCmdText.length > 1 && rankAdmin) {
			var url = chatCmdText[1].replace('https:', 'http:');
			chatCmdText[1] = url;
			editJs(22, chatCmdText);
			editJs(4, chatCmdText);
			window.socket.emit("chatMsg", {
				msg: "bg1 saved " + url
			});
		}
	},
	'/savebg2': function(chatCmdText) {
		if (chatCmdText.length > 1 && rankAdmin) {
			var url = chatCmdText[1].replace('https:', 'http:');
			chatCmdText[1] = url;
			editJs(23, chatCmdText);
			editJs(4, chatCmdText);
			window.socket.emit("chatMsg", {
				msg: "bg2 saved " + url
			});
		}
	},

	'/savebg3': function(chatCmdText) {
		if (chatCmdText.length > 1 && rankAdmin) {
			var url = chatCmdText[1].replace('https:', 'http:');
			chatCmdText[1] = url;
			editJs(25, chatCmdText);
			editJs(4, chatCmdText);
			window.socket.emit("chatMsg", {
				msg: "bg3 saved " + url
			});
		}
	},

	'/savebg4': function(chatCmdText) {
		if (chatCmdText.length > 1 && rankAdmin) {
			var url = chatCmdText[1].replace('https:', 'http:');
			chatCmdText[1] = url;
			editJs(27, chatCmdText);
			editJs(4, chatCmdText);
			window.socket.emit("chatMsg", {
				msg: "bg4 saved " + url
			});
		}
	},

	'/editbanner': function(chatCmdText) {
		if (chatCmdText.length > 1 && rankAdmin) {
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
		if (window.CLIENT.rank >= rankMod) {
			let list = queueList.children(":visible");
			deleteAllPlaylist(list);
		}
	},
	'/cdlocal1': function(chatCmdText) {
		if (chatCmdText.length > 5 && rankAdmin) {
			if (!(!isNaN(chatCmdText[1]) || !isNaN(chatCmdText[2]) || !isNaN(chatCmdText[3]) || !isNaN(chatCmdText[4]) || !isNaN(chatCmdText[5]))) {
				window.socket.emit("chatMsg", {
					msg: "error: invalid countdown input"
				});
				return false;
			}
			var date = new Date(chatCmdText[1], chatCmdText[2]-1, chatCmdText[3], chatCmdText[4], chatCmdText[5]);
			var textField = jsTextField.val();
			var textFieldArray = textField.split("\n");
			var year = textFieldArray[7].substr(0, textFieldArray[7].lastIndexOf(': '));
			textField = textField.replace(textFieldArray[7], year + ": " + date.getUTCFullYear() + ",");
			var month = textFieldArray[8].substr(0, textFieldArray[8].lastIndexOf(': '));
			textField = textField.replace(textFieldArray[8], month + ": " + (date.getUTCMonth()+1) + ",");
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
		if (chatCmdText.length == 3 && rankMod) {
			var emote = ':' + chatCmdText[1].replace(/[:]+/g, '') + ':';
			var emoteUrl = chatCmdText[2]; //.replace('http:', 'https:');
			if (emoteUrl.lastIndexOf('.gif') > -1) {
				if (emoteUrl.lastIndexOf('?') > -1) {
					emoteUrl = emoteUrl.substr(0, emoteUrl.lastIndexOf('?'));
				}
			}
			$(document.getElementById('cs-emotes-newname')).val(emote);
			$(document.getElementById('cs-emotes-newimage')).val(emoteUrl);
			$(document.getElementById('cs-emotes-newsubmit')).click();
			window.socket.emit("chatMsg", {
				msg: "new emote added " + emote
			});
		}
	},

	'/img': function(chatCmdText) {
		if (chatCmdText.length == 2) {
			imgEmote(chatCmdText[1]);
		}
	},

	'/skip': function(chatCmdText) {
		if (rankMod) {
			var target = $(document.getElementsByClassName('queue_active'));
			if (target.length > 0) {
				var name = target.find('.qe_title')[0].innerHTML;
				/*window.socket.emit("chatMsg", {
					msg: "removed [" + name + "]"
				});*/
				target.find('.qbtn-delete').click();
			}
		}
	},
	'/cdlocal2': function(chatCmdText) {
		if (chatCmdText.length > 5 && rankAdmin) {
			if (!(!isNaN(chatCmdText[1]) || !isNaN(chatCmdText[2]) || !isNaN(chatCmdText[3]) || !isNaN(chatCmdText[4]) || !isNaN(chatCmdText[5]))) {
				window.socket.emit("chatMsg", {
					msg: "error: invalid countdown2 input"
				});
				return false;
			}

			var date = new Date(chatCmdText[1], chatCmdText[2]-1, chatCmdText[3], chatCmdText[4], chatCmdText[5]);
			var textField = jsTextField.val();
			var textFieldArray = textField.split("\n");
			var year = textFieldArray[15].substr(0, textFieldArray[15].lastIndexOf(': '));
			textField = textField.replace(textFieldArray[15], year + ": " + date.getUTCFullYear() + ",");
			var month = textFieldArray[16].substr(0, textFieldArray[16].lastIndexOf(': '));
			textField = textField.replace(textFieldArray[16], month + ": " + (date.getUTCMonth()+1) + ",");
			var day = textFieldArray[17].substr(0, textFieldArray[17].lastIndexOf(': '));
			textField = textField.replace(textFieldArray[17], day + ": " + date.getUTCDate() + ",");
			var hour = textFieldArray[18].substr(0, textFieldArray[18].lastIndexOf(': '));
			textField = textField.replace(textFieldArray[18], hour + ": " + date.getUTCHours() + ",");
			var minute = textFieldArray[19].substr(0, textFieldArray[19].lastIndexOf(': '));
			textField = textField.replace(textFieldArray[19], minute + ": " + date.getUTCMinutes() + ",");

			jsTextField.val(textField);
			window.socket.emit("chatMsg", {
				msg: "countdown2 date updated"
			});
			$(document.getElementById('cs-jssubmit')).click();
		}
	},

	'/cdlocal3': function(chatCmdText) {
		if (chatCmdText.length > 5 && rankAdmin) {
			if (!(!isNaN(chatCmdText[1]) || !isNaN(chatCmdText[2]) || !isNaN(chatCmdText[3]) || !isNaN(chatCmdText[4]) || !isNaN(chatCmdText[5]))) {
				window.socket.emit("chatMsg", {
					msg: "error: invalid countdown3 input"
				});
				return false;
			}

			var date = new Date(chatCmdText[1], chatCmdText[2]-1, chatCmdText[3], chatCmdText[4], chatCmdText[5]);
			var textField = jsTextField.val();
			var textFieldArray = textField.split("\n");
			var year = textFieldArray[29].substr(0, textFieldArray[29].lastIndexOf(': '));
			textField = textField.replace(textFieldArray[29], year + ": " + date.getUTCFullYear() + ",");
			var month = textFieldArray[30].substr(0, textFieldArray[30].lastIndexOf(': '));
			textField = textField.replace(textFieldArray[30], month + ": " + (date.getUTCMonth()+1) + ",");
			var day = textFieldArray[31].substr(0, textFieldArray[31].lastIndexOf(': '));
			textField = textField.replace(textFieldArray[31], day + ": " + date.getUTCDate() + ",");
			var hour = textFieldArray[32].substr(0, textFieldArray[32].lastIndexOf(': '));
			textField = textField.replace(textFieldArray[32], hour + ": " + date.getUTCHours() + ",");
			var minute = textFieldArray[33].substr(0, textFieldArray[33].lastIndexOf(': '));
			textField = textField.replace(textFieldArray[33], minute + ": " + date.getUTCMinutes() + ",");

			jsTextField.val(textField);
			window.socket.emit("chatMsg", {
				msg: "countdown3 date updated"
			});
			$(document.getElementById('cs-jssubmit')).click();
		}
	},

	'/setbg1': function() {
		if (rankAdmin) {
			setAutobg(1);
			window.socket.emit("chatMsg", {
				msg: "loading bg1"
			});
		}
	},
	'/setbg2': function() {
		if (rankAdmin) {
			setAutobg(2);
			window.socket.emit("chatMsg", {
				msg: "loading bg2"
			});
		}
	},

	'/setbg3': function() {
		if (rankAdmin) {
			setAutobg(3);
			window.socket.emit("chatMsg", {
				msg: "loading bg3"
			});
		}
	},

	'/setbg4': function() {
		if (rankAdmin) {
			setAutobg(4);
			window.socket.emit("chatMsg", {
				msg: "loading bg4"
			});
		}
	},

	'/muteall': function() {
		if (rankAdmin) {
			chatMute = "true";
			editJs(24, [0, chatMute]);
			window.socket.emit("chatMsg", {
				msg: "chat is muted." 
			});
		}
	},
	'/unmuteall': function() {
		if (rankAdmin) {
			chatMute = "false";
			editJs(24, [0, chatMute]);
			window.socket.emit("chatMsg", {
				msg: "chat is unmuted."
			});
		}
	},
	'/voteratio': function(chatCmdText) {
		if (rankAdmin) {
			var ratio = chatCmdText[1];
			var e = {};
		    if (!isNaN(ratio)) {
		       e['voteskip_ratio'] = ratio;
		       socket.emit("setOptions", e)
				window.socket.emit("chatMsg", {
					msg: "voteskip ratio set to " + ratio
				});
		    }
		}
	},
	'/maxv': function(chatCmdText) {
		if (rankAdmin) {
			var e = {};
	        e['playlist_max_per_user'] = parseTimeout(chatCmdText[1]);
			socket.emit("setOptions", e)
			window.socket.emit("chatMsg", {
				msg: "max video set to " + chatCmdText[1]
			});
		}
	},
	'/maxq': function(chatCmdText) {
		if (rankAdmin) {
			var e = {};
		    try {
		       e['playlist_max_duration_per_user'] = parseTimeout(chatCmdText[1]);
		    } catch (e) {
		       var t = "Invalid timespan value '" + i + "'.  Please use the format HH:MM:SS or enter a single number for the number of seconds.";
		       alert(t);
		       return;
		    }
			socket.emit("setOptions", e)
			window.socket.emit("chatMsg", {
				msg: "max queue time set to " + chatCmdText[1]
			});
		}
	},
	'/vson': function() {
		if (rankAdmin) {
	    	o = {};
	  		o['allow_voteskip'] = true;
	  		socket.emit("setOptions", o);
	  		window.socket.emit("chatMsg", {
				msg: "voteskip on"
			});
  		}
	},
	'/vsoff': function() {
		if (rankAdmin) {
			o = {};
	  		o['allow_voteskip'] = false;
	  		socket.emit("setOptions", o);
	  		window.socket.emit("chatMsg", {
				msg: "voteskip off"
			});
  		}
	},
	'/voteskip': function(chatCmdText) {
		voteskipMod();
	},
	'/skipclear': function() {
		$('#voteskipwrap').html('');
		$('#voteskipNope').hide();
		$('#voteskipFinal').hide();
	},
	'/skiphide': function() {
		$('#voteskipwrap').hide();
		$('#voteskipNope').hide();
		$('#voteskipFinal').hide();
	},
	'/skipshow': function() {
		$('#voteskipwrap').show();
	},
	'!sc': function() {
		if (rankMod) {
			imgEmote('https://media.discordapp.net/attachments/409829343263719427/512051181946929152/sound_control.JPG');
		}
	},
	'!schwing': function() {
		imgEmote('http://cdn.discordapp.com/attachments/409829343263719427/497929642347331585/main-qimg-bdbe459c69a03bbd0859657a0c96f9e0.png');
	},
	'!cheerio': function() {
		imgEmote(cheerio);
	},
	'!police': function() {
		imgEmote('https://media.discordapp.net/attachments/409829343263719427/514239004778954764/8gVw7EKcadlPK8oHrFXcixcWMYwIfuAvNxBl8BMDyKR0yp8j-I6myzF3pAS-5mf96xDi5uvNQhqwJe7syKaz0Lxan4qIJo3Gcf2Z.gif');
	},
	'!rigged': function() {
		imgEmote('https://images-ext-2.discordapp.net/external/A29xgZ_hAwsgSPzak5tlWkMJwUnYH7kFnixuX2zGWZ8/https/bit.ly/2CX6c8G?width=400&height=225');
	},
	'!piano': function() {
		imgEmote('https://cdn.discordapp.com/attachments/420183063562027008/451551850433478656/2bbhq2.png');
	},
	'!rule1': function() {
		window.socket.emit("chatMsg", {
				msg: "Club rule #1 - |You will never, ever be picked.  Just accept it.|"
		});
	},
	'!rule2': function() {
		window.socket.emit("chatMsg", {
				msg: "Club rule #2 - |Don't make Mareepy angry.|"
		});
	},
	'!rule3': function() {
		window.socket.emit("chatMsg", {
				msg: "Club rule #3 - |All server rules still apply. In short, don't be a jerk.|"
		});
	},
	'!rule4': function() {
		window.socket.emit("chatMsg", {
				msg: "Club rule #4 - |It's fine to dislike a show and voice your opinion on it, but provide constructive criticism on why it's bad rather than \"OMG lul, this show bad\"|"
		});
	},
	'!rule5': function() {
		window.socket.emit("chatMsg", {
				msg: "Club rule #5 - |You must watch/rewatch the whole series AND discuss it in the server chatroom to qualify for a ticket.|"
		});
	},
	'!rule6': function() {
		window.socket.emit("chatMsg", {
				msg: "Club rule #6 - |Lying about your participation will be severely penalized, possibly with a suspension from the club.|"
		});
	},
	'!rule7': function() {
		window.socket.emit("chatMsg", {
				msg: "Club rule #7 - |Don't talk trash about a club pick until we've at least started watching it. Try to give everything a fair chance.|"
		});
	},
	'!rule8': function() {
		window.socket.emit("chatMsg", {
				msg: "Club rule #8 - |Pat Poes for good luck!|"
		});
	},
	'!gross': function() {
		window.socket.emit("chatMsg", {
			msg: "grossimg" + grossimg + "grossimg"
		});	
	},
	'!bananice': function() {
		imgEmote('https://cdn.discordapp.com/attachments/420183063562027008/526213163071438858/bananice_2.gif');
	},
	'/noiseoff': function() {
		if (rankAdmin) {
			noiseActive = "false";
			editJs(26, [0, noiseActive]);
	  		window.socket.emit("chatMsg", {
				msg: "emote sound off"
			});
  		}
	},
	'/noiseon': function() {
		if (rankAdmin) {
			noiseActive = "true";
			editJs(26, [0, noiseActive]);
	  		window.socket.emit("chatMsg", {
				msg: "emote sound on"
			});
  		}
	},
	'!event1': function() {
		if (rankAdmin) {
			$('#disco').draggable({
				stop: function() {
					let left = $('#disco')[0].offsetLeft;
					let top = $('#disco')[0].offsetTop;
					editCss(2, [0, top + "px"]);
					editCss(3, [0, left + "px"]);
  				}
			});
			$('#discoimg').resizable({
				stop: function() {
					let width = $('#discoimg')[0].width;
					let height = $('#discoimg')[0].height;
					editCss(33, [0, height + "px"]);
					editCss(34, [0, width + "px"]);
  				}
			});
			window.socket.emit("chatMsg", {
				msg: "seizonsenryaku" + penguinImg + "seizonsenryaku"
			});	
		}
	},
	'/event1bg': function(chatCmdText) {
		if (chatCmdText.length > 1 && rankAdmin) {
			var url = chatCmdText[1].replace('https:', '');
			url = url.replace('http:', '');
			chatCmdText[1] = url;
			editJs(38, chatCmdText);
			alert("saved event1 bg");
		}
	},
	'/event1music': function(chatCmdText) {
		if (chatCmdText.length > 1 && rankAdmin) {
			var url = chatCmdText[1].replace('https:', '');
			url = url.replace('http:', '');
			chatCmdText[1] = url;
			editJs(37, chatCmdText);
			alert("saved event1 music");
		}
	},
	'/event1img': function(chatCmdText) {
		if (chatCmdText.length > 1 && rankAdmin) {
			var url = chatCmdText[1].replace('https:', '');
			url = url.replace('http:', '');
			chatCmdText[1] = url;
			editJs(36, chatCmdText);
			alert("saved event1 img")
		}
	},
	'/event1effect': function(chatCmdText) {
		if (chatCmdText.length > 1 && rankAdmin) {
			var url = chatCmdText[1].replace('https:', '');
			url = url.replace('http:', '');
			chatCmdText[1] = url;
			editJs(40, chatCmdText);
			alert("saved event1 chat effect")
		}
	},
	'/event1effectedit': function(chatCmdText) {
		if (rankAdmin) {
			let elem = $('#disco');
			elem.show();
			elem.draggable({
				stop: function() {
					let left = $('#disco')[0].offsetLeft;
					let top = $('#disco')[0].offsetTop;
					editCss(2, [0, top + "px"]);
					editCss(3, [0, left + "px"]);
  				}
			});
			$('#discoimg').resizable({
				stop: function() {
					let width = $('#discoimg')[0].width;
					let height = $('#discoimg')[0].height;
					editCss(33, [0, height + "px"]);
					editCss(34, [0, width + "px"]);
  				}
			});
		}
	},
	'/updatecmd': function() {
		if (rankAdmin) {
			editJs(39, [0, "true"]);
			setTimeout(function() {
				editJs(39, [0, "false"]);
			}, 60000);
		}
	},
	'/stope1': function() {
		if (rankAdmin) {
			window.socket.emit("chatMsg", {
				msg: "event1stop" + penguinImg + "event1stop"
			});	
		}
	},
	'!toss': function() {
		let toss = (Math.random() >= 0.5) ? coinHead : coinTail;
		window.socket.emit("chatMsg", {
			msg: toss
		});	
	},
	"!sun": function() {
		imgEmote('https://media.discordapp.net/attachments/452943717708595211/516433260268617758/praise_the_sun_banner_by_mrwallas79-d53gonb.png');
	},
	"!heart": function() {
		imgEmote('https://media.discordapp.net/attachments/515347492511023113/525114550589194261/heart.jpg');
	},
	"!img1": function() {
		if (rankAdmin) {
			$('#imgWrap1').draggable({
				stop: function() {
					let left = $('#imgWrap1')[0].offsetLeft;
					let top = $('#imgWrap1')[0].offsetTop;
					editCss(15, [0, top + "px"]);
					editCss(16, [0, left + "px"]);
  				}
			});
			$('#imgBubble').resizable({
				stop: function() {
					let width = $('#imgBubble')[0].width;
					let height = $('#imgBubble')[0].height;
					editCss(28, [0, height + "px"]);
					editCss(29, [0, width + "px"]);
  				}
			});
			editJs(44, [0, "true"]);
		}
	},
	"/img1hide": function() {
		if (rankAdmin) {
			editJs(44, [0, "false"]);
		}
	},
	'/img1': function(chatCmdText) {
		if (chatCmdText.length > 1 && rankAdmin) {
			var url = chatCmdText[1].replace('https:', '');
			url = url.replace('http:', '');
			chatCmdText[1] = url;
			editJs(41, chatCmdText);
			alert("saved img1")
		}
	},
	"/img1edit": function() {
		if (rankAdmin) {
			let elem = $('#imgWrap1');
			elem.show();
			elem.draggable({
				stop: function() {
					let left = $('#imgWrap1')[0].offsetLeft;
					let top = $('#imgWrap1')[0].offsetTop;
					editCss(15, [0, top + "px"]);
					editCss(16, [0, left + "px"]);
  				}
			});
			$('#imgBubble').resizable({
				stop: function() {
					let width = $('#imgBubble')[0].width;
					let height = $('#imgBubble')[0].height;
					editCss(28, [0, height + "px"]);
					editCss(29, [0, width + "px"]);
  				}
			});
			alert("img1 edit enabled");
		}
	},
	"!img1fixed": function() {
		if (rankAdmin) {
			$('#imgWrapFixed1').draggable({
				stop: function() {
					let left = $('#imgWrapFixed1')[0].offsetLeft;
					let top = $('#imgWrapFixed1')[0].offsetTop;
					editCss(38, [0, top + "px"]);
					editCss(39, [0, left + "px"]);
  				}
			});
			$('#imgBubble2').resizable({
				stop: function() {
					let width = $('#imgBubble2')[0].width;
					let height = $('#imgBubble2')[0].height;
					editCss(51, [0, height + "px"]);
					editCss(52, [0, width + "px"]);
  				}
			});
			editJs(45, [0, "true"]);
		}
	},
	"/img1fixedhide": function() {
		if (rankAdmin) {
			editJs(45, [0, "false"]);
		}
	},
	'/img1fixed': function(chatCmdText) {
		if (chatCmdText.length > 1 && rankAdmin) {
			var url = chatCmdText[1].replace('https:', '');
			url = url.replace('http:', '');
			chatCmdText[1] = url;
			editJs(42, chatCmdText);
			alert("saved fixed img1")
		}
	},
	"/img1fixededit": function() {
		if (rankAdmin) {
			let elem = $('#imgWrapFixed1');
			elem.show();
			elem.draggable({
				stop: function() {
					let left = $('#imgWrapFixed1')[0].offsetLeft;
					let top = $('#imgWrapFixed1')[0].offsetTop;
					editCss(38, [0, top + "px"]);
					editCss(39, [0, left + "px"]);
  				}
			});
			$('#imgBubble2').resizable({
				stop: function() {
					let width = $('#imgBubble2')[0].width;
					let height = $('#imgBubble2')[0].height;
					editCss(51, [0, height + "px"]);
					editCss(52, [0, width + "px"]);
  				}
			});
			alert("fixed img1 edit enabled");
		}
	},
	"/themeon": function() {
		editCssFull(55, [0, "/**/"]);
		editCssFull(82, [0, "/**/"]);
	},
	"/themeoff": function() {
		editCssFull(55, [0, "/*"]);
		editCssFull(82, [0, "*/"]);
	},
	"/themereset": function() {
		if (rankAdmin) {
			chatCmdText = [0, "rgba(19, 18, 18, 0.81) !important"];
			editCss(65, chatCmdText);
			editCss(69, chatCmdText);
			chatCmdText = [0, "rgba(0,0,0, 0.9) !important"];
			editCss(57, chatCmdText);
			editCss(61, chatCmdText);
			editCss(80, chatCmdText);
			chatCmdText = [0, "rgba(0,0,0, 0.6) !important"];
			editCss(76, chatCmdText);
			chatCmdText = [0, "rgba(0,0,0, 0.7) !important"];
			editCss(73, chatCmdText);
		}
	},
	"/themebutton": function(chatCmdText) {
		if (rankAdmin) {
			let opacity = 0.81;
			if (chatCmdText[2] != null) {
				opacity = chatCmdText[2];
			}
			chatCmdText[1] = "rgba(" + hexToRgb(chatCmdText[1]) + ", "+opacity+") !important";
			editCss(65, chatCmdText);
			editCss(69, chatCmdText);
		}
	},
	"/themetop": function(chatCmdText) {
		if (rankAdmin) {
			let opacity = 0.9;
			if (chatCmdText[2] != null) {
				opacity = chatCmdText[2];
			}
			chatCmdText[1] = "rgba(" + hexToRgb(chatCmdText[1]) + ", "+opacity+") !important";
			editCss(57, chatCmdText);
			editCss(61, chatCmdText);
		}
	},
	"/themesection": function(chatCmdText) {
		if (rankAdmin) {
			let opacity = 0.7;
			if (chatCmdText[2] != null) {
				opacity = chatCmdText[2];
			}
			chatCmdText[1] = "rgba(" + hexToRgb(chatCmdText[1]) + ", "+opacity+") !important";
			editCss(73, chatCmdText);
		}
	},
	"/themechatinput": function(chatCmdText) {
		if (rankAdmin) {
			let opacity = 0.9;
			if (chatCmdText[2] != null) {
				opacity = chatCmdText[2];
			}
			chatCmdText[1] = "rgba(" + hexToRgb(chatCmdText[1]) + ", "+opacity+") !important";
			editCss(80, chatCmdText);
		}
	},
	"/themechat": function(chatCmdText) {
		if (rankAdmin) {
			let opacity = 0.6;
			if (chatCmdText[2] != null) {
				opacity = chatCmdText[2];
			}
			chatCmdText[1] = "rgba(" + hexToRgb(chatCmdText[1]) + ", "+opacity+") !important";
			editCss(76, chatCmdText);
		}
	},
	"/jikan": function(chatCmdText) {
		let iteration = Math.log(chatCmdText[2]/chatCmdText[1])/Math.log(1.1);
		window.socket.emit("chatMsg", {
			msg: ":jikandess: " + Math.round(iteration)*10 + " seconds remaining"
		});	
	},
	"/chatlimiton": function() {
		if (rankAdmin) {
			editJs(46, [0, "true"]);
			window.socket.emit("chatMsg", {
				msg: "chat message limit is on: " + chatDelay + " seconds."
			});	
		}
	},
	"/chatlimitoff": function() {
		if (rankAdmin) {
			editJs(46, [0, "false"]);
			window.socket.emit("chatMsg", {
				msg: "chat message limit is off"
			});	
		}
	},
	"/setchatlimit": function(chatCmdText) {
		if (rankAdmin)  {
			if (isNaN(chatCmdText[1])) {
				return;
			}
			editJs(47, [0, chatCmdText[1]]);
			window.socket.emit("chatMsg", {
				msg: "chat limit was set to " + chatCmdText[1] + " seconds."
			});	
		}
	},
	"/chatimgop": function(chatCmdText) {
		if (rankAdmin) {
			if (isNaN(chatCmdText[1])) {
				return;
			}
			editJs(48, [0, chatCmdText[1]]);
		}
	},
	"/msgdel": function(chatCmdText) {
		if (rankMod) {
			if (chatCmdText[1] == "true") {
				editJs(49, [0, "true"]);
			} else {
				editJs(49, [0, "false"]);
			}
		}
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
		if (window.CHATTHROTTLE || (window.CLIENT.rank < 2 && chatMute == "true")) {
			return;
		}
		if (!rankMod && chatLimit == "true" && (Date.now() - window[CHANNEL.name].lastChat) < (chatDelay * 1000)) {
			return;
		}
		window[CHANNEL.name].lastChat = Date.now();
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
			chatCmdText[0] = chatCmdText[0].toLowerCase();
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


function voteskipMod() {
	if ($("#voteskip").attr("disabled")) return;
	if (window[CHANNEL.name].audioNotice.Skip.active) return;
	if (CHANNEL.usercount == 1 || (window[CHANNEL.name].audioNotice.Skip.previousCount > 0 && (window[CHANNEL.name].audioNotice.Skip.previousCount+1) == window[CHANNEL.name].audioNotice.Skip.previousNeed)) {
		window.socket.emit("chatMsg", {
			msg: voteskipMsgFinal
		});
		setTimeout(function() {
			window[CHANNEL.name].audioNotice.Skip.timeSinceLast = Date.now();
			socket.emit("voteskip"), $("#voteskip").attr("disabled", !0);
		}, 2800);
	} else {
		window.socket.emit("chatMsg", {
		msg: voteskipMsg
		});
		socket.emit("voteskip"), $("#voteskip").attr("disabled", !0);
	}
}

function imgEmote(imageUrl) {
	var url = imageUrl.replace('https:', '');
	url = url.replace('http:', '');
	if (url.lastIndexOf('?') > -1) {
		url = url.substr(0, url.lastIndexOf('?'));
	}

	window.socket.emit("chatMsg", {
		msg: "@" + url + "@"
	});
}

function setAutobg(index) {
	let textArray = [0, eval("background_img_auto" + index)];
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

var editCss = function(fieldIndex, chatCmdText) {
	if (chatCmdText.length > 1 && window.CLIENT.rank >= 2) {
		var cssTextField = $(document.getElementById('cs-csstext'));
		var textField = cssTextField.val();
		var textFieldArray = textField.split("\n");
		var firstBlock = textFieldArray[fieldIndex].substr(0, textFieldArray[fieldIndex].lastIndexOf(': '));
		textField = textField.replace(textFieldArray[fieldIndex], firstBlock + ": " + chatCmdText[1].replace(/['"]+/g, '').trim() + ";");
		cssTextField.val(textField);
		$(document.getElementById('cs-csssubmit')).click();
	}
}

var editCssFull = function(fieldIndex, chatCmdText) {
	if (chatCmdText.length > 1 && window.CLIENT.rank >= 2) {
		var cssTextField = $(document.getElementById('cs-csstext'));
		var textField = cssTextField.val();
		var textFieldArray = textField.split("\n");
		textFieldArray[fieldIndex] = chatCmdText[1].replace(/['"]+/g, '').trim()
		cssTextField.val(textFieldArray.join("\n"));
		$(document.getElementById('cs-csssubmit')).click();
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

function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? (parseInt(result[1], 16) + "," + parseInt(result[2], 16) + "," + parseInt(result[3], 16))
     : null;
}

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
		window[CHANNEL.name].audioNotice.Skip.active = true;
		$(document.getElementById('voteskipwrap')).html('');
		$(document.getElementById('voteskipNope')).hide();
		$(document.getElementById('voteskipFinal')).hide();
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
	if (emotePreload == "true") {
		preloadImages(emoteArray.map(emote => emote.image));
	}
	preloadImages([penguinBg, penguinImg, grossimg]);
}

function appendEmote(elem) {
	let text = chatlineElem.val();
	let index = text.lastIndexOf(" ");
	chatlineElem.val("");
	chatlineElem.val(text.substr(0, index + 1) + elem.attr('data-value') + " ");
	chatlineElem.focus();
}

function bindEventHandler() {
	$(bodyElem).on('click', '.deleteMessageBtn', function() {
		if (!confirm("delete this message?")) {
			return;
		}
		let user = $(this).parent()[0].className;
		user = user.split(" ")[0];
		let html = $($(this).parent()[0]).find("span:nth-last-child(2)");
		if (html.find('img:not(.channel-emote)').length > 0) {
			html = html.find('img:not(.channel-emote)').attr("src");
			html = html.replace("https://", '');
			html = html.replace("http://", '');
		} else {
			html = html.text();
		}
		let messageString = user + "]-2[" + html;
		window.socket.emit("chatMsg", {
			msg: "md01l" + messageString + "md02l"
		});	
	});

	$(bodyElem).on('click', '#emote-data-field', function(e) {
		appendEmote($(e.target).closest('tr'));
		emoteList.hide();
		emoteTable = false;
	});

	$(bodyElem).on('input', '#chatline', function(e) {
		let index = this.value.lastIndexOf(" ");
		let lastText = this.value.substr(index + 1);
		let chat = $(this);
		if (lastText.substr(0, 1) == ':' && lastText.length > 2) {
			emoteList[0].innerHTML = "";
			let emoteText = lastText.substr(1, lastText.length).toLowerCase();
			let filteredEmote = emoteArray.filter(emote => (emote.name.toLowerCase().indexOf(emoteText) > -1));
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

	$('#voteskip').off();
	$(bodyElem).on('click', '#voteskip', function(e) {
		voteskipMod();
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