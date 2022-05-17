import { MibaoOpenAPI } from "./mibao-open-api";

async function fnMain() {
  // --------------- 查询交易状态
  const openAPI = new MibaoOpenAPI();
  try {
    const tx_uuid = "2a90c890-1d88-4455-b854-2479b88595b1";
    const res = await openAPI.fnGetTransferByTxUUID(tx_uuid);
    console.error("------ get tansfer by tx'uuid complete");
    const transferInfo = res.data;
    console.log("tansfer info", transferInfo);
  } catch (e: any) {
    console.error("test open api error code xxxxxxxxxx !!!!!!");
    console.error("code", e.response.status);
    console.error("data", e.response.data);
  }
}
fnMain();
