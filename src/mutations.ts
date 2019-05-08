import gql from 'graphql-tag';

export enum UserType {
    Admin = 'admin',
    Teacher = 'teacher',
    Student = 'student',
}

const LOGIN_MUTATION = gql`
    mutation Login($usertype: usertype!, $username: String!, $password: String!) {
        login(usertype: $usertype, username: $username, password: $password)
    }
`;

export interface LoginDataTypes {
    login: string
}

export interface LoginVariableTypes {
    usertype: UserType,
    username: string,
    password: string
}

export { LOGIN_MUTATION }