/* HQ enhancement only: content, prompts and navigation still work without this file. */
(function () {
  'use strict';

  function init() {
    var toast = document.getElementById('hqToast');
    var toastTimer;
    function announce(message) {
      clearTimeout(toastTimer);
      toast.textContent = message;
      toast.classList.add('is-visible');
      toastTimer = setTimeout(function () { toast.classList.remove('is-visible'); }, 5000);
    }

    // Edition v8: the masters switcher is built natively into the fixed
    // universal top bar by lib/masters-nav.js bar mode (click disclosure,
    // Escape, focusout, outside click) — no clone step left to do here.

    // Edition v9: the bar's links wrap on narrow frames rather than clipping,
    // so its height is content-shaped. Measure the real wrapped height into
    // --rs-topbar-h (the CSS carries a three-row no-JS fallback) so page
    // content, anchors and the switcher's dropdown always clear the bar.
    var barEl = document.getElementById('rsTopBar');
    function fitBar() {
      if (!barEl) return;
      document.body.style.setProperty('--rs-topbar-h', barEl.offsetHeight + 'px');
    }
    fitBar();
    window.addEventListener('resize', fitBar);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(fitBar);

    var wordFind = document.getElementById('wordFind');
    var wordEmpty = document.getElementById('wordEmpty');
    if (wordFind) {
      wordFind.addEventListener('input', function () {
        var query = wordFind.value.trim().toLowerCase();
        var shown = 0;
        document.querySelectorAll('#words details[data-term]').forEach(function (row) {
          var hay = (row.getAttribute('data-term') + ' ' + row.textContent).toLowerCase();
          var hit = !query || hay.indexOf(query) !== -1;
          row.hidden = !hit;
          if (hit) shown += 1;
        });
        document.querySelectorAll('#words .word-group').forEach(function (group) {
          group.hidden = group.querySelector('details[data-term]:not([hidden])') === null;
        });
        if (wordEmpty) wordEmpty.hidden = shown !== 0;
      });
    }

    function fallbackCopy(text) {
      var field = document.createElement('textarea');
      var previouslyFocused = document.activeElement;
      field.value = text;
      field.className = 'clipboard-buffer';
      field.setAttribute('readonly', '');
      field.setAttribute('aria-label', 'Starting prompt to copy');
      document.body.appendChild(field);
      var copied = false;
      try {
        field.select();
        field.setSelectionRange(0, field.value.length);
        copied = document.execCommand('copy');
      } catch (error) { copied = false; }
      finally {
        field.remove();
        if (previouslyFocused) previouslyFocused.focus({ preventScroll: true });
      }
      return copied;
    }

    document.querySelectorAll('[data-copy]').forEach(function (button) {
      button.hidden = false;
      var label = button.textContent;
      var labelTimer;
      button.addEventListener('click', async function () {
        var prompt = document.getElementById('prompt-' + button.dataset.copy);
        if (!prompt) return;
        clearTimeout(labelTimer);
        button.disabled = true;
        var copied = false;
        try {
          if (navigator.clipboard && window.isSecureContext) {
            await navigator.clipboard.writeText(prompt.textContent);
            copied = true;
          }
        } catch (error) { /* Permission can be denied inside a preview iframe. Try selection copying. */ }
        if (!copied) copied = fallbackCopy(prompt.textContent);
        button.disabled = false;
        if (copied) {
          button.textContent = 'Copied';
          announce('Prompt copied. Paste into a fresh Arena session.');
          labelTimer = setTimeout(function () { button.textContent = label; }, 2400);
        } else {
          button.textContent = label;
          prompt.closest('details').open = true;
          prompt.focus();
          var selection = window.getSelection();
          if (selection) {
            var range = document.createRange();
            range.selectNodeContents(prompt);
            selection.removeAllRanges();
            selection.addRange(range);
          }
          announce('Clipboard unavailable. Prompt selected; use your device’s Copy command.');
        }
      });
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
