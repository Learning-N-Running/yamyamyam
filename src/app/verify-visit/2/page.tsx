"use client";
import { useEffect, useRef, useState } from "react";
import { styled } from "styled-components";
import { LongOrangeButton } from "@/components/base/LongOrangeButton";
import { useRouter } from "next/navigation";
import colors from "@/styles/color";
import Image from "next/image";
import Modal from "@/components/common/Modal";

export default function VerifyVisit_2() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isFileUpload, setIsFileUpload] = useState(false);
  const [isPopupModalOpen, setIsPopupModalOpen] = useState(false);

  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // 이미지 클릭 시 파일 선택창을 엽니다.
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]; // 선택된 파일을 가져옵니다.
    if (file) {
      console.log("Selected file:", file);
      // 파일 업로드 로직을 여기에 추가할 수 있습니다.
      setIsFileUpload(true);
    }
  };

  return (
    <>
      <Container>
        {isFileUpload ? (
          <>
            <Image
            src="/images/yy_verify_visit_2.svg"
            width={768}
            height={699}
            alt="verify"
            onClick={handleImageClick} // 이미지를 클릭하면 파일 선택창이 열리게 설정
            style={{ marginTop: "30px", marginBottom: "30px" }}
          />
          <Image
          src="/images/yy_verify_visit_2_content.svg"
          width={768}
          height={699}
          alt="verify"
          onClick={handleImageClick} // 이미지를 클릭하면 파일 선택창이 열리게 설정
          style={{ marginTop: "30px", marginBottom: "30px" }}
        />
        </>
        ) : (
          <>
            <Image
              src="/images/yy_verify_2.svg"
              width={768}
              height={699}
              alt="verify"
              onClick={handleImageClick} // 이미지를 클릭하면 파일 선택창이 열리게 설정
              style={{ marginTop: "30px", marginBottom: "30px" }}
            />
            <input
              type="file"
              accept="image/*,video/*" // 이미지와 비디오 파일만 선택할 수 있게 설정
              style={{ display: "none" }} // 숨겨진 파일 입력창
              ref={fileInputRef}
              onChange={handleFileChange} // 파일 선택 시 동작
            />


          </>
        )}
        <div style={{ width: "100%", padding: "0 24px" }}>
          <LongOrangeButton
            active={isFileUpload}
            onClick={() => {
              setIsPopupModalOpen(true);
            }}
          >
            Next
          </LongOrangeButton>
        </div>
      </Container>

      <Modal
        onClose={() => setIsPopupModalOpen(false)}
        isOpen={isPopupModalOpen}
        description={"You've earned reward"}
        buttonText={"Go to my profile"}
        buttonOnClick={() => {
          router.push("/mypage");
        }}
      >
        <ModalContainer>
          <Image
            src="/images/yy_review_complete.svg"
            width={320}
            height={178}
            alt="profile created"
            style={{ marginBottom: "-30px" }}
          />
          <h1
            style={{
              fontFamily: "Galindo",
              fontSize: "28px",
              marginBottom: "-8px",
            }}
          >
            {"Your review is now live!"}
          </h1>
        </ModalContainer>
      </Modal>
    </>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  overflow: auto; /* 부모 요소가 스크롤을 허용하도록 설정 */
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

const SearchContainer = styled.div`
  width: 720px;
  z-index: 10;

  margin: 24px 0 16px 0;

  display: flex;
  align-items: center;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 13px 24px 12px 50px; /* 아이콘을 위한 패딩 */
  border: none;
  border-radius: 100px;
  background-color: ${colors.grey1}; /* 흰색 배경에 투명도 28% */

  color: black;
  font-family: SFPro;
  font-weight: 400;
  font-size: 15px;
  backdrop-filter: blur(10px); /* 배경 블러 효과 */

  &::placeholder {
    color: #8e8e8e; /* placeholder 텍스트 색상 및 투명도 */
  }
`;

const StyledTextArea = styled.textarea`
  width: 100%;
  height: 121px;
  padding: 24px 24px 0 24px;

  font-family: SFPro;
  font-weight: 400; //Regular
  font-size: 17px;
  color: black;

  &::placeholder {
    color: ${colors.grey5};
  }
`;

const FooterWrapper = styled.div`
  width: 100%;
  padding: 0px 24px 24px 24px;
  position: fixed;
  z-index: 10;

  bottom: 0px;
  left: 0px;
`;
