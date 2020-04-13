import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

// Maerial UI
import { withStyles } from "@material-ui/core/styles";
import green from "@material-ui/core/colors/green";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import IconCheck from "@material-ui/icons/Done";
import CircularProgress from "@material-ui/core/CircularProgress/CircularProgress";
import Tooltip from "@material-ui/core/Tooltip";
import CardEditDialog from "./CardEditDialog";
import MiniAvatar from "../../atoms/MiniAvatar";
import { workspaceActions } from "../../../_actions/workspaceActions";
import LabelChip from "../../atoms/LabelChip";

import Avatar1 from "../../../images/avatar-1.jpeg";
import Avatar4 from "../../../images/avatar-4.jpeg";

const styles = theme => ({
  cardWrapOnDrag: {
    background: "#fff",
    height: "60px",
    minWidth: 400,
    padding: "0",
    // webkitBoxShadow: "0px 1px 4px 1px rgba(0,0,0,0.05)",
    // boxShadow: "0px 1px 4px 1px rgba(0,0,0,0.05)",
  },
  listRipple: {
    color: "#b4b4b4",
  },
  card: {
    background: "#fff",
    height: "60px",
    minWidth: 400,
    padding: "0",
    "&:hover": {
      backgroundColor: "#fafafa"
                + "!important",
    },
  },
  cardText: {
    display: "inline",
    maxWidth: "290px",
    width: "290px",
    marginTop: "-4px",
    marginRight: "12.5px",
    paddingLeft: "5px",
    paddingRight: "0px",
  },
  cardSubText: {
    marginTop: "-4px !important",
  },
  cardTitle: {
    marginTop: "0px",
    ...theme.typography.subheading,
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    overflow: "hidden",
  },
  checkboxWrap: {
    position: "relative",
  },
  checkbox: {
    zIndex: "500",
    paddingLeft: "15px",
    paddingTop: "15px",
    marginTop: "3px",
    position: "absolute",
  },
  checkboxPlaceholder: {
    width: "50px",
    height: "20px",
  },
  checkboxWorked: {
    paddingLeft: "15px",
  },
  checkboxChecked: {
    color: `${green[500]} !important`,
    fill: green[500],
  },
  icon: {
    fontSize: 20,
    zIndex: "1001",
    position: "absolute",
    marginLeft: "8px",
    marginTop: "9px",
  },
  iconCheck: {
    fontSize: 20,
    zIndex: "1001",
    color: green[500],
    position: "absolute",
    marginLeft: "6px",
    marginTop: "8px",
  },
  focusVisible: {
    backgroundColor: "#222222",
  },
  progressWrap: {
    marginTop: "-18px",
  },
  innerProgressWrap: {
    zIndex: "6",
    position: "absolute",
    width: "32px",
    height: "34px",
  },
  progress: {
    float: "right",
    position: "absolute",
    zIndex: "2",
    marginTop: "2px",
    color: "#9b9b9b",
  },
  progressCompleted: {
    float: "right",
    position: "absolute",
    zIndex: "2",
    marginTop: "2px",
    color: green[500],
  },
  progressSmall: {
    float: "right",
    position: "absolute",
    zIndex: "3",
    marginTop: "4px",
  },
  progressBackground: {
    float: "right",
    position: "absolute",
    zIndex: "0",
    marginTop: "2px",
    color: "#f0f0f0",
  },
  tooltipPlacement: {
    marginTop: "4px",
  },
  secondLineWrap: {
    marginTop: "-4px",
  },
  labelsWrap: {
    paddingLeft: "2px",
    paddingRight: "2px",
    display: "inline-flex",
  },
  avatarWrap: {
    display: "inline-flex",
    paddingLeft: "1px",
  },
  subText: {
    fontSize: "11px",
    display: "inline-flex",
  },
});


class CardTask extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editDialogOpen: false,
    };
  }


    handleCheckboxChange = (event) => {
      event.stopPropagation();
      event.preventDefault();
      this.toggleCompletion();
    };

    toggleCompletion() {
      const { card } = this.props;
      card.completed = !card.completed;
      this.updateCard(card);
    }

    updateCard = (card) => {
      const { dispatch } = this.props;
      dispatch(workspaceActions.updateCard(card));
    };

    openEditDialog = (e) => {
      this.setState({ editDialogOpen: true });
    };

    closeEditDialog = () => {
      this.setState({ editDialogOpen: false });
    };

    render() {
      const { card, domref, classes, ...props } = this.props;


      return (
        <div {...this.props} ref={domref}>

          <div className={classes.checkboxWrap}>
            <Checkbox
              className={classes.checkbox}
              classes={{ checked: classes.checkboxChecked }}
              onChange={this.handleCheckboxChange}
              checked={card.completed}
            />
          </div>

          <ListItem button onMouseUp={this.openEditDialog} className={this.props.isDragging ? classes.cardWrapOnDrag : classes.card} TouchRippleProps={{ classes: { root: classes.listRipple } }}>

            <div className={classes.checkboxPlaceholder} />

            <ListItemText
              disableTypography
              className={classes.cardText}
              classes={{ secondary: classes.cardSubText }}
              primary={(
                <div className={classes.cardTitle}>
                  {card.title}
                </div>
              )}
              secondary={(
                <>
                  <div className={classes.secondLineWrap}>
                    <div className={classes.avatarWrap}>
                      <MiniAvatar srcRef={Avatar1} />
                      <MiniAvatar srcRef={Avatar4} />
                    </div>
                    <div className={classes.labelsWrap}>
                      <LabelChip label="Feature" />
                      <LabelChip label="Optional" />
                      <LabelChip label="Idea" />
                    </div>
                  </div>
                </>
              )}
            />


            <div>
              <div className={classes.progressWrap}>
                <CircularProgress size={32} variant="static" value={100} className={classes.progressBackground} />
                <Tooltip
                  title={(
                    <>
                      {"18 hours left"}
                    </>
                  )}
                  classes={{
                    tooltipPlacementBottom: classes.tooltipPlacement,
                  }}
                >
                  <div className={classes.innerProgressWrap}>
                    <CircularProgress
                      size={32}
                      variant="static"
                      value={card.completed ? 100 : card.index * 10 + 30}
                      className={card.completed ? classes.progressCompleted : classes.progress}
                    />


                    {card.completed ? <IconCheck className={classes.iconCheck} /> : null}
                  </div>
                </Tooltip>

              </div>

            </div>

          </ListItem>

          <CardEditDialog card={this.props.card} open={this.state.editDialogOpen} closeDialog={this.closeEditDialog} />

        </div>
      );
    }
}

export default connect()(withStyles(styles)(CardTask));

/*
<Divider light />

<IconTimer className={classes.icon}/>


className={this.props.isDragging ? classes.cardWrapOnDrag : classes.card}


 <div className={classes.subText}>
                                    {"September 14, 2016"}
                                </div>


<Avatar aria-label="Recipe" className={classes.avatar}>
                                    R
                                </Avatar>
 */

/*
const styles = {
    card: {
        minWidth: 260,

    },
    contentWrap: {
      width: "100%",
      display: "inline",
    },
    focusVisible:{
        backgroundColor: "#222222",
    },
    title: {
        fontSize: 14,
    },
    titleTextWrap: {
        maxWidth: "280px",
        textOverflow: "ellipsis !important",
        overflow: "hidden",
        display: 'inline-block',
        lineHeight: "24px",
    },
    progress: {
        float: "right",
    }
};

<CardContent className={classes.contentWrap}>
                            <Typography component="p" className={classes.titleTextWrap}>

                            </Typography>
                            <CircularProgress size={30} variant="static" value={card.index * 10 + 30} className={classes.progress}/>
                        </CardContent>
 */


// <div style={{height: "15px", width: "100%"}}/>

/*
const Card = ({ onClick, completed, text }) => (
    <li
        onClick={onClick}
        style={{
            textDecoration: completed ? 'line-through' : 'none'
        }}
    >
        {text}
    </li>
);

Card.propTypes = {
    onClick: PropTypes.func.isRequired,
    completed: PropTypes.bool.isRequired,
    text: PropTypes.string.isRequired
};

export default Card
 */


/*
<li
                    style={{
                        textDecoration: card.completed ? 'line-through' : 'none'
                    }}
                >
                    {card.title}
                </li>
 */
