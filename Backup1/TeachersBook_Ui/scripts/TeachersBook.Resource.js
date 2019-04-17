/// <reference path="jquery-3.1.1.js" />

"use strict";
(function (TeachersBook) {
        (function (Resource) {

            Resource.init = function (data_link, defaultLanguage) {

                Resource.defaultLanguage = defaultLanguage;

                /// <summary>
                /// Initialisiert eine Language Resource
                /// </summary>
                /// <param name="data_link" type="type">Pfad zum Resource-File</param>
                /// <returns type="jQuery.Deferred">Deferred</returns>
                var deferred = new jQuery.Deferred();
                var readResourceFile = jQuery.ajax({
                    url: data_link,
                    dataType: "json",
                    cache: false
                });
                 
                readResourceFile.done(function (data) {
                    var LanguageResource = {};
                    var currentLanguage = Resource.getLanguage(Resource.defaultLanguage);

                    for (var language in data) {
                        if (language == currentLanguage) {
                            LanguageResource = data[language];
                        }
                    }
                    if (!LanguageResource) {
                        LanguageResource = data["en"];
                    }
                    deferred.resolve(LanguageResource);
                });

                readResourceFile.fail(function (jqxhr, settings, exception) {
                    deferred.reject(jqxhr, settings, exception);
                });
                return deferred.promise();
            }


            Resource.getLanguage = function (defaultLanguage) {
                /// <summary>
                /// Ermittelt ob eine Language Resource
                /// </summary>
                /// <param name="defaultLanguage" type="type">Der Language code (z.B. 'de') oder 'browser' wenn die Browsersprache genutzt werden soll.</param>
                /// <returns type="json">Language Resource Objekt</returns>
                var language;
                if (!defaultLanguage || defaultLanguage.toLowerCase() == "browser") {
                    var myNav = navigator.userAgent.toLowerCase();
                    var msieVersion = (myNav.indexOf('msie') != -1) ? parseInt(myNav.split('msie')[1]) : -1;
                    language = msieVersion != -1 ? navigator.browserLanguage : language = navigator.language;
                }
                else {
                    language = defaultLanguage;
                }                

                language = language.replace(/-.*/, "");

                return language;
            }

        }(TeachersBook.Resource = TeachersBook.Resource || {}));
}(window.TeachersBook = window.TeachersBook || {}));