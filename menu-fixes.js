(()=>{
'use strict';
if(window.__circulosMenuFixes)return;
window.__circulosMenuFixes=true;

const PC={C:0,'C#':1,Db:1,D:2,'D#':3,Eb:3,E:4,Fb:4,'E#':5,F:5,'F#':6,Gb:6,G:7,'G#':8,Ab:8,A:9,'A#':10,Bb:10,B:11,Cb:11};
const LATIN_TO_EN={DO:'C',RE:'D',MI:'E',FA:'F',SOL:'G',LA:'A',SI:'B'};
const OPEN={'C:major':[null,3,2,0,1,0],'G:major':[3,2,0,0,0,3],'D:major':[null,null,0,2,3,2],'A:major':[null,0,2,2,2,0],'E:major':[0,2,2,1,0,0],'A:minor':[null,0,2,2,1,0],'E:minor':[0,2,2,0,0,0],'D:minor':[null,null,0,2,3,1]};
const TUNING_MIDI=[40,45,50,55,59,64];

const style=document.createElement('style');
style.textContent=`
#libraryPerformanceSwitch{padding:24px 24px 0!important;margin:0!important;border:0!important;border-radius:0!important;background:transparent!important;box-shadow:none!important;overflow:visible!important}
#libraryPerformanceSwitch .segmented{width:100%!important;max-width:520px!important;margin:0 auto!important;padding:4px!important;border:0!important;border-radius:999px!important;background:var(--surface2)!important;box-shadow:none!important;overflow:hidden!important}
#libraryPerformanceSwitch .seg-btn{min-height:38px!important;border:0!important;border-radius:999px!important;background:transparent!important;box-shadow:none!important}
#libraryPerformanceSwitch .seg-btn.active{background:var(--accent)!important;color:var(--contrast)!important}
#libraryPerformanceSwitch+ #chordLibraryGrid{border-top:0!important}
@media(max-width:560px){#libraryPerformanceSwitch{padding:18px 18px 0!important}#libraryPerformanceSwitch .seg-btn{min-height:42px!important}}
`;
document.head.appendChild(style);

function parseNote(token){
  const value=String(token||'').trim().toUpperCase().replace(/NOTAS?:/g,'').replace(/♯/g,'#').replace(/♭/g,'B').replace(/\s+/g,'');
  for(const latin of ['SOL','DO','RE','MI','FA','LA','SI'])if(value.startsWith(latin)){
    const next=value.slice(latin.length,latin.length+1),acc=next==='#'?'#':next==='B'?'b':'';
    return (LATIN_TO_EN[latin]||'C')+acc;
  }
  const match=value.match(/^([A-G])([#B]?)/);return match?match[1]+(match[2]==='B'?'b':match[2]):null;
}
function qualityFromCard(card){
  const text=(card?.querySelector('.chord-quality')?.textContent||'').toLowerCase();
  if(text.includes('dismin'))return'diminished';
  if(text.includes('menor'))return'minor';
  return'major';
}
const intervals=q=>q==='major'?[0,4,7]:q==='minor'?[0,3,7]:[0,3,6];
const normalizeFret=f=>f===0?12:f;
function diminishedVoicings(rootPc){
  const rA=normalizeFret((rootPc-9+12)%12);let rD=normalizeFret((rootPc-2+12)%12);if(rD<4)rD+=12;
  return[{frets:[null,rA,rA+1,rA+2,rA+1,null]},{frets:[null,null,rD,rD-2,rD-3,rD-2]}];
}
function barreVoicings(rootPc,quality){
  if(quality==='diminished')return diminishedVoicings(rootPc);
  const rE=normalizeFret((rootPc-4+12)%12),rA=normalizeFret((rootPc-9+12)%12),maj=quality==='major';
  return[{frets:maj?[rE,rE+2,rE+2,rE+1,rE,rE]:[rE,rE+2,rE+2,rE,rE,rE]},{frets:maj?[null,rA,rA+2,rA+2,rA+2,rA]:[null,rA,rA+2,rA+2,rA+1,rA]}];
}
function compactTriads(rootPc,quality){
  const target=new Set(intervals(quality).map(i=>(rootPc+i)%12)),tuning=[7,11,4],found=[];
  for(let g=0;g<=12;g++)for(let b=0;b<=12;b++)for(let e=0;e<=12;e++){
    const frets=[g,b,e],pcs=frets.map((f,i)=>(tuning[i]+f)%12);
    if(!pcs.every(pc=>target.has(pc))||new Set(pcs).size!==3)continue;
    const span=Math.max(...frets)-Math.min(...frets);if(span>4)continue;
    found.push({frets,span,min:Math.min(...frets),max:Math.max(...frets)});
  }
  found.sort((a,b)=>(a.span-b.span)||(a.max-b.max));const chosen=[];
  for(const item of found){if(chosen.some(c=>Math.abs(c.min-item.min)<3))continue;chosen.push(item);if(chosen.length===2)break;}
  return chosen.map(item=>({frets:[null,null,null,...item.frets]}));
}
function voicingsFor(root,quality){
  const rootPc=PC[root]??0,result=[],open=OPEN[`${root}:${quality}`];
  if(open)result.push({frets:open});
  result.push(...barreVoicings(rootPc,quality));
  result.push(...compactTriads(rootPc,quality).slice(0,open?1:2));
  return result.slice(0,4);
}
const midiFor=v=>v.frets.map((f,i)=>f===null?null:TUNING_MIDI[i]+f).filter(Number.isFinite);

function playExactVoicing(button){
  const card=button.closest('.voicing-card'),cards=[...document.querySelectorAll('#guitarVoicings .voicing-card')],index=Math.max(0,cards.indexOf(card));
  const chordCard=document.querySelector('#diatonicGrid .chord-card.active')||document.querySelector('#diatonicGrid .chord-card');
  const first=(chordCard?.querySelector('.chord-notes,.chord-card-notes')?.textContent||'').split(/[·,]/)[0];
  const root=parseNote(first),quality=qualityFromCard(chordCard),voicing=voicingsFor(root,quality)[index];
  if(!voicing)return;
  window.CirculosAudio?.play(midiFor(voicing),'guitar',{arpeggio:true});
  card?.classList.add('performance-playing');setTimeout(()=>card?.classList.remove('performance-playing'),900);
}

window.addEventListener('pointerdown',event=>{
  const button=event.target.closest?.('#guitarVoicings .voicing-play');if(!button)return;
  event.preventDefault();event.stopImmediatePropagation();playExactVoicing(button);
},true);
window.addEventListener('click',event=>{
  if(event.target.closest?.('#guitarVoicings .voicing-play')){event.preventDefault();event.stopImmediatePropagation();}
},true);
})();