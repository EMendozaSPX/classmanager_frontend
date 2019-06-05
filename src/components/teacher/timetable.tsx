import React from 'react';
import { useQuery } from 'react-apollo-hooks';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

import { VIEW_TIMETABLE, ViewTimetableType, PeriodType } from '../../queries';

interface TimetableProps {
    teacherId: number
}

const Timetable = (props: TimetableProps) => {
    const { data, loading, error } = useQuery(VIEW_TIMETABLE, {
        suspend: false,
        variables: {
            teacherId: props.teacherId
        }
    });

    const { viewTimetable } = data;

    if (loading) return <CircularProgress />;
    if (error) return <Typography variant="h5">{error}</Typography>;
    console.log(viewTimetable);

    const { classes, periods, weekdays } = data['viewTimetable'];

    return (
        <Paper>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Period</TableCell>
                        {weekdays.map((row: number) => {
                            return (
                                <TableCell align="right">{`Day {row}`}</TableCell>
                            )
                        })}
                    </TableRow>
                </TableHead>
            </Table>
        </Paper>
    )
};
export default Timetable;
