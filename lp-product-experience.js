document.addEventListener('DOMContentLoaded',()=>{
  const tabs=[...document.querySelectorAll('[data-px-tab]')];
  const views=[...document.querySelectorAll('[data-px-view]')];
  const location=document.querySelector('[data-px-location]');
  const setView=id=>{
    tabs.forEach(t=>t.classList.toggle('on',t.dataset.pxTab===id));
    views.forEach(v=>v.classList.toggle('on',v.dataset.pxView===id));
    if(location)location.textContent=id.toUpperCase();
  };
  tabs.forEach(t=>t.addEventListener('click',()=>setView(t.dataset.pxTab)));
});
