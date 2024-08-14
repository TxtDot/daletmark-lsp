#!/usr/bin/env node

// Source: https://github.com/a11ywatch/rust-to-npm

const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");
const { homedir } = require("os");

const cargoDir = path.join(homedir(), ".cargo");

// check if directory exists
if (fs.existsSync(cargoDir)) {
  console.log("Cargo found.");
} else {
  const setCargo = 'PATH="/$HOME/.cargo/bin:${PATH}"';
  console.log("Installing deps [cargo].");

  exec(
    `curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y && ${setCargo}`,
    (error) => {
      if (error) {
        console.error(
          "curl failed! Curl may not be installed on the OS. View https://curl.se/download.html to install.",
        );
        console.error(error);
      }
    },
  );
}

const features = process.env.npm_config_features
  ? `--features ${process.env.npm_config_features.replace(",", " ")}`
  : "";

console.log(`Installing and compiling daleth_lsp 0.1.1 ${features} ...`);
exec(
  `cargo install daleth_lsp --vers 0.1.1 ${features}`,
  (error, stdout, stderr) => {
    console.log(stdout);
    if (error || stderr) {
      console.error(error || stderr);
    } else {
      console.log("install finished!");
    }
  },
);
