// ── UTILS ──
function fmt(n){return new Intl.NumberFormat('it-IT',{minimumFractionDigits:0,maximumFractionDigits:2}).format(n);}
function fmt2(n){return new Intl.NumberFormat('it-IT',{minimumFractionDigits:2,maximumFractionDigits:2}).format(n);}

// ── ICONS ──
const CAT_ICONS={
  affitto:`<svg viewBox="0 0 24 24"><path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z"/><path d="M9 21V12h6v9"/></svg>`,
  bollette:`<svg viewBox="0 0 24 24"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>`,
  spesa:`<svg viewBox="0 0 24 24"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>`,
  trasporti:`<svg viewBox="0 0 24 24"><rect x="1" y="3" width="15" height="13" rx="2"/><path d="M16 8h4l3 4v3h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>`,
  ristoranti:`<svg viewBox="0 0 24 24"><path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></svg>`,
  svago:`<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8"/></svg>`,
  abbigliamento:`<svg viewBox="0 0 24 24"><path d="M20.38 3.46L16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.57a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.57a2 2 0 0 0-1.34-2.23z"/></svg>`,
  salute:`<svg viewBox="0 0 24 24"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>`,
  tasse:`<svg viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>`,
  investimenti:`<svg viewBox="0 0 24 24"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>`,
  risparmi:`<svg viewBox="0 0 24 24"><path d="M19 5c-1.5 0-2.8 1.4-3 2-3.5-1.5-11-.3-11 5 0 1.8 0 3 2 4.5V20h4v-2h3v2h4v-4c2-.5 3-2.3 3-5 0-.5 0-2.5-2-3z"/><path d="M2 9.5C2 11 4 11.5 4 12"/></svg>`,
};
const ICON_DEF=`<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`;
function catIcon(id){return CAT_ICONS[id]||ICON_DEF;}

// ── THEME ──
let theme=localStorage.getItem('bm_theme')||'dark';
applyTheme();
function toggleTheme(){theme=theme==='dark'?'light':'dark';localStorage.setItem('bm_theme',theme);applyTheme();}
function applyTheme(){
  document.documentElement.setAttribute('data-theme',theme);
  const ic=document.getElementById('themeIcon');
  if(ic){
    ic.innerHTML=theme==='dark'
      ?'<circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>'
      :'<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>';
  }
  const sub=document.getElementById('themeSub');
  if(sub)sub.textContent=theme==='dark'?'Scuro · tocca per passare a chiaro':'Chiaro · tocca per passare a scuro';
}

// ── SCREENS ──
function show(id){document.querySelectorAll('.screen').forEach(s=>s.classList.add('hidden'));document.getElementById(id).classList.remove('hidden');if(id==='onboarding')document.getElementById('onboarding').scrollTop=0;}

// ── PIN ──
const pinDisabled=localStorage.getItem('bm_pin_disabled')==='1';
let savedPin=(!pinDisabled&&localStorage.getItem('bm_pin'))||null;
let pi='',pc='',pmode=savedPin?'login':(pinDisabled?'disabled':'setup'),pstep=0;
(function(){if(pmode==='disabled'){unlock();}else if(pmode==='login'){document.getElementById('pinLbl').textContent='Inserisci il tuo PIN';document.getElementById('pinSub').textContent='Bentornato 👋';document.getElementById('pinSteps').style.display='none';}else{document.getElementById('skipPinBtn').style.display='block';}})();
function pn(n){if(pi.length>=4)return;document.querySelectorAll('.nbtn').forEach(b=>{if(b.textContent===n){b.classList.add('pressed');setTimeout(()=>b.classList.remove('pressed'),150);}});pi+=n;dots();if(pi.length===4)setTimeout(handlePin,200);}
function pd(){if(pi.length){pi=pi.slice(0,-1);dots();}}
function dots(){for(let i=0;i<4;i++){const d=document.getElementById('d'+i);d.classList.toggle('filled',i<pi.length);d.classList.remove('err');}}
function handlePin(){
  if(pmode==='login'){if(pi===savedPin)unlock();else perr('PIN errato. Riprova.');}
  else{if(pstep===0){pc=pi;pi='';pstep=1;dots();document.getElementById('pinLbl').textContent='Conferma il PIN';document.getElementById('ps0').classList.remove('on');document.getElementById('ps1').classList.add('on');}
  else{if(pi===pc){localStorage.setItem('bm_pin',pi);savedPin=pi;unlock();}else{perr('I PIN non coincidono.');setTimeout(()=>{pstep=0;pc='';pi='';dots();document.getElementById('pinLbl').textContent='Crea il tuo PIN';document.getElementById('ps0').classList.add('on');document.getElementById('ps1').classList.remove('on');},900);}}}
}
function perr(msg){pi='';document.querySelectorAll('.pin-dot').forEach(d=>{d.classList.remove('filled');d.classList.add('err');});const l=document.getElementById('pinLbl');l.textContent=msg;l.classList.add('err');setTimeout(()=>{document.querySelectorAll('.pin-dot').forEach(d=>d.classList.remove('err'));l.classList.remove('err');l.textContent=pmode==='login'?'Inserisci il tuo PIN':(pstep===0?'Crea il tuo PIN':'Conferma il PIN');},1100);}
function unlock(){document.getElementById('pinScreen').classList.add('slide-out');setTimeout(()=>{const s=localStorage.getItem('bm_setup');if(s){show('dashScreen');buildDash();}else{show('onboarding');buildCatList();}},320);}
function skipPin(){localStorage.setItem('bm_pin_disabled','1');savedPin=null;unlock();}
document.addEventListener('keydown',e=>{if(e.key>='0'&&e.key<='9')pn(e.key);if(e.key==='Backspace')pd();});

// ── ONBOARDING DATA ──
const CATS=[
  {id:'affitto',name:'Affitto / Mutuo',color:'#7c6af7',pct:0,sug:25,type:'needs',tip:'25% — la regola aurea per l\'abitazione'},
  {id:'bollette',name:'Bollette',color:'#f7a56a',pct:0,sug:8,type:'needs',tip:'8% — utenze, internet, telefono'},
  {id:'spesa',name:'Spesa alimentare',color:'#4fd1a5',pct:0,sug:10,type:'needs',tip:'10% — spesa settimanale'},
  {id:'trasporti',name:'Trasporti',color:'#f7c06a',pct:0,sug:7,type:'needs',tip:'7% — carburante, mezzi, parcheggi'},
  {id:'ristoranti',name:'Ristoranti / Uscite',color:'#f7706a',pct:0,sug:7,type:'wants',tip:'7% — cene, aperitivi, vita sociale'},
  {id:'svago',name:'Svago / Hobby',color:'#60c8f5',pct:0,sug:5,type:'wants',tip:'5% — abbonamenti, hobby, sport'},
  {id:'abbigliamento',name:'Abbigliamento',color:'#b06af7',pct:0,sug:4,type:'wants',tip:'4% — vestiti e accessori'},
  {id:'salute',name:'Salute',color:'#f76ab3',pct:0,sug:4,type:'wants',tip:'4% — visite, farmaci, palestra'},
  {id:'tasse',name:'Accantonamento Tasse',color:'#f7706a',pct:0,sug:20,type:'taxes',tip:'20% — IVA + IRPEF per P.IVA'},
  {id:'investimenti',name:'Investimenti',color:'#f7c06a',pct:0,sug:5,type:'invest',tip:'5% — ETF, azioni, crypto'},
  {id:'risparmi',name:'Risparmi / F. emergenze',color:'#4fd1a5',pct:0,sug:5,type:'savings',tip:'5% — fondo emergenze (6 mesi spese)'},
];
let cats=CATS.map(c=>({...c}));
let income=0,wStep=1;

function onSalary(){const b=parseFloat(document.getElementById('salBase').value)||0,e=parseFloat(document.getElementById('salExtra').value)||0;income=b+e;document.getElementById('salTotal').textContent='€ '+fmt(income);document.getElementById('btnS1').disabled=income<=0;updateEuros();}
function buildCatList(){const list=document.getElementById('catList');list.innerHTML='';cats.forEach(cat=>{const sugEur=income?(income*(cat.sug/100)):0;const curEur=cat.pct&&income?(income*(cat.pct/100)):0;const row=document.createElement('div');row.className='cat-row';row.innerHTML=`<div class="cat-em">${catIcon(cat.id)}</div><div class="cat-info"><div class="cat-name">${cat.name}</div><div class="cat-eur" id="pct_lbl_${cat.id}">0%</div><div class="cat-suggested"><span class="sug-badge ${cat.type}" title="${cat.tip}">✦ €${fmt(sugEur)} consigliato</span></div></div><div class="cat-pct-w"><span class="pct-s" style="color:var(--accent1);font-size:.9rem;font-weight:700;">€</span><input class="cat-pct-i" id="pct_${cat.id}" type="number" inputmode="decimal" min="0" placeholder="${Math.round(sugEur)}" value="${curEur?Math.round(curEur):''}" oninput="onPct('${cat.id}',this.value)"></div>`;list.appendChild(row);});updateEuros();updateBar();}
function autofill(){cats.forEach(c=>{const sugEur=income?(income*(c.sug/100)):0;c.pct=c.sug;const el=document.getElementById('pct_'+c.id);if(el)el.value=Math.round(sugEur);});updateEuros();updateBar();}
function onPct(id,v){const c=cats.find(x=>x.id===id);if(c){const eur=parseFloat(v)||0;c.pct=income?(Math.round(eur/income*10000)/100):0;}updateEuros();updateBar();}
function updateEuros(){cats.forEach(c=>{const el=document.getElementById('pct_lbl_'+c.id);if(el)el.textContent=Math.round(c.pct)+'% del totale';});}
function updateBar(){
  const tot=cats.reduce((s,c)=>s+c.pct,0);
  const fill=document.getElementById('bbFill'),txt=document.getElementById('bbTxt');
  fill.style.width=Math.min(tot,100)+'%';
  const totEur=cats.reduce((s,c)=>s+(income*(c.pct/100)),0);
  const remEur=income-totEur;
  if(tot>100){fill.style.background='var(--red)';txt.className='bb-txt over';txt.textContent='-€'+fmt(Math.abs(remEur))+' ⚠';}
  else if(Math.round(tot)===100){fill.style.background='var(--green)';txt.className='bb-txt ok';txt.textContent='Tutto allocato ✓';}
  else{fill.style.background='var(--accent1)';txt.className='bb-txt ok';txt.textContent='€'+fmt(remEur)+' da allocare';}
  document.getElementById('btnS2').disabled=Math.round(tot)!==100;
}
function goStep(n){document.getElementById('ws'+wStep).classList.remove('active');wStep=n;document.getElementById('ws'+n).classList.add('active');['prog0','prog1','prog2'].forEach((id,i)=>{const p=document.getElementById(id);if(i<n-1)p.className='prog-step done';else if(i===n-1)p.className='prog-step active';else p.className='prog-step';});document.getElementById('onboarding').scrollTop=0;if(n===3)buildConfirm();}
function buildConfirm(){const active=cats.filter(c=>c.pct>0);document.getElementById('confHero').innerHTML=`<div class="ch-row"><span class="ch-label">Stipendio mensile</span><span class="ch-val">€ ${fmt(income)}</span></div><div class="ch-div"></div><div class="ch-row"><span class="ch-label">Categorie attive</span><span class="ch-val">${active.length}</span></div>`;const list=document.getElementById('confList');list.innerHTML='';active.forEach(c=>{const d=document.createElement('div');d.className='conf-row';d.innerHTML=`<div class="conf-em">${catIcon(c.id)}</div><span class="conf-nm">${c.name}</span><span class="conf-pct">${Math.round(c.pct)}%</span><span class="conf-eur">€ ${fmt(income*(c.pct/100))}</span>`;list.appendChild(d);});}
function finish(){const data={income,cats:cats.filter(c=>c.pct>0),createdAt:new Date().toISOString()};localStorage.setItem('bm_setup',JSON.stringify(data));show('dashScreen');buildDash();}

// ── DASHBOARD STATE ──
let expenses=[],setupData=null,modalPreselectedCat=null,catsExpanded=false,editingExpenseId=null;
let currentYear=new Date().getFullYear(),currentMonth=new Date().getMonth();
const MONTHS=['Gennaio','Febbraio','Marzo','Aprile','Maggio','Giugno','Luglio','Agosto','Settembre','Ottobre','Novembre','Dicembre'];
let activeTab='budget';

function loadExpenses(){const r=localStorage.getItem('bm_expenses');expenses=r?JSON.parse(r):[];}
function saveExpenses(){localStorage.setItem('bm_expenses',JSON.stringify(expenses));}

// ── MONTH NAVIGATION ──
function changeMonth(dir){
  currentMonth+=dir;
  if(currentMonth<0){currentMonth=11;currentYear--;}
  if(currentMonth>11){currentMonth=0;currentYear++;}
  buildDash();
}

function isCurrentMonth(){const n=new Date();return currentYear===n.getFullYear()&&currentMonth===n.getMonth();}
function isPastMonth(){const n=new Date();return currentYear<n.getFullYear()||(currentYear===n.getFullYear()&&currentMonth<n.getMonth());}

// ── TABS ──
function switchTab(tab){
  activeTab=tab;
  document.querySelectorAll('.nav-tab').forEach(b=>b.classList.remove('active'));
  document.querySelectorAll('.tab-panel').forEach(p=>p.classList.remove('active'));
  document.getElementById('tab-'+tab).classList.add('active');
  document.getElementById('panel-'+tab).classList.add('active');
  document.getElementById('fab').classList.toggle('hidden', tab==='savings');
  if(tab==='savings')buildSavingsPanel();
}

// ── DASH BUILD ──
function buildDash(){
  const raw=localStorage.getItem('bm_setup');if(!raw)return;
  setupData=JSON.parse(raw);
  loadExpenses();

  // month label + nav arrows
  document.getElementById('dashDate').textContent=MONTHS[currentMonth]+' '+currentYear;
  document.getElementById('mnavNext').disabled=isCurrentMonth();

  // filter expenses for current viewed month
  const monthExp=expenses.filter(e=>{const d=new Date(e.date);return d.getFullYear()===currentYear&&d.getMonth()===currentMonth;});
  const totalBudget=setupData.income;
  const totalSpent=monthExp.reduce((s,e)=>s+e.amount,0);
  const totalLeft=totalBudget-totalSpent;
  const pctUsed=Math.min((totalSpent/totalBudget)*100,100);

  // past month badge
  const past=isPastMonth();
  document.getElementById('pastBadge').style.display=past?'block':'none';
  if(past)document.getElementById('pastBadgeTxt').textContent='Mese passato · sola lettura';

  // close month banner (show only on current month if not already closed)
  const monthKey=`${currentYear}-${String(currentMonth+1).padStart(2,'0')}`;
  const closedMonths=JSON.parse(localStorage.getItem('bm_closed')||'{}');
  const isLastDayOrPast=()=>{const n=new Date();const lastDay=new Date(currentYear,currentMonth+1,0).getDate();return isCurrentMonth()&&n.getDate()>=lastDay-2;};
  const showBanner=isCurrentMonth()&&!closedMonths[monthKey]&&totalLeft>0&&isLastDayOrPast();
  const banner=document.getElementById('closeBanner');
  banner.style.display=showBanner?'flex':'none';
  if(showBanner)document.getElementById('closeBannerSub').textContent=`Avanzo di € ${fmt(totalLeft)} pronto per il salvadanaio`;

  // hero
  document.getElementById('heroAmt').textContent='€ '+fmt(totalBudget);
  document.getElementById('heroSub').textContent=setupData.cats.length+' categorie attive';
  document.getElementById('heroLeft').textContent='€ '+fmt(totalLeft<0?0:totalLeft);
  document.getElementById('heroBar').style.width=pctUsed+'%';
  document.getElementById('heroBar').style.background=pctUsed>=100?'var(--red)':'var(--accent1)';
  document.getElementById('statSpent').textContent='€ '+fmt(totalSpent);
  document.getElementById('statLeft').textContent='€ '+fmt(totalLeft<0?0:totalLeft);
  document.getElementById('statTx').textContent=monthExp.length;

  // chips
  const chips=document.getElementById('catsChips');chips.innerHTML='';
  let over=0,warn=0;
  setupData.cats.forEach(cat=>{
    const budget=setupData.income*(cat.pct/100);
    const spent=monthExp.filter(e=>e.catId===cat.id).reduce((s,e)=>s+e.amount,0);
    if(spent>budget)over++;else if(spent/budget>0.8)warn++;
  });
  if(over){const c=document.createElement('span');c.className='cats-chip over';c.textContent=over+' sforate';chips.appendChild(c);}
  if(warn){const c=document.createElement('span');c.className='cats-chip warn';c.textContent=warn+' vicine';chips.appendChild(c);}
  if(!over&&!warn){const c=document.createElement('span');c.className='cats-chip';c.textContent='tutto ok ✓';chips.appendChild(c);}

  // cat cards
  const container=document.getElementById('dashCats');container.innerHTML='';
  setupData.cats.forEach(cat=>{
    const budget=setupData.income*(cat.pct/100);
    const spent=monthExp.filter(e=>e.catId===cat.id).reduce((s,e)=>s+e.amount,0);
    const left=budget-spent;
    const barPct=Math.min((spent/budget)*100,100);
    const ob=spent>budget;
    const lc=ob?'over':(barPct>80?'warn':'ok');
    const wrap=document.createElement('div');wrap.className='cat-card-wrap';
    wrap.innerHTML=`<div class="cat-card-action" id="action_${cat.id}"><svg viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg></div>
    <div class="cat-card${ob?' over-budget':''}" id="card_${cat.id}">
      <div class="cc-top"><div class="cc-em">${catIcon(cat.id)}</div><span class="cc-nm">${cat.name}</span><span class="cc-pct">${Math.round(cat.pct)}%</span></div>
      <div class="cc-amounts"><span class="cc-spent">Speso: € ${fmt(spent)}</span><span class="cc-left ${lc}">${ob?'⚠ Sforato':'Rimasto: € '+fmt(left)}</span></div>
      <div class="cc-bar-bg"><div class="cc-bar" style="width:${barPct}%;background:${ob?'var(--red)':cat.color}"></div></div>
    </div>`;
    container.appendChild(wrap);
    if(!past)initSwipe(wrap,cat);
  });

  // expense list (tab spese)
  renderExpenseList(monthExp);
  renderExpenseListHome(monthExp);
  document.getElementById('fab').classList.toggle('hidden',past||activeTab==='savings');
  document.getElementById('clearBtn').style.display=monthExp.length>0&&!past?'block':'none';
  document.getElementById('clearBtnHome').style.display=monthExp.length>0&&!past?'block':'none';

  // refresh savings if open
  if(activeTab==='savings')buildSavingsPanel();
}

// ── EXPENSE LIST HOME (ultime 5, compatta) ──
function renderExpenseListHome(list){
  const el=document.getElementById('expListHome');el.innerHTML='';
  const past=isPastMonth();
  if(!list||list.length===0){
    el.innerHTML='<div class="exp-empty"><div class="exp-empty-icon"><svg viewBox="0 0 24 24"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg></div><div class="exp-empty-txt">Nessuna spesa questo mese. Premi + per iniziare!</div></div>';
    return;
  }
  const sorted=[...list].sort((a,b)=>new Date(b.date)-new Date(a.date));
  sorted.slice(0,5).forEach(exp=>{
    const cat=setupData.cats.find(c=>c.id===exp.catId)||{id:'unknown',name:'Altro'};
    const d=new Date(exp.date);
    const dateStr=d.toLocaleDateString('it-IT',{day:'2-digit',month:'short'});
    const wrap=document.createElement('div');wrap.className='exp-row-wrap';
    wrap.innerHTML='<div class="exp-swipe-right"><svg width="20" height="20" viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/></svg></div><div class="exp-swipe-left"><svg width="20" height="20" viewBox="0 0 24 24"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg></div>';
    const row=document.createElement('div');row.className='exp-row';
    row.innerHTML='<div class="exp-em">'+catIcon(cat.id)+'</div><div class="exp-info">'+(exp.desc?'<div class="exp-desc">'+exp.desc+'</div>':'')+'<div class="exp-date">'+cat.name+' · '+dateStr+(exp.recurring?' · ↻':'')+'</div></div><span class="exp-amt">-€ '+fmt2(exp.amount)+'</span>';
    wrap.appendChild(row);
    el.appendChild(wrap);
    initExpSwipe(wrap, exp.id, past);
  });
  if(sorted.length>5){
    const more=document.createElement('button');
    more.style.width='100%';more.style.padding='10px';more.style.background='none';
    more.style.border='1px solid var(--border)';more.style.borderRadius='12px';
    more.style.fontFamily=getComputedStyle(document.documentElement).getPropertyValue('--font');more.style.fontSize='.8rem';
    more.style.color='var(--text2)';more.style.cursor='pointer';more.style.marginTop='4px';
    more.textContent='Vedi tutte le '+sorted.length+' spese →';
    more.onmouseenter=function(){this.style.background='var(--bg3)';};
    more.onmouseleave=function(){this.style.background='none';};
    more.onclick=function(){switchTab('spese');};
    el.appendChild(more);
  }
}

// ── EXPENSE LIST ──
function renderExpenseList(list){
  const el=document.getElementById('expList');el.innerHTML='';
  const past=isPastMonth();
  if(!list||list.length===0){el.innerHTML=`<div class="exp-empty"><div class="exp-empty-icon"><svg viewBox="0 0 24 24"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg></div><div class="exp-empty-txt">Nessuna spesa questo mese</div></div>`;return;}
  const sorted=[...list].sort((a,b)=>new Date(b.date)-new Date(a.date));
  sorted.forEach(exp=>{
    const cat=setupData.cats.find(c=>c.id===exp.catId)||{id:'unknown',name:'Altro'};
    const d=new Date(exp.date);
    const dateStr=d.toLocaleDateString('it-IT',{day:'2-digit',month:'short'});
    const wrap2=document.createElement('div');wrap2.className='exp-row-wrap';
    wrap2.innerHTML='<div class="exp-swipe-right"><svg width="20" height="20" viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/></svg></div><div class="exp-swipe-left"><svg width="20" height="20" viewBox="0 0 24 24"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg></div>';
    const row=document.createElement('div');row.className='exp-row';
    row.innerHTML=`<div class="exp-em">${catIcon(cat.id)}</div><div class="exp-info"><div class="exp-cat">${cat.name}</div><div class="exp-date">${dateStr}</div>${exp.recurring?'<div class="exp-recurring">↻ ricorrente</div>':''}</div><span class="exp-amt">-€ ${fmt2(exp.amount)}</span>`;
    wrap2.appendChild(row);
    el.appendChild(wrap2);
    initExpSwipe(wrap2, exp.id, past);
  });
}

// ── SAVINGS PANEL ──
function buildSavingsPanel(){
  const panel=document.getElementById('panel-savings');
  const closedMonths=JSON.parse(localStorage.getItem('bm_closed')||'{}');
  const totalSaved=Object.values(closedMonths).reduce((s,m)=>s+(m.saved||0),0);
  const closedArr=Object.entries(closedMonths).sort((a,b)=>a[0].localeCompare(b[0]));
  const last3=closedArr.slice(-3).map(([,v])=>v.saved||0);
  const avgMonthly=last3.length?last3.reduce((a,b)=>a+b,0)/last3.length:0;
  const projection=avgMonthly*12;

  let html=`
  <div class="piggy-hero">
    <div class="piggy-top">
      <div>
        <div class="piggy-lbl">Salvadanaio totale</div>
        <div class="piggy-amt">€ ${fmt(totalSaved)}</div>
      </div>
      <div class="piggy-icon"><svg viewBox="0 0 24 24"><path d="M19 5c-1.5 0-2.8 1.4-3 2-3.5-1.5-11-.3-11 5 0 1.8 0 3 2 4.5V20h4v-2h3v2h4v-4c2-.5 3-2.3 3-5 0-.5 0-2.5-2-3z"/><path d="M2 9.5C2 11 4 11.5 4 12"/></svg></div>
    </div>
    <div class="piggy-proj-row">
      <div class="piggy-proj">
        <div class="piggy-proj-lbl">Media / mese</div>
        <div class="piggy-proj-val">€ ${fmt(avgMonthly)}</div>
      </div>
      <div class="piggy-proj">
        <div class="piggy-proj-lbl">Proiezione annuale</div>
        <div class="piggy-proj-val">€ ${fmt(projection)}</div>
      </div>
    </div>
  </div>
  <div class="sec-hdr" style="margin-bottom:10px;">
    <span class="sec-title">Storico versamenti</span>
  </div>
  <div class="month-hist-list">`;

  if(closedArr.length===0){
    html+=`<div class="exp-empty" style="border-radius:18px;">
      <div class="exp-empty-icon"><svg viewBox="0 0 24 24"><path d="M19 5c-1.5 0-2.8 1.4-3 2-3.5-1.5-11-.3-11 5 0 1.8 0 3 2 4.5V20h4v-2h3v2h4v-4c2-.5 3-2.3 3-5 0-.5 0-2.5-2-3z"/></svg></div>
      <div class="exp-empty-txt">Nessun mese chiuso ancora.<br>Chiudi il mese per iniziare a risparmiare!</div>
    </div>`;
  } else {
    [...closedArr].reverse().forEach(([key,data])=>{
      const [y,m]=key.split('-');
      const monthName=MONTHS[parseInt(m)-1]+' '+y;
      const saved=data.saved||0;
      const spent=data.spent||0;
      const budget=data.budget||0;
      html+=`<div class="mhist-row">
        <div class="mhist-info">
          <div class="mhist-month">${monthName}</div>
          <div class="mhist-detail">Speso € ${fmt(spent)} su € ${fmt(budget)}</div>
          <span class="mhist-badge saved">+€ ${fmt(saved)} salvati</span>
        </div>
        <div style="text-align:right;">
          <div class="mhist-amt">+€ ${fmt(saved)}</div>
        </div>
      </div>`;
    });
  }
  html+='</div>';
  panel.innerHTML=html;
}

// ── CLOSE MONTH ──
function openCloseMonth(){
  const monthExp=expenses.filter(e=>{const d=new Date(e.date);return d.getFullYear()===currentYear&&d.getMonth()===currentMonth;});
  const totalSpent=monthExp.reduce((s,e)=>s+e.amount,0);
  const totalLeft=setupData.income-totalSpent;
  document.getElementById('closeMonthPreview').innerHTML=`
    <div class="cmp-row"><span class="cmp-lbl">Budget del mese</span><span class="cmp-val">€ ${fmt(setupData.income)}</span></div>
    <div class="cmp-row"><span class="cmp-lbl">Totale speso</span><span class="cmp-val red">€ ${fmt(totalSpent)}</span></div>
    <div class="cmp-div"></div>
    <div class="cmp-row"><span class="cmp-lbl">Avanzo al salvadanaio</span><span class="cmp-val green">€ ${fmt(totalLeft)}</span></div>`;
  document.getElementById('closeMonthOverlay').classList.add('open');
}
function handleCloseOverlayClick(e){if(e.target===document.getElementById('closeMonthOverlay'))document.getElementById('closeMonthOverlay').classList.remove('open');}
function confirmCloseMonth(){
  const monthExp=expenses.filter(e=>{const d=new Date(e.date);return d.getFullYear()===currentYear&&d.getMonth()===currentMonth;});
  const totalSpent=monthExp.reduce((s,e)=>s+e.amount,0);
  const totalLeft=setupData.income-totalSpent;
  const monthKey=`${currentYear}-${String(currentMonth+1).padStart(2,'0')}`;
  const closedMonths=JSON.parse(localStorage.getItem('bm_closed')||'{}');
  closedMonths[monthKey]={saved:Math.max(0,totalLeft),spent:totalSpent,budget:setupData.income,closedAt:new Date().toISOString()};
  localStorage.setItem('bm_closed',JSON.stringify(closedMonths));
  document.getElementById('closeMonthOverlay').classList.remove('open');
  buildDash();
  setTimeout(()=>switchTab('savings'),400);
}

// ── COLLAPSIBLE CATS ──
function toggleCats(){
  catsExpanded=!catsExpanded;
  document.getElementById('dashCats').classList.toggle('expanded',catsExpanded);
  const btn=document.getElementById('catsToggleBtn');
  btn.classList.toggle('open',catsExpanded);
  btn.querySelector('.cats-collapse-label').textContent=catsExpanded?'Comprimi':'Vedi tutte';
}

// ── SWIPE ──
function initExpSwipe(wrap, expId, past){
  if(past) return;
  const row = wrap.querySelector('.exp-row');
  const actEdit = wrap.querySelector('.exp-swipe-left');
  const actDel = wrap.querySelector('.exp-swipe-right');
  let sx=0, dx=0, drag=false;
  const TRIGGER=70;

  const start = (x) => { sx=x; dx=0; drag=true; row.classList.add('dragging'); };
  const move = (x) => {
    if(!drag) return;
    dx = x - sx;
    const clamped = Math.max(-90, Math.min(90, dx));
    row.style.transform = `translateX(${clamped}px)`;
    if(clamped < 0){ actEdit.style.opacity = Math.min(1, Math.abs(clamped)/TRIGGER); actDel.style.opacity=0; }
    else { actDel.style.opacity = Math.min(1, clamped/TRIGGER); actEdit.style.opacity=0; }
  };
  const end = () => {
    if(!drag) return;
    drag=false;
    row.classList.remove('dragging');
    if(dx < -TRIGGER){ openEditModal(expId); }
    else if(dx > TRIGGER){ deleteExpense(expId); }
    row.style.transform = '';
    actEdit.style.opacity=0;
    actDel.style.opacity=0;
  };
  row.addEventListener('touchstart', ev=>start(ev.touches[0].clientX), {passive:true});
  row.addEventListener('touchmove', ev=>move(ev.touches[0].clientX), {passive:true});
  row.addEventListener('touchend', end);
  row.addEventListener('mousedown', ev=>start(ev.clientX));
  window.addEventListener('mousemove', ev=>{if(drag)move(ev.clientX);});
  window.addEventListener('mouseup', end);
}

function initSwipe(wrap,cat){
  const card=wrap.querySelector('.cat-card'),action=wrap.querySelector('.cat-card-action');
  let sx=0,cx=0,drag=false,trig=false;
  const s=(x)=>{sx=x;cx=x;drag=true;trig=false;card.classList.add('swiping');};
  const m=(x)=>{if(!drag)return;cx=x;const dx=Math.min(0,Math.max(-100,cx-sx));card.style.transform=`translateX(${dx}px)`;action.style.opacity=Math.min(1,Math.abs(dx)/60);if(dx<-70&&!trig){trig=true;action.style.background='var(--accent3)';}else if(dx>=-70&&trig){trig=false;action.style.background='var(--accent1)';}};
  const e=()=>{if(!drag)return;drag=false;card.classList.remove('swiping');card.style.transform='';action.style.opacity=0;if(trig)openModal(cat.id);};
  card.addEventListener('touchstart',ev=>s(ev.touches[0].clientX),{passive:true});
  card.addEventListener('touchmove',ev=>m(ev.touches[0].clientX),{passive:true});
  card.addEventListener('touchend',e);
  card.addEventListener('mousedown',ev=>s(ev.clientX));
  window.addEventListener('mousemove',ev=>{if(drag)m(ev.clientX);});
  window.addEventListener('mouseup',e);
}

// ── MODAL ──
function openModal(catId){
  editingExpenseId=null;
  modalPreselectedCat=catId;buildCatPicker(catId);
  document.getElementById('fDate').value=new Date().toISOString().split('T')[0];
  document.getElementById('fAmount').value='';document.getElementById('fDesc').value='';document.getElementById('fRecurring').checked=false;
  const t=document.getElementById('modalTitleCat');
  if(catId){const c=setupData.cats.find(x=>x.id===catId);t.textContent=c?c.name:'spesa';}else t.textContent='spesa';
  document.getElementById('modalSaveBtn').textContent='Aggiungi spesa';
  document.getElementById('modalOverlay').classList.add('open');
  setTimeout(()=>document.getElementById('fAmount').focus(),400);
}
function openEditModal(expId){
  const exp=expenses.find(e=>e.id===expId);if(!exp)return;
  editingExpenseId=expId;
  modalPreselectedCat=exp.catId;buildCatPicker(exp.catId);
  document.getElementById('fAmount').value=exp.amount;
  document.getElementById('fDesc').value=exp.desc||'';
  document.getElementById('fDate').value=exp.date;
  document.getElementById('fRecurring').checked=exp.recurring||false;
  const cat=setupData.cats.find(x=>x.id===exp.catId);
  document.getElementById('modalTitleCat').textContent=cat?cat.name:'spesa';
  document.getElementById('modalSaveBtn').textContent='Salva modifiche';
  document.getElementById('modalOverlay').classList.add('open');
  setTimeout(()=>document.getElementById('fAmount').focus(),400);
}
function buildCatPicker(sel){
  const p=document.getElementById('catPicker');p.innerHTML='';
  setupData.cats.forEach(cat=>{
    const btn=document.createElement('button');btn.className='cat-pick-btn'+(cat.id===sel?' selected':'');
    btn.innerHTML=`<div class="cpb-em">${catIcon(cat.id)}</div><span class="cpb-nm">${cat.name}</span>`;
    btn.onclick=()=>{document.querySelectorAll('.cat-pick-btn').forEach(b=>b.classList.remove('selected'));btn.classList.add('selected');modalPreselectedCat=cat.id;document.getElementById('modalTitleCat').textContent=cat.name;};
    p.appendChild(btn);
  });
}
function handleOverlayClick(e){if(e.target===document.getElementById('modalOverlay'))closeModal();}
function closeModal(){document.getElementById('modalOverlay').classList.remove('open');}
function saveExpense(){
  const amount=parseFloat(document.getElementById('fAmount').value);
  if(!amount||amount<=0){document.getElementById('fAmount').style.borderColor='var(--red)';setTimeout(()=>document.getElementById('fAmount').style.borderColor='',1000);return;}
  if(!modalPreselectedCat){document.querySelectorAll('.cat-pick-btn').forEach(b=>b.style.outline='1px solid var(--red)');setTimeout(()=>document.querySelectorAll('.cat-pick-btn').forEach(b=>b.style.outline=''),1000);return;}
  const date=document.getElementById('fDate').value||new Date().toISOString().split('T')[0];
  const recurring=document.getElementById('fRecurring').checked;
  const desc=document.getElementById('fDesc').value.trim();
  if(editingExpenseId){
    const idx=expenses.findIndex(e=>e.id===editingExpenseId);
    if(idx>-1)expenses[idx]={...expenses[idx],catId:modalPreselectedCat,amount,date,recurring,desc};
    editingExpenseId=null;
  } else {
    expenses.push({id:Date.now().toString(),catId:modalPreselectedCat,amount,date,recurring,desc});
  }
  saveExpenses();closeModal();buildDash();
}
function deleteExpense(id){expenses=expenses.filter(e=>e.id!==id);saveExpenses();buildDash();}
function clearAll(){if(!confirm('Eliminare tutte le spese di questo mese?'))return;expenses=expenses.filter(e=>{const d=new Date(e.date);return!(d.getFullYear()===currentYear&&d.getMonth()===currentMonth);});saveExpenses();buildDash();}

// ── SETTINGS ──
function togglePinEnabled(){
  const disabled=localStorage.getItem('bm_pin_disabled')==='1';
  if(disabled){
    localStorage.removeItem('bm_pin_disabled');
    document.getElementById('pinChangeRow').style.display='flex';
    updatePinToggleUI();
    openPinReset();
  } else {
    localStorage.removeItem('bm_pin');
    localStorage.setItem('bm_pin_disabled','1');
    savedPin=null;
    updatePinToggleUI();
    showToast('PIN disattivato');
  }
}
function updatePinToggleUI(){
  const disabled=localStorage.getItem('bm_pin_disabled')==='1';
  const lbl=document.getElementById('pinToggleLabel');
  const sub=document.getElementById('pinToggleSub');
  const chk=document.getElementById('pinToggleCheck');
  const changeRow=document.getElementById('pinChangeRow');
  if(lbl){lbl.textContent=disabled?'PIN disattivato':'PIN attivo';}
  if(sub){sub.textContent=disabled?'Tocca per attivare':'Tocca per disattivare';}
  if(chk){chk.checked=!disabled;}
  if(changeRow){changeRow.style.display=disabled?'none':'flex';}
}
function openSettings(){setCatsExpanded=false;updatePinToggleUI();
  const raw=localStorage.getItem('bm_setup');if(!raw)return;
  const sd=JSON.parse(raw);
  const base=parseFloat(localStorage.getItem('bm_salBase'))||sd.income;
  const extra=parseFloat(localStorage.getItem('bm_salExtra'))||0;
  document.getElementById('setBase').value=base||'';
  document.getElementById('setExtra').value=extra||'';
  document.getElementById('setTotal').textContent='€ '+fmt(base+extra);
  buildSetCatList(sd.cats);
  document.getElementById('settingsOverlay').classList.add('open');
}
function closeSettings(){document.getElementById('settingsOverlay').classList.remove('open');}
function handleSettingsOverlay(e){if(e.target===document.getElementById('settingsOverlay'))closeSettings();}

function onSetSalary(){
  const b=parseFloat(document.getElementById('setBase').value)||0;
  const ex=parseFloat(document.getElementById('setExtra').value)||0;
  document.getElementById('setTotal').textContent='€ '+fmt(b+ex);
  renderSetCatList();
}

// working copy of cats for settings
let setCats=[];
function buildSetCatList(cats){
  setCats=cats.map(c=>({...c}));
  renderSetCatList();
}
let setCatsExpanded = false;
function renderSetCatList(){
  const container=document.getElementById('setCatList');container.innerHTML='';
  const PREVIEW=3;
  const inc=parseFloat(document.getElementById('setBase').value||0)+parseFloat(document.getElementById('setExtra').value||0)||setupData.income;
  setCats.forEach((cat,i)=>{
    const eurVal=Math.round(inc*(cat.pct/100));
    const row=document.createElement('div');
    row.className='set-cat-row';
    if(i>=PREVIEW&&!setCatsExpanded) row.style.display='none';
    row.setAttribute('data-cat-idx',i);
    row.innerHTML=`
      <div class="set-cat-em">${catIcon(cat.id)}</div>
      <div class="set-cat-name">${cat.name}<div style="font-family:var(--font);font-size:.68rem;color:var(--text2);margin-top:1px;">${Math.round(cat.pct)}%</div></div>
      <div class="set-cat-pct">
        <span style="font-family:var(--font);font-weight:700;font-size:.9rem;color:var(--accent1);">€</span>
        <input type="number" inputmode="decimal" min="0" value="${eurVal}" oninput="onSetCatPct(${i},this.value)">
      </div>
      <button class="set-cat-del" onclick="deleteSetCat(${i})">
        <svg viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6M14 11v6"/></svg>
      </button>`;
    container.appendChild(row);
  });
  const toggle=document.getElementById('setCatsToggle');
  const toggleTxt=document.getElementById('setCatsToggleTxt');
  const hidden=setCats.length-PREVIEW;
  if(hidden<=0){toggle.style.display='none';}
  else{
    toggle.style.display='flex';
    if(setCatsExpanded){toggleTxt.textContent='Mostra meno';toggle.classList.add('open');}
    else{toggleTxt.textContent='Mostra tutte ('+setCats.length+')';toggle.classList.remove('open');}
  }
  updateSetBar();
}
function toggleSetCats(){
  setCatsExpanded=!setCatsExpanded;
  const PREVIEW=3;
  document.querySelectorAll('#setCatList .set-cat-row').forEach((row,i)=>{
    row.style.display=(i>=PREVIEW&&!setCatsExpanded)?'none':'flex';
  });
  const toggle=document.getElementById('setCatsToggle');
  const toggleTxt=document.getElementById('setCatsToggleTxt');
  const hidden=setCats.length-PREVIEW;
  if(setCatsExpanded){toggleTxt.textContent='Mostra meno';toggle.classList.add('open');}
  else{toggleTxt.textContent='Mostra tutte ('+setCats.length+')';toggle.classList.remove('open');}
}
function onSetCatPct(i,v){
  const inc=parseFloat(document.getElementById('setBase').value||0)+parseFloat(document.getElementById('setExtra').value||0)||setupData.income;
  const eur=parseFloat(v)||0;
  setCats[i].pct=inc?(eur/inc*100):0;
  updateSetBar();
}
function deleteSetCat(i){
  if(setCats.length<=1){alert('Devi avere almeno una categoria.');return;}
  if(!confirm('Eliminare la categoria "'+setCats[i].name+'"?\nLe spese associate rimarranno nel storico.'))return;
  setCats.splice(i,1);renderSetCatList();
}
function updateSetBar(){
  const inc=parseFloat(document.getElementById('setBase').value||0)+parseFloat(document.getElementById('setExtra').value||0)||setupData.income;
  const tot=setCats.reduce((s,c)=>s+c.pct,0);
  const fill=document.getElementById('setBarFill'),txt=document.getElementById('setBarTxt');
  fill.style.width=Math.min(tot,100)+'%';
  const remEur=inc-setCats.reduce((s,c)=>s+(inc*(c.pct/100)),0);
  if(tot>100){fill.style.background='var(--red)';txt.style.color='var(--red)';txt.textContent='-€'+fmt(Math.abs(remEur))+' ⚠';}
  else if(Math.round(tot)===100){fill.style.background='var(--green)';txt.style.color='var(--green)';txt.textContent='Tutto allocato ✓';}
  else{fill.style.background='var(--accent1)';txt.style.color='var(--text2)';txt.textContent='€'+fmt(remEur)+' da allocare';}
}

function saveSettings(){
  const base=parseFloat(document.getElementById('setBase').value)||0;
  const extra=parseFloat(document.getElementById('setExtra').value)||0;
  if(base<=0){alert('Inserisci uno stipendio valido.');return;}
  const tot=Math.round(setCats.reduce((s,c)=>s+c.pct,0));
  if(tot!==100){const inc2=base+extra;const totEur=setCats.reduce((s,c)=>s+(inc2*(c.pct/100)),0);alert('Gli importi devono coprire tutto lo stipendio. Mancano €'+fmt(inc2-totEur)+'.');return;}
  const newIncome=base+extra;
  localStorage.setItem('bm_salBase',base);
  localStorage.setItem('bm_salExtra',extra);
  const sd=JSON.parse(localStorage.getItem('bm_setup')||'{}');
  sd.income=newIncome;sd.cats=setCats;
  localStorage.setItem('bm_setup',JSON.stringify(sd));
  closeSettings();buildDash();
  showToast('Impostazioni salvate ✓');
}

// ── NEW CATEGORY ──
function openNewCatModal(){
  document.getElementById('newCatName').value='';
  document.getElementById('newCatPct').value='';
  document.getElementById('newCatOverlay').classList.add('open');
  setTimeout(()=>document.getElementById('newCatName').focus(),350);
}
function handleNewCatOverlay(e){if(e.target===document.getElementById('newCatOverlay'))document.getElementById('newCatOverlay').classList.remove('open');}
function confirmNewCat(){
  const name=document.getElementById('newCatName').value.trim();
  const eur=parseFloat(document.getElementById('newCatPct').value)||0;
  if(!name){document.getElementById('newCatName').style.borderColor='var(--red)';setTimeout(()=>document.getElementById('newCatName').style.borderColor='',1000);return;}
  const inc=parseFloat(document.getElementById('setBase').value||0)+parseFloat(document.getElementById('setExtra').value||0)||setupData.income;
  const pct=inc?(eur/inc*100):0;
  const id='cat_'+Date.now();
  setCats.push({id,name,pct,color:'#8A8AA8',type:'custom'});
  document.getElementById('newCatOverlay').classList.remove('open');
  renderSetCatList();
}

// ── PIN RESET ──
let mpi='',mpc='',mpstep=0;
function openPinReset(){
  mpi='';mpc='';mpstep=0;
  miniDots();
  document.getElementById('pinResetLbl').textContent='Nuovo PIN';
  document.getElementById('pinResetLbl').classList.remove('err');
  document.getElementById('pinResetSub').textContent='Inserisci il nuovo PIN a 4 cifre';
  document.getElementById('pinResetOverlay').classList.add('open');
}
function handlePinResetOverlay(e){if(e.target===document.getElementById('pinResetOverlay'))document.getElementById('pinResetOverlay').classList.remove('open');}
function mpn(n){
  if(mpi.length>=4)return;
  document.querySelectorAll('.mini-nbtn').forEach(b=>{if(b.textContent===n){b.classList.add('pressed');setTimeout(()=>b.classList.remove('pressed'),150);}});
  mpi+=n;miniDots();
  if(mpi.length===4)setTimeout(handleMiniPin,200);
}
function mpd(){if(mpi.length){mpi=mpi.slice(0,-1);miniDots();}}
function miniDots(){for(let i=0;i<4;i++){const d=document.getElementById('md'+i);d.classList.toggle('filled',i<mpi.length);d.classList.remove('err');}}
function handleMiniPin(){
  if(mpstep===0){
    mpc=mpi;mpi='';mpstep=1;miniDots();
    document.getElementById('pinResetLbl').textContent='Conferma PIN';
    document.getElementById('pinResetSub').textContent='Reinserisci il PIN per confermare';
  } else {
    if(mpi===mpc){
      localStorage.setItem('bm_pin',mpi);savedPin=mpi;
      document.getElementById('pinResetOverlay').classList.remove('open');
      showToast('PIN aggiornato ✓');
    } else {
      mpi='';for(let i=0;i<4;i++)document.getElementById('md'+i).classList.add('err');
      const l=document.getElementById('pinResetLbl');l.textContent='I PIN non coincidono';l.classList.add('err');
      setTimeout(()=>{for(let i=0;i<4;i++)document.getElementById('md'+i).classList.remove('err');l.classList.remove('err');mpi='';mpc='';mpstep=0;miniDots();l.textContent='Nuovo PIN';document.getElementById('pinResetSub').textContent='Inserisci il nuovo PIN a 4 cifre';},1200);
    }
  }
}

// ── RESET APP ──
function resetApp(){
  if(!confirm('⚠ Reset completo?\n\nVerranno eliminati:\n• Tutte le spese\n• Impostazioni e categorie\n• PIN\n• Salvadanaio\n\nQuesta azione è irreversibile.'))return;
  ['bm_pin','bm_setup','bm_expenses','bm_closed','bm_theme','bm_salBase','bm_salExtra'].forEach(k=>localStorage.removeItem(k));
  location.reload();
}

// ── TOAST ──
function showToast(msg){
  const t=document.createElement('div');
  t.style.cssText=`position:fixed;bottom:calc(env(safe-area-inset-bottom, 0px) + 90px);left:50%;transform:translateX(-50%);background:var(--card-bg);border:1px solid var(--border);border-radius:12px;padding:10px 18px;font-family:var(--font);font-size:.84rem;color:var(--text);z-index:999;box-shadow:0 4px 20px var(--shadow2);white-space:nowrap;animation:fadeUp .3s cubic-bezier(.16,1,.3,1) both;`;
  t.textContent=msg;document.body.appendChild(t);
  setTimeout(()=>{t.style.transition='opacity .3s';t.style.opacity='0';setTimeout(()=>t.remove(),300);},2200);
}

// ── SERVICE WORKER ──
if('serviceWorker' in navigator){
  window.addEventListener('load', async () => {
    try {
      const reg = await navigator.serviceWorker.register('/sw.js');

      document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible') reg.update();
      });

      reg.addEventListener('updatefound', () => {
        const newSW = reg.installing;
        newSW.addEventListener('statechange', () => {
          if (newSW.state === 'installed' && navigator.serviceWorker.controller) {
            newSW.postMessage('skipWaiting');
          }
        });
      });

      let refreshing = false;
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        if (!refreshing) { refreshing = true; location.reload(); }
      });

    } catch(e) {}
  });
}
