"use client";

import styled, { keyframes } from "styled-components";
import Footer from "@/layout/Footer";
import Image from "next/image";
import AngieTab from "@/components/common/AngieTap";
import { useState, useEffect, Dispatch, SetStateAction } from "react";
import colors from "@/styles/color";
import { Body2Semibold } from "@/styles/texts";
import SlideUpModal from "@/components/base/SlideUpModal";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { getWeb3Provider, getSigner } from "@dynamic-labs/ethers-v6";
import { ethers, parseEther, Contract } from "ethers";
// import WithdrawABI from "../../abis/wtihdraw.json";
import { withdrawAddress } from "@/lib/constants";
import { useRouter } from "next/navigation";
import * as react from "next-auth/react";
import { signIn } from "next-auth/react";

export default function Mypage() {
  const [activeTab, setActiveTab] = useState("Map");
  const [coinClick, setCoinClick] = useState(0);
  const [isCreator, setIsCreator] = useState(false);
  const [isSlideUpModalOpen, setIsSlideUpModalOpen] = useState(true);
  const [txHash, setTxHash] = useState("");

  const onWithdraw = async () => {
    if (!primaryWallet) return;
    const signer = await getSigner(primaryWallet);
    const visitorCtrt = new Contract(
      "0xCA5802F9B1A72e47bce75AAc85D005fB3e1a584f",
      ["function withdrawCtrt(address payable user) external"],
      signer
    );

    const tx = await visitorCtrt.withdrawCtrt(await signer.getAddress());

    await tx.wait();

    setTxHash(tx.hash);
  };

  const router = useRouter();

  const { primaryWallet } = useDynamicContext();

  const authWorldCoin = async () => {
    const res = await react.signIn("worldcoin"); // when worldcoin is the only provider
  };

  const withdraw = async () => {
    const provider = await getWeb3Provider(primaryWallet!);
    const signer = await getSigner(primaryWallet!);
    const creatorWallet = await signer.getAddress();
    console.log(creatorWallet);

    // let WithdrawContract = new ethers.Contract(
    //   withdrawAddress,
    //   WithdrawABI,
    //   signer
    // );
  };

  const authWorldID = async () => {
    const res = await react.signIn("worldcoin"); // when worldcoin is the only provider
  };

  return (
    <>
      <div className="bg-white">
        <nav
          className="flex items-center space-x-4 justify-end"
          style={{ width: "100%", height: "65px" }}
        >
          <Goback
            src="/images/hs_goback.svg"
            alt="go back"
            width={24}
            height={24}
          />
        </nav>
        <Profile title="Angie" src="/images/yy_angie_profile.svg" />
        <AngieTab
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          coinClick={coinClick}
        />

        <Footer />
      </div>
      <SlideUpModal
        isOpen={isSlideUpModalOpen}
        onClose={() => setIsSlideUpModalOpen(false)}
      >
        <div 
        className="flex flex-col items-center justify-center"
        style={{ width: "100%", marginTop: "64px" }}>
          <Image
            src="/images/yy_angie_modal.svg"
            alt="slide up modal"
            width={720}
            height={867}
            style={{ cursor: "pointer" }}
            className="mb-10"
          />
          <Image
            src="/images/yy_angie_modal_status.svg"
            alt="close button"
            width={728}
            height={313}
            style={{ cursor: "pointer" }}
            className="mb-16"
            onClick={() => router.push("/verify-visit/1")}
          />
        </div>
      </SlideUpModal>
    </>
  );
}

const Profile = ({ title, src }: { title: string; src: string }) => {
  const [isFollowed, setIsFollowed] = useState(false);

  const handleFollowClick = () => {
    setIsFollowed(!isFollowed);
  };

  return (
    <div className="flex flex-col items-start justify-center">
      <div className="flex flex-row items-center justify-start ml-8">
        <Image
          className="rounded-full"
          src={src}
          alt="my page profile"
          width={126}
          height={126}
        />
        <div className="flex flex-col items-start justify-center ml-4">
          <h2 className="mt-4 text-3xl font-bold">{title}</h2>
          <div className="flex flex-row  mt-2">
            <Image
              className="mr-1"
              src="/images/yy_angie_following_state.svg"
              alt="user_check"
              width={297}
              height={20}
            />
          </div>
          <div className="flex flex-row items-start justify-center mt-3">
            <Image
              className="mr-1 cursor-pointer"
              src={
                isFollowed
                  ? "/images/yy_clicked_follow.svg"
                  : "/images/yy_follow_button.svg"
              }
              alt="follow_button"
              width={150}
              height={44}
              onClick={handleFollowClick}
            />
            <Image
              className="mr-1 cursor-pointer"
              src="/images/yy_message_button.svg"
              alt="message_button"
              width={150}
              height={44}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center">
        <Image
          className="mt-6 mb-2"
          src="/images/yy_mypage_detail.png"
          alt="profile details"
          width={704}
          height={66}
        />
      </div>
      <div
        className="flex flex-row items-center justify-between "
        style={{ width: "100%", padding: "0 24px" }}
      >
        <Image
          className="cursor-pointer"
          src="/images/yy_angie_nft_button.svg"
          alt="profile details"
          width={356}
          height={65}
        />
        <Image
          src="/images/yy_angie_usdc_button.svg"
          alt="profile details"
          width={356}
          height={65}
          style={{ cursor: "pointer" }}
        />
      </div>
    </div>
  );
};

const CreatorBar = ({
  coinClick,
  withdraw,
}: {
  coinClick: number;
  withdraw: any;
}) => {
  const coinNum = () => {
    if (coinClick === 1) {
      return 95.5;
    } else if (coinClick == 2) {
      return 100.1;
    } else return 90.0;
  };

  return (
    <div
      style={{
        width: "100%",
        padding: "0px 24px",
        position: "fixed",
        bottom: "80px ",
      }}
    >
      <div
        className="flex bg-[#FAFAFB] p-4 w-full"
        style={{ borderRadius: "8px", display: "flex", alignItems: "center" }}
      >
        <div>
          <p className="ml-3 p-1 flex flex-row text-[#FF7700]">
            {" "}
            <Image
              className="mr-1"
              src="/images/warn_icon.svg"
              alt="Warning icon"
              width={12}
              height={12}
            />{" "}
            Minimum 100 FLOW required to withdraw.
          </p>
          <p className="flex flex-row font-medium ml-4 text-xl">
            Total Rewards Earned:{" "}
            <Image
              className="ml-2"
              src="/images/hs_flow_logo.svg"
              alt="flow"
              width={20}
              height={20}
              style={{ marginRight: "6px" }}
            />{" "}
            <b>{coinNum().toFixed(2)}</b>
          </p>
        </div>
        <button
          className={`fixed top-50 right-16 text-xl px-6 py-3 rounded-3xl ${
            coinNum() >= 100
              ? "bg-[#FF5924] text-white hover:bg-orange-500"
              : "bg-gray-300 text-white cursor-not-allowed"
          }`}
          disabled={coinNum() < 100}
          onClick={() => {
            withdraw();
          }}
        >
          Withdraw
        </button>
      </div>
    </div>
  );
};

const Goback = styled(Image)`
  cursor: pointer;
  position: absolute;
  left: 26px;
  top: 21px;
`;
