
# Infrastructure Project

This is an infrastructure project managed with Pulumi, written in TypeScript. It leverages Pulumi to define and deploy infrastructure as code (IaC) on platforms such as DigitalOcean and GitHub.

## Table of Contents
- [Getting Started](#getting-started)
- [Scripts](#scripts)

## Getting Started

### Prerequisites
- Pulumi CLI (latest version recommended)
- Node.js (version 18 or later)
- npm or yarn
- DigitalOcean and GitHub credentials set up for Pulumi.
- Give Digital Ocean access to your repository.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/je-martinez/tech-bytes-pulumi.git
   ```
2. Navigate to the project directory:
   ```bash
   cd infrastructure
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Set up environment variables in a `.env` file in the project root to manage sensitive information.

### Optional

5. Setup Pulumi Backed (Local)
   ```bash
   pulumi login --local
   ```
## Scripts

| Command             | Description                                         |
|---------------------|-----------------------------------------------------|
| `pulumi up`         | Deploy the infrastructure defined in this project.  |
| `pulumi destroy`    | Tear down all resources created by this project.    |
| `npm install`       | Install all dependencies.                           |
| `npm run build`     | Compile TypeScript files to JavaScript (if needed). |

## Usage

After setting up environment variables and installing dependencies, deploy the infrastructure by running:
```bash
pulumi up
```
To remove the infrastructure, use:
```bash
pulumi destroy
```

