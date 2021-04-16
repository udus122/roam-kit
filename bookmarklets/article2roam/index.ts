(() => {
  let title = document.title;
  const replacedStrings: { [key: string]: string } = {
    ":": "：",
    "\\[": "［",
    "\\]": "］",
    "#": "♯",
  };
  for (let key in replacedStrings) {
    title = title.replace(new RegExp(key, "g"), replacedStrings[key]);
  }

  const res = "[[Article/" + title + "]] [->](" + document.URL + ") ";
  console.log(res);
  navigator.clipboard.writeText(res);
})();
