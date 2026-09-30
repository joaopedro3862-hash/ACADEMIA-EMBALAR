const fs=require('node:fs'), path=require('node:path'), assert=require('node:assert/strict'), vm=require('node:vm');
const root=path.resolve(__dirname,'..'); let checks=0;
function check(ok,msg){assert.ok(ok,msg);checks++;}
const read=p=>fs.readFileSync(path.join(root,p),'utf8');
for(const file of ['index.html','politica-de-privacidade.html']){
 const html=read(file).replace(/<!--[\s\S]*?-->/g,'');
 check(!/<form\b/i.test(html),'Sem formulário');
 check(!/asaas|checkout|api\/|pagamento\.html/i.test(html),'Sem fluxo de pagamento');
 const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(x=>x[1]);
 check(new Set(ids).size===ids.length,'IDs únicos');
 for(const match of html.matchAll(/\b(?:src|href)="([^"]+)"/g)){
   const value=match[1];
   if(value.startsWith('#'))check(ids.includes(value.slice(1)),`Âncora ${value}`);
   else if(!value.includes(':')&&!value.startsWith('['))check(fs.existsSync(path.join(root,value.split('#')[0])),`Arquivo ${value}`);
 }
}
check(read('index.html').includes('R$ 50,00'),'Valor preservado');
check(read('index.html').includes('26 de outubro de 2026') && read('index.html').includes('9h'),'Data e horário confirmados');
check(read('index.html').includes('Josiane Veloso') && read('index.html').includes('Iolanda Ângelo'),'Palestrantes confirmadas');
check(fs.existsSync(path.join(root,'assets/video/academia-embalar.mp4')),'Vídeo fornecido presente');
check(!/<video[^>]*\bautoplay/i.test(read('index.html')),'Vídeo sem autoplay');
for(const file of ['api/inscricao.php','api/webhook-asaas.php','config.example.php','pagamento.html','database/database.sql'])check(!fs.existsSync(path.join(root,file)),`Removido ${file}`);
const support=read('js/atendimento.js');
const links=[{hidden:true},{hidden:true}];
const context={window:{},document:{querySelectorAll:()=>links}};
vm.runInNewContext(read('js/site-config.js'),context);
vm.runInNewContext(support,context);
for(const link of links){
 const url=new URL(link.href);
 check(url.origin==='https://wa.me' && url.pathname==='/558287279439','Destino exato');
 check(url.searchParams.get('text')==='Olá! Quero participar da Academia Embalar. Podem me ajudar a finalizar minha inscrição?','Mensagem mínima');
 check(link.hidden===false && link.rel==='noopener noreferrer' && link.target==='_blank','Abertura segura');
}
const invalid=[{hidden:true}];
vm.runInNewContext(support,{window:{ACADEMIA_CONFIG:{whatsapp:'javascript:alert(1)'}},document:{querySelectorAll:()=>invalid}});
check(invalid[0].hidden && !invalid[0].href,'Número inválido não habilita link');
check(!/fetch\(|localStorage|sessionStorage|sendBeacon/.test(read('js/script.js')+support),'Sem envio ou armazenamento automático');
console.log(`${checks} verificações estáticas aprovadas.`);
