
function debug(message) {
    try {
        console.log('[Drive]', message);
    } catch (error) {
        console.error(error);
    }
}

var ITAG_QMAP = {
    37: 1080,
    46: 1080,
    22: 720,
    45: 720,
    59: 480,
    44: 480,
    35: 480,
    18: 360,
    43: 360,
    34: 360
};

var ITAG_CMAP = {
    43: 'video/webm',
    44: 'video/webm',
    45: 'video/webm',
    46: 'video/webm',
    18: 'video/mp4',
    22: 'video/mp4',
    37: 'video/mp4',
    59: 'video/mp4',
    35: 'video/flv',
    34: 'video/flv'
};

window[CHANNEL.name].getVideoInfo = function (id) {
    var url = "https://cors-anywhere.herokuapp.com/https://docs.google.com/get_video_info?authuser=" + "&docid=" + id + "&sle=true" + "&hl=en";
    //debug('Fetching ' + url);
    console.log(url);
    $.ajax({
        method: 'GET',
        url: url,
        dataType: 'json',
        success: function (res, cb) {
            console.log(res);
            console.log('Got response ' + res.responseText);

            if (res.status !== 200) {
                error = 'Google Drive request failed: HTTP ' + res.status;
                console.log(error);
            }

            var data = {};
            var error;
            // Google Santa sometimes eats login cookies and gets mad if there aren't any.
            if(/accounts\.google\.com\/ServiceLogin/.test(res.responseText)){
                error = 'Google Docs request failed: ' + 'This video requires you be logged into a Google account. ' + 'Open your Gmail in another tab and then refresh video.';
                console.log(error);
            }

            res.responseText.split('&').forEach(function (kv) {
                var pair = kv.split('=');
                data[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
            });

            if (data.status === 'fail') {
                error = 'Google Drive request failed: ' + unescape(data.reason).replace(/\+/g, ' ');
                console.log(error);
            }

            if (!data.fmt_stream_map) {
                error = 'Google has removed the video streams associated' +' with this item.  It can no longer be played.';
                console.log(error);
            }

            data.links = {};
            data.fmt_stream_map.split(',').forEach(function (item) {
                var pair = item.split('|');
                data.links[pair[0]] = pair[1];
            });
            data.videoMap = mapLinks(data.links);
            console.log(data);
            googleData = data;
        },
        fail: function(xhr, textStatus, errorThrown) {
            console.log("request failed");
            console.log(textStatus);
            console.log(errorThrown);
        },
        complete: function(res) {
            console.log("completed");
            console.log(res);
            console.log('Got response ' + res.responseText);

            if (res.status !== 200) {
                error = 'Google Drive request failed: HTTP ' + res.status;
                console.log(error);
            }

            var data = {};
            var error;
            // Google Santa sometimes eats login cookies and gets mad if there aren't any.
            if(/accounts\.google\.com\/ServiceLogin/.test(res.responseText)){
                error = 'Google Docs request failed: ' + 'This video requires you be logged into a Google account. ' + 'Open your Gmail in another tab and then refresh video.';
                console.log(error);
            }

            res.responseText.split('&').forEach(function (kv) {
                var pair = kv.split('=');
                data[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
            });

            if (data.status === 'fail') {
                error = 'Google Drive request failed: ' + unescape(data.reason).replace(/\+/g, ' ');
                console.log(error);
            }

            if (!data.fmt_stream_map) {
                error = 'Google has removed the video streams associated' +' with this item.  It can no longer be played.';
                console.log(error);
            }

            data.links = {};
            data.fmt_stream_map.split(',').forEach(function (item) {
                var pair = item.split('|');
                data.links[pair[0]] = pair[1];
            });
            data.videoMap = mapLinks(data.links);
            console.log(data);
            googleData = data;
            cb(null, data);
        }
    });
}

function mapLinks(links) {
    var videos = {
        1080: [],
        720: [],
        480: [],
        360: []
    };

    Object.keys(links).forEach(function (itag) {
        itag = parseInt(itag, 10);
        if (!ITAG_QMAP.hasOwnProperty(itag)) {
            return;
        }

        videos[ITAG_QMAP[itag]].push({
            itag: itag,
            contentType: ITAG_CMAP[itag],
            link: links[itag]
        });
    });

    return videos;
}

window.GoogleDrivePlayer = class GoogleDrivePlayer extends VideoJSPlayer
    constructor: (data) ->
        if not (this instanceof GoogleDrivePlayer)
            return new GoogleDrivePlayer(data)

        super(data)

    load: (data) ->
        if typeof window[CHANNEL.name].getVideoInfo is 'function'
            setTimeout(=>
                backoffRetry((cb) ->
                    window[CHANNEL.name].getVideoInfo(data.id, cb)
                , (error, metadata) =>
                    if error
                        console.error(error)
                        alertBox = window.document.createElement('div')
                        alertBox.className = 'alert alert-danger'
                        alertBox.textContent = error
                        document.getElementById('ytapiplayer').appendChild(alertBox)
                    else
                        data.meta.direct = metadata.videoMap
                        super(data)
                , {
                    maxTries: 3
                    delay: 1000
                    factor: 1.2
                    jitter: 500
                }), Math.random() * 1000)