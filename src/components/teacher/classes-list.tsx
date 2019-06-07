import React from 'react';
import { useQuery } from 'react-apollo-hooks';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';

import { LIST_CLASSES, ClassType } from '../../queries';
import LinkAdapter from '../link-adapter';

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        padding: theme.spacing(2)
    },
    paper: {
        marginTop: theme.spacing(3),
        padding: theme.spacing(3, 2)
    }
}));

interface ListClassesProps {
    teacherId: number
}

const ListClasses = (props: ListClassesProps) => {
    const { data, error, loading } = useQuery(LIST_CLASSES, {
        suspend: false,
        variables: {
            teacherId: props.teacherId
        }
    });

    const classes = useStyles();

    const { listTeachersClasses } = data;

    if (loading) return <CircularProgress size="70" />;
    if (error) return <Typography variant="h4">error {error}</Typography>;

    return (
        <div className={classes.root}>
            <Typography variant="h4">The Class list, click to go to class panel</Typography>
            <Paper className={classes.paper}>
                <List component="nav" aria-label="List teachers classes">
                    {listTeachersClasses.map((classData: ClassType) => {
                        return (
                            <ListItem
                                button
                                component={LinkAdapter}
                                to={{
                                    pathname: `/dashboard/${classData.id}`,
                                    state: { classData: classData}
                                }}
                            >
                                <ListItemText primary={classData.classId}/>
                            </ListItem>
                        )
                    })}
                </List>
            </Paper>
        </div>
    )
};
export default ListClasses;
