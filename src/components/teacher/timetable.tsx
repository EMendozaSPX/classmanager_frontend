import React from 'react';
import { useQuery } from 'react-apollo-hooks';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import { VIEW_TIMETABLE, ViewTimetableType } from '../../queries';

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

    const timetableColumns = viewTimetable.map((_: null, value: ViewTimetableType) => {
        return (
            <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
                spacing={2}
            >
                <Grid item xs>
                    <Paper>{value['weekday']}</Paper>
                </Grid>
                
        )
    }
    return (

            {viewTimetable.map((_: null, values: ViewTimetableType) => {
                const { weekday, periods } = values;
                <Grid item xs={12}>
                    <Paper></Paper>
            })
            }
    )
};
