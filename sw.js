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
    "revision": "9a1a7f54c3f9d00d10fa29918caad08a"
  },
  {
    "url": "logo_192.bda0fab5.png",
    "revision": "08bb4fda6004ca86f87dffbaafeb137f"
  },
  {
    "url": "logo_512.9a49dbcc.png",
    "revision": "a7c9fdeab82c30320c2f3be442ffc9d3"
  },
  {
    "url": "src.5aeadf68.js",
    "revision": "ae02bda0b8ba6dcbc8050cd180e95f26"
  },
  {
    "url": "src.f9c8a4a5.css",
    "revision": "d5d747d7437b131205f934b8935201b1"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
