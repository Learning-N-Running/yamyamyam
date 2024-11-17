"use client";

import { useEffect, useState } from "react";
import { styled } from "styled-components";
import Image from "next/image";
import { PushAPI, CONSTANTS } from "@pushprotocol/restapi";
import { ethers, JsonRpcProvider } from "ethers";
import { getSigner } from "@dynamic-labs/ethers-v6";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { useRouter } from "next/navigation";
import { use } from "matter";

export default function Message() {
  const [tab, setTab] = useState("notification");
  const [createdGroup, setCreatedGroup] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { primaryWallet } = useDynamicContext();
  const router = useRouter();

  useEffect(() => {
    const createGroup = async () => {
      try {
        // const userAddress = primaryWallet!.address;
        // const signer = await getSigner(primaryWallet!);
        const provider = new JsonRpcProvider("https://rpc.sepolia.mantle.xyz");

        const ownerSigner = new ethers.Wallet( //contract 소유자가 직접 트랜잭션을 보내야함.
          process.env.NEXT_PUBLIC_PRIVATE_KEY as string,
          provider
        );

        // Initialize PushAPI with the signer
        const owner = await PushAPI.initialize(ownerSigner, {
          env: CONSTANTS.ENV.STAGING,
        });

        const groupName = "🌱 Vegetarian";
        const groupDescription = "2,200 people joined";
        const groupImage =
          "data:image/jpeg;base64,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"; // Replace with actual base64 image string
        const walletAddress1 = "0xD32a40D299E58d9212a6039AE230dbb52E74e47B";
        const walletAddress2 = "0x7EE6fAD9Ee306551590E81799C49e576f6e57c8D";
        const walletAddress3 = "0x3F233a18310c563270C3f8C6E9759b5f32FF4E08";

        // Create the group // Only Once
        // const newGroup = await owner.chat.group.create(groupName, {
        //   description: groupDescription,
        //   image: groupImage,
        //   members: [walletAddress1, walletAddress2, walletAddress3],
        //   private: false,
        // });

        // console.log(newGroup.chatId);
      } catch (error) {
        console.error("Error creating group:", error);
      } finally {
        setLoading(false);
      }
    };

    createGroup();
  }, []);

  return (
    <Container>
      {tab == "notification" ? (
        <>
          <Image
            src="/images/yy_message_header_notif.png"
            width={768}
            height={48}
            alt="header notif"
            onClick={() => setTab("chat")}
          />

          <Image
            src="/images/yy_message_notification.png"
            alt="notification"
            width={768}
            height={348}
          />
        </>
      ) : (
        <>
          <Image
            src="/images/yy_message_header_chat.png"
            width={768}
            height={48}
            alt="header chat"
            onClick={() => setTab("notification")}
          />
          <div style={{ width: "100%", padding: "0 24px", marginTop: "25px" }}>
            <Image
              src="/images/yy_message_bangkok.png"
              alt="bangkok"
              width={255}
              height={36}
            />
          </div>
          <Image
            src="/images/yy_message_groupchat_bangkok.png"
            alt="message bangkok"
            width={768}
            height={128}
            onClick={() => router.push("/message/vegetarian")}
          />
        </>
      )}
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  overflow: auto; /* Enable scrolling */
  display: flex;
  flex-direction: column;
`;
