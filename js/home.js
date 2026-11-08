const $=s=>document.querySelector(s),q=new URLSearchParams(location.search).get('name');
if(q)sessionStorage.setItem('name',q);
const nm=q||sessionStorage.getItem('name');
if(nm){$('#to').textContent='Pyare '+nm+',';$('#sp').textContent=nm+', tumhare liye kuch khaas hai 🎁'}
// Rangoli (mandala) banana
let s='';[[88,24,5,12],[66,16,7,10],[44,12,5,9],[24,8,3,6]].forEach(([r,n,rx,ry],k)=>{
  s+=`<g class="g${k%2}">`;for(let i=0;i<n;i++)s+=`<ellipse cx="0" cy="${-r}" rx="${rx}" ry="${ry}" transform="rotate(${360/n*i})"/>`;s+='</g>'});
$('#rg').innerHTML=s;
$('#row').innerHTML='<span class="mini"><i></i></span>'.repeat(5);
$('#wa').href='https://wa.me/?text='+encodeURIComponent('🪔 Happy Diwali! Mera chhota sa sandesh tumhare liye: '+location.href.split('?')[0]);
$('#go').onclick=()=>{
  enableSound();chime(2);
  $('#splash').classList.add('hide');
  setTimeout(()=>{document.body.classList.add('go');$('#diya').classList.add('lit');chime(4)},500);
  [0,500,1000,1700].forEach(t=>setTimeout(()=>fire(innerWidth*(.2+Math.random()*.6),innerHeight*(.15+Math.random()*.3)),400+t));
  document.querySelectorAll('.mini').forEach((m,i)=>setTimeout(()=>{m.classList.add('lit');chime(i)},1400+i*350));
};
