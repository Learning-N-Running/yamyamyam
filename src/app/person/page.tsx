"use client";
import { useEffect, useState } from "react";
import { styled } from "styled-components";
import { LongOrangeButton } from "@/components/base/LongOrangeButton";
import { useRouter } from "next/navigation";
import { signContract } from "@/lib/sign/sign-contract";
// import { useGetSigner } from "@/lib/sign/useGetSigner";
import Modal from "@/components/common/Modal";
import colors from "@/styles/color";
import Image from "next/image";

export default function Taste() {
  const router = useRouter();
  const [isClicked, setIsClicked] = useState(false);
  const [tasteNumber, setTasteNumber] = useState(1);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const onSignContract = async () => {
    setIsModalOpen(true);
  };
  const onCloseModal = () => {
    setIsModalOpen(false);
    router.push("/home");
  };

  const tasteChoice = () => {
    switch (tasteNumber) {
      case 2:
        return "/images/yy_person_2.png";
      case 3:
        return "/images/yy_person_3.png";
      default:
        return "/images/yy_person_1.png";
    }
  };

  return (
    <>
      <Container>
        <Modal
          onClose={onCloseModal}
          isOpen={isModalOpen}
          description={"Welcome!/Start your own gourmet journey on the map."}
          buttonText={"Go to home"}
          buttonOnClick={() => {
            router.push("/home");
          }}
        >
          <ModalContainer>
            <Image
              src="/images/yy_profile_created.svg"
              width={228}
              height={192}
              alt="profile created"
              style={{ marginBottom: "16px" }}
            />
            <h1 style={{ fontFamily: "Galindo", fontSize: "28px" }}>
              {"Profile Created"}
            </h1>
          </ModalContainer>
        </Modal>
        <div
          style={{
            fontSize: "28px",
            fontFamily: "Galindo",
          }}
        >
          What kind of person are you?
        </div>
        <Image
          src={tasteChoice()}
          alt="person choice"
          width={720}
          height={592}
          style={{ marginTop: "40px" }}
          onClick={() => setTasteNumber(tasteNumber + 1)}
        />
        <FooterWrapper>
          <LongOrangeButton active={true} onClick={() => setIsModalOpen(true)}>
            {"Let’s get started!"}
          </LongOrangeButton>
        </FooterWrapper>
      </Container>
    </>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  overflow: auto; /* 부모 요소가 스크롤을 허용하도록 설정 */
  padding: 24px 24px 0px 24px;
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

const NicknameInput = styled.input`
  width: 100%;
  height: 52px;
  padding: 0px 17px;

  border: 1px solid ${colors.grey2};

  font-size: 17px;
  font-weight: 400;
  color: ${colors.grey6};
`;

const CountryInput = styled.input`
  width: 100%;
  height: 52px;
  padding: 0px 17px;

  border: 1px solid ${colors.grey2};

  font-size: 17px;
  font-weight: 400;
  color: ${colors.grey6};
`;

const BioInput = styled.textarea`
  width: 100%;
  height: 200px;
  padding: 0px 17px;

  border: 1px solid ${colors.grey2};

  font-size: 17px;
  font-weight: 400;
  color: ${colors.grey6};
`;

const FooterWrapper = styled.div`
  width: 100%;
  padding: 0px 24px 24px 24px;
  position: fixed;
  z-index: 10;

  bottom: 0px;
  left: 0px;
`;
