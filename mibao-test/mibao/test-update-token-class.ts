import { MibaoOpenAPI } from "./mibao-open-api";

async function fnMain() {
  // --------------- 修改秘宝 （token class）修改秘宝 token class 会上链，上链操作由平台完成。
  const openAPI = new MibaoOpenAPI();
  try {
    const token_class_uuid = "793fd915-28db-4805-b7f2-0d12ea4b2fa5";
    const renderer =
      "https://oss.jinse.cc/production/a2fbc667-dd3f-4fdc-b809-755820f58bdc.gltf";
    const cover_image_url =
      "https://oss.jinse.cc/production/7ea62f75-bec0-4cdc-b81a-d59d7f40ace1.jpg";
    const res = await openAPI.fnUpdateNFTClass(
      token_class_uuid,
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
