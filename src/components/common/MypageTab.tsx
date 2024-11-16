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
      name: "Visited NFT",
      icon: "/images/yy_nft_icon.svg",
      activeIcon: "/images/yy_clicked_nft_icon.svg",
    },
  ];

  return (
    <>
      <div className="flex flex-row justify-center px-4">
        {tabs.map((tab, index) => (
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
        {activeTab === "Visited NFT" && <NFTContent />}
      </div>
    </>
  );
}

const MapContent = () => {
  return (
    <div className="flex items-center justify-center">
      <Image
      src={"/images/yy_mypage_map_content.svg"}
      alt="map"
      width={770}
      height={498}
      style={{ cursor: "pointer", margin: "16px"}}
      />
    </div>
  );
}

const NFTContent = () => {
  return (
    <div className="flex flex-wrap justify-start max-w-[768px] mx-auto">
      {[...Array(4)].map((_, index) => (
        <div key={index} className="p-2 w-1/3 flex justify-center">
          <Image
            src="/images/yy_mypage_nft_content.svg"
            alt={`nft-${index}`}
            width={234}
            height={275}
            style={{ cursor: "pointer" }}
          />
        </div>
      ))}
    </div>
  );
};
