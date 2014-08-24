$(document).ready(function(){
    var title = $(".site-title").text();
    var map = { };
    var index = 1;
    var typing_speed = 125;
    for(i=1;i<title.length+1;i++){
        map[i] = title.substring(0,i)+"_";
        setTimeout(function(){
            $(".site-title").text(map[index]);
            index += 1;
        }, i*typing_speed);
    }
    setTimeout(function(){
        $(".site-title").text($(".site-title").text().substring(0,title.length));
        $(".site-title").append('<blink>_</blink>');
    }, (title.length+1)*typing_speed);
    $(".site-title").hover(
        function(){$(this).addClass("glitch");},
        function(){$(this).removeClass("glitch");}
    );
    console.log('helloworld')
    $('.article-card').each(function(i, card){
        $($(card).find('.article-text')[0]).css('height', $(card).find('.article-img')[0].offsetHeight);
        var H = $(card).find('.article-img')[0].offsetHeight - $(card).find('.provider-text')[0].offsetHeight - $(card).find('.post-date')[0].offsetHeight-5;
        var T = $(card).find('.post-link span')[0];
        if (T.offsetHeight > H) {
            console.log('fixing');
            $(T).text(function (index, text) {
                return text.replace(/\W*\s(\S)*$/, '...');
            });
        }
    });
});



var BrowserDetect =
{
    init: function ()
    {
        this.browser = this.searchString(this.dataBrowser) || "Other";
        this.version = this.searchVersion(navigator.userAgent) ||       this.searchVersion(navigator.appVersion) || "Unknown";
    },

    searchString: function (data)
    {
        for (var i=0 ; i < data.length ; i++)
        {
            var dataString = data[i].string;
            this.versionSearchString = data[i].subString;

            if (dataString.indexOf(data[i].subString) != -1)
            {
                return data[i].identity;
            }
        }
    },

    searchVersion: function (dataString)
    {
        var index = dataString.indexOf(this.versionSearchString);
        if (index == -1) return;
        return parseFloat(dataString.substring(index+this.versionSearchString.length+1));
    },

    dataBrowser:
    [
        { string: navigator.userAgent, subString: "Chrome",  identity: "Chrome" },
        { string: navigator.userAgent, subString: "MSIE",    identity: "Explorer" },
        { string: navigator.userAgent, subString: "Firefox", identity: "Firefox" },
        { string: navigator.userAgent, subString: "Safari",  identity: "Safari" },
        { string: navigator.userAgent, subString: "Opera",   identity: "Opera" }
    ]

};
BrowserDetect.init();
if(BrowserDetect.browser == 'Explorer' || BrowserDetect.browser == 'Other'){
    $(".blur-fill.fore").css({
       "max-width": "100%",
       "max-height": "100%",
       "width": "100%",
       "height": "100%"
    });
}
else{
}
