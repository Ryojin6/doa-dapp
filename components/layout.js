import Navbar from "./navbar";
import Footer from "./footer";

import React, { useEffect } from "react";
import { ethers } from "ethers";
import { useDispatch } from "react-redux";
import { updateSignerAddress } from "../redux/counterSlice";

export default function Layout({ children, onNotify }) {
  const dispatch = useDispatch();

  // Detect change in Metamask account
  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        const account = accounts.length > 0 ? accounts[0] : "0";
        dispatch(updateSignerAddress(account));
      });
    }
  });

  // Calls Metamask to connect wallet on clicking Connect Wallet button
  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);

        await provider.send("eth_requestAccounts", []);

        const signer = await provider.getSigner(0);

        if (signer === undefined) {
          dispatch(updateSignerAddress("0"));
        } else {
          dispatch(updateSignerAddress(await signer.getAddress()));
        }
      } catch (error) {
        onNotify("Error connecting to Metamask!");
      }
    } else {
      onNotify("Metamask isn't installed!");
    }
  };

  return (
    <>
      <Navbar onConnect={connectWallet} />
      <main>{children}</main>
    </>
  );
}
