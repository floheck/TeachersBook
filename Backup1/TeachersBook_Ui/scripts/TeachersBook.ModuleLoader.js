/// <reference path="../libraries/jQuery/jquery-3.2.1.js" />
/// <reference path="../libraries/knockout/knockout-3.4.2.js" />
/// <reference path="../libraries/bootstrap/bootstrap-3.3.7-dist/js/bootstrap.js" />

"use strict";
(function (TeachersBook) {
        (function (SectionLoader) {

            var config_link = "../content/data/TeachersBook.Configuration.js";

            var sectionIdPrefix = "sec-";

            SectionLoader.activeModule = "Home";
            SectionLoader.activeModulePosition = 0;

            SectionLoader.init = function () {
                /// <summary>
                /// Loads all referenced Modules
                /// </summary>

                var deferred = jQuery.Deferred();

                var loadConfig = jQuery.ajax({
                    url: config_link,
                    dataType: "json",
                    cache: false
                });

                loadConfig.done(function (configuration) {
                    var menuIcons = [];

                    var sectionContentRequestPromises = [];

                    var secList = TeachersBook.Sections;

                    for (var i = 0; i < secList.length; i++) {
                        (function (element, last) {
                            var id = sectionIdPrefix + element.section;
                            var sectionHtmlPath = element.sectionPath + element.section + ".html";
                            var sectionScriptPath = element.sectionPath + element.section + ".js";
                            var sectionTranslationPath = element.sectionPath + element.section + ".json";

			    jQuery("#sidbarNavItems").append("<li><a href='#'" + element.section + "><i class='" + element.sectionMenuFontAwsome + "' aria-hidden='true'></i><span style='margin-left:10px;'>" + element.sectionMenu + "</span></a></li>");
                            ;
                            jQuery("#sections").append("<div id='" + id + "' class='content-section'></div>");
                                
                            var sectionContentRequest = jQuery.ajax({
                                url: sectionHtmlPath,
                                datatype: "html",
                                cache: false
                            });

                            var sectionContentRequestPromise = sectionContentRequest.done(function (sectionContent, textStatus, jqxhr) {
                                jQuery("#" + id).html(sectionContent);
                                jQuery.ajaxSetup({cache: false});
                                var sectionScriptRequest = jQuery.getScript(sectionScriptPath);
                                sectionScriptRequest.done(function () {
                                    var loadResource = TeachersBook.Resource.init(sectionTranslationPath, "browser");
                                    loadResource.done(function (resource) {
                                        var viewModel = new TeachersBook.Section[element.section].ViewModel(configuration, resource);
                                        if (element.bindingElementsIds != undefined) {
                                            for (var i = 0; i < element.bindingElementsIds.length; i++) {
                                                ko.applyBindings(viewModel, jQuery("#" + element.bindingElementsIds[i])[0]);
                                            }
                                        }
                                        else {
                                            ko.applyBindings(viewModel, jQuery("#" + id)[0]);
                                        }
                                        deferred.resolve();
                                    });
                                    loadResource.fail(function (jqxhr, settings, exception) {
                                        deferred.reject(jqxhr, settings, exception);
                                    });
                                });
                                sectionScriptRequest.fail(function (jqxhr, settings, exception) {
                                    deferred.reject(jqxhr, settings, exception);
                                });
                            });

                            sectionContentRequestPromises.push(sectionContentRequestPromise);

                            sectionContentRequest.fail(function (jqxhr, settings, exception) {
                                deferred.reject(jqxhr, settings, exception);
                            });
                        })(secList[i], i == secList.length - 1);
                    };

                    jQuery("#navigation-items").append("<li class='navbar-innosabitext'><a id='ni-innosabi' href='https://campus-fc.daimler.com/BFDTinAction2017/InnovationChallengeBestFinanceDaimlerTrucks' target='_blank'>Innosabi</a></li>");

                    jQuery.when.apply(jQuery, sectionContentRequestPromises).done(function () {

                        // corrections of navigation indicator placement
                        var navIndicatorHeightOffset = (jQuery("#navigation-indicator").innerHeight()) / 2;
                        jQuery("#navscroll").css("top", "calc(50% - " + (navIndicatorHeightOffset) + "px)");

                        // activate bootstrap scrollspy
                        //jQuery("body").attr("position", "relative");

                        //jQuery("body").scrollspy({ target: ".navbar", offset: 5 });

                        // use scrollspy event to update right-side-navigation-indicator
                        //jQuery("body").on('activate.bs.scrollspy', function () {
                        //    var activeItem = jQuery(".nav li.active > a")[0].id;
                        //    var navigationIndicator = "ns-" + (activeItem.split("-")[1]);
                        //    BestFinance.LandingPage.SectionLoader.activeModule = (activeItem.split("-")[1]) == "Home" ? "Home" : "cm-" + (activeItem.split("-")[1]);
                        //    BestFinance.LandingPage.SectionLoader.activeModulePosition = jQuery("#" + BestFinance.LandingPage.SectionLoader.activeModule).position().top;
                        //    jQuery("#navigation-indicator a i").each(function () {
                        //        jQuery(this).removeClass("fa-circle").addClass("fa-circle-o");
                        //    });
                        //    jQuery("#" + navigationIndicator + " i").addClass("fa-circle");
                        //    jQuery("#" + BestFinance.LandingPage.SectionLoader.activeModule + " [data-animation], #Home [data-animation]").each(function (index, element) {
                        //        jQuery(this).animateCss(element.dataset.animation);
                        //    });
                        //});

                        // use PageUp / PageDown key for scrolling to previous / next section
                        jQuery("body").keydown(function (event) {
                            switch (event.which) {
                                case 33:
                                    event.preventDefault();
                                    SectionLoader.pageUp();
                                    break;
                                case 34:
                                    event.preventDefault();
                                    SectionLoader.pageDown();
                                    break;
                            }
                        });

                        //jQuery(window).resize(function () {
                        //    scrollToHash("#" + BestFinance.LandingPage.SectionLoader.activeModule);
                        //});

                        // smooth scrolling
                        jQuery("#navbar a, #navscroll a, #navicon a, #mediaFrame a").on('click', function (event) {
                            if (this.hash !== "") {
                                event.preventDefault();
                                SectionLoader.scrollToHash(this.hash);
                            }
                        });

                        // parallax scrolling
                        //jQuery(window).scroll(function (e) {
                        //    var position = jQuery(window).scrollTop();
                        //
                        //    jQuery('.parallax-bg').css('bottom', -(position * 0.2) + 'px');
                        //});

                        // activate bootstrap tooltips on the page
                        jQuery(function () {
                            jQuery('[data-toggle="tooltip"]').tooltip()
                        });

                        deferred.resolve();
                    });
                });
                loadConfig.fail(function (jqXHR, textStatus) {
                    console.log('Error while loading config: ' + jqXHR.responseText);
                    deferred.reject();
                });

                location.hash = "Home";

                return deferred.promise();
            }


            SectionLoader.scrollToHash =  function (hash) {
                jQuery('html, body').animate({
                    scrollTop: jQuery(hash).offset().top
                }, 800, function () {
                    window.location.hash = hash;
                    jQuery(hash + " [data-animation]").each(function (index, element) {
                        jQuery(this).animateCss(element.dataset.animation);
                    });
                });
            }

            SectionLoader.pageUp = function () {
                var activeItem = jQuery(".nav li.active > a")[0].id;
                var navigationItems = jQuery("#navigation-items li a");
                for (var i = 1; i < navigationItems.length; i++) {
                    if (navigationItems[i].id == activeItem) {
                        SectionLoader.scrollToHash(navigationItems[i - 1].hash);
                    }
                }
            }
            SectionLoader.pageDown = function () {
                var activeItem = jQuery(".nav li.active > a")[0].id;
                var navigationItems = jQuery("#navigation-items li a");
                for (var i = 0; i < navigationItems.length - 1; i++) {
                    if (navigationItems[i].id == activeItem) {
                        SectionLoader.scrollToHash(navigationItems[i + 1].hash);
                    }
                }
            }

            SectionLoader.ViewModel = function () {
                var viewModel = this;
            }
        }(TeachersBook.SectionLoader = TeachersBook.SectionLoader || {}));
}(window.TeachersBook = window.TeachersBook || {}));

jQuery.fn.extend({
    animateCss: function (animationName) {
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        this.removeClass("hidden");
        this.addClass('animated ' + animationName).one(animationEnd, function () {
            //jQuery(this).removeClass('animated ' + animationName);
        });
    }
});