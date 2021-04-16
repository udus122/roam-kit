const copyToClipboard = (text) => {
  const dummy = document.createElement("textarea");
  document.body.appendChild(dummy);
  dummy.value = text;
  dummy.select();
  document.execCommand("copy");
  document.body.removeChild(dummy);
};

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
