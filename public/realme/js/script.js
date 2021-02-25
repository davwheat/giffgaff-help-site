let chosenVersion = null;

document.getElementById('version--color-os').addEventListener('input', function () {
  chosenVersion = 9;
  document.body.setAttribute('data-version', '9');
  UpdateVersionInfoMessages();
});

document.getElementById('version--realme-ui').addEventListener('input', function () {
  chosenVersion = 10;
  document.body.setAttribute('data-version', '10');
  UpdateVersionInfoMessages();
});

function UpdateVersionInfoMessages() {
  document.querySelectorAll('.gg-c-minor-alert[data-version-message]').forEach(function (n) {
    n.querySelector('.gg-c-minor-alert__title').innerHTML = `You're running Android ${chosenVersion} (${
      chosenVersion === 9 ? 'ColorOS 6' : 'realme UI 1.0'
    })`;
  });
}

// --------------------------------------------------------------

document.getElementById('windows-platform-tools').addEventListener('click', function () {
  window.open('https://dl.google.com/android/repository/platform-tools-latest-windows.zip');
});

document.getElementById('mac-platform-tools').addEventListener('click', function () {
  window.open('https://dl.google.com/android/repository/platform-tools-latest-darwin.zip');
});

document.getElementById('linux-platform-tools').addEventListener('click', function () {
  window.open('https://dl.google.com/android/repository/platform-tools-latest-linux.zip');
});

function ToggleNav() {
  const disableBodyScroll = bodyScrollLock.disableBodyScroll;
  const enableBodyScroll = bodyScrollLock.enableBodyScroll;

  const nav = document.getElementById('contents');

  if (nav.classList.contains('in')) {
    nav.classList.remove('in');
    nav.classList.add('out');
    enableBodyScroll(nav);
  } else {
    nav.classList.remove('out');
    nav.classList.add('in');
    disableBodyScroll(nav);
  }
}

document.getElementById('toggle-contents').addEventListener('click', ToggleNav);

document.querySelectorAll('#contents li a').forEach(function (heading) {
  heading.addEventListener('click', ToggleNav);
});
