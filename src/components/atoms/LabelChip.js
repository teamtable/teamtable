import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { object, func, string, number } from "prop-types";
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
  labelWrap: {
    display: "inline-block",
    paddingRight: "3px",


  },
  labelBackground: {
    backgroundColor: "#f5f5f5",
    borderRadius: "25px",
  },
  labelText: {
    ...theme.typography.button,
    fontWeight: "300",
    paddingLeft: "5px",
    paddingRight: "5px",
    fontSize: "10px",
    lineHeight: "16px",
    textTransform: "uppercase",
    marginTop: "5px !important",
  },
});

// used to be PureComponent !!!
class LabelChip extends React.Component {
    static propTypes = {
      label: string.isRequired,
      color: string,
      textSize: number,
    };

    render() {
      const { classes } = this.props;

      return (
        <div className={classes.labelWrap}>
          <div className={classes.labelBackground}>
            <div className={classes.labelText}>
              {this.props.label}
            </div>
          </div>
        </div>
      );
    }
}

export default (withStyles(styles)(LabelChip));
