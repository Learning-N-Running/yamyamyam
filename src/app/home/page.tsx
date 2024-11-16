"use client";

import styled from "styled-components";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import HomeSearchBar from "@/components/common/HomeSearchBar";
import InteractionButtons from "./InteractionButtons";
import InfoTab from "./InfoTab";
import SlideUpModal from "@/components/base/SlideUpModal";
import CalendarInput from "@/components/base/CalendarInput";
import Modal from "@/components/common/Modal";
import { LongOrangeButton } from "@/components/base/LongOrangeButton";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { getSigner } from "@dynamic-labs/ethers-v6";
import { Contract, defaultPath, parseEther } from "ethers";
import colors from "@/styles/color";
import { Heading2 } from "@/styles/texts";

export default function Home() {
  const [isStartingModalOpen, setIsStartingModalOpen] = useState(true);

  // const [isSlideUpModalOpen, setIsSlideUpModalOpen] = useState(false);
  // const [isDepositPopUpModalOpen, setIsDepositPopUpModalOpen] = useState(false);
  // const [isCompletePopUpModalOpen, setIsCompletePopUpModalOpen] =
  //   useState(false);
  // const [isPersonClicked, setIsPersonClicked] = useState(false);
  // const [isTimeClicked, setIsTimeClicked] = useState(false);
  // const [isGoDown, setIsGoDown] = useState(false);

  // const router = useRouter();
  // const { primaryWallet } = useDynamicContext();

  // const [txHash, setTxHash] = useState("");
  // const onPayment = async () => {
  //   if (!primaryWallet) return;
  //   const signer = await getSigner(primaryWallet);
  //   const reservationCtrt = new Contract(
  //     "0x6657eaf193969b6b8470a1C13964BaE9097D0E10",
  //     ["function makeReservation() external payable"],
  //     signer
  //   );
  //   setIsDepositPopUpModalOpen(false);
  //   setIsCompletePopUpModalOpen(true);

  //   const tx = await reservationCtrt.makeReservation({
  //     value: parseEther("40"),
  //   });

  //   await tx.wait();

  //   setTxHash(tx.hash);
  // };

  const [mapImageNumber, setMapImageNumber] = useState(1);

  const router = useRouter(); // useRouter 훅 사용

  const mapImage = () => {
    switch (mapImageNumber) {
      case 2:
        return "/images/yy_home_map2.png";
      case 3:
        return "/images/yy_home_map3.png";
      default:
        return "/images/yy_home_map1.png";
    }
  };

  return (
    <>
      <Container>
        <HomeSearchBar />
        <FullscreenImage
          src={mapImage()}
          alt="map1"
          layout="fill" /* Next.js Image를 화면 전체로 확장 */
          priority /* 초기 렌더링에서 이미지 우선 로드 */
          onClick={() => {
            if (mapImageNumber !== 3) {
              setMapImageNumber(mapImageNumber + 1);
            } else {
              setMapImageNumber(1);
            }
          }}
        />
        <LocationButton
          onClick={() => {
            router.push("/profile/angie"); // 이동하려는 경로로 라우팅
          }}
        >
          <Image
            src="/images/yy_location_button.svg"
            width={24}
            height={24}
            alt="location"
          />
        </LocationButton>
      </Container>

      <Modal
        onClose={() => setIsStartingModalOpen(false)}
        isOpen={isStartingModalOpen}
        description=""
        buttonText={"close"}
        buttonOnClick={() => {
          setIsStartingModalOpen(false);
        }}
      >
        <ModalContainer>
          <div
            style={{ width: "100%", display: "flex", justifyContent: "center" }}
          >
            <Image
              src="/images/yy_starting_modal.svg"
              alt="starting Modal"
              width={320}
              height={200}
            />
          </div>
          <h1
            style={{
              fontFamily: "Galindo",
              fontSize: "28px",
              textAlign: "center",
            }}
          >
            Based on your profile,
            <br />
            {"we've found other Foodies like you."}
          </h1>
        </ModalContainer>
      </Modal>
    </>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden; /* 이미지가 넘어가지 않도록 설정 */
`;

const WhiteButton = styled.div`
  width: 100%;
  height: 64px;

  background-color: white;
  color: ${colors.primary};

  font-weight: 600;
  font-size: 20px;
  font-family: SFPro;

  border: 1px solid gray;
  border-radius: 100px;
  cursor: pointer;

  margin-bottom: 8px;

  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;

  &:hover {
    background-color: #f0f0f0;
  }
  &:active {
    background-color: #d9d9d9; /* 클릭 시 조금 더 어두운 색상 */
  }
`;

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

const FullscreenImage = styled(Image)`
  object-fit: cover; /* 이미지가 왜곡 없이 화면에 맞게 채워짐 */
  width: 100%;
  height: 100%;
`;

const LocationButton = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 50%;

  position: absolute;
  right: 24px;
  bottom: 100px;
  z-index: 2;

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: ${colors.white};

  &:hover {
    background-color: #f2f2f2; /* 약한 회색 */
  }

  &:active {
    background-color: #e0e0e0; /* hover보다 약간 진한 회색 */
  }
`;
