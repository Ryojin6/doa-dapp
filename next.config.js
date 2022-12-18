/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    CONTRACT_ADDRESS: "0xD6612494073430fC9e49caF80f3fbB001B92e0d7",
    INIT_VECTOR: "2fad80hgnqnmm7tf",
    SECRET_KEY: "VbTtM8vpxKmHkEItHkzBq9SZCqXUQRzj"
  }
}

module.exports = nextConfig
