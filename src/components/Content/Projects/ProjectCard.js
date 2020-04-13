import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { object, func } from "prop-types";

// Material UI
// import ButtonBase from "@material-ui/core/ButtonBase";
import CardHeader from "@material-ui/core/CardHeader/CardHeader";
import CardActionArea from "@material-ui/core/CardActionArea/CardActionArea";
import CardContent from "@material-ui/core/CardContent/CardContent";
import Typography from "@material-ui/core/Typography/Typography";
import CardActions from "@material-ui/core/CardActions/CardActions";
// import Button from "@material-ui/core/Button/Button";
import Card from "@material-ui/core/Card/Card";
import ProjectEditDialog from "./ProjectEditDialog";
// import MiniAvatar from "../../atoms/MiniAvatar";

const styles = theme => ({
  card: {
    width: 400,
    height: 200,
    position: "relative",
  },
  cardActionArea: {
    "&:hover": {
      backgroundColor: "#fafafa"
                + "!important",
    },
  },
  cardHeader: {
    paddingTop: "16px",
    paddingBottom: "8px",
  },
  projectEditDialogWrap: {
    right: "8px",
    position: "absolute",
    zIndex: "5",
  },
  cardContent: {
    paddingTop: "0px",
  },
  description: {
    height: 120,
    marginTop: 0,
    overflow: "hidden",
    textOverflow: "ellipsis",
    webkitLineClamp: "3",
    webkitBoxOrient: "vertical",
  },
});


const ProjectCard = ({ project, onCardClick, classes }) => (
  <div>
    <Card key={project.id} className={classes.card}>
      <div className={classes.projectEditDialogWrap}>
        <ProjectEditDialog
          project_id={project.id}
          onMouseDown={(e) => {
            e.stopPropagation();
            e.preventDefault();
            e.nativeEvent.stopImmediatePropagation();
          }}
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            e.nativeEvent.stopImmediatePropagation();
          }}
          onMouseUp={(e) => {
            e.stopPropagation();
            e.preventDefault();
            e.nativeEvent.stopImmediatePropagation();
          }}
        />
      </div>

      <CardActionArea
        className={classes.cardActionArea}
        onClick={(e) => {
          onCardClick(project.id);
        }}
      >
        <CardHeader className={classes.cardHeader} title={project.title} />

        <CardContent className={classes.cardContent}>
          <Typography paragraph className={classes.description} component="p" color="textSecondary">
            {project.description}
          </Typography>
        </CardContent>

        <CardActions />
      </CardActionArea>
    </Card>
  </div>
);

ProjectCard.propTypes = {
  project: object.isRequired,
  onCardClick: func.isRequired,

};

export default withStyles(styles)(ProjectCard);

/*
const emptyMessage = (
    <tr>
        <td colSpan="7">Start a Workspace</td>
    </tr>
);

const sorted = this.props.projects.sort(function(a, b){
    return b.like - a.like;
});

// const sorted = this.props.medications.filter(medication => medication.like > 15)

const projectList = sorted.map(project =>
    <ProjectListItem
        key={project.id}
        editMed={this.props.editProject}
        deleteMed={this.props.deleteProject}
        project={project}/>
);

return (
    <tbody>
        {projectList.length === 0 ? emptyMessage : medicationList}
    </tbody>
)
*/
