import { MibaoOpenAPI } from "./mibao-open-api";

async function fnMain() {
  // ---------------  铸造并分发秘宝
  const openAPI = new MibaoOpenAPI();
  try {
    // 分发目标：Nervape Test 001
    const token_class_uuid = "17b1ce30-29a1-489a-a428-3ec2cce5386e";
    // 目标用户：test-nervape 账号
    const addresses = ["ckt1qyqvjsyfr4x98csn29pyhpm9z66uz8jcuftsvh2mnc"];
    const res = await openAPI.fnDistributeToken(token_class_uuid, addresses);
    console.error("distribte nft  complete");
    const tokenClass = res.data;
    console.log("distribte nft ", tokenClass);
  } catch (e: any) {
    console.error("test open api error code xxxxxxxxxx !!!!!!");
    console.error("code", e.response.status);
    console.error("data", e.response.data);
  }
}
fnMain();
