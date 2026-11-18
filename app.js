const tabs = document.querySelectorAll('.nav-item');
const panels = document.querySelectorAll('.tab-panel');
tabs.forEach(btn => btn.addEventListener('click', () => {
  tabs.forEach(item => item.classList.toggle('active', item === btn));
  panels.forEach(panel => panel.classList.toggle('active', panel.id === `panel-${btn.dataset.tab}`));
}));

const masterToggle = document.getElementById('masterToggle');
masterToggle.addEventListener('click', () => {
  const enabled = masterToggle.classList.toggle('on');
  masterToggle.setAttribute('aria-pressed', String(enabled));
  document.getElementById('protectionStatus').textContent = enabled ? 'Aktiv (Demo)' : 'Pausiert (Demo)';
});

let vpnConnected = false;
document.getElementById('vpnToggle').addEventListener('click', event => {
  vpnConnected = !vpnConnected;
  document.getElementById('vpnStatus').textContent = vpnConnected ? 'Verbunden (Demo)' : 'Nicht verbunden';
  event.currentTarget.textContent = vpnConnected ? 'VPN trennen (Demo)' : 'VPN verbinden (Demo)';
});

document.querySelectorAll('.server').forEach(server => server.addEventListener('click', () => {
  document.querySelectorAll('.server').forEach(item => {
    item.classList.toggle('selected', item === server);
    item.querySelector('.server-check').textContent = item === server ? '✓' : '';
  });
}));

document.getElementById('checkForm').addEventListener('submit', event => {
  event.preventDefault();
  const value = document.getElementById('domainInput').value.trim();
  const result = document.getElementById('checkResult');
  if (!value) {
    result.textContent = 'Bitte gib zuerst eine Domain ein.';
    return;
  }
  result.textContent = `Demo-Prüfung für „${value}“: Es wurde keine echte Sicherheitsprüfung durchgeführt.`;
});

if ('serviceWorker' in navigator && location.protocol.startsWith('http')) {
  window.addEventListener('load', () => navigator.serviceWorker.register('./sw.js').catch(() => {}));
}