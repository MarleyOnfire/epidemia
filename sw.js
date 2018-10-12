/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.4.1/workbox-sw.js");

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "index.html",
    "revision": "2d10dd05e8b7247fb83f37b0cb9acae9"
  },
  {
    "url": "logo_192.2f3849df.png",
    "revision": "361656f0dbbe25687272cd81441cb0cc"
  },
  {
    "url": "logo_512.cb07ae21.png",
    "revision": "2488cb81d20c1a67c47e9e2319c90d08"
  },
  {
    "url": "src.5aeadf68.js",
    "revision": "ae02bda0b8ba6dcbc8050cd180e95f26"
  },
  {
    "url": "src.f22c8e80.css",
    "revision": "5294e05c57d99a8463b5f0589c901d63"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
