(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))s(n);new MutationObserver(n=>{for(const c of n)if(c.type==="childList")for(const g of c.addedNodes)g.tagName==="LINK"&&g.rel==="modulepreload"&&s(g)}).observe(document,{childList:!0,subtree:!0});function o(n){const c={};return n.integrity&&(c.integrity=n.integrity),n.referrerPolicy&&(c.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?c.credentials="include":n.crossOrigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function s(n){if(n.ep)return;n.ep=!0;const c=o(n);fetch(n.href,c)}})();const N={destroyer:{id:1,name:"destroyer",length:2},submarine:{id:2,name:"submarine",length:3},cruiser:{id:3,name:"cruiser",length:3},battleship:{id:4,name:"battleship",length:4},carrier:{id:5,name:"carrier",length:5}},k=t=>{const e=t,o=N[t].length,s=N[t].id;let n=0;function c(){this.hits++}function g(){return this.hits===this.length}return{type:e,length:o,id:s,hits:n,hit:c,isSunk:g}},I=()=>{const t=o(),e=s();function o(){let a=[];for(let i=0;i<10;i++){a[i]=[];for(let m=0;m<10;m++)a[i][m]=null}return a}function s(){return[]}function n(){for(let a=0;a<10;a++)for(let i=0;i<10;i++)t[a][i]=null}function c(){for(;e.length>0;)e.pop()}function g([a,i]){return a>-1&&a<10&&i>-1&&i<10}function T([a,i],m,v){if(!g([a,i]))throw Error("Invalid initial starting position.");let S=m.length;if(v==="horizontal")return i+S-1<10;if(v==="vertical")return a+S-1<10}function C([a,i],m,v){let S=m.length;if(v==="horizontal"){for(let y=i;y<i+S;y++)if(t[a][y]!==null)return!1;return!0}else if(v==="vertical"){for(let y=a;y<a+S;y++)if(t[y][i]!==null)return!1;return!0}}function q([a,i]){if(!g([a,i]))throw Error("Invalid row and col parameters.");return[[a-1,i-1],[a-1,i],[a-1,i+1],[a,i+1],[a+1,i+1],[a+1,i],[a+1,i-1],[a,i-1]].filter(S=>{if(g([S[0],S[1]]))return S})}function l([a,i],m,v){let S=m.length;if(v==="vertical"){for(let y=a;y<a+S;y++)if(q([y,i]).some(B=>t[B[0]][B[1]]!==null))return!1;return!0}else if(v==="horizontal"){for(let y=i;y<i+S;y++)if(q([a,y]).some(B=>t[B[0]][B[1]]!==null))return!1;return!0}}function r([a,i],m,v){if(a=+a,i=+i,!T([a,i],m,v))throw Error("The ship extends outside the board.");if(!C([a,i],m,v))throw Error("There is another ship in the way.");if(!l([a,i],m,v))throw Error("This ship is adjacent to another ship.");let S=m.length;if(!e.some(y=>y.id===m.id))e.push(m);else throw Error("This ship is already in the fleet!");if(v==="vertical")for(let y=a;y<a+S;y++)t[y][i]=m;else if(v==="horizontal")for(let y=i;y<i+S;y++)t[a][y]=m}const h=()=>{r([1,1],"destroyer","horizontal"),r([8,9],"submarine","vertical"),r([2,8],"cruiser","horizontal"),r([6,2],"battleship","horizontal"),r([4,6],"carrier","vertical")};function u(){const a=[Math.floor(Math.random()*10),Math.floor(Math.random()*10)],m=["horizontal","vertical"][Math.round(Math.random())];return[a,m]}function d(){let a=[k("destroyer"),k("submarine"),k("cruiser"),k("battleship"),k("carrier")];a.forEach(i=>{for(;a.includes(i);){let m=u(),v=m[0],S=m[1];T(v,i,S)&&l(v,i,S)&&C(v,i,S)&&(r(v,i,S),a=a.filter(y=>y!==i))}})}function L([a,i]){let m=t[a][i];m!==null&&e.forEach(v=>{m.id===v.id&&v.hit()})}function b(){return e.length>4}function p(){return e.every(a=>a.isSunk())}function A(){e.forEach(a=>{a.hits=0})}return{board:t,fleet:e,createGameBoard:o,createFleet:s,clearBoard:n,clearFleet:c,inBounds:g,validPlacement:T,isPathClearOfShips:C,getAdjacentTiles:q,areAdjacentTilesEmpty:l,placeShip:r,placeAllShips:h,generateRandomPlacement:u,placeShipsRandomly:d,receiveAttack:L,checkStartGame:b,checkEndGame:p,resetShipHits:A}};class O{constructor(e){this.name=e,this.turn=!0}checkTurn(){return this.turn}startTurn(){this.turn||(this.turn=!0)}endTurn(e){this.turn&&(this.turn=!1,e.startTurn())}targetedAttack([e,o],s,n){if(this.checkTurn())n.receiveAttack([e,o]),this.endTurn(s);else throw Error("Not your turn!")}}class F extends O{constructor(e="Opponent AI",o,s){super(e),this.turn=!1,this.enemyPlayer=o,this.enemySide=s,this.hitArray=[]}resetHitArray(){this.hitArray=[]}randomAttack(e,o){if(this.checkTurn()){let s;do{let n=Math.floor(Math.random()*10),c=Math.floor(Math.random()*10);s=[n,c]}while(this.hitArray.some(n=>n[0]==s[0]&&n[1]==s[1]));this.hitArray.push(s),this.targetedAttack(s,e,o)}}}const E=(()=>{const t=([l,r],h,u)=>{const d=document.querySelectorAll(".player-tile");let L=h.length;if(l=+l,r=+r,u==="horizontal")for(let b=r;b<r+L;b++)d.forEach(p=>{p.dataset.col==b&&p.dataset.row==l&&(p.style.background="white",p.setAttribute("ship","true"))});else if(u==="vertical")for(let b=l;b<l+L;b++)d.forEach(p=>{p.dataset.row==b&&p.dataset.col==r&&(p.style.background="white",p.setAttribute("ship","true"))})},e=(l,r)=>{const h=document.querySelectorAll("."+r+"-tile");for(let u=0;u<10;u++)for(let d=0;d<10;d++)h.forEach(L=>{l[u][d]!==null&&L.dataset.row==u&&L.dataset.col==d&&(r==="player"&&(L.style.background="white"),L.setAttribute("ship","true"))})},o=([l,r],h,u,d)=>{const L=document.querySelectorAll(".player-tile");let b=h.length;if(l=+l,r=+r,u==="horizontal")for(let p=r;p<r+b;p++)L.forEach(A=>{A.dataset.row==l&&A.dataset.col==p&&(d==="in"?A.classList.add("drag-over"):d==="out"&&A.classList.remove("drag-over"))});else if(u==="vertical")for(let p=l;p<l+b;p++)L.forEach(A=>{A.dataset.row==p&&A.dataset.col==r&&(d==="in"?A.classList.add("drag-over"):d==="out"&&A.classList.remove("drag-over"))})},s=l=>{l.textContent="✕",l.setAttribute("hit","true"),l.style.pointerEvents="none",l.getAttribute("ship")&&(l.style.backgroundColor="var(--red-color)")},n=()=>{document.querySelectorAll(".player-tile").forEach(r=>{r.textContent="",r.style.backgroundColor="var(--blue-color)",r.style.pointerEvents="auto",r.removeAttribute("ship")})},c=()=>{document.querySelectorAll(".ai-tile").forEach(r=>{r.textContent="",r.style.backgroundColor="var(--blue-color)",r.style.pointerEvents="auto",r.style.cursor="pointer",r.removeAttribute("ship"),r.removeAttribute("hit")})},g=l=>{l.resetShipHits(),l.clearFleet(),l.clearBoard(),n()},T=(l,r)=>{l.clearFleet(),l.clearBoard(),r.resetHitArray(),c(),l.placeShipsRandomly(),e(l.board,"ai")};return{displayShip:t,displayAllShips:e,displayShipPath:o,updateTile:s,resetPlayerBoard:g,resetAiBoard:T,resetPlayerTiles:n,resetAiTiles:c,endGameController:l=>{const r=document.querySelectorAll(".ai-tile"),h=document.querySelector(".win-box"),u=document.querySelector(".win-text"),d=document.querySelector(".game-status-text"),L=document.querySelector(".player-name"),b=document.querySelector(".ai-name"),p=document.querySelector(".middle");setTimeout(()=>{h.style.visibility="visible",p.style.opacity="0.5",l==="player"?(u.textContent="You win!",d.textContent=`${L.textContent} wins!`):(u.textContent="You lose!",d.textContent=`${b.textContent} wins!`)},800),r.forEach(A=>{A.style.pointerEvents="none"})},newGame:(l,r,h)=>{const u=document.querySelector(".drag-container"),d=document.querySelectorAll(".ship"),L=document.querySelector(".start-game-btn"),b=document.querySelector(".win-box"),p=document.querySelector(".game-status-text"),A=document.querySelector(".ai-container"),a=document.querySelector(".middle");g(l),T(r,h),b.style.visibility="hidden",L.style.visibility="hidden",u.style.visibility="visible",A.style.visibility="hidden",a.style.opacity="1.0",d.forEach(i=>{i.style.visibility="visible"}),p.textContent="Place your ships..."}}})(),R=t=>{const e=document.querySelectorAll(".ship"),o=document.querySelectorAll(".player-tile"),s=document.querySelector(".start-game-btn");let n;const c=[k("destroyer"),k("submarine"),k("cruiser"),k("battleship"),k("carrier")];e.forEach(r=>{r.addEventListener("dragstart",g)}),o.forEach(r=>{r.addEventListener("dragenter",T),r.addEventListener("dragover",C),r.addEventListener("dragleave",q),r.addEventListener("drop",l)});function g(r){n=r.target}function T(r){r.preventDefault();let h=r.target.dataset.row,u=r.target.dataset.col;const d=c[n.id];n.classList.contains("horizontal")?E.displayShipPath([h,u],d,"horizontal","in"):n.classList.contains("vertical")&&E.displayShipPath([h,u],d,"vertical","in")}function C(r){r.preventDefault();let h=r.target.dataset.row,u=r.target.dataset.col;const d=c[n.id];n.classList.contains("horizontal")?E.displayShipPath([h,u],d,"horizontal","in"):n.classList.contains("vertical")&&E.displayShipPath([h,u],d,"vertical","in")}function q(r){let h=r.target.dataset.row,u=r.target.dataset.col;const d=c[n.id];n.classList.contains("horizontal")?E.displayShipPath([h,u],d,"horizontal","out"):n.classList.contains("vertical")&&E.displayShipPath([h,u],d,"vertical","out")}function l(r){r.target.classList.remove("drag-over");const h=r.target.dataset.row,u=r.target.dataset.col,d=c[n.id];n.classList.contains("horizontal")?(t.placeShip([h,u],d,"horizontal"),E.displayShip([h,u],d,"horizontal"),n.style.visibility="hidden"):n.classList.contains("vertical")&&(t.placeShip([h,u],d,"vertical"),E.displayShip([h,u],d,"vertical"),n.style.visibility="hidden"),t.checkStartGame()&&(s.style.visibility="visible")}},H=()=>{const t=document.querySelector(".rotate-btn"),e=document.querySelector(".all-ships"),o=document.querySelectorAll(".ship");t.addEventListener("click",()=>{o.forEach(s=>{s.classList.contains("horizontal")?(e.style.flexDirection="row",V(s)):s.classList.contains("vertical")&&(e.style.flexDirection="column",K(s))})})},Y=(t,e)=>{const o=document.querySelector(".start-game-btn"),s=document.querySelector(".random-btn"),n=document.querySelectorAll(".ship");s.addEventListener("click",()=>{t.fleet.length>0&&E.resetPlayerBoard(t),t.placeShipsRandomly(),E.displayAllShips(e,"player"),o.style.visibility="visible",n.forEach(c=>{c.style.visibility="hidden"})})},$=()=>{const t=document.querySelector(".start-game-btn"),e=document.querySelector(".drag-container"),o=document.querySelectorAll(".ship"),s=document.querySelector(".game-status-text"),n=document.querySelector(".ai-container");t.addEventListener("click",()=>{e.style.visibility="hidden",t.style.visibility="hidden",s.textContent="Your strike!",n.style.visibility="visible",o.forEach(c=>{c.style.visibility="hidden"})})},V=t=>{switch(t.classList.remove("horizontal"),t.classList.add("vertical"),t.id){case"0":t.classList.remove("destroyer-h"),t.classList.add("destroyer-v");break;case"1":t.classList.remove("submarine-h"),t.classList.add("submarine-v");break;case"2":t.classList.remove("cruiser-h"),t.classList.add("cruiser-v");break;case"3":t.classList.remove("battleship-h"),t.classList.add("battleship-v");break;case"4":t.classList.remove("carrier-h"),t.classList.add("carrier-v");break}},K=t=>{switch(t.classList.remove("vertical"),t.classList.add("horizontal"),t.id){case"0":t.classList.remove("destroyer-v"),t.classList.add("destroyer-h");break;case"1":t.classList.remove("submarine-v"),t.classList.add("submarine-h");break;case"2":t.classList.remove("cruiser-v"),t.classList.add("cruiser-h");break;case"3":t.classList.remove("battleship-v"),t.classList.add("battleship-h");break;case"4":t.classList.remove("carrier-v"),t.classList.add("carrier-h");break}},J=(t,e)=>{R(t),H(),Y(t,e),$()},f=(t,e,o)=>{const s=document.createElement(t);return e&&s.classList.add(e),o&&(s.textContent=o),s},Q=()=>{const t=f("div","start-screen"),e=f("h1","start-title","Battleship");return t.append(e,U()),t},U=()=>{const t=document.createElement("form");t.classList.add("name-form"),t.setAttribute("name","name-form"),t.setAttribute("autocomplete","off");const e=document.createElement("label");e.setAttribute("for","username"),e.textContent="Enter your name:";const o=document.createElement("input");o.setAttribute("type","text"),o.setAttribute("id","username"),o.setAttribute("name","username"),o.setAttribute("required","");const s=document.createElement("button");return s.setAttribute("type","button"),s.classList.add("enter-game-btn"),s.textContent="Start",t.append(e,o,s),t},W=()=>{const t=f("div","header"),e=f("div","header-text","Battleship");return t.append(e),t},X=()=>{const t=f("div","middle"),e=f("div","board-containers"),o=f("div","player-container"),s=f("div","player-name","placeholder"),n=f("div","ai-container"),c=f("div","ai-name","Opponent AI"),g=f("div","game-status-text","Loading...");return o.append(s,D("player")),n.append(c,D("ai")),e.append(o,n),t.append(e,g),t},D=t=>{const e=f("div",`${t}-grid`);for(let o=0;o<10;o++)for(let s=0;s<10;s++){const n=f("div",`${t}-tile`);n.dataset.row=o,n.dataset.col=s,e.appendChild(n)}return e},Z=()=>{const t=f("div","footer"),e=f("div","footer-text","Mark Melnik, 2023");return t.append(e),t},z=(t,e,o,s,n)=>{const c=document.createElement(t);return c.classList.add(e,o,s),c.id=n,c.setAttribute("draggable","true"),c},_=()=>{const t=f("div","all-ships"),e=z("div","ship","destroyer-h","horizontal",0),o=z("div","ship","submarine-h","horizontal",1),s=z("div","ship","cruiser-h","horizontal",2),n=z("div","ship","battleship-h","horizontal",3),c=z("div","ship","carrier-h","horizontal",4);return t.append(e,o,s,n,c),t},tt=()=>{const t=f("div","drag-container"),e=f("div","drag-container-title","Drag your ships onto the board!"),o=f("div","btn-container"),s=f("button","rotate-btn","Rotate"),n=f("button","random-btn","Random"),c=f("button","start-game-btn","Start");return o.append(s,n),t.append(e,_(),o,c),t},et=()=>{const t=f("button","new-game-btn","New Game");return t.setAttribute("type","button"),t},rt=()=>{const t=f("div","win-box"),e=f("div","win-text");return t.append(e,et()),t},nt=()=>{const t=f("button","reset-game-btn","Reset Game");return t.setAttribute("type","button"),t},at=()=>{const t=document.querySelector(".container");return t.append(Q(),W(),X(),tt(),rt(),Z(),nt()),t};at();const x=I(),st=x.board,M=new O("Mark"),w=I(),it=w.board,G=new F("AI",M,x);J(x,st);const P=document.querySelector(".game-status-text");(()=>{const t=document.querySelector(".start-screen"),e=document.querySelector(".start-title"),o=document.querySelector(".enter-game-btn"),s=document.querySelector(".name-form"),n=document.querySelector("#username"),c=document.querySelector(".player-name"),g=document.querySelector(".reset-game-btn"),T=document.querySelector(".new-game-btn"),C=document.querySelectorAll(".player-tile"),q=document.querySelectorAll(".ai-tile"),l=document.querySelector(".drag-container"),r=document.querySelector(".ai-container");window.addEventListener("DOMContentLoaded",()=>{setTimeout(()=>{e.classList.add("active")},500),setTimeout(()=>{s.classList.add("active")},1e3),setTimeout(()=>{o.style.visibility="visible"},1600)}),o.addEventListener("click",h=>{e.classList.remove("active"),e.classList.add("fade"),setTimeout(()=>{s.classList.remove("active"),s.classList.add("fade")},100),setTimeout(()=>{t.style.top="-100vh"},250),c.textContent=n.value||"Player",s.reset(),r.style.visibility="hidden",l.style.visibility="visible",g.style.visibility="visible",setTimeout(()=>{t.style.display="none",w.placeShipsRandomly(),E.displayAllShips(it,"ai"),P.textContent="Place your ships..."},1e3),h.preventDefault()}),g.addEventListener("click",()=>{E.newGame(x,w,G)}),T.addEventListener("click",()=>{E.newGame(x,w,G)}),q.forEach(h=>{let u=h.dataset.row,d=h.dataset.col;h.addEventListener("click",()=>{M.targetedAttack([u,d],G,w),E.updateTile(h),q.forEach(b=>{b.style.pointerEvents="none"}),G.randomAttack(M,x),P.textContent="AI Strikes!";let L=G.hitArray[G.hitArray.length-1];C.forEach(b=>{let p=+b.dataset.row,A=+b.dataset.col;L[0]===p&&L[1]===A&&setTimeout(()=>{E.updateTile(b),!x.checkEndGame()&&!w.checkEndGame()&&(P.textContent="Your strike!",q.forEach(a=>{a.getAttribute("hit")||(a.style.pointerEvents="auto")}))},800)}),x.checkEndGame()&&E.endGameController("ai"),w.checkEndGame()&&E.endGameController("player")})})})();
