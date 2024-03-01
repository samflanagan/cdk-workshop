import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import {WorkshopPipelineStage} from './pipeline-stage';
import {CodeBuildStep, CodePipeline, CodePipelineSource} from "aws-cdk-lib/pipelines";
import * as ssm from 'aws-cdk-lib/aws-ssm';

export class WorkshopPipelineStack extends Stack {
    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);
        
        // Lookup GitHub connection ARN from SSM Parameter Store
        const githubConnectionArn = ssm.StringParameter.valueFromLookup(this, 'github-samflanagan-connection-arn');

        // Pipeline code goes here
        // The basic pipeline declaration. This sets the initial structure
        // of our pipeline
       const pipeline = new CodePipeline(this, 'Pipeline', {
        pipelineName: 'WorkshopPipeline',
        synth: new CodeBuildStep('SynthStep', {
                input: CodePipelineSource.connection('samflanagan/cdk-workshop', 'master', { connectionArn: githubConnectionArn}),
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
    
    const deploy = new WorkshopPipelineStage(this, 'Deploy');
    const deployStage = pipeline.addStage(deploy);

    }
}