import React, { Component } from "react";
import "./model-preview.less";
import loadingGif from "/image/loading.gif";
import gltf from "/model/model.gltf?url";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "model-viewer": React.DetailedHTMLProps<any, any>;
    }
  }
}

export default class ModelPreview extends Component {
  render() {
    return (
      <div className="model-preview">
        <model-viewer
          class="model-viewer-class"
          id="reveal"
          // reveal="interaction"
          loading="eager"
          camera-controls
          auto-rotate
          src={gltf}
          ar-modes="webxr scene-viewer quick-look"
          // environment-image="shared-assets/environments/moon_1k.hdr"
          seamless-poster
          shadow-intensity="1"
        >
          <div className="model-loading" slot="poster">
            <img className="model-loading-gif" src={loadingGif} alt="" />
          </div>
        </model-viewer>
      </div>
    );
  }
}
