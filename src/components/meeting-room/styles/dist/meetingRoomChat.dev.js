"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Send = exports.Input_div = exports.MsgTime = exports.MessageCard = exports.Name = exports.Picture = exports.MessageDiv = exports.Chat = exports.ParticipantCard = exports.Participants = exports.ChatPanel = exports.ChatWrap = void 0;

var _styledComponents = _interopRequireDefault(require("styled-components"));

var global = _interopRequireWildcard(require("../../../styles/components/globalVariables"));

var _send = _interopRequireDefault(require("../../../assets/svg/send.svg"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _templateObject12() {
  var data = _taggedTemplateLiteral(["\n    content: url(", ");\n    position: absolute;\n    top: 70%;\n    left: 84%;\n\n    @media(max-width: 1100px){\n        left: 80%;\n    }\n\n    @media(max-width: 850px){\n        top: 65%;\n        left: 82.5%;\n    }\n\n    @media(max-width: 650px){\n        top: 65%;\n        left: 90%;\n    }\n\n    @media(max-width: 490px){\n        top: 65%;\n        left: 85%;\n    }\n\n    @media(max-width: 350px){\n        top: 65%;\n        left: 80%;\n    }\n"]);

  _templateObject12 = function _templateObject12() {
    return data;
  };

  return data;
}

function _templateObject11() {
  var data = _taggedTemplateLiteral(["\n    position: relative;\n"]);

  _templateObject11 = function _templateObject11() {
    return data;
  };

  return data;
}

function _templateObject10() {
  var data = _taggedTemplateLiteral(["\n  \n"]);

  _templateObject10 = function _templateObject10() {
    return data;
  };

  return data;
}

function _templateObject9() {
  var data = _taggedTemplateLiteral(["\n    height: 100%;\n    margin-left: 20px;\n    padding: 8px;\n    border-radius: 10px;\n\n    -webkit-box-shadow: 0px 0px 24px 0px rgba(50, 50, 50, 0.2);\n    -moz-box-shadow:    0px 0px 24px 0px rgba(50, 50, 50, 0.2);\n    box-shadow:         0px 0px 24px 0px rgba(50, 50, 50, 0.2);\n\n    .message-p{\n        text-align: left;\n        margin: 0;\n        height: 100%;\n    }\n\n"]);

  _templateObject9 = function _templateObject9() {
    return data;
  };

  return data;
}

function _templateObject8() {
  var data = _taggedTemplateLiteral(["\n  \n"]);

  _templateObject8 = function _templateObject8() {
    return data;
  };

  return data;
}

function _templateObject7() {
  var data = _taggedTemplateLiteral(["\n    min-width: 70px;\n    min-height: 70px;\n    background-color: red;\n    border-radius: 50%;\n\n    p{\n        font-size: 30px;\n        color: white;   \n        text-align: center;\n        padding-top: 10px;\n    }\n\n    @media(max-width: 800px){\n       background-color: transparent;\n       min-width: auto;\n       min:height: auto;\n        \n\n        p{\n            font-size: 15px;\n            color: ", ";\n        }\n    }\n"]);

  _templateObject7 = function _templateObject7() {
    return data;
  };

  return data;
}

function _templateObject6() {
  var data = _taggedTemplateLiteral(["\n    display: flex;\n    flex-direction: row;\n    margin: 20px 0px 40px 50px;\n\n    @media(max-width: 850px){\n        margin-left: 0px;\n    }\n"]);

  _templateObject6 = function _templateObject6() {
    return data;
  };

  return data;
}

function _templateObject5() {
  var data = _taggedTemplateLiteral(["\n    padding-top: 30px;\n    height: 100%;\n    border-left: 2px solid ", ";\n    display: flex;\n    flex-direction: column;\n    justify-content: space-between;\n\n    @media(max-width: 850px){\n        border-top: 2px solid ", ";\n        border-left: none;\n    }\n\n"]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = _taggedTemplateLiteral(["\n    width: 100%;\n    padding: 8px 8px 5px 8px;\n    margin: 10px;\n    min-height: 60px;\n\n    border-radius: 10px;\n    text-align: left;\n\n    -webkit-box-shadow: 0px 0px 24px 0px rgba(50, 50, 50, 0.2);\n    -moz-box-shadow:    0px 0px 24px 0px rgba(50, 50, 50, 0.2);\n    box-shadow:         0px 0px 24px 0px rgba(50, 50, 50, 0.2);\n\n    @media(max-width: 850px){\n        width: auto;\n        height: auto;\n        padding: 8px 5px 0px 8px;\n    }\n"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _taggedTemplateLiteral(["\n    padding: 0 50px 50px 50px;\n    margin: 0;\n    display: flex;\n    flex-direction: column;\n    justify-content: space-around;\n\n    @media(max-width: 850px){\n        padding: 10px 0px;\n        flex-direction: row;\n        justify-content: space-between;\n\n\n        h4{\n            font-size: 25px;\n\n            @media(max-width: 550px){\n                font-size: 20px;\n            }\n\n            @media(max-width: 400px){\n                font-size: 15px;\n            }\n        }\n\n        h6{\n            font-size: 20px;\n            padding: 0px;\n\n            @media(max-width: 400px){\n                font-size: 15px;\n            }\n        }\n\n        p{\n            @media(max-width: 400px){\n                font-size: 12.5px;\n            }\n        }\n    }\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n    height: 600px;\n    width: 100%;\n\n    display: flex;\n    flex-direction: row;\n    \n    @media(max-width: 850px){\n        flex-direction: column;\n        height: calc(100% + 2000px);\n    }\n\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n    padding-bottom: 40px;\n    margin: 0;\n    height: 100%;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var ChatWrap = _styledComponents.default.section(_templateObject());

exports.ChatWrap = ChatWrap;

var ChatPanel = _styledComponents.default.div(_templateObject2());

exports.ChatPanel = ChatPanel;

var Participants = _styledComponents.default.div(_templateObject3());

exports.Participants = Participants;

var ParticipantCard = _styledComponents.default.div(_templateObject4());

exports.ParticipantCard = ParticipantCard;

var Chat = _styledComponents.default.div(_templateObject5(), global.colorLightGrey, global.colorLightGrey);

exports.Chat = Chat;

var MessageDiv = _styledComponents.default.div(_templateObject6());

exports.MessageDiv = MessageDiv;

var Picture = _styledComponents.default.div(_templateObject7(), global.colorBlue);

exports.Picture = Picture;

var Name = _styledComponents.default.div(_templateObject8());

exports.Name = Name;

var MessageCard = _styledComponents.default.div(_templateObject9());

exports.MessageCard = MessageCard;

var MsgTime = _styledComponents.default.div(_templateObject10());

exports.MsgTime = MsgTime;

var Input_div = _styledComponents.default.div(_templateObject11());

exports.Input_div = Input_div;

var Send = _styledComponents.default.div(_templateObject12(), _send.default);

exports.Send = Send;