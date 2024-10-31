import * as digitalocean from "@pulumi/digitalocean";
import * as pulumi from "@pulumi/pulumi";
import * as github from "@pulumi/github";
import * as dotenv from "dotenv";
dotenv.config();
const config = new pulumi.Config();

const setup = async () => {
  const repoName = config.require("repository");
  /**========================================================================
   *                  Referencias recuros pre-existentes
   *========================================================================**/
  const repository = await github.getRepository({
    fullName: repoName,
  });
};

setup();
