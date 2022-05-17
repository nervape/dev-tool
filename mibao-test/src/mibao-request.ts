import axios from "axios";
import { API_KEY, API_SECRET, API_VERSION, HOST } from "./mibao-config";
import { fnGetSignature } from "./mibao-signature";

/**
 * mibao 请求签名
 * @param {*} method GET | POST
 * @param {*} endpoint
 * @param {*} content
 */
export async function fnMiBaoRequest(
  method: string,
  endpoint: string,
  content: any = ""
) {
  console.log("fnMiBaoRequest,", method, endpoint);
  // 运行时数据
  const key = API_KEY;
  const secret = API_SECRET;
  const content_type = "application/json";
  const gmt = new Date().toUTCString();
  const signature = fnGetSignature(
    secret,
    method,
    endpoint,
    typeof content === "string" ? content : JSON.stringify(content),
    gmt,
    content_type
  );
  const url = `${HOST}${endpoint}`;
  const res = await axios.request({
    method,
    url,
    headers: {
      Authorization: `NFT ${key}:${signature}`,
      Date: gmt,
      "Content-Type": content_type,
    },
    data: content === "" ? undefined : content,
  });
  return res;
}
