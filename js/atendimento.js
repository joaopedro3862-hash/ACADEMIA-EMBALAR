(() => {
  'use strict';
  const number=window.ACADEMIA_CONFIG?.whatsapp;
  if(typeof number!=='string' || !/^55\d{10,11}$/.test(number)) return;
  const message='Olá! Quero participar da Academia Embalar. Podem me ajudar a finalizar minha inscrição?';
  document.querySelectorAll('[data-whatsapp]').forEach(link=>{
    link.href=`https://wa.me/${number}?text=${encodeURIComponent(message)}`;
    link.hidden=false;
    link.rel='noopener noreferrer';
    link.target='_blank';
  });
})();
