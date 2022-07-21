"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Participants = exports.Stop = exports.Mute = exports.VideoOptions = exports.VideoContainer = exports.VideoWrap = void 0;

var _styledComponents = _interopRequireDefault(require("styled-components"));

var global = _interopRequireWildcard(require("../../../styles/components/globalVariables"));

var _mute = _interopRequireDefault(require("../../../assets/svg/mute.svg"));

var _camera = _interopRequireDefault(require("../../../assets/svg/camera.svg"));

var _participants = _interopRequireDefault(require("../../../assets/svg/participants.svg"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _templateObject6() {
  var data = _taggedTemplateLiteral(["\n    content: url(", ");\n    height: 25px;\n    margin: 0;\n    padding: 0;\n\n    @media(max-width: 500px){\n        height: 20px\n    }\n"]);

  _templateObject6 = function _templateObject6() {
    return data;
  };

  return data;
}

function _templateObject5() {
  var data = _taggedTemplateLiteral(["\n    content: url(", ");\n    height: 25px;\n    margin: 0;\n    padding: 0;\n\n    @media(max-width: 500px){\n        height: 20px\n    }\n"]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = _taggedTemplateLiteral(["\n    content: url(", ");\n    height: 25px;\n    padding: 0;\n\n    @media(max-width: 500px){\n        height: 20px\n    }\n\n"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _taggedTemplateLiteral(["\n    width: 100%;\n    height: auto;\n    padding: 5px;\n    position: absolute;\n    top: 90%;\n\n    border-radius: 0 0 10px 10px;\n    background-color: ", ";\n\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n\n    .options-container {\n        display: flex;\n        flex-direction: row;\n        justify-content: space-around;\n        width: 40%;\n\n        .option{\n            margin: 0px 10px;\n            width: 100%;\n            display: block;\n\n            p{\n                color: white;\n                font-size: 14px;\n            }\n\n            @media(max-width: 350px){\n                margin: 0px;\n            }\n        }\n\n        @media(max-width: 800px){\n            width: 100%;\n        }\n\n\n    }\n\n    .call-buttons{\n        height: 100%;\n    }\n\n    @media(max-width: 500px){\n        display: block;\n    }\n\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n    height: 400px;\n    width: 800px;\n    margin: 0 auto;\n    position: relative;\n    background-color: black;\n    border-radius: 10px;\n\n    display: flex;\n    flex-direction: row;\n    justify-content: space-between;\n\n    @media(max-width: 1000px){\n        width: 100%;\n        padding-top: 15px;\n    }\n\n    @media(max-width: 500px){\n        background-color: ", ";\n        height: 400px;\n    }\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n    height: auto;\n    width: 100%;\n    margin: 30px auto 40px auto;\n    padding-bottom: 100px;\n    border-bottom: 2px solid ", ";\n\n    a{\n        color: ", " !important;\n        float: left;\n        text-decoration: none;\n        &:hover{\n            color: ", " !important;\n        }\n\n        @media(max-width: 1000px){\n            padding-bottom: 15px;\n        }\n    }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var VideoWrap = _styledComponents.default.section(_templateObject(), global.colorLightGrey, global.colorBlue, global.colorGreen);

exports.VideoWrap = VideoWrap;

var VideoContainer = _styledComponents.default.div(_templateObject2(), global.colorDarkGrey);

exports.VideoContainer = VideoContainer;

var VideoOptions = _styledComponents.default.div(_templateObject3(), global.colorDarkGrey);

exports.VideoOptions = VideoOptions;

var Mute = _styledComponents.default.i(_templateObject4(), _mute.default);

exports.Mute = Mute;

var Stop = _styledComponents.default.i(_templateObject5(), _camera.default);

exports.Stop = Stop;

var Participants = _styledComponents.default.i(_templateObject6(), _participants.default);

exports.Participants = Participants;