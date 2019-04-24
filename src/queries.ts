import gql from 'graphql-tag';

const GET_AUTHORIZATION = gql`
    query GetAuthorization($userType: userType!) {
        getAuthoriaztion(userType: $userType) {
            access
        }
    }
    `;

export { GET_AUTHORIZATION }