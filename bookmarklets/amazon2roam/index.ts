import { putIndent, roamfy, copyToClipboard } from "../../libs";

(async () => {
  const toDate = (YYYYMMDD: string) => {
    const year = Number(YYYYMMDD.substr(0, 4));
    const month = Number(YYYYMMDD.substr(4, 2));
    const day = Number(YYYYMMDD.substr(6, 2));
    return new Date(year, month, day);
  };

  const canonicalUrl =
    document.querySelector<HTMLLinkElement>('link[rel="canonical"]')?.href ??
    "";
  const asin = canonicalUrl.split("/").pop();
  const response = await fetch("https://api.openbd.jp/v1/get?isbn=" + asin);
  const [data] = await response.json();
  if (!data) {
    alert("版元ドットコムにデータがありませんでした。");
    return;
  }
  const {
    onix: {
      CollateralDetail: { TextContent: bookInfoList },
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

  const isToc = (m: { TextType: string }) => m.TextType === "04";
  const toc = bookInfoList.find(isToc)?.Text.split("\n") ?? [];
  const bookDescriptions =
    bookInfoList
      ?.filter((m: any) => !isToc(m))
      ?.map((m: { Text: string }) => m.Text) ?? [];

  const authorsInfo = contributors.map(
    (m: { PersonName: { content: string }; BiographicalNote: string }) => ({
      name: m.PersonName.content ?? "",
      bio: m.BiographicalNote?.replace("\n", " ") ?? "",
    })
  );

  const res = [
    `[[Book/${title}${subtitle ? ` ${subtitle}` : ""}]]`,
    putIndent("metadata:", 2),
    putIndent(`Source:: ${canonicalUrl}`, 4),
    putIndent(`ISBN:: ${asin}`, 4),
    putIndent(`Authors::`, 4),
    ...authorsInfo.map((m: { name: string; bio: string }) =>
      [putIndent(`[[${m.name}]]`, 6), putIndent(m.bio, 8)].join("\n")
    ),
    putIndent(`Publisher:: ${publisher}`, 4),
    putIndent(`Published:: [[${roamfy(toDate(publishingDate))}]]`, 4),
    putIndent(`Accessed:: [[${roamfy(new Date())}]]`, 4),
    putIndent(`Tags:: #Book `, 4),
    putIndent(`Notes:: `, 4),
    putIndent(`Related:: `, 4),
    putIndent(`Toc::`, 4),
    ...toc.map((m: string) => putIndent(m, 6)),
    putIndent("Descriptions::", 4),
    ...bookDescriptions.map((m: string) => [putIndent(m, 6)]),
  ].join("\n");

  copyToClipboard(res);
})();
