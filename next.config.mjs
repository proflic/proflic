/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/services/:slug*",
        destination: "/#services",
        permanent: true,
      },
      {
        source: "/services",
        destination: "/#services",
        permanent: true,
      },
      {
        source: "/quote",
        destination: "/#estimator",
        permanent: true,
      },
      {
        source: "/contact",
        destination: "/#estimator",
        permanent: true,
      },
      {
        source: "/about",
        destination: "/#about",
        permanent: true,
      },
      {
        source: "/simulation",
        destination: "/#simulation",
        permanent: true,
      },
      {
        source: "/software",
        destination: "/#software",
        permanent: true,
      },
      {
        source: "/home",
        destination: "/",
        permanent: true,
      },
      {
        source: "/index.html",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
