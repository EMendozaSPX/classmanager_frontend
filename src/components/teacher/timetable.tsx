import React from 'react';
import { useQuery } from 'react-apollo-hooks';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

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

    const timetableColumns = viewTimetable.map(
        (value: ViewTimetableType) => {
            const { weekday, periods } = value;
            return (
                <Grid
                    container
                    direction="column"
                    justify="center"
                    alignItems="center"
                    spacing={2}
                >
                    <Grid item xs>
                        <Paper>
                            <Typography variant="subtitle1" gutterBottom>{weekday}</Typography>
                        </Paper>
                        {periods.map(
                            (period: PeriodType) => {
                                return (
                                    <Paper>
                                        <Typography variant="subtitle2" gutterBottom>{period['periodName']}</Typography>
                                        <Typography variant="subtitle2" gutterBottom>{period['class']}</Typography>
                                        <Typography variant="subtitle2" gutterBottom>{period['startTime']}</Typography>
                                        <Typography variant="subtitle2" gutterBottom>{period['endTime']}</Typography>
                                    </Paper>
                                )
                            }
                        )}
                    </Grid>
                </Grid>
            )
        }
    );
    return (
        <div>
            {timetableColumns}
        </div>
    )
};
export default Timetable;
