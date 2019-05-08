import gql from 'graphql-tag';

const GET_AUTHORIZATION = gql`
    query GetAuthorization($role: role!) {
        getAuthorization(role: $role)
    }
    `;

export { GET_AUTHORIZATION }