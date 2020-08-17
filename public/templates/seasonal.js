const seasonalTemplates = [
  // {
  //   button: `Balance Notifications`,
  //   text: ,
  // },
];

if (seasonalTemplates.length === 0) {
  document.getElementById('seasonal-container').style.display = 'none';
}

seasonalTemplates.forEach(function (template, i) {
  templates.push({
    title: template.button,
    addFooter: true,
    content: template.text,
  });

  document.getElementById('seasonal-buttons').insertAdjacentHTML(
    `beforeend`,
    `<button class="gg-c-btn" data-title="${template.button}">
    <span class="gg-c-btn__switch">${template.button}</span>
  </button>`
  );
});
