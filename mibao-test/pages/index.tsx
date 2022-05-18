import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { Component } from "react";
import axios from "axios";

interface HomeProps {}
interface HomeState {
  createCoverImageUrl: string;
  createRenderer: string;
  createName: string;
  createDescription: string;
  createTotal: string;

  mintTokenClassUUID: string;
  mintCount: number;
  mintAddress: string;

  updateTokenClassUUID: string;
  updateCoverImageUrl: string;
  updateRenderer: string;

  env: "dev" | "pro";
}

export default class MyHome extends Component<HomeProps, HomeState> {
  constructor(props: HomeProps) {
    super(props);
    this.state = {
      createCoverImageUrl:
        "https://oss.jinse.cc/production/0cabb4d9-6e4a-45cb-a04c-95d1c2da4792.jpeg",
      createRenderer:
        "https://oss.jinse.cc/production/40aafe57-891f-4e90-a7df-9850353548cd.gltf",
      createName: "",
      createDescription: "",
      createTotal: "",

      mintTokenClassUUID: "9acca136-823e-4936-9f1e-bd219b942b58",
      mintCount: 1,
      mintAddress: "ckt1qyqvjsyfr4x98csn29pyhpm9z66uz8jcuftsvh2mnc",

      updateTokenClassUUID: "5359ffeb-4162-437a-bc6c-621d411fb3dc",
      updateCoverImageUrl: "",
      updateRenderer: "",

      env: "dev",
    };
  }
  render() {
    return (
      <div>
        <Head>
          <title>Nervape Create NFT From Mibao Open API</title>
        </Head>
        <div>
          <h1>Nervape Mint NFT Demo</h1>
          <h3>From Mibao Open API</h3>

          <div>
            <div>
              <h2>0. 搞点事情</h2>
              <p>
                为了不打破现有nervape后台原有数据结构，需确保‘新增’mNFT数据的meta
                data所指向的文件稳定，即 https://oss.jinse.cc/production/*。
              </p>
              <p>
                0.1 （白嫖）在mibao创作者平台创建cotaNFT，以获取稳定的
                https://oss.jinse.cc/production/* 文件 url
              </p>
              <p>
                0.2（使用）将cotaNFT的封面和3d文件url填入下面：cover_image_url、renderer字段中。
              </p>
              <p>
                0.3（结束）nervape管理后台合并mNFT铸造功能时，此前白嫖的mibao
                oss数据应一并存入s3中。
              </p>
            </div>

            <div>
              <h2>1. 上传图片</h2>
              <p>
                指向 NFT 封面文件 cover_image_url ：
                <input
                  type="text"
                  style={{ width: "450px" }}
                  defaultValue={this.state.createCoverImageUrl}
                  onChange={(event) => {
                    this.setState({
                      createCoverImageUrl: event.target.value,
                    });
                  }}
                />
              </p>

              <p>
                指向 NFT 模型文件 renderer ：
                <input
                  type="text"
                  style={{ width: "450px" }}
                  defaultValue={this.state.createRenderer}
                  onChange={(event) => {
                    this.setState({
                      createRenderer: event.target.value,
                    });
                  }}
                />
              </p>
              <h2>2. 创建模版</h2>

              <p>
                （一旦创建，不可修改）name :{" "}
                <input
                  type="text"
                  style={{ width: "450px" }}
                  defaultValue={this.state.createName}
                  onChange={(event) => {
                    this.setState({
                      createName: event.target.value,
                    });
                  }}
                />
              </p>
              <p>
                （一旦创建，不可修改）description :
                <textarea
                  style={{ width: "450px" }}
                  defaultValue={this.state.createDescription}
                  onChange={(event) => {
                    this.setState({
                      createDescription: event.target.value,
                    });
                  }}
                />
              </p>
              <p>
                （一旦创建，不可修改）total :
                <input
                  type="number"
                  style={{ width: "150px" }}
                  defaultValue={this.state.createTotal}
                  onChange={(event) => {
                    this.setState({
                      createTotal: event.target.value,
                    });
                  }}
                />
              </p>
              <p>
                <button
                  onClick={async () => {
                    console.log("创建mNFT");
                    const result = await axios.post(
                      "http://localhost:3000/api/mibao/create-class",
                      {
                        cover_image_url: this.state.createCoverImageUrl,
                        renderer: this.state.createRenderer,
                        name: this.state.createName,
                        description: this.state.createDescription,
                        total: this.state.createTotal,
                      }
                    );
                  }}
                >
                  创建mNFT
                </button>
              </p>
            </div>

            <div>
              <h2>3. 铸造/分发 NFT</h2>
              <p>
                目标token的uuid: token_class_uuid :
                <input
                  type="text"
                  style={{ width: "450px" }}
                  defaultValue={this.state.mintTokenClassUUID}
                  onChange={(event) => {
                    this.setState({
                      mintTokenClassUUID: event.target.value,
                    });
                  }}
                />
              </p>
              <p>
                目标mint 地址: addresses :
                <input
                  type="text"
                  style={{ width: "450px" }}
                  defaultValue={this.state.mintAddress}
                  onChange={(event) => {
                    this.setState({
                      mintAddress: event.target.value,
                    });
                  }}
                />
              </p>
              <p>
                目标mint 数量: count :
                <input
                  type="number"
                  style={{ width: "450px" }}
                  defaultValue={this.state.mintCount}
                  onChange={(event) => {
                    this.setState({
                      mintCount: Number(event.target.value),
                    });
                  }}
                />
              </p>
              <p>
                <button
                  onClick={async () => {
                    console.log("铸造mNFT");
                    const addresses = [];
                    for (let i = 0; i < this.state.mintCount; ++i) {
                      addresses.push(this.state.mintAddress);
                    }
                    const result = await axios.post(
                      "http://localhost:3000/api/mibao/mint-token",
                      {
                        token_class_uuid: this.state.mintTokenClassUUID,
                        addresses: addresses,
                      }
                    );
                    console.log(result);
                  }}
                >
                  铸造mNFT
                </button>
              </p>
            </div>

            <div>
              <h2>4. 更新 NFT 模版（一个月最多一次）</h2>

              <p>
                更新目标 NFT token_class_uuid ：
                <input
                  type="text"
                  defaultValue={this.state.updateTokenClassUUID}
                  onChange={(event) => {
                    this.setState({
                      updateTokenClassUUID: event.target.value,
                    });
                  }}
                />
              </p>
              <p>
                更新 NFT 封面文件 cover_image_url ：
                <input
                  type="text"
                  defaultValue={this.state.updateCoverImageUrl}
                  onChange={(event) => {
                    this.setState({
                      updateCoverImageUrl: event.target.value,
                    });
                  }}
                />
              </p>
              <p>
                更新 NFT 模型文件 renderer ：
                <input
                  type="text"
                  defaultValue={this.state.updateRenderer}
                  onChange={(event) => {
                    this.setState({
                      updateRenderer: event.target.value,
                    });
                  }}
                />
              </p>
              <p>
                <button
                  onClick={async () => {
                    console.log("更新mNFT");
                    const result = await axios.post(
                      "http://localhost:3000/api/mibao/update-class",
                      {
                        token_class_uuid: this.state.updateTokenClassUUID,
                        cover_image_url: this.state.updateCoverImageUrl,
                        renderer: this.state.updateRenderer,
                      }
                    );
                    console.log(result);
                  }}
                >
                  更新mNFT
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
