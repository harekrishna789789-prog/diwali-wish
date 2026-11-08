(function(){
const B=document.body,P=B.dataset.page,$=s=>document.querySelector(s);
B.insertAdjacentHTML('afterbegin','<canvas id="fx"></canvas><div class="lanterns" id="lan"></div>');
const cs=['#ff3b3b','#ff9500','#ffc83d','#ff4f81','#ff7a1a'],n=Math.max(4,Math.round(innerWidth/120));
let L='',pt='';
for(let k=0;k<n;k++)L+=`<i style="left:${(k+.5)/n*100}%;--d:${(2.5+Math.random()*2).toFixed(1)}s;--h:${30+Math.random()*70|0}px;--c:${cs[k%5]}"><b></b></i>`;
$('#lan').innerHTML=L;
for(let k=0;k<16;k++)pt+=`<span class="petal" style="left:${Math.random()*100}%;--t:${8+Math.random()*8|0}s;--dl:-${Math.random()*12|0}s;--s:${Math.random()*160-80|0}px"></span>`;
const pg=[['home','index.html','Home'],['wishes','wishes.html','Wishes']];
B.insertAdjacentHTML('beforeend',pt+'<nav>'+pg.map(([k,h,t])=>`<a href="${h}" class="${k===P?'on':''}">${t}</a>`).join('')+'<button id="snd" aria-label="Sound on off">🔇</button></nav>');

/* ---------- AUDIO (khud generate hota hai, file ki zarurat nahi) ---------- */
let A,master,on=sessionStorage.getItem('snd')==='1',mp3,synthOn=false,tm,dr=[],mg;
const SC=[261.63,293.66,329.63,392,440,523.25,587.33,659.25];
function ctx(){if(!A){A=new(window.AudioContext||window.webkitAudioContext)();master=A.createGain();master.gain.value=.85;master.connect(A.destination)}if(A.state==='suspended')A.resume();return A}
function ping(f,t,v,out){const o=A.createOscillator(),g=A.createGain();o.type='square';o.frequency.value=f;g.gain.setValueAtTime(v,t);g.gain.exponentialRampToValueAtTime(.0008,t+.05);o.connect(g).connect(out||master);o.start(t);o.stop(t+.06)}
function thump(t,out){const o=A.createOscillator(),g=A.createGain();o.frequency.setValueAtTime(130,t);o.frequency.exponentialRampToValueAtTime(55,t+.2);g.gain.setValueAtTime(.4,t);g.gain.exponentialRampToValueAtTime(.001,t+.3);o.connect(g).connect(out);o.start(t);o.stop(t+.3)}
function bell(f,v=.22,t,out){t=t||A.currentTime;out=out||master;[1,2.01,3.02].forEach((m,i)=>{const o=A.createOscillator(),g=A.createGain();o.type=i?'sine':'triangle';o.frequency.value=f*m;g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(v/(i+1),t+.01);g.gain.exponentialRampToValueAtTime(.0008,t+1.8/(i+1));o.connect(g).connect(out);o.start(t);o.stop(t+2)})}
window.boom=function(v=1){if(!on)return;ctx();const t=A.currentTime,s=A.createBufferSource(),b=A.createBuffer(1,A.sampleRate,A.sampleRate),d=b.getChannelData(0);
 for(let i=0;i<d.length;i++)d[i]=Math.random()*2-1;s.buffer=b;
 const f=A.createBiquadFilter(),g=A.createGain();f.type='lowpass';f.frequency.setValueAtTime(1400,t);f.frequency.exponentialRampToValueAtTime(80,t+.8);
 g.gain.setValueAtTime(.7*v,t);g.gain.exponentialRampToValueAtTime(.001,t+.9);s.connect(f).connect(g).connect(master);s.start(t);
 const o=A.createOscillator(),g2=A.createGain();o.frequency.setValueAtTime(110,t);o.frequency.exponentialRampToValueAtTime(30,t+.4);g2.gain.setValueAtTime(.8*v,t);g2.gain.exponentialRampToValueAtTime(.001,t+.5);o.connect(g2).connect(master);o.start(t);o.stop(t+.5);
 for(let i=0;i<6;i++)ping(2000+Math.random()*3000,t+.15+Math.random()*.6,.03*v)};
window.chime=function(i=0){if(!on)return;ctx();bell([523.25,587.33,659.25,783.99,880,1046.5][i%6],.28)};
function synth(){if(synthOn||!on)return;synthOn=true;ctx();mg=A.createGain();mg.gain.value=.55;mg.connect(master);
 dr=[130.81,196,261.63].map((f,i)=>{const o=A.createOscillator(),g=A.createGain();o.frequency.value=f;g.gain.value=[.07,.04,.02][i];o.connect(g).connect(mg);o.start();return o});
 let st=0,ix=2;tm=setInterval(()=>{const t=A.currentTime;ix=Math.max(0,Math.min(7,ix+[-2,-1,-1,0,1,1,2][Math.random()*7|0]));bell(SC[ix],.12,t,mg);if(st%4===0)thump(t,mg);if(st%2)ping(3200,t,.01,mg);st++},480)}
function startMusic(){stopMusic();
 mp3=new Audio('audio/music.mp3');mp3.loop=true;mp3.volume=.6;   // apna gaana: audio/music.mp3
 mp3.addEventListener('error',synth);mp3.play().catch(synth)}
function stopMusic(){clearInterval(tm);dr.forEach(o=>{try{o.stop()}catch(e){}});dr=[];if(mg)mg.disconnect();synthOn=false;if(mp3){mp3.pause();mp3=null}}
const btn=$('#snd'),upd=()=>btn.textContent=on?'🔊':'🔇';
window.enableSound=function(){on=true;sessionStorage.setItem('snd','1');ctx();startMusic();upd()};
btn.onclick=()=>{if(on){on=false;sessionStorage.setItem('snd','0');stopMusic()}else enableSound();upd()};
upd();
if(on&&P!=='home'){const go=()=>{ctx();startMusic()};try{ctx();A.state==='running'?startMusic():addEventListener('pointerdown',go,{once:true})}catch(e){addEventListener('pointerdown',go,{once:true})}}
document.addEventListener('visibilitychange',()=>{if(A)document.hidden?A.suspend():on&&A.resume()});

/* ---------- FIREWORKS ---------- */
const c=$('#fx'),x=c.getContext('2d'),dpr=Math.min(devicePixelRatio||1,2),cols=['#ffc83d','#ff7a1a','#ff4f81','#fff6e6','#7df9ff','#b388ff','#69f0ae'];
let W,H,ps=[],rk=[];
function rs(){W=innerWidth;H=innerHeight;c.width=W*dpr;c.height=H*dpr;x.setTransform(dpr,0,0,dpr,0,0)}rs();addEventListener('resize',rs);
window.pop=function(px,py,v=1){const a1=cols[Math.random()*7|0],a2=cols[Math.random()*7|0],heart=Math.random()<.25,N=70;
 for(let i=0;i<N;i++){const a=Math.PI*2*i/N;let vx,vy;
  if(heart){vx=3.2*Math.pow(Math.sin(a),3);vy=-.2*(13*Math.cos(a)-5*Math.cos(2*a)-2*Math.cos(3*a)-Math.cos(4*a))}
  else{const s=(i%2?2.4:3.6)*(.85+Math.random()*.3);vx=Math.cos(a)*s;vy=Math.sin(a)*s}
  ps.push({x:px,y:py,vx,vy,l:0,m:70+Math.random()*30,c:i%2?a1:a2})}
 boom(v)};
window.fire=function(tx,ty,v){rk.push({x:tx+Math.random()*80-40,y:H,tx,ty,v:v||1})};
(function loop(){x.globalCompositeOperation='destination-out';x.fillStyle='rgba(0,0,0,.22)';x.fillRect(0,0,W,H);x.globalCompositeOperation='lighter';
 rk=rk.filter(r=>{r.y-=Math.max(6,(r.y-r.ty)*.06+4);r.x+=(r.tx-r.x)*.05;x.fillStyle='#ffd27a';x.fillRect(r.x-1.5,r.y,3,10);if(r.y<=r.ty){pop(r.x,r.ty,r.v);return false}return true});
 ps=ps.filter(p=>{p.l++;p.x+=p.vx;p.y+=p.vy;p.vx*=.985;p.vy=p.vy*.985+.035;const a=1-p.l/p.m;if(a<=0)return false;x.globalAlpha=a;x.fillStyle=p.c;x.beginPath();x.arc(p.x,p.y,2.2*a+.5,0,7);x.fill();return true});
 x.globalAlpha=1;requestAnimationFrame(loop)})();
if(!matchMedia('(prefers-reduced-motion:reduce)').matches)setInterval(()=>{if(!document.hidden)fire(W*(.15+Math.random()*.7),H*(.15+Math.random()*.35),.35)},1900);
document.addEventListener('pointerdown',e=>{if(!e.target.closest('a,button,.card,.splash'))fire(e.clientX,e.clientY,.8)});
})();
