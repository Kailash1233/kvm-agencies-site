// Vanilla enquiry-form handler used on pre-rendered static pages (no React needed).
(function () {
  var f = document.querySelector('#enquiry form');
  if (!f) return;
  var ta = (document.documentElement.lang || '').indexOf('ta') === 0;
  var T = ta
    ? { sending: 'அனுப்புகிறது…', sent: 'நன்றி! உங்கள் விசாரணை அனுப்பப்பட்டது. விரைவில் அழைக்கிறோம்.', fail: 'அனுப்ப முடியவில்லை. நேரடியாக அழைக்கவும் / WhatsApp செய்யவும்.', wa: 'WhatsApp-லும் அனுப்பு' }
    : { sending: 'Sending…', sent: 'Thank you! Your enquiry has been sent. We will call you shortly.', fail: 'Could not send. Please call or WhatsApp us directly.', wa: 'Also send on WhatsApp' };
  var btn = f.querySelector('button[type=submit]');
  var label = btn.textContent;
  f.addEventListener('submit', function (e) {
    e.preventDefault();
    var d = {};
    new FormData(f).forEach(function (v, k) { d[k] = String(v); });
    if (d._honey) return;
    var msg = ('Hi KVM Agencies, I am ' + d.name + ' (' + d.phone + '). I need ' + d.material + (d.quantity ? ' – ' + d.quantity : '') + ' at ' + d.location + '. ' + (d.message || '')).trim();
    btn.disabled = true; btn.textContent = T.sending;
    var old = f.querySelectorAll('.form-status, .wa-after'); for (var i = 0; i < old.length; i++) old[i].remove();
    // Form-encoded body + only CORS-safelisted headers = no preflight request (FormSubmit rejects preflights)
    var body = new URLSearchParams(Object.assign({}, d, { page: location.href, _subject: 'New enquiry: ' + d.material + ' – ' + d.location + ' (' + d.name + ')', _template: 'table', _captcha: 'false' }));
    var url = '__FORM_ENDPOINT__';
    function ok() { done(true); (window.dataLayer = window.dataLayer || []).push({ event: 'generate_lead', method: 'form', material: d.material, location: d.location }); if (window.gtag) gtag('event', 'generate_lead', { method: 'form', material: d.material, location: d.location }); f.reset(); }
    fetch(url, { method: 'POST', headers: { Accept: 'application/json' }, body: body })
      .then(function (r) { if (!r.ok) throw new Error(r.status); ok(); })
      .catch(function (err) {
        // Response not readable (CORS) – send again without reading the reply; FormSubmit still delivers the email
        if (err instanceof TypeError) return fetch(url, { method: 'POST', mode: 'no-cors', body: body }).then(ok);
        throw err;
      })
      .catch(function () { done(false); });
    function done(ok) {
      btn.disabled = false; btn.textContent = label;
      var p = document.createElement('p'); p.className = 'form-status'; p.textContent = (ok ? '✅ ' : '⚠️ ') + (ok ? T.sent : T.fail); f.appendChild(p);
      var a = document.createElement('a'); a.className = 'btn btn-wa wa-after'; a.target = '_blank'; a.rel = 'noopener'; a.setAttribute('data-track', 'whatsapp');
      a.href = 'https://wa.me/__WA__?text=' + encodeURIComponent(msg); a.textContent = T.wa; f.appendChild(a);
    }
  });
})();
