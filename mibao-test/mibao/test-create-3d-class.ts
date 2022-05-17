import { MibaoOpenAPI } from "./mibao-open-api";
import moment from "moment";

async function fnMain() {
  // --------------- 创作3D类型秘宝
  const openAPI = new MibaoOpenAPI();
  try {
    const nowStr = moment().format("yyyy-MM-DD-HH-mm-ss.SSS");
    const name = `${nowStr}-3d`;
    const description = `this nft created at ${nowStr} by mibao open api`;
    const total = "128";
    const renderer =
      "https://oss.jinse.cc/production/a2fbc667-dd3f-4fdc-b809-755820f58bdc.gltf";
    const cover_image_url =
      "https://oss.jinse.cc/production/7ea62f75-bec0-4cdc-b81a-d59d7f40ace1.jpg";

    if (name.length > 30) {
      console.error(`param "name:${name}" length > 30 !!`);
      return;
    }
    const res = await openAPI.fnCreateVideoOr3DNFTClass(
      name,
      description,
      total,
      renderer,
      cover_image_url
    );
    console.error("create image nft  complete");
    const tokenClass = res.data;
    console.log("image nft ", tokenClass);
  } catch (e: any) {
    console.error("test open api error code xxxxxxxxxx !!!!!!");
    console.error("code", e.response.status);
    console.error("data", e.response.data);
  }
}
fnMain();
