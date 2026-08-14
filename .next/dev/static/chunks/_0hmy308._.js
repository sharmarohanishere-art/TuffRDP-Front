(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/app/LandingPage.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>LandingPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
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
    _s();
    const rootRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "LandingPage.useEffect": ()=>{
            const root = rootRef.current;
            if (!root) return;
            const htmlEl = document.documentElement;
            const media = window.matchMedia('(prefers-color-scheme: dark)');
            const applyTheme = {
                "LandingPage.useEffect.applyTheme": (theme)=>{
                    htmlEl.classList.toggle('dark', theme === 'dark');
                    htmlEl.dataset.theme = theme;
                    try {
                        localStorage.setItem(THEME_KEY, theme);
                    } catch  {}
                    const toggle = document.getElementById('rdp-theme-toggle');
                    const label = toggle?.querySelector('[data-theme-label]');
                    if (toggle) toggle.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`);
                    if (label) label.textContent = theme === 'dark' ? 'Light mode' : 'Dark mode';
                }
            }["LandingPage.useEffect.applyTheme"];
            const savedTheme = ({
                "LandingPage.useEffect.savedTheme": ()=>{
                    try {
                        return localStorage.getItem(THEME_KEY);
                    } catch  {
                        return null;
                    }
                }
            })["LandingPage.useEffect.savedTheme"]();
            applyTheme(savedTheme || (media.matches ? 'dark' : 'light'));
            const header = root.querySelector('header');
            const onScroll = {
                "LandingPage.useEffect.onScroll": ()=>{
                    if (!header) return;
                    header.classList.toggle('rdp-nav-scrolled', window.scrollY > 12);
                }
            }["LandingPage.useEffect.onScroll"];
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
                toggle.addEventListener('click', {
                    "LandingPage.useEffect": ()=>{
                        const next = htmlEl.classList.contains('dark') ? 'light' : 'dark';
                        applyTheme(next);
                    }
                }["LandingPage.useEffect"]);
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
            revealCandidates.forEach({
                "LandingPage.useEffect": (el)=>{
                    if (seen.has(el) || el.closest('header')) return;
                    seen.add(el);
                    el.classList.add('rdp-reveal');
                    el.style.transitionDelay = `${Math.min(delay * 80, 360)}ms`;
                    delay = (delay + 1) % 5;
                    if (el.matches('a, button, .group, .rounded-xl, .rounded-2xl, .rounded-3xl')) {
                        el.classList.add('rdp-hover-lift');
                    }
                }
            }["LandingPage.useEffect"]);
            const io = new IntersectionObserver({
                "LandingPage.useEffect": (entries)=>{
                    entries.forEach({
                        "LandingPage.useEffect": (entry)=>{
                            if (entry.isIntersecting) {
                                entry.target.classList.add('rdp-reveal-in');
                                io.unobserve(entry.target);
                            }
                        }
                    }["LandingPage.useEffect"]);
                }
            }["LandingPage.useEffect"], {
                threshold: 0.12,
                rootMargin: '0px 0px -8% 0px'
            });
            root.querySelectorAll('.rdp-reveal').forEach({
                "LandingPage.useEffect": (el)=>io.observe(el)
            }["LandingPage.useEffect"]);
            const perfSection = Array.from(root.querySelectorAll('section')).find({
                "LandingPage.useEffect.perfSection": (section)=>section.textContent?.includes('Rock-solid performance, ready to deploy')
            }["LandingPage.useEffect.perfSection"]);
            if (perfSection) {
                const filterButtons = Array.from(perfSection.querySelectorAll('button'));
                const searchInput = perfSection.querySelector('input[type="text"]');
                const osHeading = Array.from(perfSection.querySelectorAll('h3')).find({
                    "LandingPage.useEffect.osHeading": (el)=>el.textContent?.trim() === 'Operating Systems'
                }["LandingPage.useEffect.osHeading"]);
                const appsHeading = Array.from(perfSection.querySelectorAll('h3')).find({
                    "LandingPage.useEffect.appsHeading": (el)=>el.textContent?.trim() === 'Applications'
                }["LandingPage.useEffect.appsHeading"]);
                const osCards = osHeading ? Array.from(osHeading.nextElementSibling?.querySelectorAll('a.group') || []) : [];
                const appsCards = appsHeading ? Array.from(appsHeading.nextElementSibling?.querySelectorAll('a.group') || []) : [];
                const applyFilter = {
                    "LandingPage.useEffect.applyFilter": ()=>{
                        const active = filterButtons.find({
                            "LandingPage.useEffect.applyFilter": (btn)=>btn.dataset.active === 'true'
                        }["LandingPage.useEffect.applyFilter"])?.textContent?.trim() || 'All';
                        const query = (searchInput?.value || '').trim().toLowerCase();
                        const updateButtonStyles = {
                            "LandingPage.useEffect.applyFilter.updateButtonStyles": ()=>{
                                filterButtons.forEach({
                                    "LandingPage.useEffect.applyFilter.updateButtonStyles": (btn)=>{
                                        const isActive = btn.dataset.active === 'true';
                                        btn.className = isActive ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 scale-[1.02]' : 'bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/20 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200';
                                    }
                                }["LandingPage.useEffect.applyFilter.updateButtonStyles"]);
                            }
                        }["LandingPage.useEffect.applyFilter.updateButtonStyles"];
                        const updateCards = {
                            "LandingPage.useEffect.applyFilter.updateCards": (cards, visible)=>{
                                cards.forEach({
                                    "LandingPage.useEffect.applyFilter.updateCards": (card)=>{
                                        const matchQuery = !query || card.textContent?.toLowerCase().includes(query);
                                        const show = visible && matchQuery;
                                        card.style.display = show ? '' : 'none';
                                        card.classList.toggle('rdp-fade-scale-in', show);
                                    }
                                }["LandingPage.useEffect.applyFilter.updateCards"]);
                            }
                        }["LandingPage.useEffect.applyFilter.updateCards"];
                        updateButtonStyles();
                        updateCards(osCards, active === 'All' || active === 'Operating Systems');
                        updateCards(appsCards, active === 'All' || active === 'Applications');
                        if (osHeading && osHeading.nextElementSibling) {
                            const anyVisible = osCards.some({
                                "LandingPage.useEffect.applyFilter.anyVisible": (card)=>card.style.display !== 'none'
                            }["LandingPage.useEffect.applyFilter.anyVisible"]);
                            osHeading.style.display = anyVisible ? '' : 'none';
                            osHeading.nextElementSibling.style.display = anyVisible ? '' : 'none';
                        }
                        if (appsHeading && appsHeading.nextElementSibling) {
                            const anyVisible = appsCards.some({
                                "LandingPage.useEffect.applyFilter.anyVisible": (card)=>card.style.display !== 'none'
                            }["LandingPage.useEffect.applyFilter.anyVisible"]);
                            appsHeading.style.display = anyVisible ? '' : 'none';
                            appsHeading.nextElementSibling.style.display = anyVisible ? '' : 'none';
                        }
                    }
                }["LandingPage.useEffect.applyFilter"];
                filterButtons.forEach({
                    "LandingPage.useEffect": (btn, idx)=>{
                        btn.dataset.active = idx === 0 ? 'true' : 'false';
                        btn.addEventListener('click', {
                            "LandingPage.useEffect": ()=>{
                                filterButtons.forEach({
                                    "LandingPage.useEffect": (b)=>b.dataset.active = 'false'
                                }["LandingPage.useEffect"]);
                                btn.dataset.active = 'true';
                                applyFilter();
                            }
                        }["LandingPage.useEffect"]);
                    }
                }["LandingPage.useEffect"]);
                searchInput?.addEventListener('input', applyFilter);
                applyFilter();
            }
            const faqSection = Array.from(root.querySelectorAll('section')).find({
                "LandingPage.useEffect.faqSection": (section)=>section.textContent?.includes('Frequently Asked Questions')
            }["LandingPage.useEffect.faqSection"]);
            if (faqSection) {
                faqSection.id = 'faq';
                const grid = faqSection.querySelector('.grid');
                if (grid) {
                    const cards = Array.from(grid.children);
                    cards.forEach({
                        "LandingPage.useEffect": (item)=>{
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
                            const setOpen = {
                                "LandingPage.useEffect.setOpen": (open)=>{
                                    item.classList.toggle('open', open);
                                    trigger.setAttribute('aria-expanded', String(open));
                                }
                            }["LandingPage.useEffect.setOpen"];
                            setOpen(false);
                            trigger.addEventListener('click', {
                                "LandingPage.useEffect": (event)=>{
                                    event.preventDefault();
                                    setOpen(!item.classList.contains('open'));
                                }
                            }["LandingPage.useEffect"]);
                        }
                    }["LandingPage.useEffect"]);
                }
            }
            return ({
                "LandingPage.useEffect": ()=>{
                    window.removeEventListener('scroll', onScroll);
                    io.disconnect();
                }
            })["LandingPage.useEffect"];
        }
    }["LandingPage.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
_s(LandingPage, "Bbi/gSzGuaeygbnzN31K04tsrQ0=");
_c = LandingPage;
var _c;
__turbopack_context__.k.register(_c, "LandingPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/node_modules/next/dist/compiled/react/cjs/react-jsx-dev-runtime.development.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
/**
 * @license React
 * react-jsx-dev-runtime.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ "use strict";
"production" !== ("TURBOPACK compile-time value", "development") && function() {
    function getComponentNameFromType(type) {
        if (null == type) return null;
        if ("function" === typeof type) return type.$$typeof === REACT_CLIENT_REFERENCE ? null : type.displayName || type.name || null;
        if ("string" === typeof type) return type;
        switch(type){
            case REACT_FRAGMENT_TYPE:
                return "Fragment";
            case REACT_PROFILER_TYPE:
                return "Profiler";
            case REACT_STRICT_MODE_TYPE:
                return "StrictMode";
            case REACT_SUSPENSE_TYPE:
                return "Suspense";
            case REACT_SUSPENSE_LIST_TYPE:
                return "SuspenseList";
            case REACT_ACTIVITY_TYPE:
                return "Activity";
            case REACT_VIEW_TRANSITION_TYPE:
                return "ViewTransition";
        }
        if ("object" === typeof type) switch("number" === typeof type.tag && console.error("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), type.$$typeof){
            case REACT_PORTAL_TYPE:
                return "Portal";
            case REACT_CONTEXT_TYPE:
                return type.displayName || "Context";
            case REACT_CONSUMER_TYPE:
                return (type._context.displayName || "Context") + ".Consumer";
            case REACT_FORWARD_REF_TYPE:
                var innerType = type.render;
                type = type.displayName;
                type || (type = innerType.displayName || innerType.name || "", type = "" !== type ? "ForwardRef(" + type + ")" : "ForwardRef");
                return type;
            case REACT_MEMO_TYPE:
                return innerType = type.displayName || null, null !== innerType ? innerType : getComponentNameFromType(type.type) || "Memo";
            case REACT_LAZY_TYPE:
                innerType = type._payload;
                type = type._init;
                try {
                    return getComponentNameFromType(type(innerType));
                } catch (x) {}
        }
        return null;
    }
    function testStringCoercion(value) {
        return "" + value;
    }
    function checkKeyStringCoercion(value) {
        try {
            testStringCoercion(value);
            var JSCompiler_inline_result = !1;
        } catch (e) {
            JSCompiler_inline_result = !0;
        }
        if (JSCompiler_inline_result) {
            JSCompiler_inline_result = console;
            var JSCompiler_temp_const = JSCompiler_inline_result.error;
            var JSCompiler_inline_result$jscomp$0 = "function" === typeof Symbol && Symbol.toStringTag && value[Symbol.toStringTag] || value.constructor.name || "Object";
            JSCompiler_temp_const.call(JSCompiler_inline_result, "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.", JSCompiler_inline_result$jscomp$0);
            return testStringCoercion(value);
        }
    }
    function getTaskName(type) {
        if (type === REACT_FRAGMENT_TYPE) return "<>";
        if ("object" === typeof type && null !== type && type.$$typeof === REACT_LAZY_TYPE) return "<...>";
        try {
            var name = getComponentNameFromType(type);
            return name ? "<" + name + ">" : "<...>";
        } catch (x) {
            return "<...>";
        }
    }
    function getOwner() {
        var dispatcher = ReactSharedInternals.A;
        return null === dispatcher ? null : dispatcher.getOwner();
    }
    function UnknownOwner() {
        return Error("react-stack-top-frame");
    }
    function hasValidKey(config) {
        if (hasOwnProperty.call(config, "key")) {
            var getter = Object.getOwnPropertyDescriptor(config, "key").get;
            if (getter && getter.isReactWarning) return !1;
        }
        return void 0 !== config.key;
    }
    function defineKeyPropWarningGetter(props, displayName) {
        function warnAboutAccessingKey() {
            specialPropKeyWarningShown || (specialPropKeyWarningShown = !0, console.error("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)", displayName));
        }
        warnAboutAccessingKey.isReactWarning = !0;
        Object.defineProperty(props, "key", {
            get: warnAboutAccessingKey,
            configurable: !0
        });
    }
    function elementRefGetterWithDeprecationWarning() {
        var componentName = getComponentNameFromType(this.type);
        didWarnAboutElementRef[componentName] || (didWarnAboutElementRef[componentName] = !0, console.error("Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."));
        componentName = this.props.ref;
        return void 0 !== componentName ? componentName : null;
    }
    function ReactElement(type, key, props, owner, debugStack, debugTask) {
        var refProp = props.ref;
        type = {
            $$typeof: REACT_ELEMENT_TYPE,
            type: type,
            key: key,
            props: props,
            _owner: owner
        };
        null !== (void 0 !== refProp ? refProp : null) ? Object.defineProperty(type, "ref", {
            enumerable: !1,
            get: elementRefGetterWithDeprecationWarning
        }) : Object.defineProperty(type, "ref", {
            enumerable: !1,
            value: null
        });
        type._store = {};
        Object.defineProperty(type._store, "validated", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: 0
        });
        Object.defineProperty(type, "_debugInfo", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: null
        });
        Object.defineProperty(type, "_debugStack", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: debugStack
        });
        Object.defineProperty(type, "_debugTask", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: debugTask
        });
        Object.freeze && (Object.freeze(type.props), Object.freeze(type));
        return type;
    }
    function jsxDEVImpl(type, config, maybeKey, isStaticChildren, debugStack, debugTask) {
        var children = config.children;
        if (void 0 !== children) if (isStaticChildren) if (isArrayImpl(children)) {
            for(isStaticChildren = 0; isStaticChildren < children.length; isStaticChildren++)validateChildKeys(children[isStaticChildren]);
            Object.freeze && Object.freeze(children);
        } else console.error("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
        else validateChildKeys(children);
        if (hasOwnProperty.call(config, "key")) {
            children = getComponentNameFromType(type);
            var keys = Object.keys(config).filter(function(k) {
                return "key" !== k;
            });
            isStaticChildren = 0 < keys.length ? "{key: someKey, " + keys.join(": ..., ") + ": ...}" : "{key: someKey}";
            didWarnAboutKeySpread[children + isStaticChildren] || (keys = 0 < keys.length ? "{" + keys.join(": ..., ") + ": ...}" : "{}", console.error('A props object containing a "key" prop is being spread into JSX:\n  let props = %s;\n  <%s {...props} />\nReact keys must be passed directly to JSX without using spread:\n  let props = %s;\n  <%s key={someKey} {...props} />', isStaticChildren, children, keys, children), didWarnAboutKeySpread[children + isStaticChildren] = !0);
        }
        children = null;
        void 0 !== maybeKey && (checkKeyStringCoercion(maybeKey), children = "" + maybeKey);
        hasValidKey(config) && (checkKeyStringCoercion(config.key), children = "" + config.key);
        if ("key" in config) {
            maybeKey = {};
            for(var propName in config)"key" !== propName && (maybeKey[propName] = config[propName]);
        } else maybeKey = config;
        children && defineKeyPropWarningGetter(maybeKey, "function" === typeof type ? type.displayName || type.name || "Unknown" : type);
        return ReactElement(type, children, maybeKey, getOwner(), debugStack, debugTask);
    }
    function validateChildKeys(node) {
        isValidElement(node) ? node._store && (node._store.validated = 1) : "object" === typeof node && null !== node && node.$$typeof === REACT_LAZY_TYPE && ("fulfilled" === node._payload.status ? isValidElement(node._payload.value) && node._payload.value._store && (node._payload.value._store.validated = 1) : node._store && (node._store.validated = 1));
    }
    function isValidElement(object) {
        return "object" === typeof object && null !== object && object.$$typeof === REACT_ELEMENT_TYPE;
    }
    var React = __turbopack_context__.r("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)"), REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"), REACT_PORTAL_TYPE = Symbol.for("react.portal"), REACT_FRAGMENT_TYPE = Symbol.for("react.fragment"), REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode"), REACT_PROFILER_TYPE = Symbol.for("react.profiler"), REACT_CONSUMER_TYPE = Symbol.for("react.consumer"), REACT_CONTEXT_TYPE = Symbol.for("react.context"), REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref"), REACT_SUSPENSE_TYPE = Symbol.for("react.suspense"), REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list"), REACT_MEMO_TYPE = Symbol.for("react.memo"), REACT_LAZY_TYPE = Symbol.for("react.lazy"), REACT_ACTIVITY_TYPE = Symbol.for("react.activity"), REACT_VIEW_TRANSITION_TYPE = Symbol.for("react.view_transition"), REACT_CLIENT_REFERENCE = Symbol.for("react.client.reference"), ReactSharedInternals = React.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, hasOwnProperty = Object.prototype.hasOwnProperty, isArrayImpl = Array.isArray, createTask = console.createTask ? console.createTask : function() {
        return null;
    };
    React = {
        react_stack_bottom_frame: function(callStackForError) {
            return callStackForError();
        }
    };
    var specialPropKeyWarningShown;
    var didWarnAboutElementRef = {};
    var unknownOwnerDebugStack = React.react_stack_bottom_frame.bind(React, UnknownOwner)();
    var unknownOwnerDebugTask = createTask(getTaskName(UnknownOwner));
    var didWarnAboutKeySpread = {};
    exports.Fragment = REACT_FRAGMENT_TYPE;
    exports.jsxDEV = function(type, config, maybeKey, isStaticChildren) {
        var trackActualOwner = 1e4 > ReactSharedInternals.recentlyCreatedOwnerStacks++;
        if (trackActualOwner) {
            var previousStackTraceLimit = Error.stackTraceLimit;
            Error.stackTraceLimit = 10;
            var debugStackDEV = Error("react-stack-top-frame");
            Error.stackTraceLimit = previousStackTraceLimit;
        } else debugStackDEV = unknownOwnerDebugStack;
        return jsxDEVImpl(type, config, maybeKey, isStaticChildren, debugStackDEV, trackActualOwner ? createTask(getTaskName(type)) : unknownOwnerDebugTask);
    };
}();
}),
"[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
'use strict';
if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
else {
    module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/compiled/react/cjs/react-jsx-dev-runtime.development.js [app-client] (ecmascript)");
}
}),
]);

//# sourceMappingURL=_0hmy308._.js.map