import React, { Dispatch, SetStateAction, useRef, useState } from "react";
import VideoContent from "./VideoContent";
import Image from "next/image";
import { N } from "ethers";

export default function MyPageTab({
  activeTab,
  setActiveTab,
  coinClick,
}: {
  activeTab: string;
  setActiveTab: Dispatch<SetStateAction<string>>;
  coinClick: number;
}) {
  const ColoredLine = () => (
    <hr className="w-full mt-2 h-1 bg-yellow-500 border-none m-0" />
  );

  const tabs = [
    {
      name: "Map",
      icon: "/images/yy_map_icon.svg",
      activeIcon: "/images/yy_clicked_map_icon.svg",
    },
    {
      name: "Collection",
      icon: "/images/yy_collection_icon.svg",
      activeIcon: "/images/yy_clicked_collection.svg",
    },
    {
      name: "NFT",
      icon: "/images/yy_nft_icon.svg",
      activeIcon: "/images/yy_clicked_nft_icon.svg",
    },
  ];

  return (
    <>
      <div className="flex justify-center px-6">
        {tabs.map((tab) => (
          <div
            key={tab.name}
            className={`flex flex-col items-center flex-grow`}
          >
            {" "}
            <div className="flex flex-row items-center justify-center">
              <img
                className="mr-2"
                src={activeTab === tab.name ? tab.activeIcon : tab.icon}
                alt={`${tab.name}_icon`}
                width={24}
                height={24}
              />
              <button
                className={`${
                  activeTab === tab.name ? "text-yellow-500" : "text-gray-500"
                } font-bold text-lg`}
                onClick={() => setActiveTab(tab.name)}
              >
                {tab.name}
              </button>
            </div>
            {activeTab === tab.name && <ColoredLine />}
          </div>
        ))}
      </div>

      <div className="mt-4">
        {activeTab === "Map" && <MapContent />}
        {activeTab === "Collection" && <CollectionContent />}
        {activeTab === "NFT" && <NFTContent />}
      </div>
    </>
  );
}

const MapContent = () => {
  const [mapNumber, setMapNumber] = useState(1);
  const mapImgSrc = () => {
    switch (mapNumber) {
      case 1:
        return "/images/yy_yennie_map_1.png";
      case 2:
        return "/images/yy_yennie_map_2.png";
      case 3:
        return "/images/yy_yennie_map_3.png";
      case 4:
        return "/images/yy_yennie_map_4.png";
      default:
        return "/images/yy_yennie_map_5.png";
    }
  };
  return (
    <div className="flex justify-center">
      <Image
        src={mapImgSrc()}
        alt="map"
        width={721}
        height={759}
        style={{ cursor: "pointer", marginTop: "16px", marginBottom: "50px" }}
        onClick={() => {
          setMapNumber(mapNumber + 1);
        }}
      />
    </div>
  );
};

const CollectionContent = () => {
  return (
    <div className="flex justify-center">
      <Image
        src={"/images/yy_collection_content.svg"}
        alt="collection"
        width={720}
        height={867}
        style={{ cursor: "pointer", marginTop: "16px", marginBottom: "50px" }}
      />
    </div>
  );
};

const NFTContent = () => {
  return (
    <div className="flex flex-wrap justify-start max-w-[720px] mx-auto">
      <Image
        className="mr-2 mb-4"
        src="/images/yy_nft_content_1.svg"
        alt={`nft`}
        width={230}
        height={270}
        style={{ cursor: "pointer", marginBottom: "300px" }}
      />
    </div>
  );
};

// public/images/yy_profile_nft_1.svg
