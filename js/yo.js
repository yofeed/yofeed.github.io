// Tocca.js
/*! Tocca.js v0.0.8 || Gianluca Guarini */
!function(a,b){"use strict";if("function"!=typeof a.createEvent)return!1;var c,d,e,f,g,h="undefined"!=typeof jQuery,i=!!("ontouchstart"in window)&&navigator.userAgent.indexOf("PhantomJS")<0,j=function(a,b,c){for(var d=b.split(" "),e=d.length;e--;)a.addEventListener(d[e],c,!1)},k=function(a){return a.targetTouches?a.targetTouches[0]:a},l=function(b,e,f,g){var i=a.createEvent("Event");if(g=g||{},g.x=c,g.y=d,g.distance=g.distance,h)jQuery(b).trigger(e,g);else{i.originalEvent=f;for(var j in g)i[j]=g[j];i.initEvent(e,!0,!0),b.dispatchEvent(i)}},m=!1,n=b.SWIPE_TRESHOLD||80,o=b.TAP_TRESHOLD||200,p=b.TAP_PRECISION/2||30,q=0;i=b.JUST_ON_TOUCH_DEVICES?!0:i,j(a,i?"touchstart":"mousedown",function(a){var b=k(a);e=c=b.pageX,f=d=b.pageY,m=!0,q++,clearTimeout(g),g=setTimeout(function(){e>=c-p&&c+p>=e&&f>=d-p&&d+p>=f&&!m&&l(a.target,2===q?"dbltap":"tap",a),q=0},o)}),j(a,i?"touchend":"mouseup",function(a){var b=[],g=f-d,h=e-c;if(m=!1,-n>=h&&b.push("swiperight"),h>=n&&b.push("swipeleft"),-n>=g&&b.push("swipedown"),g>=n&&b.push("swipeup"),b.length)for(var i=0;i<b.length;i++){var j=b[i];l(a.target,j,a,{distance:{x:Math.abs(h),y:Math.abs(g)}})}}),j(a,i?"touchmove":"mousemove",function(a){var b=k(a);c=b.pageX,d=b.pageY})}(document,window);

$(document).ready(function(){
    var qs = (function(a) {
        if (a == "") return {};
        var b = {};
        for (var i = 0; i < a.length; ++i)
        {
            var p=a[i].split('=');
            if (p.length != 2) continue;
            b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
        }
        return b;
    })(window.location.search.substr(1).split('&'));
    //window.history.replaceState("","",window.location.pathname);
    try{
        if(qs["username"].length>0){ $("title").text("Yo "+ qs["username"] + "!");}
    }
    catch(error){}
    $(".main-title").text(qs["h1"]);
    if(qs["h1"]=="YOUR FEEDS"){
        $('.success').toggle();
    }
    colors = ["#3498DB", "#34495E", "#2ECC71","#16A085", "none"]
    if("info" in qs){
        links = qs["info"].split('@$')
        if(links.length==0){$('.links').text("None!")}
        for(i=0;i<links.length;i++){
            feed_info = links[i].split('$s$')
            feed_link = feed_info[0]
            feed_title = feed_info[1]
            last_title = feed_info[2]
            last_link = feed_info[3]
            feed_row = '<div class="row" style="background-color:'+colors[i % 5]+';"><div class="contain">'
            feed_row += '<h3 class="link">'+feed_title+'</h3><br>'
            feed_row += '<a class="action-link feed" href="'+feed_link+'">FEED</a>'
            if(last_link!='None'){
                feed_row+='<a class="action-link latest-post" href="'+last_link+'">LATEST POST</a>'
            }
            feed_row += '<a class="action-link remove" href="http://api.alex.miller.im/yofeed-remove?username='+qs["username"]+'&feed='+encodeURIComponent(feed_link)+'&token='+qs["token"]+'">REMOVE</a>'
            feed_row += '</div></div>'
            $('.links').append(feed_row)
        }
        $('.links').append('<div class="contain"><p style="text-align: center; margin-top: 10px; font-size: .8em;">Yo us at any time to receive a Yolink back to this page</p></div>')
    }
    $("#add-link").attr("href","http://www.yofeed.rocks/add-feed/?username="+qs["username"]+"&token="+qs["token"])
    if("error" in qs){
        $('.main-contain').html('Please send a valid link.')
        $('.main-contain').html('<h2>'+qs["message"]+'</h2>')
        if(qs["error"]!=0){
            $('.add-contain').toggle();
        }
    }
    $(".action-link").on("tap", function(e,d){
        var count = 0;
        setInterval(function(){
          count++;
          e.innerHTML = new Array(count % 10).join('.');
        }, 150);
    });
    $(".feed").on("click",function(){
        if(qs["username"] && qs["username"].length>0){ ga('send', 'event', qs["username"], 'Action Link: FEED', $(this).attr("href")); }
        else{ ga('send', 'event', '_anonymous_', 'Action Link: FEED', $(this).attr("href")); }
        console.log(qs["username"], 'Action Link: FEED', $(this).attr("href"));

    });
    $(".latest-post").on("click",function(){
        if(qs["username"] && qs["username"].length>0){ ga('send', 'event', qs["username"], 'Action Link: LATEST POST', $(this).attr("href")); }
        else{ ga('send', 'event', '_anonymous_', 'Action Link: LATEST POST', $(this).attr("href")); }
        console.log(qs["username"], 'Action Link: LATEST POST', $(this).attr("href"));

    });
    $(".remove").on("click",function(){
        if(qs["username"] && qs["username"].length>0){ ga('send', 'event', qs["username"], 'Action Link: REMOVE', $(this).attr("href")); }
        else{ ga('send', 'event', '_anonymous_', 'Action Link: REMOVE', $(this).attr("href")); }

    });

    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

    ga('create', 'UA-54605726-1', 'auto');
    ga('send', 'pageview');
    if(qs["username"] && qs["username"].length>0){ ga('set', 'dimension1', qs["username"]); }
});

