var mainclass=document.querySelector(".player");var all=document.querySelector(".player-controls");
document.querySelector('video').width = window.innerHeight
document.head.innerHTML+="<style>#context-menu{border:.2px solid #fff;border-radius:4px;position:fixed;z-index:10000;width:150px;background:#111;transform:scale(0);transform-origin:top left}#context-menu.visible{transform:scale(1)}#context-menu .item{padding:8px 10px;font-size:15px;color:#eee;cursor:pointer;border-radius:inherit}#context-menu .item:hover{background:#343434}video{width:"+(mainclass.getAttribute("w")||"100%")+"; height: "+(mainclass.getAttribute("h")||"250px")+";background-color:#000}.player *{font-family:\"Open Sans\",sans-serif}.player{width:100%;position:relative;font-size:0;overflow:hidden}.player-slider{width:100%;outline:0}.playbtn-play,.playbtn-replay,.player-playbtn{width:20px;height:20px;cursor:pointer;margin-right:5px}#slider-container{width:calc(100% - 20px - 28px)}.player-playbtn{background:url('https://i.ibb.co/qddwDC6/image-697-1.png') 0 0/100%}.playbtn-play{background:url('https://i.ibb.co/sFkN8pg/image-678.png') 0 0/100%}.playbtn-replay{background:url('https://i.ibb.co/Lv37hp3/image-759.png') 0 0/100%}.player-controls{height:45px;display:flex;position:absolute;bottom:0;width:100%;flex-wrap:wrap;background:rgba(0,0,0,.4);transform:translateY(0);align-items:center;justify-content:center}</style>";
mainclass.innerHTML='<video class="main" src="'+mainclass.getAttribute("vidsrc")+'"></video><div class="player-controls"><div class="player-playbtn"></div><p id="slider-container"><input style="cursor:pointer" type="range" min="0" class="player-slider"></p></div><div id="context-menu"><div class="item">loop</div><div class="item">embed</div> <div class="item">video info</div><div class="item">about</div></div>';var contextMenu=document.getElementById("context-menu");var scope=document.querySelector(".player");
var normalizePozition=function(mouseX,mouseY){var $jscomp$destructuring$var0=scope.getBoundingClientRect();var scopeOffsetX=$jscomp$destructuring$var0.left;var scopeOffsetY=$jscomp$destructuring$var0.top;scopeOffsetX=scopeOffsetX<0?0:scopeOffsetX;scopeOffsetY=scopeOffsetY<0?0:scopeOffsetY;var scopeX=mouseX-scopeOffsetX;var scopeY=mouseY-scopeOffsetY;var outOfBoundsOnX=scopeX+contextMenu.clientWidth>scope.clientWidth;var outOfBoundsOnY=scopeY+contextMenu.clientHeight>scope.clientHeight;var normalizedX=
mouseX;var normalizedY=mouseY;if(outOfBoundsOnX)normalizedX=scopeOffsetX+scope.clientWidth-contextMenu.clientWidth;if(outOfBoundsOnY)normalizedY=scopeOffsetY+scope.clientHeight-contextMenu.clientHeight;return{normalizedX:normalizedX,normalizedY:normalizedY}};
scope.addEventListener("contextmenu",function(event){event.preventDefault();var $jscomp$destructuring$var1=event;var mouseX=$jscomp$destructuring$var1.clientX;var mouseY=$jscomp$destructuring$var1.clientY;var $jscomp$destructuring$var2=normalizePozition(mouseX,mouseY);var normalizedX=$jscomp$destructuring$var2.normalizedX;var normalizedY=$jscomp$destructuring$var2.normalizedY;contextMenu.classList.remove("visible");contextMenu.style.top=normalizedY+"px";contextMenu.style.left=normalizedX+"px";setTimeout(function(){contextMenu.classList.add("visible")})});
document.body.addEventListener("click",function(e){if(e.target.offsetParent!=contextMenu)contextMenu.classList.remove("visible")});var player=document.querySelector("video");var slider=document.querySelector(".player-slider");var playbutton=document.querySelector(".player-playbtn");slider.value=0;var classlist=playbutton.classList;
playbutton.onclick=function(){classlist.remove("playbtn-replay");classlist.toggle("playbtn-play");if(!classlist.contains("playbtn-play")){classlist.remove("playbtn-play");player.pause()}else{classlist.add("playbtn-play");slider.setAttribute("max",Math.floor(player.duration));player.play()}};player.addEventListener("ended",function(){classlist.remove("playbtn-play");classlist.add("playbtn-replay")});
player.addEventListener("play",function(){classlist.remove("playbtn-replay");classlist.remove("playbtn-play");classlist.add("playbtn-play")});player.addEventListener("timeupdate",function(){slider.value=player.currentTime},false);slider.addEventListener("input",function(){player.currentTime=slider.value; player.play()});slider.onmousedown=function(){player.pause()};
document.body.onkeyup=function(e){console.log(e.code);if(e.code==" "||e.code=="Space"||e.keyCode==32)if(player.paused===false){classlist.remove("playbtn-play");player.pause()}else{classlist.add("playbtn-play");player.play()}if(e.code=="ArrowLeft"||e.code=="ArrowRight")slider.focus()};
