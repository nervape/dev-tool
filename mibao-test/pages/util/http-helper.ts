import type { NextApiRequest, NextApiResponse } from "next";

export enum DEMOT_RESULT_TYPE {
  OK = 0,
  ERROR = -1,
}

export class DemoResult {
  code: DEMOT_RESULT_TYPE = DEMOT_RESULT_TYPE.OK;
  msg: string = "";
  data: any = {};
}
