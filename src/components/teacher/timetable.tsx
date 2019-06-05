import React, { useState } from 'react';
import { useQuery } from 'react-apollo-hooks';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
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

    const [ dayVal, setDayVal ] = useState(0);
    const handleChange = (e: React.ChangeEvent<{}>, val: number) => {
        setDayVal(val);
    };

    const { viewTimetable } = data;

    if (loading) return <CircularProgress />;
    if (error) return <Typography variant="h5">{error}</Typography>;
    console.log(viewTimetable);

    const { classes, periods, weekdays } = data['viewTimetable'];
    console.log(periods);
    console.log(classes);

    return (
        <div>
            <AppBar position="static">
                <Tabs value={dayVal} onChange={handleChange}>
                    {weekdays.map((val: number) => {
                        return (
                            <Tab label={`Day ${val}`} />
                        )
                    })}
                </Tabs>
            </AppBar>
            <Paper>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>Period</TableCell>
                            <TableCell align="right">startTime</TableCell>
                            <TableCell align="right">endTime</TableCell>
                            <TableCell align="right">class</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {classes[dayVal].map((name: string, i: number) => {
                            return (
                                <TableRow key={periods[i].periodName}>
                                    <TableCell component="th" scope="row">
                                        {periods[i].periodName}
                                    </TableCell>
                                    <TableCell align="right">{periods[i].startTime}</TableCell>
                                    <TableCell align="right">{periods[i].endTime}</TableCell>
                                    <TableCell align="right">{name}</TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </Paper>
        </div>
    )
};
export default Timetable;
