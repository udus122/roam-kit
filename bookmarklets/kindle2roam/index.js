(async () => {
  const putIndent = (s, n) => {
    if (n === undefined) n = 2;
    return `${" ".repeat(n)}${s}`;
  };

  const titleDOM = document.querySelector("#annotation-section h3");
  const title = titleDOM.textContent;
  const authors = titleDOM.nextElementSibling.textContent
    .split("、")
    .map((a) => `[[${a}]]`)
    .join(" ");
  const annotations = Array.from(
    document.querySelectorAll("#kp-notebook-annotations>div")
  )
    .map((a) => {
      if (a.id === "empty-annotations-pane") return null;
      const metadata = a
        .querySelector("#annotationHighlightHeader")
        .textContent.split("|")
        .map((t) => t.trim());
      const color = metadata[0];
      const position = metadata[1];
      const highlight = a
        .querySelector(".kp-notebook-highlight")
        .textContent.trim();
      return { highlight, position, color };
    })
    .filter((a) => a !== null);

  const highlights = annotations
    .map((a) => [putIndent(a.position), putIndent(a.highlight, 4)].join("\n"))
    .join("\n");

  const metadata = [
    "Source:: ",
    `Author:: ${authors}`,
    "Published:: ",
    "Accessed:: {{date}}",
    "Tags:: ",
    "Related:: ",
  ]
    .map((m) => putIndent(m, 2))
    .join("\n");

  const res = [
    // clipboard text
    `[[Book/${title}]]`,
    "  metadata:",
    `    ${metadata}`,
    "  ---",
    `  ${highlights}`,
  ].join("\n");

  try {
    await navigator.clipboard.writeText(res);
  } catch (_) {
    alert(res);
  }
})();
