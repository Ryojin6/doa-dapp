/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    CONTRACT_ADDRESS: "0xd6612494073430fc9e49caf80f3fbb001b92e0d7",
    INIT_VECTOR: "2fad80hgnqnmm7tf",
    SECRET_KEY: "VbTtM8vpxKmHkEItHkzBq9SZCqXUQRzj"
  }
}

module.exports = nextConfig
