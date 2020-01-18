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
	var achievementListArchieve = "{\"gimmic\":[\"1\",\"5\",\"2\",\"6\",\"7\",\"8\",\"10\",\"18\",\"9\",\"21\",\"22\",\"24\",\"25\",\"26\",\"36\",\"30\",\"37\",\"40\",19,\"41\",\"42\",\"43\",\"44\",\"45\",\"46\"],\"Zinzoo\":[\"1\",\"2\",\"6\",\"7\",\"8\",\"11\",\"14\",\"9\",\"21\",\"22\",\"24\",\"25\",\"26\",\"30\",\"37\",\"39\",\"40\",19,\"41\",\"42\",\"43\",\"45\",\"46\",\"50\"],\"raccomunk\":[\"1\",\"6\",\"8\",\"2\",\"12\",\"14\",\"9\",\"21\",\"22\",\"24\",\"25\",\"26\",\"36\",\"28\",\"37\",\"39\",\"40\",\"41\",\"42\",\"43\",\"50\"],\"Madoq\":[\"1\",\"6\",\"8\",\"10\",\"11\",\"13\",\"9\",\"22\",\"34\",\"37\",19,\"41\",\"48\"],\"mrmooshe\":[\"1\",\"6\",\"16\",\"17\",\"20\",\"9\",\"36\",\"37\",\"28\",\"39\",\"41\",\"42\"],\"PhenomSage\":[\"3\",\"6\",\"8\",\"12\",\"17\",\"9\",\"4\",\"21\",\"25\",\"39\",\"40\",19,\"41\",\"45\",\"46\"],\"HeartsTM\":[\"4\",\"6\",\"2\",\"7\",\"10\",\"11\",\"15\",\"20\",\"9\",\"21\",\"22\",\"24\",\"25\",\"26\",\"36\",\"29\",\"27\",\"28\",\"37\",\"39\",\"40\",19,\"41\",\"42\",\"43\",\"44\",\"45\",\"46\",\"49\"],\"NinjaPoes\":[\"6\",\"8\",\"2\",\"11\",\"20\",\"9\",\"21\",\"22\",\"24\",\"25\",\"26\",\"36\",\"30\",\"28\",\"37\",\"4\",\"40\",\"45\",\"46\",\"50\",\"48\"],\"Fox_tart\":[\"6\",\"7\",\"22\",\"24\",\"26\",\"39\",\"40\",19,\"44\",\"45\"],\"Ivvl\":[\"6\",\"8\",\"4\",\"15\",\"9\",\"21\",\"22\",\"24\",\"25\",\"26\",\"28\",\"30\",\"37\",\"39\",\"41\",19,\"42\",\"44\"],\"Senia\":[\"6\",\"8\",\"13\",\"9\",\"21\",\"22\",\"24\",\"25\",\"26\",\"36\",\"30\",\"37\",\"39\",\"40\",19,\"41\",\"4\",\"42\",\"43\",\"44\",\"50\"],\"Triene-Greenfort\":[\"6\",\"21\",\"36\",\"46\"],\"fiach\":[\"6\",\"10\",\"18\",\"9\",\"25\",\"36\",\"39\"],\"Bluestar\":[\"7\",\"4\"],\"Genxun\":[\"7\",\"9\",\"22\",\"36\",\"40\",\"45\"],\"YukiAly\":[\"7\",\"8\",\"11\",\"16\",\"22\",\"26\",\"27\",19],\"DefinitelyNotJohnny\":[\"7\"],\"Takeda\":[\"2\",\"8\",\"4\",\"12\",\"9\",\"21\",\"25\",\"26\",\"36\",\"27\",\"28\",\"37\",\"43\",\"45\",\"46\"],\"ScrewySqrl\":[\"8\",\"2\",\"17\",\"9\",\"22\",\"24\",\"26\",\"36\",\"31\",\"37\",\"39\",\"40\",\"41\",\"42\",\"43\",\"48\"],\"BlitZZ\":[\"8\",\"22\",\"25\",\"26\",\"32\",\"28\",\"37\",\"39\",\"40\",\"41\",\"42\"],\"erubas\":[\"8\",\"26\",\"36\",\"28\",\"37\",\"46\"],\"Mareepy\":[\"8\",\"2\",\"9\",\"22\",\"25\",\"45\"],\"Mayu_Loli\":[\"8\",\"10\",\"13\",\"12\",\"22\",\"37\",19],\"MisterLister\":[\"8\",\"4\",\"21\",\"25\",\"30\",\"37\",\"40\",\"41\",\"45\",\"46\"],\"SomeBloke\":[\"8\",\"12\",\"15\",19,\"16\",\"20\",\"9\",\"26\",\"31\",\"37\",\"4\",\"39\",\"41\",\"42\"],\"Tommeow\":[\"8\",\"21\"],\"Urizithar\":[\"8\",\"12\",\"15\",\"9\",\"24\",\"25\",\"22\",\"26\",\"39\",19,\"41\",\"4\",\"46\",\"50\",\"48\"],\"Bowl\":[\"8\",\"9\"],\"Ningen\":[\"10\",\"16\",\"9\",\"29\",\"32\",\"37\",\"40\",19,\"41\",\"42\",\"4\",\"46\"],\"Bashically\":[\"13\"],\"MrRound\":[\"13\",\"9\",\"17\",\"15\",\"22\",\"24\",\"26\",\"31\",\"37\",\"39\",\"4\",\"40\",19,\"41\",\"43\",\"45\",\"46\",\"48\"],\"Psyrhos\":[\"12\",\"9\",\"22\",\"27\",\"37\",\"39\",\"40\",\"4\",\"42\",\"43\"],\"Ryder-FWJ\":[\"9\"],\"BashMartin\":[\"13\"],\"alkestro\":[\"21\"],\"Guinner\":[\"21\"],\"JPGer\":[\"21\"],\"King_Babar_III\":[\"21\"],\"Rento9\":[\"21\",\"24\",19,\"50\"],\"Demzou\":[19],\"dorjin\":[\"22\",\"24\",\"25\",\"29\",\"37\",\"39\",\"40\",19,\"41\",\"42\",\"43\",\"44\"],\"nullgat\":[\"46\"],\"dreamy\":[\"22\",\"24\",\"25\",\"32\",\"37\",\"39\",\"40\",\"41\",\"42\",\"45\",\"46\",\"50\"],\"Torradinhas\":[\"22\",\"26\",\"40\",\"42\"],\"CaptainImperium\":[\"22\"],\"erubas_\":[\"22\"],\"Darthturtle\":[\"12\",\"30\",\"37\",\"39\",\"45\"],\"science\":[\"25\",\"36\",19,\"46\"],\"xIquincyIx\":[\"25\",\"26\",\"36\",\"37\",\"39\",\"4\",\"40\",\"41\",\"46\"],\"Jert\":[\"25\"],\"Jertme\":[\"26\",\"41\",\"4\"],\"yungcaleb\":[\"26\"],\"ZeroLoveless\":[\"26\"],\"Elephant-chan\":[\"26\"],\"RyuBae\":[\"36\"],\"Rickuo_\":[\"36\"],\"bLOOMGINTON33\":[\"34\",\"37\",\"39\",\"41\",\"43\",\"45\"],\"DatBisa\":[\"38\",\"37\",\"31\",\"39\",\"42\",\"43\",\"45\"],\"UserMagician\":[\"39\",\"40\",\"41\",\"48\"],\"Aballion\":[19],\"CupoDylan\":[19,\"41\",\"42\"],\"Eli_HeavyWaterBoi\":[19],\"L1WE\":[19],\"LuqVader\":[19,\"47\"],\"Reboot\":[19],\"SkySKY\":[19,\"43\"],\"that_nuked_burger\":[19,\"44\"],\"Phosflyphyllite\":[\"41\",\"46\"],\"Passsiveagressive\":[\"41\"],\"cuckmaster1488\":[\"44\"],\"kingofhaze\":[\"44\"],\"tibbs2\":[\"44\"],\"troyamonga\":[\"44\"],\"Hbz\":[\"44\"],\"LST\":[\"49\"]}";
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
	var ticketList;
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
	var achievementListMerged;