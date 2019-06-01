import {createStyles, Theme, WithStyles} from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";
import React from "react";

const styles = (theme: Theme) => createStyles({
    root: {
        display: 'flex'
    }
});

interface TeacherDashProps extends WithStyles<typeof styles> {}

const TeacherDashboard = (props: TeacherDashProps) => {
    return (
        <h1>Hello Teacher</h1>
    )
}

export default withStyles(styles)(TeacherDashboard);
