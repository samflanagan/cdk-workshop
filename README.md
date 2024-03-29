# This is an updated version of the cdkworkshop.com code
This repo contains updated code for the CDK TypeScript workshop at https://cdkworkshop.com/20-typescript.html. The code has been updated for compatibility with CDK v2.130 and JavaScript SDK v3. The repo contains a Dev Container, configured for AWS CDK and SAM-CLI, etc. 

# Welcome to your CDK TypeScript project

You should explore the contents of this project. It demonstrates a CDK app with an instance of a stack (`CdkWorkshopStack`)
which contains an Amazon SQS queue that is subscribed to an Amazon SNS topic.

The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Useful commands

* `npm run build`   compile typescript to js
* `npm run watch`   watch for changes and compile
* `npm run test`    perform the jest unit tests
* `cdk deploy`      deploy this stack to your default AWS account/region
* `cdk diff`        compare deployed stack with current state
* `cdk synth`       emits the synthesized CloudFormation template
