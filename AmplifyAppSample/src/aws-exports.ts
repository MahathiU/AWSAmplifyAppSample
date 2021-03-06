/* eslint-disable */
// WARNING: DO NOT EDIT. This file is automatically generated by AWS Amplify. It will be overwritten.
import { Auth } from 'aws-amplify';


export const awsmobile = {
    aws_project_region: 'us-east-1',
    aws_cognito_identity_pool_id: 'us-east-1:4ee6b7a9-3f96-4562-b29a-b8abf117445a',
    aws_cognito_region: 'us-east-1',
    aws_user_pools_id: 'us-east-1_nalUA8qYb',
    aws_user_pools_web_client_id: '4edkolne3dlv6poj5r4ncvhsbp',
    oauth: {},
    aws_dynamodb_all_tables_region: 'us-east-1',
    aws_dynamodb_table_schemas: [
      {
        tableName: 'todolist-dev',
        region: 'us-east-1'
      }
    ],
    aws_cloud_logic_custom: [
      {
        name: 'todosapi',
        endpoint: 'https://5vb2dn4j21.execute-api.us-east-1.amazonaws.com/dev',
        region: 'us-east-1',
        custom_header: async () => {
          return { Authorization: `Bearer ${(await Auth.currentSession()).getIdToken().getJwtToken()}`};
        }
      }
    ]
};

export default awsmobile;
