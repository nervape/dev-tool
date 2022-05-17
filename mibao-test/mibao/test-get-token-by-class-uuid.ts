import { MibaoOpenAPI } from "./mibao-open-api";

async function fnMain() {
  // --------------- 根据 token_class_uuid 查询对应的所有 token
  const openAPI = new MibaoOpenAPI();
  try {
    const class_uuid = "df71c583-a1bb-4023-a01f-4b9320fefe1e";
    const res = await openAPI.fnGetTokenInfosByClassUUID(class_uuid);
    console.error("------ get token by token_uuid complete");
    const tokens = res.data.tokens;
    console.log("token info", tokens);
  } catch (e: any) {
    console.error("test open api error code xxxxxxxxxx !!!!!!");
    console.error("code", e.response.status);
    console.error("data", e.response.data);
  }
}
fnMain();
