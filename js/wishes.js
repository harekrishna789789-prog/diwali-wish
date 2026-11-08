// Apni wishes yahan badlo
const W=[
 ['🪔','Roshni','Is Diwali aapke ghar mein diye ki tarah khushiyan jagmagayein.'],
 ['💰','Laxmi Maa','Maa Laxmi aur Ganesh ji ki kripa aap par hamesha bani rahe.'],
 ['🍬','Mithaai','Zindagi mein itni mithaas ho ki mithai bhi sharma jaye!'],
 ['🎆','Dhamaka','Har din patakhe jaisa dhamakedaar ho. Bas kaan band mat karna 😄'],
 ['❤️','Apno ke saath','Parivar aur doston ke saath yeh tyohaar yaadgaar ho.'],
 ['🌟','Naye sapne','Naye saal mein sab sapne poore hon.'],
 ['🧹','Safai','Ghar ki safai ho gayi? Ab dil ki bhi kar lo, sab maaf karo!'],
 ['🎁','Gift','Mera gift? Bas aapki muskaan chahiye. Happy Diwali!']];
const n=sessionStorage.getItem('name'),box=document.getElementById('cards');
document.getElementById('hello').textContent=(n?n+', ':'')+'har card par tap karo 👆';
W.forEach(([e,t,m],i)=>{const d=document.createElement('div');d.className='card';d.tabIndex=0;d.setAttribute('role','button');
 d.innerHTML=`<div class="in"><div class="f ft"><span>${e}</span><h3>${t}</h3><small>tap karo</small></div><div class="f bk"><p>${m}</p></div></div>`;
 const go=()=>{d.classList.toggle('flip');if(d.classList.contains('flip')){chime(i);const r=d.getBoundingClientRect();pop(r.left+r.width/2,r.top+r.height/2,.5)}};
 d.onclick=go;d.onkeydown=ev=>{if(ev.key==='Enter'||ev.key===' '){ev.preventDefault();go()}};box.appendChild(d)});
document.getElementById('show').onclick=()=>{enableSound();for(let k=0;k<12;k++)setTimeout(()=>fire(innerWidth*(.1+Math.random()*.8),innerHeight*(.12+Math.random()*.4)),k*380)};
