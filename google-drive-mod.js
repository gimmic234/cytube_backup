var hasDriveUserscript = true;
    // Checked against GS_VERSION from data.js
var driveUserscriptVersion = '1.7';
var getGoogleDriveMetadata = function getVideoInfo(id, cb) {
        var url = 'https://docs.google.com/get_video_info?authuser='
                + '&docid=' + id
                + '&sle=true' 
                + '&hl=en';
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
        	var res = this;
        	if (!(res.readyState == 4 && res.status == 200)) {
        		return;
        	}
        	  try {

                    if (res.status !== 200) {
                        return cb(
                            'Google Drive request failed: HTTP ' + res.status
                        );
                    }

                    var data = {};
                    var error;
                    // Google Santa sometimes eats login cookies and gets mad if there aren't any.
                    if(/accounts\.google\.com\/ServiceLogin/.test(res.responseText)){
                        error = 'Google Docs request failed: ' +
                                'This video requires you be logged into a Google account. ' +
                                'Open your Gmail in another tab and then refresh video.';
                        return cb(error);
                    }

                    res.responseText.split('&').forEach(function (kv) {
                        var pair = kv.split('=');
                        data[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
                    });

                    if (data.status === 'fail') {
                        error = 'Google Drive request failed: ' +
                                unescape(data.reason).replace(/\+/g, ' ');
                        return cb(error);
                    }

                    if (!data.fmt_stream_map) {
                        error = (
                            'Google has removed the video streams associated' +
                            ' with this item.  It can no longer be played.'
                        );

                        return cb(error);
                    }

                    data.links = {};
                    data.fmt_stream_map.split(',').forEach(function (item) {
                        var pair = item.split('|');
                        data.links[pair[0]] = pair[1];
                    });
                    data.videoMap = mapLinks(data.links);
                    console.log(data);
                    cb(null, data);
                } catch (error) {
                    unsafeWindow.console.error(error);
                }
        };
        
        xhr.open('GET', url);
        xhr.send();
    }