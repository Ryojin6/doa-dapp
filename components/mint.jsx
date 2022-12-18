import React, { useEffect, useState } from "react";
import { ethers, Signer } from "ethers";
import { useSelector } from "react-redux";
import DOAAbi from "../data/abi/doa.json";
import Whitelist from "../data/wallets/whitelist.json";
import Vip from "../data/wallets/vip.json";
import { decrypt } from "../utils/security";

const Mint = ({ onNotify }) => {
  const { signerAddress } = useSelector((state) => state.counter);

  const contractAddress = process.env.CONTRACT_ADDRESS;
  //TODO: Switch network
  const network = "goerli";

  const [maxSupply, setMaxSupply] = useState(5555);
  const [totalSupply, setTotalSupply] = useState(0);
  const [mintStatus, setMintStatus] = useState(0);
  const [mintPricePublic, setMintPricePublic] = useState(0);
  const [mintPriceWhitelist, setMintPriceWhitelist] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const getContractInformation = async () => {
    // Declare provider
    const provider = new ethers.providers.Web3Provider(
      window.ethereum,
      network
    );

    // The Contract object
    const contract = new ethers.Contract(contractAddress, DOAAbi, provider);

    // Read max supply
    let maxSupply = await contract.MAX_SUPPLY();
    setMaxSupply(parseInt(maxSupply._hex, 16));

    // Read total supply
    let totalSupply = await contract.totalSupply();
    setTotalSupply(parseInt(totalSupply._hex, 16));

    // Read mint status
    let mintStatus = await contract.mintStatus();
    setMintStatus(mintStatus);

    // Initialize quantity
    if (mintStatus == 1) {
      setQuantity(1);
    } else if (mintStatus == 2) {
      setQuantity(2);
    } else if (mintStatus == 3) {
      setQuantity(3);
    } else {
      setQuantity(0);
    }

    // Read mint price public
    let mintPricePublic = await contract.mintPricePublic();
    setMintPricePublic(
      parseInt(mintPricePublic._hex, 16) / 1000000000000000000
    );

    // Read mint price public
    let mintPriceWhitelist = await contract.mintPriceWhitelist();
    setMintPriceWhitelist(
      parseInt(mintPriceWhitelist._hex, 16) / 1000000000000000000
    );
  };

  const mintPublic = async (amount) => {
    // Declare provider
    const provider = new ethers.providers.Web3Provider(
      window.ethereum,
      network
    );

    const signer = provider.getSigner();

    // The Contract object
    const contract = new ethers.Contract(contractAddress, DOAAbi, signer);

    // Mint NFT
    const options = { value: ethers.utils.parseEther(totalPrice.toString()) };
    try {
      await contract.mintPublic(amount, options);
    } catch (error) {
      try {
        onNotify(await error.error.message.replace("execution reverted: ", ""));
      } catch (error) {
        onNotify("Transaction aborted!");
      }
    }
  };

  const mintWhitelist = async (amount) => {
    // Declare provider
    const provider = new ethers.providers.Web3Provider(
      window.ethereum,
      network
    );

    const signer = provider.getSigner();

    const signerAddressLocal = await signer.getAddress();

    // Search in the Whitelist Dictionary
    let decryptedWhitelist = JSON.parse(
      Buffer.from(decrypt(Whitelist), "base64").toString("utf-8")
    );

    let encryptedSignature =
      decryptedWhitelist[signerAddressLocal.toLocaleLowerCase()];

    if (encryptedSignature == undefined) {
      onNotify("You are not on the Whitelist!");
    } else {
      // The Contract object
      const contract = new ethers.Contract(contractAddress, DOAAbi, signer);

      // Mint NFT
      const signature = encryptedSignature;
      const options = { value: ethers.utils.parseEther(totalPrice.toString()) };
      try {
        await contract.mintWhitelist(amount, signature, options);
      } catch (error) {
        try {
          onNotify(
            await error.error.message.replace("execution reverted: ", "")
          );
        } catch (error) {
          onNotify("Transaction aborted!");
        }
      }
    }
  };

  const mintVip = async (amount) => {
    // Declare provider
    const provider = new ethers.providers.Web3Provider(
      window.ethereum,
      network
    );

    const signer = provider.getSigner();

    const signerAddressLocal = await signer.getAddress();

    // Search in the VIP Dictionary
    let decryptedVip = JSON.parse(
      Buffer.from(decrypt(Vip), "base64").toString("utf-8")
    );

    let encryptedSignature =
      decryptedVip[signerAddressLocal.toLocaleLowerCase()];

    if (encryptedSignature == undefined) {
      onNotify("You are not a VIP!");
    } else {
      // The Contract object
      const contract = new ethers.Contract(contractAddress, DOAAbi, signer);

      // Mint NFT
      const signature = encryptedSignature;
      try {
        await contract.mintVip(amount, signature);
      } catch (error) {
        try {
          onNotify(
            await error.error.message.replace("execution reverted: ", "")
          );
        } catch (error) {
          onNotify("Transaction aborted!");
        }
      }
    }
  };

  const mint = async () => {
    // Check if wallet is connected
    if (signerAddress != "0") {
      // Check mint status
      if (mintStatus == 1) {
        mintVip(quantity);
      } else if (mintStatus == 2) {
        mintWhitelist(quantity);
      } else if (mintStatus == 3) {
        mintPublic(quantity);
      } else {
        onNotify("Mint isn't live!");
      }
    } else {
      onNotify("Wallet is not connected!");
    }
  };

  const decrement = () => {
    let value = quantity;
    if (quantity > 1) {
      setQuantity(--value);
    }
  };

  const increment = () => {
    let value = quantity;
    let maxQuantity =
      mintStatus == 0 ? 0 : mintStatus == 1 ? 1 : mintStatus == 2 ? 2 : 3;
    if (quantity < maxQuantity) {
      setQuantity(++value);
    }
  };

  useEffect(() => {
    async function fetchData() {
      if (!window.ethereum) {
        onNotify("Metamask is not detected!");
        return;
      }

      let chainId = await ethereum.request({ method: "eth_chainId" });

      //TODO: Switch chain to 0x1
      const homesteadChainId = "0x5";

      if (chainId !== homesteadChainId) {
        onNotify("You are not connected to the Mainnet!");
      } else {
        getContractInformation();
      }
    }

    fetchData();
  }, [onNotify]);

  useEffect(() => {
    if (mintStatus == 0) {
      setTotalPrice(0);
    } else if (mintStatus == 1) {
      setTotalPrice(0);
    } else if (mintStatus == 2) {
      setTotalPrice(quantity * mintPriceWhitelist);
    } else {
      setTotalPrice(quantity * mintPricePublic);
    }
  }, [mintPricePublic, mintPriceWhitelist, mintStatus, quantity]);

  return (
    <>
      {/* <!-- Mint --> */}
      <section
        className="relative pb-10 pt-20 md:pt-31 min-h-screen flex justify-center items-center"
        id="home"
      >
        <picture className="pointer-events-none absolute inset-x-0 top-0 -z-10 block h-full">
          <img
            src="/images/background.jpg"
            alt="gradient dark"
            className="h-full w-full"
          />
        </picture>
        <div className="ag-smoke-block relative z-30 h-screen opacity-40">
          <picture>
            <source
              srcSet="
              https://raw.githubusercontent.com/SochavaAG/example-mycode/master/pens/animation-smoke-images/images/smoke-pink.webp
            "
              type="image/webp"
            />
            <img
              src="https://raw.githubusercontent.com/SochavaAG/example-mycode/master/pens/animation-smoke-images/images/smoke-pink.png"
              alt="smoke-pink"
              className="ag-smoke_img ag-smoke_img__left"
              width="1920"
              height="1080"
            />
          </picture>
          <picture>
            <source
              srcSet="
              https://raw.githubusercontent.com/SochavaAG/example-mycode/master/pens/animation-smoke-images/images/smoke-blue.webp
            "
              type="image/webp"
            />
            <img
              src="https://raw.githubusercontent.com/SochavaAG/example-mycode/master/pens/animation-smoke-images/images/smoke-blue.png"
              alt="smoke-blue"
              className="ag-smoke_img ag-smoke_img__right"
              width="1920"
              height="1080"
            />
          </picture>
        </div>

        <div className="bird-container bird-container--one relative z-20">
          <div className="bird bird--one" />
        </div>

        <div className="bird-container bird-container--two relative z-20">
          <div className="bird bird--two" />
        </div>

        <div className="bird-container bird-container--three relative z-20">
          <div className="bird bird--three" />
        </div>

        <div className="bird-container bird-container--four relative z-20">
          <div className="bird bird--four" />
        </div>
        <div className="absolute inset-0 z-10 h-full w-full bg-black opacity-80" />
        <div className="container h-full mx-auto z-30 relative">
          <div className="pt-14 flex justify-center items-center w-full">
            <div className="bg-black/80 shadow-2xl max-w-5xl relative w-full text-white">
              <div className="bg-a-black/20 w-20 h-10 absolute -top-6 -translate-x-1/2 left-1/2" />

              <div className=" pb-8 flex flex-col  p-4  w-full">
                <div className="mx-auto text-center space-y-6 w-full">
                  <div className="pt-10">
                    <div className="text-3xl md:text-4xl  font-cursive font-bold uppercase">
                      {mintStatus == 0
                        ? "Mint is not live"
                        : mintStatus == 1
                        ? "VIP sale is live"
                        : mintStatus == 2
                        ? "Whitelist sale is live"
                        : "Public sale is live"}
                    </div>
                    <h3 className="mb-10 font-cursive text-2xl text-white lg:text-3xl xl:text-4xl">
                      {totalSupply} / {maxSupply}
                    </h3>
                  </div>
                  <div className="flex border-b  pb-2 text-lg xl:text-xl border-a-black justify-between">
                    <div className="font-cursive">Cost</div>
                    <div className="font-cursive">
                      {mintStatus == 0
                        ? "0" + ethers.constants.EtherSymbol
                        : mintStatus == 1
                        ? "FREE"
                        : mintStatus == 2
                        ? mintPriceWhitelist + ethers.constants.EtherSymbol
                        : mintPricePublic + ethers.constants.EtherSymbol}
                    </div>
                  </div>
                  {/* <!-- Amount --> */}
                  <div className="flex justify-between text-lg xl:text-xl items-center border-b border-a-black  pb-2">
                    <div className="font-cursive">Amount</div>
                    <div className="flex flex-row h-10 rounded-lg relative bg-transparent mt-1">
                      <button
                        className="hover:text-black hover:bg-white border h-full w-7 md:w-20 rounded-l cursor-pointer outline-none"
                        onClick={() => {
                          decrement();
                        }}
                      >
                        <span className="m-auto text-2xl font-thin">−</span>
                      </button>
                      <input
                        type="number"
                        className="w-32 focus:outline-none  border font-semibold text-md md:text-base cursor-default flex items-center outline-none text-center text-black"
                        placeholder="Quantity"
                        value={quantity}
                        disabled
                      />
                      <button
                        className="hover:text-black hover:bg-white border h-full w-7 md:w-20 rounded-r cursor-pointer"
                        onClick={() => {
                          increment();
                        }}
                      >
                        <span className="m-auto text-2xl">+</span>
                      </button>
                    </div>
                  </div>
                  <div className="flex border-b border-a-black pb-2 text-lg xl:text-xl justify-between ">
                    <div className="font-cursive">Total</div>
                    <div className="font-cursive">
                      {totalPrice + ethers.constants.EtherSymbol}
                    </div>
                  </div>
                </div>
                {/* <!-- Mint Button --> */}
                <div className="text-center vertical-center w-full mt-6 relative text-3xl">
                  <button
                    className={
                      signerAddress == "0"
                        ? "connect-wallet text-center bg-jacarta-200 items-center space-x-2 block w-full px-5 py-2 transition-colors"
                        : "connect-wallet text-center bg-white hover:bg-black text-black hover:text-white items-center space-x-2 block w-full px-5 py-2 transition-colors border-2"
                    }
                    onClick={() => mint(1)}
                    disabled={signerAddress == "0"}
                  >
                    <span
                      className="font-cursive font-semibold mt-1 capitilize"
                      style={{ width: "100%" }}
                    >
                      Mint now
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- end mint --> */}
    </>
  );
};

export default Mint;
