import gql from 'graphql-tag';

const LOGIN_MUTATION = gql`
    mutation Login($userType: userType!, $username: String!, $password: String!) {
        login(userType: $userType, username: $username, password: $password)
    }
`;

export { LOGIN_MUTATION }