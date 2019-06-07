import React, { useState } from 'react';
import { useQuery } from 'react-apollo-hooks';
import { makeStyles, Theme } from '@material-ui/core/styles';
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


const useStyles = makeStyles((theme: Theme) => ({
    root: {
        flexGrow: 1,
        padding: theme.spacing(2)
    },
    paper: {
        width: '100%',
        marginTop: theme.spacing(3),
        overflowX: 'auto',
    },
    table: {
        minWidth: 650,
    }
}));

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
    const classes = useStyles();

    const [ dayVal, setDayVal ] = useState(0);
    const handleChange = (e: React.ChangeEvent<{}>, val: number) => {
        setDayVal(val);
    };

    const { viewTimetable } = data;

    if (loading) return <CircularProgress size={50} />;
    if (error) return <Typography variant="h5">{error}</Typography>;
    console.log(viewTimetable);

    return (
        <div className={classes.root}>
            <Typography variant="h4">The Timetable</Typography>
            <AppBar position="static">
                <Tabs
                    value={dayVal}
                    onChange={handleChange}
                    variant="scrollable"
                    scrollButtons="auto"
                >
                    {viewTimetable.weekdays.map((val: number) => {
                        return (
                            <Tab label={`Day ${val}`} />
                        )
                    })}
                </Tabs>
            </AppBar>
            <Paper className={classes.paper}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Period</TableCell>
                            <TableCell align="right">startTime</TableCell>
                            <TableCell align="right">endTime</TableCell>
                            <TableCell align="right">class</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {viewTimetable.classes[dayVal].map((name: string, i: number) => {
                            return (
                                <TableRow key={viewTimetable.periods[i].periodName}>
                                    <TableCell component="th" scope="row">
                                        {viewTimetable.periods[i].periodName}
                                    </TableCell>
                                    <TableCell align="right">{viewTimetable.periods[i].startTime}</TableCell>
                                    <TableCell align="right">{viewTimetable.periods[i].endTime}</TableCell>
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
