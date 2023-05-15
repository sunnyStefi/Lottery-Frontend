import { useEffect, useState } from "react";
import { useContractRead, useNetwork, useAccount } from "wagmi";
import { contractABI, contractAddress } from "../constants/index.js";
import {ethers} from ethers;

export default function Entrance() {
  const { chain } = useNetwork();
  const { isConnected } = useAccount();

  const chainId = isConnected ? chain.id : null;
  const lotteryAddress =
    chainId in contractAddress ? contractAddress[chainId][0] : null;

  const [entranceFee, setEntranceFee] = useState(0);

  const { data, isError, isLoading, isFetched } = useContractRead({
    abi: contractABI,
    address: lotteryAddress,
    functionName: "getConstant",
    onError(error) {
      console.log(error);
    },
  });

  useEffect(() => {
    if (isConnected) {
      const updateUI = (async) => {
        setEntranceFee(data);
        console.log(`update UI get ticket price ${data}`);
      };
      updateUI();
    }
  }, [isConnected]);

  return (
    <>
      <div>
        <p>Entrance {entranceFee}value</p>
      </div>
    </>
  );
}
