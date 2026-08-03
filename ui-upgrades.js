(()=>{
'use strict';
if(window.__circulosUiUpgradesV1)return;
window.__circulosUiUpgradesV1=true;

const DEGREE_MAP={
  major:['I','III','V'],
  minor:['I','♭III','V'],
  dominant7:['I','III','V','♭VII'],
  major7:['I','III','V','VII'],
  minor7:['I','♭III','V','♭VII'],
  diminished:['I','♭III','♭V']
};
const QUALITY_FROM_TEXT=text=>{
  const value=String(text||'').toLowerCase();
  if(value.includes('dismin'))return'diminished';
  if(value.includes('menor'))return'minor';
  return'major';
};
const degreeText=quality=>(DEGREE_MAP[quality]||DEGREE_MAP.major).join(' · ');

const style=document.createElement('style');
style.textContent=`
.chord-degrees,.selected-chord-degrees,.piano-voicing-degrees,.library-root-degrees,.performance-piano-degrees{display:block;color:var(--muted);font-size:10px;font-weight:820;letter-spacing:.09em;line-height:1.25;text-transform:uppercase}
.chord-degrees{margin-top:8px}.chord-card.active .chord-degrees{color:color-mix(in srgb,var(--contrast) 76%,transparent)}
.selected-chord-degrees{margin:8px 0 2px;font-size:11px}.piano-voicing-degrees{margin:14px 0 -8px;font-size:11px}
.library-root-degrees{margin-top:1px;font-size:9px}.library-root-tones{margin-top:-2px}
.performance-piano-degrees{margin-top:5px}.performance-piano-summary small{line-height:1.35}
.harmony-wheel-chord-degrees{fill:var(--muted);font-size:12px;font-weight:820;letter-spacing:.08em;text-anchor:middle}
html[data-theme="dark"] .harmony-wheel-chord-degrees{fill:var(--muted)}
@media(max-width:560px){.library-root-degrees{font-size:8px}.selected-chord-degrees,.piano-voicing-degrees{font-size:10px}}
`;
document.head.appendChild(style);

function currentLibraryQuality(){return document.getElementById('libraryQualitySelect')?.value||document.querySelector('#libraryQualities [data-library-quality].active')?.dataset.libraryQuality||'major';}
function circleQuality(){return QUALITY_FROM_TEXT(document.querySelector('#diatonicGrid .chord-card.active .chord-quality')?.textContent);}

function decorateChordCards(){
  document.querySelectorAll('#diatonicGrid .chord-card').forEach(card=>{
    const notes=card.querySelector('.chord-notes,.chord-card-notes');if(!notes)return;
    let degrees=card.querySelector('.chord-degrees');
    if(!degrees){degrees=document.createElement('span');degrees.className='chord-degrees';notes.before(degrees);}
    degrees.textContent=degreeText(QUALITY_FROM_TEXT(card.querySelector('.chord-quality')?.textContent));
  });
}
function decorateCircleDetail(){
  const notes=document.getElementById('selectedChordNotes');
  if(notes){
    let degrees=document.getElementById('selectedChordDegrees');
    if(!degrees){degrees=document.createElement('p');degrees.id='selectedChordDegrees';degrees.className='selected-chord-degrees';notes.before(degrees);}
    degrees.textContent=degreeText(circleQuality());
  }
  const voicingLine=document.querySelector('#pianoPanel .voicing-note-line');
  if(voicingLine){
    let degrees=document.getElementById('pianoVoicingDegrees');
    if(!degrees){degrees=document.createElement('p');degrees.id='pianoVoicingDegrees';degrees.className='piano-voicing-degrees';voicingLine.before(degrees);}
    degrees.textContent=degreeText(circleQuality());
  }
}
function decorateRootCards(){
  const text=degreeText(currentLibraryQuality());
  document.querySelectorAll('#libraryRoots [data-library-root]').forEach(button=>{
    const tones=button.querySelector('.library-root-tones');if(!tones)return;
    let degrees=button.querySelector('.library-root-degrees');
    if(!degrees){degrees=document.createElement('span');degrees.className='library-root-degrees';tones.before(degrees);}
    degrees.textContent=text;
  });
}
function decorateLibraryPiano(){
  const notes=document.getElementById('performancePianoNotes');if(!notes)return;
  let degrees=document.getElementById('performancePianoDegrees');
  if(!degrees){degrees=document.createElement('small');degrees.id='performancePianoDegrees';degrees.className='performance-piano-degrees';notes.before(degrees);}
  degrees.textContent=degreeText(currentLibraryQuality());
}
function decorateHarmonyWheel(){
  const cards=[...document.querySelectorAll('#diatonicGrid .chord-card')];
  document.querySelectorAll('#harmonyWheel .harmony-wheel-node').forEach(node=>{
    const index=Number(node.dataset.wheelIndex),card=cards[index],notes=node.querySelector('.harmony-wheel-notes');
    if(!card||!notes||node.querySelector('.harmony-wheel-chord-degrees'))return;
    const degrees=document.createElementNS('http://www.w3.org/2000/svg','text');
    degrees.setAttribute('class','harmony-wheel-chord-degrees');
    degrees.setAttribute('x',notes.getAttribute('x')||'0');
    const noteY=Number(notes.getAttribute('y'))||0;
    degrees.setAttribute('y',String(noteY-18));
    degrees.textContent=degreeText(QUALITY_FROM_TEXT(card.querySelector('.chord-quality')?.textContent));
    notes.setAttribute('y',String(noteY+5));
    notes.before(degrees);
  });
}
function decorateAll(){decorateChordCards();decorateCircleDetail();decorateRootCards();decorateLibraryPiano();decorateHarmonyWheel();}
let queued=false;
function scheduleDecorate(){if(queued)return;queued=true;requestAnimationFrame(()=>{queued=false;decorateAll();});}

const themeMedia=window.matchMedia('(prefers-color-scheme: dark)');
function themeChoice(){return localStorage.getItem('circulos-theme')||'system';}
function applyTheme(){
  const choice=themeChoice(),resolved=choice==='system'?(themeMedia.matches?'dark':'light'):choice;
  document.documentElement.dataset.theme=resolved;
  document.documentElement.style.colorScheme=resolved;
  const meta=document.querySelector('meta[name="theme-color"]');if(meta)meta.content=resolved==='dark'?'#101110':'#f5f5f2';
  document.querySelectorAll('[data-theme-choice]').forEach(button=>button.classList.toggle('active',button.dataset.themeChoice===choice));
}
function reinforceTheme(){applyTheme();requestAnimationFrame(applyTheme);setTimeout(applyTheme,120);}
try{themeMedia.addEventListener('change',reinforceTheme);}catch(e){themeMedia.addListener?.(reinforceTheme);}
window.addEventListener('pageshow',reinforceTheme);
window.addEventListener('focus',reinforceTheme);
window.addEventListener('orientationchange',()=>setTimeout(reinforceTheme,160));
document.addEventListener('visibilitychange',()=>{if(!document.hidden)reinforceTheme();});
document.addEventListener('click',event=>{
  const themeButton=event.target.closest?.('[data-theme-choice]');
  if(themeButton)setTimeout(reinforceTheme,0);
  if(event.target.closest?.('#diatonicGrid .chord-card,#libraryRoots [data-library-root],[data-library-notation],[data-performance-library]'))scheduleDecorate();
});
document.addEventListener('change',event=>{if(event.target.id==='libraryQualitySelect'||event.target.id==='minimalScaleSelect')scheduleDecorate();});
setInterval(()=>{if(themeChoice()==='system'&&document.visibilityState==='visible')applyTheme();},1200);

function init(){
  reinforceTheme();decorateAll();
  const observer=new MutationObserver(scheduleDecorate);
  observer.observe(document.body,{childList:true,subtree:true,attributes:true,attributeFilter:['class']});
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();