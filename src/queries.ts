import gql from 'graphql-tag';

const VERIFY_AUTHORIZATION = gql`
query VerifyAuthorization($role: role!) {
    verifyAuthorization(role: $role)
}
`;

const VIEW_TIMETABLE = gql`
query ViewTimetable($teacherId: int!) {
    viewTimetable(teacherId: $teacherId) {
        weekday
        periods {
            periodName
            class
            startTime
            endTime
        }
    }
}
`;

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

export { VERIFY_AUTHORIZATION, VIEW_TIMETABLE }
