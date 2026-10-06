const games = [
  {id:"snake",name:"Neon Snake",cat:"Arcade",players:"1.8k",thumb:"assets/snake.svg",popular:true},
  {id:"2048",name:"2048",cat:"Puzzle",players:"2.6k",thumb:"assets/2048.svg",popular:true},
  {id:"space",name:"Space Invaders",cat:"Arcade",players:"3.1k",thumb:"assets/space.svg",popular:true},
  {id:"reaction",name:"Reaction Test",cat:"Casual",players:"1.2k",thumb:"assets/reaction.svg",popular:true},
  {id:"mines",name:"Minesweeper",cat:"Puzzle",players:"1.1k",thumb:"assets/mines.svg"},
  {id:"typing",name:"Typing Race",cat:"Casual",players:"870",thumb:"assets/typing.svg"},
  {id:"aim",name:"Aim Trainer",cat:"Action",players:"940",thumb:"assets/aim.svg"},
  {id:"memory",name:"Memory Match",cat:"Puzzle",players:"640",thumb:"assets/memory.svg"},
  {id:"connect",name:"Connect 4",cat:"Strategy",players:"520",thumb:"assets/connect.svg"},
  {id:"tictactoe",name:"Tic Tac Toe",cat:"Strategy",players:"1.4k",thumb:"assets/tictactoe.svg"},
  {id:"brick",name:"Brick Breaker",cat:"Arcade",players:"760",thumb:"assets/brick.svg"},
  {id:"clicker",name:"Clicker Factory",cat:"Casual",players:"1.0k",thumb:"assets/clicker.svg"},
  {id:"doodle",name:"Doodle Jump",cat:"Platformer",players:"1.7k",thumb:"assets/doodle.svg"},
  {id:"pool",name:"Mini Pool",cat:"Sports",players:"420",thumb:"assets/pool.svg"},
  {id:"asteroids",name:"Asteroids",cat:"Action",players:"510",thumb:"assets/asteroids.svg"},
  {id:"tower",name:"Tower Defense",cat:"Strategy",players:"390",thumb:"assets/tower.svg"}
];

const cats=["All","Arcade","Casual","Puzzle","Action","Adventure","Simulation","Strategy","Sports","Platformer"];
let selectedCat="All";
const $=s=>document.querySelector(s);

function renderCategories(){
  $("#categories").innerHTML=cats.map(c=>`<button class="pill ${c===selectedCat?"active":""}" data-cat="${c}">${c}</button>`).join("");
  document.querySelectorAll("[data-cat]").forEach(b=>b.onclick=()=>{selectedCat=b.dataset.cat;renderCategories();renderGames()});
}
function card(g,big=false){
  return `<article class="${big?"popular-card":"game-card"}" data-game="${g.id}">
    <div class="thumb"><img src="${g.thumb}" alt=""><span class="tag">${g.cat}</span></div>
    <div class="${big?"popular-info":"game-info"}"><h3>${g.name}</h3><div class="meta"><span class="dot"></span><span>${g.players} playing</span></div></div>
  </article>`;
}
function renderGames(){
  const q=$("#gameSearch").value.trim().toLowerCase();
  const filtered=games.filter(g=>(selectedCat==="All"||g.cat===selectedCat)&&g.name.toLowerCase().includes(q));
  const popular=games.filter(g=>g.popular);
  $("#popularGrid").innerHTML=popular.map(g=>card(g,true)).join("");
  $("#gameGrid").innerHTML=filtered.map(g=>card(g)).join("");
  $("#gameCount").textContent=`${filtered.length} games`;
  document.querySelectorAll("[data-game]").forEach(el=>el.onclick=()=>openGame(el.dataset.game));
}
$("#gameSearch").addEventListener("input",renderGames);
$("#popPrev").onclick=()=>$("#popularGrid").scrollBy({left:-330,behavior:"smooth"});
$("#popNext").onclick=()=>$("#popularGrid").scrollBy({left:330,behavior:"smooth"});

function openGame(id){
  const g=games.find(x=>x.id===id);
  $("#modalCategory").textContent=g.cat.toUpperCase();
  $("#modalTitle").textContent=g.name;
  $("#gameModal").classList.remove("hidden");
  mountGame(id);
}
function closeGame(){ $("#gameModal").classList.add("hidden"); $("#gameMount").innerHTML=""; }
$("#closeModal").onclick=closeGame;
$("#gameModal").addEventListener("click",e=>{if(e.target.id==="gameModal")closeGame()});

function mountGame(id){
  const m=$("#gameMount");
  if(id==="snake") return snake(m);
  if(id==="2048") return game2048(m);
  if(id==="reaction") return reaction(m);
  if(id==="typing") return typing(m);
  if(id==="aim") return aim(m);
  if(id==="memory") return memory(m);
  if(id==="connect") return connect4(m);
  if(id==="tictactoe") return ttt(m);
  if(id==="brick") return brick(m);
  if(id==="clicker") return clicker(m);
  m.innerHTML=`<div class="game-shell"><div class="game-panel big-message"><h3>${games.find(g=>g.id===id).name}</h3><p>This game card is live and the game slot is ready for the next Klyro engine module.</p><button class="game-btn" onclick="closeGame()">Back to games</button></div></div>`;
}

function shell(m,html){m.innerHTML=`<div class="game-shell"><div class="game-panel">${html}</div></div>`}

function snake(m){
 shell(m,`<div class="game-toolbar"><span>Arrow keys / WASD</span><span class="score">Score: <b id="snakeScore">0</b></span><button class="game-btn" id="snakeStart">Start</button></div><div class="canvas-wrap"><canvas id="snakeCanvas" class="game-canvas" width="420" height="420"></canvas></div><p class="mini-note center">Eat the bright blocks. Don't hit the wall or yourself.</p>`);
 const c=$("#snakeCanvas"),x=c.getContext("2d"),N=21,S=20;let body=[{x:10,y:10}],dir={x:1,y:0},food={x:15,y:10},run=false,score=0,timer;
 function draw(){x.fillStyle="#050a12";x.fillRect(0,0,c.width,c.height);x.fillStyle=getComputedStyle(document.documentElement).getPropertyValue("--accent")||"#6d7cff";body.forEach(p=>x.fillRect(p.x*S+2,p.y*S+2,S-4,S-4));x.fillStyle="#7dffb2";x.fillRect(food.x*S+3,food.y*S+3,S-6,S-6)}
 function spawn(){do{food={x:Math.floor(Math.random()*N),y:Math.floor(Math.random()*N)}}while(body.some(p=>p.x===food.x&&p.y===food.y))}
 function step(){let h={x:body[0].x+dir.x,y:body[0].y+dir.y};if(h.x<0||h.y<0||h.x>=N||h.y>=N||body.some(p=>p.x===h.x&&p.y===h.y)){run=false;clearInterval(timer);alert("Game over");return}body.unshift(h);if(h.x===food.x&&h.y===food.y){score++;$("#snakeScore").textContent=score;spawn()}else body.pop();draw()}
 $("#snakeStart").onclick=()=>{body=[{x:10,y:10}];dir={x:1,y:0};score=0;$("#snakeScore").textContent=0;spawn();clearInterval(timer);run=true;timer=setInterval(step,105);draw()};
 document.onkeydown=e=>{if(!run)return;const k=e.key.toLowerCase();if((k==="arrowup"||k==="w")&&dir.y!==1)dir={x:0,y:-1};if((k==="arrowdown"||k==="s")&&dir.y!==-1)dir={x:0,y:1};if((k==="arrowleft"||k==="a")&&dir.x!==1)dir={x:-1,y:0};if((k==="arrowright"||k==="d")&&dir.x!==-1)dir={x:1,y:0}};draw();
}

function game2048(m){
 shell(m,`<div class="game-toolbar"><span>Use arrow keys</span><span class="score">Score: <b id="s2048">0</b></span><button class="game-btn" id="r2048">New Game</button></div><div id="board2048" style="display:grid;grid-template-columns:repeat(4,1fr);gap:8px;max-width:430px;margin:auto"></div>`);
 const b=$("#board2048");let a=[],score=0;
 function reset(){a=Array(16).fill(0);score=0;add();add();draw()}
 function add(){const z=a.map((v,i)=>v?null:i).filter(v=>v!==null);if(z.length)a[z[Math.floor(Math.random()*z.length)]]=Math.random()<.9?2:4}
 function draw(){b.innerHTML=a.map(v=>`<div style="aspect-ratio:1;border-radius:10px;display:grid;place-items:center;background:${v?`color-mix(in srgb,var(--accent) ${Math.min(18+Math.log2(v)*4,55)}%,#111b2e)`:"#0b1220"};color:#fff;font-size:22px;font-weight:800">${v||""}</div>`).join("");$("#s2048").textContent=score}
 function move(dir){let lines=[];for(let r=0;r<4;r++){let line=dir==="h"?a.slice(r*4,r*4+4):[a[r],a[r+4],a[r+8],a[r+12]];if(dir==="right"||dir==="down")line.reverse();line=line.filter(Boolean);for(let i=0;i<line.length-1;i++)if(line[i]===line[i+1]){line[i]*=2;score+=line[i];line.splice(i+1,1)}while(line.length<4)line.push(0);if(dir==="right"||dir==="down")line.reverse();lines.push(line)}for(let r=0;r<4;r++)for(let c=0;c<4;c++)a[r*4+c]=dir==="h"?lines[r][c]:lines[c][r];add();draw()}
 document.onkeydown=e=>{if(!$("#gameModal").classList.contains("hidden")){let k=e.key.toLowerCase();if(k.includes("arrow"))move(k==="arrowleft"?"left":k==="arrowright"?"right":k==="arrowup"?"up":"down")}};$("#r2048").onclick=reset;reset();
}

function reaction(m){
 shell(m,`<div id="reactBox" style="min-height:300px;border-radius:15px;display:grid;place-items:center;background:#121b2d;cursor:pointer"><div class="center"><h3 id="reactText">Tap Start</h3><p id="reactSub" class="mini-note">Wait for the panel to turn green.</p></div></div><div class="center" style="margin-top:12px"><button class="game-btn" id="reactStart">Start</button><span class="score" style="margin-left:12px">Best: <b id="reactBest">--</b> ms</span></div>`);
 const box=$("#reactBox"),text=$("#reactText"),sub=$("#reactSub"),start=$("#reactStart"),best=$("#reactBest");let timer,startAt,armed=false;
 start.onclick=()=>{clearTimeout(timer);armed=false;text.textContent="Wait...";sub.textContent="";box.style.background="#151d2f";timer=setTimeout(()=>{armed=true;startAt=performance.now();box.style.background="#1f8f64";text.textContent="TAP";},800+Math.random()*2600)};
 box.onclick=()=>{if(!armed)return;if(startAt){let ms=Math.round(performance.now()-startAt);best.textContent=ms;text.textContent=ms+" ms";sub.textContent="Nice. Try again.";box.style.background="#121b2d";armed=false}}
}

function typing(m){
 const words=["nebula","rocket","pixel","galaxy","arcade","velocity","planet","shadow","meteor","orbit"];const phrase=Array.from({length:10},()=>words[Math.floor(Math.random()*words.length)]).join(" ");
 shell(m,`<div class="center"><p class="mini-note">Type the line exactly as fast as you can</p><h3 id="typePhrase" style="line-height:1.7">${phrase}</h3><input id="typeInput" class="typing-input" placeholder="Start typing..." autocomplete="off"><p class="score">WPM: <b id="wpm">0</b></p></div>`);
 const input=$("#typeInput"),started={t:0};input.oninput=()=>{if(!started.t)started.t=performance.now();const val=input.value;if(val===phrase){const mins=(performance.now()-started.t)/60000;$("#wpm").textContent=Math.round(phrase.split(" ").length/mins);input.disabled=true}else{$("#wpm").textContent=Math.max(0,Math.round((val.trim().split(/\s+/).filter(Boolean).length||0)/Math.max((performance.now()-started.t)/60000,.01)))}}
}

function aim(m){
 shell(m,`<div class="game-toolbar"><span>Hit 20 targets</span><span class="score">Hits: <b id="hits">0</b>/20</span><button class="game-btn" id="aimStart">Start</button></div><div id="aimArea" style="height:360px;border-radius:14px;background:#060b14;border:1px solid rgba(160,180,230,.1);position:relative;overflow:hidden"></div>`);
 const area=$("#aimArea"),hits=$("#hits");let n=0;
 function spawn(){area.innerHTML="";const t=document.createElement("button");t.style.cssText=`position:absolute;width:44px;height:44px;border-radius:50%;border:2px solid white;background:var(--accent);left:${Math.random()*calc(100-10)+5}%;top:${Math.random()*calc(100-15)+5}%;cursor:pointer;box-shadow:0 0 25px color-mix(in srgb,var(--accent) 70%,transparent)`;t.onclick=()=>{n++;hits.textContent=n;if(n>=20){area.innerHTML='<div class="big-message"><h3>Done</h3><p>You cleared 20 targets.</p></div>'}else spawn()};area.appendChild(t)}
 function calc(v){return v}
 $("#aimStart").onclick=()=>{n=0;hits.textContent=0;spawn()}
}

function memory(m){
 const vals=["A","B","C","D","E","F","G","H"];let arr=[...vals,...vals];shell(m,`<div class="game-toolbar"><span>Match every pair</span><button class="game-btn" id="memStart">New Game</button></div><div id="memGrid" class="memory-grid"></div>`);
 const grid=$("#memGrid");let open=[],lock=false,matched=0;
 function reset(){arr.sort(()=>Math.random()-.5);open=[];lock=false;matched=0;grid.innerHTML=arr.map((v,i)=>`<button class="memory-tile" data-i="${i}" data-v="${v}">${v}</button>`).join("");grid.querySelectorAll(".memory-tile").forEach(x=>x.onclick=()=>flip(x))}
 function flip(el){if(lock||el.classList.contains("matched")||open.includes(el))return;el.classList.add("revealed");open.push(el);if(open.length===2){lock=true;setTimeout(()=>{if(open[0].dataset.v===open[1].dataset.v){open.forEach(x=>x.classList.add("matched"));matched+=2}else open.forEach(x=>x.classList.remove("revealed"));open=[];lock=false;if(matched===arr.length)grid.insertAdjacentHTML("afterend",'<p class="mini-note center">All pairs matched.</p>')},550)}}
 $("#memStart").onclick=reset;reset()
}

function connect4(m){
 shell(m,`<div class="game-toolbar"><span>Your turn: red</span><button class="game-btn" id="c4reset">Reset</button></div><div id="c4" class="connect-grid"></div><p id="c4msg" class="mini-note center">Connect four in a row.</p>`);
 const grid=$("#c4"),msg=$("#c4msg");let a=Array(42).fill(0),turn=1;
 function draw(){grid.innerHTML=a.map((v,i)=>`<button class="connect-cell ${v===1?"p1":v===2?"p2":""}" data-i="${i}"></button>`).join("");grid.querySelectorAll("button").forEach(b=>b.onclick=()=>drop(+b.dataset.i%7))}
 function win(p){for(let r=0;r<6;r++)for(let c=0;c<7;c++)for(const [dr,dc] of [[1,0],[0,1],[1,1],[1,-1]]){let ok=true;for(let k=0;k<4;k++){let rr=r+dr*k,cc=c+dc*k;if(rr<0||rr>=6||cc<0||cc>=7||a[rr*7+cc]!==p)ok=false}if(ok)return true}return false}
 function drop(col){if(turn!==1)return;for(let r=5;r>=0;r--)if(!a[r*7+col]){a[r*7+col]=1;if(win(1)){msg.textContent="You win";draw();return}turn=2;draw();setTimeout(ai,300);return}}
 function ai(){for(let c=0;c<7;c++){for(let r=5;r>=0;r--)if(!a[r*7+c]){a[r*7+c]=2;if(win(2)){msg.textContent="Computer wins";draw();return}a[r*7+c]=0;break}}let cols=[0,1,2,3,4,5,6].filter(c=>!a[c]);let col=cols[Math.floor(Math.random()*cols.length)];for(let r=5;r>=0;r--)if(!a[r*7+col]){a[r*7+col]=2;break}if(win(2)){msg.textContent="Computer wins"}else turn=1;draw()}
 $("#c4reset").onclick=()=>{a=Array(42).fill(0);turn=1;msg.textContent="Connect four in a row.";draw()};draw()
}

function ttt(m){
 shell(m,`<div class="game-toolbar"><span>Your turn: X</span><button class="game-btn" id="tttreset">Reset</button></div><div id="ttt" style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px;max-width:360px;margin:auto"></div><p id="tttmsg" class="mini-note center">Get three in a row.</p>`);
 const g=$("#ttt"),msg=$("#tttmsg");let a=Array(9).fill("");
 function win(p){return [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]].some(s=>s.every(i=>a[i]===p))}
 function draw(){g.innerHTML=a.map((v,i)=>`<button data-i="${i}" style="aspect-ratio:1;border:1px solid rgba(160,180,230,.12);border-radius:12px;background:#0d1525;color:#fff;font-size:40px;cursor:pointer">${v}</button>`).join("");g.querySelectorAll("button").forEach(b=>b.onclick=()=>play(+b.dataset.i))}
 function play(i){if(a[i])return;a[i]="X";if(win("X")){msg.textContent="You win";draw();return}if(a.every(Boolean)){msg.textContent="Draw";draw();return}let free=a.map((v,i)=>v?null:i).filter(v=>v!==null);a[free[Math.floor(Math.random()*free.length)]]="O";if(win("O"))msg.textContent="Computer wins";draw()}
 $("#tttreset").onclick=()=>{a=Array(9).fill("");msg.textContent="Get three in a row.";draw()};draw()
}

function brick(m){
 shell(m,`<div class="game-toolbar"><span>Move with mouse or touch</span><span class="score">Score: <b id="brickScore">0</b></span><button class="game-btn" id="brickStart">Start</button></div><div class="canvas-wrap"><canvas id="brickCanvas" class="game-canvas" width="520" height="360"></canvas></div>`);
 const c=$("#brickCanvas"),x=c.getContext("2d");let raf,ball={x:260,y:300,dx:3,dy:-3,r:7},p=220,score=0,run=false,bricks=[];
 function init(){bricks=[];for(let r=0;r<4;r++)for(let col=0;col<8;col++)bricks.push({x:24+col*60,y:30+r*28,w:50,h:18,on:true});ball={x:260,y:300,dx:3,dy:-3,r:7};p=220;score=0;$("#brickScore").textContent=0;run=true;loop()}
 function draw(){x.fillStyle="#050a12";x.fillRect(0,0,c.width,c.height);bricks.forEach(b=>{if(b.on){x.fillStyle=getComputedStyle(document.documentElement).getPropertyValue("--accent");x.fillRect(b.x,b.y,b.w,b.h)}});x.fillStyle="#fff";x.fillRect(p,c.height-20,80,10);x.beginPath();x.arc(ball.x,ball.y,ball.r,0,7);x.fill()}
 function loop(){if(!run)return;ball.x+=ball.dx;ball.y+=ball.dy;if(ball.x<ball.r||ball.x>c.width-ball.r)ball.dx*=-1;if(ball.y<ball.r)ball.dy*=-1;if(ball.y>c.height){run=false;draw();alert("Game over");return}if(ball.y>c.height-35&&ball.x>p&&ball.x<p+80)ball.dy=-Math.abs(ball.dy);for(const b of bricks)if(b.on&&ball.x>b.x&&ball.x<b.x+b.w&&ball.y>b.y&&ball.y<b.y+b.h){b.on=false;ball.dy*=-1;score++;$("#brickScore").textContent=score}draw();raf=requestAnimationFrame(loop)}
 c.onpointermove=e=>{const r=c.getBoundingClientRect();p=Math.max(0,Math.min(c.width-80,(e.clientX-r.left)*(c.width/r.width)-40))};$("#brickStart").onclick=init;draw()
}
function clicker(m){
 shell(m,`<div class="center"><p class="eyebrow">FACTORY</p><h3 style="font-size:36px;margin:0">Build clicks.</h3><p class="score">Coins: <b id="coins">0</b> · Per click: <b id="per">1</b></p><button id="bigClick" style="width:180px;height:180px;border-radius:50%;border:1px solid color-mix(in srgb,var(--accent) 55%,transparent);background:radial-gradient(circle,var(--accent),#10182a 68%);color:white;font-size:20px;font-weight:800;cursor:pointer;box-shadow:0 0 55px color-mix(in srgb,var(--accent) 30%,transparent)">CLICK</button><p><button class="game-btn" id="upgrade">Upgrade +1 · 25 coins</button></p></div>`);
 let coins=0,per=1,cost=25;$("#bigClick").onclick=()=>{coins+=per;$("#coins").textContent=coins};$("#upgrade").onclick=()=>{if(coins>=cost){coins-=cost;per++;cost=Math.ceil(cost*1.55);$("#per").textContent=per;$("#upgrade").textContent=`Upgrade +1 · ${cost} coins`;$("#coins").textContent=coins}}
}

function navigate(page){
 document.querySelectorAll(".nav-btn").forEach(b=>b.classList.toggle("active",b.dataset.page===page));
 if(page==="games"){$("#gamesPage").classList.add("active");$("#simplePage").classList.remove("active");return}
 $("#gamesPage").classList.remove("active");$("#simplePage").classList.add("active");
 const data={chats:["SOCIAL","Chats","Real-time messaging gets connected when the Klyro backend is added."],ai:["KLYRO AI","AI Chat","This is where the real AI API will live. The current games build keeps the page separate so the frontend stays fast."],friends:["SOCIAL","Friends","Profiles, friend requests and presence will connect to the account system."],settings:["CUSTOMIZE","Settings","Accent color, stars, planets, glow and background controls can live here."]}[page];
 $("#simpleEyebrow").textContent=data[0];$("#simpleTitle").textContent=data[1];$("#simpleText").textContent=data[2];
}
document.querySelectorAll("[data-page]").forEach(b=>b.onclick=e=>{e.preventDefault();navigate(b.dataset.page)});
renderCategories();renderGames();

const savedAccent=localStorage.getItem("klyroAccent");
if(savedAccent)document.documentElement.style.setProperty("--accent",savedAccent);
