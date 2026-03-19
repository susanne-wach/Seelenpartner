/* =====================================================
   Cookie Consent Banner — Susanne Wachter
   DSGVO/GDPR konform · Consent Mode v2
   ===================================================== */

(function () {
  const COOKIE_NAME = 'sw_consent';
  const COOKIE_DAYS = 365;

  function getCookie(name) {
    return document.cookie.split('; ').reduce((r, v) => {
      const parts = v.split('=');
      return parts[0] === name ? decodeURIComponent(parts[1]) : r;
    }, null);
  }

  function setCookie(name, value, days) {
    const d = new Date();
    d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${encodeURIComponent(value)};expires=${d.toUTCString()};path=/;SameSite=Lax`;
  }

  function grantConsent() {
    if (typeof gtag === 'function') {
      gtag('consent', 'update', {
        analytics_storage: 'granted',
        ad_storage: 'denied'
      });
    }
    setCookie(COOKIE_NAME, 'granted', COOKIE_DAYS);
  }

  function denyConsent() {
    if (typeof gtag === 'function') {
      gtag('consent', 'update', {
        analytics_storage: 'denied',
        ad_storage: 'denied'
      });
    }
    setCookie(COOKIE_NAME, 'denied', COOKIE_DAYS);
  }

  function hideBanner() {
    const banner = document.getElementById('sw-cookie-banner');
    if (banner) {
      banner.style.transform = 'translateY(120%)';
      banner.style.opacity = '0';
      setTimeout(() => banner.remove(), 500);
    }
  }

  function showBanner() {
    const banner = document.createElement('div');
    banner.id = 'sw-cookie-banner';
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-label', 'Cookie-Einstellungen');
    banner.innerHTML = `
      <div class="sw-cb__inner">
        <div class="sw-cb__text">
          <p class="sw-cb__title">🍪 Diese Seite verwendet Cookies</p>
          <p class="sw-cb__desc">
            Ich nutze Google Analytics, um zu verstehen, welche Inhalte dir helfen — 
            damit ich mein Angebot für dich verbessern kann. 
            Deine Daten werden anonymisiert und nicht weitergegeben.
            <a href="https://your-balance.at/datenschutzerklarung/" target="_blank" rel="noopener">Datenschutz</a>
          </p>
        </div>
        <div class="sw-cb__buttons">
          <button id="sw-cb-deny" class="sw-cb__btn sw-cb__btn--outline">Ablehnen</button>
          <button id="sw-cb-accept" class="sw-cb__btn sw-cb__btn--primary">Akzeptieren</button>
        </div>
      </div>`;

    const style = document.createElement('style');
    style.textContent = `
      #sw-cookie-banner {
        position: fixed;
        bottom: 24px;
        left: 50%;
        transform: translateX(-50%) translateY(120%);
        width: min(560px, calc(100vw - 32px));
        background: #3A2E3D;
        border: 1px solid rgba(207,172,94,.35);
        border-radius: 20px;
        box-shadow: 0 8px 48px rgba(0,0,0,.45);
        z-index: 9999;
        padding: 24px 28px;
        font-family: 'Inter', sans-serif;
        opacity: 0;
        transition: transform .5s cubic-bezier(.34,1.56,.64,1), opacity .4s ease;
      }
      #sw-cookie-banner.sw-cb--visible {
        transform: translateX(-50%) translateY(0);
        opacity: 1;
      }
      .sw-cb__inner {
        display: flex;
        flex-direction: column;
        gap: 18px;
      }
      .sw-cb__title {
        font-family: 'Cormorant Garamond', serif;
        font-size: 1.15rem;
        color: #F7DE7A;
        margin: 0 0 6px;
        font-weight: 600;
      }
      .sw-cb__desc {
        font-size: .85rem;
        color: rgba(255,255,255,.75);
        line-height: 1.6;
        margin: 0;
      }
      .sw-cb__desc a {
        color: #CFAC5E;
        text-decoration: underline;
        margin-left: 4px;
      }
      .sw-cb__buttons {
        display: flex;
        gap: 12px;
        justify-content: flex-end;
        flex-wrap: wrap;
      }
      .sw-cb__btn {
        padding: 10px 24px;
        border-radius: 60px;
        font-size: .88rem;
        font-family: 'Inter', sans-serif;
        font-weight: 500;
        cursor: pointer;
        border: none;
        transition: all .2s ease;
      }
      .sw-cb__btn--outline {
        background: transparent;
        border: 1.5px solid rgba(255,255,255,.3);
        color: rgba(255,255,255,.75);
      }
      .sw-cb__btn--outline:hover {
        border-color: rgba(255,255,255,.6);
        color: #fff;
      }
      .sw-cb__btn--primary {
        background: linear-gradient(135deg, #DD3089, #c4206f);
        color: #fff;
        box-shadow: 0 4px 16px rgba(221,48,137,.4);
      }
      .sw-cb__btn--primary:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(221,48,137,.55);
      }
      @media (max-width: 480px) {
        #sw-cookie-banner { padding: 20px 18px; bottom: 16px; }
        .sw-cb__buttons { justify-content: stretch; }
        .sw-cb__btn { flex: 1; text-align: center; }
      }
    `;
    document.head.appendChild(style);
    document.body.appendChild(banner);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => banner.classList.add('sw-cb--visible'));
    });

    document.getElementById('sw-cb-accept').addEventListener('click', () => {
      grantConsent();
      hideBanner();
    });

    document.getElementById('sw-cb-deny').addEventListener('click', () => {
      denyConsent();
      hideBanner();
    });
  }

  // On load: check existing consent
  window.addEventListener('DOMContentLoaded', function () {
    const existing = getCookie(COOKIE_NAME);
    if (existing === 'granted') {
      grantConsent();
    } else if (existing === 'denied') {
      denyConsent();
    } else {
      // No decision yet — show banner after short delay
      setTimeout(showBanner, 1200);
    }
  });
})();
