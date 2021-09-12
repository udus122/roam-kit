import { roamfy, copyToClipboard } from "../../libs";

(() => {
  const description = document
    .querySelector<HTMLDivElement>(".description-box")
    ?.innerText.replaceAll("\n", " ");
  const capturedInfoDOM = document.querySelector(".captured-info");
  const capturedAtText = capturedInfoDOM
    ?.querySelector(".created-at-field a")
    ?.textContent?.trim()
    .replace(/[年月]/g, "-")
    .replace("日", "");

  const app = capturedInfoDOM
    ?.querySelector(".app a")
    ?.textContent?.split(":")[1]
    .trim();

  let source = capturedInfoDOM
    ?.querySelector(".source-link a,.source")
    ?.textContent?.split(":")[1]
    .trim();

  const sourceLink = capturedInfoDOM?.querySelector(".source-link a");

  if (sourceLink !== null) {
    source = `[${source}](${sourceLink})`;
  }

  const ocrText =
    document
      .querySelector(".ocr-desc-text")
      ?.textContent?.split("\n")
      .join(" ") ?? "";
  const imageLink = document.querySelector("picture img")?.getAttribute("src");

  const res = [
    `![Image from Gyazo](${imageLink})`,
    source,
    description,
    capturedAtText,
    ocrText,
  ].join("\n");
  console.log(res);
  copyToClipboard(res);
})();
