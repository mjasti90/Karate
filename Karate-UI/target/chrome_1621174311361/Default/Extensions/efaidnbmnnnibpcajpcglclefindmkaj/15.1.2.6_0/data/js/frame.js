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
var request,timer,sendCancel,isChecked,timer_off=!1,initialized=!1,events=acom_analytics.e,MENU_TIME=1500,PDF_MENU_TIME=3e3,FADE_TIME=1500;function sendMessage(e,t){"use strict";delete e.trefoilClick,e.authenticatedPDF&&1==e.authenticatedPDF&&delete e.authenticatedPDF,util.messageToMain(e),delete e.newUI,delete e.trefoilUI,delete e.analytics,timer&&(clearTimeout(timer),timer=null),t||"dismiss"===e.content_op||"resize_window"===e.content_op||sendCancel()}function analytics(e,t){"use strict";request.analytics||(request.analytics=[]),request.analytics.push([e,t])}function clearTimer(){"use strict";timer&&(clearTimeout(timer),timer=null),SETTINGS.IS_ERP_READER?$(".acrobatMainDiv").stop().css("display","none"):$(".acrobatMainDiv").stop().css("opacity",1)}function showFrictionlessMenu(e){return!!SETTINGS.TEST_MODE||!(!e||!e.show_frictionless||0!=e.version&&(1!=e.version||0!=e.NMHConnStatus)&&e.version!=SETTINGS.READER_VER)}function clearStatus(){"use strict";delete request.current_status,delete request.file_path,delete request.domtitle,delete request.timing,delete request.panel_op,delete request.is_pdf,delete request.trefoilUI,delete request.newUI}function sendAnalytics(e,t){const s={main_op:"analytics",analytics:[[e,t]]};util.messageToMain(s)}function sendCancel(){"use strict";clearStatus(),request.content_op="dismiss",request.main_op="relay_to_content",request.trefoilUI=!0,"search"===request.frictionless_workflow&&1==request.show_frictionless&&(request.suppress_frictionless=!0),delete request.newUI,sendMessage(request)}function sendMsgtoPersistUI(e){(request.version>1||SETTINGS.IS_ERP_READER||SETTINGS.IS_READER)&&(0==e?(request.content_op="dismiss",request.main_op="relay_to_content",request.newUI=!0,request.persist=!1,analytics(events.PERSIST_PDF_MENU_CLOSED),sendMessage(request),delete request.content_op,delete request.main_op):1==e&&(request.panel_op="pdf_menu",request.main_op="relay_to_content",request.persist=!0,analytics(events.PERSIST_PDF_MENU_SHOWN),delete request.content_op,request.newUI=!0,sendMessage(request,!0),delete request.persist,delete request.panel_op,delete request.main_op))}function fadeAway(){"use strict";timer=null,$(".acrobatMainDiv").animate({opacity:0},FADE_TIME,"swing",sendCancel)}function setTimer(){"use strict";(SETTINGS.TEST_MODE||SETTINGS.DEBUG_MODE)&&(timer=1),timer||timer_off||(timer=setTimeout((function(){setTimeout(fadeAway)}),request.is_pdf?PDF_MENU_TIME:MENU_TIME))}function upload(){"use strict";request.main_op="do_upload",request.handleResult="preview",analytics(events.PDF_MENU_UPLOAD_CLICKED),sendMessage(request)}function do_export(){"use strict";request.main_op="do_upload",request.handleResult="export",analytics(events.PDF_MENU_EXPORT_CLICKED),sendMessage(request)}function send(){"use strict";request.main_op="do_upload",request.handleResult="send",analytics(events.PDF_MENU_SEND_CLICKED),sendMessage(request)}function fillsign(){"use strict";request.main_op="do_upload",request.handleResult="fillsign",analytics(events.PDF_MENU_FILLSIGN_CLICKED),sendMessage(request)}function doAcrobat(){"use strict";request.main_op="open_in_acrobat",request.trefoilUI=!0,void 0!==request.paramName&&delete request.paramName,util.handlePDFURL(request,!0)}function doAcrobatWithParams(e){"use strict";request.main_op="open_in_acrobat",request.trefoilUI=!1,request.paramName=e,delete request.content_op,util.handlePDFURL(request,!0)}function load_frictionless_iframe(e,t){let s=document.createElement("iframe");s.setAttribute("referrerpolicy","no-referrer"),s.classList.add("frictionless-iframe");let n=new URL(e);if(t&&(request.locale?t.locale=request.locale:t.locale=chrome.i18n.getMessage("@@ui_locale"),Object.keys(t).forEach(e=>{n.searchParams.append(e,t[e])})),"false"===util.getCookie("logAnalytics")){let e=n.toString();e=e.concat("&app!analytics=disable");try{n=new URL(e)}catch(e){n=""}}if("test"===request.env||"stage"===request.env){let e=n.toString();e=e.concat("&app!versions=latest");try{n=new URL(e)}catch(e){n=""}}return s.onerror=function(e){sendAnalytics(events.FRICTIONLESS_WIDGET_LOADING_FAILED)},s.onload=function(e){sendMessage({iframe_onload_time:Date.now(),main_op:"timing_info",timing_op:"startup_to_iframe_load"},!0),"trefoil"===t.workflow&&s.contentWindow.postMessage({valid:!0},n.origin)},sendMessage({iframe_call_time:Date.now(),main_op:"timing_info"},!0),s.setAttribute("src",n),s}function do_frictionless(e){request.pdf_action=e,request.main_op="get-frictionless-url",request.frame_visibility="visible",request.frictionless_workflow="trefoil",request.startup_time=Date.now(),"resize_window"==request.content_op&&(request.content_op=null),"createpdf"==e?analytics(events.FRICTIONLESS_TOOL_SELECTED,{TOOL:"CREATE_PDF"}):"compress-pdf"==e&&analytics(events.FRICTIONLESS_TOOL_SELECTED,{TOOL:"COMPRESS_PDF"}),sendMessage(request,!0)}function showFrictionlessError(e,t){const s=$(".frictionless-error"),n=$(".error-title");$(".error-details").text(t),n.text(e),s.removeClass("hidden"),alignContentHeight(null,!0)}function hideFrictionlessError(){$(".frictionless-error").addClass("hidden"),alignContentHeight(null,!0)}function to_toggle(e){"use strict";isChecked=e,util.setCookie("ViewResultsPref",isChecked?"true":"false",3650),$(".do_set_open_pref").toggleClass("open-pdf-in-acrobat")}function to_html(e,t){"use strict";e&&to_toggle(t),SETTINGS.USE_ACROBAT?(request.main_op="convertToPDFPopupMenu",e&&(request.outputPath=e)):(request.handleResult="to_pdf",request.main_op="html_to_pdf"),sendMessage(request,!0),e||(analytics(events.TREFOIL_HTML_CONVERT_NEW),util.getCookie("ViewResultsPref")?analytics(isChecked?events.TREFOIL_HTML_CONVERT_OPEN_CHANGED:events.TREFOIL_HTML_CONVERT_NO_OPEN):analytics(events.TREFOIL_HTML_CONVERT_OPEN_DEFAULT))}function to_append(e){"use strict";SETTINGS.USE_ACROBAT&&(request.main_op="appendToExistingPDFPopupMenu",e&&(request.outputPath=e)),sendMessage(request,!0),e||(analytics(acom_analytics.e.TREFOIL_HTML_CONVERT_APPEND),util.getCookie("ViewResultsPref")?analytics(isChecked?events.TREFOIL_HTML_CONVERT_OPEN_CHANGED:events.TREFOIL_HTML_CONVERT_NO_OPEN):analytics(events.TREFOIL_HTML_CONVERT_OPEN_DEFAULT))}function loadhomescreen(){showFrictionlessMenu(request)&&($(".reader-option.html").removeClass("hidden"),timer_off=!0),$(".acrobatMainDiv").addClass("home-screen"),$(".acrobatMainDiv").removeClass("widget-screen-main-div"),$(".actions").removeClass("hidden"),$(".frictionless-container").empty(),$(".frictionless-host").addClass("hidden"),util.setCookie("always-show-pdftools","false",3650),$(".always-show-pdftools").prop("checked",!1),sendAnalytics(events.FRICTIONLESS_AUTO_SUGGESTION_DISABLED);const e=".desktop-app-reader .api-option-container-inner-pdftools",t=".desktop-app-reader .api-option-container input[type=checkbox] ~ .checkbox-toggle",s=".desktop-app-reader .api-option-container input[type=checkbox] ~ label";$(e).one("animationstart",(function(){$(t).addClass("toggle-inactive-blue-circle"),$(s).addClass("toggle-text-color")})),$(e).one("animationend",(function(){$(t).removeClass("toggle-inactive-blue-circle"),$(s).removeClass("toggle-text-color")})),$(e).addClass("flash-animation"),alignContentHeight(null,!0),handleHeightResizeEvents()}function handleExternalMessage(e){try{let t=new URL(request.frictionless_uri);e.origin===t.origin&&(request.main_op="external_msg",request.data=e.data,request.timeStamp=Date.now(),util.messageToMain(request))}catch(e){}}function initialize(){"use strict";initialized||(initialized=!0,$(".frictionless-host").on("click",".tooltip-content-settings",(function(){sendAnalytics(events.FRICTIONLESS_INFO_SETTINGS_CLICKED),loadhomescreen()})),window.addEventListener("message",handleExternalMessage,!1),$(".do_upload, .do_send, .do_fillsign, .do_export, .do_acrobat, .do_frictionless_create, .do_frictionless_compress, .do_frictionless_pdf_to_word, .do_frictionless_pdf_to_jpg, .do_frictionless_pdf_to_excel, .do_frictionless_pdf_to_ppt").click((function(e){var t=$(e.currentTarget);clearTimer(),t.hasClass("do_upload")&&upload(),t.hasClass("do_send")&&send(),t.hasClass("do_fillsign")&&fillsign(),t.hasClass("do_export")&&do_export(),t.hasClass("do_acrobat_FS")?doAcrobatWithParams("FillnSign"):t.hasClass("do_acrobat")&&doAcrobat(),t.hasClass("do_frictionless_create")?do_frictionless("createpdf"):t.hasClass("do_frictionless_compress")?do_frictionless("compress-pdf"):t.hasClass("do_frictionless_pdf_to_word")?do_frictionless("pdf-to-word"):t.hasClass("do_frictionless_pdf_to_jpg")?do_frictionless("pdf-to-image"):t.hasClass("do_frictionless_pdf_to_excel")?do_frictionless("pdf-to-excel"):t.hasClass("do_frictionless_pdf_to_ppt")&&do_frictionless("pdf-to-ppt")})),$(".do_frictionless_edit , .do_frictionless_edit_rotate, .do_frictionless_edit_delete, .do_frictionless_edit_reorder, .do_frictionless_sign_fillandsign, .do_frictionless_sign_requestsignatures").click((function(e){var t=$(e.currentTarget);request.main_op="go_to_aonline",t.hasClass("do_frictionless_edit_rotate")?(request.verb="edit_rotate",sendAnalytics(events.FRICTIONLESS_TOOL_SELECTED_EDIT_ROTATE)):t.hasClass("do_frictionless_edit_delete")?(request.verb="edit_delete",sendAnalytics(events.FRICTIONLESS_TOOL_SELECTED_EDIT_DELETE)):t.hasClass("do_frictionless_edit_reorder")?(request.verb="edit_reorder",sendAnalytics(events.FRICTIONLESS_TOOL_SELECTED_EDIT_REORDER)):t.hasClass("do_frictionless_sign_fillandsign")?(request.verb="fillandsign",sendAnalytics(events.FRICTIONLESS_TOOL_SELECTED_FILL_SIGN)):t.hasClass("do_frictionless_sign_requestsignatures")&&(request.verb="request_signatures",sendAnalytics(events.FRICTIONLESS_TOOL_SELECTED_REQUEST_SIGNATURES)),sendMessage(request)})),$(".accordiontoggle").click((function(e){e.preventDefault();let t=$(this);t.next().next().hasClass("show")?(t.next().next().removeClass("show"),t.next().addClass("show"),t.next().css("display","block"),t.next().next().slideUp(0),t.next().delay(0).slideDown(0),t.addClass("stacked"),t.removeClass("collapsed")):(t.next().removeClass("show"),t.next().next().addClass("show"),t.addClass("collapsed"),t.removeClass("stacked"),t.next().slideUp(0),t.next().next().slideDown(0))})),$(".do_visit_acom, .do_html_to_pdf, .go_to_aonline").click((function(e){var t=$(e.currentTarget);clearTimer(),t.hasClass("do_visit_acom")&&(request.is_pdf?analytics(events.TREFOIL_PDF_VISIT_AIC):analytics(events.TREFOIL_HTML_VISIT_AIC),request.handleResult="acom",request.main_op="goto_acom",sendMessage(request)),t.hasClass("do_html_to_pdf")&&to_html(),t.hasClass("go_to_aonline")&&(request.main_op="go_to_aonline",request.verb="default",sendMessage(request),sendAnalytics(events.ACROBAT_ONLINE_CLICKED))})),$(".close-dialog").click((function(){$(".acrobatMainDiv").length>0&&$(".acrobatMainDiv").hasClass("widget-screen-main-div")&&analytics(events.FRICTIONLESS_WIDGET_CROSS_CLICKED),sendCancel()})),$(".action-available-click").click((function(e){var t=$(e.currentTarget);clearTimer(),console.log(t),request.main_op="go_to_aonline",request.verb="acrobat_label",sendAnalytics(events.TREFOIL_ACROBAT_LABEL_CLICKED),sendMessage(request)})),$(".acrobatMainDiv").hover(clearTimer,setTimer),$(".sign-out").click((function(){analytics(acom_analytics.e.SIGN_OUT_CLICKED),request.main_op="sign-out",sendMessage(request)})),$("#special").click((function(){analytics(events.FLICKR_OFFER_CLICKED),request.main_op="flickr",sendMessage(request)})),$(".do_html_add_to_pdf").click((function(){to_append()})),$(".do_set_open_pref").click((function(){isChecked=!(isChecked=$(".do_set_open_pref").hasClass("open-pdf-in-acrobat")),util.setCookie("ViewResultsPref",isChecked?"true":"false",3650),$(".do_set_open_pref").toggleClass("open-pdf-in-acrobat"),analytics(isChecked?acom_analytics.e.TREFOIL_HTML_OPENPDF_PREF_OFF:acom_analytics.e.TREFOIL_HTML_OPENPDF_PREF_ON),request.main_op="send-analytics",sendMessage(request,!0)})),$(".do-acro-prefs").click((function(){analytics(events.TREFOIL_HTML_PREFERENCES_CLICK),request.main_op="showConversionSettingsDialog",sendMessage(request)})),$(".convert").click((function(){$(".convert").hasClass("convert-button")&&(request.main_op="open_converted_file",sendMessage(request))})),$(".always-show").prop("checked","false"!==util.getCookie("always-show-pdf-menu")),$(".api-option-container-inner").click((function(){var e=$(".always-show").prop("checked")?"false":"true";util.setCookie("always-show-pdf-menu",e,3650),$(".always-show").prop("checked","true"===e),"false"===e?sendMsgtoPersistUI(!1):"true"===e&&sendMsgtoPersistUI(!0)})),$(".always-show-pdftools").prop("checked","false"!==util.getCookie("always-show-pdftools")),$(".api-option-container-inner-pdftools").click((function(){$(".desktop-app-reader .api-option-container-inner-pdftools").removeClass("flash-animation"),$(".desktop-app-reader .api-option-container input[type=checkbox] ~ .checkbox-toggle").removeClass("toggle-inactive-blue-circle");let e=$(".always-show-pdftools").prop("checked")?"false":"true";util.setCookie("always-show-pdftools",e,3650),$(".always-show-pdftools").prop("checked","true"===e),sendAnalytics("false"===e?events.FRICTIONLESS_AUTO_SUGGESTION_DISABLED:events.FRICTIONLESS_AUTO_SUGGESTION_ENABLED)})))}function dump(e,t){"use strict";if(SETTINGS.DEBUG_MODE){var s,n=[t];for(s in e)e.hasOwnProperty(s)&&n.push("  "+s+": "+e[s]);console.log(n.join("\n"))}}function tester(e){"use strict";switch(util.consoleLog("TESTING"),util.consoleLogDir(JSON.stringify(e)),e.test_extension){case"upload":upload();break;case"export":do_export();break;case"send":send();break;case"fillsign":fillsign();break;case"to_html":to_html(e.outputPath,e.openPDF);break;case"doAcrobat":doAcrobat();break;case"doAcrobat_FS":doAcrobatWithParams("FillnSign");break;case"to_append":to_append(e.outputPath)}}function setupLocalizedFonts(){let e=void 0,t={"font-weight":"400"},s={"font-weight":"500"};switch(request.locale){case"ja-JP":e={"font-family":"adobe-clean-han-japanese"};break;case"ko-KR":e={"font-family":"adobe-clean-han-korean"};case"zh_CN":e={"font-famiy":"adobe-clean-han-simplified-c"}}e&&($(".desktop-app-reader").css(e),$(".desktop-app-reader .actions input[type=button]").css(e).css(t),$(".desktop-app-reader .action-available").css(e).css(s))}function setStatus(e){"use strict";var t,s,n,o=!0,i=!0,a=!1,r="web2pdfStatusFailure",l="web2pdfStatusComplete";if(!(request.tabId&&e.tabId&&e.tabId!=request.tabId||["analytics","third-party-cookies"].includes(e.main_op))){if(e.test_extension)return tester(e);switch(e.version===SETTINGS.ERP_READER_VER&&(SETTINGS.IS_ERP_READER=!0),initialize(),delete(request=e).analytics,clearTimer(),timer_off=!1,util.translateElements(".translate"),1===request.version&&$("#web2pdfOpenButtonText").val(util.getTranslation("web2pdfOpenButtonTextOlder")),1!==request.version&&0!==request.version||$("#web2pdfShowPersistentOpen").text(util.getTranslation("web2pdfAlwaysShow")),request.version===SETTINGS.READER_VER&&$("#web2pdfOpenButtonText").val(util.getTranslation("web2pdfOpenButtonText")),$(".ui-element").addClass("hidden"),$("#action_message").text(""),request.displayName&&!SETTINGS.USE_ACROBAT&&($(".displayName").text(request.displayName),$(".sign-out").removeClass("hidden"),$(".action-signout").removeClass("hidden")),dump(request,"Receive frame message:"),s=request.panel_op,delete request.panel_op,s){case"pdf_menu":timer_off=!0,SETTINGS.USE_ACROBAT?(!0===SETTINGS.FILL_N_SIGN_ENABLED&&($("#web2pdfFillSignAcrobatButtonText").removeClass("hidden"),$(".acro-option.pdf").removeClass("hidden")),1==request.version&&0==request.NMHConnStatus||0==request.version?($(".go_to_aonline").removeClass("hidden"),request.show_frictionless||$(".do_visit_acom").addClass("hidden")):request.version===SETTINGS.READER_VER?($(".acro-option.pdf").removeClass("hidden"),$(".acrobatMainDiv").removeClass("home-screen"),$(".acrobatMainDiv").addClass("pdf-screen"),$(".reader-option.horizontal-rule.pref-divider").removeClass("hidden")):($(".acro-option.pdf").removeClass("hidden"),$(".acro-option.horizontal-rule").removeClass("hidden"))):$(".api-option.pdf").removeClass("hidden");break;case"error":$(".error").removeClass("hidden").text("Unexpected Error:"+request.error.name+"\nReference: "+request.error.errnum+"\n"+request.error.details);break;case"flickr":$(".action-available").removeClass("hidden"),$("#action_message").text("Create slide shows and contact sheets."),$(".special_question").removeClass("hidden"),$("#special").removeClass("hidden");break;case"status":$(".progress-area").removeClass("hidden"),$(".convert").text(request.domtitle),$(".convert-status, .convert-title").addClass("hidden"),$(".convert").removeClass("convert-button hidden"),"waiting"===request.current_status?(analytics(events.TREFOIL_HTML_CONVERT_WAITING),t=util.getTranslation("web2pdfStatusWaiting"),o=!1):"downloading"===request.current_status?(analytics(events.TREFOIL_HTML_CONVERT_DOWNLOADING),t=util.getTranslation("web2pdfStatusDownloading"),o=!1):"in_progress"===request.current_status?(analytics(events.TREFOIL_HTML_CONVERT_IN_PROGRESS),t=util.getTranslation("web2pdfStatusInProgress"),o=!1):"filelocked"===request.current_status?t=util.getTranslation("web2pdfFileLockedError"):"cancelled"===request.current_status?(analytics(events.TREFOIL_HTML_CONVERT_CANCELLED),t=util.getTranslation("web2pdfStatusCancelled"),a=!0):"complete"===request.current_status?(analytics(events.TREFOIL_HTML_CONVERT_COMPLETE),request.file_path?($(".convert").text(util.getTranslation("web2pdfOpenInDCButtonText")),$(".convert").addClass("convert-button")):($(".convert").empty(),$(".convert").addClass("hidden"))):"failure"===request.current_status?(analytics(events.TREFOIL_HTML_CONVERT_FAILED),request.message&&(t=request.message,t=$("<div/>").text(t).html()),i=!1):"noacrobat"===request.current_status?(analytics(events.TREFOIL_HTML_CONVERT_NO_ACROBAT),t=util.getTranslation("web2pdfUnsupportedAcrobatVersion"),i=!1):"unknown"===request.current_status?(t=util.getTranslation("web2pdfStatusUnknownFailure"),i=!1):"pdf_downloading"===request.current_status?(t=util.getTranslation("web2pdfStatusDownloadingPDF"),o=!1):"pdf_failure"===request.current_status?(analytics(events.TREFOIL_PDF_DOWNLOAD_FAILED),r="web2pdfStatusUnknownFailure",i=!1):"pdf_downloaded"===request.current_status?(t=util.getTranslation("web2pdfPDFOpening"),o=!1):"pdf_opened"===request.current_status?(i=!0,l="web2pdfPDFOpened"):"pdf_open_failed"===request.current_status&&(i=!1,o=!0,r="web2pdfPDFOpenFailed"),t&&($(".convert-title").removeClass("hidden"),$(".convert-title").html(t)),o?(delete request.panel_op,$(".actions").removeClass("hidden"),n=SETTINGS.USE_ACROBAT?request.is_pdf?".acro-option.pdf":".acro-option.html":request.is_pdf?".api-option.pdf":".api-option.html",$(n).removeClass("hidden"),$(".convert").removeClass("convert-busy"),$(".convert-status").removeClass("hidden"),i?request.is_pdf?($(".progress-area").addClass("hidden"),$(".convert").removeClass("convert-busy"),$(".convert-status").addClass("hidden")):($(".convert-status-icon").addClass("icon-success"),$(".convert-status-title").text(util.getTranslation(l))):(timer_off=!0,$(".convert-status-icon").removeClass("icon-success"),$(".convert-status-icon").addClass("icon-error"),$(".convert-status-title").text(util.getTranslation(r)),$(".convert").addClass("hidden")),a&&($(".convert-status").addClass("hidden"),$(".convert").addClass("hidden"))):(timer_off=!0,$(".actions").addClass("hidden"),$(".convert").addClass("convert-busy"));break;case"html_menu":timer_off=!0,SETTINGS.USE_ACROBAT?showFrictionlessMenu(request)?($(".reader-option.html").removeClass("hidden"),timer_off=!0):$(".acro-option.html").removeClass("hidden"):SETTINGS.TEST_MODE?$(".reader-option.html").removeClass("hidden"):$(".api-option.html").removeClass("hidden");break;case"load-frictionless":if(timer_off=!0,"resize_window"===request.content_op);else if(1==request.hide_spinner)delete request.hide_spinner,$(".frictionless-container").removeClass("hidden"),$(".frictionless-loader").addClass("hidden");else if(0==$(".frictionless-container").children().length){$(".acrobatMainDiv").removeClass("home-screen"),$(".acrobatMainDiv").addClass("widget-screen-main-div"),$(".actions").addClass("hidden"),"trefoil"===request.frictionless_workflow&&($(".frictionless-loader").removeClass("hidden"),$(".frictionless-loader").attr("data-loading-title",util.getTranslation("web2pdfLoaderTitle")||"Loading..."),$(".frictionless-container").addClass("hidden"));let e=load_frictionless_iframe(request.frictionless_uri,{verb:request.pdf_action,workflow:request.frictionless_workflow,dropzone2:"true"});$(".frictionless-container").append(e),$(".frictionless-host").removeClass("hidden"),"search"==request.frictionless_workflow?($(".tooltip").removeClass("hidden"),$(".tooltip-content")&&$(".tooltip-content").html(util.getTranslation("web2pdfInfoHoverPopup"))):"trefoil"===request.frictionless_workflow&&$(".tooltip").addClass("hidden"),alignContentHeight(null,!0),handleHeightResizeEvents()}break;case"show-frictionless-error":if(request.error_title&&request.error_description){let e=request.error_title,t=request.error_description;delete request.error_title,delete request.error_description,showFrictionlessError(e,t)}break;case"clear-frictionless-error":hideFrictionlessError(),$(".tooltip").addClass("hidden");break;case"send-external-msg":try{let e=new URL(request.frictionless_uri),t=$(".frictionless-iframe");if(1==t.length){t[0].contentWindow.postMessage(request.data,e.origin),delete request.data}}catch(e){}timer_off=!0}setTimer()}}function refreshRequestObj(e){void 0!==e&&void 0!==e.paramName&&delete e.paramName}function initTrefoilMenu(e){refreshRequestObj(e),SETTINGS.FILL_N_SIGN_ENABLED=e.isFillnSignEnabled,SETTINGS.SHAREPOINT_ENABLED=e.isSharePointEnabled,setStatus(e)}function sendResizeEvent(e){"use strict";clearStatus();let t=request;t.content_op="resize_window",t.panel_op="load-frictionless",t.window_height=e,t.main_op="relay_to_content",delete t.newUI,delete t.trefoilUI,sendMessage(t),t.content_op=null,t.panel_op=null}function alignContentHeight(e,t=!1){const s=$(".status-dialog").prop("scrollHeight");t&&s>0&&$(".acrobatMainDiv").height(s),sendResizeEvent(s)}function handleHeightResizeEvents(){$(".tooltip").on("mouseenter",e=>{analytics(events.FRICTIONLESS_INFO_MESSAGE_SHOWN),alignContentHeight(e)}),$(".tooltip").on("mouseleave",alignContentHeight)}util.isChrome()&&$((function(){"use strict";initialize()})),util.addMainListener(setStatus),$((function(){"use strict";if(window.location.search){if(request=JSON.parse(decodeURIComponent(window.location.search.split("=")[1])),SETTINGS.TEST_MODE&&window.addEventListener("message",(function(e){setStatus(e.data)}),!1),showFrictionlessMenu(request)){$(".do_visit_acom").addClass("hidden"),$("body").addClass("desktop-app-reader"),"html_menu"==request.panel_op&&($(".acrobatMainDiv").addClass("home-screen"),sendAnalytics(events.FRICTIONLESS_HOME_SCREEN_SHOWN));let r=request.locale,l=void 0;switch(r){case"ja-JP":l={kitId:"vaq7mqd",scriptTimeout:3e3,async:!0};break;case"ko-KR":l={kitId:"leb2lwu",scriptTimeout:3e3,async:!0};break;case"zh_CN":l={kitId:"eyt7cbr",scriptTimeout:3e3,async:!0}}l&&(e=document,s=e.documentElement,n=setTimeout((function(){s.className=s.className.replace(/\bwf-loading\b/g,"")+" wf-inactive"}),l.scriptTimeout),o=e.createElement("script"),i=!1,a=e.getElementsByTagName("script")[0],s.className+=" wf-loading",o.src="https://use.typekit.net/"+l.kitId+".js",o.async=!0,o.onload=o.onreadystatechange=function(){if(t=this.readyState,!(i||t&&"complete"!=t&&"loaded"!=t)){i=!0,clearTimeout(n);try{Typekit.load(l)}catch(e){}}},a.parentNode.insertBefore(o,a),setupLocalizedFonts())}initTrefoilMenu(request),"false"===util.getCookie("ViewResultsPref")?isChecked=!1:($(".do_set_open_pref").addClass("open-pdf-in-acrobat"),isChecked=!0)}var e,t,s,n,o,i,a}));