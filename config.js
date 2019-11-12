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
