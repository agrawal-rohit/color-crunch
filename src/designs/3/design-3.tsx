import React from "react";
import { TinyColor } from "@ctrl/tinycolor";
import ellipseImg from "./img/ellipse-9@1x.png";
import maskImage from "./img/mask-group-1@1x.png";
import "./design-3.css";

type DesignThreeProps = {
  palette: Array<number>;
};

const DesignThree: React.FC<DesignThreeProps> = ({ palette }) => {
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
      className="design3 anima-screen"
      style={{ backgroundColor: backgroundcolor, borderRadius: "8px" }}
    >
      <div
        className="rectangle-22-3bfad77e-2e13-4cfa-951d-a8ae7e227a00-2xiSn4"
        style={{ backgroundColor: backgroundcolor }}
      ></div>
      <div
        className="rectangle-15-24d3e582-57cf-440b-9eff-4f9c44d9c16d-x1pnWW"
        style={{ backgroundColor: surfacecolor }}
      ></div>
      <div
        className="rectangle-12-fcba7590-fad7-4796-a20e-5ff2a473cb9a-5Obp4F"
        style={{ backgroundColor: primarycolor }}
      ></div>
      <div
        className="anna-ccaba32f-f56b-4984-b66b-1727ccf8f0ff-L3y36H font-class-1"
        style={{ color: maintextcolor }}
      >
        Anna
      </div>
      <div
        className="lorem-ipsum-dolor-sit-amet-consetetur-sadipscing-elitr-sed-diam-nonumy-eirmod-2dc8aea4-4c03-4cf4-afda-a04893aa3dac-lWhCXt font-class-1"
        style={{ color: buttontextcolor }}
      >
        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
        eirmod
      </div>
      <div
        className="a18-12-2caf8878-29b7-462f-a6ac-9195b58e3209-Z9lFEs font-class-1"
        style={{ color: buttontextcolor }}
      >
        18:12
      </div>
      <div
        className="rectangle-14-4bac8d1c-6e53-4b57-8bdc-adeedf95c40f-5NRWqO"
        style={{ backgroundColor: accentcolor }}
      ></div>
      <div
        className="lorem-ipsum-dolor-sit-amet-consetetur-sadipscing-elitr-sed-diam-nonumy-eirmod-d14fbfc6-6539-411f-9dee-03c28ce4df9b-yNxqgH font-class-1"
        style={{ color: buttontextcolor }}
      >
        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
        eirmod
      </div>
      <div
        className="a18-14-f40d60ec-d88f-464a-bbae-cdc4f148f129-7Ai91s font-class-1"
        style={{ color: buttontextcolor }}
      >
        18:14
      </div>
      <img
        src={ellipseImg}
        className="ellipse-9-efc065d8-08cc-4af7-a730-41125bec6283-xDAY6G"
        alt="ellipse-9"
      />
      <div
        className="rick-827be4e7-5703-41d2-ada6-7292e0971b34-TDIHzO font-class-1"
        style={{ color: maintextcolor }}
      >
        Rick
      </div>
      <div
        className="rectangle-19-716797bb-82f2-42e4-8c9d-97436f33ecd3-GTs7so"
        style={{ backgroundColor: primarycolor }}
      ></div>
      <div
        className="lorem-ipsum-dolor-sit-amet-consetetur-sadipscing-elitr-sed-diam-nonumy-eirmod-tempor-invidunt-ut-labore-et-dolore-magna-aliquyam-erat-sed-diam-voluptua-at-vero-eos-et-accusam-et-justo-duo-dolores-et-ea-rebum-stet-clita-kasd-gubergren-no-sea-takimata-d899af39-3572-4680-a04c-c4a5d64935e0-Ul3RvB font-class-1"
        style={{ color: buttontextcolor }}
      >
        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
        eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
        voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet
        clita kasd gubergren, no sea takimata sanctus
      </div>
      <div
        className="a18-12-4ca42922-1aa2-4b92-9026-60ad1df06f07-RE2S2U font-class-1"
        style={{ color: buttontextcolor }}
      >
        18:12
      </div>
      <div
        className="anna-35653c9e-ab35-4910-ac39-5d5b6e7b440f-Yi1YmB font-class-1"
        style={{ color: maintextcolor }}
      >
        Anna
      </div>
      <img
        src={maskImage}
        className="mask-group-1-0eb1d52e-ba7e-45c3-b689-84fce5cf7296-aziY8P anima-flexbox-container"
        alt="mask-group-1"
      />
      <img
        src={maskImage}
        className="mask-group-2-476eb508-d9cb-4fc0-be7d-7c0c5204c28a-tUzLaq anima-flexbox-container"
        alt="mask-group-2"
      />
    </div>
  );
};

export default DesignThree;
