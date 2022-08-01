import { IMetadataProps } from "./interface";

const https = require("https");
export function youtubeMetadata(url: string): Promise<IMetadataProps> {
  const urlMetadata =
    `https://www.youtube.com/oembed?url=` + url + `&format=json`;
  return new Promise(function (accept, error) {
    https
      .get(urlMetadata, function (_res: any) {
        var body = "";

        _res.on("data", function (chunk: any) {
          body += chunk;
        });

        _res.on("end", function () {
          var response = JSON.parse(body);
          accept(response);
        });
      })
      .on("error", function () {
        error({ error: "Something wrong!!" });
      });
  });
}
