const $=id=>document.getElementById(id);
let enabled=false,checked=0,hits=0,history=[],lang='de';
const words={
 de:{tag:'SICHERE DEINE DIGITALE WELT',prototype:'MOBILE SECURITY PROTOTYP',off:'Schutz deaktiviert',on:'Demo-Schutz aktiviert',offText:'Die Demo-Steuerung ist ausgeschaltet.',onText:'Die Demo-Steuerung ist eingeschaltet.',activate:'Schutz aktivieren',deactivate:'Schutz ausschalten',disclaimer:'Demo-Modus – kein echter Netzwerk- oder Geräteschutz.',checked:'Geprüfte Domains',hits:'Demo-Treffer',modules:'Schutzmodule',ads:'Werbeblocker',tracking:'Anti-Tracking',malware:'Malware- & Phishing-Schutz',planned:'Geplant',updates:'Filterlisten-Updates',notConnected:'Nicht verbunden',scanner:'Domain-Sicherheitscheck',scannerHelp:'Prüfe eine Domain gegen die eingebauten Beispielregeln.',domainLabel:'Domain',check:'Domain überprüfen',placeholder:'Hier erscheint das Prüfergebnis.',testDomains:'Beispielregeln: ads.example · tracker.example · malware.example',recent:'Letzte Prüfungen',reset:'Zurücksetzen',noHistory:'Noch keine Domains geprüft.',footer:'Lokaler Prototyp',invalid:'Bitte gib eine gültige Domain ein.',inactive:'Bitte aktiviere zuerst den Demo-Schutz.',match:'Demo-Treffer',clean:'Kein Treffer in den Beispielregeln (keine Sicherheitsgarantie).',empty:'Kein Treffer'}, 
 en:{tag:'SECURE YOUR DIGITAL WORLD',prototype:'MOBILE SECURITY PROTOTYPE',off:'Protection disabled',on:'Demo protection enabled',offText:'Demo controls are switched off.',onText:'Demo controls are switched on.',activate:'Enable protection',deactivate:'Disable protection',disclaimer:'Demo mode – no real network or device protection.',checked:'Domains checked',hits:'Demo matches',modules:'Protection modules',ads:'Ad blocker',tracking:'Anti-tracking',malware:'Malware & phishing protection',planned:'Planned',updates:'Filter list updates',notConnected:'Not connected',scanner:'Domain security check',scannerHelp:'Check a domain against the built-in sample rules.',domainLabel:'Domain',check:'Check domain',placeholder:'The result will appear here.',testDomains:'Sample rules: ads.example · tracker.example · malware.example',recent:'Recent checks',reset:'Reset',noHistory:'No domains checked yet.',footer:'Local prototype',invalid:'Please enter a valid domain.',inactive:'Enable demo protection first.',match:'Demo match',clean:'No match in sample rules (not a safety guarantee).',empty:'No match'}
};
const rules=[['ads.example','Werbung','Advertising'],['tracker.example','Tracking','Tracking'],['malware.example','Schadsoftware','Malware']];
function t(k){return words[lang][k]}
function render(){
 $('status').textContent=t(enabled?'on':'off');$('statusText').textContent=t(enabled?'onText':'offText');$('toggle').textContent=t(enabled?'deactivate':'activate');$('checked').textContent=checked;$('hits').textContent=hits;
 document.querySelectorAll('[data-i18n]').forEach(el=>{const k=el.dataset.i18n;if(words[lang][k])el.textContent=t(k)});
 $('history').innerHTML=history.length?history.slice(0,5).map(x=>`<div class="entry"><span>${escapeHtml(x.host)}</span><span>${escapeHtml(x.label)}</span></div>`).join(''):t('noHistory');
}
function escapeHtml(s){return s.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
$('toggle').onclick=()=>{enabled=!enabled;render()};
$('lang').onclick=()=>{lang=lang==='de'?'en':'de';$('lang').textContent=lang==='de'?'DE / EN':'EN / DE';render()};
$('check').onclick=()=>{
 let host=$('domain').value.trim().toLowerCase().replace(/^https?:\/\//,'').split(/[/?#:]/)[0].replace(/\.$/,'');
 if(!host||!/^([a-z0-9-]+\.)*[a-z0-9-]+$/.test(host)){$('result').textContent=t('invalid');return}
 if(!enabled){$('result').textContent=t('inactive');return}
 checked++;
 const match=rules.find(r=>host===r[0]||host.endsWith('.'+r[0]));
 if(match){hits++;$('result').textContent='⚠ '+t('match')+': '+(lang==='de'?match[1]:match[2])+' — '+host}
 else{$('result').textContent='✓ '+t('clean')+' '+host}
 history.unshift({host,label:match?(lang==='de'?'Treffer':'Match'):t('empty')});render();
};
$('domain').addEventListener('keydown',e=>{if(e.key==='Enter')$('check').click()});
$('reset').onclick=()=>{checked=0;hits=0;history=[];$('result').textContent=t('placeholder');render()};
if('serviceWorker' in navigator && location.protocol.startsWith('http'))window.addEventListener('load',()=>navigator.serviceWorker.register('./sw.js').catch(()=>{}));
render();