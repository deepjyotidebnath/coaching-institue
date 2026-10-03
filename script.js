/* ===== CONFIG: edit these ===== */
const CFG={name:"Shikhar Academy",wa:"919800000000",phone:"+91 98000 00000"};
const COURSES={
 "Class 9–10":[["Foundation Maths & Science","Mon–Sat, 4:00–6:00 pm","₹1,800/mo",12],["Board Booster","Mon–Sat, 7:00–9:00 am","₹1,500/mo",4],["English & SST","Tue/Thu/Sat, 5:00 pm","₹900/mo",20]],
 "Class 11–12":[["Science PCM Boards","Mon–Sat, 3:00–6:00 pm","₹3,200/mo",9],["Science PCB Boards","Mon–Sat, 7:00–10:00 am","₹3,200/mo",3],["Commerce Combo","Mon–Fri, 4:00–6:30 pm","₹2,600/mo",15]],
 "JEE / NEET":[["JEE Main 2-Year","Mon–Sat, 8:00 am–1:00 pm","₹6,500/mo",6],["NEET 2-Year","Mon–Sat, 8:00 am–1:00 pm","₹6,500/mo",8],["Droppers’ Batch","Mon–Sat, 9:00 am–3:00 pm","₹7,500/mo",2]]};
const FAC=[["Dr. A. Sen","Physics","15 yrs · M.Sc, Ph.D"],["R. Mukherjee","Mathematics","12 yrs · IIT alumnus"],["S. Das","Chemistry","10 yrs · M.Sc"],["P. Roy","Biology","9 yrs · NEET specialist"]];
const STATS=[["96%","Board pass with 75%+"],["38","JEE / NEET qualifiers in 2026"],["15:1","Student–teacher ratio"],["12 yrs","Teaching in your city"]];
const STORIES=[["Riya Ghosh","NEET 2026, AIR 1,420","The weekly doubt sessions fixed my weak chapters. I never felt lost in class."],["Arjun Sharma","JEE Main 2026, 98.4 percentile","Test series every Sunday and honest feedback helped me improve each month."],["Ananya Paul","Class 12 Boards, 94%","Small batch, so every question got answered. My parents got monthly progress updates."]];
const DAYS=["Mon","Tue","Wed","Thu","Fri","Sat"];
const SCH={Mon:[["8:00 am","JEE Main 2-Year","Physics","Dr. A. Sen"],["4:00 pm","Foundation 9–10","Mathematics","R. Mukherjee"],["5:00 pm","Science PCM","Chemistry","S. Das"]],
Tue:[["8:00 am","NEET 2-Year","Biology","P. Roy"],["4:00 pm","Foundation 9–10","Science","Dr. A. Sen"],["5:00 pm","English & SST","English","Guest faculty"]],
Wed:[["8:00 am","JEE Main 2-Year","Mathematics","R. Mukherjee"],["4:00 pm","Science PCM","Physics","Dr. A. Sen"]],
Thu:[["8:00 am","NEET 2-Year","Chemistry","S. Das"],["4:00 pm","Foundation 9–10","Mathematics","R. Mukherjee"],["5:00 pm","English & SST","SST","Guest faculty"]],
Fri:[["8:00 am","JEE Main 2-Year","Chemistry","S. Das"],["4:00 pm","Science PCB","Biology","P. Roy"]],
Sat:[["8:00 am","All JEE / NEET","Weekly test","All faculty"],["4:00 pm","Doubt clearing","Open session","All faculty"]]};
const NOTICES=[["2 Oct","New batches start 1 November. Registration closes 25 October.",1],["28 Sep","Puja vacation: no classes 18–22 October.",0],["25 Sep","Scholarship test on 12 October, 10 am. Up to 50% fee waiver.",1],["20 Sep","Parent–teacher meeting this Saturday, 5 pm.",0]];
const MATERIAL=[["Class 10 Maths – Formula Sheet","PDF"],["Physics – Mechanics Notes (JEE)","PDF"],["Biology – NCERT Diagrams (NEET)","PDF"],["Previous Year Papers 2020–25","ZIP"]];

/* ===== helpers ===== */
const $=id=>document.getElementById(id);
const esc=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const wa=t=>`https://wa.me/${CFG.wa}?text=${encodeURIComponent(t)}`;
function tabs(el,items,cur,fn){el.innerHTML=items.map(i=>`<button class="tab" role="tab" aria-selected="${i===cur}" data-v="${esc(i)}">${esc(i)}</button>`).join("");
 el.onclick=e=>{const b=e.target.closest(".tab");if(b)fn(b.dataset.v)}}

/* branding */
$("fname").textContent=CFG.name;$("fphone").textContent=CFG.phone;
$("wa").href=wa("Hello "+CFG.name+", I’d like to know more about admissions.");

/* announcements ticker */
const tk=NOTICES.filter(n=>n[2]).map(n=>n[1]);let ti=0;
function tick(){$("ticker").textContent=tk[ti++%tk.length]}tick();setInterval(tick,5000);

/* today's classes */
const dn=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"][new Date().getDay()];
const dayShow=SCH[dn]?dn:"Mon";
$("today").innerHTML=`<li><small>${SCH[dn]?"Today ("+dn+")":"Sunday: no regular classes. Showing Monday."}</small></li>`+SCH[dayShow].map(r=>`<li><span>${esc(r[2])}</span><span>${esc(r[0])} · ${esc(r[1])}</span></li>`).join("");

/* courses */
const progs=Object.keys(COURSES);
function showCourses(p){tabs($("ctabs"),progs,p,showCourses);
 $("cgrid").innerHTML=COURSES[p].map(c=>`<article class="card"><h3>${esc(c[0])}</h3><div class="meta">${esc(c[1])}<br>${esc(c[2])}</div><span class="seats ${c[3]<5?"low":""}">${c[3]} seats left</span><p style="margin:14px 0 0"><button class="link" data-c="${esc(p)}">Ask about this batch</button></p></article>`).join("");
 $("cgrid").onclick=e=>{const b=e.target.closest("[data-c]");if(b){$("c").value=b.dataset.c;$("admission").scrollIntoView()}}}
showCourses(progs[0]);
$("c").innerHTML=progs.map(p=>`<option>${esc(p)}</option>`).join("");

/* faculty, results */
$("fgrid").innerHTML=FAC.map(f=>`<article class="card fac"><div class="av" aria-hidden="true">${esc(f[0].split(" ").pop()[0])}</div><div><h3 style="margin:0">${esc(f[0])}</h3><p>${esc(f[1])}<br>${esc(f[2])}</p></div></article>`).join("");
$("stats").innerHTML=STATS.map(s=>`<div><b>${esc(s[0])}</b><span>${esc(s[1])}</span></div>`).join("");
$("sgrid").innerHTML=STORIES.map(s=>`<article class="card"><blockquote><p>${esc(s[2])}</p></blockquote><div class="who">${esc(s[0])}, ${esc(s[1])}</div></article>`).join("");

/* schedule */
function showDay(d){tabs($("dtabs"),DAYS,d,showDay);
 $("sbody").innerHTML=SCH[d].map(r=>`<tr>${r.map(x=>`<td>${esc(x)}</td>`).join("")}</tr>`).join("")}
showDay(DAYS.includes(dn)?dn:"Mon");

/* notices & material */
$("nlist").innerHTML=NOTICES.map(n=>`<li><span>${esc(n[1])}${n[2]?'<span class="new">New</span>':""}</span><time>${esc(n[0])}</time></li>`).join("");
$("mlist").innerHTML=MATERIAL.map(m=>`<li><span>${esc(m[0])} <small style="color:var(--muted)">${esc(m[1])}</small></span><a class="link" target="_blank" rel="noopener" href="${wa("Please send study material: "+m[0])}">Get on WhatsApp</a></li>`).join("");

/* admission form: opens WhatsApp with a prefilled message; keeps a draft locally */
const F=["n","p","c","s","q"];
try{const d=JSON.parse(localStorage.getItem("draft")||"{}");F.forEach(k=>{if(d[k])$(k).value=d[k]})}catch(e){}
$("form").addEventListener("input",()=>{try{const d={};F.forEach(k=>d[k]=$(k).value);localStorage.setItem("draft",JSON.stringify(d))}catch(e){}});
$("form").addEventListener("submit",e=>{e.preventDefault();
 const m=$("fmsg");m.style.color="";
 if(!$("n").value.trim()){m.textContent="Enter the student’s name.";$("n").focus();return}
 if(!/^\d{10}$/.test($("p").value.replace(/\D/g,"").slice(-10))){m.textContent="Enter a valid 10-digit phone number.";$("p").focus();return}
 const t=`Admission inquiry – ${CFG.name}\nStudent: ${$("n").value.trim()}\nPhone: ${$("p").value.trim()}\nProgram: ${$("c").value}\nBatch: ${$("s").value}\nQuestion: ${$("q").value.trim()||"-"}`;
 m.textContent="Opening WhatsApp to send your inquiry…";window.open(wa(t),"_blank","noopener");
 try{localStorage.removeItem("draft")}catch(e){}});
