// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { MibaoOpenAPI } from "../../../mibao/mibao-open-api";
import { DemoResult, DEMOT_RESULT_TYPE } from "../../util/http-helper";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<DemoResult>
) {
  const demoResult = new DemoResult();

  try {
    // --------------- 创作3D类型秘宝
    const openAPI = new MibaoOpenAPI();
    if (req.method?.toLocaleLowerCase() !== "post") {
      throw `method error "${req.method}"!!`;
    }
    const token_class_uuid = req.body.token_class_uuid;
    const renderer = req.body.renderer;
    const cover_image_url = req.body.cover_image_url;

    if (typeof token_class_uuid !== "string" || token_class_uuid === "") {
      throw `param "token_class_uuid:${token_class_uuid}" not string !!`;
    }
    if (typeof renderer !== "string" || renderer === "") {
      throw `param "renderer:${renderer}" not string !!`;
    }
    if (typeof cover_image_url !== "string" || cover_image_url === "") {
      throw `param "cover_image_url:${cover_image_url}" not string !!`;
    }

    const res = await openAPI.fnUpdateNFTClass(
      token_class_uuid,
      renderer,
      cover_image_url
    );
    console.error("create image nft  complete");
    const tokenClass = res.data;
    console.log("image nft ", tokenClass);
    demoResult.msg = "ok";
    demoResult.data = res.data;
  } catch (e: any) {
    console.log(e);
    demoResult.code = DEMOT_RESULT_TYPE.ERROR;
    demoResult.msg =
      typeof e === "string" ? e : "create token class error xxxxxxxxxx !!!!!!";
    demoResult.data = e;
  }
  res.status(200).json(demoResult);
}
