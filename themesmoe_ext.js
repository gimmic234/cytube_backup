// ==UserScript==
// @name themes moe ext cyt
// @namespace gdcytube
// @description themes moe ext cyt
// @include https://cytu.be/r/*
// @include https://www.cytu.be/r/*
// @grant unsafeWindow
// @grant GM_xmlhttpRequest
// @grant GM.xmlHttpRequest
// @connect themes.moe
// @run-at document-end
// @version 1.0.0
// ==/UserScript==

try {
    function debug(message) {
        try {
            unsafeWindow.console.log('[Drive]', message);
        } catch (error) {
            unsafeWindow.console.error(error);
        }
    }

    function httpRequest(opts) {
        if (typeof GM_xmlhttpRequest === 'undefined') {
            // Assume GM4.0
            debug('Using GM4.0 GM.xmlHttpRequest');
            GM.xmlHttpRequest(opts);
        } else {
            debug('Using old-style GM_xmlhttpRequest');
            GM_xmlhttpRequest(opts);
        }
    }

    function getThemesMoeInfo(id, cb) {
        var url = "https://themes.moe/api/themes/" + id;
        debug('Fetching ' + url);

        httpRequest({
            method: 'GET',
            url: url,
            onload: function (res) {
                try {
                    debug('Got response ' + res.responseText);

                    if (res.status !== 200) {
                        debug('Response status not 200: ' + res.status);
                        return cb(
                            'animethemes.moe request failed: HTTP ' + res.status
                        );
                    }
                    cb(null, res);
                } catch (error) {
                    unsafeWindow.console.error(error);
                }
            },

            onerror: function () {
                var error = 'Google Drive request failed: ' +
                            'metadata lookup HTTP request failed';
                error.reason = 'HTTP_ONERROR';
                return cb(error);
            }
        });
    }

    var TM_COMPATIBLES = [
        'Tampermonkey',
        'Violentmonkey' // https://github.com/calzoneman/sync/issues/713
    ];

    function isTampermonkeyCompatible() {
        try {
            return TM_COMPATIBLES.indexOf(GM_info.scriptHandler) >= 0;
        } catch (error) {
            return false;
        }
    }

    if (isTampermonkeyCompatible()) {
        unsafeWindow.getThemesMoe = getThemesMoeInfo;
        unsafeWindow.console.log('Initialized themesmoe search');
        unsafeWindow.themesmoe = true;
    }

} catch (error) {
    unsafeWindow.console.error(error);
}

