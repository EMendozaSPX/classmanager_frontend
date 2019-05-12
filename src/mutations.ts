import gql from 'graphql-tag';

export enum Role {
    Admin = 'admin',
    Teacher = 'teacher',
    Student = 'student',
}

const LOGIN_MUTATION = gql`
    mutation Login($username: String!, $password: String!) {
        login(username: $username, password: $password) {
            token
            role
        }
    }
`;

export interface LoginDataTypes {
    token: string,
    role: string,
}

export interface LoginVariableTypes {
    username: string,
    password: string
}

export { LOGIN_MUTATION }