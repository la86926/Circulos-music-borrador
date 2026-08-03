(()=>{
'use strict';
if(window.__circulosPianoSyncV4)return;
window.__circulosPianoSyncV4=true;

const PC={C:0,'C#':1,Db:1,D:2,'D#':3,Eb:3,E:4,Fb:4,'E#':5,F:5,'F#':6,Gb:6,G:7,'G#':8,Ab:8,A:9,'A#':10,Bb:10,B:11,Cb:11};
const CHROMATIC=['C','C#','D','D#','E','F','F#','G','G#','A','A#','B'];
const LATIN={C:'DO',D:'RE',E:'MI',F:'FA',G:'SOL',A:'LA',B:'SI'};
const LATIN_TO_EN={DO:'C',RE:'D',MI:'E',FA:'F',SOL:'G',LA:'A',SI:'B'};
const INTERVALS={major:[0,4,7],minor:[0,3,7],dominant7:[0,4,7,10],major7:[0,4,7,11],minor7:[0,3,7,10],diminished:[0,3,6]};
const QUALITY_LABEL={major:'mayor',minor:'menor',dominant7:'séptima',major7:'mayor 7',minor7:'menor 7',diminished:'disminuido'};
const WHITE_PCS=new Set([0,2,4,5,7,9,11]);
let hostObserver=null,circleObserver=null,lastSignature='',rendering=false,scheduled=false;
const activePointers=new Map(),blockedClicks=new WeakMap(),visualTimers=new WeakMap();

const polish=document.createElement('style');
polish.textContent=`
#pianoKeyboard button,#performancePianoKeyboard button{-webkit-touch-callout:none!important;user-select:none!important;-webkit-user-select:none!important}
#pianoKeyboard[data-keyboard-mode="play"],#performancePianoKeyboard[data-keyboard-mode="play"],#pianoKeyboard[data-keyboard-mode="play"] button,#performancePianoKeyboard[data-keyboard-mode="play"] button{touch-action:none!important}
#pianoKeyboard[data-keyboard-mode="move"],#performancePianoKeyboard[data-keyboard-mode="move"],#pianoKeyboard[data-keyboard-mode="move"] button,#performancePianoKeyboard[data-keyboard-mode="move"] button{touch-action:pan-x pan-y!important;cursor:grab!important}
#pianoKeyboard[data-keyboard-mode="move"]:active,#performancePianoKeyboard[data-keyboard-mode="move"]:active{cursor:grabbing!important}
.keyboard-mode-slider{position:relative;display:inline-block;flex:0 0 auto;cursor:pointer;-webkit-tap-highlight-color:transparent}
.keyboard-mode-slider>input{position:absolute;inline-size:1px;block-size:1px;opacity:0;pointer-events:none}
.keyboard-mode-track{position:relative;display:grid;grid-template-columns:1fr 1fr;align-items:center;width:190px;height:44px;padding:4px;border:1px solid var(--line);border-radius:999px;background:var(--surface2);overflow:hidden;isolation:isolate}
.keyboard-mode-thumb{position:absolute;z-index:-1;left:4px;top:4px;width:calc(50% - 4px);height:34px;border-radius:999px;background:var(--accent);box-shadow:0 3px 10px rgba(0,0,0,.12);transition:transform .2s ease}
.keyboard-mode-label{position:relative;z-index:1;display:grid;place-items:center;height:34px;color:var(--muted);font-size:11px;font-weight:820;letter-spacing:.02em;transition:color .2s ease}
.keyboard-mode-slider>input:not(:checked)+.keyboard-mode-track .keyboard-mode-label:first-of-type,.keyboard-mode-slider>input:checked+.keyboard-mode-track .keyboard-mode-label:last-of-type{color:var(--contrast)}
.keyboard-mode-slider>input:checked+.keyboard-mode-track .keyboard-mode-thumb{transform:translateX(100%)}
.keyboard-mode-slider>input:focus-visible+.keyboard-mode-track{outline:3px solid color-mix(in srgb,var(--accent) 25%,transparent);outline-offset:2px}
#pianoPanel .visual-top{justify-content:space-between;align-items:center}
#libraryPianoPanel .performance-piano-summary{align-items:center}
.performance-instrument-switch{margin:0 18px 12px!important;padding:0!important;border:0!important;border-radius:0!important;background:transparent!important}
.performance-instrument-switch>span{display:none!important}
.performance-instrument-switch .segmented{width:100%!important;max-width:none!important;padding:5px!important;border-radius:18px!important}
.performance-instrument-switch .seg-btn{min-height:48px!important;border-radius:14px!important}
#chordsView>.panel:last-of-type{padding-top:14px!important}
#chordsView .library-grid{padding-top:0!important}
@media(max-width:560px){.keyboard-mode-slider{width:100%}.keyboard-mode-track{width:100%}.performance-instrument-switch{margin:0 16px 10px!important}.performance-instrument-switch .seg-btn{min-height:46px!important}#pianoPanel .visual-top{align-items:stretch}}
`;
document.head.appendChild(polish);

function notation(){return document.querySelector('[data-library-notation="latin"].active')?'latin':'english';}
function quality(){return document.getElementById('libraryQualitySelect')?.value||document.querySelector('#libraryQualities [data-library-quality].active')?.dataset.libraryQuality||'major';}
function chord(){
  const root=document.querySelector('#libraryRoots [data-library-root].active')?.dataset.libraryRoot||'C';
  const rootPc=PC[root]??0,q=quality(),intervals=INTERVALS[q]||INTERVALS.major;
  return{root,rootPc,quality:q,pcs:intervals.map(interval=>(rootPc+interval)%12)};
}
function noteLabel(pc,currentNotation=notation()){
  const note=CHROMATIC[(pc+12)%12];
  return currentNotation==='english'?note.replace('#','♯'):`${LATIN[note[0]]}${note.slice(1).replace('#','♯')}`;
}
function cssPx(name,fallback){const value=parseFloat(getComputedStyle(document.documentElement).getPropertyValue(name));return Number.isFinite(value)&&value>0?value:fallback;}
function fundamentalMidis(pcs){let previous=-Infinity;return pcs.map(pc=>{let midi=60+pc;while(midi<=previous)midi+=12;previous=midi;return midi;});}

function render(force=false){
  const host=document.getElementById('performancePianoKeyboard');
  if(!host||rendering)return false;
  const current=chord(),currentNotation=notation(),signature=`${current.root}|${current.quality}|${currentNotation}|${cssPx('--key-w',58)}`;
  if(!force&&signature===lastSignature&&host.classList.contains('library-cloned-piano')&&host.querySelector('.white-key')){ensureKeyboardControls();return true;}
  lastSignature=signature;rendering=true;
  const chordPcs=new Set(current.pcs),voicingSet=new Set(fundamentalMidis(current.pcs)),whites=[];
  const start=48,end=84,keyWidth=cssPx('--key-w',58);
  for(let midi=start;midi<=end;midi++)if(WHITE_PCS.has(midi%12))whites.push(midi);
  hostObserver?.disconnect();
  const previousMode=host.dataset.keyboardMode||'play';
  host.className='piano library-cloned-piano';
  host.dataset.keyboardMode=previousMode;
  host.replaceChildren();
  host.setAttribute('role','group');
  host.setAttribute('aria-label',`Piano de ${noteLabel(current.rootPc,currentNotation)} ${QUALITY_LABEL[current.quality]||'mayor'}`);
  whites.forEach((midi,index)=>{
    const pc=midi%12,white=document.createElement('button');
    white.type='button';white.dataset.performanceMidi=String(midi);
    white.className=`white-key${chordPcs.has(pc)?' chord-tone':''}${voicingSet.has(midi)?' voicing-tone':''}${pc===current.rootPc?' root-tone':''}`;
    white.textContent=noteLabel(pc,currentNotation);host.appendChild(white);
    if([0,2,5,7,9].includes(pc)&&midi+1<=end){
      const blackMidi=midi+1,blackPc=blackMidi%12,black=document.createElement('button');
      black.type='button';black.dataset.performanceMidi=String(blackMidi);
      black.className=`black-key${chordPcs.has(blackPc)?' chord-tone':''}${voicingSet.has(blackMidi)?' voicing-tone':''}${blackPc===current.rootPc?' root-tone':''}`;
      black.style.left=`${(index+1)*keyWidth}px`;black.textContent=noteLabel(blackPc,currentNotation);host.appendChild(black);
    }
  });
  host.style.minWidth=`${whites.length*keyWidth+8}px`;
  const title=document.getElementById('performancePianoTitle'),notes=document.getElementById('performancePianoNotes');
  if(title)title.textContent=`${noteLabel(current.rootPc,currentNotation)} ${QUALITY_LABEL[current.quality]||'mayor'}`;
  if(notes)notes.textContent=current.pcs.map(pc=>noteLabel(pc,currentNotation)).join(' · ');
  rendering=false;watchHost(host);ensureKeyboardControls();return true;
}
function schedule(force=false){if(force)lastSignature='';if(scheduled)return;scheduled=true;requestAnimationFrame(()=>{scheduled=false;render(force);});}
function watchHost(host){
  hostObserver?.disconnect();
  hostObserver=new MutationObserver(()=>{if(rendering)return;if(host.classList.contains('performance-piano')||host.querySelector('.performance-white-key,.performance-black-key'))schedule(true);});
  hostObserver.observe(host,{childList:true,subtree:true,attributes:true,attributeFilter:['class']});
}
function discover(force=false){const host=document.getElementById('performancePianoKeyboard');if(!host)return false;render(force);return true;}

function parseKeyPc(label){
  const value=String(label||'').trim().toUpperCase().replace(/♯/g,'#').replace(/♭/g,'B').replace(/\s+/g,'');
  for(const latin of ['SOL','DO','RE','MI','FA','LA','SI'])if(value.startsWith(latin)){
    const next=value.slice(latin.length,latin.length+1),accidental=next==='#'?'#':next==='B'?'b':'';
    return PC[(LATIN_TO_EN[latin]||'C')+accidental]??null;
  }
  const match=value.match(/^([A-G])([#B]?)/);if(!match)return null;
  return PC[match[1]+(match[2]==='B'?'b':match[2])]??null;
}
function assignCircleMidis(){
  const host=document.getElementById('pianoKeyboard');if(!host)return;
  let previous=47;
  host.querySelectorAll('.white-key,.black-key').forEach(key=>{
    const pc=parseKeyPc(key.textContent);if(!Number.isFinite(pc))return;
    let midi=48+pc;while(midi<=previous)midi+=12;
    key.dataset.performanceMidi=String(midi);previous=midi;
  });
  ensureKeyboardControls();
}
function watchCircle(){
  const host=document.getElementById('pianoKeyboard');if(!host)return;
  circleObserver?.disconnect();circleObserver=new MutationObserver(()=>requestAnimationFrame(assignCircleMidis));
  circleObserver.observe(host,{childList:true,subtree:true});assignCircleMidis();
}

function keyboardHostFromKey(key){return key?.closest?.('#pianoKeyboard,#performancePianoKeyboard')||null;}
function keyboardMode(host){return host?.dataset.keyboardMode==='move'?'move':'play';}
function setKeyboardMode(host,mode){
  if(!host)return;
  const next=mode==='move'?'move':'play',control=document.querySelector(`[data-keyboard-toggle="${host.id}"]`),input=control?.querySelector('input'),scroll=host.closest('.piano-scroll,.performance-piano-scroll');
  host.dataset.keyboardMode=next;
  scroll?.classList.toggle('keyboard-moving',next==='move');
  if(input){input.checked=next==='move';input.setAttribute('aria-checked',String(input.checked));}
  for(const[pointerId,item]of activePointers)if(item.host===host)activePointers.delete(pointerId);
}
function makeMoveControl(host){
  if(!host||document.querySelector(`[data-keyboard-toggle="${host.id}"]`))return;
  const control=document.createElement('label');
  control.className='keyboard-mode-slider';control.dataset.keyboardToggle=host.id;
  control.innerHTML='<input type="checkbox" role="switch" aria-label="Cambiar entre tocar y mover el teclado"><span class="keyboard-mode-track"><span class="keyboard-mode-label">Tocar</span><span class="keyboard-mode-label">Mover</span><span class="keyboard-mode-thumb" aria-hidden="true"></span></span>';
  const input=control.querySelector('input');
  input.addEventListener('change',()=>setKeyboardMode(host,input.checked?'move':'play'));
  if(host.id==='pianoKeyboard')document.querySelector('#pianoPanel .visual-top')?.appendChild(control);
  else document.querySelector('#libraryPianoPanel .performance-piano-summary')?.appendChild(control);
  setKeyboardMode(host,host.dataset.keyboardMode||'play');
}
function ensureKeyboardControls(){
  const circle=document.getElementById('pianoKeyboard'),library=document.getElementById('performancePianoKeyboard');
  if(circle){if(!circle.dataset.keyboardMode)circle.dataset.keyboardMode='play';makeMoveControl(circle);}
  if(library){if(!library.dataset.keyboardMode)library.dataset.keyboardMode='play';makeMoveControl(library);}
}

function flashKey(key,duration=170){
  if(!key)return;
  key.classList.add('performance-playing');
  clearTimeout(visualTimers.get(key));
  const timer=setTimeout(()=>{key.classList.remove('performance-playing');visualTimers.delete(key);},duration);
  visualTimers.set(key,timer);
}
function playKey(key){
  if(!key.dataset.performanceMidi&&key.closest('#pianoKeyboard'))assignCircleMidis();
  const midi=Number(key.dataset.performanceMidi);if(!Number.isFinite(midi))return;
  const audio=window.CirculosAudio,options={arpeggio:false,velocity:.96},context=audio?.ensureAudio?.();
  if(context&&context.state!=='running'&&typeof context.resume==='function')context.resume().then(()=>audio.play([midi],'piano',options)).catch(()=>{});
  else audio?.play([midi],'piano',options);
  flashKey(key,190);
}
function keyAtPoint(event,host){
  const target=document.elementFromPoint(event.clientX,event.clientY)?.closest?.('#pianoKeyboard button,#performancePianoKeyboard button');
  return target&&keyboardHostFromKey(target)===host?target:null;
}
function beginPlaying(event,key){
  const host=keyboardHostFromKey(key);if(!host||keyboardMode(host)==='move')return;
  activePointers.set(event.pointerId,{host,lastKey:key});
  blockedClicks.set(key,Date.now()+850);playKey(key);
  try{key.setPointerCapture?.(event.pointerId);}catch(e){}
}
function continuePlaying(event){
  const item=activePointers.get(event.pointerId);if(!item)return;
  event.preventDefault();event.stopImmediatePropagation();
  const next=keyAtPoint(event,item.host);
  if(!next||next===item.lastKey)return;
  item.lastKey=next;blockedClicks.set(next,Date.now()+850);playKey(next);
}
function endPlaying(pointerId){activePointers.delete(pointerId);}
function replayVoicing(button){
  const click=new MouseEvent('click',{bubbles:true,cancelable:true,view:window});
  try{Object.defineProperty(click,'__circulosReplay',{value:true});}catch(e){click.__circulosReplay=true;}
  button.dispatchEvent(click);
}

window.addEventListener('pointerdown',event=>{
  const key=event.target.closest?.('#pianoKeyboard button,#performancePianoKeyboard button');
  if(key){
    const host=keyboardHostFromKey(key);
    if(keyboardMode(host)==='move')return;
    event.preventDefault();event.stopImmediatePropagation();beginPlaying(event,key);return;
  }
  const voicing=event.target.closest?.('#guitarVoicings .voicing-play');
  if(voicing){event.preventDefault();event.stopImmediatePropagation();blockedClicks.set(voicing,Date.now()+750);replayVoicing(voicing);}
},true);
window.addEventListener('pointermove',continuePlaying,true);
['pointerup','pointercancel','lostpointercapture'].forEach(type=>window.addEventListener(type,event=>endPlaying(event.pointerId),true));
window.addEventListener('click',event=>{
  const key=event.target.closest?.('#pianoKeyboard button,#performancePianoKeyboard button');
  if(key){
    const host=keyboardHostFromKey(key);
    if(keyboardMode(host)==='move'||(blockedClicks.get(key)||0)>Date.now()){
      event.preventDefault();event.stopImmediatePropagation();
    }
    return;
  }
  const voicing=event.target.closest?.('#guitarVoicings .voicing-play');
  if(!voicing||event.__circulosReplay)return;
  if((blockedClicks.get(voicing)||0)>Date.now()){event.preventDefault();event.stopImmediatePropagation();}
},true);

function init(){
  discover(true);watchCircle();ensureKeyboardControls();
  document.addEventListener('click',event=>{if(event.target.closest('#libraryRoots [data-library-root],[data-library-notation],[data-performance-library]'))setTimeout(()=>schedule(true),0);});
  document.addEventListener('change',event=>{if(event.target.id==='libraryQualitySelect')setTimeout(()=>schedule(true),0);});
  const bodyObserver=new MutationObserver(()=>{const ready=discover(false);watchCircle();ensureKeyboardControls();if(ready&&document.getElementById('libraryPerformanceSwitch'))bodyObserver.disconnect();});
  bodyObserver.observe(document.body,{childList:true,subtree:true});
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();