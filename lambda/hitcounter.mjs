import { InvokeCommand, LambdaClient } from "@aws-sdk/client-lambda";
import { UpdateItemCommand, DynamoDBClient } from "@aws-sdk/client-dynamodb";

export const handler = async (event) => {
  console.log("request:", JSON.stringify(event, undefined, 2));

  // create AWS SDK clients
  const dynamoClient = new DynamoDBClient({});
  const lambdaClient = new LambdaClient({});

  // update dynamo entry for "path" with hits++
  const dynamoCommand = new UpdateItemCommand({
    TableName: process.env.HITS_TABLE_NAME,
    // For more information about data types,
    // see https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/HowItWorks.NamingRulesDataTypes.html#HowItWorks.DataTypes and
    // https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Programming.LowLevelAPI.html#Programming.LowLevelAPI.DataTypeDescriptors
    Key: { path: { S: event.path } },
    UpdateExpression: 'ADD hits :incr',
    ExpressionAttributeValues: { ':incr': { N: '1' } }
  });
  const response = await dynamoClient.send(dynamoCommand);
  console.log(response);

  const lambdaCommand = new InvokeCommand({
      FunctionName: process.env.DOWNSTREAM_FUNCTION_NAME,
      Payload: JSON.stringify(event)
    });

  const { Payload } = await lambdaClient.send(lambdaCommand);
  const result = Buffer.from(Payload).toString();
  console.log('downstream response:', result);
 
  return JSON.parse(result);
}