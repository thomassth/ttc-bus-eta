/// <reference types="vitest" />
import react from "@vitejs/plugin-react";
import postcssNesting from "postcss-nesting";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg}"],
        runtimeCaching: [
          {
            urlPattern: /umoiq\.com\/.*/i,
            handler: "NetworkFirst",
            options: {
              cacheName: "ttc-eta-cache",
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24, // <== 1 day
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
          {
            urlPattern: /ttc.ca\/ttcapi\/routedetail.*/i,
            handler: "NetworkFirst",
            options: {
              cacheName: "ttc-subway-cache",
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24, // <== 1 day
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
          {
            urlPattern: /tripplanner.yrt.ca.*/i,
            handler: "NetworkFirst",
            options: {
              cacheName: "yrt-route-cache",
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24, // <== 1 day
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
        ],
      },
      devOptions: {
        enabled: true,
      },
      manifest: {
        short_name: "TO bus",
        name: "Toronto bus arrivals",
        description: "Showing arrival times of TTC subways, buses, streetcars.",
        theme_color: "#292929",
        screenshots: [
          {
            src: "mobile.webp",
            sizes: "412x915",
            type: "image/webp",
            form_factor: "narrow",
            label: "TOBus.ca mobile screenshot",
          },
          {
            src: "wide.webp",
            sizes: "1181x820",
            type: "image/webp",
            form_factor: "wide",
            label: "TOBus.ca wide screenshot",
          },
        ],
        icons: [
          {
            src: "favicon.ico",
            sizes: "32x32 16x16",
            type: "image/x-icon",
          },
          {
            src: "icon-192.png",
            type: "image/png",
            sizes: "192x192",
          },
          {
            src: "icon-512.png",
            type: "image/png",
            sizes: "512x512",
          },
          {
            src: "icon-192-maskable.png",
            type: "image/png",
            sizes: "192x192",
            purpose: "maskable",
          },
          {
            src: "icon-512-maskable.png",
            type: "image/png",
            sizes: "512x512",
            purpose: "maskable",
          },
        ],
        start_url: ".",
        display: "standalone",
        background_color: "#1f2123",
      },
    }),
  ],
  css: {
    postcss: {
      plugins: [postcssNesting],
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/setupTests.ts",
  },
});
