import { putIndent, copyToClipboard } from "../../libs";
import scrapeHighlight from "./scrape";

(async () => {
  const { title, authors, highlights } = scrapeHighlight();

  const res = [
    `[[Book/${title}]] | ${authors}`,
    putIndent("highlights::", 2),
    ...highlights.map((m) => putIndent(m, 4)),
  ].join("\n");
  console.log(res);
  copyToClipboard(res);
})();
