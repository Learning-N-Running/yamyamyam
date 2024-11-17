"use client";
import {
  ChatView,
  ChatUIProvider,
  darkChatTheme,
  MODAL_POSITION_TYPE,
  lightChatTheme,
} from "@pushprotocol/uiweb";
import { ethers, JsonRpcProvider } from "ethers";
import Image from "next/image";

export default function Vegeterian() {
  return (
    <Image src={"/images/yy_chat.png"} alt={"chat"} width={768} height={1024} />
  );
}
