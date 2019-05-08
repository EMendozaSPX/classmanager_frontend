import gql from 'graphql-tag';

const GET_AUTHORIZATION = gql`
    query GetAuthorization($usertype: usertype!) {
        getAuthoriaztion(usertype: $usertype)
    }
    `;

export { GET_AUTHORIZATION }