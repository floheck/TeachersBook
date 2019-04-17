"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t;
    return { next: verb(0), "throw": verb(1), "return": verb(2) };
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var sectionTimetableViewModel_1 = require("./viewModels/sectionTimetableViewModel");
var cultureSpecificTexts_1 = require("./model/cultureSpecificTexts");
var SectionLoader = (function () {
    function SectionLoader() {
    }
    SectionLoader.prototype.init = function (sections) {
        return __awaiter(this, void 0, void 0, function () {
            var configLink, sectionIdPrefix, sectionTexts, config, _i, sections_1, section, sectionHtmlPath, sectionScriptPath, sectionTranslationPath, sectionContent, sectionTranslation, userLang, _a, _b, languageItem, textItem, _c, _d, languageItem, textItem;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        configLink = "../content/data/TeachersBook.Configuration.js";
                        sectionIdPrefix = "sec-";
                        sectionTexts = new cultureSpecificTexts_1.CultureSpecificTexts();
                        return [4 /*yield*/, jQuery.ajax({
                                url: configLink,
                                dataType: "json",
                                cache: false,
                                async: false
                            })];
                    case 1:
                        config = _e.sent();
                        _i = 0, sections_1 = sections;
                        _e.label = 2;
                    case 2:
                        if (!(_i < sections_1.length)) return [3 /*break*/, 6];
                        section = sections_1[_i];
                        sectionHtmlPath = section.path + section.name + ".html";
                        sectionScriptPath = section.path + section.name + ".js";
                        sectionTranslationPath = section.path + section.name + ".json.js";
                        return [4 /*yield*/, jQuery.ajax({
                                url: sectionHtmlPath,
                                dataType: "html",
                                cache: false
                            })];
                    case 3:
                        sectionContent = _e.sent();
                        return [4 /*yield*/, jQuery.ajax({
                                url: sectionTranslationPath,
                                dataType: "json",
                                cache: false
                            })];
                    case 4:
                        sectionTranslation = _e.sent();
                        userLang = navigator.language;
                        switch (userLang) {
                            case "de":
                                for (_a = 0, _b = sectionTranslation["de"]; _a < _b.length; _a++) {
                                    languageItem = _b[_a];
                                    textItem = new cultureSpecificTexts_1.Texts();
                                    textItem.id = languageItem.id;
                                    textItem.text = languageItem.text;
                                    sectionTexts.texts.push(textItem);
                                }
                                break;
                            default:
                                for (_c = 0, _d = sectionTranslation["en"]; _c < _d.length; _c++) {
                                    languageItem = _d[_c];
                                    textItem = new cultureSpecificTexts_1.Texts();
                                    textItem.id = languageItem.id;
                                    textItem.text = languageItem.text;
                                    sectionTexts.texts.push(textItem);
                                }
                                break;
                        }
                        console.log(sectionTexts);
                        jQuery("#" + section.id).html(sectionContent);
                        this.initSectionViewModel(section, sectionTexts);
                        _e.label = 5;
                    case 5:
                        _i++;
                        return [3 /*break*/, 2];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    SectionLoader.prototype.initSectionViewModel = function (section, translations) {
        return __awaiter(this, void 0, void 0, function () {
            var viewModel;
            return __generator(this, function (_a) {
                switch (section.name) {
                    case "Timetable":
                        viewModel = new sectionTimetableViewModel_1.SectionTimetableViewModel(translations);
                        ko.applyBindings(viewModel, jQuery("#" + section.id)[0]);
                        break;
                }
                return [2 /*return*/];
            });
        });
    };
    return SectionLoader;
}());
exports.SectionLoader = SectionLoader;
//# sourceMappingURL=sectionLoader.js.map