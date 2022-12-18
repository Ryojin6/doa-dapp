import React from "react";
import Head from "next/head";

const Meta = ({ title, keyword, desc }) => {
  return (
    <div>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.png" />
        <meta name="description" content={desc} />
        <meta name="keyword" content={keyword} />
      </Head>
    </div>
  );
};

Meta.defaultProps = {
  title: "Dead or Alive | Mint",
  keyword: "ethereum, nft, mint, web3",
  desc: "5,555 warriors of Akh's rise from the dead from the depths of Therra.",
};

export default Meta;
