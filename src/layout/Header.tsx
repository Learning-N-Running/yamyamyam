import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { styled } from "styled-components";
import { useState } from "react";
import { useSelector } from "react-redux";
import { getProfileImageState } from "@/redux/slice/authSlice";
import { Heading3 } from "@/styles/texts";
import { isAbsolute } from "path";
import colors from "@/styles/color";

const Header = () => {
  const router = useRouter();
  const pathname = usePathname();
  const profileImage = useSelector(getProfileImageState);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  return (
    <>
      {pathname === "/signup" && <Header_Title title="Sign up" />}
      {pathname === "/taste" && <Header_Title title="Sign up" />}
      {pathname === "/person" && <Header_Title title="Sign up" />}
      {pathname === "/verify-visit/1" && (
        <Header_Verify title="1. Verify your visit" />
      )}
      {pathname === "/verify-visit/2" && (
        <Header_Verify title="2. Write your review" />
      )}
      {pathname === "/message" && <Header_Title_Center title="Message" />}
    </>
  );
};

export default Header;

function Header_Title({ title }: { title: string }) {
  return (
    <Container_Header_Title>
      <Goback
        src="/images/hs_goback.svg"
        alt="go back"
        width={24}
        height={24}
        isAbsolute={true}
      />
      <Heading3>{title}</Heading3>
    </Container_Header_Title>
  );
}

function Header_Title_Center({ title }: { title: string }) {
  return (
    <Container_Header_Title>
      <Heading3>{title}</Heading3>
    </Container_Header_Title>
  );
}

function Header_Verify({ title }: { title: string }) {
  return (
    <Container_Header_Verify>
      <Heading3>{title}</Heading3>
      <Close
        src="/images/yy_close.svg"
        alt="close"
        width={32}
        height={32}
        isAbsolute={true}
      />
    </Container_Header_Verify>
  );
}

const Container_Header_Title = styled.div`
  width: 100%;
  height: 65px;

  position: fixed;
  z-index: 10;
  padding: 0 16px;

  display: flex;
  align-items: center;
  justify-content: center;

  background-color: white;
`;

const Container_Header_Verify = styled.div`
  width: 100%;
  height: 65px;

  border-bottom: 3px solid ${colors.primary};

  position: fixed;
  z-index: 10;
  padding: 0 16px;

  display: flex;
  align-items: center;
  justify-content: center;

  background-color: white;
`;

const Container_Conversation = styled.div`
  width: 100%;
  height: 65px;

  position: fixed;
  z-index: 10;
  padding: 0 24px;

  display: flex;
  align-items: center;
  justify-content: center;

  background-color: white;
`;

const Goback = styled(Image)<{ isAbsolute?: boolean }>`
  cursor: pointer;
  position: ${(props) => props.isAbsolute == true && "absolute"};
  left: 26px;
  top: 21px;
`;

const Container_Home = styled.div`
  width: 100%;
  height: 80px;

  position: fixed;
  z-index: 10;

  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 0 24px 0 24px;
`;

const Close = styled(Image)<{ isAbsolute?: boolean }>`
  cursor: pointer;
  position: ${(props) => props.isAbsolute == true && "absolute"};
  right: 24px;
  top: 21px;
`;
