const putIndent = (s, n = 2) => {
  return `${" ".repeat(n)}${s}`;
};

const roamfy = (d) => {
  const ord = (n) =>
    n +
    (n > 0
      ? ["th", "st", "nd", "rd"][(n > 3 && n < 21) || n % 10 > 3 ? 0 : n % 10]
      : "");
  const year = d.getFullYear();
  const month = d.toLocaleString("en-us", { month: "long" });
  const date = ord(d.getDate());
  return `${month} ${date}, ${year}`;
};

const toDate = (YYYYMMDD) => {
  const year = YYYYMMDD.substr(0, 4);
  const month = YYYYMMDD.substr(4, 2);
  const day = YYYYMMDD.substr(6, 2);
  return new Date(year, month, day);
};

const copyToClipboard = (text) => {
  const dummy = document.createElement("textarea");
  document.body.appendChild(dummy);
  dummy.value = text;
  dummy.select();
  document.execCommand("copy");
  document.body.removeChild(dummy);
};

(async () => {
  const source = location.href;
  const asin = document
    .querySelector('link[rel="canonical"]')
    .href.split("/")
    .pop();
  const response = await fetch("https://api.openbd.jp/v1/get?isbn=" + asin);
  const [data] = await response.json();
  if (!data) {
    alert("版元ドットコムにデータがありませんでした。");
    return;
  }
  const {
    onix: {
      CollateralDetail: {
        TextContent: [{ Text: toc = "" }],
      },
      DescriptiveDetail: {
        TitleDetail: {
          TitleElement: {
            TitleText: { content: title = "" } = { content: "" },
            Subtitle: { content: subtitle = "" } = { content: "" },
          },
        },
        Contributor: contributors = [],
      },
      PublishingDetail: {
        Publisher: { PublisherName: publisher = "" } = { PublisherName: "" },
        PublishingDate: [{ Date: publishingDate = "" } = { Date: "" }],
      },
    },
  } = data;

  const authorsInfo = contributors.map((m) => ({
    name: m.PersonName.content,
    bio: m.BiographicalNote,
  }));

  const res = [
    `[[Book/${title} ${subtitle}]]`,
    putIndent(`Source:: ${source}`, 2),
    putIndent(`ISBN:: ${asin}`, 2),
    putIndent(`Authors::`, 2),
    ...authorsInfo.map((m) =>
      [putIndent(`[[${m.name}]]`, 4), putIndent(m.bio, 6)].join("\n")
    ),
    putIndent(`Publisher:: ${publisher}`, 2),
    putIndent(`Published:: [[${roamfy(toDate(publishingDate))}]]`, 2),
    putIndent(`Accessed:: [[${roamfy(new Date())}]]`, 2),
    putIndent(`Tags:: #Book `, 2),
    putIndent(`Notes:: `, 2),
    putIndent(`Related:: `, 2),
    putIndent(`Toc::`),
    putIndent(toc, 4),
  ].join("\n");

  copyToClipboard(res);
})();
