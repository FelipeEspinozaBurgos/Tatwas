"use strict";
(()=>{
const MIN=60000,$=id=>document.getElementById(id),sel=$("place");
for(const k in PLACES){const o=document.createElement("option");o.value=k;o.textContent=PLACES[k][0];sel.appendChild(o);}

function loc(){
  if(sel.value==="custom")return{lat:parseFloat($("lat").value),lon:parseFloat($("lon").value),tz:$("tz").value.trim()};
  const p=PLACES[sel.value];return{lat:p[1],lon:p[2],tz:p[3]};
}
const fmtT=(ms,tz)=>new Intl.DateTimeFormat("en-GB",{timeZone:tz,hour:"2-digit",minute:"2-digit",hourCycle:"h23"}).format(ms);
const fmtD=(ms,tz)=>new Intl.DateTimeFormat("en-CA",{timeZone:tz}).format(ms);
const addDays=(ymd,n)=>{const[y,m,d]=ymd.split("-").map(Number);return new Date(Date.UTC(y,m-1,d+n)).toISOString().slice(0,10);};
const pad=n=>String(n).padStart(2,"0");
function sunrise(ymd,L,adj){
  const[y,m,d]=ymd.split("-").map(Number);
  const noon=Date.UTC(y,m-1,d,12)-L.lon/15*3600000;
  const t=SunCalc.getTimes(new Date(noon),L.lat,L.lon).sunrise.getTime();
  return isNaN(t)?NaN:Math.round(t/MIN)*MIN+adj*MIN;
}
function showErr(m){const e=$("err");e.textContent=m;e.style.display=m?"block":"none";}
function validate(L){
  if(!isFinite(L.lat)||!isFinite(L.lon)||Math.abs(L.lat)>90||Math.abs(L.lon)>180){showErr("Coordenadas no válidas: latitud entre -90 y 90, longitud entre -180 y 180.");return false;}
  try{fmtT(0,L.tz);}catch(e){showErr("Zona horaria no válida. Usa un nombre IANA, p. ej. America/Cancun.");return false;}
  showErr("");return true;
}
function schedule(ymd,L,adj){
  const s=sunrise(ymd,L,adj),nx=sunrise(addDays(ymd,1),L,adj);
  if(isNaN(s)||isNaN(nx))return null;
  return{s,nx,rows:Array.from({length:60},(_,i)=>({i,a:s+i*24*MIN,b:i===59?nx:s+(i+1)*24*MIN}))};
}

function renderTable(){
  const L=loc(),ymd=$("date").value,adj=+$("adj").value||0;
  if(!ymd||!validate(L))return;
  const S=schedule(ymd,L,adj);
  if(!S){showErr("No hay salida del sol en esa fecha y latitud.");return;}
  const now=Date.now();let h="";
  for(const r of S.rows){
    const e=r.i%5,dur=Math.round((r.b-r.a)/MIN),isNow=now>=r.a&&now<r.b;
    const pa=fmtD(r.a,L.tz)!==ymd,pb=fmtD(r.b-1,L.tz)!==ymd;
    h+=`<tr style="--c:var(${V[e]})" class="${isNow?"now ":""}${e===0&&r.i?"cyc":""}"><td>${r.i+1}</td><td>${Math.floor(r.i/5)+1}</td><td>${EL[e].n}</td>`+
      `<td>${fmtT(r.a,L.tz)}${pa?' <span class="sm">+1</span>':""}</td><td>${fmtT(r.b,L.tz)}${pb?' <span class="sm">+1</span>':""}</td>`+
      `<td>${dur}${dur!==24?' <span class="sm">*</span>':""}</td></tr>`;
  }
  $("body").innerHTML=h;
  $("info").innerHTML=`<div><span>Salida del sol</span><b>${fmtT(S.s,L.tz)}</b></div><div><span>Salida del día siguiente</span><b>${fmtT(S.nx,L.tz)}</b></div><div><span>Zona horaria</span><b style="font-size:1rem">${L.tz}</b></div>`;
}

function renderLive(){
  const L=loc(),adj=+$("adj").value||0;
  if(!validate(L))return;
  const now=Date.now();let ymd=fmtD(now,L.tz),S=schedule(ymd,L,adj);
  if(S&&now<S.s)S=schedule(addDays(ymd,-1),L,adj);
  else if(S&&now>=S.nx)S=schedule(addDays(ymd,1),L,adj);
  if(!S){$("liveName").textContent="Sin datos";$("liveCount").textContent="--:--:--";return;}
  const r=S.rows.find(x=>now>=x.a&&now<x.b)||S.rows[59],e=r.i%5,E=EL[e],nE=EL[(r.i+1)%5];
  const left=Math.max(0,r.b-now),hh=Math.floor(left/3600000),mm=Math.floor(left%3600000/60000),ss=Math.floor(left%60000/1000);
  const card=$("liveCard");card.style.setProperty("--c",`var(${V[e]})`);
  if(card.dataset.e!==String(e)){card.dataset.e=e;$("liveSym").innerHTML=sym(e);$("liveName").textContent=E.n+" · "+E.es;$("livePlanet").textContent="Influencia de "+E.pl;
    $("livePhrase").textContent="«"+E.p+"»";
    $("liveChips").innerHTML=[E.sense,"Dirección: "+E.dir,"Mantra "+E.mant,E.col,E.sab].map(t=>`<span class="chip">${t}</span>`).join("");}
  $("liveCount").textContent=(hh?pad(hh)+":":"")+pad(mm)+":"+pad(ss);
  $("liveNext").textContent=`Entra ${nE.n} (${nE.es}) a las ${fmtT(r.b,L.tz)} · objeto ${r.i+1} de 60`;
  $("liveSun").textContent=`Día tátwico desde el amanecer de las ${fmtT(S.s,L.tz)}`;
  $("arc").setAttribute("stroke-dashoffset",(339.3*(1-(r.b-now)/(r.b-r.a))).toFixed(1));
}

function buildGuide(){
  let h=`<div class="card"><h2>Prana y Akash</h2>
  <p>Según Krumm Heller, el Universo visible e invisible es efecto del Éter, y tras el Éter existe una fuerza que los indios llaman <b>Prana</b>, principio positivo, y <b>Akash</b>, principio negativo. Prana es la energía absoluta: movimiento, vibración, calor, luz, electricidad y magnetismo; es la vida del Éter. Guarda con Akash la relación de los ácidos con las bases.</p>
  <p>Por la influencia pránica, Akash se vuelve materia y se divide en cinco modalidades, los <b>Tatwas</b>. Cada uno vibra 24 minutos en su tono principal; en dos horas los cinco recorren su ciclo, empezando por Akas en la salida del sol. El maestro del Tatwa es dueño de su destino, pero «es un poder que solo debe estar en manos del hombre puro»: estas fuerzas son espadas de doble filo.</p></div>`;
  EL.forEach((E,i)=>{h+=`<article class="card el" style="--c:var(${V[i]})"><h3>${sym(i)}${E.n} · ${E.es}</h3>
  <p>${E.txt}</p><dl><dt>Planeta</dt><dd>${E.pl}</dd><dt>Sentido</dt><dd>${E.sense}</dd><dt>Dirección</dt><dd>${E.dir}</dd><dt>Mantra</dt><dd>${E.mant}</dd><dt>Color</dt><dd>${E.col}</dd><dt>Sabor</dt><dd>${E.sab}</dd></dl>
  <p class="do"><b>Conviene:</b> ${E.hacer}</p><p class="do"><b>Evita:</b> ${E.evitar}</p></article>`;});
  h+=`<p class="note">Fuente: Dr. Krumm Heller (Huiracocha), «El Tatwámetro o las Vibraciones del Éter». Texto de orientación esotérica, no sustituye consejo médico, legal ni financiero.</p>`;
  $("guide").innerHTML=h;
}

function today(){$("date").value=fmtD(Date.now(),loc().tz);renderTable();renderLive();}
function refresh(){renderTable();renderLive();}
sel.addEventListener("change",()=>{$("custom").classList.toggle("visible",sel.value==="custom");today();});
["date","adj","lat","lon","tz"].forEach(id=>$(id).addEventListener("input",refresh));
$("prev").onclick=()=>{$("date").value=addDays($("date").value,-1);renderTable();};
$("next").onclick=()=>{$("date").value=addDays($("date").value,1);renderTable();};
$("today").onclick=today;
document.querySelectorAll("nav button").forEach(b=>b.onclick=()=>{
  document.querySelectorAll("nav button").forEach(x=>x.classList.toggle("on",x===b));
  document.querySelectorAll("main>section").forEach(s=>s.classList.toggle("show",s.id===b.dataset.tab));});
$("theme").onclick=()=>{const r=document.documentElement,dark=getComputedStyle(r).getPropertyValue("--bg").trim()==="#0f0d17";r.dataset.theme=dark?"light":"dark";};
$("geo").onclick=()=>{
  if(!navigator.geolocation){showErr("Tu navegador no ofrece geolocalización. Ingresa las coordenadas manualmente.");return;}
  navigator.geolocation.getCurrentPosition(p=>{
    sel.value="custom";$("custom").classList.add("visible");
    $("lat").value=p.coords.latitude.toFixed(4);$("lon").value=p.coords.longitude.toFixed(4);
    $("tz").value=Intl.DateTimeFormat().resolvedOptions().timeZone||"UTC";today();
  },()=>showErr("No se pudo obtener tu ubicación. Revisa el permiso o ingresa las coordenadas."),{timeout:8000});
};

buildGuide();
if(typeof SunCalc==="undefined")showErr("No se pudo cargar SunCalc. Revisa tu conexión a internet.");
else{today();setInterval(renderLive,1000);setInterval(renderTable,30000);}
})();
