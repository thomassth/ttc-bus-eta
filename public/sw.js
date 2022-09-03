if (!self.define) {
  let i,
    c = {};
  const n = (n, e) => (
    (n = new URL(n + ".js", e).href),
    c[n] ||
      new Promise((c) => {
        if ("document" in self) {
          const i = document.createElement("script");
          (i.src = n), (i.onload = c), document.head.appendChild(i);
        } else (i = n), importScripts(n), c();
      }).then(() => {
        let i = c[n];
        if (!i) throw new Error(`Module ${n} didn’t register its module`);
        return i;
      })
  );
  self.define = (e, o) => {
    const s =
      i ||
      ("document" in self ? document.currentScript.src : "") ||
      location.href;
    if (c[s]) return;
    let r = {};
    const f = (i) => n(i, s),
      d = { module: { uri: s }, exports: r, require: f };
    c[s] = Promise.all(e.map((i) => d[i] || f(i))).then((i) => (o(...i), r));
  };
}
define(["./workbox-7ac27b28"], function (i) {
  "use strict";
  self.addEventListener("message", (i) => {
    i.data && "SKIP_WAITING" === i.data.type && self.skipWaiting();
  }),
    i.precacheAndRoute(
      [
        { url: "404.html", revision: "b1ed847374524da8c836cad437a61475" },
        {
          url: "asset-manifest.json",
          revision: "a596d22e6514425b95a788c85d9b1c5f",
        },
        { url: "favicon.ico", revision: "259f62cfe7b78c0b67f3e232211ff9c6" },
        {
          url: "icons/100x100-icon.png",
          revision: "9d852e111a9c2c2174674e5a1eb785ef",
        },
        {
          url: "icons/1024x1024-icon.png",
          revision: "488bcef1250bfa292b75e70c8327a7be",
        },
        {
          url: "icons/107x107-icon.png",
          revision: "63933e3ca0193aef22ef826e0d878c68",
        },
        {
          url: "icons/114x114-icon.png",
          revision: "e0d289c56a6781c3761c0a931fe0d77f",
        },
        {
          url: "icons/120x120-icon.png",
          revision: "5059dd430a6c055c36f726c950bce9eb",
        },
        {
          url: "icons/1240x1240-icon.png",
          revision: "ad109eb7ea57dd66bed6fc501486d7e1",
        },
        {
          url: "icons/1240x600-icon.png",
          revision: "b1ebc2f315a6e240887eb930125358d0",
        },
        {
          url: "icons/128x128-icon.png",
          revision: "5417c8db382fcb315a13bb72c2d003f7",
        },
        {
          url: "icons/142x142-icon.png",
          revision: "ed86ea925f5e2b755b7aeecf1e0a9a63",
        },
        {
          url: "icons/144x144-icon.png",
          revision: "1e49030742db9d5a11ec52b0725e79ef",
        },
        {
          url: "icons/150x150-icon.png",
          revision: "0851cc54d87bd9260af7559f9cd7e41c",
        },
        {
          url: "icons/152x152-icon.png",
          revision: "354ff4ebef8f02845a10d26d30cbbc34",
        },
        {
          url: "icons/167x167-icon.png",
          revision: "4e24bbd227eaa8c511c75421b189f5cf",
        },
        {
          url: "icons/16x16-icon.png",
          revision: "3bbed0b53505f0db0980b71fc97c3070",
        },
        {
          url: "icons/176x176-icon.png",
          revision: "94abc9b63b9a0814a66ff1769fa33b22",
        },
        {
          url: "icons/180x180-icon.png",
          revision: "6e9115ce0a8d9431c8ee226499851c32",
        },
        {
          url: "icons/188x188-icon.png",
          revision: "2f940f89c38b5dcc32193a06abee147d",
        },
        {
          url: "icons/192x192-icon.png",
          revision: "0b515ff585612f0bd5374ad8003e9efa",
        },
        {
          url: "icons/200x200-icon.png",
          revision: "98ffee7863ad0f63974c9e07df44fb50",
        },
        {
          url: "icons/20x20-icon.png",
          revision: "ae061db29df80735327b9829ff3f270f",
        },
        {
          url: "icons/225x225-icon.png",
          revision: "b835ab48cfdb273c669e862617424a38",
        },
        {
          url: "icons/2480x1200-icon.png",
          revision: "f71d9c7deb598fc10f7c07b411e50812",
        },
        {
          url: "icons/24x24-icon.png",
          revision: "d96597c706bca438ff9f2a815a90325b",
        },
        {
          url: "icons/256x256-icon.png",
          revision: "7580815da0464acfeb19fe14631928c3",
        },
        {
          url: "icons/284x284-icon.png",
          revision: "4021812011f02566a38bbdbe48bb53a2",
        },
        {
          url: "icons/29x29-icon.png",
          revision: "0e8850e53839a2d6be968e05affdc168",
        },
        {
          url: "icons/300x300-icon.png",
          revision: "7e9f32d133d076326db50fa6f716cafe",
        },
        {
          url: "icons/30x30-icon.png",
          revision: "533d8afd7c1296325d33e8ad9e92541f",
        },
        {
          url: "icons/310x150-icon.png",
          revision: "390226c841b7b65e906a91e75a913166",
        },
        {
          url: "icons/310x310-icon.png",
          revision: "c77cee292dcefe14f2a2dc2acb3c4266",
        },
        {
          url: "icons/32x32-icon.png",
          revision: "936f0f64b303230e07ce5e2109c73e9e",
        },
        {
          url: "icons/36x36-icon.png",
          revision: "f6aa50a2ae43f11932fce446f0ca2008",
        },
        {
          url: "icons/388x188-icon.png",
          revision: "cbec234893d4787067f6834d4cf95efd",
        },
        {
          url: "icons/388x388-icon.png",
          revision: "2879d610d1be90d6f1a64b6eb77dd692",
        },
        {
          url: "icons/40x40-icon.png",
          revision: "0da93e759c7055194b230637fc1801bf",
        },
        {
          url: "icons/44x44-icon.png",
          revision: "d87063a31074938d5e7116c23d389629",
        },
        {
          url: "icons/465x225-icon.png",
          revision: "5a9ac632c3166364ebf12a452660b971",
        },
        {
          url: "icons/465x465-icon.png",
          revision: "48ef81c780152221c96cf5976d1219b5",
        },
        {
          url: "icons/48x48-icon.png",
          revision: "1a8353b07a6823abed83563a443686c3",
        },
        {
          url: "icons/50x50-icon.png",
          revision: "c63fc7db2a6fd9b6b802e7ccb3df71f5",
        },
        {
          url: "icons/512x512-icon.png",
          revision: "248e04e60e64cb821fbf850a1afe4cea",
        },
        {
          url: "icons/55x55-icon.png",
          revision: "d5b8e4a9184d8536cf1ef027dc21e13b",
        },
        {
          url: "icons/57x57-icon.png",
          revision: "ce0d6ca2da22d4084c058c0dbc5db560",
        },
        {
          url: "icons/58x58-icon.png",
          revision: "60c23bff60029653d4c7a11825937dff",
        },
        {
          url: "icons/600x600-icon.png",
          revision: "03b82f83675cd3413b25fa3b33db940c",
        },
        {
          url: "icons/60x60-icon.png",
          revision: "5cc9983543915490bceef66279d5880f",
        },
        {
          url: "icons/620x300-icon.png",
          revision: "a91e2cbb22d13b241006eaa951d164fe",
        },
        {
          url: "icons/620x620-icon.png",
          revision: "eb692d9095226be3449dd63817d3a658",
        },
        {
          url: "icons/63x63-icon.png",
          revision: "d7a6198bf3896a43c1ac65f8598527b7",
        },
        {
          url: "icons/64x64-icon.png",
          revision: "dd02e4c7dac087570f4c256c702f6283",
        },
        {
          url: "icons/66x66-icon.png",
          revision: "7183171811a371c78cfb0011fd88095d",
        },
        {
          url: "icons/71x71-icon.png",
          revision: "1f643a0eec84500f7a9eb9064e450fab",
        },
        {
          url: "icons/72x72-icon.png",
          revision: "ddcd7253ea8dd75f5304bdcfb86113e4",
        },
        {
          url: "icons/75x75-icon.png",
          revision: "ae5a38c31cc67ecd4ab60332f1a0aeee",
        },
        {
          url: "icons/76x76-icon.png",
          revision: "a7cfad2b4bb34cfe0ccf8ce2e903359f",
        },
        {
          url: "icons/775x375-icon.png",
          revision: "d79d90c584d07957a542eab84e88bc97",
        },
        {
          url: "icons/80x80-icon.png",
          revision: "317ec1e404435297d4a893db7370eda3",
        },
        {
          url: "icons/87x87-icon.png",
          revision: "85cd83b56299aeae5411e6a0cb826659",
        },
        {
          url: "icons/88x88-icon.png",
          revision: "73d3ad6ba70a03dcefe34490fdf77880",
        },
        {
          url: "icons/89x89-icon.png",
          revision: "c5aca75766fe4e16057078f020e7286d",
        },
        {
          url: "icons/930x450-icon.png",
          revision: "c7785c82fa170c9112348bc4bbe6ba4c",
        },
        {
          url: "icons/96x96-icon.png",
          revision: "7ebcc82df5c89e8fda9f112f1df36500",
        },
        { url: "index.html", revision: "71517787e49208f721bb42bb9566390e" },
        { url: "manifest.json", revision: "e426d92e22ce20e1e5743a6f949401c8" },
        {
          url: "pwabuilder-sw-register.js",
          revision: "a5de8953cfbf9e464edf88021c3736cd",
        },
        {
          url: "pwabuilder-sw.js",
          revision: "746d5875811b2ab2a18ea71de0fcec61",
        },
        {
          url: "static/css/main.69f83601.css",
          revision: "096b0d6433967bdea30e88ee35510524",
        },
        {
          url: "static/js/496.0b23fdd4.chunk.js",
          revision: "d4782d1bb76cf3b3811dbbd38e1de462",
        },
        {
          url: "static/js/main.2d125f7e.js",
          revision: "9e5aab5a5327b8a97ee1d479c931e2f8",
        },
        {
          url: "static/js/main.2d125f7e.js.LICENSE.txt",
          revision: "c15857706031a53f4f5f1de521d7ad63",
        },
        { url: "style.css", revision: "31f182d2870ff665355ad9f9118dfcf9" },
      ],
      { ignoreURLParametersMatching: [/^utm_/, /^fbclid$/] }
    );
});
//# sourceMappingURL=sw.js.map
