"use client";
import {
  ChatView,
  ChatUIProvider,
  darkChatTheme,
  MODAL_POSITION_TYPE,
  lightChatTheme,
} from "@pushprotocol/uiweb";
import { ethers, JsonRpcProvider } from "ethers";

export default function Vegeterian() {
  const provider = new JsonRpcProvider("https://rpc.sepolia.mantle.xyz");

  const user = new ethers.Wallet( //contract 소유자가 직접 트랜잭션을 보내야함.
    "29af358852cc0569338b29ba8660f3b619de281bb89dcc1673791182921d5012",
    provider
  );

  return (
    <ChatUIProvider theme={lightChatTheme} signer={user}>
      <ChatView
        chatId="651142ffc80385061aec67df3ce44c5c7f0d4a352340853c8fa05ed8c43616c0"
        limit={10}
        isConnected={false}
        verificationFailModalPosition={MODAL_POSITION_TYPE.RELATIVE}
      />
    </ChatUIProvider>
  );
}
