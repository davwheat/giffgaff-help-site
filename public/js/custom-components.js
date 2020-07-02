const menuItems = [
  {
    title: 'Handy Guides',
    link: '/kb',
    items: [{ link: '/kb#roaming', title: 'Roaming with giffgaff' }],
  },
  {
    title: 'Bits and bobs',
    link: '/bits-and-bobs',
    items: [
      {
        link: '/bits-and-bobs/number-checker',
        title: 'Number pricing calculator',
      },
    ],
  },
];

class ggHeader extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
<nav>
<ul class="gg-c-skip-links">
<li>
<a
class="gg-c-skip-links__link gg-u-screen-reader-only"
href="#main-content"
>Skip to main content</a
>
</li>
</ul>
</nav>
<header class="gg-c-website-header">
<div class="gg-c-website-header__bar">
<a class="gg-c-website-header__logo" href="/">
<svg
viewBox="0 0 256 56"
height="56px"
xmlns="http://www.w3.org/2000/svg"
>
<title>giffgaff community</title>
<path d="M0 0h256v56H0z" />
<path fill="none" stroke="#fff" stroke-miterlimit="10" d="M98 0v56" />
<path
fill="#fff"
d="M83.8 17a9.2 9.2 0 00-1.1 0 6.7 6.7 0 00-3.6.8 4.6 4.6 0 00-2 4.2v.4h-4.4V22c0-1.5.8-2.2 2.6-2.2h.7v-2.8a8.6 8.6 0 00-1.2-.1 6.4 6.4 0 00-3.4.8 4.4 4.4 0 00-2 4.2v11H67c-.4 0-.6-.2-.6-.6v-5c0-3.6-2-5.4-5.8-5.4a7.8 7.8 0 00-3 .5 2.4 2.4 0 00-2 2.3v1.4h3v-.7c0-.3.3-.6.8-.7a2.5 2.5 0 011-.2 2.6 2.6 0 012 .6 3 3 0 01.6 2v.2h-.4a14.5 14.5 0 00-4.9.7c-2 .7-3 2-3 3.8A3.7 3.7 0 0056 35a4.8 4.8 0 003.2 1 4.5 4.5 0 003.2-1 4.1 4.1 0 00.9-1.2v.6a1.4 1.4 0 00.4 1 1.7 1.7 0 001.3.5h7.6V25h4.5v10.7h3.3V25.1h3v-2.8h-3v-.2c0-1.5.8-2.3 2.6-2.3l.7.1zM62.6 29.8h.6v.3a3.4 3.4 0 01-.9 2.3 2.7 2.7 0 01-2.1 1.2 2.2 2.2 0 01-1.6-.5 1.8 1.8 0 01-.5-1.2q0-2.2 4.5-2.2M49.7 23.6v.4a3 3 0 00-.9-1 5 5 0 00-3.2-1 5.5 5.5 0 00-4.5 2 7.2 7.2 0 00-1.5 4.8 7.2 7.2 0 001.6 4.8 5.5 5.5 0 004.4 2 4.5 4.5 0 003.8-1.8v1.4a3 3 0 01-1.1 2.6 4.3 4.3 0 01-2.7.7A8.4 8.4 0 0143 38l-1-.5-1 2.7a10.6 10.6 0 004.7 1.2 8 8 0 005-1.5 5.7 5.7 0 002.1-4.9v-9.2c0-.4.2-.6.6-.6h1v-2.8h-3.1a1.5 1.5 0 00-1.1.4 1.1 1.1 0 00-.4.8m-6 2.3a2.9 2.9 0 012.3-1c2.3 0 3.4 1.3 3.4 3.9a4.5 4.5 0 01-1 3.1 3.2 3.2 0 01-4.7-.4 4.6 4.6 0 01-.9-2.9 4.2 4.2 0 01.9-2.7M39.1 25v-2.6h-3V22c0-1.5 1-2.3 2.7-2.3h.7V17a9.2 9.2 0 00-1.2 0 7 7 0 00-3.5.8 4.6 4.6 0 00-2 4.2v.4h-4.4V22c0-1.5.8-2.2 2.6-2.2h.7V17a10 10 0 00-1.2 0 6.8 6.8 0 00-3.4.8A4.5 4.5 0 0025 22v11h-2.5c-.4 0-.5-.2-.5-.6v-8.3a1.8 1.8 0 00-.5-1.4 1.8 1.8 0 00-1.3-.3H14a1.6 1.6 0 00-1.1.4 1.1 1.1 0 00-.3.8.4.4 0 000 .3h-.1a3.7 3.7 0 00-1-1 5.5 5.5 0 00-3.1-.9 5.5 5.5 0 00-4.5 2 7.4 7.4 0 00-1.5 4.7A7.8 7.8 0 004 33.5a5.5 5.5 0 004.5 2 4.3 4.3 0 003.7-1.7v1.3a3 3 0 01-1.1 2.6 4.5 4.5 0 01-2.7.8 8.3 8.3 0 01-2.6-.5l-1.1-.5-1 2.7a10.7 10.7 0 004.8 1.2 8 8 0 004.8-1.5 5.8 5.8 0 002.3-4.9v-9.3c0-.3.2-.5.5-.5h2c.4 0 .5.2.5.6V34a1.8 1.8 0 00.5 1.4 1.6 1.6 0 001.3.4h8V25h4.4v10.8h3.4V25zm-32.5.9a3 3 0 012.4-1c2.2 0 3.3 1.3 3.3 3.9a4.4 4.4 0 01-1 3.2 3 3 0 01-2.2.8 3 3 0 01-2.4-1.2 4.6 4.6 0 01-1-3 4.1 4.1 0 01.9-2.7"
/>
<path fill="#fff" d="M18.6 17H22v3.4h-3.4z" />
<text x="110" y="34" fill="#fff" font-size="20px">
unofficial help
</text>
</svg>
</a>

<button type="button" class="gg-c-website-header__sm-nav-trigger">
<span class="gg-c-website-header__sm-nav-trigger-icon"></span
><span class="gg-u-screen-reader-only">Menu</span>
</button>

<nav class="gg-c-website-header__lrg-screen-nav">
<ul class="gg-c-website-header__lrg-screen-list">
${menuItems
  .map(
    (items) =>
      `
<li class="gg-c-website-header__lrg-screen-item">
<a href="${items.link}" class="gg-c-website-header__lrg-screen-link">
<span>${items.title}</span>
</a>
<div class="gg-c-website-header__lrg-screen-menu">
<div class="gg-c-website-header__lrg-screen-menu-content">
  <ul class="website-header-large-screen__major-menu">
  ${items.items
    .map(
      (item) =>
        `<li>
      <a
        href="${item.link}"
        class="website-header-large-screen__link"
        >${item.title}</a
      >
    </li>`
    )
    .join('')}
  </ul>
</div>
</div>
</li>`
  )
  .join('')}
</ul>
</nav>


</div>

<nav class="gg-c-website-header__sm-screen-nav">
<ul>      
${menuItems
  .map(
    (items) => `
<li class="gg-c-website-header__sm-screen-item">
<details class="gg-c-website-header__sm-screen-accordion">
<summary class="gg-c-website-header__sm-screen-category">
<span class="gg-c-website-header__sm-screen-category-icon"></span>
${items.title}
</summary>
<ul class="gg-c-website-header__sm-screen-sub-menu">      
${items.items
  .map(
    (item) =>
      `
<li class="gg-c-website-header__sm-screen-sub-menu-item">
<a
  href="${item.link}"
  class="gg-c-website-header__sm-screen-sub-menu-link"
  >${item.title}</a
>
</li>`
  )
  .join('')}        
</ul>
</details>
</li>`
  )
  .join('')}

</ul>
</nav>
</header>
<section id="unofficial">
<div class="gg-o-page-section">
<strong>Please note:</strong> this website is run by a member of the giffgaff community and is not to be confused with <a class="gg-u-link" href="https://giffgaff.com/" target="_blank" rel="noreferer noopener">giffgaff.com</a>
</div>
</section>
`;
  }
}

class ggFooter extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
<footer class="gg-t-black">
<div class="gg-o-page-section">
<p class="gg-u-text-speak">
This page is run by a member of the giffgaff community and does not
represent the views or opinions of giffgaff Limited, or its staff
</p>
<a href="https://bit.ly/giffgaffmrjeeves" title="Get a giffgaff SIM with £5 free credit" target="_blank" rel="noopener noreferer">
<picture class="gg-b128-n256-r512">
<source media="(min-width: 728px)" srcset="/img/gg-img/aff-large.png">
<source media="(min-width: 550px and max-width: 727px)" srcset="/img/gg-img/aff-med.png">
<source media="(max-width: 549px)" srcset="/img/gg-img/aff-small.png">
<img src="/img/gg-img/aff-large.png" alt="Get 80 gigabytes data for just £20 per month.">
</picture>
</a>
</div>
</footer>
`;

    (function () {
      const websiteHeader = document.querySelector('.gg-c-website-header');
      const smNavTrigger = websiteHeader.querySelector('.gg-c-website-header__sm-nav-trigger');
      const smNav = websiteHeader.querySelector('.gg-c-website-header__sm-screen-nav');

      smNavTrigger.onclick = function () {
        smNavTrigger.classList.toggle('gg-c-website-header__sm-nav-trigger--active');
        smNav.classList.toggle('gg-c-website-header__sm-screen-nav--open');
      };
    })();
  }
}

window.customElements.define('gg-header', ggHeader);
window.customElements.define('gg-footer', ggFooter);
