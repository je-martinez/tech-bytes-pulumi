import * as digitalocean from "@pulumi/digitalocean";
import * as pulumi from "@pulumi/pulumi";
import * as github from "@pulumi/github";
import * as dotenv from "dotenv";
dotenv.config();

const config = new pulumi.Config();

const setup = async () => {
  const provider = new digitalocean.Provider("do-provider", {
    token: process.env.DIGITALOCEAN_TOKEN,
  });

  const repoName = config.require("repository");
  const envName = config.require("environment");
  const projectName = config.require("projectName");

  /**========================================================================
   *                  Ref to pre-existing resources
   *========================================================================**/
  const repository = await github.getRepository({
    fullName: repoName,
  });

  const project = await digitalocean.getProject(
    {
      name: projectName,
    },
    { provider }
  );

  const branch = config.require("repository-branch");

  const webApp = new digitalocean.App(
    `tech-bytes-web-app-${envName}`,
    {
      projectId: project.id,
      spec: {
        name: `tech-bytes-web-app-${envName}`,
        region: "nyc3",
        staticSites: [
          {
            name: `tech-bytes-web-app-${envName}`,
            //Don't forget to give access to the repository to your Digital Ocean Account
            github: {
              repo: repository.fullName,
              branch,
              deployOnPush: true,
            },
            sourceDir: "/web",
            buildCommand: "npm install && npm run build",
            outputDir: "/dist",
          },
        ],
      },
    },
    { provider }
  );
};

setup();
