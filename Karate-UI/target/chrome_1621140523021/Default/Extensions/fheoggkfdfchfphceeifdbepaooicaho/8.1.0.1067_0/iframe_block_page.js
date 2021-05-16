/*!
 * 
 *     MCAFEE RESTRICTED CONFIDENTIAL
 *     Copyright (c) 2021 McAfee, LLC
 *     
 *     The source code contained or described herein and all documents related
 *     to the source code ("Material") are owned by McAfee or its
 *     suppliers or licensors. Title to the Material remains with McAfee
 *     or its suppliers and licensors. The Material contains trade
 *     secrets and proprietary and confidential information of McAfee or its
 *     suppliers and licensors. The Material is protected by worldwide copyright
 *     and trade secret laws and treaty provisions. No part of the Material may
 *     be used, copied, reproduced, modified, published, uploaded, posted,
 *     transmitted, distributed, or disclosed in any way without McAfee's prior
 *     express written permission.
 *     
 *     No license under any patent, copyright, trade secret or other intellectual
 *     property right is granted to or conferred upon you by disclosure or
 *     delivery of the Materials, either expressly, by implication, inducement,
 *     estoppel or otherwise. Any license under such intellectual property rights
 *     must be expressed and approved by McAfee in writing.
 *     
 */!function(E){var _={};function T(S){if(_[S])return _[S].exports;var A=_[S]={i:S,l:!1,exports:{}};return E[S].call(A.exports,A,A.exports,T),A.l=!0,A.exports}T.m=E,T.c=_,T.d=function(E,_,S){T.o(E,_)||Object.defineProperty(E,_,{enumerable:!0,get:S})},T.r=function(E){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(E,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(E,"__esModule",{value:!0})},T.t=function(E,_){if(1&_&&(E=T(E)),8&_)return E;if(4&_&&"object"==typeof E&&E&&E.__esModule)return E;var S=Object.create(null);if(T.r(S),Object.defineProperty(S,"default",{enumerable:!0,value:E}),2&_&&"string"!=typeof E)for(var A in E)T.d(S,A,function(_){return E[_]}.bind(null,A));return S},T.n=function(E){var _=E&&E.__esModule?function(){return E.default}:function(){return E};return T.d(_,"a",_),_},T.o=function(E,_){return Object.prototype.hasOwnProperty.call(E,_)},T.p="",T(T.s=76)}({1:function(E,_,T){"use strict";T.d(_,"a",(function(){return S})),T.d(_,"c",(function(){return A})),T.d(_,"h",(function(){return I})),T.d(_,"b",(function(){return O})),T.d(_,"i",(function(){return N})),T.d(_,"g",(function(){return R})),T.d(_,"f",(function(){return C})),T.d(_,"d",(function(){return L})),T.d(_,"e",(function(){return n}));const S={CACHE_STORE:"CACHE_STORE",CONTENT_HANDLER:"CONTENT_HANDLER",EXECUTE_COMMAND:"EXECUTE_COMMAND",FOCUS_OR_CREATE_TAB:"FOCUS_OR_CREATE_TAB",GET_BK_GLOBALS:"GET_BK_GLOBALS",GET_EXTENSION_STATUS:"GET_EXTENSION_STATUS",GET_TAB_DATA:"GET_TAB_DATA",GTI_REQUEST:"GTI_REQUEST",INSTALL_EXTENSION:"INSTALL_EXTENSION",LOGGER:"LOGGER",PLACEHOLDER_TEXT:"PLACEHOLDER_TEXT",REMOVE_TAB:"REMOVE_TAB",SEND_TELEMETRY:"SEND_TELEMETRY",SET_VIEWPORT:"SET_VIEWPORT",WHITELIST:"WHITELIST",RESET_NATIVE_SETTING:"RESET_NATIVE_SETTING",GET_POPUP_DATA:"GET_POPUP_DATA",GET_SETTINGS_DATA:"GET_SETTINGS_DATA",RESET_SETTINGS:"RESET_SETTINGS",AUTO_RUN_VIDEO_SITE:"AUTO_RUN_VIDEO_SITE",GET_CLICK_EVENT_TIME:"GET_CLICK_EVENT_TIME",SAVE_CLICK_EVENT_TIME:"SAVE_CLICK_EVENT_TIME",GET_TYPOSQUATTING_DATA:"GET_TYPOSQUATTING_DATA",IS_FRAME_BLOCKED:"IS_FRAME_BLOCKED",IS_WHITELISTED:"IS_WHITELISTED",ANY_BLOCKED_IFRAMES:"ANY_BLOCKED_IFRAMES",ANY_BLOCKED_CRYPTOSCRIPTS:"ANY_BLOCKED_CRYPTOSCRIPTS",UNBLOCK_ALL_IFRAMES:"UNBLOCK_ALL_IFRAMES",VIEW_SITE_REPORT:"VIEW_SITE_REPORT",SEARCH_ANNOTATION:"SEARCH_ANNOTATION",UPDATE_ENGINE_STATS:"UPDATE_ENGINE_STATS",SHOW_NPS_CHECKLIST:"SHOW_NPS_CHECKLIST",SOCIAL_MEDIA_ANNOTATION:"SOCIAL_MEDIA_ANNOTATION",UPDATE_RAT_DETECTION_SHOWING_FLAG:"UPDATE_RAT_DETECTION_SHOWING_FLAG",GET_DOMAIN_VISITED_DETAILS:"GET_DOMAIN_VISITED_DETAILS",SEARCH_SUGGEST:"SEARCH_SUGGEST",SHOW_SS_WELCOME_ANNOTATION:"SHOW_SS_WELCOME_ANNOTATION",BLAST_SEARCH_BASE:"BLAST_SEARCH_BASE",GET_WEIGHTS:"GET_WEIGHTS",SAVE_FORM_INFO:"SAVE_FORM_INFO",GET_FORM_INFO_CACHE:"GET_FORM_INFO_CACHE",CLEAR_FORM_INFO_CACHE:"CLEAR_FORM_INFO_CACHE",SAVE_MULTISTEP_LOGIN:"SAVE_MULTISTEP_LOGIN",DWS_EMAIL:"DWS_EMAIL",GET_CACHED_DWS_INFO:"GET_CACHED_DWS_INFO",CLEAR_CACHED_DWS_INFO:"CLEAR_DWS_INFO",UPDATE_DWS_SHOWN_COUNTER:"UPDATE_DWS_SHOWN_COUNTER",SAVE_DWS_INFO:"SAVE_DWS_INFO",UPDATE_DWS_LASTSHOWN:"UPDATE_DWS_LASTSHOWN",GET_DWS_WHITELIST:"GET_DWS_WHITELIST",UPDATE_DWS_WHITELIST:"UPDATE_DWS_WHITELIST",EFFICACY_DETAILS:"EFFICACY_DETAILS",SET_EFFICACY_USER_SCORE:"SET_EFFICACY_USER_SCORE",ENABLE_EFFICACY_FEATURES:"ENABLE_EFFICACY_FEATURES",UPDATE_EFFICACY_SURVEY_TYPE:"UPDATE_EFFICACY_SURVEY_TYPE",ON_ENGINE_SEARCH:"ON_ENGINE_SEARCH"},A={UNBLOCK_IFRAME:"UNBLOCK_IFRAME",BALLOON_MESSAGE:"BALLOON_MESSAGE",FLOATING_BALLOON:"FLOATING_BALLOON",PAGE_OVERLAY:"PAGE_OVERLAY",SIDEBAR:"SIDEBAR",TOPBAR:"TOPBAR"},I={MAIN:"MAIN",RELOAD:"RELOAD",SMA:"SMA",RAT_DETECTION:"RAT_DETECTION"},O={SS_EXPERIENCE:"SS_EXPERIENCE",FIND_SIMILAR_PAGES:"FIND_SIMILAR_PAGES",DWS:"DWS"},N={CRYPTO_BLOCK:"CRYPTO_BLOCK",IFRAME_BLOCK:"IFRAME_BLOCK",TRIGGER_ALLOW:"TRIGGER_ALLOW"},R={SEARCH_EXTENSION_OVERLAY:"SEARCH_EXTENSION_OVERLAY",FINISH_DOWNLOAD:"FINISH_DOWNLOAD"},C={SHOW_SS_EXPERIENCE_BALLOON:"SHOW_SS_EXPERIENCE_BALLOON"},L={PING:0,DISCONNECT_NATIVE:1,SET_PROPERTY_EX:2,SET_PROPERTY:3,GET_PROPERTY:4,CLEAR_GTI_CACHE:5,RESET_CRYPTO:6,CLEAN_TYPOSQUATING_WHITELIST:7,CLEAR_TYPOSQUATING_CACHE:8,SHOW_UNUSED_SELECTORS:9,CLEAN_CRYPTO_WHITELIST:10,WB_VIDEO_STATS:11,CLEAN_RAT_WHITELIST:12,CLEAN_RAT_CACHE:13,WB_TELEMETRY:14,REPLACE_TRUSTED_DOMAIN:15,VERIFY_GTI_REQUEST:17,VERIFY_TYPOSQUAT_SERVER:18,GET_ALL_WA_SETTINGS:19,SET_STORAGE_PROPERTY:20,GET_STORAGE_PROPERTY:21,REINIT_SCHEDULED_TASKS:22,OPEN_SETTINGS:23,OPEN_ACTION_PANEL:24},n={PONG:0}},2:function(E,_,T){"use strict";T.d(_,"a",(function(){return S}));const S=chrome},76:function(E,_,T){"use strict";T.r(_);T(77),T(78);var S=T(2),A=T(1);S.a.runtime.onMessage.addListener((E,_)=>{_.id===S.a.runtime.id&&E.command===A.c.UNBLOCK_IFRAME&&window.location.replace(E.url)})},77:function(E,_,T){},78:function(E,_){E.exports="../images/iframe/block.png"}});
//# sourceMappingURL=../sourceMap/chrome/iframe_block_page.map