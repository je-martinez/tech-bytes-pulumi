import * as digitalocean from "@pulumi/digitalocean";
import * as pulumi from "@pulumi/pulumi";
import * as dotenv from "dotenv";
dotenv.config();

const config = new pulumi.Config();

const web = new digitalocean.Droplet("web", {
  name: "web",
  image: "ubuntu-18-04-x64",
  size: "s-1vcpu-1gb",
});
