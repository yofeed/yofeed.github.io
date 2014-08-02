var title = $(".site-title").text();
var map = { };
var index = 1;
var typing_speed = 125;
for(i=1;i<title.length+1;i++){
    map[i] = title.substring(0,i)+"_";
    setTimeout(function(){
        $(".site-title").text(map[index]);
        console.log(map[index]);
        console.log(index);
        index += 1;
    }, i*typing_speed);
}
setTimeout(function(){
    $(".site-title").text($(".site-title").text().substring(0,title.length));
    $(".site-title").append('<blink>_</blink>');
}, (title.length+1)*typing_speed)
