import React from "react";
import { TinyColor } from "@ctrl/tinycolor";
import "./design-2.css";

type DesignTwoProps = {
  palette: Array<number>;
};

const DesignTwo: React.FC<DesignTwoProps> = ({ palette }) => {
  const primarycolor = new TinyColor({
    r: palette[0],
    g: palette[1],
    b: palette[2],
  }).toHexString();
  const accentcolor = new TinyColor({
    r: palette[3],
    g: palette[4],
    b: palette[5],
  }).toHexString();
  const backgroundcolor = new TinyColor({
    r: palette[6],
    g: palette[7],
    b: palette[8],
  }).toHexString();
  const surfacecolor = new TinyColor({
    r: palette[9],
    g: palette[10],
    b: palette[11],
  }).toHexString();
  const buttontextcolor = new TinyColor({
    r: palette[12],
    g: palette[13],
    b: palette[14],
  }).toHexString();
  const maintextcolor = new TinyColor({
    r: palette[15],
    g: palette[16],
    b: palette[17],
  }).toHexString();

  return (
    <div
      className="design2 anima-screen "
      style={{ backgroundColor: backgroundcolor, borderRadius: "8px" }}
    >
      <div
        className="rectangle-21-0e062ad4-2abf-4f92-9696-6db32d1293d6-u7guqn"
        style={{ backgroundColor: backgroundcolor }}
      ></div>
      <div
        className="rectangle-15-cbac44f4-196a-499f-b8d2-2bde663efe96-82jxJ1"
        style={{ backgroundColor: surfacecolor }}
      ></div>
      <div className="rectangle-5-548d602f-0878-4ef5-83ba-aedcab8e2fa2-6nHq3e"></div>
      <div
        className="rectangle-6-f0690e69-1ba6-48a4-b10c-e415537f1db4-mrwnII"
        style={{ backgroundColor: accentcolor, borderColor: accentcolor }}
      ></div>
      <div
        className="rectangle-8-51a18599-3d08-4d70-b82a-326573f5cba1-KpZvxC"
        style={{ backgroundColor: primarycolor }}
      ></div>
      <div
        className="rectangle-9-c907ec97-22cb-4fa4-95c9-57ff928da43e-gowXta"
        style={{ backgroundColor: accentcolor }}
      ></div>
      <div
        className="rectangle-10-14a6beef-e99e-422c-bc38-0868fa4d4cbf-yFSGge"
        style={{ backgroundColor: surfacecolor, borderColor: maintextcolor }}
      ></div>
      <div
        className="label-1-7ab5f3cb-2459-45df-9a7e-4fa8a1fa1e1c-WGDDMu font-class-1"
        style={{ color: maintextcolor }}
      >
        Label 1
      </div>
      <div
        className="value-for-this-field-d5d50032-c1e7-4e8f-8b63-950032be0973-kmGGde font-class-2"
        style={{ color: maintextcolor }}
      >
        Value for this Field
      </div>
      <div
        className="primary-button-81436a57-f894-4b8d-9622-5cae7d71bac6-0xAlcw font-class-1"
        style={{ color: buttontextcolor }}
      >
        Primary Button
      </div>
      <div
        className="secondary-button-be4c4d1b-9f68-4b57-8542-0d0af91b3dc0-6qhxim font-class-1"
        style={{ color: buttontextcolor }}
      >
        Secondary Button
      </div>
      <div
        className="rectangle-17-5d6ee125-547e-4498-a2a5-6ee0dfa84f86-oz6oAi"
        style={{ backgroundColor: surfacecolor, borderColor: maintextcolor }}
      ></div>
      <div
        className="label-1-65909ff5-b683-4fce-8634-1a2a045fce86-eMl0H8 font-class-1"
        style={{ color: maintextcolor }}
      >
        Label 1
      </div>
      <div
        className="value-for-this-field-277c62c2-88e0-4ff0-933d-d527bd2b3346-C5tSKM font-class-2"
        style={{ color: maintextcolor }}
      >
        Value for this Field
      </div>
      <div
        className="rectangle-18-b0f4aa39-732c-4f1a-b99f-abb234ecefe1-OKh9H5"
        style={{ backgroundColor: surfacecolor, borderColor: maintextcolor }}
      ></div>
      <div
        className="label-1-581dcf90-c2b2-45a9-8c4d-9f23f9788ed4-jv58TB font-class-1"
        style={{ color: maintextcolor }}
      >
        Label 1
      </div>
      <div
        className="value-for-this-field-daff7404-ac5a-4ed6-b81b-b15f0c4ad751-ptllfu font-class-2"
        style={{ color: maintextcolor }}
      >
        Value for this Field
      </div>
    </div>
  );
};

export default DesignTwo;
