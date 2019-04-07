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
			window.socket.emit("chatMsg", {
				msg: "bg1 updated"
			});
		}
	},
	'/savebg2': function(chatCmdText) {
		if (chatCmdText.length > 1 && rankAdmin) {
			var url = chatCmdText[1].replace('https:', 'http:');
			chatCmdText[1] = url;
			editJs(23, chatCmdText);
			window.socket.emit("chatMsg", {
				msg: "bg2 updated"
			});
		}
	},

	'/savebg3': function(chatCmdText) {
		if (chatCmdText.length > 1 && rankAdmin) {
			var url = chatCmdText[1].replace('https:', 'http:');
			chatCmdText[1] = url;
			editJs(25, chatCmdText);
			window.socket.emit("chatMsg", {
				msg: "bg3 updated"
			});
		}
	},

	'/savebg4': function(chatCmdText) {
		if (chatCmdText.length > 1 && rankAdmin) {
			var url = chatCmdText[1].replace('https:', 'http:');
			chatCmdText[1] = url;
			editJs(27, chatCmdText);
			window.socket.emit("chatMsg", {
				msg: "bg4 updated"
			});
		}
	},
	'/savebg5': function(chatCmdText) {
		if (chatCmdText.length > 1 && rankAdmin) {
			var url = chatCmdText[1].replace('https:', 'http:');
			chatCmdText[1] = url;
			editJs(69, chatCmdText);
			window.socket.emit("chatMsg", {
				msg: "bg5 updated"
			});
		}
	},
	'/savebg6': function(chatCmdText) {
		if (chatCmdText.length > 1 && rankAdmin) {
			var url = chatCmdText[1].replace('https:', 'http:');
			chatCmdText[1] = url;
			editJs(70, chatCmdText);
			window.socket.emit("chatMsg", {
				msg: "bg6 updated"
			});
		}
	},
	'/savebg7': function(chatCmdText) {
		if (chatCmdText.length > 1 && rankAdmin) {
			var url = chatCmdText[1].replace('https:', 'http:');
			chatCmdText[1] = url;
			editJs(71, chatCmdText);
			window.socket.emit("chatMsg", {
				msg: "bg7 updated"
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
			socket.emit("setChannelJS", {
				js: $("#cs-jstext").val()
			});
		}
		window.socket.emit("chatMsg", {
			msg: "banner updated"
		});
	},
	'/purge': function() {
		if (window.CLIENT.rank >= rankMod) {
			confirm("Are you sure you want to clear the playlist?") && socket.emit("clearPlaylist");
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
			socket.emit("setChannelJS", {
				js: $("#cs-jstext").val()
			});
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
			socket.emit("setChannelJS", {
				js: $("#cs-jstext").val()
			});
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
			socket.emit("setChannelJS", {
				js: $("#cs-jstext").val()
			});
		}
	},

	'/cdlocal4': function(chatCmdText) {
		if (chatCmdText.length > 5 && rankAdmin) {
			if (!(!isNaN(chatCmdText[1]) || !isNaN(chatCmdText[2]) || !isNaN(chatCmdText[3]) || !isNaN(chatCmdText[4]) || !isNaN(chatCmdText[5]))) {
				window.socket.emit("chatMsg", {
					msg: "error: invalid countdown4 input"
				});
				return false;
			}

			var date = new Date(chatCmdText[1], chatCmdText[2]-1, chatCmdText[3], chatCmdText[4], chatCmdText[5]);
			var textField = jsTextField.val();
			var textFieldArray = textField.split("\n");
			var year = textFieldArray[51].substr(0, textFieldArray[51].lastIndexOf(': '));
			textField = textField.replace(textFieldArray[51], year + ": " + date.getUTCFullYear() + ",");
			var month = textFieldArray[52].substr(0, textFieldArray[52].lastIndexOf(': '));
			textField = textField.replace(textFieldArray[52], month + ": " + (date.getUTCMonth()+1) + ",");
			var day = textFieldArray[53].substr(0, textFieldArray[53].lastIndexOf(': '));
			textField = textField.replace(textFieldArray[53], day + ": " + date.getUTCDate() + ",");
			var hour = textFieldArray[54].substr(0, textFieldArray[54].lastIndexOf(': '));
			textField = textField.replace(textFieldArray[54], hour + ": " + date.getUTCHours() + ",");
			var minute = textFieldArray[55].substr(0, textFieldArray[55].lastIndexOf(': '));
			textField = textField.replace(textFieldArray[55], minute + ": " + date.getUTCMinutes() + ",");

			jsTextField.val(textField);
			window.socket.emit("chatMsg", {
				msg: "countdown4 date updated"
			});
			socket.emit("setChannelJS", {
				js: $("#cs-jstext").val()
			});
		}
	},

	'/cdlocal5': function(chatCmdText) {
		if (chatCmdText.length > 5 && rankAdmin) {
			if (!(!isNaN(chatCmdText[1]) || !isNaN(chatCmdText[2]) || !isNaN(chatCmdText[3]) || !isNaN(chatCmdText[4]) || !isNaN(chatCmdText[5]))) {
				window.socket.emit("chatMsg", {
					msg: "error: invalid countdown5 input"
				});
				return false;
			}

			var date = new Date(chatCmdText[1], chatCmdText[2]-1, chatCmdText[3], chatCmdText[4], chatCmdText[5]);
			var textField = jsTextField.val();
			var textFieldArray = textField.split("\n");
			var year = textFieldArray[59].substr(0, textFieldArray[59].lastIndexOf(': '));
			textField = textField.replace(textFieldArray[59], year + ": " + date.getUTCFullYear() + ",");
			var month = textFieldArray[60].substr(0, textFieldArray[60].lastIndexOf(': '));
			textField = textField.replace(textFieldArray[60], month + ": " + (date.getUTCMonth()+1) + ",");
			var day = textFieldArray[61].substr(0, textFieldArray[61].lastIndexOf(': '));
			textField = textField.replace(textFieldArray[61], day + ": " + date.getUTCDate() + ",");
			var hour = textFieldArray[62].substr(0, textFieldArray[62].lastIndexOf(': '));
			textField = textField.replace(textFieldArray[62], hour + ": " + date.getUTCHours() + ",");
			var minute = textFieldArray[63].substr(0, textFieldArray[63].lastIndexOf(': '));
			textField = textField.replace(textFieldArray[63], minute + ": " + date.getUTCMinutes() + ",");

			jsTextField.val(textField);
			window.socket.emit("chatMsg", {
				msg: "countdown5 date updated"
			});
			socket.emit("setChannelJS", {
				js: $("#cs-jstext").val()
			});
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

	'/setbg5': function() {
		if (rankAdmin) {
			setAutobg(5);
			window.socket.emit("chatMsg", {
				msg: "loading bg5"
			});
		}
	},
	'/setbg6': function() {
		if (rankAdmin) {
			setAutobg(6);
			window.socket.emit("chatMsg", {
				msg: "loading bg6"
			});
		}
	},
	'/setbg7': function() {
		if (rankAdmin) {
			setAutobg(7);
			window.socket.emit("chatMsg", {
				msg: "loading bg7"
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
	'/rule1': function() {
		window.socket.emit("chatMsg", {
				msg: "Club rule #1 - |You will never, ever be picked.  Just accept it.|"
		});
	},
	'/rule2': function() {
		window.socket.emit("chatMsg", {
				msg: "Club rule #2 - |Don't make Mareepy angry.|"
		});
	},
	'/rule3': function() {
		window.socket.emit("chatMsg", {
				msg: "Club rule #3 - |All server rules still apply. In short, don't be a jerk.|"
		});
	},
	'/rule4': function() {
		window.socket.emit("chatMsg", {
				msg: "Club rule #4 - |It's fine to dislike a show and voice your opinion on it, but provide constructive criticism on why it's bad rather than \"OMG lul, this show bad\"|"
		});
	},
	'/rule5': function() {
		window.socket.emit("chatMsg", {
				msg: "Club rule #5 - |You must watch/rewatch the whole series AND discuss it in the server chatroom to qualify for a ticket.|"
		});
	},
	'/rule6': function() {
		window.socket.emit("chatMsg", {
				msg: "Club rule #6 - |Lying about your participation will be severely penalized, possibly with a suspension from the club.|"
		});
	},
	'/rule7': function() {
		window.socket.emit("chatMsg", {
				msg: "Club rule #7 - |Don't talk trash about a club pick until we've at least started watching it. Try to give everything a fair chance.|"
		});
	},
	'/rule8': function() {
		window.socket.emit("chatMsg", {
				msg: "Club rule #8 - |Pat Poes for good luck!|"
		});
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
			chatCmdText = [0, "rgba(19,18,18, 0.81) !important"];
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
				delmessage = "true";
			} else {
				delmessage = "false";
			}
			if (delmessage == "true") {
				$(".deleteMessageBtn").show();
			} else {
				$(".deleteMessageBtn").hide();
			}
		}
	},
	"/mail": function(chatCmdText) {
		if (rankAdmin) {
			chatCmdText.shift();
			let msgText = '';
			msgText = chatCmdText.join(' ');
			let msg = {
				name: CLIENT.name,
				message: msgText
			}
			sendMsg(msg);
		}
	},
	"/listbgm": function() {
		if (rankAdmin) {
			let bgmArray = [
				bgm1url,
				bgm2url,
				bgm3url,
				bgm4url,
				bgm5url
			];
			let bgmString = "";
			let count = 0;
			bgmArray.forEach(function(bgm) {
				count++;
				let tempArray = bgm.split('/');
				bgmString += count + ": " + tempArray[tempArray.length-1] + "\n";
			});
			alert(bgmString);
		}
	},
	"/setbgm1": function(chatCmdText) {
		if (rankAdmin) {
			if (bgmSelect == "1") {
				$('audio').each(function(){
				    this.pause(); 
				    this.currentTime = 0;
				}); 
			}
			editJs(66, [0, chatCmdText[1]]);
		}
	},
	"/setbgm2": function(chatCmdText) {
		if (rankAdmin) {
			if (bgmSelect == "2") {
				$('audio').each(function(){
				    this.pause(); 
				    this.currentTime = 0;
				}); 
			}
			editJs(72, [0, chatCmdText[1]]);
		}
	},
	"/setbgm3": function(chatCmdText) {
		if (rankAdmin) {
			if (bgmSelect == "3") {
				$('audio').each(function(){
				    this.pause(); 
				    this.currentTime = 0;
				}); 
			}
			editJs(73, [0, chatCmdText[1]]);
		}
	},
	"/setbgm4": function(chatCmdText) {
		if (rankAdmin) {
			if (bgmSelect == "4") {
				$('audio').each(function(){
				    this.pause(); 
				    this.currentTime = 0;
				}); 
			}
			editJs(74, [0, chatCmdText[1]]);
		}
	},
	"/setbgm5": function(chatCmdText) {
		if (rankAdmin) {
			if (bgmSelect == "5") {
				$('audio').each(function(){
				    this.pause(); 
				    this.currentTime = 0;
				}); 
			}
			editJs(75, [0, chatCmdText[1]]);
		}
	},
	"/playbgm1": function(chatCmdText) {
		if (rankAdmin) {
			editJs(67, [0, "true"]);
			if (bgmSelect != "1") {
				$('audio').each(function(){
				    this.pause(); 
				    this.currentTime = 0;
				}); 
			}
			editJs(76, [0, "1"]);
		}	
	},
	"/playbgm2": function(chatCmdText) {
		if (rankAdmin) {
			editJs(67, [0, "true"]);
			if (bgmSelect != "2") {
				$('audio').each(function(){
				    this.pause(); 
				    this.currentTime = 0;
				}); 
			}
			editJs(76, [0, "2"]);
		}	
	},
	"/playbgm3": function(chatCmdText) {
		if (rankAdmin) {
			editJs(67, [0, "true"]);
			if (bgmSelect != "3") {
				$('audio').each(function(){
				    this.pause(); 
				    this.currentTime = 0;
				}); 
			}
			editJs(76, [0, "3"]);
		}	
	},
	"/playbgm4": function(chatCmdText) {
		if (rankAdmin) {
			editJs(67, [0, "true"]);
			if (bgmSelect != "4") {
				$('audio').each(function(){
				    this.pause(); 
				    this.currentTime = 0;
				}); 
			}
			editJs(76, [0, "4"]);
		}	
	},
	"/playbgm5": function(chatCmdText) {
		if (rankAdmin) {
			editJs(67, [0, "true"]);
			if (bgmSelect != "5") {
				$('audio').each(function(){
				    this.pause(); 
				    this.currentTime = 0;
				}); 
			}
			editJs(76, [0, "5"]);
		}	
	},
	"/bgmoff": function() {
		if (rankAdmin) {
			editJs(67, [0, "false"]);
		}
	},
	"/bgmauto": function(chatCmdText) {
		if (rankAdmin) {
			editJs(68, [0, chatCmdText[1]]);
		}
	},
	"/lock": function() {
		if (rankMod) {
			socket.emit("togglePlaylistLock");
		}
	},
	"?utsu": function(chatCmdText) {
		var utsulist = [
			"//media.discordapp.net/attachments/452943717708595211/535605359750938655/utsu2.png",
			"//media.discordapp.net/attachments/514955949136674856/537825629014458439/utsutsu-52079.jpg",
			"//media.discordapp.net/attachments/501103378714329100/537833295132753951/utsu7.jpg",
			"//media.discordapp.net/attachments/514955949136674856/537825673050324993/utsu4.png",
			"//media.discordapp.net/attachments/501103378714329100/537833306071367682/utsu6.jpg",
			"//media.discordapp.net/attachments/501103378714329100/537833322215243776/utsu5.jpg",
			"//media.discordapp.net/attachments/501103378714329100/539210465059012627/utsu8.png",
			"//media.discordapp.net/attachments/501103378714329100/539215764175978516/utsu9.png",
			"//media.discordapp.net/attachments/501103378714329100/541368857890258950/utsu10.jpg",
			"not"
		];
		var utsuimg = utsulist[Math.floor(Math.random() * utsulist.length)];
		if (utsuimg == "not") {
			window.socket.emit("chatMsg", {
				msg: "utsunotimg" + "//media.discordapp.net/attachments/515347492511023113/537831145707143169/large.jpg" + "utsunotimg"
			});	
		} else {
			window.socket.emit("chatMsg", {
				msg: "utsuimg" + utsuimg + "utsuimg"
			});	
		}
	},
	"!club": function() {
		let clublist = [
			"//media.discordapp.net/attachments/420183063562027008/554607523760570388/Club_Anniversary_Image.jpg",
			"//media.discordapp.net/attachments/420183063562027008/550536585532276756/zbD1RND.jpg",
			"//media.discordapp.net/attachments/420183063562027008/439766717065986049/TopGearAnimeClub.png",
			"//media.discordapp.net/attachments/420183063562027008/463065926854639627/Screenshot_2018-07-01_14.29.24.png",
			"//media.discordapp.net/attachments/420183063562027008/516349602945957898/4928942.png",
			"//media.discordapp.net/attachments/420183063562027008/511236805475958785/bbwerwtwtwer.png",
			"//media.discordapp.net/attachments/420183063562027008/507280654459994113/unknown.png",
			"//media.discordapp.net/attachments/420183063562027008/462836619888558080/Anime_Club_at_its_current_state.png",
			"//images-ext-1.discordapp.net/external/D5t_p45mDO_vAEWf_6pm3hKgguSufHPCnKTYoIF4KJE/https/cdn.discordapp.com/attachments/420183063562027008/439766717065986049/TopGearAnimeClub.png",
			"//media.discordapp.net/attachments/420183063562027008/451551850433478656/2bbhq2.png",
			"//media.discordapp.net/attachments/555563726669873162/556821851570176020/HorribleSubs_Lostorage_Conflated_WIXOSS_-_06_720p.mkv_snapshot_18.42_2018.05.19_09.30.07.jpg",
			"//media.discordapp.net/attachments/466386319766192138/559541320218050571/perfection.jpg"
		];
		var clubimg = clublist[Math.floor(Math.random() * clublist.length)];
		imgEmote(clubimg);
	},
	"/addqg": function(chatCmdText) {
		window[CHANNEL.name].getVideoInfo(chatCmdText[1]);
	},
	"/tag": function(chatCmdText) {
		let curr_alist = JSON.parse(achievementList);
		let stringItem = chatCmdText.slice(2).join(' ').toString();
		if (rankAdmin && chatCmdText.length >= 3) {			
			if (chatCmdText[1] == "all") {
				let connectedUsers = $('#userlist').find('strong');
				connectedUsers.each(function(index, userc) {
					if (!curr_alist[userc.innerText]) {
						curr_alist[userc.innerText] = [];
						curr_alist[userc.innerText].push(stringItem);
					} else {
						if (!curr_alist[userc.innerText].includes(stringItem)) {
							curr_alist[userc.innerText].push(stringItem);
						}
					}			
				});
			} else {
				if (!curr_alist[chatCmdText[1]]) {
					curr_alist[chatCmdText[1]] = [];
					curr_alist[chatCmdText[1]].push(stringItem);
				} else {
					if (!curr_alist[chatCmdText[1]].includes(stringItem)) {
						curr_alist[chatCmdText[1]].push(stringItem);
					}
				}
			}
			let curr_alist_string = JSON.stringify(curr_alist);
			var textField = jsTextField.val();
			var textFieldArray = textField.split("\n");
			var firstBlock = textFieldArray[77].substr(0, textFieldArray[77].lastIndexOf(' = ') + 1);
			textField = textField.replace(textFieldArray[77], firstBlock + "= \"" + curr_alist_string.replace(/["]+/g, '\\"').replace(/[']+/g, "\\'").trim() + "\";");
			jsTextField.val(textField);
			window.socket.emit("chatMsg", {
				msg: "\*" + chatCmdText[1] + "\* gained addachievement" + stringItem + "addachievement"
			});				
			socket.emit("setChannelJS", {
				js: $("#cs-jstext").val()
			});
		}
	},
	"/untag": function(chatCmdText) {

	},
	"/tagme": function() {
		let curr_alist = JSON.parse(achievementList);
		let username = window.CLIENT.name;
		if (!curr_alist[username]) {
			window.socket.emit("chatMsg", {
				msg: "\*" + username + "\* has nothing!"
			});		
		} else {
			let userList = $.map(curr_alist[username], function(n, i) {
				return n;
			});
			let tagItems = userList.join(', ');
			window.socket.emit("chatMsg", {
				msg: "\*" + username + "\* has " + userList.length + " tags: ye11" + tagItems + "ye11"
			});		
		}
	},
	"/taglist": function(chatCmdText) {
		let curr_alist = JSON.parse(achievementList);
		if (!curr_alist[username]) {
			window.socket.emit("chatMsg", {
				msg: "\*" + chatCmdText[1] + "\* has nothing!"
			});		
		} else {
			let userList = $.map(curr_alist[username], function(n, i) {
				return n;
			});
			let tagItems = userList.join(', ');
			window.socket.emit("chatMsg", {
				msg: "\*" + username + "\* has " + userList.length + " tags: ye11" + tagItems + "ye11"
			});		
		}
	},
	'/pick': function(chatCmdText) {
		if (chatCmdText.length == 2) {
			picklist.each(function(value, index) {
				if (value.user.toLowerCase().indexOf(chatCmdText[1].toLowerCase()) >= 0) {
					window.socket.emit("chatMsg", {
						msg: "\*" + value.user + "\* picked [" + value.pick1 + " / "+renderStatus(value.status1)+"], [" + value.pick2 + " / "+renderStatus(value.status2)+"], [" + value.pick3 + " / "+renderStatus(value.status3)+"]"
					});
				}
			});
		}
	},
	"!coffee":function() {
		window.socket.emit("chatMsg", {
			msg: "coffeeimg" + "//media.discordapp.net/attachments/501103378714329100/559871053866860584/tumblr_nke5iceDcM1sji7w0o1_540.gif" + "coffeeimg"
		});
	},
	"/amqq": function() {
		if (rankAdmin) {
			$("#customembed-content").val("<iframe src='https://animemusicquiz.com/'></iframe>");
			$("#ce_queue_end").click();
			let amq = $("a[href='https://animemusicquiz.com/'");
			if (amq.length > 0) {
				amq.parent().find("button").click()
			}
		}
	},
	"/amq": function() {
		if (rankAdmin) {
			window.socket.emit("chatMsg", {
				msg: "amqalert amq time amqalert"
			});	
		}
	},
	"/amqclose": function() {
		if (rankAdmin) {
			window.socket.emit("chatMsg", {
				msg: "amqclosealert amq is over amqclosealert"
			});	
		}	
	},
	"/amqi": function() {
		if ($('.amq-wrap').length > 0) {
			return;
		}
		$('audio').each(function(){
		    this.pause(); 
		    this.currentTime = 0;
		}); 
		$("#main").after("<div class='row amq-wrap'><iframe class='full' src='https://animemusicquiz.com/'></iframe></div>");
		let height = $('#videowrap').height();
		if (height < 100) {
			height = 850;
		}
		$('.full').height(height);
	},
	"/amqiclose": function() {
		if (!($('.amq-wrap').length > 0)) {
			return;
		}
		$(".amq-wrap").remove();
	},
	"/cdtitle1": function(chatCmdText) {
		if (rankAdmin && chatCmdText.length > 1) {
			let stringItem = chatCmdText.slice(1).join(' ').toString();
			editJs(78, [0, stringItem]);
		}
	},
	"/cdtitle2": function(chatCmdText) {
		if (rankAdmin && chatCmdText.length > 1) {
			let stringItem = chatCmdText.slice(1).join(' ').toString();
			editJs(79, [0, stringItem]);
		}
	},
	"/cdtitle3": function(chatCmdText) {
		if (rankAdmin && chatCmdText.length > 1) {
			let stringItem = chatCmdText.slice(1).join(' ').toString();
			editJs(80, [0, stringItem]);
		}
	},
	"/cdtitle4": function(chatCmdText) {
		if (rankAdmin && chatCmdText.length > 1) {
			let stringItem = chatCmdText.slice(1).join(' ').toString();
			editJs(81, [0, stringItem]);
		}
	},
	"/cdtitle5": function(chatCmdText) {
		if (rankAdmin && chatCmdText.length > 1) {
			let stringItem = chatCmdText.slice(1).join(' ').toString();
			editJs(81, [0, stringItem]);
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
				if (imgLookup.hasOwnProperty(chatCmdText[0])) {
					imgLookup[chatCmdText[0]]();
				} else if (soundLookup.hasOwnProperty(chatCmdText[0])) {
					soundLookup[chatCmdText[0]]();
				} else {
					window.socket.emit("chatMsg", {
						msg: msg,
						meta: meta
					});
					sendMsg(msg);
					if (chatCmdText[0][0] == "!" && chatCmdText[0].length > 2) {
						populateImgEmote(chatCmdText[0]);
					}
					if (chatCmdText[0][0] == "?" && chatCmdText[0].length > 2) {
						populateSoundEmote(chatCmdText[0]);
					}
				}
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

function renderStatus(status) {
	return (status == "TRUE") ? "done" : "pending";
}

function readAchievement() {
	let returnArray = [];
	$.ajax({
		url: "https://spreadsheets.google.com/feeds/list/1KmHlAfiQza9vZrBSvsfWrzdyMP9u5KgQG6e5DWNwkow/10/public/values?alt=json",
		method: "get",
		dataType: "json",
		success: function(result) {
			let entries = result.feed.entry;
			entries.each(function(value, index) {
				let newEntry = {
					"title": value.gsx$title.$t,
					"color": value.gsx$color.$t,
					"description": value.gsx$description.$t,
					"image": value.gsx$image.$t
				};
				returnArray.push(newEntry);
			})
		}
	});
	return returnArray;
}

function readSheet() {
	let returnArray = [];
	$.ajax({
		url: "https://spreadsheets.google.com/feeds/list/1KmHlAfiQza9vZrBSvsfWrzdyMP9u5KgQG6e5DWNwkow/9/public/values?alt=json",
		method: "get",
		dataType: "json",
		success: function(result) {
			let entries = result.feed.entry;
			entries.each(function(value, index) {
				let newEntry = {
					"user": value.gsx$user.$t,
					"pick1": value.gsx$pick1.$t,
					"status1": value.gsx$status1.$t,
					"pick2": value.gsx$pick2.$t,
					"status2": value.gsx$status2.$t,
					"pick3": value.gsx$pick3.$t,
					"status3": value.gsx$status3.$t
				};
				returnArray.push(newEntry);
			})
		}
	});
	return returnArray;
}

function closeamq() {
	if (!$('.amq-wrap').length) {
			return;
	}
	$(".amq-wrap").remove();
}

function populateSoundEmote(command) {
	let temp = {};
	temp["?utsu"] = function() {};
	let temp2 = {};
	$.ajax({
		url: "https://spreadsheets.google.com/feeds/list/1KmHlAfiQza9vZrBSvsfWrzdyMP9u5KgQG6e5DWNwkow/12/public/values?alt=json",
		method: "get",
		dataType: "json",
		success: function(result) {
			let entries = result.feed.entry;
			let bodyString = "<li><b>?utsu</b></li>";
			entries.each(function(value, index) {
				bodyString += "<li><b>"+value.gsx$command.$t+"</b></li>";
				temp[value.gsx$command.$t] = function() {
					imgEmote(value.gsx$image.$t);
					window.socket.emit("chatMsg", {
						msg: "soundemoteaudio" + value.gsx$command.$t + "soundemoteaudio"
					});		
				}
				temp2[value.gsx$command.$t] = value.gsx$audio.$t;
			})
			$('#sound-emote-list').html(bodyString);
			soundLookup = temp;
			emoteAudioList = temp2;
			if (command != '' && temp.hasOwnProperty(command)) {
				temp[command]();
			}
		}
	});
}

function populateImgEmote(command) {
	let temp = {};
	temp["!coffee"] = function() {};
	temp["!club"] = function() {};
	$.ajax({
		url: "https://spreadsheets.google.com/feeds/list/1KmHlAfiQza9vZrBSvsfWrzdyMP9u5KgQG6e5DWNwkow/11/public/values?alt=json",
		method: "get",
		dataType: "json",
		success: function(result) {
			let entries = result.feed.entry;
			let bodyString = "";
			bodyString += "<li><b>!club</b></li>";
			bodyString += "<li><b>!coffee</b></li>";
			entries.each(function(value, index) {
				bodyString += "<li><b>"+value.gsx$command.$t+"</b></li>";
				temp[value.gsx$command.$t] = function() {
					imgEmote(value.gsx$url.$t);
				}
				if (command != '' && command.toLowerCase() == value.gsx$command.$t.toLowerCase()) {
					imgEmote(value.gsx$url.$t);
				}
			})
			$('#image-emote-list').html(bodyString);
			imgLookup = temp;
		}
	});
}

function sendMsg(sendData) {
	$.ajax({
		url: "https://hooks.zapier.com/hooks/catch/4506865/p4fsf1/",
		method: "POST",
		data: {
			name: sendData.name,
			message: sendData.message
		},
		dataType: "json",
		success: function(result) {

		}
	});
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
		textField = textField.replace(textFieldArray[fieldIndex], firstBlock + "= \"" + chatCmdText[1].replace(/['"]+/g, '').trim() + "\";");
		jsTextField.val(textField);
		socket.emit("setChannelJS", {
			js: $("#cs-jstext").val()
		});
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
		socket.emit("setChannelCSS", {
			css: $("#cs-csstext").val()
		});
	}
}

var editCssFull = function(fieldIndex, chatCmdText) {
	if (chatCmdText.length > 1 && window.CLIENT.rank >= 2) {
		var cssTextField = $(document.getElementById('cs-csstext'));
		var textField = cssTextField.val();
		var textFieldArray = textField.split("\n");
		textFieldArray[fieldIndex] = chatCmdText[1].replace(/['"]+/g, '').trim()
		cssTextField.val(textFieldArray.join("\n"));
		socket.emit("setChannelCSS", {
			css: $("#cs-csstext").val()
		});
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

window[CHANNEL.name].audioFunction = {};
window[CHANNEL.name].audioFunction.playbgm1 = function(condition) {
	let audioplay = window[CHANNEL.name].audioNotice.bgm1play.audio[0];
	if (condition) {
		audioplay.volume = window[CHANNEL.name].audioNotice.bgm1play.volume;
		audioplay.loop = true;
		audioplay.play();
	} else {
		$('audio').each(function(){
		    this.pause(); 
		    this.currentTime = 0;
		}); 
	}
};

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
		if (bgmoff == "true") {
			$('audio').each(function(){
			    this.pause(); 
			    this.currentTime = 0;
			}); 
		}
		var title = $('.queue_active').find('.qe_title').html();
		$('#currenttitle').html(title);
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
	preloadImages([penguinBg, penguinImg, "https://media.discordapp.net/attachments/501103378714329100/559871053866860584/tumblr_nke5iceDcM1sji7w0o1_540.gif", "https://media.discordapp.net/attachments/501103378714329100/559871062913843223/1518855884_tumblr_n3tsi9JO1F1r9b5wlo1_500.gif", "https://media.discordapp.net/attachments/501103378714329100/559871042429124628/6874742.GIF", "https://media.discordapp.net/attachments/501103378714329100/559871034451427328/tea-ore-monogatari-12.png"]);
}

function appendEmote(elem) {
	let text = chatlineElem.val();
	let index = text.lastIndexOf(" ");
	chatlineElem.val("");
	chatlineElem.val(text.substr(0, index + 1) + elem.attr('data-value') + " ");
	chatlineElem.focus();
}

function createModalExt(data) {
	var title = data.title || "Empty Modal";
	var title_m = !!data.titleIsMarkup;
	var wrap = $("<div/>").addClass("modal fade").attr("tabindex", "-1");
	var dialog = $("<div/>").addClass("modal-dialog").appendTo(wrap);
	var content = $("<div/>").addClass("modal-content").appendTo(dialog);
	var head = $("<div/>").addClass("modal-header").appendTo(content);
	var body = $("<div/>").addClass("modal-body").appendTo(content);
	var foot = $("<div/>").addClass("modal-footer");
	$("<button/>").addClass("close").attr("data-dismiss", "modal").attr("data-hidden", "true").html("&times;").appendTo(head);
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

function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

window.scrollChat = function() {
	if ((parseInt($('#messagebuffer').prop('scrollHeight')) - parseInt($('#messagebuffer').prop('scrollTop')) - parseInt($('#messagebuffer').height())) < 350 || parseInt($('#messagebuffer').prop('scrollHeight')) < 2500) { 
		setTimeout(function() {
				$('#messagebuffer').prop('scrollTop', $('#messagebuffer').prop('scrollHeight'));
		}, 20);
	}
}

window.getTimeZone = function() {
    return /\((.*)\)/.exec(new Date().toString())[1];
}

window.countdowner = function(countdown, destination,index) {
	let second = 1000,
	minute = second * 60,
	hour = minute * 60,
	day = hour * 24;
	if ($('#countdown'+index+':hidden').length > 0) {
		$('#countdown'+index).show();
	}
	let now = new Date().getTime(),
		distance = destination - now;
	document.getElementById('days'+index).innerText = Math.floor(distance / (day)),
		document.getElementById('hours'+index).innerText = Math.floor((distance % (day)) / (hour)),
		document.getElementById('minutes'+index).innerText = Math.floor((distance % (hour)) / (minute)),
		document.getElementById('seconds'+index).innerText = Math.floor((distance % (minute)) / second);

	let totalSeconds = Math.floor(distance / second);

	if (totalSeconds < 86400 && !countdown.classList.contains('countdownbaseActive')) {
		$(countdown).removeClass('countdownbase');
		$(countdown).addClass('countdownbaseActive');
	}

	if (totalSeconds > 86400 && countdown.classList.contains('countdownbaseActive')) {
		$(countdown).removeClass('countdownbaseActive');
		$(countdown).addClass('countdownbase');
	}

	if (distance < 0) {
		clearInterval(eval("countDownTimer" + index));
		$('#countdown' + index).hide();
	}

}

window.loadInitializer = function() {
	picklist = readSheet();
	achievementMatch = readAchievement();
	let streamStr1 = "Next ";
	let streamStr2 = " stream starts in...";
	$('#head1').html(streamStr1 + countdownText1 + streamStr2);
	$('#head2').html(streamStr1 + countdownText2 + streamStr2);
	$('#head3').html(streamStr1 + countdownText3 + streamStr2);
	$('#head4').html(streamStr1 + countdownText4 + streamStr2);
	$('#head5').html(streamStr1 + countdownText5 + streamStr2);

	let second = 1000,
	minute = second * 60,
	hour = minute * 60,
	day = hour * 24;
	if (!document.getElementById('export-btn')) {
		$(document.getElementById('cs-chanlog')).append(" <a class='export' id='export-btn' href='#' download='chat.txt'><button class='btn btn-default'>Export</button></a>");
		bindEventHandler();
		$(document.body).on('click', '.imgContainer', function() {
			if ($(this).find('img').css('filter') != 'blur(0px)') {
				$(this).find('img').css('filter', 'blur(0px)');
				$(this).removeClass('imgContainer');
				$(this).attr('title', '');
				var elem = $(this).find('a');
				setTimeout(function() {
					elem.attr('href', elem.find('img').attr('src'));
				}, 1000)
			}
		});
	}

	waitForEl('#messagebuffer', function() {
		let amq = $("a[href='https://animemusicquiz.com/'");
		if (amq.length > 0) {
			amq.parent().find("button").click()
		}
		$(document.getElementById('voteskipwrap')).hide();
		populateImgEmote('');
		populateSoundEmote('');
		var buff = $('#messagebuffer');
		window[CHANNEL.name].chatNotice.handler["deleteMessage"]();
		window[CHANNEL.name].chatNotice.handler["deleteButton"]();
		buff.find(".voteskipNotice:not( .parsed )").addClass('parsed');
		buff.find(".semote:not( .parsed )").addClass('parsed');
		buff.find(".amq:not( .amqdone )").addClass('amqdone');
		buff.find(".amqclose:not( .amqclosedone )").addClass('amqclosedone');
		buff.find(".utsu:not( .parsed )").addClass('parsed');
		buff.find(".coffee:not( .coffeedone )").addClass('coffeedone');
		buff.find(".utsunot:not( .parsed )").addClass('parsed');
		buff.find(".final:not( .parsed )").addClass('parsed');
		window[CHANNEL.name].audioNotice.handler["SurvivalStrategy"]();
		window[CHANNEL.name].audioNotice.handler["stopEvent"]();
		buff.find(".nick-highlight:not( .parsed )").addClass('parsed');
		buff.find(".img1show:not( .parsed )").addClass('parsed');
		buff.find(".img1hide:not( .parsed )").addClass('parsed');
		buff.find(".fixedimg1show:not( .parsed )").addClass('parsed');
		buff.find(".fixedimg1hide:not( .parsed )").addClass('parsed');
		if (chatImg != 'false') {
			buff.css('background-image', "linear-gradient( rgba(0, 0, 0, "+chatImgOp+"), rgba(0, 0, 0, "+chatImgOp+") ), url('"+chatImg+"')");
		} else {
			buff.css('background-image', '');
		}
	});

	waitForEl('#club_redirect', function() {
		$('#club_redirect').attr('href', href_url);
		collapseArrow = $(document.getElementById('collapseArrow'));
		collapseArrow2 = $(document.getElementById('collapseArrow2'));
	});
	waitForEl('#club_banner', function() {
		$('#club_banner').attr('src', banner_url);
	});

	waitForEl('#disco', function() {
		let elem = $('#disco');
		elem.find('img').attr("src", discoGif);
	});

	waitForEl('#imgBubble', function() {
		let elem = $('#imgBubble');
		elem.attr("src", imgBubble);
		if (img1show == "true") {
			$('#imgWrap1').show();
		} else {
			$('#imgWrap1').hide();
		}
	});

	waitForEl('#imgBubble2', function() {
		let elem = $('#imgBubble2');
		elem.attr("src", imgBubble2);
		if (img1fixedshow == "true") {
			$('#imgWrapFixed1').show();
		} else {
			$('#imgWrapFixed1').hide();
		}
	});

	waitForEl('#chatline', function() {
		chatlineElem = $(document.getElementById('chatline'))
		populateEmote();
		chatlineElem.off('keydown');
		chatlineElem.on('keydown', function(e) {
			chatHandler(e);
		});
	});

	waitForEl('#AudioNoticeEvent1', function() {
		let currentBgm = eval("bgm" + bgmSelect + "url");
		let currentBgmKey = "bgm" + bgmSelect + "play";
		window[CHANNEL.name].audioNotice["survivalStrategy"].audio = $("<audio>").prop("id", "AudioNoticeEvent1").appendTo("body").attr("preload", "auto").prop("volume", window[CHANNEL.name].audioNotice["survivalStrategy"].volume).append($("<source>").attr("src", penguinUrl).attr("type", "audio/ogg"));
		window[CHANNEL.name].audioNotice["bgm1play"].audio = $("<audio>").prop("id", "AudioNoticeBgm1Play").appendTo("body").attr("preload", "auto").prop("volume", window[CHANNEL.name].audioNotice[currentBgmKey].volume).append($("<source>").attr("src", currentBgm).attr("type", "audio/ogg"));
		let inPlay = false;
		$('audio').each(function(){
		    if (!this.paused) {
	    		inPlay = true;
		    }
		});
		if (!inPlay || playbgmCondition == "false") {
			window[CHANNEL.name].audioFunction.playbgm1(playbgmCondition == "true");
		}
	});

	waitForEl('span#plcount', function() {
		queueList = $(document.getElementById('queue'));
		videoDisplayToggle();
		autoStartHandler();
	});

	waitForEl('#motd-mode', function() {
		motdMode = $(document.getElementById('motd-mode'));
	});

	waitForEl('#backg', function() {
		if ($(document.getElementById('backg')).css('background-image') != "url(\"https:" + penguinBg + "\")") {
			$(document.getElementById('backg')).css('background-image', "url(" + background_img + ")");
		}
	});

	waitForEl('#countdown1', function() {
		$('#timez').html(getTimeZone());
		countdown1 = document.getElementById('countdown1');
		$(document.getElementById('date1')).html(new Date(date_utc1).toString().split('(')[0]);
		countdown2 = document.getElementById('countdown2');
		$(document.getElementById('date2')).html(new Date(date_utc2).toString().split('(')[0]);
		countdown3 = document.getElementById('countdown3');
		$(document.getElementById('date3')).html(new Date(date_utc3).toString().split('(')[0]);
		countdown4 = document.getElementById('countdown4');
		$(document.getElementById('date4')).html(new Date(date_utc4).toString().split('(')[0]);
		countdown5 = document.getElementById('countdown5');
		$(document.getElementById('date5')).html(new Date(date_utc5).toString().split('(')[0]);
	});

	countDown = new Date(date_utc1).getTime();
	clearInterval(countDownTimer1);
	countDownTimer1 = setInterval(function() {window.countdowner(countdown1, countDown, 1)}, second);

	countDown2 = new Date(date_utc2).getTime();
	clearInterval(countDownTimer2);
	countDownTimer2 = setInterval(function() {window.countdowner(countdown2, countDown2,  2)}, second);

	countDown3 = new Date(date_utc3).getTime();
	clearInterval(countDownTimer3);
	countDownTimer3 = setInterval(function() {window.countdowner(countdown3, countDown3,  3)}, second);

	countDown4 = new Date(date_utc4).getTime();
	clearInterval(countDownTimer4);
	countDownTimer4 = setInterval(function() {window.countdowner(countdown4, countDown4,  4)}, second);

	countDown5 = new Date(date_utc5).getTime();
	clearInterval(countDownTimer5);
	countDownTimer5 = setInterval(function() {window.countdowner(countdown5, countDown5,  5)}, second);

	$("#leader").removeClass("btn-default");
	$("#Notif").removeClass("btn-default");
}


function bindEventHandler() {
	$(bodyElem).on('click', '.deleteMessageBtn', function() {
		let user = $(this).parent()[0].className;
		user = user.split(" ")[0];
		let html = $($(this).parent()[0]).find("span:nth-last-child(2)");
		if (html.find('img:not(.channel-emote)').length > 0) {
			html = html.find('img:not(.channel-emote)').attr("src");
			html = html.substring(0, 120);
			html = html.replace("https://", '');
			html = html.replace("http://", '');
		} else {
			html = html.text().substring(0, 120);
		}
		let messageString = user + "]-2[" + html;
		window.socket.emit("chatMsg", {
			msg: "md01l" + messageString + "md02l"
		});	
	});

	$(bodyElem).on('click', '#userlisttoggle', function() {
		if (rankAdmin) {
			$(".achievement-control").remove();
			$('.btn-group-vertical').append("<button class='btn btn-xs btn-default achievement-control'>Add Achievement</button>");
		}
	});

	$(bodyElem).on('click', '.achievement-add', function() {
		let stringItem = $(this).attr('data-achievement');
		let username = $(this).attr('data-user');
		let curr_alist = JSON.parse(achievementList);
		if (rankAdmin) {
			window.socket.emit("chatMsg", {
				msg: "\*" + username + "\* gained addachievement" + stringItem + "addachievement"
			});				
		}

		if (!curr_alist[username]) {
			curr_alist[username] = [];
			curr_alist[username].push(stringItem);
		} else {
			if (!curr_alist[username].includes(stringItem)) {
				curr_alist[username].push(stringItem);
			}
		}

		let curr_alist_string = JSON.stringify(curr_alist);
		var textField = jsTextField.val();
		var textFieldArray = textField.split("\n");
		var firstBlock = textFieldArray[77].substr(0, textFieldArray[77].lastIndexOf(' = ') + 1);
		textField = textField.replace(textFieldArray[77], firstBlock + "= \"" + curr_alist_string.replace(/["]+/g, '\\"').replace(/[']+/g, "\\'").trim() + "\";");
		jsTextField.val(textField);
		$("#achievementAddModal").remove();
		socket.emit("setChannelJS", {
			js: $("#cs-jstext").val()
		});
	});	

	$(bodyElem).on('mousedown', '.achievement-control', function(e) {
		let username = $(this).parent().parent().find('strong').text();
		createModalExt({
			title: "Add a new achievement for " + username,
			wrap_id: "achievementAddModal",
			body_id: "achievementAddWrap",
			footer: true
		}).on("show.bs.modal", function(event) {
			let curr_alist = JSON.parse(achievementList);
			let listcontent = '';
			let imageUrl = 'https://media.discordapp.net/attachments/501103378714329100/557766332532129793/medal-2163187_960_720.png';
			let textColor = '#FFFF33';
			let textDescription = '';
			achievementMatch.each(function(achievement, i) {
				if ($.inArray(achievement.title, curr_alist[username]) == -1) {
					imageUrl = ((achievement.image != '') ?  achievement.image : 'https://media.discordapp.net/attachments/501103378714329100/557766332532129793/medal-2163187_960_720.png');
					textColor = ((achievement.color != '') ? achievement.color : '#FFFF33');
					textDescription = achievement.description;
					let block = "<div class=''>";
					block += "<div class='achievement-container achievement-add' data-user='"+username+"' data-achievement='"+achievement.title+"' title='"+textDescription+"'>";
					block += "<span class='emote-preview-hax'></span>";
					block += "<img class='emote-preview' src='"+imageUrl+"'>";
					block += "<p style='color: "+textColor+"'><b>"+ achievement.title + "</b></p>";
					block += "</div>";
					block += "</div>";
					listcontent += block;
				}
			});

			$("#achievementAddWrap").html(listcontent);
		
		}).on("hidden.bs.modal", function(event) {
			//$("#customSettingsWrap .customSettings").detach().appendTo($("#customSettingsStaging"));
			$("#achievementAddModal").remove();
		}).insertAfter("#useroptions").modal();
	});

	$(bodyElem).on('click', '.achievement-add-all', function() {
		let stringItem = $(this).attr('data-achievement');
		let curr_alist = JSON.parse(achievementList);
		if (rankAdmin) {
			window.socket.emit("chatMsg", {
				msg: "\*all\* gained addachievement" + stringItem + "addachievement"
			});				
		}

		let connectedUsers = $('#userlist').find('strong');
		connectedUsers.each(function(index, userc) {
			if (!curr_alist[userc.innerText]) {
				curr_alist[userc.innerText] = [];
				curr_alist[userc.innerText].push(stringItem);
			} else {
				if (!curr_alist[userc.innerText].includes(stringItem)) {
					curr_alist[userc.innerText].push(stringItem);
				}
			}			
		});

		let curr_alist_string = JSON.stringify(curr_alist);
		var textField = jsTextField.val();
		var textFieldArray = textField.split("\n");
		var firstBlock = textFieldArray[77].substr(0, textFieldArray[77].lastIndexOf(' = ') + 1);
		textField = textField.replace(textFieldArray[77], firstBlock + "= \"" + curr_alist_string.replace(/["]+/g, '\\"').replace(/[']+/g, "\\'").trim() + "\";");
		jsTextField.val(textField);
		$("#achievementAddAllModal").remove();
		socket.emit("setChannelJS", {
			js: $("#cs-jstext").val()
		});
	});	

	$(bodyElem).on('click', '#medallist-add-all', function() {
		createModalExt({
			title: "Add a new achievement to all",
			wrap_id: "achievementAddAllModal",
			body_id: "achievementAddAllWrap",
			footer: true
		}).on("show.bs.modal", function(event) {
			let curr_alist = JSON.parse(achievementList);
			let listcontent = '';
			let imageUrl = 'https://media.discordapp.net/attachments/501103378714329100/557766332532129793/medal-2163187_960_720.png';
			let textColor = '#FFFF33';
			let textDescription = '';
			achievementMatch.each(function(achievement, i) {
				imageUrl = ((achievement.image != '') ?  achievement.image : 'https://media.discordapp.net/attachments/501103378714329100/557766332532129793/medal-2163187_960_720.png');
				textColor = ((achievement.color != '') ? achievement.color : '#FFFF33');
				textDescription = achievement.description;
				let block = "<div class=''>";
				block += "<div class='achievement-container achievement-add-all' data-achievement='"+achievement.title+"' title='"+textDescription+"'>";
				block += "<span class='emote-preview-hax'></span>";
				block += "<img class='emote-preview' src='"+imageUrl+"'>";
				block += "<p style='color: "+textColor+"'><b>"+ achievement.title + "</b></p>";
				block += "</div>";
				block += "</div>";
				listcontent += block;
			});

			$("#achievementAddAllWrap").html(listcontent);
		
		}).on("hidden.bs.modal", function(event) {
			//$("#customSettingsWrap .customSettings").detach().appendTo($("#customSettingsStaging"));
			$("#achievementAddAllModal").remove();
		}).insertAfter("#useroptions").modal();
	});

	$(bodyElem).on('click', '.chat-avatar', function() {
		let username = $(this).parent().find('.username').text().replace(': ', '');
		createModalExt({
			title: "View " + username + "'s achievements",
			wrap_id: "achievementAddModal",
			body_id: "achievementAddWrap",
			footer: true
		}).on("show.bs.modal", function(event) {
			let curr_alist = JSON.parse(achievementList);
			let nav = "<ul class='nav nav-tabs'>"
			nav += "<li><a href='#current-achievement-list' data-toggle='tab' aria-expanded='false'>View Achievements</a></li>";
			if (rankAdmin) {
				nav += "<li><a href='#add-new-achievement-list' data-toggle='tab' aria-expanded='false'>Add Achievements</a></li>";
			}
			nav += "</ul>";
			let listcontent = "<div id='add-new-achievement-list' class='tab-pane'>";
			let viewcontent = "<div id='current-achievement-list' class='tab-pane active'>";
			let imageUrl = 'https://media.discordapp.net/attachments/501103378714329100/557766332532129793/medal-2163187_960_720.png';
			let textColor = '#FFFF33';
			let textDescription = '';

			curr_alist[username].each(function(title, i) {
				imageUrl = 'https://media.discordapp.net/attachments/501103378714329100/557766332532129793/medal-2163187_960_720.png';
				textColor = '#FFFF33';
				textDescription = '';
				achievementMatch.each(function(achievement, i) {
					if (achievement.title.toLowerCase() == title.toLowerCase()) {
						imageUrl = ((achievement.image != '') ?  achievement.image : 'https://media.discordapp.net/attachments/501103378714329100/557766332532129793/medal-2163187_960_720.png');
						textColor = ((achievement.color != '') ? achievement.color : '#FFFF33');
						textDescription = achievement.description;
					}
				})
				let block = "<div class=''>";
				block += "<div class='achievement-container' data-user='"+username+"' data-achievement='"+title+"' title='"+textDescription+"'>";
				block += "<span class='emote-preview-hax'></span>";
				block += "<img class='emote-preview' src='"+imageUrl+"'>";
				block += "<p style='color: "+textColor+"'><b>"+ title + "</b></p>";
				block += "</div>";
				block += "</div>";
				viewcontent += block;
			});

			achievementMatch.each(function(achievement, i) {
				if ($.inArray(achievement.title, curr_alist[username]) == -1) {
					imageUrl = ((achievement.image != '') ?  achievement.image : 'https://media.discordapp.net/attachments/501103378714329100/557766332532129793/medal-2163187_960_720.png');
					textColor = ((achievement.color != '') ? achievement.color : '#FFFF33');
					textDescription = achievement.description;
					let block = "<div class=''>";
					block += "<div class='achievement-container achievement-add' data-user='"+username+"' data-achievement='"+achievement.title+"' title='"+textDescription+"'>";
					block += "<span class='emote-preview-hax'></span>";
					block += "<img class='emote-preview' src='"+imageUrl+"'>";
					block += "<p style='color: "+textColor+"'><b>"+ achievement.title + "</b></p>";
					block += "</div>";
					block += "</div>";
					listcontent += block;
				}
			});

			listcontent += "</div>";
			viewcontent += "</div>";

			let contentwrap = '';
			if (rankAdmin) {
				contentwrap = "<div class='tab-content'>" + listcontent + viewcontent + "</div>";
			} else {
				contentwrap = "<div class='tab-content'>" + viewcontent + "</div>";
			}

			$("#achievementAddWrap").html(nav + contentwrap);
		
		}).on("hidden.bs.modal", function(event) {
			//$("#customSettingsWrap .customSettings").detach().appendTo($("#customSettingsStaging"));
			$("#achievementAddModal").remove();
		}).insertAfter("#useroptions").modal();
	});

	$(bodyElem).on('click', '#emote-data-field', function(e) {
		appendEmote($(e.target).closest('tr'));
		emoteList.hide();
		emoteTable = false;
	});

	$(bodyElem).on('input', '#chatline', function(e) {
		let index = this.value.lastIndexOf(" ");
		let chatText = this.value.split(" ");
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
		} else if(chatText.length == 1 && lastText.substr(0, 1) == '!' && lastText.length >= 2) {
			emoteList[0].innerHTML = "";
			imgArray = Object.keys(imgLookup);
			let emoteText = lastText.substr(1, lastText.length).toLowerCase();
			let filteredEmote = imgArray.filter(emote => (emote.toLowerCase().indexOf(emoteText) > -1));
			let fullMatch = imgArray.includes("!"+emoteText);
			if (fullMatch || filteredEmote.length == 0) {
				emoteList.hide();
				selectedPopover = null;
				emoteTable = false;
			} else {
				let emoteString = "<table class='table table-sm table-hover emote-table'><tbody>";
				filteredEmote.forEach(function(value, index) {
					let active = (index == 0) ? "active" : "";
					emoteString += "<tr class='selectEmote " + active + "' data-value='" + value + "'>";
					emoteString += "<td>" + value + "</td>";
					emoteString += "</tr>";
				})
				emoteString += "</tbody></table>";
				emoteList[0].innerHTML = emoteString;
				selectedPopover = $('tr.active');
				emoteTable = true;
				emoteList.show();
			}
		} else if(chatText.length == 1 && lastText.substr(0, 1) == '?' && lastText.length >= 2) {
			emoteList[0].innerHTML = "";
			imgArray = Object.keys(soundLookup);
			let emoteText = lastText.substr(1, lastText.length).toLowerCase();
			let filteredEmote = imgArray.filter(emote => (emote.toLowerCase().indexOf(emoteText) > -1));
			let fullMatch = imgArray.includes("?"+emoteText);
			if (fullMatch || filteredEmote.length == 0) {
				emoteList.hide();
				selectedPopover = null;
				emoteTable = false;
			} else {
				let emoteString = "<table class='table table-sm table-hover emote-table'><tbody>";
				filteredEmote.forEach(function(value, index) {
					let active = (index == 0) ? "active" : "";
					emoteString += "<tr class='selectEmote " + active + "' data-value='" + value + "'>";
					emoteString += "<td>" + value + "</td>";
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

	$(bodyElem).on('mouseleave', '.chat-avatar', function() {
		$('.achievement-container-small').remove();
	});

	$(bodyElem).on('mouseover', '.chat-avatar', function() {
		let username = $(this).parent().find('.username').text().replace(': ', '');
		let curr_alist = JSON.parse(achievementList);
		if (!curr_alist[username]) {
			
		} else {
			let userList = $.map(curr_alist[username], function(n, i) {
				return n;
			});
			if (userList.length > 5) {
				userList = userList.slice(1).slice(-5);
			}
			
			let achievementShow = "<div class='achievement-container-small'><table class='table table-sm table-hover achievement-table'><thead><th><td col=2>Recent Achievements</td></th></thead><tbody>";
			userList.reverse().each(function(item, index) {
				let imageUrl = 'https://media.discordapp.net/attachments/501103378714329100/557766332532129793/medal-2163187_960_720.png';
				let textColor = '#FFFF33';
				let textDescription = '';
				achievementMatch.each(function(achievement, i) {
					if (achievement.title.toLowerCase() == item.toLowerCase()) {
						imageUrl = ((achievement.image != '') ?  achievement.image : 'https://media.discordapp.net/attachments/501103378714329100/557766332532129793/medal-2163187_960_720.png');
						textColor = ((achievement.color != '') ? achievement.color : '#FFFF33');
						textDescription = achievement.description;
					}
					});
					achievementShow += "<tr class=''>";
					achievementShow += "<td width=20%><img src='"+imageUrl+"' class='smol-emote'></td>";
					achievementShow += "<td width=80% style='color:"+textColor+"'>";
					achievementShow += item;
					achievementShow += "</td>";
					achievementShow += "</tr>";
			});
			achievementShow += "</tbody></table></div>";
			$(this).parent().after(achievementShow);
		}
	});

	$(bodyElem).on('click', '.btn-bg-save', function() {
		let cmd = $(this).attr('data-value');
		let url = $(this).parent().parent().find('.bg-url').val();
		let imgelem = $(this).parent().parent().parent().find('.bg-preview');
		imgelem.fadeOut('fast', function() {
			imgelem.attr('src', url).fadeIn('fast');
		});
		chatCmdLookup[cmd]([0, url]);
	});

	$(bodyElem).on('click', '.bg-change', function() {
		let selectedBg = $(this).attr('data-value');
		chatCmdLookup[selectedBg]();
		$("#backgroundModal").remove();
	});	

	$(bodyElem).on('click', '#bg-select-option', function() {
		let bgList = [background_img_auto1, background_img_auto2, background_img_auto3, background_img_auto4, background_img_auto5, background_img_auto6, background_img_auto7];
		
		createModalExt({
			title: "View current background",
			wrap_id: "backgroundModal",
			body_id: "backgroundWrap",
			footer: true
		}).on("show.bs.modal", function(event) {
			let nav = "<ul class='nav nav-tabs'>"
			nav += "<li><a href='#current-background-list' data-toggle='tab' aria-expanded='false'>Backgrounds</a></li>";
			nav += "</ul>";
			let viewcontent = "<div id='current-background-list' class='tab-pane active'>";

			let block = "<div class=''>";
			block += "<div class='background-select-container'>";
			block += "<p><b>Current background</b></p>";
			block += "<span class='emote-preview-hax'></span>";
			block += "<img class='bg-preview' src='"+background_img+"'>";
			block += "<div class='input-group input-group-sm'>";
			block += "<input class='form-control bg-url' type='text' value='"+background_img+"'>";
			block += "<div class='input-group-btn'><button class='btn btn-default btn-bg-save' type='button' data-value='/editbg'>Save</button></div>";
			block += "</div>";
			block += "</div>";
			block += "</div>";
			viewcontent += block;

			bgList.each(function(url, i) {
				let block = "<div class=''>";
				block += "<div class='background-select-container'>";
				block += "<p><b>background "+ (i+1) + "</b></p>";
				block += "<span class='emote-preview-hax'></span>";
				block += "<img class='bg-preview bg-change' src='"+url+"' data-value='/setbg"+(i+1)+"'>";
				block += "<div class='input-group input-group-sm'>";
				block += "<input class='form-control bg-url' type='text' value='"+url+"'>";
				block += "<div class='input-group-btn'><button class='btn btn-default btn-bg-save' type='button' data-value='/savebg"+(i+1)+"' >Save</button></div>";
				block += "</div>";
				block += "</div>";
				block += "</div>";
				viewcontent += block;
			});

			viewcontent += "</div>";
			let contentwrap = '';
			contentwrap = "<div class='tab-content'>" + viewcontent + "</div>";

			$("#backgroundWrap").html(nav + contentwrap);
		
		}).on("hidden.bs.modal", function(event) {
			//$("#customSettingsWrap .customSettings").detach().appendTo($("#customSettingsStaging"));
			$("#backgroundModal").remove();
		}).insertAfter("#useroptions").modal();
	});

	$(bodyElem).on('click', '.btn-cd-string-save', function() {
		let cmd = $(this).attr('data-value');
		let input = $(this).parent().parent().find('.cd-title');
		let string = (cmd + " " + input.val()).toString();
		let chatCmdText = string.split(" ");
		chatCmdLookup[cmd](chatCmdText);
	});

	$(bodyElem).on('click', '.btn-cd-save', function() {
		let cmd = $(this).attr('data-value');
		let tag = $(this).attr('data-tag');
		let nameVar = $(this).attr('data-var');
		let input = $(this).parent().parent().find(tag);
		let string = (cmd + " " + input.val()).toString();
		let chatCmdText = string.split(" ");
		let newDisplay = new Date(chatCmdText[1], chatCmdText[2]-1, chatCmdText[3], chatCmdText[4], chatCmdText[5]).toString().split('(')[0];
		input.parent().parent().find('.cd-display-text').html(newDisplay);
		chatCmdLookup[cmd](chatCmdText);
	});

	$(bodyElem).on('click', '#countdown-option', function() {
		let cdList = [date_utc1, date_utc2, date_utc3, date_utc4, date_utc5];
		
		createModalExt({
			title: "Edit countdown",
			wrap_id: "countdownModal",
			body_id: "countdownWrap",
			footer: true
		}).on("show.bs.modal", function(event) {
			let nav = "<ul class='nav nav-tabs'>"
			nav += "<li><a href='#countdown-list' data-toggle='tab' aria-expanded='false'>Countdown</a></li>";
			nav += "</ul>";
			let viewcontent = "<div id='countdown-list' class='tab-pane active'>";
			viewcontent += "</div>";
			let contentwrap = '';
			contentwrap = "<div class='tab-content'>" + viewcontent + "</div>";
			$("#countdownWrap").html(nav + contentwrap);

			cdList.each(function(datetime, i) {
				let displayStr = new Date(datetime).toString().split('(')[0];
				let block = "<div class='row'>";
				let countdownString = eval("countdownText" + (i+1));
				block += "<div class='countdown-container col-sm-5'>";

				block += "<div class='cd-display-text'>"+displayStr+"</div>";

				block += "<div class='input-group input-group-sm bottom-margin'>";
			    block += "<div class='input-group-addon'>countdown "+ (i+1) + "</div>";
				block += "<input class='form-control cd-title' type='text' value='"+countdownString+"'>";
				block += "<div class='input-group-btn'><button class='btn btn-default btn-cd-string-save' type='button' data-value='/cdtitle"+(i+1)+"'>Save</button></div>";
				block += "</div>";


				block += "<div class='input-group input-group-sm'>";
				block += "<input class='form-control cd-text cd-text"+(i+1)+"' type='text' value='' onkeydown='return false'>";
				block += "<div class='input-group-btn'><button class='btn btn-default btn-cd-save' type='button' data-value='/cdlocal"+(i+1)+"' data-tag='.cd-text"+(i+1)+"' data-var='date_utc"+(i+1)+"'>Save</button></div>";
				block += "</div>";

				block += "</div>";
				block += "</div>";
				$("#countdown-list").append(block);
				$('.cd-text'+(i+1)).datetimepicker({
					  format: 'YYYY M D H m s',
					  date: new Date(datetime)
				});
			});
		}).on("hidden.bs.modal", function(event) {
			//$("#customSettingsWrap .customSettings").detach().appendTo($("#customSettingsStaging"));
			$("#countdownModal").remove();
		}).insertAfter("#useroptions").modal();
	});

	$(bodyElem).on('click', '.btn-bgm-save', function() {
		let cmd = $(this).attr('data-value');
		let input = $(this).parent().parent().find('.bgm-title');
		let string = (cmd + " " + input.val()).toString();
		let chatCmdText = string.split(" ");
		chatCmdLookup[cmd](chatCmdText);
	});

	$(bodyElem).on('click', '.btn-bgm-play', function() {
		let cmd = $(this).attr('data-value');
		chatCmdLookup[cmd]();
	});

	$(bodyElem).on('click', '.bgm-toggle', function() {
		let status = $(this).attr('data-status');
		let toggle = ((status == "On") ? "false" : "true");
		let newStatus = ((status == "On") ? "Off" : "On");
		$(this).html(newStatus);
		$(this).attr('data-status', newStatus);
		editJs(67, [0, toggle]);
	});

	$(bodyElem).on('click', '.bgm-auto-toggle', function() {
		let status = $(this).attr('data-status');
		let toggle = ((status == "Yes") ? "false" : "true");
		let newStatus = ((status == "Yes") ? "No" : "Yes");
		$(this).html(newStatus);
		$(this).attr('data-status', newStatus);
		editJs(68, [0, toggle]);
	});

	$(bodyElem).on('click', '#bgm-option', function() {
		let bgmList = [bgm1url, bgm2url, bgm3url, bgm4url, bgm5url];
		
		let bgm_status = ((bgmoff == "true") ? "On" : "Off");
		let bgm_auto_status = ((playbgmCondition == "true") ? "Yes" : "No");

		createModalExt({
			title: "Edit BGM",
			wrap_id: "bgmModal",
			body_id: "bgmWrap",
			footer: true
		}).on("show.bs.modal", function(event) {
			let nav = "<ul class='nav nav-tabs'>"
			nav += "<li><a href='#bgm-list' data-toggle='tab' aria-expanded='false'>BGM</a></li>";
			nav += "</ul>";
			let viewcontent = "<div id='bgm-list' class='tab-pane active'>";

			viewcontent += "<div class='row top-margin-theme col-sm-12'>";
			viewcontent += "<div class='col-sm-3 theme-menu'>";
			viewcontent += "<b>Status:</b>";
			viewcontent += "<button class='btn btn-default bgm-toggle bgm-btn' data-status='"+bgm_status+"'>"+bgm_status+"</button>";
			viewcontent += "</div>";
			viewcontent += "<div class='col-sm-4 theme-menu'>";
			viewcontent += "<b>Stop when the video plays: </b>";
			viewcontent += "<button class='btn btn-default bgm-auto-toggle bgm-btn' data-status='"+bgm_auto_status+"'>"+bgm_auto_status+"</button>";
			viewcontent += "</div>";
			viewcontent += "</div>";

			viewcontent += "</div>";
			let contentwrap = '';
			contentwrap = "<div class='tab-content'>" + viewcontent + "</div>";
			$("#bgmWrap").html(nav + contentwrap);

			bgmList.each(function(bgm, i) {

				let displayStr = "BGM " + (i+1);
				let block = "<div class='row col-sm-12'>";
				block += "<div class='bgm-container col-sm-12'>";

				block += "<div class='input-group input-group-sm bottom-margin'>";
			    block += "<div class='input-group-addon'>"+ displayStr + "</div>";
				block += "<input class='form-control bgm-title' type='text' value='"+bgm+"'>";
				block += "<div class='input-group-btn'>";
				block += "<button class='btn btn-default btn-bgm-save' type='button' data-value='/setbgm"+(i+1)+"'>Save</button>";
				block += "<button class='btn btn-default btn-bgm-play' type='button' data-value='/playbgm"+(i+1)+"'>Play</button>";
				block += "</div>";
				block += "</div>";

				block += "</div>";
				block += "</div>";
				$("#bgm-list").append(block);
			});
		}).on("hidden.bs.modal", function(event) {
			$("#bgmModal").remove();
		}).insertAfter("#useroptions").modal();
	});

	$(bodyElem).on('click', '.theme-col-save', function() {
		let cmd = $(this).attr('data-value');
		let hex = $(this).parent().parent().find('.input-hex').val();
		let opacity = $(this).parent().parent().find('.input-opacity').val();
		chatCmdLookup[cmd]([cmd, hex, opacity]);
	});

	$(bodyElem).on('click', '.theme-toggle', function() {
		let status = $(this).attr('data-status');
		if (status == "On") {
			$(this).attr('data-status', "Off");
			$(this).text("Off");
			chatCmdLookup["/themeoff"]();
		} else {
			$(this).attr('data-status', "On");
			$(this).text("On");
			chatCmdLookup["/themeon"]();
		}
	});

	$(bodyElem).on('click', '.theme-reset', function() {
		if (confirm("this will reset all parameters")) {
			chatCmdLookup["/themereset"]();	
			$("#themeModal").remove();
		}
	});

	$(bodyElem).on('click', '#theme-col-option', function() {
		let themeList = [{'themetop': 57}, {'themebutton': 69}, {'themechat': 76}, {'themechatinput': 80}, {'themesection': 73}];

		var cssTextField = $(document.getElementById('cs-csstext'));
		var textField = cssTextField.val();
		var textFieldArray = textField.split("\n");
		let toggle_status = (textFieldArray[55] == "/**/") ? "On" : "Off"; 

		createModalExt({
			title: "Edit theme",
			wrap_id: "themeModal",
			body_id: "themeWrap",
			footer: true
		}).on("show.bs.modal", function(event) {
			let nav = "<ul class='nav nav-tabs'>"
			nav += "<li><a href='#theme-col-list' data-toggle='tab' aria-expanded='false'>Theme and Opacity</a></li>";
			nav += "</ul>";
			let viewcontent = "<div id='theme-col-list-top' class='tab-pane active'>";


			viewcontent += "<div class='row top-margin-theme col-sm-12'>";
			viewcontent += "<div class='col-sm-3 theme-menu'>";
			viewcontent += "<b>Status:</b>";
			viewcontent += "<button class='btn btn-default theme-toggle theme-btn' data-status='"+toggle_status+"'>"+toggle_status+"</button>";
			viewcontent += "</div>";
			viewcontent += "<div class='col-sm-4 theme-menu'>";
			viewcontent += "<b>Reset the parameters? </b>";
			viewcontent += "<button class='btn btn-default theme-reset theme-btn'>Reset</button>";
			viewcontent += "</div>";
			viewcontent += "</div>";


			viewcontent += "<div id='theme-col-list' class='tab-pane active col-sm-12'>";
			viewcontent += "</div>";
			viewcontent += "</div>";
			let contentwrap = '';
			contentwrap = "<div class='tab-content'>" + viewcontent + "</div>";
			$("#themeWrap").html(nav + contentwrap);

			themeList.each(function(cmd, i) {
				let key = Object.keys(cmd)[0];
				let firstBlock = textFieldArray[cmd[key]].split(": ")[1];
				firstBlock = firstBlock.split("rgba(")[1];
				firstBlock = firstBlock.split(")")[0];
				firstBlock = firstBlock.split(", ");
				let curr_op = firstBlock[1];
				let rgb = firstBlock[0].split(',');
				let curr_hex = rgbToHex(rgb[0], rgb[1], rgb[2]);
				let block = "<div class='row'>";
				block += "<div class='theme-col-container row'>";
				block += "<p><b>"+key+"</b></p>";
				block += "<div class='row'>";
				block += "<div class='col-sm-3'>";
				block += "<input class='form-control input-hex' type='text' value='"+curr_hex+"'>";
				block += "</div>";
				block += "<div class='col-sm-3'>";
				block += "<input class='form-control input-opacity' type='text' value='"+curr_op+"'>";
				block += "</div>";
				block += "<div class='col-sm-3'>";
				block += "<button class='btn btn-default theme-col-save' type='button' data-value='/"+key+"'>Save</button>";
				block += "</div>";
				block += "</div>";
				block += "</div>";
				block += "</div>";
				$("#theme-col-list").append(block);
			});

		}).on("hidden.bs.modal", function(event) {
			//$("#customSettingsWrap .customSettings").detach().appendTo($("#customSettingsStaging"));
			$("#themeModal").remove();
		}).insertAfter("#useroptions").modal();
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


	$(bodyElem).on('hidden.bs.collapse', '#collapseSchedule', function() {
		collapseArrow2[0].classList.remove('glyphicon-chevron-up');
		collapseArrow2[0].classList.add('glyphicon-chevron-down');
	});

	$(bodyElem).on('show.bs.collapse', '#collapseSchedule', function() {
		collapseArrow2[0].classList.remove('glyphicon-chevron-down');
		collapseArrow2[0].classList.add('glyphicon-chevron-up');
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
		if (!document.activeElement.classList.contains('form-control') && !document.activeElement.classList.contains('btn') && !document.activeElement.classList.contains('add-temp') && !document.getElementById('channeloptions').classList.contains('in') && (document.activeElement != document.getElementById('chatline')) && (e.which == 13 || e.which == 9)) {
			e.preventDefault();
			$(document.getElementById('chatline')).focus();
		}
	});

	$(bodyElem).on('keydown', '#mediaurl',function(e) {
		if (e.which == 9 && $('#addfromurl-title-val').length > 0) {
			e.preventDefault();
			$(document.getElementById('addfromurl-title-val')).focus();
		}
	});

	$(bodyElem).on('mouseover', '.lazy', function() {
		$(this).attr('src', $(this).attr('data-src'));
		$(this).removeClass('lazy');
	});

	$(bodyElem).on('click', '#amq-open', function(e) {
		if ($('.amq-wrap').length > 0) {
			chatCmdLookup['/amqiclose']();
		} else {
			chatCmdLookup['/amqi']();
		}
	});

	$(bodyElem).on('click', '#amq-open-all', function(e) {
		if ($('.amq-wrap').length > 0) {
			if (confirm("This will close amq for everyone. Proceed?")) {
				chatCmdLookup['/amqclose']();
			}
		} else {
			if (confirm("This will open amq for all logged in users. Proceed?")) {
				chatCmdLookup['/amq']();
			}
		}
	});

	$(bodyElem).on('click', '#medallist', function(e) {
		createModalExt({
			title: window.CLIENT.name + "'s achievement",
			wrap_id: "achievementModal",
			body_id: "achievementWrap",
			footer: true
		}).on("show.bs.modal", function(event) {
			let curr_alist = JSON.parse(achievementList);
			let username = window.CLIENT.name;
			if (!curr_alist[username]) {
				$("#achievementWrap").html('');
			} else {
				let userList = $.map(curr_alist[username], function(n, i) {
					return n;
				});

				let listcontent = '';
				curr_alist[username].each(function(title,i) {
					let imageUrl = 'https://media.discordapp.net/attachments/501103378714329100/557766332532129793/medal-2163187_960_720.png';
					let textColor = '#FFFF33';
					let textDescription = '';
					achievementMatch.each(function(achievement, i) {
						if (achievement.title.toLowerCase() == title.toLowerCase()) {
							imageUrl = ((achievement.image != '') ?  achievement.image : 'https://media.discordapp.net/attachments/501103378714329100/557766332532129793/medal-2163187_960_720.png');
							textColor = ((achievement.color != '') ? achievement.color : '#FFFF33');
							textDescription = achievement.description;
						}
					});

					let block = "<div class=''>";
					block += "<div class='achievement-container' title='"+textDescription+"'>";
					block += "<span class='emote-preview-hax'></span>";
					block += "<img class='emote-preview' src='"+imageUrl+"'>";
					block += "<p style='color: "+textColor+"'><b>"+ title + "</b></p>";
					block += "</div>";
					block += "</div>";
					listcontent += block;
				});
				$("#achievementWrap").html(listcontent);
			}
		}).on("hidden.bs.modal", function(event) {
			//$("#customSettingsWrap .customSettings").detach().appendTo($("#customSettingsStaging"));
			achievementMatch = readAchievement();
			$("#achievementModal").remove()
		}).insertAfter("#useroptions").modal()
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