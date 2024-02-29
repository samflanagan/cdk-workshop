import { Template, Capture } from 'aws-cdk-lib/assertions';
import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { HitCounter } from '../lib/hitcounter';

test('DynamoDB Table Created with Encryption', () => {
    const stack = new cdk.Stack();
  // WHEN
  new HitCounter(stack, 'MyTestConstruct', {
    downstream: new lambda.Function(stack, 'TestFunction', {
      runtime: lambda.Runtime.NODEJS_20_X,
      handler: 'hello.handler',
      code: lambda.Code.fromAsset('lambda')
    })
  });
  // THEN

  const template = Template.fromStack(stack);
  template.hasResourceProperties("AWS::DynamoDB::Table", {
    SSESpecification: {
        SSEEnabled: true
    }
  }); 

});

test('Lambda Has Environment Variables', () => {
    const stack = new cdk.Stack();
  // WHEN
  new HitCounter(stack, 'MyTestConstruct', {
    downstream: new lambda.Function(stack, 'TestFunction', {
      runtime: lambda.Runtime.NODEJS_20_X,
      handler: 'hello.handler',
      code: lambda.Code.fromAsset('lambda')
    })
  });
  // THEN

  const template = Template.fromStack(stack);
  const envCapture = new Capture();

  template.hasResourceProperties("AWS::Lambda::Function", {
    Handler: "hitcounter.handler",
    Environment: envCapture,
  });

  expect(envCapture.asObject()).toEqual(expect.objectContaining({
    Variables: {
      DOWNSTREAM_FUNCTION_NAME: {
        Ref: "TestFunction22AD90FC"
      },
      HITS_TABLE_NAME: {
        Ref: "MyTestConstructHits24A357F0"
      }
    }
}));
})
