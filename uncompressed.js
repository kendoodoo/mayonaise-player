// setup
var mainclass = document.querySelector('.player')
document.head.innerHTML += `<style>#context-menu{border:.2px solid #fff;border-radius:4px;position:fixed;z-index:10000;width:150px;background:#111;transform:scale(0);transform-origin:top left}#context-menu.visible{transform:scale(1)}#context-menu .item{padding:8px 10px;font-size:15px;color:#eee;cursor:pointer;border-radius:inherit}#context-menu .item:hover{background:#343434}video{width:${mainclass.getAttribute('w') || '100%'}; height: ${mainclass.getAttribute('h') || '250px'};background-color:#000}.player *{font-family:"Open Sans",sans-serif}.player{width:100%;position:relative;font-size:0;overflow:hidden}.player-slider{width:100%;outline:0}.playbtn-play,.playbtn-replay,.player-playbtn{width:20px;height:20px;cursor:pointer;margin-right:5px}#slider-container{width:calc(100% - 20px - 28px)}.player-playbtn{background:url('https://i.ibb.co/qddwDC6/image-697-1.png') 0 0/100%}.playbtn-play{background:url('https://i.ibb.co/sFkN8pg/image-678.png') 0 0/100%}.playbtn-replay{background:url('https://i.ibb.co/Lv37hp3/image-759.png') 0 0/100%}.player-controls{height:45px;display:flex;position:absolute;bottom:0;width:100%;flex-wrap:wrap;background:rgba(0,0,0,.4);transform:translateY(0);align-items:center;justify-content:center}</style>`;
mainclass.innerHTML = `<video class="main" src="${mainclass.getAttribute('vidsrc')}"></video><div class="player-controls"><div class="player-playbtn"></div><p id="slider-container"><input style="cursor:pointer" type="range" min="0" class="player-slider"></p></div><div id="context-menu"><div class="item">loop</div><div class="item">embed</div> <div class="item">video info</div><div class="item">about</div></div>`;


// code for right-click menu
const contextMenu = document.getElementById("context-menu");
      const scope = document.querySelector(".player");

      const normalizePozition = (mouseX, mouseY) => {
        // ? compute what is the mouse position relative to the container element (scope)
        let {
          left: scopeOffsetX,
          top: scopeOffsetY,
        } = scope.getBoundingClientRect();
        
        scopeOffsetX = scopeOffsetX < 0 ? 0 : scopeOffsetX;
        scopeOffsetY = scopeOffsetY < 0 ? 0 : scopeOffsetY;
       
        const scopeX = mouseX - scopeOffsetX;
        const scopeY = mouseY - scopeOffsetY;

        // ? check if the element will go out of bounds
        const outOfBoundsOnX =
          scopeX + contextMenu.clientWidth > scope.clientWidth;

        const outOfBoundsOnY =
          scopeY + contextMenu.clientHeight > scope.clientHeight;

        let normalizedX = mouseX;
        let normalizedY = mouseY;

        // ? normalize on X
        if (outOfBoundsOnX) {
          normalizedX =
            scopeOffsetX + scope.clientWidth - contextMenu.clientWidth;
        }

        // ? normalize on Y
        if (outOfBoundsOnY) {
          normalizedY =
            scopeOffsetY + scope.clientHeight - contextMenu.clientHeight;
        }

        return { normalizedX, normalizedY };
      };

      scope.addEventListener("contextmenu", (event) => {
        event.preventDefault();

        const { clientX: mouseX, clientY: mouseY } = event;

        const { normalizedX, normalizedY } = normalizePozition(mouseX, mouseY);

        contextMenu.classList.remove("visible");

        contextMenu.style.top = `${normalizedY}px`;
        contextMenu.style.left = `${normalizedX}px`;

        setTimeout(() => {
          contextMenu.classList.add("visible");
        });
      });

      document.body.addEventListener("click", (e) => {
        // ? close the menu if the user clicks outside of it
        if (e.target.offsetParent != contextMenu) {
          contextMenu.classList.remove("visible");
        }
      });

// code for player controls

const player = document.querySelector('video')
const slider = document.querySelector('.player-slider')
const playbutton = document.querySelector('.player-playbtn')

slider.value = 0;
var classlist = playbutton.classList
playbutton.onclick = function() {
  classlist.remove('playbtn-replay')
  classlist.toggle("playbtn-play")
  if (!classlist.contains('playbtn-play')) {
    classlist.remove("playbtn-play")
    player.pause()
  } else {
    classlist.add("playbtn-play")
    slider.setAttribute('max', Math.floor(player.duration))
    player.play()
  }
}

player.addEventListener('ended', function() {
  classlist.remove("playbtn-play")
  classlist.add("playbtn-replay")
});

player.addEventListener('timeupdate', () => {
    slider.value = player.currentTime
}, false)

slider.addEventListener('input', () => {
    player.currentTime = slider.value;
    player.play()
})

slider.onmousedown = function() {
  player.pause()
}

document.body.onkeyup = function(e) {
  if (e.code == " " || e.code == "Space" || e.keyCode == 32) {
    if (player.paused === false) {
    classlist.remove("playbtn-play")
    player.pause()
  } else {
    classlist.add("playbtn-play")
    player.play()
  } 
  }
  
}
