/* Alle bedragen in centen. Per ronde verhandel je 1 MWh in één uur. */
(function(root){
 const rounds=[
 {time:'23:59',period:'00:00 – 01:00',tag:'De handelsdag begint',title:'Een nieuwe dag. Jouw eerste keuze.',text:'Het is bijna middernacht. Je batterij staat klaar met 50% lading. Wat doe je in het komende uur?',price:49725,weather:null,note:'De batterij heeft ruimte om 1 MWh te laden én 1 MWh te ontladen.'},
 {time:'02:59',period:'03:00 – 04:00',tag:'Diep in de nacht',title:'De wind gaat liggen.',text:'De nacht vordert en de wind is een beetje gaan liggen. Wat is jouw volgende zet?',price:11575,weather:13,note:'Minder wind betekent minder windenergie. Wat verwacht je van de prijs?'},
 {time:'05:59',period:'06:00 – 07:00',tag:'De zon komt op',title:'Een nieuwe energiebron ontwaakt.',text:'De wind is stabiel en de zon begint op te komen. Ga je laden, ontladen of wacht je af?',price:11003,weather:16,note:'De eerste zonne-energie komt beschikbaar.'},
 {time:'08:20',period:'08:30 – 09:30',tag:'Ingekomen nieuwsbericht',title:'Een lang weekend voor veel bedrijven.',text:'Veel mensen hebben een vrije dag genomen en daardoor een lang weekend. Sommige bedrijven hebben besloten hun productie stil te leggen. Hoe reageer jij?',price:179,weather:19,note:'Als bedrijven minder produceren, verandert de vraag naar elektriciteit.'},
 {time:'10:50',period:'11:00 – 12:00',tag:'Weersupdate',title:'Meer wolken dan verwacht.',text:'Het is bewolkter dan voorspeld en er komt regen. Kies je actie voor het komende uur.',price:99920,weather:22,note:'De verwachte zonneproductie kan anders uitpakken.',after:'TenneT activeert noodvermogen tussen 11:22 en 12:21. De energieprijs loopt sterk op.'},
 {time:'12:25',period:'12:30 – 13:30',tag:'Weeralarm',title:'Zwaar onweer op komst.',text:'Er is zwaar onweer op komst met hagelbuien! Je laatste handelsbeslissing staat voor de deur. Hoe zet je de resterende energie in?',price:92949,weather:25,note:'Neem de verplichte eindlading mee in je laatste keuze.'}
 ];
 function initial(name){return {name,energy:1,balance:-30000,history:[],phase:'play',settlement:0};}
 function trade(s,action){
  if(s.phase!=='play'||s.history.length>=6||!['charge','hold','discharge'].includes(action))throw Error('Ongeldige keuze');
  if(action==='charge'&&s.energy===2)throw Error('De batterij is vol');
  if(action==='discharge'&&s.energy===0)throw Error('De batterij is leeg');
  const n=JSON.parse(JSON.stringify(s)),r=rounds[n.history.length],delta=action==='charge'?-r.price:action==='discharge'?r.price:0;
  n.energy+=action==='charge'?1:action==='discharge'?-1:0;n.balance+=delta;
  n.history.push({action,delta,energy:n.energy,balance:n.balance});n.phase='result';return n;
 }
 function next(s){const n=JSON.parse(JSON.stringify(s));if(n.phase!=='result')throw Error('Geen resultaat');if(n.history.length===6){n.settlement=n.energy<1?-17199:n.energy>1?17139:0;n.balance+=n.settlement;n.energy=1;n.phase='finished';}else n.phase='play';return n;}
 const api={rounds,initial,trade,next};root.Game=api;if(typeof module!=='undefined')module.exports=api;
})(globalThis);
