javascript: var b = window;
b.g = b.g || {};
b.g.i = function () {
  var a = document.title,
    c = {
      ":": "\uff1a",
      "\\[": "\uff3b",
      "\\]": "\uff3d",
      "\\|": "\uff5c",
    },
    d;
  for (d in c) a = a.replace(new RegExp(d, "g"), c[d]);
  return "[[Article/" + a + "]] [->](" + document.URL + ") ";
};
b.g.h = function () {
  var a = document.createElement("textarea");
  a.textContent = this.i();
  var c = document.getElementsByTagName("body")[0];
  c.appendChild(a);
  a.select();
  document.execCommand("copy");
  c.removeChild(a);
};
b.g.h();
