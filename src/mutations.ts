import gql from 'graphql-tag';

export enum Role {
    Admin = 'admin',
    Teacher = 'teacher',
    Student = 'student',
}

const LOGIN_MUTATION = gql`
    mutation Login($role: role!, $username: String!, $password: String!) {
        login(role: $role, username: $username, password: $password)
    }
`;

export interface LoginDataTypes {
    login: string
}

export interface LoginVariableTypes {
    role: Role,
    username: string,
    password: string
}

export { LOGIN_MUTATION }