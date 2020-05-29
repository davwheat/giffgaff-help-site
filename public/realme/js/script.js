let chosenVersion = null;

document
  .getElementById("version--color-os")
  .addEventListener("input", function () {
    chosenVersion = 9;
    document.body.setAttribute("data-version", "9");
    UpdateVersionInfoMessages();
  });

document
  .getElementById("version--realme-ui")
  .addEventListener("input", function () {
    chosenVersion = 10;
    document.body.setAttribute("data-version", "10");
    UpdateVersionInfoMessages();
  });

function UpdateVersionInfoMessages() {
  document.querySelectorAll(".version-info").forEach(function (n) {
    n.querySelector(
      ".version-info__title"
    ).innerHTML = `You're running Android ${chosenVersion} (${
      chosenVersion === 9 ? "ColorOS 6" : "realme UI 1.0"
    })`;
  });
}

// --------------------------------------------------------------

document
  .getElementById("windows-platform-tools")
  .addEventListener("click", function () {
    window.open(
      "https://dl.google.com/android/repository/platform-tools-latest-windows.zip"
    );
  });

document
  .getElementById("mac-platform-tools")
  .addEventListener("click", function () {
    window.open(
      "https://dl.google.com/android/repository/platform-tools-latest-darwin.zip"
    );
  });

document
  .getElementById("linux-platform-tools")
  .addEventListener("click", function () {
    window.open(
      "https://dl.google.com/android/repository/platform-tools-latest-linux.zip"
    );
  });
