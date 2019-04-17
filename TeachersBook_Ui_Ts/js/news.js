(function (Kip) {
    (function (Homepage) {
        (function (News) {
            var url = window.location.protocol + "//" + window.location.host + _spPageContextInfo.siteServerRelativeUrl;
            url = url.substring(url.length - 1,1) == "/" ? url.substr(0, url.length - 1) : url;
            var listName = "News";
            var newsItemTemplate = '<li style="display:{{CssDisplay}};" class="news-item">' +
                '<table cellpadding="4">' +
                '<tbody>' +
                '<tr>' +
                '<td><a href="#" onclick="Kip.Homepage.News.openModalDialog({{Id}})"><span class="news-item-headline">{{Title}}</span></a></td>' +
                '</tr>' +
                '<tr>' +
                '<td><div class="news-item-body">{{Content}}</div></td>' +
                '</tr>' +
                '</tbody>' +
                '</table>' +
                '</li>';

            News.allNewsContent = [];

            jQuery(document).ready(function () {
                                
                var getNews = Kip.SharePoint.RestApi.getListItems(url, listName, "Title,Content,Author/Title", "Author", null, "Id desc");

                getNews.done(function (data) {
                    var news = data.d.results;


                    for (var i = 0; i < news.length; i++) {
                        var newsItem = {};
                        var contentShorten = news[i].Content.length > 350 ? jQuery(news[i].Content).text().substr(0, 350) + "..." : jQuery(news[i].Content).text();
                        newsItem.Title = news[i].Title;
                        newsItem.Content = news[i].Content;
                        newsItem.PlainShortContent = contentShorten;
                        var cssDisplay = i >= 4 ? 'none' : '';
                        var newNewsItem = newsItemTemplate.replace('{{CssDisplay}}', cssDisplay).replace('{{Title}}', news[i].Title).replace('{{Content}}', contentShorten).replace('{{Id}}', i);

                        News.allNewsContent.push(newsItem);
                        jQuery(".news").append(newNewsItem);
                    }

                    $(".news").bootstrapNews({
                        newsPerPage: 4,
                        autoplay: true,
                        pauseOnHover: true,
                        direction: 'up',
                        newsTickerInterval: 10000,
                        onToDo: function () {
                            //console.log(this);
                        }
                    });
                });

                getNews.fail(function (error, e) {
                    console.log("Error while fatching last news!");
                });
            });

            News.openModalDialog = function (id) {
                jQuery("#modalTitle").text(News.allNewsContent[id].Title);
                jQuery("#modalContent").html(News.allNewsContent[id].Content);
                jQuery("#newsDetails").modal('toggle');
            }

        }(Homepage.News = Homepage.News || {}));
    }(Kip.Homepage = Kip.Homepage || {}));
}(window.Kip = window.Kip || {}));