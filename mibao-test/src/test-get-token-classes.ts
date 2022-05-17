import { MibaoOpenAPI } from "./mibao-open-api";

async function fnMain() {
  // --------------- 查询当前帐号创作的所有 token classes
  const openAPI = new MibaoOpenAPI();
  try {
    const res = await openAPI.fnGetAllTokenClasses();
    console.error("------ get token classes by classes complete");
    const data = res.data;
    const tokenClasses = data.token_classes;
    console.log("token classes", tokenClasses);
    console.log("token classes size", tokenClasses.length);
  } catch (e: any) {
    console.error("test open api error code xxxxxxxxxx !!!!!!");
    console.error("code", e.response.status);
    console.error("data", e.response.data);
  }
}
fnMain();
