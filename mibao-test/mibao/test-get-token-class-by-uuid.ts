import { MibaoOpenAPI } from "./mibao-open-api";

async function fnMain() {
  // --------------- 根据指定 token_class_uuid 查询 token class
  const openAPI = new MibaoOpenAPI();
  try {
    const tokenClassUUID = "17b1ce30-29a1-489a-a428-3ec2cce5386e";
    const res = await openAPI.fnGetTokenClassByTokenClassUUID(tokenClassUUID);
    console.error("------ get token classes by class'uuid complete");
    const tokenClass = res.data;
    console.log("token class", tokenClass);
  } catch (e: any) {
    console.error("test open api error code xxxxxxxxxx !!!!!!");
    console.error("code", e.response.status);
    console.error("data", e.response.data);
  }
}
fnMain();
