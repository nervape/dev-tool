import { API_VERSION } from "./mibao-config";
import { fnMiBaoRequest } from "./mibao-request";

/**
 * 答疑解惑：
 * 1. 为什么创建出来的 token classes？
 *    因为通过该 open api 创建的仅是一个 nft 模版（class），并没有铸造（mint）成一个实例（token）
 */
export class MibaoOpenAPI {
  /*********************  创作秘宝 （NFT token class） *************************/

  /**
   * 创作图片类型秘宝
   * @param {*} name 秘宝的名称，不超过 30 个字符（一旦创建，不可修改）
   * @param {*} description 秘宝的简介，不超过 200 个字符（一旦创建，不可修改）
   * @param {*} total 类型的非负整数，为 0 时，表示秘宝不限量；大于 0 时，表示秘宝限量的数量（一旦创建，不可修改）
   * @param {*} renderer -- string, required: NFT 的媒体信息，必须是以 https:// 开头、以具体支持的格式后缀为结尾、媒体内容有效的 url，长度不能超过 255 个字符（NFT 创作成功后，30 天内仅允许修改一次）。
   *                      图片：支持格式包括 png, jpg, jpeg, gif, webp 和 svg 六种；
   */
  async fnCreateImageNFTClass(
    name: string,
    description: string,
    total: string,
    renderer: string
  ) {
    const method = "POST";
    const endpoint = `${API_VERSION}/token_classes`;
    const content = {
      name,
      description,
      total,
      renderer,
    };
    const res = await fnMiBaoRequest(method, endpoint, JSON.stringify(content));
    return res;
  }

  /**
   * 创作视频或 3D 类型秘宝
   * @param {*} name 秘宝的名称，不超过 30 个字符（一旦创建，不可修改）
   * @param {*} description 秘宝的简介，不超过 200 个字符（一旦创建，不可修改）
   * @param {*} total 类型的非负整数，为 0 时，表示秘宝不限量；大于 0 时，表示秘宝限量的数量（一旦创建，不可修改）
   * @param {*} renderer -- string, required: NFT 的媒体信息，必须是以 https:// 开头、以具体支持的格式后缀为结尾、媒体内容有效的 url，长度不能超过 255 个字符（NFT 创作成功后，30 天内仅允许修改一次）。
   * 视频：支持格式包括 mp4 和 webm 两种； 3D：支持格式包括 glb, gltf 和 usdz 三种；
   * @param cover_image_url 用于设置 NFT 的封面，支持 png, jpg, jpeg, gif, webp 和 svg 六种，校验规则与图片类型 renderer 一致。
   */
  async fnCreateVideoOr3DNFTClass(
    name: string,
    description: string,
    total: string,
    renderer: string,
    cover_image_url: string
  ) {
    const method = "POST";
    const endpoint = `${API_VERSION}/token_classes`;
    const content = {
      name,
      description,
      total,
      renderer,
      cover_image_url,
    };
    const res = await fnMiBaoRequest(method, endpoint, JSON.stringify(content));
    return res;
  }

  /*********************  修改class（token class） *************************/
  /**
   * 修改秘宝 （token class）修改秘宝 token class 会上链，上链操作由平台完成。
   * @param token_class_uuid 目标 token_class_uuid
   * @param renderer string, required: NFT 的媒体信息，规则同 POST /api/v1/token_classes；
   * @param cover_image_url string, optional: NFT 封面信息，当 NFT 类型为视频或 3D 类型时必须传入；
   * @returns
   */
  async fnUpdateNFTClass(
    token_class_uuid: string,
    renderer: string,
    cover_image_url?: string
  ) {
    const method = "PUT";
    const endpoint = `${API_VERSION}/token_classes/${token_class_uuid}`;

    const content: any = {
      renderer,
    };
    if (cover_image_url) {
      content.cover_image_url = cover_image_url;
    }
    const res = await fnMiBaoRequest(method, endpoint, JSON.stringify(content));
    return res;
  }

  /*********************  查询class（token class） *************************/
  /**
   * 查询当前帐号创作的所有 token classes
   * @param {*} token_class_uuid  在创建 token class 时返回的 uuid
   */
  fnGetAllTokenClasses = async () => {
    const method = "GET";
    const endpoint = `${API_VERSION}/token_classes`;
    return await fnMiBaoRequest(method, endpoint);
  };

  /**
   * 根据指定 token_class_uuid 查询 token class
   * @param {*} token_class_uuid  在创建 token class 时返回的 uuid
   */
  fnGetTokenClassByTokenClassUUID = async (token_class_uuid?: string) => {
    const method = "GET";
    const endpoint = `${API_VERSION}/token_classes/${token_class_uuid}`;
    return await fnMiBaoRequest(method, endpoint);
  };

  /*********************  铸造并分发 NFT token *************************/
  /**
   * 铸造并分发秘宝
   * @param {*} token_class_uuid 设计秘宝时返回的 token class uuid
   * @param {*} addresses 一个由 ckb 地址组成的列表:[ add1 , add2 ]
   */
  async fnDistributeToken(token_class_uuid: string, addresses: string[]) {
    const method = "POST";
    const endpoint = `${API_VERSION}/token_classes/${token_class_uuid}/tokens`;
    const content = { addresses };
    const res = await fnMiBaoRequest(method, endpoint, JSON.stringify(content));
    return res;
  }

  /**
   * 通过 token_uuid 查询 token 详情
   * @param token_uuid string, required: 每个 token 对应的 token_uuid，在铸造并分发时会返回对应的 token_uuid
   */
  async fnGetTokenInfoByTokenUUID(token_uuid: string) {
    const method = "GET";
    const endpoint = `${API_VERSION}/tokens/${token_uuid}`;
    const res = await fnMiBaoRequest(method, endpoint);
    return res;
  }

  /**
   * 根据 token_class_uuid 查询对应的所有 token
   * @param token_class_uuid
   */
  async fnGetTokenInfosByClassUUID(token_class_uuid: string) {
    const method = "GET";
    const endpoint = `${API_VERSION}/indexer/token_classes/${token_class_uuid}/tokens`;
    const res = await fnMiBaoRequest(method, endpoint);
    return res;
  }

  /**
   * 根据 通过 nft_type_args 查询 token
   * @param nft_type_args string, required: token 对应的 CKB cell 的 type script 的 args 值
   */
  async fnGetTokenInfoByTypeArgs(nft_type_args: string) {
    const method = "GET";
    const endpoint = `${API_VERSION}/indexer/tokens/${nft_type_args}`;
    const res = await fnMiBaoRequest(method, endpoint);
    return res;
  }

  /*********************  持有人相关查询接口 *************************/
  /**
   * 根据 token_uuid 查询该 token 的持有人地址
   * @param token_uuid string, required: 查询 token 的 token_uuid
   */
  async fnGetAddressByToken(token_uuid: string) {
    const method = "GET";
    const endpoint = `${API_VERSION}/tokens/${token_uuid}/address`;
    const res = await fnMiBaoRequest(method, endpoint);
    return res;
  }
  /**
   * 查询持有人地址所持有的所有 token
   * @param address string, required: 持有人的 ckb 地址
   */
  async fnGetTokenByAddress(address: string) {
    const method = "GET";
    const endpoint = `${API_VERSION}/indexer/holder_tokens/${address}`;
    const res = await fnMiBaoRequest(method, endpoint);
    return res;
  }
  /*********************  转让交易 *************************/

  /**
   * 生成未签名的原始交易
   * @param from_address string, required: token 收藏者的地址，同时也是需要对生成交易签名的私钥的持有者；
   * @param to_address string, required: 转让的目标地址，一旦转让交易广播成功，交易将无法撤回；
   * @param token_uuid string, option: 要转让 token 的 token_uuid;
   */
  async fnTransferTokenNew(
    from_address: string,
    to_address: string,
    token_uuid: string
  ) {
    const method = "GET";
    const endpoint = `${API_VERSION}/tx/token_transfers/new?from_address=${from_address}&to_address=${to_address}&token_uuid=${token_uuid}`;
    const res = await fnMiBaoRequest(method, endpoint);
    return res;
  }

  /**
   *
   * @param from_address string, required: token 收藏者的地址，同时也是需要对生成交易签名的私钥的持有者；
   * @param to_address string, required: 转让的目标地址，一旦转让交易广播成功，交易将无法撤回；
   * @param signed_tx string, required: 签名完成的交易字符串
   * @param token_uuid string, option: 要转让 token 的 token_uuid;
   * @returns
   */
  async fnTransfer(
    from_address: string,
    to_address: string,
    signed_tx: string,
    token_uuid: string
  ) {
    const method = "POST";
    const endpoint = `${API_VERSION}/tx/token_transfers`;
    const content = { from_address, to_address, token_uuid, signed_tx };
    const res = await fnMiBaoRequest(method, endpoint, content);
    return res;
  }

  /**
   * 查询交易状态
   * @param tx_uuid string, required: 交易的 tx_uuid
   */
  async fnGetTransferByTxUUID(tx_uuid: string) {
    const method = "GET";
    const endpoint = `${API_VERSION}/tx/token_transfers/${tx_uuid}`;
    const res = await fnMiBaoRequest(method, endpoint);
    return res;
  }
}
