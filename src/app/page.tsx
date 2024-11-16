"use client";

import Image from "next/image";
import styled from "styled-components";
import LoginButton from "@/components/common/LoginButton";
import { Body2Regular, Heading1, Heading2, Heading3 } from "@/styles/texts";
import { useRouter } from "next/navigation";
import colors from "@/styles/color";
import "./button.css";

export default function HomeBeforeLogin() {
  const router = useRouter();
  return (
    <Container>
      <Image
        src="/images/yy_beforelogin_logo.svg"
        alt={"logo"}
        width={846}
        height={557}
      />
      <LoginButton />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${colors.white};
  height: 100%;
  padding: 100px 0 25px 0;
`;
