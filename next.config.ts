import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {},
  // Enables SharedArrayBuffer for gameboy-emulator audio (cross-origin isolated).
  // credentialless keeps cross-origin ROM fetches (e.g. Vercel Blob) working.
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
          { key: "Cross-Origin-Embedder-Policy", value: "credentialless" },
        ],
      },
    ];
  },
};

export default nextConfig;
