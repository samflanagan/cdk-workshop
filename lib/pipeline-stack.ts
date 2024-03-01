import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import {CodeBuildStep, CodePipeline, CodePipelineSource} from "aws-cdk-lib/pipelines";

export class WorkshopPipelineStack extends Stack {
    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);

        // Pipeline code goes here
        // The basic pipeline declaration. This sets the initial structure
        // of our pipeline
       const pipeline = new CodePipeline(this, 'Pipeline', {
        pipelineName: 'WorkshopPipeline',
        synth: new CodeBuildStep('SynthStep', {
                input: CodePipelineSource.connection('samflanagan/cdk-workshop', 'master', { connectionArn: 'arn:aws:codestar-connections:eu-west-1:205968024504:connection/e43242d1-d185-4cc3-9afa-abc452cb8ee8'}),
                installCommands: [
                    'npm install -g aws-cdk'
                ],
                commands: [
                    'npm ci',
                    'npm run build',
                    'npx cdk synth'
                ]
            }
        )
    });
    }
}