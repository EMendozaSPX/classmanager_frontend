import gql from 'graphql-tag';

const VERIFY_AUTHORIZATION = gql`
query VerifyAuthorization($role: role!) {
    verifyAuthorization(role: $role)
}
`;

const VIEW_TIMETABLE = gql`
query ViewTimetable($teacherId: Int!) {
    viewTimetable(teacherId: $teacherId) {
        weekdays
        classes
        periods {
            periodName
            startTime
            endTime
        }
    }
}
`;

const LIST_CLASSES = gql`
query ListClasses($teacherId: Int!) {
    listTeachersClasses(teacherId: $teacherId) {
        id
        classId
        teacher {
            id
            role
            username
            email
        }
        students {
            id
            studentInfo {
                id
                role
                username
                email
            }
        }
    }
}`;

export interface UserType{
    id: number,
    role: string,
    username: string,
    email: string
}

export interface StudentType{
    id: number,
    studentInfo: UserType
}

export interface ClassType{
    id: number,
    classId: string,
    teacher: UserType,
    students: [StudentType]
}

export interface PeriodType{
    periodName: string,
    class: string,
    startTime: string,
    endTime: string
}

export interface ViewTimetableType{
    weekday: number,
    periods: [PeriodType]
}

export { VERIFY_AUTHORIZATION, VIEW_TIMETABLE, LIST_CLASSES }
