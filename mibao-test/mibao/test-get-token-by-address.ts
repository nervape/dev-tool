import { MibaoOpenAPI } from "./mibao-open-api";

async function fnMain() {
  // ---------------  查询持有人地址所持有的所有 token
  const openAPI = new MibaoOpenAPI();
  try {
    // 目标用户：test-nervape 账号
    const addresses = "ckt1qyqvjsyfr4x98csn29pyhpm9z66uz8jcuftsvh2mnc";
    const res = await openAPI.fnGetTokenByAddress(addresses);
    console.error("get tonken by address complete");
    const tokenList = res.data.token_list;
    console.log("token list ", tokenList);
  } catch (e: any) {
    console.error("test open api error code xxxxxxxxxx !!!!!!");
    console.error("code", e.response.status);
    console.error("data", e.response.data);
  }
}
fnMain();
