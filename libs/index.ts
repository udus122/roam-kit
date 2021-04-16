export const copyToClipboard = (text: string) => {
  const dummy = document.createElement("textarea");
  document.body.appendChild(dummy);
  dummy.value = text;
  dummy.select();
  document.execCommand("copy");
  document.body.removeChild(dummy);
};

export const putIndent = (s: string, n: number = 2) => {
  return `${" ".repeat(n)}${s}`;
};

export const roamfy = (d: Date) => {
  const ord = (n: number) =>
    n +
    (n > 0
      ? ["th", "st", "nd", "rd"][(n > 3 && n < 21) || n % 10 > 3 ? 0 : n % 10]
      : "");
  const year = d.getFullYear();
  const month = d.toLocaleString("en-us", { month: "long" });
  const date = ord(d.getDate());
  return `${month} ${date}, ${year}`;
};
