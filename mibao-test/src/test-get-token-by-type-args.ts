import { MibaoOpenAPI } from "./mibao-open-api";

async function fnMain() {
  // ---------------  根据 通过 nft_type_args 查询 token
  const openAPI = new MibaoOpenAPI();
  try {
    const nft_type_args = "0xf90f9c38b0ea0815156bbc340c910d0a21ee57cf0000002900000000";
    const res = await openAPI.fnGetTokenInfoByTypeArgs(nft_type_args);
    console.error("------ get token info by args complete");
    const tokenInfo = res.data;
    console.log("token info", tokenInfo);
  } catch (e: any) {
    console.error("test open api error code xxxxxxxxxx !!!!!!");
    console.error("code", e.response.status);
    console.error("data", e.response.data);
  }
}
fnMain();
