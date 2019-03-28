//-------------------------------------------------[CONTROL BLOCK]----------------------------------------------------------------------
//https is preferred for url
var banner_url = 'http://media.discordapp.net/attachments/239432653684736001/560185374530601020/current_after_tankshift.png?width=1300&height=250';
var href_url = "https://docs.google.com/spreadsheets/d/1KmHlAfiQza9vZrBSvsfWrzdyMP9u5KgQG6e5DWNwkow/edit?usp=sharing";
var background_img = "http://cdn.discordapp.com/attachments/466386319766192138/560598053296406528/kurenai_bg_v2.jpg";
var autostart_msg = "start!";
var countdown_utc = {
	year: 2019,
	month: 3,
	day: 31,
	hour: 19,
	minute: 0,
	second: 0,
};
var countdown_utc2 = {
	year2: 2019,
	month2: 3,
	day2: 30,
	hour2: 21,
	minute2: 0,
	second2: 0
};
var background_img_auto1 = 'http://cdn.discordapp.com/attachments/466386319766192138/557714741527576588/pape.jpg';
var background_img_auto2 = "http://media.discordapp.net/attachments/528150212875649065/560543017329623076/65bb612d175e3aa95bd8676064b81ceb.jpg?width=1248&height=702";
var chatMute = 'false';
var background_img_auto3 = 'http://getreelcinemas.com//wp-content/uploads/2015/02/Background-Narrow.jpg';
var noiseActive = 'true';
var background_img_auto4 = 'http://cdn.discordapp.com/attachments/466386319766192138/518440179246170142/misaka_cytube_pape_maybe.jpg';
var countdown_utc3 = {
	year3: 2019,
	month3: 3,
	day3: 29,
	hour3: 23,
	minute3: 0,
	second3: 0
};
var penguinImg = '//media.discordapp.net/attachments/515347492511023113/525863422840274944/DSciEJcVAAAe6rY.jpg';
var penguinUrl = '//cdn.discordapp.com/attachments/485983742004035594/525845582934310922/Intermission.mp3';
var penguinBg = '//media.discordapp.net/attachments/515347492511023113/525860289267236875/16719bfccf9c3f27d77bf05379d19388.png';
var updateCmd = "false";
var discoGif = '//media.discordapp.net/attachments/515347492511023113/525860799210848268/1446148934-Young_animation_holiday102815_03.gif';
var imgBubble = '//cdn.discordapp.com/attachments/466386319766192138/547686243517857793/1467550476_panzer_chibi.gif';
var imgBubble2 = '//cdn.discordapp.com/attachments/428195862963814413/554417601418362900/PNG_Image_693_653_pixels.png';
var chatImg = 'false';
var img1show = 'false';
var img1fixedshow = 'false';
var chatLimit = 'false';
var chatDelay = '1';
var chatImgOp = '.8';
var delmessage = "false";
var countdown_utc4 = {
	year4: 2019,
	month4: 3,
	day4: 30,
	hour4: 15,
	minute4: 0,
	second4: 0
};
var countdown_utc5 = {
	year5: 2019,
	month5: 3,
	day5: 11,
	hour5: 23,
	minute5: 0,
	second5: 0
};
var bgm1url = "https://cdn.discordapp.com/attachments/528005830419677185/560542474247077906/27_-_Hitomi_-_A_secret_of_the_moon.flac";
var playbgmCondition = "true";
var bgmoff = "true";
var background_img_auto5 = 'http://cdn.discordapp.com/attachments/466386319766192138/535705109485584399/0_0_productGfx_20bc389bdbee05036af2a7925099044b.jpg';
var background_img_auto6 = 'http://cdn.discordapp.com/attachments/466386319766192138/535705109485584399/0_0_productGfx_20bc389bdbee05036af2a7925099044b.jpg';
var background_img_auto7 = 'http://cdn.discordapp.com/attachments/524667869737254923/549389942242017290/clannad_pape_take_1.jpg';
var bgm2url = 'https://cdn.discordapp.com/attachments/466386319766192138/556217613852868629/Kaneda.mp3';
var bgm3url = "https://cdn.discordapp.com/attachments/528005830419677185/559522269987209219/21_-_Yume_wa_Nando_mo_Umare_Kawaru.flac";
var bgm4url = 'https://cdn.discordapp.com/attachments/515347492511023113/537045687691378688/Dango_Daikazoku_Instrumental_OST_Clannad.mp3';
var bgm5url = "https://cdn.discordapp.com/attachments/528005830419677185/558834338314190848/14._Negai_ga_Kanau_Basho_II.mp3";
var bgmSelect = "1";
var achievementList = "{\"gimmic\":[\"first blood\",\"Cytube Wizard\"],\"Zinzoo\":[\"first blood\"],\"raccomunk\":[\"first blood\"],\"Madoq\":[\"first blood\"],\"mrmooshe\":[\"first blood\"],\"PhenomSage\":[\"Supreme Ruler\"],\"HeartsTM\":[\"Pun Professor\"]}";
//-----------------------------------------------------------------------------------------------------------------------------------
//ControlBlockEnd
//console.log = function() {}
//function scrollChat() {}
var bgm1volume = .5;
var bgm2volume = .5;
var bgm3volume = .5;
var bgm4volume = .5;
var bgm5volume = .5;
var event1Volume = .8;
var voteskipImg = 'https://cdn.discordapp.com/attachments/409829343263719427/511380810637770752/Ban_circle_font_awesome-red.svg.png';
var voteskipFinalImg = 'https://media.discordapp.net/attachments/409829343263719427/513465042797068341/1-2-fail-stamp-picture-thumb.png';
var voteskipFinalUrl = 'https://cdn.discordapp.com/attachments/409829343263719427/513476476289548318/Judges_Gavel-SoundBible.com-1321455227.wav';
var emoteTable = "false";
var event1timeout;
var penguinTimeout = 19000;
var emoteArray = [];
var selectedPopover;
var handlerKeydown;
var date_utc = Date.UTC(countdown_utc.year, countdown_utc.month - 1, countdown_utc.day, countdown_utc.hour, countdown_utc.minute, countdown_utc.second);
var date_utc2 = Date.UTC(countdown_utc2.year2, countdown_utc2.month2 - 1, countdown_utc2.day2, countdown_utc2.hour2, countdown_utc2.minute2, countdown_utc2.second2);
var date_utc3 = Date.UTC(countdown_utc3.year3, countdown_utc3.month3 - 1, countdown_utc3.day3, countdown_utc3.hour3, countdown_utc3.minute3, countdown_utc3.second3);
var date_utc4 = Date.UTC(countdown_utc4.year4, countdown_utc4.month4 - 1, countdown_utc4.day4, countdown_utc4.hour4, countdown_utc4.minute4, countdown_utc4.second4);
var date_utc5 = Date.UTC(countdown_utc5.year5, countdown_utc5.month5 - 1, countdown_utc5.day5, countdown_utc5.hour5, countdown_utc5.minute5, countdown_utc5.second5);
var chatlineElem;
var queueList;
var emoteList;
var countDown;
var countDownTimer1;
var countDown2;
var countDownTimer2;
var countDown3;
var countDownTimer3;
var countDown4;
var countDownTimer4;
var countDown5;
var countDownTimer5;
var collapseArrow;
var collapseArrow2;
var emotePreload = "false";
var autoPosition = -1;
var voteskipMsg = "==BZZZZT!==";
var voteskipMsgFinal = "---BZZZZT!---";
var countdown1, countdown2;
var rankMod = (window.CLIENT.rank >= 2),
	rankAdmin = (window.CLIENT.rank >= 3);
var motdMode = $(document.getElementById('motd-mode'));
var jsTextField = $(document.getElementById('cs-jstext'));
var bodyElem = document.body;
var picklist;
var achievementMatch;
var imgLookup;
var soundLookup;
var emoteAudioList;

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
	'event-ext': {
		active: 1,
		rank: -1,
		url: "https://rawcdn.githack.com/gimmic234/cytube_backup/94c5e76d436d4f991f668c75c1ac3900afd0aadc/current-ext.js",
		callback: true
	},
	'layout': {
		active: 1,
		rank: -1,
		url: "https://rawcdn.githack.com/gimmic234/cytube_backup/56ed1b9b0e1cb9e783ef440d44a4ea24a73c99d6/module/channelbase-mod.js",
		callback: true
	},
	'settings': {
		active: 1,
		rank: -1,
		url: "https://rawcdn.githack.com/gimmic234/cytube_backup/2af18e0d36c8aeaf2ec97c79600ecc0f57cab5fb/module/settings.js",
		callback: true
	},
	'overlay': {
		active: 1,
		rank: -1,
		url: "https://rawcdn.githack.com/gimmic234/cytube_backup/2af18e0d36c8aeaf2ec97c79600ecc0f57cab5fb/module/overlay.js",
		callback: true
	},
	'channels': {
		active: 1,
		rank: -1,
		url: "https://rawcdn.githack.com/gimmic234/cytube_backup/2af18e0d36c8aeaf2ec97c79600ecc0f57cab5fb/module/channels.js",
		callback: true
	},
	'xaekai': {
		active: 1,
		rank: -1,
		url: "https://rawcdn.githack.com/gimmic234/cytube_backup/565094f2f21a15d814ea245f7f3bd4711e9bc34e/module/XaeKaiModules.js",
		callback: true
	},
	'channel': {
		active: 1,
		rank: -1,
		url: "https://rawcdn.githack.com/gimmic234/cytube_backup/2af18e0d36c8aeaf2ec97c79600ecc0f57cab5fb/module/enhancer-mod.js",
		callback: true
	}
};

window[CHANNEL.name].sequencePrev = window[CHANNEL.name].sequencePrev || "";
window[CHANNEL.name].sequenceState = window[CHANNEL.name].sequenceState || 0;
window[CHANNEL.name].sequenceIndex = Object.keys(window[CHANNEL.name].sequenceList);
window[CHANNEL.name].sequencerLoader = function() {
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