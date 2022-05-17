import { MibaoOpenAPI } from "./mibao-open-api";

async function fnMain() {
  // --------------- 通过 token_uuid 查询 token 详情
  const openAPI = new MibaoOpenAPI();
  try {
    const token_uuid = "e71da63c-a2d9-4e8f-810d-35e8280bf3f1";
    const res = await openAPI.fnGetTokenInfoByTokenUUID(token_uuid);
    console.error("------ get token by token_uuid complete");
    const tokenClass = res.data;
    console.log("token info", tokenClass);
  } catch (e: any) {
    console.error("test open api error code xxxxxxxxxx !!!!!!");
    console.error("code", e.response.status);
    console.error("data", e.response.data);
  }
}
fnMain();
