(()=>{
'use strict';
if(window.__circulosFaqStabilityV2)return;
window.__circulosFaqStabilityV2=true;

const EXTRA_FAQS=[
  {
    id:'tonica-al-improvisar',
    category:'Escalas',
    question:'¿Debo tocar siempre la tónica de la escala cuando improviso?',
    answer:'La tónica es una referencia muy segura porque representa el centro de la tonalidad, pero no debes tocarla todo el tiempo. Úsala para comenzar, descansar o cerrar una frase. Cuando cambie el acorde, intenta caer en una de sus notas. En DO mayor puedes usar DO como punto de regreso; si aparece SOL mayor, dirige la frase hacia SOL, SI o RE. Así mantienes la escala de DO, pero el solo reconoce el acorde que está sonando.'
  },
  {
    id:'sol-mayor-dentro-de-do',
    category:'Escalas',
    question:'Si improviso en DO mayor y suena SOL mayor, ¿puedo usar SOL, SI o RE?',
    answer:'Sí. SOL, SI y RE —G, B y D— forman la tríada de SOL mayor y las tres notas pertenecen a la escala de DO mayor. Mientras suena SOL, cualquiera puede funcionar como nota objetivo. SOL da estabilidad, SI muestra claramente el carácter mayor y RE produce una llegada abierta. Puedes usar las demás notas de DO mayor como notas de paso, pero conviene descansar en SOL, SI o RE. El mismo principio se aplica a cada acorde de la tonalidad.'
  }
];

const normalize=value=>String(value||'')
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g,'')
  .toLowerCase();

function closeMenu(){
  const menu=document.getElementById('sideMenu');
  const backdrop=document.getElementById('menuBackdrop');
  const menuButton=document.getElementById('menuBtn');
  document.body.classList.remove('menu-open');
  menu?.classList.remove('open');
  backdrop?.classList.remove('open');
  menu?.setAttribute('aria-hidden','true');
  backdrop?.setAttribute('aria-hidden','true');
  menuButton?.setAttribute('aria-expanded','false');
}

function setElementVisibility(element,visible){
  if(!element)return;
  element.classList.toggle('view-hidden',!visible);
  if(element.hidden===visible)element.hidden=!visible;
}

function applyView(name,scroll=false){
  const view=['circles','chords','faq'].includes(name)?name:'circles';
  const circles=document.getElementById('circlesView');
  const chords=document.getElementById('chordsView');
  const faq=document.getElementById('faqView');
  if(!circles||!chords||!faq)return false;

  setElementVisibility(circles,view==='circles');
  setElementVisibility(chords,view==='chords');
  setElementVisibility(faq,view==='faq');
  document.getElementById('bottomNav')?.classList.toggle('view-hidden',view!=='circles');

  document.querySelectorAll('[data-app-view]').forEach(button=>{
    const active=button.dataset.appView===view;
    button.classList.toggle('active',active);
    button.setAttribute('aria-current',active?'page':'false');
    const badge=button.querySelector('.app-choice-badge');
    if(badge&&badge.textContent!==(active?'Activo':'Abrir'))badge.textContent=active?'Activo':'Abrir';
  });

  localStorage.setItem('circulos-active-view',view);
  closeMenu();
  if(scroll)window.scrollTo({top:0,behavior:'smooth'});
  return true;
}

function selectView(name,scroll=true){
  const view=['circles','chords','faq'].includes(name)?name:'circles';
  applyView(view,scroll);
  requestAnimationFrame(()=>applyView(view,false));
  setTimeout(()=>applyView(view,false),60);
  setTimeout(()=>applyView(view,false),220);
}

function interceptMenu(event){
  const button=event.target.closest?.('.app-picker [data-app-view]');
  if(!button)return;
  event.preventDefault();
  event.stopPropagation();
  event.stopImmediatePropagation();
  selectView(button.dataset.appView,true);
}

document.addEventListener('click',interceptMenu,true);

function createExtraItem(item,list){
  const details=document.createElement('details');
  details.className='faq-item';
  details.dataset.category=item.category;
  details.dataset.faqExtra=item.id;

  const summary=document.createElement('summary');
  summary.className='faq-question';
  const title=document.createElement('span');
  title.textContent=item.question;
  const icon=document.createElement('span');
  icon.className='faq-chevron';
  icon.setAttribute('aria-hidden','true');
  icon.innerHTML='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>';

  const answer=document.createElement('p');
  answer.className='faq-answer';
  answer.textContent=item.answer;
  summary.append(title,icon);
  details.append(summary,answer);
  details.addEventListener('toggle',()=>{
    if(!details.open)return;
    list.querySelectorAll('details[open]').forEach(other=>{
      if(other!==details)other.open=false;
    });
  });
  return details;
}

function installFaqEnhancements(){
  const list=document.getElementById('faqList');
  const search=document.getElementById('faqSearch');
  const categories=document.getElementById('faqCategories');
  const count=document.getElementById('faqCount');
  const empty=document.getElementById('faqEmpty');
  const total=document.querySelector('#faqView .faq-overview .status-value');
  if(!list||!search||!categories||!count||!empty)return false;

  if(total&&!total.dataset.baseFaqCount){
    total.dataset.baseFaqCount=String(parseInt(total.textContent,10)||0);
    total.textContent=String(Number(total.dataset.baseFaqCount)+EXTRA_FAQS.length);
  }

  let observer;
  function observe(){observer.observe(list,{childList:true});}
  function syncExtras(){
    observer.disconnect();
    list.querySelectorAll('[data-faq-extra]').forEach(node=>node.remove());

    const activeCategory=categories.querySelector('.faq-category.active')?.textContent?.trim()||'Todas';
    const term=normalize(search.value.trim());
    const matching=EXTRA_FAQS.filter(item=>
      (activeCategory==='Todas'||activeCategory===item.category)&&
      (!term||normalize(`${item.question} ${item.answer} ${item.category}`).includes(term))
    );

    matching.forEach(item=>list.appendChild(createExtraItem(item,list)));
    const visibleCount=list.querySelectorAll('.faq-item').length;
    count.textContent=`${visibleCount} ${visibleCount===1?'respuesta':'respuestas'}`;
    if(visibleCount>0){
      list.hidden=false;
      empty.hidden=true;
    }
    observe();
  }

  observer=new MutationObserver(()=>requestAnimationFrame(syncExtras));
  observe();
  search.addEventListener('input',()=>setTimeout(syncExtras,0));
  categories.addEventListener('click',()=>setTimeout(syncExtras,0));
  syncExtras();
  return true;
}

function init(attempt=0){
  const ready=document.getElementById('faqView')&&document.querySelector('[data-app-view="faq"]');
  if(!ready){
    if(attempt<80)setTimeout(()=>init(attempt+1),50);
    return;
  }

  installFaqEnhancements();
  const saved=localStorage.getItem('circulos-active-view')||'circles';
  applyView(saved,false);
}

if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>init(),{once:true});
else init();
})();