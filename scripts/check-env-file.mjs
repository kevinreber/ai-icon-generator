#!/usr/bin/env zx
/* eslint-disable no-undef */
import "zx/globals";
import { existsSync } from "fs";

console.log(`\nRunning 'check-env-file.mjs'`);
const Shell = $;

async function main() {
  const doesEnvFileExist = existsSync("./.env");
  console.log(`Checking if .env file exists inside of project directory...`);
  console.log(`The .env is needed for local development ...`);

  if (!doesEnvFileExist) {
    console.log(
      chalk.red(`❌ .env file not found inside of project directory`),
    );
    await Shell`cp .env.example .env`;
    console.log(
      chalk.green(
        "✅ Created .env file at the following location `~/ai-icon-generator`",
      ),
    );
  } else {
    console.log(chalk.green`✅ .env exists`);
  }
  console.log(
    `Please check the .env file to ensure the environment variables are filled before launching the server.`,
  );

  console.log(`\n`);
}

await main().catch((error) => {
  console.log(`Error`, error);
});
