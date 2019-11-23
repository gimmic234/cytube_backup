//-------------------------------------------------[CONTROL BLOCK]----------------------------------------------------------------------
//https is preferred for url
var banner_url = 'http://media.discordapp.net/attachments/528150212875649065/625399861910437909/current.png?width=1300&height=250';
var href_url = "https://docs.google.com/spreadsheets/d/1KmHlAfiQza9vZrBSvsfWrzdyMP9u5KgQG6e5DWNwkow/edit?usp=sharing";
var background_img = "http://cdn.discordapp.com/attachments/521413432294113303/647539892556922880/392325.png";
var autostart_msg = "start!";
var countdown_utc = {
	year: 2019,
	month: 11,
	day: 24,
	hour: 20,
	minute: 0,
	second: 0,
};
var countdown_utc2 = {
	year2: 2019,
	month2: 11,
	day2: 23,
	hour2: 22,
	minute2: 0,
	second2: 0
};
var background_img_auto1 = "http://cdn.discordapp.com/attachments/419692699986165770/617001300449558529/korra_bg5.jpg";
var background_img_auto2 = "http://cdn.discordapp.com/attachments/521413432294113303/647539892556922880/392325.png";
var chatMute = 'false';
var background_img_auto3 = "http://media.discordapp.net/attachments/528150212875649065/597142637828636693/thumb-1920-1000727.jpg?width=1248&height=702";
var noiseActive = 'true';
var background_img_auto4 = "http://media.discordapp.net/attachments/633533577216393257/643442652867592192/0eabcfd9eddc99f7caa211e2ca160716-700.jpg";
var countdown_utc3 = {
	year3: 2019,
	month3: 11,
	day3: 30,
	hour3: 0,
	minute3: 0,
	second3: 0
};
var penguinImg = '//media.discordapp.net/attachments/515347492511023113/525863422840274944/DSciEJcVAAAe6rY.jpg';
var penguinUrl = '//cdn.discordapp.com/attachments/485983742004035594/525845582934310922/Intermission.mp3';
var penguinBg = '//media.discordapp.net/attachments/515347492511023113/525860289267236875/16719bfccf9c3f27d77bf05379d19388.png';
var updateCmd = "false";
var discoGif = '//media.discordapp.net/attachments/515347492511023113/525860799210848268/1446148934-Young_animation_holiday102815_03.gif';
var imgBubble = "//cdn.discordapp.com/emojis/623167475332415509.png?v=1";
var imgBubble2 = "//media.discordapp.net/attachments/501103378714329100/628815108805754890/pumpkin-clipart-black-and-white-vines-ncX8KMedi.png";
var chatImg = "false";
var img1show = "true";
var img1fixedshow = "false";
var chatLimit = 'false';
var chatDelay = '1';
var chatImgOp = ".8";
var delmessage = "false";
var countdown_utc4 = {
	year4: 2019,
	month4: 8,
	day4: 24,
	hour4: 22,
	minute4: 47,
	second4: 0
};
var countdown_utc5 = {
	year5: 2019,
	month5: 9,
	day5: 28,
	hour5: 19,
	minute5: 0,
	second5: 0
};
var bgm1url = "https://cdn.discordapp.com/attachments/528005830419677185/577558806935109662/22_-_SHI-KI.mp3";
var playbgmCondition = "true";
var bgmoff = "true";
var background_img_auto5 = "http://vistapointe.net/images/theatre-1.jpg";
var background_img_auto6 = "http://i.imgur.com/gl1cGjY.png";
var background_img_auto7 = 'http://cdn.discordapp.com/attachments/524667869737254923/549389942242017290/clannad_pape_take_1.jpg';
var bgm2url = "https://cdn.discordapp.com/attachments/515347492511023113/643613784812027906/KAIJI_OST_-_Wish.mp3";
var bgm3url = "https://www.youtube.com/watch?v=rRTlLZ05KAs";
var bgm4url = "https://cdn.discordapp.com/attachments/515347492511023113/639277260897255453/Non_Non_Biyori_-_Original_Soundtrack_Hidamari_Michi_to_Ren_chon.mp3";
var bgm5url = "https://cdn.discordapp.com/attachments/528005830419677185/558834338314190848/14._Negai_ga_Kanau_Basho_II.mp3";
var bgmSelect = "3";
var achievementList = "{}";
var countdownText1 = "Club";
var countdownText2 = "Movie";
var countdownText3 = "K-ON";
var countdownText4 = "intermission";
var countdownText5 = "Geah";
var nicoEffectOnControl = "false";
var loginTime = "false";
var loginTimeKey = "39909";
var loginExport = "true";
//-----------------------------------------------------------------------------------------------------------------------------------
var loadConfigUrl = "https://rawcdn.githack.com/gimmic234/cytube_backup/7984d9d281df01120483e19d87d20f794a6b179e/config.js";

var statKeys = ['Team Mugi', 'Team Mio', 'Team Ritsu', 'Team Yui'];
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
	'moment.js': {
		active: 1,
		rank: -1,
		url: "https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.24.0/moment.min.js",
		callback: true
	},
	'bootstrap-datepicker': {
		active: 1,
		rank: -1,
		url: "https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datetimepicker/4.17.47/js/bootstrap-datetimepicker.min.js",
		callback: true
	},
	'event-ext': {
		active: 1,
		rank: -1,
		url: "https://rawcdn.githack.com/gimmic234/cytube_backup/5e1d584cc47a1df715a7dd71d99c4b1217f5e878/current-ext.js",
		callback: true
	},
	'layout': {
		active: 1,
		rank: -1,
		url: "https://rawcdn.githack.com/gimmic234/cytube_backup/715d222bb94deb81762318424da31e37557af08e/module/channelbase-mod.js",
		callback: true
	},
	'settings': {
		active: 1,
		rank: -1,
		url: "https://rawcdn.githack.com/gimmic234/cytube_backup/4a30cddf29684bfa80b3c95fd58690ce68306008/module/settings.js",
		callback: true
	},
	'overlay': {
		active: 1,
		rank: -1,
		url: "https://rawcdn.githack.com/gimmic234/cytube_backup/4a30cddf29684bfa80b3c95fd58690ce68306008/module/overlay.js",
		callback: true
	},
	'channels': {
		active: 1,
		rank: -1,
		url: "https://rawcdn.githack.com/gimmic234/cytube_backup/4a30cddf29684bfa80b3c95fd58690ce68306008/module/channels.js",
		callback: true
	},
	'xaekai': {
		active: 1,
		rank: -1,
		url: "https://rawcdn.githack.com/gimmic234/cytube_backup/5965019ab9fd793694114cd7631ac274a523266d/module/XaeKaiModules.js",
		callback: true
	},
	'channel': {
		active: 1,
		rank: -1,
		url: "https://rawcdn.githack.com/gimmic234/cytube_backup/4a30cddf29684bfa80b3c95fd58690ce68306008/module/enhancer-mod.js",
		callback: true
	}
};

$.getScript(loadConfigUrl, window[CHANNEL.name].sequencerLoader);
window[CHANNEL.name].sequencePrev = window[CHANNEL.name].sequencePrev || "";
window[CHANNEL.name].sequenceState = window[CHANNEL.name].sequenceState || 0;
window[CHANNEL.name].sequenceIndex = Object.keys(window[CHANNEL.name].sequenceList);
window[CHANNEL.name].sequencerLoader = function() {
	rankMod = (window.CLIENT.rank >= 2);
	rankAdmin = (window.CLIENT.rank >= 3);
	// After first run we curry the previous modules callback
	// This is mainly used to reassign variables in modules/scripts that don't use module options
	if (window[CHANNEL.name].sequencePrev) {
		setTimeout(window[CHANNEL.name].sequenceList[window[CHANNEL.name].sequencePrev].callback, 0)
		window[CHANNEL.name].sequencePrev = "";
	}

	if (window[CHANNEL.name].sequenceState >= window[CHANNEL.name].sequenceIndex.length) {
		return (function() {
			window.loadInitializer();
		})();
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
window[CHANNEL.name].sequencerLoader();
if (updateCmd == "true") {
	$.getScript(window[CHANNEL.name].sequenceList['event-ext'].url);
}

$(".navbar-brand").text("Anime Club");