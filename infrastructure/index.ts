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

  /**========================================================================
   *                  Creating a new Digital Ocean App
   *========================================================================**/
  const branch = config.require("repository-branch");
  const apiName = `tech-bytes-api-${envName}`;
  const api = new digitalocean.App(
    apiName,
    {
      spec: {
        name: apiName,
        region: "nyc3",
        services: [
          {
            name: apiName,
            //Don't forget to give access to the repository to your Digital Ocean Account
            github: {
              repo: repository.fullName,
              branch,
              deployOnPush: true,
            },
            sourceDir: "/api",
            buildCommand: "npm install && npm run build",
            runCommand: "npm start",
            httpPort: 8000,
            instanceSizeSlug: "basic-xxs",
            instanceCount: 1,
            envs: [
              {
                key: "NODE_ENV",
                scope: "RUN_AND_BUILD_TIME",
                value: envName,
              },
            ],
          },
        ],
      },
    },
    { provider }
  );

  /**========================================================================
   *  Creating a new Digital Ocean App Using Ouputs from another resource
   *========================================================================**/
  const webAppName = `tech-bytes-web-app-${envName}`;
  const webApp = new digitalocean.App(
    webAppName,
    {
      projectId: project.id,
      spec: {
        name: webAppName,
        region: "nyc3",
        staticSites: [
          {
            name: webAppName,
            //Don't forget to give access to the repository to your Digital Ocean Account
            github: {
              repo: repository.fullName,
              branch,
              deployOnPush: true,
            },
            sourceDir: "/web",
            buildCommand: "npm install && npm run build",
            outputDir: "/dist",
            envs: [
              {
                key: "VITE_ENV",
                scope: "RUN_AND_BUILD_TIME",
                value: envName,
              },
              {
                key: "VITE_API_URL",
                scope: "RUN_AND_BUILD_TIME",
                value: api.liveUrl,
              },
            ],
          },
        ],
      },
    },
    { provider, dependsOn: [api] }
  );
};

setup();
