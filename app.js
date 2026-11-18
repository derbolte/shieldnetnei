const tabs = document.querySelectorAll('.nav-item');
const panels = document.querySelectorAll('.tab-panel');
tabs.forEach(btn => btn.addEventListener('click', () => {
  tabs.forEach(item => item.classList.toggle('active', item === btn));
  panels.forEach(panel => panel.classList.toggle('active', panel.id === `panel-${btn.dataset.tab}`));
}));

document.querySelectorAll('.toggle[data-feature]').forEach(toggle => {
  toggle.addEventListener('click', () => {
    const enabled = toggle.classList.toggle('on');
    toggle.setAttribute('aria-pressed', String(enabled));
    const enabledCount = document.querySelectorAll('.toggle[data-feature].on').length;
    document.getElementById('protectionStatus').textContent =
      enabledCount === 3 ? 'Alle Filter aktiv (Demo)' : `${enabledCount}/3 Filter aktiv (Demo)`;
  });
});

let vpnConnected = false;
const quickVpnToggle = document.getElementById('vpnQuickToggle');
function updateVpnUI() {
  document.getElementById('vpnStatus').textContent = vpnConnected ? 'Verbunden (Demo)' : 'Nicht verbunden';
  document.getElementById('vpnToggle').textContent = vpnConnected ? 'VPN trennen (Demo)' : 'VPN verbinden (Demo)';
  quickVpnToggle.classList.toggle('on', vpnConnected);
  quickVpnToggle.setAttribute('aria-pressed', String(vpnConnected));
}
quickVpnToggle.addEventListener('click', () => {
  vpnConnected = !vpnConnected;
  updateVpnUI();
});
document.getElementById('vpnToggle').addEventListener('click', event => {
  vpnConnected = !vpnConnected;
  updateVpnUI();
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