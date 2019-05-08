import gql from 'graphql-tag';

const GET_AUTHORIZATION = gql`
    query GetAuthorization($userType: userType!) {
        getAuthorization(userType: $userType)
    }
    `;

export { GET_AUTHORIZATION }