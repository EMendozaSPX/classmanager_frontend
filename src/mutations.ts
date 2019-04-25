import gql from 'graphql-tag';

export enum UserType {
    Admin = 'admin',
    Teacher = 'teacher',
    Student = 'student',
}

const LOGIN_MUTATION = gql`
    mutation Login($userType: userType!, $username: String!, $password: String!) {
        login(userType: $userType, username: $username, password: $password)
    }
`;

export interface LoginDataTypes {
    login: string
}

export interface LoginVariableTypes {
    userType: UserType,
    username: string,
    password: string
}

export { LOGIN_MUTATION }