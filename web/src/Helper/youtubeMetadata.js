const https = require("https");
export function youtubeMetadata(url) {
  const urlMetadata =
    `https://www.youtube.com/oembed?url=` + url + `&format=json`;
  return new Promise(function (accept, error) {
    https
      .get(urlMetadata, function (_res) {
        var body = "";

        _res.on("data", function (chunk) {
          body += chunk;
        });

        _res.on("end", function () {
          var response = JSON.parse(body);
          accept(response);
        });
      })
      .on("error", function (e) {
        error({ error: "Something wrong!!" });
      });
  });
}
