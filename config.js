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
	var achievementListArchieve = "{\"gimmic\":[\"first blood\",\"Cytube Wizard\",\"Anime Club: Year 2\",\"Clannad\",\"Seasonal Stream: Winter 2019\",\"Kurenai\",\"Hula Hula!\",\"Team Kanade\",\"Symphogear\",\"Elementalist\",\"Seasonal Stream: Spring 2019\",\"Seafarer\",\"Luck 100\",\"Fateless\",\"My Own Rakugo\",\"Oh My Friends\",\"Team Nico\",\"I Love Lives! \",\"Stormbound\",\"Done\",\"Fight The Powah!\",\"Grand Slam\",\"Return To Sender\",\"Remember, Remember...\",\"That\'s All For Today!\",\"Absolute Legend\"],\"Zinzoo\":[\"first blood\",\"Anime Club: Year 2\",\"Clannad\",\"Seasonal Stream: Winter 2019\",\"Kurenai\",\"Team Tsubasa\",\"Team Shirabe\",\"Symphogear\",\"Elementalist\",\"Seasonal Stream: Spring 2019\",\"Seafarer\",\"Luck 100\",\"Fateless\",\"My Own Rakugo\",\"Team Nico\",\"I Love Lives! \",\"Breaking Down Barriers\",\"Stormbound\",\"Done\",\"Fight The Powah!\",\"Grand Slam\",\"Return To Sender\",\"That\'s All For Today!\",\"Absolute Legend\",\"Team Yui\"],\"raccomunk\":[\"first blood\",\"Clannad\",\"Kurenai\",\"Anime Club: Year 2\",\"Team Chris\",\"Team Shirabe\",\"Symphogear\",\"Elementalist\",\"Seasonal Stream: Spring 2019\",\"Seafarer\",\"Luck 100\",\"Fateless\",\"My Own Rakugo\",\"Oh My Friends\",\"Team Rin\",\"I Love Lives! \",\"Breaking Down Barriers\",\"Stormbound\",\"Fight The Powah!\",\"Grand Slam\",\"Return To Sender\",\"Team Yui\"],\"Madoq\":[\"first blood\",\"Clannad\",\"Kurenai\",\"Hula Hula!\",\"Team Tsubasa\",\"Team Hibiki\",\"Symphogear\",\"Seasonal Stream: Spring 2019\",\"Seafarer\",\"Team Hanayo\",\"I Love Lives! \",\"Done\",\"Fight The Powah!\",\"Team Mio\"],\"mrmooshe\":[\"first blood\",\"Clannad\",\"Team Maria\",\"Team Miku\",\"Team Elfnein\",\"Symphogear\",\"Oh My Friends\",\"I Love Lives! \",\"Team Rin\",\"Breaking Down Barriers\",\"Fight The Powah!\",\"Grand Slam\"],\"PhenomSage\":[\"Supreme Ruler\",\"Clannad\",\"Kurenai\",\"Team Chris\",\"Team Miku\",\"Symphogear\",\"Pun Professor\",\"Elementalist\",\"Fateless\",\"Breaking Down Barriers\",\"Stormbound\",\"Done\",\"Fight The Powah!\",\"That\'s All For Today!\",\"Absolute Legend\"],\"HeartsTM\":[\"Pun Professor\",\"Clannad\",\"Anime Club: Year 2\",\"Seasonal Stream: Winter 2019\",\"Hula Hula!\",\"Team Tsubasa\",\"Team Kirika\",\"Team Elfnein\",\"Symphogear\",\"Elementalist\",\"Seasonal Stream: Spring 2019\",\"Seafarer\",\"Luck 100\",\"Fateless\",\"My Own Rakugo\",\"Oh My Friends\",\"Team Nozomi\",\"Team Umi\",\"Team Rin\",\"I Love Lives! \",\"Breaking Down Barriers\",\"Stormbound\",\"Done\",\"Fight The Powah!\",\"Grand Slam\",\"Return To Sender\",\"Remember, Remember...\",\"That\'s All For Today!\",\"Absolute Legend\",\"Team Ritsu\"],\"NinjaPoes\":[\"Clannad\",\"Kurenai\",\"Anime Club: Year 2\",\"Team Tsubasa\",\"Team Elfnein\",\"Symphogear\",\"Elementalist\",\"Seafarer\",\"Luck 100\",\"Fateless\",\"My Own Rakugo\",\"Oh My Friends\",\"Team Nico\",\"Team Rin\",\"I Love Lives! \",\"Pun Professor\",\"Stormbound\",\"That\'s All For Today!\",\"Absolute Legend\",\"Team Yui\",\"Team Mio\"],\"Fox_tart\":[\"Clannad\",\"Seasonal Stream: Winter 2019\",\"Seasonal Stream: Spring 2019\",\"Seafarer\",\"Luck 100\",\"My Own Rakugo\",\"Breaking Down Barriers\",\"Stormbound\",\"Done\",\"Remember, Remember...\",\"That\'s All For Today!\"],\"Ivvl\":[\"Clannad\",\"Kurenai\",\"Pun Professor\",\"Team Kirika\",\"Symphogear\",\"Elementalist\",\"Seafarer\",\"Luck 100\",\"Fateless\",\"My Own Rakugo\",\"Team Rin\",\"Team Nico\",\"I Love Lives! \",\"Breaking Down Barriers\",\"Fight The Powah!\",\"Done\",\"Grand Slam\",\"Remember, Remember...\"],\"Senia\":[\"Clannad\",\"Kurenai\",\"Team Hibiki\",\"Symphogear\",\"Elementalist\",\"Seafarer\",\"Luck 100\",\"Fateless\",\"My Own Rakugo\",\"Oh My Friends\",\"Team Nico\",\"I Love Lives! \",\"Breaking Down Barriers\",\"Stormbound\",\"Done\",\"Fight The Powah!\",\"Pun Professor\",\"Grand Slam\",\"Return To Sender\",\"Remember, Remember...\",\"Team Yui\"],\"Triene-Greenfort\":[\"Clannad\",\"Elementalist\",\"Oh My Friends\",\"Absolute Legend\"],\"fiach\":[\"Clannad\",\"Hula Hula!\",\"Team Kanade\",\"Symphogear\",\"Fateless\",\"Oh My Friends\",\"Breaking Down Barriers\"],\"Bluestar\":[\"Seasonal Stream: Winter 2019\",\"Pun Professor\"],\"Genxun\":[\"Seasonal Stream: Winter 2019\",\"Symphogear\",\"Seafarer\",\"Oh My Friends\",\"Stormbound\",\"That\'s All For Today!\"],\"YukiAly\":[\"Seasonal Stream: Winter 2019\",\"Kurenai\",\"Team Tsubasa\",\"Team Maria\",\"Seafarer\",\"My Own Rakugo\",\"Team Umi\",\"Done\"],\"DefinitelyNotJohnny\":[\"Seasonal Stream: Winter 2019\"],\"Takeda\":[\"Anime Club: Year 2\",\"Kurenai\",\"Pun Professor\",\"Team Chris\",\"Symphogear\",\"Elementalist\",\"Fateless\",\"My Own Rakugo\",\"Oh My Friends\",\"Team Umi\",\"Team Rin\",\"I Love Lives! \",\"Return To Sender\",\"That\'s All For Today!\",\"Absolute Legend\"],\"ScrewySqrl\":[\"Kurenai\",\"Anime Club: Year 2\",\"Team Miku\",\"Symphogear\",\"Seafarer\",\"Luck 100\",\"My Own Rakugo\",\"Oh My Friends\",\"Team Maki\",\"I Love Lives! \",\"Breaking Down Barriers\",\"Stormbound\",\"Fight The Powah!\",\"Grand Slam\",\"Return To Sender\",\"Team Mio\"],\"BlitZZ\":[\"Kurenai\",\"Seafarer\",\"Fateless\",\"My Own Rakugo\",\"Team Kotori\",\"Team Rin\",\"I Love Lives! \",\"Breaking Down Barriers\",\"Stormbound\",\"Fight The Powah!\",\"Grand Slam\"],\"erubas\":[\"Kurenai\",\"Seasonal Stream: Spring 2019\",\"My Own Rakugo\",\"Oh My Friends\",\"Team Rin\",\"I Love Lives! \",\"Absolute Legend\"],\"Mareepy\":[\"Kurenai\",\"Anime Club: Year 2\",\"Symphogear\",\"Seafarer\",\"Fateless\",\"That\'s All For Today!\"],\"Mayu_Loli\":[\"Kurenai\",\"Hula Hula!\",\"Team Hibiki\",\"Team Chris\",\"Seafarer\",\"I Love Lives! \",\"Done\"],\"MisterLister\":[\"Kurenai\",\"Pun Professor\",\"Elementalist\",\"Fateless\",\"Team Nico\",\"I Love Lives! \",\"Stormbound\",\"Fight The Powah!\",\"That\'s All For Today!\",\"Absolute Legend\"],\"SomeBloke\":[\"Kurenai\",\"Team Chris\",\"Team Kirika\",\"Done\",\"Team Maria\",\"Team Elfnein\",\"Symphogear\",\"My Own Rakugo\",\"Team Maki\",\"I Love Lives! \",\"Pun Professor\",\"Breaking Down Barriers\",\"Fight The Powah!\",\"Grand Slam\"],\"Tommeow\":[\"Kurenai\",\"Elementalist\"],\"Urizithar\":[\"Kurenai\",\"Team Chris\",\"Team Kirika\",\"Symphogear\",\"Seasonal Stream: Spring 2019\",\"Luck 100\",\"Fateless\",\"Seafarer\",\"My Own Rakugo\",\"Breaking Down Barriers\",\"Done\",\"Fight The Powah!\",\"Pun Professor\",\"Absolute Legend\",\"Team Yui\",\"Team Mio\"],\"Bowl\":[\"Kurenai\",\"Symphogear\"],\"Ningen\":[\"Hula Hula!\",\"Team Maria\",\"Symphogear\",\"Team Nozomi\",\"Team Kotori\",\"I Love Lives! \",\"Stormbound\",\"Done\",\"Fight The Powah!\",\"Grand Slam\",\"Pun Professor\",\"Absolute Legend\"],\"Bashically\":[\"Team Hibiki\"],\"MrRound\":[\"Team Hibiki\",\"Symphogear\",\"Team Miku\",\"Team Kirika\",\"Seafarer\",\"Luck 100\",\"My Own Rakugo\",\"Team Maki\",\"I Love Lives! \",\"Breaking Down Barriers\",\"Pun Professor\",\"Stormbound\",\"Done\",\"Fight The Powah!\",\"Return To Sender\",\"That\'s All For Today!\",\"Absolute Legend\",\"Team Mio\"],\"Psyrhos\":[\"Team Chris\",\"Symphogear\",\"Seafarer\",\"Team Umi\",\"I Love Lives! \",\"Breaking Down Barriers\",\"Stormbound\",\"Pun Professor\",\"Grand Slam\",\"Return To Sender\"],\"Ryder-FWJ\":[\"Symphogear\"],\"BashMartin\":[\"Team Hibiki\"],\"alkestro\":[\"Elementalist\"],\"Guinner\":[\"Elementalist\"],\"JPGer\":[\"Elementalist\"],\"King_Babar_III\":[\"Elementalist\"],\"Rento9\":[\"Elementalist\",\"Luck 100\",\"Done\",\"Team Yui\"],\"Demzou\":[\"Seasonal Stream: Spring 2019\",\"Done\"],\"dorjin\":[\"Seasonal Stream: Spring 2019\",\"Seafarer\",\"Luck 100\",\"Fateless\",\"Team Nozomi\",\"I Love Lives! \",\"Breaking Down Barriers\",\"Stormbound\",\"Done\",\"Fight The Powah!\",\"Grand Slam\",\"Return To Sender\",\"Remember, Remember...\"],\"Xenoreaper\":[\"Seasonal Stream: Spring 2019\"],\"nullgat\":[\"Seasonal Stream: Spring 2019\",\"Absolute Legend\"],\"dreamy\":[\"Seafarer\",\"Luck 100\",\"Fateless\",\"Team Kotori\",\"I Love Lives! \",\"Breaking Down Barriers\",\"Stormbound\",\"Fight The Powah!\",\"Grand Slam\",\"That\'s All For Today!\",\"Absolute Legend\",\"Team Yui\"],\"Torradinhas\":[\"Seafarer\",\"My Own Rakugo\",\"Stormbound\",\"Grand Slam\"],\"CaptainImperium\":[\"Seafarer\"],\"erubas_\":[\"Seafarer\"],\"Darthturtle\":[\"Team Chris\",\"Team Nico\",\"I Love Lives! \",\"Breaking Down Barriers\",\"That\'s All For Today!\"],\"science\":[\"Fateless\",\"Oh My Friends\",\"Done\",\"Absolute Legend\"],\"xIquincyIx\":[\"Fateless\",\"My Own Rakugo\",\"Oh My Friends\",\"I Love Lives! \",\"Breaking Down Barriers\",\"Pun Professor\",\"Stormbound\",\"Fight The Powah!\",\"Absolute Legend\"],\"Jert\":[\"Fateless\"],\"Jertme\":[\"My Own Rakugo\",\"Fight The Powah!\",\"Pun Professor\"],\"yungcaleb\":[\"My Own Rakugo\"],\"ZeroLoveless\":[\"My Own Rakugo\"],\"Elephant-chan\":[\"My Own Rakugo\"],\"RyuBae\":[\"Oh My Friends\"],\"Rickuo_\":[\"Oh My Friends\"],\"bLOOMGINTON33\":[\"Team Hanayo\",\"I Love Lives! \",\"Breaking Down Barriers\",\"Fight The Powah!\",\"Return To Sender\",\"That\'s All For Today!\"],\"DatBisa\":[\"Biggest Whiner\",\"I Love Lives! \",\"Team Maki\",\"Breaking Down Barriers\",\"Grand Slam\",\"Return To Sender\",\"That\'s All For Today!\"],\"UserMagician\":[\"Breaking Down Barriers\",\"Stormbound\",\"Fight The Powah!\",\"Team Mio\"],\"Aballion\":[\"Done\"],\"CupoDylan\":[\"Done\",\"Fight The Powah!\",\"Grand Slam\"],\"Eli_HeavyWaterBoi\":[\"Done\"],\"L1WE\":[\"Done\"],\"LuqVader\":[\"Done\",\"Team Mugi\"],\"Reboot\":[\"Done\"],\"SkySKY\":[\"Done\",\"Return To Sender\"],\"that_nuked_burger\":[\"Done\",\"Remember, Remember...\"],\"Phosflyphyllite\":[\"Fight The Powah!\",\"Absolute Legend\"],\"Passsiveagressive\":[\"Fight The Powah!\"],\"cuckmaster1488\":[\"Remember, Remember...\"],\"kingofhaze\":[\"Remember, Remember...\"],\"tibbs2\":[\"Remember, Remember...\"],\"troyamonga\":[\"Remember, Remember...\"],\"Hbz\":[\"Remember, Remember...\"],\"LST\":[\"Team Ritsu\"]}";
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