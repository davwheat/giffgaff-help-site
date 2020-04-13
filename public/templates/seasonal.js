const seasonalTemplates = [
  {
    button: "COVID-19 roaming",
    text: `giffgaff agents are handling EU Roaming extensions for those stuck abroad on a case-by-case basis.

If you contact an agent, they'll likely extend the roaming until the end of June at no extra charge.

You can contact a giffgaff agent at this link: https://support2.giffgaff.com/app/ask/International-and-Roaming/Using-a-goodybag-while-in-the-EU-%28Roam-Like-at-Home%29/form

Agents always aim to respond within 24 hours (in some busy periods it can take up to 48 hours). It usually only takes 3-5 hours. Agents work everyday between 8 am and 11 pm.

When you get a response, you will receive a text and email alert telling you. You can view the response either from the bottom of your giffgaff dashboard, or by clicking this link: https://www.giffgaff.com/support/questions`,
  },
  {
    button: "COVID-19 NHS Worker",
    text: `Firstly, I'd like to thank you for all the work that you do.

You'll need to contact a giffgaff agent. They'll put you onto an £8 goodybag for now (2 GB data). This situation could change in the future as giffgaff are working with the UK government to get a list of NHS workers to provide free usage to but, until then, they have to be careful to make sure that they aren't giving away free data to all their members.

You can contact a giffgaff agent at this link: https://support2.giffgaff.com/app/ask/International-and-Roaming/Using-a-goodybag-while-in-the-EU-%28Roam-Like-at-Home%29/form

Agents always aim to respond within 24 hours (in some busy periods it can take up to 48 hours). It usually only takes 3-5 hours. Agents work everyday between 8 am and 11 pm.

When you get a response, you will receive a text and email alert telling you. You can view the response either from the bottom of your giffgaff dashboard, or by clicking this link: https://www.giffgaff.com/support/questions`,
  },
];

seasonalTemplates.forEach((template, i) => {
  templates.push({
    title: template.button,
    addFooter: true,
    content: template.text,
  });

  document.getElementById("seasonal-buttons").insertAdjacentHTML(
    `beforeend`,
    `<button class="gg-c-btn" data-title="${template.button}">
    <span class="gg-c-btn__switch">${template.button}</span>
  </button>`
  );
});
