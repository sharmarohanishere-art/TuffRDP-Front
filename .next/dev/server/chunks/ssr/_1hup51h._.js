module.exports = [
"[project]/app/LandingPage.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>LandingPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
'use client';
;
;
const faqAnswers = {
    'What does rdp.sh offer?': 'rdp.sh provides instant, fully automated VPS hosting with both Windows and Linux options. We offer high-performance servers powered by AMD EPYC processors, NVMe storage, and 1Gbps unmetered bandwidth — all with full root or admin access and free DDoS protection.',
    'What operating systems are available?': 'We offer Windows Server 2019, Windows Server 2022, and a wide range of Linux distributions including Ubuntu, Debian, CentOS, Rocky Linux, AlmaLinux, Fedora, and Kali Linux. You can reinstall to a different OS at any time from your dashboard.',
    'Do I get full root or admin access?': 'Yes, every server comes with full access. Windows servers include full administrator rights, and every Linux machine comes with root permissions. You have complete control to install any software and configure your server however you need.',
    'Are servers delivered automatically?': "Yes, all our servers are deployed automatically 24/7 after payment. You'll receive your login credentials within minutes and can start using your server right away. No manual review or waiting required.",
    'How long does server setup take?': "Server deployment is fully automated and typically takes less than 5 minutes. Once your payment is confirmed, your server credentials are generated instantly and you'll receive them via email.",
    'What payment methods do you accept?': 'We accept credit/debit cards (Visa, Mastercard, American Express), PayPal, and over 20 cryptocurrencies including Bitcoin, Ethereum, Litecoin, and Monero. All payments are processed securely and servers are deployed instantly after confirmation.',
    'What server locations are available?': 'We operate datacenters in Amsterdam (Netherlands), Warsaw (Poland), New York (USA), and Sandefjord (Norway). You can choose the location closest to you or your target audience during the order process.',
    'What DDoS protection is included?': 'All our servers include free Layer 4 DDoS protection with automatic traffic filtering. Our network is protected by enterprise-grade Corero mitigation systems with over 5 Tbps of scrubbing capacity. During an attack, malicious traffic is filtered while legitimate traffic continues to flow to your server.',
    'Can I upgrade my server?': 'Yes, you can upgrade to any higher plan at any time directly from your dashboard. The upgrade is applied instantly. Downgrading is not possible.',
    'Do you offer refunds?': "Due to the instant nature of our digital services and the resources allocated upon deployment, we generally do not offer refunds. However, if you experience technical issues that we cannot resolve, please contact our support team and we'll work with you to find a solution.",
    'Can I host game servers?': 'Yes, you can host game servers on our VPS plans. Our servers feature high-performance AMD EPYC processors, NVMe storage, and 1Gbps unmetered bandwidth, making them suitable for hosting game servers like Minecraft, CS2, Valheim, and more.',
    'What is not allowed on your servers?': 'Child pornography, drug or weapon stores, terrorism-related activity, hate speech, mass mailing, and any Spamhaus-triggering abuse that causes IP blacklisting are not allowed on our servers.'
};
const THEME_KEY = 'rdp-theme';
function LandingPage({ html }) {
    const rootRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const root = rootRef.current;
        if (!root) return;
        const htmlEl = document.documentElement;
        const media = window.matchMedia('(prefers-color-scheme: dark)');
        const applyTheme = (theme)=>{
            htmlEl.classList.toggle('dark', theme === 'dark');
            htmlEl.dataset.theme = theme;
            try {
                localStorage.setItem(THEME_KEY, theme);
            } catch  {}
            const toggle = document.getElementById('rdp-theme-toggle');
            const label = toggle?.querySelector('[data-theme-label]');
            if (toggle) toggle.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`);
            if (label) label.textContent = theme === 'dark' ? 'Light mode' : 'Dark mode';
        };
        const savedTheme = (()=>{
            try {
                return localStorage.getItem(THEME_KEY);
            } catch  {
                return null;
            }
        })();
        applyTheme(savedTheme || (media.matches ? 'dark' : 'light'));
        const header = root.querySelector('header');
        const onScroll = ()=>{
            if (!header) return;
            header.classList.toggle('rdp-nav-scrolled', window.scrollY > 12);
        };
        onScroll();
        window.addEventListener('scroll', onScroll, {
            passive: true
        });
        if (header && !document.getElementById('rdp-theme-toggle')) {
            const toggle = document.createElement('button');
            toggle.id = 'rdp-theme-toggle';
            toggle.type = 'button';
            toggle.className = 'rdp-theme-toggle';
            toggle.innerHTML = `
        <span class="rdp-theme-toggle-icon" aria-hidden="true">◐</span>
        <span data-theme-label>Light mode</span>
      `;
            toggle.addEventListener('click', ()=>{
                const next = htmlEl.classList.contains('dark') ? 'light' : 'dark';
                applyTheme(next);
            });
            const targetRow = header.querySelector('header > div:last-child > div, header .flex.items-center.gap-5')?.parentElement || header.firstElementChild || header;
            targetRow.appendChild(toggle);
        }
        const revealCandidates = Array.from(root.querySelectorAll([
            'h1',
            'h2',
            'section .rounded-xl',
            'section .rounded-2xl',
            'section .rounded-3xl',
            'section .group',
            '#faq .faq-item',
            'footer .rounded-2xl',
            'footer .rounded-3xl'
        ].join(',')));
        const seen = new Set();
        let delay = 0;
        revealCandidates.forEach((el)=>{
            if (seen.has(el) || el.closest('header')) return;
            seen.add(el);
            el.classList.add('rdp-reveal');
            el.style.transitionDelay = `${Math.min(delay * 80, 360)}ms`;
            delay = (delay + 1) % 5;
            if (el.matches('a, button, .group, .rounded-xl, .rounded-2xl, .rounded-3xl')) {
                el.classList.add('rdp-hover-lift');
            }
        });
        const io = new IntersectionObserver((entries)=>{
            entries.forEach((entry)=>{
                if (entry.isIntersecting) {
                    entry.target.classList.add('rdp-reveal-in');
                    io.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.12,
            rootMargin: '0px 0px -8% 0px'
        });
        root.querySelectorAll('.rdp-reveal').forEach((el)=>io.observe(el));
        const perfSection = Array.from(root.querySelectorAll('section')).find((section)=>section.textContent?.includes('Rock-solid performance, ready to deploy'));
        if (perfSection) {
            const filterButtons = Array.from(perfSection.querySelectorAll('button'));
            const searchInput = perfSection.querySelector('input[type="text"]');
            const osHeading = Array.from(perfSection.querySelectorAll('h3')).find((el)=>el.textContent?.trim() === 'Operating Systems');
            const appsHeading = Array.from(perfSection.querySelectorAll('h3')).find((el)=>el.textContent?.trim() === 'Applications');
            const osCards = osHeading ? Array.from(osHeading.nextElementSibling?.querySelectorAll('a.group') || []) : [];
            const appsCards = appsHeading ? Array.from(appsHeading.nextElementSibling?.querySelectorAll('a.group') || []) : [];
            const applyFilter = ()=>{
                const active = filterButtons.find((btn)=>btn.dataset.active === 'true')?.textContent?.trim() || 'All';
                const query = (searchInput?.value || '').trim().toLowerCase();
                const updateButtonStyles = ()=>{
                    filterButtons.forEach((btn)=>{
                        const isActive = btn.dataset.active === 'true';
                        btn.className = isActive ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 scale-[1.02]' : 'bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/20 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200';
                    });
                };
                const updateCards = (cards, visible)=>{
                    cards.forEach((card)=>{
                        const matchQuery = !query || card.textContent?.toLowerCase().includes(query);
                        const show = visible && matchQuery;
                        card.style.display = show ? '' : 'none';
                        card.classList.toggle('rdp-fade-scale-in', show);
                    });
                };
                updateButtonStyles();
                updateCards(osCards, active === 'All' || active === 'Operating Systems');
                updateCards(appsCards, active === 'All' || active === 'Applications');
                if (osHeading && osHeading.nextElementSibling) {
                    const anyVisible = osCards.some((card)=>card.style.display !== 'none');
                    osHeading.style.display = anyVisible ? '' : 'none';
                    osHeading.nextElementSibling.style.display = anyVisible ? '' : 'none';
                }
                if (appsHeading && appsHeading.nextElementSibling) {
                    const anyVisible = appsCards.some((card)=>card.style.display !== 'none');
                    appsHeading.style.display = anyVisible ? '' : 'none';
                    appsHeading.nextElementSibling.style.display = anyVisible ? '' : 'none';
                }
            };
            filterButtons.forEach((btn, idx)=>{
                btn.dataset.active = idx === 0 ? 'true' : 'false';
                btn.addEventListener('click', ()=>{
                    filterButtons.forEach((b)=>b.dataset.active = 'false');
                    btn.dataset.active = 'true';
                    applyFilter();
                });
            });
            searchInput?.addEventListener('input', applyFilter);
            applyFilter();
        }
        const faqSection = Array.from(root.querySelectorAll('section')).find((section)=>section.textContent?.includes('Frequently Asked Questions'));
        if (faqSection) {
            faqSection.id = 'faq';
            const grid = faqSection.querySelector('.grid');
            if (grid) {
                const cards = Array.from(grid.children);
                cards.forEach((item)=>{
                    item.classList.add('faq-item');
                    const trigger = item.querySelector('button');
                    const questionEl = trigger?.querySelector('span');
                    const question = questionEl?.textContent?.trim() || '';
                    const answerText = faqAnswers[question];
                    if (!trigger || !answerText) return;
                    trigger.classList.add('faq-trigger');
                    const iconWrap = trigger.querySelector('span:last-child');
                    const iconSvg = trigger.querySelector('svg');
                    if (iconWrap) iconWrap.classList.add('faq-toggle');
                    if (iconSvg) iconSvg.classList.add('faq-toggle-icon');
                    let answerWrap = item.querySelector('.faq-answer-wrap');
                    if (!answerWrap) {
                        answerWrap = document.createElement('div');
                        answerWrap.className = 'faq-answer-wrap';
                        answerWrap.innerHTML = '<div class="faq-answer-inner"><div class="faq-answer-content"></div></div>';
                        item.appendChild(answerWrap);
                    }
                    const answerContent = answerWrap.querySelector('.faq-answer-content');
                    if (answerContent) answerContent.textContent = answerText;
                    const setOpen = (open)=>{
                        item.classList.toggle('open', open);
                        trigger.setAttribute('aria-expanded', String(open));
                    };
                    setOpen(false);
                    trigger.addEventListener('click', (event)=>{
                        event.preventDefault();
                        setOpen(!item.classList.contains('open'));
                    });
                });
            }
        }
        return ()=>{
            window.removeEventListener('scroll', onScroll);
            io.disconnect();
        };
    }, []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: rootRef,
        dangerouslySetInnerHTML: {
            __html: html
        }
    }, void 0, false, {
        fileName: "[project]/app/LandingPage.tsx",
        lineNumber: 226,
        columnNumber: 10
    }, this);
}
}),
"[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)").vendored['react-ssr'].ReactJsxDevRuntime;
}),
];

//# sourceMappingURL=_1hup51h._.js.map