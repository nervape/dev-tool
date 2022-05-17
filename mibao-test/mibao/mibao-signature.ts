import { MD5, HmacSHA1, enc } from "crypto-js";

// 生成签名
export function fnGetSignature(
  secret: string,
  method: string,
  endpoint: string,
  content: string,
  gmt: string,
  content_type: string
) {
  let contentMd5 = "";
  if (content !== "") {
    contentMd5 = enc.Base64.stringify(MD5(content));
  }
  const msg = `${method}\n${endpoint}\n${contentMd5}\n${content_type}\n${gmt}`;
  const signature = enc.Base64.stringify(HmacSHA1(msg, secret));
  return signature;
}

// // 测试数据：打开下面注释，验证你的签名方法
// const key = "44CF9590006BF252F707";
// const secret = "OtxrzxIsfpFjA7SwPzILwy8Bw21TLhquhboDYROV";
// const method = "GET";
// const endpoint = "/api/v1/token_classes";
// const content = "";
// const content_type = "application/json";
// const gmt = "Tue, 06 Jul 2021 00:00:34 GMT";

// const signature = fnGetSignature(
//   secret,
//   method,
//   endpoint,
//   content,
//   gmt,
//   content_type
// );
// // 你将得到的输出： SXc3VHXXbU08qzYdAm1RvwMWaUw=
// console.log(signature);
