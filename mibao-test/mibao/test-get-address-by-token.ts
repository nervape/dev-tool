import { MibaoOpenAPI } from "./mibao-open-api";

async function fnMain() {
  // ---------------  根据 token_uuid 查询该 token 的持有人地址
  const openAPI = new MibaoOpenAPI();
  try {
    // 目标用户：test-nervape 账号
    const token_uuid = "e71da63c-a2d9-4e8f-810d-35e8280bf3f1";
    const res = await openAPI.fnGetAddressByToken(token_uuid);
    console.error("get address by token complete");
    const address = res.data.address;
    console.log("address ", address);
  } catch (e: any) {
    console.error("test open api error code xxxxxxxxxx !!!!!!");
    console.error("code", e.response.status);
    console.error("data", e.response.data);
  }
}
fnMain();
