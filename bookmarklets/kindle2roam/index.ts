import { putIndent } from "../../libs";

(async () => {
  const titleDOM = document.querySelector("#annotation-section h3");
  const title = titleDOM?.textContent ?? "";
  const authors = titleDOM?.nextElementSibling?.textContent
    ?.split("、")
    .map((a) => `[[${a}]]`)
    .join(" ");
  const annotations = Array.from(
    document.querySelectorAll("#kp-notebook-annotations>div")
  )
    .map((a) => {
      if (a.id === "empty-annotations-pane") return null;
      const metadata =
        a
          ?.querySelector("#annotationHighlightHeader")
          ?.textContent?.split("|")
          .map((t) => t.trim()) ?? [];
      const color = metadata[0];
      const position = metadata[1];
      const highlight =
        a?.querySelector(".kp-notebook-highlight")?.textContent?.trim() ?? "";
      return { highlight, position, color };
    })
    .filter((a) => a !== null);

  const highlights = annotations.map((a) =>
    a
      ? [putIndent(`> ${a.highlight}`, 0), putIndent(a.position, 4)].join("\n")
      : ""
  );

  const metadata = [
    "Source:: ",
    `Author:: ${authors}`,
    "Published:: ",
    "Accessed:: {{date}}",
    "Tags:: #Book",
    "Related:: ",
  ];

  const res = [
    `[[Book/${title}]]`,
    putIndent("metadata:", 2),
    ...metadata.map((m) => putIndent(m, 4)),
    putIndent("----", 2),
    putIndent("highlights::", 2),
    ...highlights.map((m) => putIndent(m, 4)),
  ].join("\n");
  console.log(res);
  navigator.clipboard.writeText(res);
})();
