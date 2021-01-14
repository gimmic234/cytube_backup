/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/* ----- THEME CONFIGURATION ----- */

/* ----- custom channel options ----- */

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

UI_ChannelAnnouncement = 0;	
ChannelAnnouncement_Title = '';
ChannelAnnouncement_HTML = '<center>Launched A new channel!</center>';

UI_ChannelName = 1;		
ChannelName_Caption = 'Southpark';

UI_Discord = 1;	
Discord_NAME = 'Discord.gg/fwadWd9';
Discord_URL = 'http://discord.gg/fwadWd9';

UI_Favicon = 1;			
Favicon_URL = 'https://lh3.googleusercontent.com/UEy_fI47EiOnT8957PPRrnggiojAo4bjfva7dCvxgQA31wlqZB0RQkNlQhh2LZTPkmhUZaWZht7SzqntDm2NGM0JcX2mbo9nCzNMiXnR6Y8CvjBub7qKezgbSzHWBdAsiTWP5wsj-JfdMALe7yARz9oTZCwqO89NA8MyUOiTq7Ns6w9moanDlb7u1McxFkCjG-mvNIHmerEuDCjiyT77AgFTSIOML7ae5UDUyv5-Djl1vSszTE8SV7fLTg3pIkd1s6SoKQR2MXkFX5-feU9MYN65gUOzLhnqoJy5XaGzXxuhcRGFdLCNTp4UPhwIFsZOFbnAnUkxC8LjxNyP_uZg5Vqe8gR5D_ImPW_q0UwKShBI6Ft2lPSobo-z9ql68RJSIwE2FqypN3SoCPXT6hq6YNDZBphVOrnZEqWeWYU2t92-cx0jzkLqGCGGyuyF2Dc0iOPke0AAWcnBEKTpnwrUq1me0deXrc7DRXzEYrbO_nE6Sju_0jWZQpiVxv0TdrKxRvXO3m2TyBGkUqg8AQ612LyeNSY88F3WDtiEhI4HAnknz98Xqng8yKDDASNROnwoKmg5Nn25IOxBAA6htIWAyOP7ZmpSI9Hs7_p7-FKzm7tPgd7zkKXq5kfNcHvUhQwSHgDrIV9sfPcjDcD2PA2T4pODBbutRCg=w100-h129-no';

/* ----- enable a channel guide ----- */
/* ----- requires themoviedb.org account----- */
var moviedbshow = 0;
var moviedbkey = '6459fcd631e69317f25758b82f77615d';
var moviedblist = '7060691';

/* ----- video player settings ----- */
var Poster_URL= 'https://i.postimg.cc/kgRDV7ck/yncttk3.gif';

/* ----- channel backgrounds ----- */
var BG_Dimmed = 1;
var BGPics = ['https://i.ibb.co/jHYfyzc/wallhaven-4olro7.jpg', 'https://i.ibb.co/K6CCgDJ/wallhaven-nmzeg9.jpg'];

/* ----- channels slider ----- */
var UI_ChannelList= 1;
var ChannelSlide1 = '//s14.postimg.cc/m3rs2y1rl/C47_MQA3.png';
var ChannelSlide1URL = 'https://cytu.be/r/southparkhd';
var ChannelSlide2 = '//s14.postimg.cc/yv5y9gqz5/w3_WPXIa.png';
var ChannelSlide2URL = 'https://cytu.be/r/seinfeldHD';
var ChannelSlide3 = '//i.postimg.cc/8CqBZg1z/simps.png';
var ChannelSlide3URL = 'https://cytu.be/r/Simpsons';
var ChannelSlide4 = '//i.postimg.cc/HsnqdW7Y/spookyshow.png';
var ChannelSlide4URL = 'https://cytu.be/r/spookykidshows';
var ChannelSlide5 = '//i.postimg.cc/HnVkSfqR/spookt.png';
var ChannelSlide5URL = 'https://cytu.be/r/spooktober';
var ChannelSlide6 = '//s14.postimg.cc/twifuuuv5/2_LB9834.png';
var ChannelSlide6URL = 'https://cytu.be/r/spookyshows';
var ChannelSlide7 = '//s14.postimg.cc/6iagj0koh/Gx_CKt_EZ.png';
var ChannelSlide7URL = 'https://cytu.be/r/buffy';
var ChannelSlide8 = '//s14.postimg.cc/arf6l60sh/Wea_Qe7_R.png';
var ChannelSlide8URL = 'https://cytu.be/r/animatedshows';
var ChannelSlide9 = '//i.postimg.cc/8c3GDCvK/SS2.png';
var ChannelSlide9URL = 'https://cytu.be/r/spookyshows2';
var ChannelSlide10 = '//s14.postimg.cc/6iagj52pt/Kzcwj_LR.png';
var ChannelSlide10URL = 'https://cytu.be/r/BillTube';
var ChannelSlide11 = '//s14.postimg.cc/c6gr9whb5/Bdr_UNQZ.png';
var ChannelSlide11URL = 'https://cytu.be/r/billcartoon';
var ChannelSlide12 = '//s14.postimg.cc/rf6onst0x/v_DJV3_Of.png';
var ChannelSlide12URL = 'https://cytu.be/r/CopsTube';
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
	'BillTube':      { active: 1, rank: -1, url: "https://cdn.jsdelivr.net/gh/BillTube/BillTube2/BillTube2.min.js",              callback: true },

};

window[CHANNEL.name].sequencePrev = window[CHANNEL.name].sequencePrev || "";
window[CHANNEL.name].sequenceState = window[CHANNEL.name].sequenceState || 0;
window[CHANNEL.name].sequenceIndex = Object.keys(window[CHANNEL.name].sequenceList)

window[CHANNEL.name].sequencerLoader = function (){
    // After first run we curry the previous modules callback
    // This is mainly used to reassign variables in modules/scripts that don't use module options
    if(window[CHANNEL.name].sequencePrev){
        setTimeout(window[CHANNEL.name].sequenceList[window[CHANNEL.name].sequencePrev].callback, 0)
        window[CHANNEL.name].sequencePrev = "";
    }

    if(window[CHANNEL.name].sequenceState >= window[CHANNEL.name].sequenceIndex.length){
        return (function(){ console.log("Xaekai's Script Sequencer: Loading Complete.") })()
    }

    var currKey = window[CHANNEL.name].sequenceIndex[window[CHANNEL.name].sequenceState];
    if(window[CHANNEL.name].sequenceState < window[CHANNEL.name].sequenceIndex.length){
        if(window[CHANNEL.name].sequenceList[currKey].active
            && window[CHANNEL.name].sequenceList[currKey].rank <= CLIENT.rank
        ){
            console.log("Xaekai's Script Sequencer: Loading " + currKey);
            window[CHANNEL.name].sequencePrev = currKey;
            window[CHANNEL.name].sequenceState++;
            $.getScript(window[CHANNEL.name].sequenceList[currKey].url, window[CHANNEL.name].sequencerLoader)
        } else {
            window[CHANNEL.name].sequenceState++;
            window[CHANNEL.name].sequencerLoader()
        }
    }
};window[CHANNEL.name].sequencerLoader()

