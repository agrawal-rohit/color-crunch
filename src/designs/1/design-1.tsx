import React from "react";
import { TinyColor } from "@ctrl/tinycolor";
import "./design-1.css";

type DesignOneProps = {
  palette: Array<number>;
};

const DesignOne: React.FC<DesignOneProps> = ({ palette }) => {
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
      className="design1 anima-screen"
      style={{ backgroundColor: backgroundcolor, borderRadius: "8px" }}
    >
      <div
        className="rectangle-20-cae4059f-a14f-4b95-949a-968fa3d38346-dlxBTZ"
        style={{ backgroundColor: backgroundcolor }}
      ></div>
      <div
        className="rectangle-15-156308b6-e1fa-49de-9ce1-7de363dc99b0-9gSn13"
        style={{ backgroundColor: surfacecolor }}
      ></div>
      <div
        className="heading-1-27a9081b-85d2-41a0-991e-ab59acb15121-mxSMA6"
        style={{ color: maintextcolor }}
      >
        Heading 1
      </div>
      <div
        className="at-vero-eos-et-accusam-et-justo-duo-dolores-et-ea-rebum-stet-clita-kasd-gubergren-no-sea-takimata-sanctus-est-lorem-ipsum-dolor-sit-amet-lorem-ipsum-dolor-sit-amet-consetetur-sadipscing-elitr-sed-diam-nonumy-eirmod-tempor-invidunt-ut-labore-et-dolore-00ede9c5-63fe-477b-b842-be4991e0c75d-J8PQlZ"
        style={{ color: maintextcolor }}
      >
        <span className="span0-J8PQlZ" style={{ color: maintextcolor }}>
          At vero eos et accusam et justo duo dolores et ea rebum.{" "}
        </span>
        <span className="span1-J8PQlZ" style={{ color: maintextcolor }}>
          Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum
          dolor sit amet.
          <br />
        </span>
        <span className="span2-J8PQlZ" style={{ color: maintextcolor }}>
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
          nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
          sed diam voluptua.
        </span>
      </div>
      <div
        className="sub-heading-1-78817dbb-6037-46db-9a9d-21ce9336c752-TslZc4"
        style={{ color: maintextcolor }}
      >
        Sub Heading 1
      </div>
      <div
        className="this-is-my-quote-but-don-t-quote-me-on-it-a5899971-1119-47ff-8282-ba384900ceea-pCdX8C"
        style={{ color: maintextcolor }}
      >
        This is my Quote, but don't quote me on it
      </div>
      <div
        className="rectangle-16-16b739b0-bfea-429d-bb0d-86c0ef157c52-qFm7IZ"
        style={{ backgroundColor: accentcolor }}
      ></div>
      <div
        className="rohit-agrawal-43af3d2c-116b-4144-95ab-b0c5310c754b-O2qZpR"
        style={{ color: maintextcolor }}
      >
        Rohit Agrawal
      </div>
      <div
        className="rectangle-23-0d70aa62-4bba-445f-b11b-0d8cf496250a-SazTEB"
        style={{ backgroundColor: primarycolor }}
      ></div>
      <div
        className="learn-more-86ab24c2-e85c-45bd-bf89-26f3915967d1-mZj3ov"
        style={{ color: buttontextcolor }}
      >
        Learn More
      </div>
    </div>
  );
};

export default DesignOne;
