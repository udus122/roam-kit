import { roamfy, putIndent, copyToClipboard } from "../../libs";

(() => {
  const description = document
    .querySelector<HTMLDivElement>(".description-box")
    ?.innerText.replace("\n", " ");
  const capturedInfoDOM = document.querySelector(".captured-info");
  const capturedAtText = capturedInfoDOM
    ?.querySelector(".created-at-field a")
    ?.textContent?.trim()
    .replace(/[年月]/g, "/")
    .replace("日", "");
  const capturedAt = capturedAtText
    ? roamfy(new Date(capturedAtText))
    : roamfy(new Date());

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

  const metadata = [
    `Descriptions:: ${description}`,
    `CapturedAt:: ${capturedAt}`,
    `App:: ${app}`,
    `Source:: ${source}`,
  ]
    .map((m) => putIndent(m, 2))
    .join("\n");

  const res = [
    `![Image from Gyazo](${imageLink})`,
    putIndent(metadata, 2),
    putIndent("Text:", 2),
    putIndent(ocrText, 4),
  ].join("\n");
  console.log(res);
  copyToClipboard(res);
})();
