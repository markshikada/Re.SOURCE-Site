/* Shared masters navigator — one switcher component, two placements.
   - Pill mode (default, every instrument master and index page): the floating
     compact pill, fixed top-right — the HUD law (AGENTS.md).
   - Bar mode (hub pages, HQ first, edition v11): the same switcher absorbed
     into the fixed universal top bar declared as <header id="rsTopBar">
     (lib/topbar.css). The page's own context links get the scroll spy.
   One markup pattern (.rsnav trigger + .rsnav-list), one builder, no
   per-page code. The master list lives here and only here.

   Edition v11.1 (compact modern law, safe-area): pill and bar share one compact treatment —
   tokens only, no heavy glows, no large paddings. The dropdown is a compact
   card: 6px padding, 2px gap, 32px row, subtle shadow, max 280px / 70vh,
   scrollable. Desktop and mobile are identical; only placement differs. */
(function(){
var THIS_SCRIPT=document.currentScript;
var pendingSections=[],navList=null,navEl=null,addedTitles={};
window.rsNavAddSection=function(title,items){
  if(addedTitles[title])return;
  addedTitles[title]=true;
  if(navList){renderSection(title,items)}else{pendingSections.push([title,items])}
};
function renderSection(title,items){
  var hr=document.createElement('div');hr.className='rsnav-divider';
  var h=document.createElement('div');h.className='rsnav-heading';h.textContent=title;
  navList.appendChild(hr);navList.appendChild(h);
  var hashLinks=[];
  items.forEach(function(it){
    var a=document.createElement(it.href?'a':'button');
    a.className='rsnav-link';
    a.textContent=it.label;
    if(it.href)a.href=it.href;
    if(it.onClick)a.addEventListener('click',it.onClick);
    navList.appendChild(a);
    if(it.href&&it.href.charAt(0)==='#')hashLinks.push(a);
  });
  if(hashLinks.length)setupScrollSpy(hashLinks);
}
var scrollSpyLinks=[];
function setupScrollSpy(links){
  scrollSpyLinks=scrollSpyLinks.concat(links);
  if(scrollSpyLinks.__wired)return;
  scrollSpyLinks.__wired=true;
  var ticking=false;
  function update(){
    ticking=false;
    var line=window.innerHeight*0.25,bestId=null,bestTop=-Infinity,minTop=Infinity,fallbackId=null;
    scrollSpyLinks.forEach(function(a){
      var id=a.getAttribute('href').slice(1),el=document.getElementById(id);
      if(!el)return;
      var top=el.getBoundingClientRect().top;
      if(top<=line&&top>bestTop){bestTop=top;bestId=id}
      if(top<minTop){minTop=top;fallbackId=id}
    });
    var activeId=bestId||fallbackId;
    scrollSpyLinks.forEach(function(a){a.classList.toggle('rsnav-section-active',a.getAttribute('href').slice(1)===activeId)});
  }
  function onScroll(){if(!ticking){ticking=true;requestAnimationFrame(update)}}
  window.addEventListener('scroll',onScroll,{passive:true});
  window.addEventListener('resize',onScroll);
  update();
  [400,1000,2000].forEach(function(ms){setTimeout(update,ms)});
}
var MASTERS=[
{name:'Re.Source HQ',path:'HQ.html'},
{name:'Colour FLOWER',path:'templates/colour-flower/ColourFlower.dc.html'},
{name:'Colour LINGO',path:'templates/colour-lingo/ColourLingo.dc.html'},
{name:'Colour WHEEL',path:'templates/colour-wheel/ColourWheel.dc.html'},
{name:'Word CARD',path:'templates/word-card/WordCard.dc.html'},
{name:'Word DECK',path:'templates/word-deck/WordDeck.dc.html'},
{name:'Brand LOGO',path:'templates/brand-logo/BrandLogo.dc.html'},
{name:'Brand STYLE',path:'templates/brand-style/BrandStyle.dc.html'},
{name:'Brand MASTERS',path:'Masters.html'}
];
function masterRoot(){
  return (THIS_SCRIPT&&THIS_SCRIPT.src?THIS_SCRIPT.src:'').replace(/lib\/masters-nav\.js(\?.*)?$/,'');
}
function findCurrent(){
  var here=location.pathname.replace(/^\//,'');
  var current=null;
  MASTERS.forEach(function(m){if(here.indexOf(m.path)>=0)current=m});
  return current;
}
/* The one switcher: trigger + master list. Pill mode floats it (injected
   styles); bar mode anchors it inside the top bar (lib/topbar.css). */
function buildSwitcher(root,current,label){
  var nav=document.createElement('nav');
  nav.className='rsnav';
  nav.setAttribute('aria-label','Masters navigator');
  var trigger=document.createElement('button');
  trigger.className='rsnav-trigger';
  trigger.setAttribute('aria-expanded','false');
  trigger.innerHTML='<span>'+(label||'Masters')+'</span><span class="rsnav-chevron">▾</span>';
  var list=document.createElement('div');
  list.className='rsnav-list';
  MASTERS.forEach(function(m){
    var isHere=current===m;
    var a=document.createElement(isHere?'span':'a');
    a.className='rsnav-link'+(isHere?' rsnav-current':'');
    a.textContent=m.name;
    if(isHere){a.setAttribute('aria-current','page')}
    if(!isHere){a.href=root+m.path}
    list.appendChild(a);
  });
  function setOpen(open){
    nav.classList.toggle('rsnav-open',open);
    trigger.setAttribute('aria-expanded',open?'true':'false');
  }
  nav.appendChild(trigger);nav.appendChild(list);
  return {nav:nav,trigger:trigger,list:list,setOpen:setOpen};
}
/* Pill mode: hover-hold plus click disclosure, floating top-right. */
function wirePill(sw){
  var nav=sw.nav,trigger=sw.trigger;
  trigger.addEventListener('click',function(e){
    e.stopPropagation();
    sw.setOpen(!nav.classList.contains('rsnav-open'));
  });
  var closeTimer=null;
  function hold(open){
    if(closeTimer){clearTimeout(closeTimer);closeTimer=null}
    if(open){sw.setOpen(true)}else{closeTimer=setTimeout(function(){sw.setOpen(false)},120)}
  }
  nav.addEventListener('mouseenter',function(){hold(true)});
  nav.addEventListener('mouseleave',function(){hold(false)});
  nav.addEventListener('focusin',function(){hold(true)});
  nav.addEventListener('focusout',function(e){if(!nav.contains(e.relatedTarget))hold(false)});
  document.addEventListener('click',function(e){
    if(!nav.contains(e.target))nav.classList.remove('rsnav-open');
  });
}
/* Bar mode: click disclosure (touch-first), Escape, focusout, outside click. */
function wireBar(sw){
  var nav=sw.nav,trigger=sw.trigger,list=sw.list;
  function setOpenBar(open){
    sw.setOpen(open);
    trigger.setAttribute('aria-label',(open?'Close':'Open')+' masters navigation');
  }
  trigger.setAttribute('aria-label','Open masters navigation');
  setOpenBar(false);
  trigger.addEventListener('click',function(){sw.setOpen(trigger.getAttribute('aria-expanded')!=='true')});
  nav.addEventListener('keydown',function(event){
    if(event.key==='Escape'){setOpenBar(false);trigger.focus();}
  });
  nav.addEventListener('focusout',function(event){
    if(!nav.contains(event.relatedTarget))setOpenBar(false);
  });
  list.addEventListener('click',function(event){
    if(event.target.closest('a'))setOpenBar(false);
  });
  document.addEventListener('click',function(e){
    if(!nav.contains(e.target))setOpenBar(false);
  });
}
function injectStyles(){
  var style=document.createElement('style');
  style.textContent=
    /* Compact modern navigator — one treatment for pill and bar, desktop and mobile */
    '.rsnav{position:fixed;top:max(20px,env(safe-area-inset-top,0px));right:max(20px,env(safe-area-inset-right,0px));padding:0;'+
    'font-family:var(--font-mono,\"JetBrains Mono\",ui-monospace,monospace);'+
    'font-size:11px;line-height:16px;letter-spacing:0.02em;text-transform:uppercase;'+
    'text-align:right;z-index:99999;display:flex;flex-direction:column;align-items:flex-end;gap:6px;'+
    'opacity:0;transform:translateY(-4px);animation:rsnavIn 180ms cubic-bezier(0,0,0.5,1) 120ms both}'+
    '.rsnav-trigger{width:max-content;min-height:32px;padding:6px 10px;'+
    'background:var(--surface-card,#111111);border:1px solid var(--surface-border,#2a2a2a);'+
    'border-radius:var(--radius-sm,8px);color:var(--text-secondary,#888888);cursor:pointer;'+
    'display:flex;align-items:center;gap:6px;'+
    'transition:color 150ms cubic-bezier(0,0,0.5,1),border-color 150ms cubic-bezier(0,0,0.5,1),background 150ms cubic-bezier(0,0,0.5,1);'+
    'font:inherit;text-transform:inherit;letter-spacing:inherit;'+
    'box-shadow:0 2px 12px rgba(0,0,0,0.3);touch-action:manipulation}'+
    '.rsnav-trigger:hover{color:var(--text-primary,#ffffff);border-color:var(--g66,#666666);background:var(--surface-raised,#1a1a1a)}'+
    '.rsnav-trigger:focus-visible{outline:2px solid var(--g88,#cccccc);outline-offset:2px}'+
    '.rsnav.rsnav-open .rsnav-trigger{color:var(--text-primary,#ffffff);border-color:var(--text-secondary,#888888);background:var(--surface-raised,#1a1a1a)}'+
    '.rsnav-chevron{font-size:10px;transition:transform 150ms cubic-bezier(0,0,0.5,1);opacity:0.7}'+
    '.rsnav.rsnav-open .rsnav-chevron{transform:rotate(180deg);opacity:1}'+
    '.rsnav-list{position:absolute;top:calc(100% + 6px);right:0;'+
    'width:max-content;min-width:180px;max-width:min(280px,calc(100vw - 24px - env(safe-area-inset-left,0px) - env(safe-area-inset-right,0px)));'+
    'max-height:min(70vh,420px);overflow-y:auto;overflow-x:hidden;'+
    'padding:6px;margin:0;'+
    'background:var(--surface-card,#111111);background-clip:padding-box;'+
    'border:1px solid var(--surface-border,#2a2a2a);border-radius:var(--radius-sm,8px);'+
    'box-shadow:0 8px 32px rgba(0,0,0,0.4),0 0 0 1px rgba(255,255,255,0.04) inset;'+
    'display:flex;flex-direction:column;align-items:stretch;text-align:left;gap:2px;'+
    'opacity:0;visibility:hidden;transform:translateY(-4px) scale(0.98);pointer-events:none;'+
    'transition:opacity 150ms cubic-bezier(0,0,0.5,1),transform 150ms cubic-bezier(0,0,0.5,1),visibility 0ms 150ms;'+
    'scrollbar-width:thin;scrollbar-color:var(--surface-border,#2a2a2a) transparent}'+
    '.rsnav-list::-webkit-scrollbar{width:4px}'+
    '.rsnav-list::-webkit-scrollbar-thumb{background:var(--surface-border,#2a2a2a);border-radius:2px}'+
    '.rsnav.rsnav-open .rsnav-list{opacity:1;visibility:visible;transform:translateY(0) scale(1);pointer-events:auto;transition-delay:0ms}'+
    '.rsnav-link{color:var(--text-secondary,#888888);text-decoration:none;text-align:left;'+
    'background:none;border:0;padding:7px 10px;font:inherit;cursor:pointer;'+
    'transition:color 120ms cubic-bezier(0,0,0.5,1),background 120ms cubic-bezier(0,0,0.5,1);'+
    'border-radius:6px;min-height:32px;display:flex;align-items:center;white-space:nowrap;letter-spacing:inherit;touch-action:manipulation}'+
    '.rsnav-link:hover{color:var(--text-primary,#ffffff);background:var(--g12,#1a1a1a)}'+
    '.rsnav-link:focus-visible{outline:2px solid var(--g88,#cccccc);outline-offset:2px}'+
    '.rsnav-link.rsnav-current{color:var(--text-primary,#ffffff);background:var(--g12,#1a1a1a);cursor:default}'+
    '.rsnav-link.rsnav-section-active{color:var(--text-primary,#ffffff);background:var(--g12,#1a1a1a);font-weight:600}'+
    '.rsnav-divider{width:calc(100% - 20px);height:1px;background:var(--surface-border,#2a2a2a);margin:4px 10px;align-self:stretch}'+
    '.rsnav-heading{color:var(--text-dim,#555555);font-size:10px;letter-spacing:0.06em;padding:8px 10px 2px;text-transform:uppercase}'+
    '@keyframes rsnavIn{from{opacity:0;transform:translateY(-4px)}to{opacity:1;transform:translateY(0)}}'+
    '@media (prefers-reduced-motion:reduce){.rsnav,.rsnav-trigger,.rsnav-chevron,.rsnav-list,.rsnav-link{animation:none!important;transition-duration:1ms!important}}';
  document.head.appendChild(style);
}
function init(){
  if(document.getElementById('rsMastersNav'))return;
  var root=masterRoot();
  var current=findCurrent();
  injectStyles();
  var bar=document.getElementById('rsTopBar');
  var slot=bar?bar.querySelector('.rs-topbar-switcher'):null;
  if(bar&&slot){
    /* Bar mode: the switcher is absorbed into the fixed universal top bar;
       no floating pill on this page (edition v11, compact law). */
    var sw=buildSwitcher(root,current,'Masters');
    sw.nav.classList.add('rsnav-bar');
    slot.replaceChildren(sw.nav);
    wireBar(sw);
    var ctxLinks=Array.prototype.filter.call(
      bar.querySelectorAll('.rs-topbar-context a[href^="#"]'),
      function(a){return document.getElementById(a.getAttribute('href').slice(1))}
    );
    if(ctxLinks.length)setupScrollSpy(ctxLinks);
    return;
  }
  var pill=buildSwitcher(root,current,current?current.name:'Masters');
  pill.nav.id='rsMastersNav';
  wirePill(pill);
  document.body.appendChild(pill.nav);
  pendingSections.forEach(function(s){renderSection(s[0],s[1])});
  pendingSections=[];
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
