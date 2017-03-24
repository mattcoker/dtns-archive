/*jshint node:true*/
'use strict';

module.exports = function(/* environment, appConfig */) {
  // See https://github.com/san650/ember-web-app#documentation for a list of
  // supported properties

  return {
    name: "DTNS Archive",
    short_name: "DTNS Archive",
    description: "Your Dedicated Repository for DTNS episodes, people, picks, and topics.",
    start_url: "/",
    display: "standalone",
    background_color: "#000",
    theme_color: "#000",
    icons: [
      {
        src: "/assets/images/logo-192x192.png",
        sizes: "192x192",
        type: "image/png"
      },
      {
        src: "/assets/images/logo-384x384.png",
        sizes: "384x384",
        type: "image/png"
      },
      {
        src: "/assets/images/logo-768x768.png",
        sizes: "768x768",
        type: "image/png"
      },
      {
        src: "/assets/images/logo-1128x1128.png",
        sizes: "1128x1128",
        type: "image/png"
      }
    ]
  };
}
