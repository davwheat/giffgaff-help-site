const seasonalTemplates = [
  {
    button: "COVID-19 roaming",
    text: `Because of COVID-19, giffgaff are extending the time you can use goodybags in the EU for. Agents are handling EU Roaming extensions for those stuck abroad on a case-by-case basis.

If you contact an agent, they'll see if they can extend the roaming at no extra charge to help you out.

You can contact a giffgaff agent at this link: https://support2.giffgaff.com/app/ask/International-and-Roaming/Using-a-goodybag-while-in-the-EU-%28Roam-Like-at-Home%29/form

Agents always aim to respond within 24 hours (in some busy periods it can take up to 48 hours). It usually only takes 3-5 hours. Agents work everyday between 8 am and 11 pm.

When you get a response, you will receive a text and email alert telling you. You can view the response either from the bottom of your giffgaff dashboard, or by clicking this link: https://www.giffgaff.com/support/questions`,
  },
  {
    button: "COVID-19 More Data",
    text: `giffgaff are trying to help people who need a hand to keep on top of their mobile usage. This could be people who can't afford their next goodybag, or those needing more data or calls to keep in touch with vulnerable family members.

Some of the money to fund this is coming from the new [giffgaff goodybank](https://www.giffgaff.com/goodybank). If you have some spare change (as little as 50p!), feel free to contribute.

You'll need to contact a giffgaff agent. They will see what they can do. It's evaluated on a case-by-case basis: what one person gets might not be what another gets. 

This situation could change in the future for key workers as giffgaff are work with the UK government to get a list of workers to provide extra usage to. Until then, giffgaff have to be careful to make sure that they aren't giving away free data to all their members.

You can contact a giffgaff agent at this link: https://support2.giffgaff.com/app/ask/Top-up-balances-and-goodybags/Buying-a-goodybag-or-credit/form

Agents always aim to respond within 24 hours (in some busy periods it can take up to 48 hours). It usually only takes 3-5 hours. Agents work everyday between 8 am and 11 pm.

When you get a response, you will receive a text and email alert telling you. You can view the response either from the bottom of your giffgaff dashboard, or by clicking this link: https://www.giffgaff.com/support/questions`,
  },
  {
    button: `5G Conspiracy Nuts!`,
    text: `5G is in the testing phase on giffgaff. If all goes to plan, we might see it switch on at the end of 2020 or early 2021. There's a small selection of 5G enabled devices available for sale from giffgaff.

**There's no truth** in these conspiracy theories that 5G is dangerous.

5G generally uses the same frequencies as 3G and 4G, using modern technology to add more data into these existing network standards.

When people talk about the danger of 5G, they are referring to "mmWave" (milimetre wave) technology. mmWave is a high frequency network technology which only travels a few tens of metres from the mast. They claim that these high frequencies are dangerous to humans.

WiFi routers use two main frequencies: 2.4 GHz and 5 GHz. These frequencies allow them to communicate with devices. 2.4 GHz supports lower speeds but can penetrate solid surfaces well. 5 GHz supports much faster speeds but can't travel through solid materials very well. These routers have been in use for almost two decades now, yet no-one has called them dangerous.

5G (not mmWave) uses frequencies of up to 6 GHz. If there was any real danger in the main 5G networks, we would have already seen this from WiFi routers.

mmWave technology uses frequencies between 24 GHz and 100 GHz. Scientists have researched these frequencies since the 80s, but have not found any dangers. They are already used in [airport scanners, astronomy, remote sensing, high speed microwave data links in the USA, weapons systems, and even modern medicine](https://en.wikipedia.org/wiki/Extremely_high_frequency#Applications). If we've already been using these frequencies for the past 40 years, we would have seen any dangerous side effects by now.

To all the 5G conspiracy theorists: if you're going to start burning down 5G towers, start by destroying your WiFi router first, then go for all the military communication networks, and then modern medicine used for treating diseases. After that you can start burning down the towers.`,
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
