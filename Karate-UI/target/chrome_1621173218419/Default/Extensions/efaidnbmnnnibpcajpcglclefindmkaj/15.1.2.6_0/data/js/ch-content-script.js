/*************************************************************************
* ADOBE CONFIDENTIAL
* ___________________
*
*  Copyright 2015 Adobe Systems Incorporated
*  All Rights Reserved.
*
* NOTICE:  All information contained herein is, and remains
* the property of Adobe Systems Incorporated and its suppliers,
* if any.  The intellectual and technical concepts contained
* herein are proprietary to Adobe Systems Incorporated and its
* suppliers and are protected by all applicable intellectual property laws,
* including trade secret and or copyright laws.
* Dissemination of this information or reproduction of this material
* is strictly forbidden unless prior written permission is obtained
* from Adobe Systems Incorporated.
**************************************************************************/
var $iframe,$newiframe,disableKeyZoom,disableWheelZoom;const docUrl=document.location.href;function createAndInjectIframe(e){var o=e.base64PDF;delete e.base64PDF;let t="message="+encodeURIComponent(JSON.stringify(e));e.base64PDF=o;let n="265px",i="450px",r="block";e.show_frictionless&&(n="294px",i="526px"),"hidden"===e.frame_visibility&&(r="none"),($iframe=$("<iframe>")).attr("id","__acrobatDialog__").css({border:"0px","z-index":2147483647,position:"fixed",top:"-5px",right:"80px",width:n,height:i,display:r,margin:"auto"}).attr("src",chrome.extension.getURL("data/js/frame.html")+"?"+t).appendTo("html"),$(document).on("keydown",disableKeyZoom),$(document).on("mousewheel",disableWheelZoom)}function injectFrame(e){"use strict";0===($iframe=$("#__acrobatDialog__")).length?null==e.cookieStatus?checkForThirdPartyCookiesStatus(o=>{createAndInjectIframe(e)}):createAndInjectIframe(e):"none"===$iframe.css("display")&&"visible"===e.frame_visibility?$iframe.css({display:"block"}):e.trefoilClick&&($(document).off("keydown",disableKeyZoom),$(document).off("mousewheel",disableWheelZoom),delete e.trefoilClick,$iframe.remove())}function injectPersistFrame(e){if("application/pdf"===document.contentType){var o=e.base64PDF;delete e.base64PDF;var t="message="+encodeURIComponent(JSON.stringify(e));e.base64PDF=o,0===($newiframe=$("#__acrobatNewDialog__")).length?($newiframe=$("<iframe>").attr("id","__acrobatNewDialog__").css({border:"0px",position:"fixed",top:"100px",right:"15px",height:"350px",display:"block",margin:"auto"}).attr("src",chrome.extension.getURL("data/js/frameUI.html")+"?"+t).appendTo("html"),$(document).on("keydown",disableKeyZoom),$(document).on("mousewheel",disableWheelZoom)):e.trefoilClick&&($(document).off("keydown",disableKeyZoom),$(document).off("mousewheel",disableWheelZoom),delete e.trefoilClick,$iframe.remove())}}function errorOpeningPDF(e){e.panel_op="status",e.current_status="pdf_failure",e.main_op="open_in_acrobat",sendMsg(e)}function downloadAuthenticatedPDF(e){var o=new XMLHttpRequest;o.open("GET",e.url,!0),o.responseType="blob",o.onerror=function(o){errorOpeningPDF(e)},o.onload=function(t){var n;o.status<400&&(e.url===o.responseURL||"application/pdf"===o.response.type)?((n=new FileReader).onloadend=function(o){e.base64PDF=o.target.result,e.content_op="status",e.current_status="pdf_downloaded",e.main_op="open_in_acrobat",sendMsg(e)},n.readAsDataURL(o.response)):errorOpeningPDF(e)},o.send()}function handler(e){"use strict";if(e&&"check_cookie_settings"===e.content_op&&(delete e.content_op,checkForThirdPartyCookiesStatus()),!e.authenticatedPDF||1!=e.authenticatedPDF||"pdf_downloading"!==e.current_status){if("dismiss"===e.content_op)if(delete e.content_op,1==e.trefoilUI||1==e.trefoilClick){if(delete e.trefoilUI,$iframe)return $(document).off("keydown",disableKeyZoom),$(document).off("mousewheel",disableWheelZoom),$iframe.remove(),void($iframe=null)}else if(1==e.newUI){if(delete e.newUI,$newiframe)return $(document).off("keydown",disableKeyZoom),$(document).off("mousewheel",disableWheelZoom),$newiframe.remove(),void($newiframe=null)}else if(null!=e.frictionless_workflow&&(delete e.frictionless_workflow,$iframe))return $(document).off("keydown",disableKeyZoom),$(document).off("mousewheel",disableWheelZoom),$iframe.remove(),void($iframe=null);if(e.panel_op)if("load-frictionless"===e.panel_op&&e.pdf_action)if("resize_window"===e.content_op){const o=e.window_height;delete e.content_op,delete e.window_height,o&&$iframe&&$iframe.height(o+7)}else injectFrame(e);else 1==e.trefoilClick||1==e.trefoilUI?(delete e.trefoilUI,delete e.newUI,injectFrame(e)):1==e.newUI||1==e.persist?(delete e.newUI,delete e.trefoilUI,injectPersistFrame(e)):0==e.version||1==e.version&&1!=e.NMHConnStatus||injectFrame(e);return!1}downloadAuthenticatedPDF(e)}isGoogleQuery(docUrl)&&sendMsg({main_op:"html-startup",url:document.location.href,startup_time:Date.now()}),disableKeyZoom=function(e){"use strict";e.ctrlKey&&-1!==[187,189,107,109].indexOf(e.keyCode)&&e.preventDefault()},disableWheelZoom=function(e){"use strict";e.ctrlKey&&e.preventDefault()},void 0!==chrome.runtime&&chrome.runtime.onMessage.addListener(handler);