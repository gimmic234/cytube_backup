//-------------------------------------------------[CONTROL BLOCK]----------------------------------------------------------------------
//https is preferred for url
var banner_url = 'http://media.discordapp.net/attachments/528150212875649065/625399861910437909/current.png?width=1300&height=250';
var href_url = "https://docs.google.com/spreadsheets/d/1KmHlAfiQza9vZrBSvsfWrzdyMP9u5KgQG6e5DWNwkow/edit?usp=sharing";
var background_img = "http://i.imgur.com/gl1cGjY.png";
var autostart_msg = "start!";
var countdown_utc = {
	year: 2019,
	month: 11,
	day: 14,
	hour: 0,
	minute: 0,
	second: 0,
};
var countdown_utc2 = {
	year2: 2019,
	month2: 11,
	day2: 16,
	hour2: 22,
	minute2: 0,
	second2: 0
};
var background_img_auto1 = "http://cdn.discordapp.com/attachments/419692699986165770/617001300449558529/korra_bg5.jpg";
var background_img_auto2 = "http://media.discordapp.net/attachments/528150212875649065/560543017329623076/65bb612d175e3aa95bd8676064b81ceb.jpg?width=1248&height=702";
var chatMute = 'false';
var background_img_auto3 = "http://media.discordapp.net/attachments/528150212875649065/597142637828636693/thumb-1920-1000727.jpg?width=1248&height=702";
var noiseActive = 'true';
var background_img_auto4 = "http://image.tmdb.org/t/p/original/xZfEIJLLtZuKBADDaxqymRwKcmx.jpg";
var countdown_utc3 = {
	year3: 2019,
	month3: 11,
	day3: 16,
	hour3: 0,
	minute3: 0,
	second3: 0
};
var penguinImg = '//media.discordapp.net/attachments/515347492511023113/525863422840274944/DSciEJcVAAAe6rY.jpg';
var penguinUrl = '//cdn.discordapp.com/attachments/485983742004035594/525845582934310922/Intermission.mp3';
var penguinBg = '//media.discordapp.net/attachments/515347492511023113/525860289267236875/16719bfccf9c3f27d77bf05379d19388.png';
var updateCmd = "false";
var discoGif = '//media.discordapp.net/attachments/515347492511023113/525860799210848268/1446148934-Young_animation_holiday102815_03.gif';
var imgBubble = "//media.discordapp.net/attachments/562795394157903885/639667719523794984/1388887872181.png?width=783&height=615";
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
var bgm2url = "https://cdn.discordapp.com/attachments/433418317265502218/604458535287259147/1_-_.mp3";
var bgm3url = "https://cdn.discordapp.com/attachments/528005830419677185/541363433510010882/48-family_akb48-shoujotachi-yo.mp3";
var bgm4url = "https://cdn.discordapp.com/attachments/515347492511023113/639277260897255453/Non_Non_Biyori_-_Original_Soundtrack_Hidamari_Michi_to_Ren_chon.mp3";
var bgm5url = "https://cdn.discordapp.com/attachments/528005830419677185/558834338314190848/14._Negai_ga_Kanau_Basho_II.mp3";
var bgmSelect = "4";
var achievementList = "{\"gimmic\":[\"first blood\",\"Cytube Wizard\",\"Anime Club: Year 2\",\"Clannad\",\"Seasonal Stream: Winter 2019\",\"Kurenai\",\"Hula Hula!\",\"Team Kanade\",\"Symphogear\",\"Elementalist\",\"Seasonal Stream: Spring 2019\",\"Seafarer\",\"Luck 100\",\"Fateless\",\"My Own Rakugo\",\"Oh My Friends\",\"Team Nico\",\"I Love Lives! \",\"Stormbound\",\"Done\",\"Fight The Powah!\",\"Grand Slam\",\"Return To Sender\",\"Remember, Remember...\"],\"Zinzoo\":[\"first blood\",\"Anime Club: Year 2\",\"Clannad\",\"Seasonal Stream: Winter 2019\",\"Kurenai\",\"Team Tsubasa\",\"Team Shirabe\",\"Symphogear\",\"Elementalist\",\"Seasonal Stream: Spring 2019\",\"Seafarer\",\"Luck 100\",\"Fateless\",\"My Own Rakugo\",\"Team Nico\",\"I Love Lives! \",\"Breaking Down Barriers\",\"Stormbound\",\"Done\",\"Fight The Powah!\",\"Grand Slam\",\"Return To Sender\",\"That\"],\"raccomunk\":[\"first blood\",\"Clannad\",\"Kurenai\",\"Anime Club: Year 2\",\"Team Chris\",\"Team Shirabe\",\"Symphogear\",\"Elementalist\",\"Seasonal Stream: Spring 2019\",\"Seafarer\",\"Luck 100\",\"Fateless\",\"My Own Rakugo\",\"Oh My Friends\",\"Team Rin\",\"I Love Lives! \",\"Breaking Down Barriers\",\"Stormbound\",\"Fight The Powah!\",\"Grand Slam\",\"Return To Sender\"],\"Madoq\":[\"first blood\",\"Clannad\",\"Kurenai\",\"Hula Hula!\",\"Team Tsubasa\",\"Team Hibiki\",\"Symphogear\",\"Seasonal Stream: Spring 2019\",\"Seafarer\",\"Team Hanayo\",\"I Love Lives! \",\"Done\",\"Fight The Powah!\"],\"mrmooshe\":[\"first blood\",\"Clannad\",\"Team Maria\",\"Team Miku\",\"Team Elfnein\",\"Symphogear\",\"Oh My Friends\",\"I Love Lives! \",\"Team Rin\",\"Breaking Down Barriers\",\"Fight The Powah!\",\"Grand Slam\"],\"PhenomSage\":[\"Supreme Ruler\",\"Clannad\",\"Kurenai\",\"Team Chris\",\"Team Miku\",\"Symphogear\",\"Pun Professor\",\"Elementalist\",\"Fateless\",\"Breaking Down Barriers\",\"Stormbound\",\"Done\",\"Fight The Powah!\",\"That\"],\"HeartsTM\":[\"Pun Professor\",\"Clannad\",\"Anime Club: Year 2\",\"Seasonal Stream: Winter 2019\",\"Hula Hula!\",\"Team Tsubasa\",\"Team Kirika\",\"Team Elfnein\",\"Symphogear\",\"Elementalist\",\"Seasonal Stream: Spring 2019\",\"Seafarer\",\"Luck 100\",\"Fateless\",\"My Own Rakugo\",\"Oh My Friends\",\"Team Nozomi\",\"Team Umi\",\"Team Rin\",\"I Love Lives! \",\"Breaking Down Barriers\",\"Stormbound\",\"Done\",\"Fight The Powah!\",\"Grand Slam\",\"Return To Sender\",\"Remember, Remember...\",\"That\"],\"NinjaPoes\":[\"Clannad\",\"Kurenai\",\"Anime Club: Year 2\",\"Team Tsubasa\",\"Team Elfnein\",\"Symphogear\",\"Elementalist\",\"Seafarer\",\"Luck 100\",\"Fateless\",\"My Own Rakugo\",\"Oh My Friends\",\"Team Nico\",\"Team Rin\",\"I Love Lives! \",\"Pun Professor\",\"Stormbound\"],\"Fox_tart\":[\"Clannad\",\"Seasonal Stream: Winter 2019\",\"Seasonal Stream: Spring 2019\",\"Seafarer\",\"Luck 100\",\"My Own Rakugo\",\"Breaking Down Barriers\",\"Stormbound\",\"Done\",\"Remember, Remember...\"],\"Ivvl\":[\"Clannad\",\"Kurenai\",\"Pun Professor\",\"Team Kirika\",\"Symphogear\",\"Elementalist\",\"Seafarer\",\"Luck 100\",\"Fateless\",\"My Own Rakugo\",\"Team Rin\",\"Team Nico\",\"I Love Lives! \",\"Breaking Down Barriers\",\"Fight The Powah!\",\"Done\",\"Grand Slam\",\"Remember, Remember...\"],\"Senia\":[\"Clannad\",\"Kurenai\",\"Team Hibiki\",\"Symphogear\",\"Elementalist\",\"Seafarer\",\"Luck 100\",\"Fateless\",\"My Own Rakugo\",\"Oh My Friends\",\"Team Nico\",\"I Love Lives! \",\"Breaking Down Barriers\",\"Stormbound\",\"Done\",\"Fight The Powah!\",\"Pun Professor\",\"Grand Slam\",\"Return To Sender\",\"Remember, Remember...\",\"That\"],\"Triene-Greenfort\":[\"Clannad\",\"Elementalist\",\"Oh My Friends\"],\"fiach\":[\"Clannad\",\"Hula Hula!\",\"Team Kanade\",\"Symphogear\",\"Fateless\",\"Oh My Friends\",\"Breaking Down Barriers\"],\"Bluestar\":[\"Seasonal Stream: Winter 2019\",\"Pun Professor\"],\"Genxun\":[\"Seasonal Stream: Winter 2019\",\"Symphogear\",\"Seafarer\",\"Oh My Friends\",\"Stormbound\",\"That\"],\"YukiAly\":[\"Seasonal Stream: Winter 2019\",\"Kurenai\",\"Team Tsubasa\",\"Team Maria\",\"Seafarer\",\"My Own Rakugo\",\"Team Umi\",\"Done\"],\"DefinitelyNotJohnny\":[\"Seasonal Stream: Winter 2019\"],\"Takeda\":[\"Anime Club: Year 2\",\"Kurenai\",\"Pun Professor\",\"Team Chris\",\"Symphogear\",\"Elementalist\",\"Fateless\",\"My Own Rakugo\",\"Oh My Friends\",\"Team Umi\",\"Team Rin\",\"I Love Lives! \",\"Return To Sender\"],\"ScrewySqrl\":[\"Kurenai\",\"Anime Club: Year 2\",\"Team Miku\",\"Symphogear\",\"Seafarer\",\"Luck 100\",\"My Own Rakugo\",\"Oh My Friends\",\"Team Maki\",\"I Love Lives! \",\"Breaking Down Barriers\",\"Stormbound\",\"Fight The Powah!\",\"Grand Slam\",\"Return To Sender\"],\"BlitZZ\":[\"Kurenai\",\"Seafarer\",\"Fateless\",\"My Own Rakugo\",\"Team Kotori\",\"Team Rin\",\"I Love Lives! \",\"Breaking Down Barriers\",\"Stormbound\",\"Fight The Powah!\",\"Grand Slam\"],\"erubas\":[\"Kurenai\",\"Seasonal Stream: Spring 2019\",\"My Own Rakugo\",\"Oh My Friends\",\"Team Rin\",\"I Love Lives! \"],\"Mareepy\":[\"Kurenai\",\"Anime Club: Year 2\",\"Symphogear\",\"Seafarer\",\"Fateless\"],\"Mayu_Loli\":[\"Kurenai\",\"Hula Hula!\",\"Team Hibiki\",\"Team Chris\",\"Seafarer\",\"I Love Lives! \",\"Done\"],\"MisterLister\":[\"Kurenai\",\"Pun Professor\",\"Elementalist\",\"Fateless\",\"Team Nico\",\"I Love Lives! \",\"Stormbound\",\"Fight The Powah!\"],\"SomeBloke\":[\"Kurenai\",\"Team Chris\",\"Team Kirika\",\"Done\",\"Team Maria\",\"Team Elfnein\",\"Symphogear\",\"My Own Rakugo\",\"Team Maki\",\"I Love Lives! \",\"Pun Professor\",\"Breaking Down Barriers\",\"Fight The Powah!\",\"Grand Slam\"],\"Tommeow\":[\"Kurenai\",\"Elementalist\"],\"Urizithar\":[\"Kurenai\",\"Team Chris\",\"Team Kirika\",\"Symphogear\",\"Seasonal Stream: Spring 2019\",\"Luck 100\",\"Fateless\",\"Seafarer\",\"My Own Rakugo\",\"Breaking Down Barriers\",\"Done\",\"Fight The Powah!\",\"Pun Professor\"],\"Bowl\":[\"Kurenai\",\"Symphogear\"],\"Ningen\":[\"Hula Hula!\",\"Team Maria\",\"Symphogear\",\"Team Nozomi\",\"Team Kotori\",\"I Love Lives! \",\"Stormbound\",\"Done\",\"Fight The Powah!\",\"Grand Slam\",\"Pun Professor\"],\"Bashically\":[\"Team Hibiki\"],\"MrRound\":[\"Team Hibiki\",\"Symphogear\",\"Team Miku\",\"Team Kirika\",\"Seafarer\",\"Luck 100\",\"My Own Rakugo\",\"Team Maki\",\"I Love Lives! \",\"Breaking Down Barriers\",\"Pun Professor\",\"Stormbound\",\"Done\",\"Fight The Powah!\",\"Return To Sender\"],\"Psyrhos\":[\"Team Chris\",\"Symphogear\",\"Seafarer\",\"Team Umi\",\"I Love Lives! \",\"Breaking Down Barriers\",\"Stormbound\",\"Pun Professor\",\"Grand Slam\",\"Return To Sender\"],\"Ryder-FWJ\":[\"Symphogear\"],\"BashMartin\":[\"Team Hibiki\"],\"alkestro\":[\"Elementalist\"],\"Guinner\":[\"Elementalist\"],\"JPGer\":[\"Elementalist\"],\"King_Babar_III\":[\"Elementalist\"],\"Rento9\":[\"Elementalist\",\"Luck 100\",\"Done\"],\"Demzou\":[\"Seasonal Stream: Spring 2019\",\"Done\"],\"dorjin\":[\"Seasonal Stream: Spring 2019\",\"Seafarer\",\"Luck 100\",\"Fateless\",\"Team Nozomi\",\"I Love Lives! \",\"Breaking Down Barriers\",\"Stormbound\",\"Done\",\"Fight The Powah!\",\"Grand Slam\",\"Return To Sender\",\"Remember, Remember...\"],\"Xenoreaper\":[\"Seasonal Stream: Spring 2019\"],\"nullgat\":[\"Seasonal Stream: Spring 2019\"],\"dreamy\":[\"Seafarer\",\"Luck 100\",\"Fateless\",\"Team Kotori\",\"I Love Lives! \",\"Breaking Down Barriers\",\"Stormbound\",\"Fight The Powah!\",\"Grand Slam\"],\"Torradinhas\":[\"Seafarer\",\"My Own Rakugo\",\"Stormbound\",\"Grand Slam\"],\"CaptainImperium\":[\"Seafarer\"],\"erubas_\":[\"Seafarer\"],\"Darthturtle\":[\"Team Chris\",\"Team Nico\",\"I Love Lives! \",\"Breaking Down Barriers\"],\"science\":[\"Fateless\",\"Oh My Friends\",\"Done\"],\"xIquincyIx\":[\"Fateless\",\"My Own Rakugo\",\"Oh My Friends\",\"I Love Lives! \",\"Breaking Down Barriers\",\"Pun Professor\",\"Stormbound\",\"Fight The Powah!\"],\"Jert\":[\"Fateless\"],\"Jertme\":[\"My Own Rakugo\",\"Fight The Powah!\",\"Pun Professor\"],\"yungcaleb\":[\"My Own Rakugo\"],\"ZeroLoveless\":[\"My Own Rakugo\"],\"Elephant-chan\":[\"My Own Rakugo\"],\"RyuBae\":[\"Oh My Friends\"],\"Rickuo_\":[\"Oh My Friends\"],\"bLOOMGINTON33\":[\"Team Hanayo\",\"I Love Lives! \",\"Breaking Down Barriers\",\"Fight The Powah!\",\"Return To Sender\"],\"DatBisa\":[\"Biggest Whiner\",\"I Love Lives! \",\"Team Maki\",\"Breaking Down Barriers\",\"Grand Slam\",\"Return To Sender\"],\"UserMagician\":[\"Breaking Down Barriers\",\"Stormbound\",\"Fight The Powah!\"],\"Aballion\":[\"Done\"],\"CupoDylan\":[\"Done\",\"Fight The Powah!\",\"Grand Slam\"],\"Eli_HeavyWaterBoi\":[\"Done\"],\"L1WE\":[\"Done\"],\"LuqVader\":[\"Done\"],\"Reboot\":[\"Done\"],\"SkySKY\":[\"Done\",\"Return To Sender\"],\"that_nuked_burger\":[\"Done\",\"Remember, Remember...\"],\"Phosflyphyllite\":[\"Fight The Powah!\"],\"Passsiveagressive\":[\"Fight The Powah!\"],\"cuckmaster1488\":[\"Remember, Remember...\"],\"kingofhaze\":[\"Remember, Remember...\"],\"tibbs2\":[\"Remember, Remember...\"],\"troyamonga\":[\"Remember, Remember...\"],\"Hbz\":[\"Remember, Remember...\"]}";
var countdownText1 = "Club";
var countdownText2 = "Movie";
var countdownText3 = "Korra";
var countdownText4 = "intermission";
var countdownText5 = "Geah";
var nicoEffectOnControl = "true";
var loginTime = "false";
var loginTimeKey = "39909";
var loginExport = "true";
//-----------------------------------------------------------------------------------------------------------------------------------
	var bgm1volume = .5;
	var bgm2volume = .5;
	var bgm3volume = .5;
	var bgm4volume = .5;
	var bgm5volume = .5;
	var event1Volume = .8;
	var nicoEffectOn = (nicoEffectOnControl == "true" && (localStorage[CHANNEL.name + '-nico-mode'] == "true" || localStorage[CHANNEL.name + '-nico-mode'] == null)) ? true : false;
	if (!bggimmick) {
		var bggimmick = false;
	}	
	var bggimmickurl = "https://media.discordapp.net/attachments/514955949136674856/591448425200091166/gZgG9XH.jpg.png";
	var bggimmicktimeout = 16500;
	var voteskipImg = 'https://cdn.discordapp.com/attachments/409829343263719427/511380810637770752/Ban_circle_font_awesome-red.svg.png';
	var voteskipFinalImg = 'https://media.discordapp.net/attachments/409829343263719427/513465042797068341/1-2-fail-stamp-picture-thumb.png';
	var voteskipFinalUrl = 'https://cdn.discordapp.com/attachments/409829343263719427/513476476289548318/Judges_Gavel-SoundBible.com-1321455227.wav';
	var emoteTable = "false";
	var event1timeout;
	var penguinTimeout = 19000;
	var emoteArray = [];
	var selectedPopover;
	var handlerKeydown;
	var date_utc1 = Date.UTC(countdown_utc.year, countdown_utc.month - 1, countdown_utc.day, countdown_utc.hour, countdown_utc.minute, countdown_utc.second);
	var date_utc2 = Date.UTC(countdown_utc2.year2, countdown_utc2.month2 - 1, countdown_utc2.day2, countdown_utc2.hour2, countdown_utc2.minute2, countdown_utc2.second2);
	var date_utc3 = Date.UTC(countdown_utc3.year3, countdown_utc3.month3 - 1, countdown_utc3.day3, countdown_utc3.hour3, countdown_utc3.minute3, countdown_utc3.second3);
	var date_utc4 = Date.UTC(countdown_utc4.year4, countdown_utc4.month4 - 1, countdown_utc4.day4, countdown_utc4.hour4, countdown_utc4.minute4, countdown_utc4.second4);
	var date_utc5 = Date.UTC(countdown_utc5.year5, countdown_utc5.month5 - 1, countdown_utc5.day5, countdown_utc5.hour5, countdown_utc5.minute5, countdown_utc5.second5);
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
	var videoListMaster = [];
	var videoListBatch1 = [];
	var sheetIndex = 10;
	if (!mutei) {
		var mutei;
	}
	
	var recordMessage = "true";
	var msgText = '';
	var userImgSend = '';
	var msg = {};
	var imgTable, soundTable;
	var avatarFloat = true;
	var timeLogger, chatlineElem, queueList, emoteList, countDown, countDownTimer1, countDown2, countDownTimer2, countDown3, countDownTimer3, countDown4, countDownTimer4, countDown5, countDownTimer5, collapseArrow, collapseArrow2, picklist, achievementMatch, msgLookup, imgLookup, soundLookup, emoteAudioList;

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
		url: "https://rawcdn.githack.com/gimmic234/cytube_backup/75a1a30eff9f52498e8d336eda0ae77608d65578/current-ext.js",
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