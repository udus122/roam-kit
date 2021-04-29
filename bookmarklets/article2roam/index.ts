import { copyToClipboard } from "../../libs";

(() => {
  let title = document.title;
  const replacedStrings: { [key: string]: string } = {
    ":": "：",
    "\\[": "［",
    "\\]": "］",
    "#": "♯",
    "/": "／",
  };
  for (let key in replacedStrings) {
    title = title.replace(new RegExp(key, "g"), replacedStrings[key]);
  }

  const res = "[[" + title + "]] [->](" + document.URL + ") ";
  console.log(res);

  copyToClipboard(res);
})();
