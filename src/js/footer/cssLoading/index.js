const style = document.createElement("style");

style.innerHTML = `
  .inherit-color * {color: inherit;}
  *[tabindex]:focus-visible, input[type="file"]:focus-visible {outline: 0.125rem solid #4d65ff; outline-offset: 0.125rem;}
  .w-richtext > :not(div):first-child, .w-richtext > div:first-child > :first-child {margin-top: 0 !important; padding-top: 0 !important;}
  .w-richtext >:last-child, .w-richtext ol li:last-child, .w-richtext ul li:last-child {margin-bottom: 0 !important;}
  .pointer-events-off {pointer-events: none;}
  .pointer-events-on {pointer-events: auto;}
  .div-square::after {content: ""; display: block; padding-bottom: 100%;}
  .container-medium, .container-small, .container-large {margin-right: auto !important; margin-left: auto !important;}
  .text-style-3lines {display: -webkit-box; overflow: hidden; -webkit-line-clamp: 3; -webkit-box-orient: vertical;}
  .text-style-2lines {display: -webkit-box; overflow: hidden; -webkit-line-clamp: 2; -webkit-box-orient: vertical;}
  .display-inlineflex {display: inline-flex;}
  .hide {display: none !important;}
  @media screen and (max-width: 991px) {.hide, .hide-tablet {display: none !important;}}
  @media screen and (max-width: 767px) {.disclaimer-visible .max-width-medium.max-width-full-mobile-landscape {max-width: none; margin-bottom: 1.5rem;} .hide-mobile-landscape {display: none !important;}}
  @media screen and (max-width: 479px) {.hide-mobile {display: none !important;}}
  .margin-0 {margin: 0rem !important;}
  .padding-0 {padding: 0rem !important;}
  .spacing-clean {padding: 0rem !important; margin: 0rem !important;}
  .margin-top {margin-right: 0rem !important; margin-bottom: 0rem !important; margin-left: 0rem !important;}
  .padding-top {padding-right: 0rem !important; padding-bottom: 0rem !important; padding-left: 0rem !important;}
  .margin-right {margin-top: 0rem !important; margin-bottom: 0rem !important; margin-left: 0rem !important;}
  .padding-right {padding-top: 0rem !important; padding-bottom: 0rem !important; padding-left: 0rem !important;}
  .margin-bottom {margin-top: 0rem !important; margin-right: 0rem !important; margin-left: 0rem !important;}
  .padding-bottom {padding-top: 0rem !important; padding-right: 0rem !important; padding-left: 0rem !important;}
  .margin-left {margin-top: 0rem !important; margin-right: 0rem !important; margin-bottom: 0rem !important;}
  .padding-left {padding-top: 0rem !important; padding-right: 0rem !important; padding-bottom: 0rem !important;}
  .margin-horizontal {margin-top: 0rem !important; margin-bottom: 0rem !important;}
  .padding-horizontal {padding-top: 0rem !important; padding-bottom: 0rem !important;}
  .margin-vertical {margin-right: 0rem !important; margin-left: 0rem !important;}
  .padding-vertical {padding-right: 0rem !important; padding-left: 0rem !important;}
  .truncate-width {width: 100%; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;}
  .no-scrollbar {-ms-overflow-style: none; overflow: -moz-scrollbars-none;}
  .no-scrollbar::-webkit-scrollbar {display: none;}
  .accordion_dropdown.is-active-accordion, .tab-dropdown.is-active-accordion {background: var(--background-color--background-alternate);}
  .accordion_dropdown.is-white.is-active-accordion {background: rgba(0, 0, 0, 0.00);}
  .accordion_arrow.is-active-accordion {transform: rotate(180deg);}
  .help_tab.fs-cmsfilter_active {color: var(--text-color--text-primary); border-bottom: 2px solid var(--border-color--border-primary);}
  .w-slider-dot {width: 0.5rem; height: 0.5rem; background: #4146528F;}
  .w-slider-dot.w-active {background: var(--base-color-neutral--black);}
  .blog-filters_button.fs-cmsfilter_active {background: var(--base-color-neutral--black); color: var(--text-color--text-alternate); border-color: var(--border-color--border-primary);}
  @media screen and (min-width: 992px) {.blogs_link-block:hover .blogs_image {transform: scale(1.07);}}
  .partner-navbar_component .w-nav-link.w--current {color: #e12e3a;}
  .customLink {color: #ff444f !important;}
  .content_market-text {display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;}
  .contact-social_link-wp:hover .is-hover, .contact-social_link-live:hover .is-hover {display: block;}
  .contact-social_link-wp:hover .is-normal, .contact-social_link-live:hover .is-normal {display: none;}
  input, textarea, [contenteditable] {caret-color: #000000B8;}
  .floating-label {pointer-events: none;}
  .custom-input:not(:placeholder-shown) {padding-top: 1.5rem; padding-bottom: .5rem;}
  .custom-input:not(:placeholder-shown) ~ .floating-label {color: #6002ee; top: .5rem; font-size: 12px;}
  .custom-input:not(:focus) ~ .floating-label {color: rgba(0, 0, 0, .6);}
  .custom-input {position: absolute; width: 100%; height: 100%; border-radius: 8px; margin-bottom: 0px; padding: 1rem 0.70rem; border: 1px solid #00000014; box-shadow: none; transition-property: background-color, border-color, border-width; transition-duration: 150ms, 150ms, 0ms; transition-timing-function: ease, ease, ease; font-size: 1rem; background-color: rgb(0 0 0 / 0%);}
  .text-input.custom {height: 56px;}
  .custom-input.-wfp-focus, :where(html:not(.wf-design-mode)) .custom-input:focus {border-bottom-width: 2px; border-bottom-color: rgba(0, 0, 0, 0.08); background-color: rgb(0 0 0 / 0%); box-shadow: none;}
  .w-input:focus, .w-select:focus {outline: 0; border: 1px solid var(--core-color-solid-slate-1400, #000);}
  .w-input, .w-select {color: #000000B8;}
  .custom-input:not(:placeholder-shown) + .floating-label {color: #000000B8;}
  input, textarea, [contenteditable] {caret-color: #000000B8;}
  .custom-input:not(:placeholder-shown) + .floating-label {color: #000000B8;}
  .with-asterisk:after {content: "*"; color: #C40000; margin-left: 3px;}
  .custom-input.error-field:not(:focus) + .floating-label {color: #de0040;}
  .custom-input.error-field {border-color: #de0040;}
  .input-error-text.error-field {display: block; padding-top: 4px; padding-left: var(--16-px); color: #de0040;}
  .error-field-icon.error-field {position: absolute; width: 24px; inset: 0% 2% 0% auto; display: block;}
  .error-field-icon {display: none;}
  .input-error-text {display: none;}
  .error-message {color: rgba(230, 25, 14, 0.72) !important; font-size: 12px; margin-top: 4px;}
  .logged-out-btn.hide-element {display: none !important;}
  .logged-in-btn.hide-element {display: none !important;}
  .section_ctrader-check-email.hide-element {display: none !important;}
  .section_ctrader-check-email-verify.hide-element {display: none !important;}
  .section_page-header_dint-get-email.hide-element {display: none !important;}
  .rangeslider_handle:focus {outline: none !important;}
  .contact-social_link-wp:hover .is-hover, .contact-social_link-live:hover .is-hover {display: block;}
  .contact-social_link-wp:hover .is-normal, .contact-social_link-live:hover .is-normal {display: none;}
  .margin-bottom-md {  margin-bottom: 1.5rem !important;}
  .padding-bottom-md {padding-bottom: 1.5rem !important;}
  .margin-bottom-lg {margin-bottom: 3rem !important;}
  .padding-bottom-lg {padding-bottom: 3rem !important;}
  .margin-bottom-xl {margin-bottom: 6rem !important;}
  .padding-bottom-xl {padding-bottom: 6rem !important;}
  .margin-bottom-2xl {margin-bottom: 9rem !important;}
  .padding-bottom-2xl {padding-bottom: 9rem !important;}
  .w-condition-invisible {display: none !important;}
  .bypass-ignore-css {position: absolute; top: -1000000px;}
  @media screen and (min-width: 992px) {.blogs_link-block:hover .blogs_image {transform: scale(1.07);}}
  .accordion-content-wrap.-active .accordion-content-inner-wrap {padding-top: 0px;}
  .accordion_dropdown.is-active-accordion, .tab-dropdown.is-active-accordion {background: var(--background-color--background-alternate);}
  .accordion_dropdown.is-white.is-active-accordion {background: rgba(0, 0, 0, 0.00);}
  .accordion_arrow.is-active-accordion {transform: rotate(180deg);}
  .w-richtext h4, .w-richtext h5, .w-richtext h6 {margin-top: 1rem; margin-bottom: 0.75rem;}
  .display-inlineflex {display: inline-flex;}
  .container-medium, .container-small, .container-large {margin-right: auto !important; margin-left: auto !important;}
  .w-richtext p {margin-bottom: 1rem;}
  .w-richtext p:last-child {margin-bottom: 0;}
  .inherit-color * {color: inherit;}
  .hide, .hide-tablet, .hide-mobile, .hide-mobile-landscape {display: none !important;}
  @media screen and (max-width: 991px) {.hide-tablet {display: none !important;}}
  @media screen and (max-width: 767px) {.hide-mobile {display: none !important;}}
  @media screen and (max-width: 479px) {.hide-mobile-landscape {display: none !important;}}
  .truncate-width {width: 100%; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;}
  .customLink {color: #ff444f !important;}
  .accordion_dropdown.is-active-accordion, .tab-dropdown.is-active-accordion {background: var(--background-color--background-alternate);}
  .accordion_dropdown.is-white.is-active-accordion {background: rgba(0, 0, 0, 0.00);}
  .accordion_arrow.is-active-accordion {transform: rotate(180deg);}
  .help_tab.fs-cmsfilter_active {color: var(--text-color--text-primary); border-bottom: 2px solid var(--border-color--border-primary);}
  .w-slider-dot {width: 0.5rem; height: 0.5rem; background: #4146528F;}
  .w-slider-dot.w-active {background: var(--base-color-neutral--black);}
  .blog-filters_button.fs-cmsfilter_active {background: var(--base-color-neutral--black); color: var(--text-color--text-alternate); border-color: var(--border-color--border-primary);}
  .text-style-3lines {display: -webkit-box; overflow: hidden; -webkit-line-clamp: 3; -webkit-box-orient: vertical;}
  .text-style-2lines {display: -webkit-box; overflow: hidden; -webkit-line-clamp: 2; -webkit-box-orient: vertical;}
  .accordion_dropdown.is-active-accordion, .tab-dropdown.is-active-accordion {background: var(--background-color--background-alternate);}
  .accordion_dropdown.is-white.is-active-accordion {background: rgba(0, 0, 0, 0.00);}
  .accordion_arrow.is-active-accordion {transform: rotate(180deg);}
`;
document.head.appendChild(style);

const style2 = document.createElement("style");
style2.innerHTML = `
  .text-style-2lines, .text-style-3lines { display: -webkit-box; overflow: hidden; }
  .margin-bottom, .margin-horizontal, .margin-left, .margin-right { margin-top: 0 !important; }
  .margin-horizontal, .margin-left, .margin-right, .margin-top, 
  .w-richtext ol li:last-child, .w-richtext ul li:last-child, 
  .w-richtext > :last-child { margin-bottom: 0 !important; }
  .padding-bottom, .padding-horizontal, .padding-left, .padding-right { padding-top: 0 !important; }
  .padding-horizontal, .padding-left, .padding-right, .padding-top { padding-bottom: 0 !important; }
  .padding-bottom, .padding-left, .padding-top, .padding-vertical { padding-right: 0 !important; }
  .padding-bottom, .padding-right, .padding-top, .padding-vertical { padding-left: 0 !important; }
  [tabindex]:focus-visible, input[type=file]:focus-visible { outline: #4d65ff solid 0.125rem; outline-offset: 0.125rem; }
  .w-richtext > :not(div):first-child, .w-richtext > div:first-child > :first-child { margin-top: 0 !important; padding-top: 0 !important; }
  .floating-label, .pointer-events-off { pointer-events: none; }
  .pointer-events-on { pointer-events: auto; }
  .div-square::after { content: ""; display: block; padding-bottom: 100%; }
  .padding-0, .page-wrapper.nopad, .spacing-clean { padding: 0 !important; }
  .container-large, .container-medium, .container-small { margin-right: auto !important; margin-left: auto !important; }
  .margin-bottom, .margin-left, .margin-top, .margin-vertical { margin-right: 0 !important; }
  .margin-0, .spacing-clean { margin: 0 !important; }
  .margin-bottom, .margin-right, .margin-top, .margin-vertical { margin-left: 0 !important; }
  .text-style-3lines { -webkit-line-clamp: 3; -webkit-box-orient: vertical; }
  .content_market-text, .text-style-2lines { -webkit-line-clamp: 2; -webkit-box-orient: vertical; }
  .display-inlineflex { display: inline-flex; }
  .hide, .logged-in-btn.hide-element, .logged-out-btn.hide-element, 
  .section_ctrader-check-email-verify.hide-element, .section_ctrader-check-email.hide-element, 
  .section_page-header_dint-get-email.hide-element { display: none !important; }
  @media screen and (max-width: 991px) { .hide, .hide-tablet { display: none !important; } }
  @media screen and (max-width: 767px) { 
    .disclaimer-visible .max-width-medium.max-width-full-mobile-landscape { max-width: none; margin-bottom: 1.5rem; }
    .hide-mobile-landscape { display: none !important; } 
  }
  @media screen and (max-width: 479px) { .hide-mobile { display: none !important; } }
  .truncate-width { width: 100%; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .no-scrollbar { -ms-overflow-style: none; overflow: -moz-scrollbars-none; }
  .no-scrollbar::-webkit-scrollbar { display: none; }
  .accordion_dropdown.is-active-accordion, .tab-dropdown.is-active-accordion { background: var(--background-color--background-alternate); }
  .blog-filters_button.fs-cmsfilter_active, .w-slider-dot.w-active { background: var(--base-color-neutral--black); }
  .accordion_dropdown.is-white.is-active-accordion { background: rgba(0, 0, 0, 0); }
  .accordion_arrow.is-active-accordion { transform: rotate(180deg); }
  .help_tab.fs-cmsfilter_active { color: var(--text-color--text-primary); border-bottom: 2px solid var(--border-color--border-primary); }
  .w-slider-dot { width: 0.5rem; height: 0.5rem; background: #4146528F; }
  .blog-filters_button.fs-cmsfilter_active { color: var(--text-color--text-alternate); border-color: var(--border-color--border-primary); }
  @media screen and (min-width: 992px) { .blogs_link-block:hover .blogs_image { transform: scale(1.07); } }
  .partner-navbar_component .w-nav-link.w--current { color: #e12e3a; }
  .customLink { color: #ff444f !important; }
  .content_market-text { display: -webkit-box; }
  .custom-input:not(:placeholder-shown) { padding-top: 1.5rem; padding-bottom: 0.5rem; }
  .custom-input:not(:placeholder-shown) ~ .floating-label { color: #6002ee; top: 0.5rem; font-size: 12px; }
  .custom-input:not(:focus) ~ .floating-label { color: rgba(0, 0, 0, 0.6); }
  .custom-input { position: absolute; width: 100%; height: 100%; border-radius: 8px; margin-bottom: 0; padding: 1rem 0.7rem; border: 1px solid #00000014; box-shadow: none; transition-property: background-color, border-color, border-width; transition-duration: 150ms, 150ms, 0s; transition-timing-function: ease, ease, ease; font-size: 1rem; background-color: rgb(0 0 0 / 0%); }
  .text-input.custom { height: 56px; }
  .custom-input.-wfp-focus, :where(html:not(.wf-design-mode)) .custom-input:focus { border-bottom-width: 2px; border-bottom-color: rgba(0, 0, 0, 0.08); background-color: rgb(0 0 0 / 0%); box-shadow: none; }
  .w-input:focus, .w-select:focus { outline: 0; border: 1px solid var(--core-color-solid-slate-1400, #000); }
  .custom-input:not(:placeholder-shown) + .floating-label, .prime-form-group .custom-input:not(:placeholder-shown) ~ .floating-label, .w-input, .w-select { color: #000000B8; }
  [contenteditable], input, textarea { caret-color: #000000B8; }
  .with-asterisk:after { content: "*"; color: #c40000; margin-left: 3px; }
  .custom-input.error-field:not(:focus) + .floating-label { color: #de0040; }
  .custom-input.error-field, .sn_form input.error-field-block:focus { border-color: #de0040; }
  .input-error-text.error-field { display: block; padding-top: 4px; padding-left: var(--16-px); color: #de0040; }
  .error-field-icon.error-field { position: absolute; width: 24px; inset: 0% 2% 0% auto; display: block; }
  .contact-social_link-live:hover .is-normal, .contact-social_link-wp:hover .is-normal, .error-field-icon, .input-error-text { display: none; }
  .error-message { color: rgba(230, 25, 14, 0.72) !important; font-size: 12px; margin-top: 4px; }
  .rangeslider_handle:focus { outline: 0 !important; }
  .contact-social_link-live:hover .is-hover, .contact-social_link-wp:hover .is-hover, 
  .dropdown-component.open .dropdown-component_list, .error-field-icon.error-field-block, 
  .foot .banner_disclaimer.hide-element, .navbar_accordion-trigger.current:before, 
  .navbar_accordion-trigger.open:before { display: block; }
  .margin-bottom-md { margin-bottom: 0.2rem !important; }
  input.error-field::placeholder { color: red !important; }
  .disclaimer-active .header_background-image-wrapper { top: 5%; }
  @media screen and (max-width: 430px) { .disclaimer-active .header_background-image-wrapper { top: 10%; } }
  .error-field-block { border: 1px solid #de0040; }
  .input-error-text.error-field-block { display: block; border: none; }
  .sn_form img#email-sign-up-error-icon { width: 24px; border: none; position: absolute; top: 14px; height: 25px; right: 9px; }
  .footer_logo svg { max-width: 72px; }
  span#translationsspan#translations-customerssay { font-family: IBM Plex Sans, sans-serif; font-size: 16px; line-height: 24px; color: red; }
.navbar_icon { transition: transform 0.3s; }
.navbar_accordion-content { transition: max-height 0.3s, padding 0.3s, transform 0.3s; transform: translateY(-20px); }
.navbar_accordion-trigger:before { display: none; content: ""; position: absolute; left: 0; top: 0; width: 4px; height: 44px; background: #ff444f; }
.navbar_accordion-trigger.open svg { transform: rotate(180deg); transition: 0.5s ease-in-out; }
@media (max-width: 479px) { .disclaimer-active .header_background-image-wrapper { top: 5%; } }
@media (min-width: 480px) and (max-width: 610px) { .disclaimer-active .header_background-image-wrapper { top: 15%; } }
@media (min-width: 611px) and (max-width: 767px) { .disclaimer-active .header_background-image-wrapper { top: 12%; } }
@media (min-width: 768px) { .disclaimer-active .header_background-image-wrapper { top: 7%; } }
select { -webkit-appearance: none; -moz-appearance: none; }
::-ms-reveal { display: none; }
.disclaimer-show .menu-wrapper { height: 80px; }
.trustpilot-widget a[rel~=noopener] { visibility: hidden; }
.new-navbar_component .new-navbar_container > .new-navbar_menu { transform: none !important; }
.input-group .error-field-icon.error-field, .prime-form-group .error-field-icon.error-field { top: 16px; }
.dir-ltr { direction: ltr; text-align: left; }
.new-navbar_menu.is-padding-0.is-adaptive:lang(ar) { margin-right: 0; }
:dir(rtl) .navbar_accordion-trigger:before { left: auto; right: 0; }
:dir(rtl) .error-field-icon.error-field, :dir(rtl) .sn_form img#email-sign-up-error-icon { left: 8px; right: auto; }
:dir(rtl) input#mobile-number { text-align: right; }
a#profile-link:focus { outline: 0; }
@media (max-width: 768px) { .blog-filters .w-dropdown { display: contents; } }
.show-cookie .cookie-middle-wrapper { margin-bottom: 85px; }
.show-cookie .cookie-middle-wrapper:lang(de), .show-cookie .cookie-middle-wrapper:lang(fr), .show-cookie .cookie-middle-wrapper:lang(ru) { margin-bottom: 106px; }
@media (max-width: 1025px) { .disclaimer_wrapper { display: none; } .disclaimer_wrapper.head, .head .banner_disclaimer.hide-element { display: block; } .show-cookie .cookie-middle-wrapper { margin-left: 45px; margin-bottom: 20px; } .show-cookie .cookie-middle-wrapper:lang(ar) { margin-right: 45px; } }
@media (max-width: 478px) { .show-cookie .cookie-middle-wrapper { margin-bottom: 0; margin-left: 0; } }
@media (min-width: 1025px) { .disclaimer-visible #live_chat-wrapper, .disclaimer-visible .contact-social_links-wrapper { bottom: 6rem; } .disclaimer-visible #live_chat-wrapper:lang(de), .disclaimer-visible #live_chat-wrapper:lang(fr), .disclaimer-visible #live_chat-wrapper:lang(ru) { bottom: 8rem; } .disclaimer-visible .footer_texts { padding-bottom: 70px; } }
.cookies_banner-wrapper { box-shadow: 0 0 8px rgba(0, 0, 0, 0.2); -webkit-box-shadow: 0 0 8px rgba(0, 0, 0, 0.2); }
.show-cookie div#floating_cta { display: none; }
.show-cookie .footer_bottom-wrapper { margin-bottom: 128px; }
@media (max-width: 430px) { .show-cookie .cookie-middle-wrapper:lang(de), .show-cookie .cookie-middle-wrapper:lang(fr), .show-cookie .cookie-middle-wrapper:lang(ru) { margin-bottom: 0; } .show-cookie a.social-proof_link { z-index: -1; } .show-cookie .cookie-middle-wrapper:lang(ar) { margin-right: 0; } .show-cookie .contact-social_links-wrapper.is-whatsapp { bottom: 10.5rem; } .show-cookie .contact-social_links-wrapper.is-whatsapp:lang(bn), .show-cookie .contact-social_links-wrapper.is-whatsapp:lang(fr), .show-cookie .contact-social_links-wrapper.is-whatsapp:lang(it), .show-cookie .contact-social_links-wrapper.is-whatsapp:lang(pl), .show-cookie .contact-social_links-wrapper.is-whatsapp:lang(pt), .show-cookie .contact-social_links-wrapper.is-whatsapp:lang(tr), .show-cookie .contact-social_links-wrapper.is-whatsapp:lang(vi) { bottom: 12.5rem; } .show-cookie .contact-social_links-wrapper.is-whatsapp:lang(de), .show-cookie .contact-social_links-wrapper.is-whatsapp:lang(ru) { bottom: 13.5rem; } }
.new-navbar_main-wrapper .logo-wrapper-25 { padding-top: 4px; }
.form-group-wrapper.custom { transform: none !important; transform-style: unset !important; }
.dropdown-component:after { content: "▼"; position: absolute; right: 10px; top: 50%; transform: translateY(-50%); font-size: 10px; color: #333; pointer-events: none; }
:root { --container-xlarge-width: 77rem; --overflowMargin: calc((100vw - var(--container-xlarge-width)) / 2); }
.testimonial_list.is-custom-margin { margin-left: var(--overflowMargin); }
.is-custom-margin .testimonial-item.w-dyn-item:last-child { margin-right: var(--overflowMargin); }
.dropdown-component_content-block { margin-top: 20px; }
.overflow-word a { overflow-wrap: break-word; }
a.deriv-tech-header_tablet-link.is-overlay:after { content: ""; z-index: -1; opacity: 0.4; background-image: linear-gradient(181.93deg, #11141b00 3.15%, #11141b 50.01%); height: 71%; position: absolute; inset: auto 0% 0%; }
`;
document.head.appendChild(style2);
