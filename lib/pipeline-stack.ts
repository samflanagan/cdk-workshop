import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import {WorkshopPipelineStage} from './pipeline-stage';
import {CodeBuildStep, CodePipeline, CodePipelineSource} from "aws-cdk-lib/pipelines";
import * as codecommit from 'aws-cdk-lib/aws-codecommit';

export class WorkshopPipelineStack extends Stack {
    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);
        
        // Creates a CodeCommit repository called 'WorkshopRepo'
        new codecommit.Repository(this, 'CdkWorkshopRepo', {
        repositoryName: "CdkWorkshopRepo"
        });

        // Pipeline code goes here
        // The basic pipeline declaration. This sets the initial structure
        // of our pipeline
  /*      const pipeline = new CodePipeline(this, 'Pipeline', {
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
    const deployStage = pipeline.addStage(deploy); */

    }
}