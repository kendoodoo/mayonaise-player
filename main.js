var mainclass=document.querySelector(".player");document.head.innerHTML+=`<style>#context-menu{border:.2px solid #fff;border-radius:4px;position:fixed;z-index:10000;width:150px;background:#111;transform:scale(0);transform-origin:top left}#context-menu.visible{transform:scale(1)}#context-menu .item{padding:8px 10px;font-size:15px;color:#eee;cursor:pointer;border-radius:inherit}#context-menu .item:hover{background:#343434}video{width:${mainclass.getAttribute("w")||"100%"}; height: ${mainclass.getAttribute("h")||"250px"};background-color:#000}.player *{font-family:"Open Sans",sans-serif}.player{width:100%;position:relative;font-size:0;overflow:hidden}.player-slider{width:100%;outline:0}.playbtn-play,.playbtn-replay,.player-playbtn{width:20px;height:20px;cursor:pointer;margin-right:5px}#slider-container{width:calc(100% - 20px - 28px)}.player-playbtn{background:url('https://i.ibb.co/qddwDC6/image-697-1.png') 0 0/100%}.playbtn-play{background:url('https://i.ibb.co/sFkN8pg/image-678.png') 0 0/100%}.playbtn-replay{background:url('https://i.ibb.co/Lv37hp3/image-759.png') 0 0/100%}.player-controls{height:45px;display:flex;position:absolute;bottom:0;width:100%;flex-wrap:wrap;background:rgba(0,0,0,.4);transform:translateY(0);align-items:center;justify-content:center}</style>`,mainclass.innerHTML=`<video class="main" src="${mainclass.getAttribute("vidsrc")}"></video><div class="player-controls"><div class="player-playbtn"></div><p id="slider-container"><input style="cursor:pointer" type="range" min="0" class="player-slider"></p></div><div id="context-menu"><div class="item">loop</div><div class="item">embed</div> <div class="item">video info</div><div class="item">about</div></div>`;const contextMenu=document.getElementById("context-menu"),scope=document.querySelector(".player"),normalizePozition=(e,t)=>{let{left:l,top:i}=scope.getBoundingClientRect();l=l<0?0:l,i=i<0?0:i;let n=e-l,a=t-i,s=n+contextMenu.clientWidth>scope.clientWidth,r=a+contextMenu.clientHeight>scope.clientHeight,o=e,p=t;return s&&(o=l+scope.clientWidth-contextMenu.clientWidth),r&&(p=i+scope.clientHeight-contextMenu.clientHeight),{normalizedX:o,normalizedY:p}};scope.addEventListener("contextmenu",e=>{e.preventDefault();let{clientX:t,clientY:l}=e,{normalizedX:i,normalizedY:n}=normalizePozition(t,l);contextMenu.classList.remove("visible"),contextMenu.style.top=`${n}px`,contextMenu.style.left=`${i}px`,setTimeout(()=>{contextMenu.classList.add("visible")})}),document.body.addEventListener("click",e=>{e.target.offsetParent!=contextMenu&&contextMenu.classList.remove("visible")});const player=document.querySelector("video"),slider=document.querySelector(".player-slider"),playbutton=document.querySelector(".player-playbtn");slider.value=0;var classlist=playbutton.classList;playbutton.onclick=function(){classlist.remove("playbtn-replay"),classlist.toggle("playbtn-play"),classlist.contains("playbtn-play")?(classlist.add("playbtn-play"),slider.setAttribute("max",Math.floor(player.duration)),player.play()):(classlist.remove("playbtn-play"),player.pause())},player.addEventListener("ended",function(){classlist.remove("playbtn-play"),classlist.add("playbtn-replay")}),player.addEventListener("timeupdate",()=>{slider.value=player.currentTime},!1),slider.addEventListener("input",()=>{player.currentTime=slider.value,player.play()}),slider.onmousedown=function(){player.pause()},document.body.onkeyup=function(e){(" "==e.code||"Space"==e.code||32==e.keyCode)&&(!1===player.paused?(classlist.remove("playbtn-play"),player.pause()):(classlist.add("playbtn-play"),player.play()))};