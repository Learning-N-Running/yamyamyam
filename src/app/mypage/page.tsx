"use client";

import styled, { keyframes } from "styled-components";
import Footer from "@/layout/Footer";
import Image from "next/image";
import MyPageTab from "@/components/common/MypageTab";
import { useState, useEffect, Dispatch, SetStateAction } from "react";
import colors from "@/styles/color";
import { Body2Semibold } from "@/styles/texts";
import SlideUpModal from "@/components/base/SlideUpButtonModal";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { getWeb3Provider, getSigner } from "@dynamic-labs/ethers-v6";
import {
  ethers,
  parseEther,
  Contract,
  AlchemyProvider,
  JsonRpcProvider,
} from "ethers";
import VisitorABI from "../../abis/Visitor_Mantle.json";
import { withdrawAddress } from "@/lib/constants";
import { useRouter } from "next/navigation";
import * as react from "next-auth/react";
import Modal from "@/components/common/Modal";

export default function Mypage() {
  const [activeTab, setActiveTab] = useState("Map");
  const [coinClick, setCoinClick] = useState(0);
  const [isPopupModalOpen, setIsPopupModalOpen] = useState(false);
  const [isIssued, setIsIssued] = useState(false);
  const [nftFoodType, setNftFoodType] = useState("vegetarian");
  const [nftURI, setNftURI] = useState(
    "https://ipfs.io/ipfs/Qma9kSWqQaPXMoMjErX3ZPQ9GkRhGHBqURMn5VaRDHQ1tP"
  );

  const [txHash, setTxHash] = useState("");
  const tokenMintedABI = VisitorABI.find(
    (item) => item.name === "TokenMinted" && item.type === "event"
  );

  const onMintNFT = async () => {
    if (!primaryWallet) return;
    const userAddress = primaryWallet.address;
    // Mantle 전용
    // const provider = new JsonRpcProvider("https://rpc.sepolia.mantle.xyz");

    //Flow EVM 전용
    const provider = new JsonRpcProvider(
      "https://testnet.evm.nodes.onflow.org"
    );

    const ownerSigner = new ethers.Wallet( //contract 소유자가 직접 트랜잭션을 보내야함.
      process.env.NEXT_PUBLIC_PRIVATE_KEY as string,
      provider
    );

    const signer = await getSigner(primaryWallet);
    let visitorCtrt = new ethers.Contract(
      "0xB57b268E0baE4498AA3bff0A61D7f2e6Cd951f15",
      VisitorABI,
      ownerSigner
    );
    const safeMintTx = await visitorCtrt.safeMint(userAddress);

    const receiptSafeMint = await safeMintTx.wait();
    console.log(safeMintTx.hash);
    const ITokenMinted = new ethers.Interface([tokenMintedABI!]);
    const tokenId = Number(
      ITokenMinted.parseLog(receiptSafeMint.logs[1])?.args[1]
    );

    const registerVisitorInfoTx = await visitorCtrt.registerVisitorInfo(
      userAddress,
      nftFoodType,
      nftURI,
      tokenId
    );

    const receiptRegisterVisitorInfoTx = await registerVisitorInfoTx.wait();
    console.log(receiptRegisterVisitorInfoTx);

    // Mantle 전용
    // const blockscoutLink = `https://explorer.sepolia.mantle.xyz/tx/${receiptRegisterVisitorInfoTx.hash}`;

    //Flow EVM 전용
    const blockscoutLink = `https://evm-testnet.flowscan.io/tx/${receiptRegisterVisitorInfoTx.hash}`;

    window.open(blockscoutLink, "_blank", "noopener,noreferrer");

    setActiveTab("NFT");
    setIsPopupModalOpen(false);
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
          style={{ padding: "20px 24px" }}
        >
          <Image
            className="cursor-pointer"
            src="\images\system_icon.svg"
            alt="system icon"
            width={24}
            height={24}
            onClick={() => {
              setIsPopupModalOpen(true);
              setIsIssued(true);
            }}
          />
        </nav>
        <Profile
          title="Yennie"
          src="/images/yy_yennie_profile.svg"
          isIssued={isIssued}
        />
        <MyPageTab
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          coinClick={coinClick}
        />
        <Footer />
      </div>
      <Modal
        onClose={() => setIsPopupModalOpen(false)}
        isOpen={isPopupModalOpen}
        description={
          "You can claim a new NFT by Verifing Vegetarian food 5 times."
        }
        buttonText={"Claim!"}
        buttonOnClick={() => {
          onMintNFT();
        }}
      >
        <ModalContainer>
          <Image
            src="/images/yy_mypage_nft_claim.svg"
            width={220}
            height={222}
            alt="nft claim"
            style={{ marginBottom: "30px" }}
          />
          <h1
            style={{
              fontFamily: "Galindo",
              fontSize: "28px",
              marginBottom: "-8px",
            }}
          >
            {"Congratulations"}
          </h1>
        </ModalContainer>
      </Modal>
    </>
  );
}

const Profile = ({
  title,
  src,
  isIssued,
}: {
  title: string;
  src: string;
  isIssued: boolean;
}) => {
  return (
    <div className="flex flex-col items-start justify-center">
      <div className="flex flex-row items-center justify-start ml-8">
        <Goback
          src="/images/hs_goback.svg"
          alt="go back"
          width={24}
          height={24}
        />
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
              src="/images/user_check.svg"
              alt="user_check"
              width={18}
              height={18}
            />
            <p>
              Following <strong>21</strong>
            </p>
            <Image
              className="ml-4 mr-1"
              src="/images/users.svg"
              alt="users"
              width={18}
              height={18}
            />
            <p>
              Follow <strong>320</strong>
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center">
        <Image
          className="mt-5 mb-5"
          src="/images/yy_yennie_profile_detail.png"
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
          src={
            isIssued
              ? "/images/yy_mypage_nft_button_active.svg"
              : "/images/yy_mypage_nft_button_inactive.svg"
          }
          alt="profile details"
          width={356}
          height={65}
        />
        <Image
          src="/images/yy_mypage_usdc_button.svg"
          alt="profile details"
          width={356}
          height={65}
          style={{ cursor: "pointer" }}
        />
      </div>
    </div>
  );
};

const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  & > h1 {
    font-size: 2rem;
    font-weight: 500;
    margin-bottom: 4px;
  }
  & > h3 {
    font-size: 1.25rem;
    font-weight: 400;
    margin-bottom: 40px;
  }
`;

const Goback = styled(Image)`
  cursor: pointer;
  position: absolute;
  left: 26px;
  top: 21px;
`;
