import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { SET_USER_LOGIN } from "@/redux/slice/authSlice";
import { LongOrangeButton } from "../base/LongOrangeButton";
import { useRouter } from "next/navigation";
// import { useGetSigner } from "@/lib/sign/useGetSigner";
import { AlchemyProvider, ethers } from "ethers";
import { styled } from "styled-components";
import colors from "@/styles/color";
import { useDynamicContext, useIsLoggedIn } from "@dynamic-labs/sdk-react-core";

const LoginButton = () => {
  const dispatch = useDispatch();
  // const getSigner = useGetSigner();
  const router = useRouter();

  const { setShowAuthFlow, handleLogOut, primaryWallet } = useDynamicContext();
  const isLoggedIn = useIsLoggedIn();
  const handleWalletConnect = () => {
    setShowAuthFlow(true);
  };

  useEffect(() => {
    if (isLoggedIn) {
      router.push("/signup");
    }
  }, [isLoggedIn]);

  const onLogin = async () => {
    // admin용
    const providerAdmin = new AlchemyProvider(
      "matic-amoy",
      process.env.NEXT_PUBLIC_ALCHEMY_API_KEY
    );
    const signerAdmin = new ethers.Wallet( //contract 소유자가 직접 트랜잭션을 보내야함.
      process.env.NEXT_PUBLIC_PRIVATE_KEY!,
      providerAdmin
    );

    // dispatch(
    //   SET_USER_LOGIN({
    //     address: address,
    //     email: userInfo.email!,
    //     nickname: userInfo.name!,
    //     profileImage: userInfo.profileImage!,
    //   })
    // );
  };

  return (
    <LoginBaseButton onClick={handleWalletConnect}>Sign Up</LoginBaseButton>
  );
};

export default LoginButton;

const LoginBaseButton = styled.div`
  width: 95%;
  height: 64px;

  margin-top: 50px;

  background-color: black;
  color: ${colors.white};

  font-weight: 600;
  font-size: 20px;
  font-family: SFPro;

  border: none;
  border-radius: 100px;
  cursor: pointer;

  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;

  &:hover {
    background-color: #1b1b1b;
  }
  &:active {
    background-color: #1b1b1b; /* 클릭 시 조금 더 어두운 색상 */
  }
`;
