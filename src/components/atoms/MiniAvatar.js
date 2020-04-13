import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { object, func, string, number } from "prop-types";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";

const styles = theme => ({
  avatarWrap: {
    display: "inline-block",
    position: "relative",
    height: "16px",
    width: "20px",
  },
  avatarBackground: {
    marginTop: "6px",
    position: "absolute",
    backgroundColor: "#f5f5f5",
    borderRadius: "25px",
  },
  avatar: {
    height: "14px",
    width: "14px",
  },
});

// used to be PureComponent !!!
class MiniAvatar extends React.Component {
    static propTypes = {
      srcRef: string.isRequired,
      altRef: string,
    };

    render() {
      const { classes } = this.props;

      return (
        <div className={classes.avatarWrap}>
          <div className={classes.avatarBackground}>
            <Avatar alt={this.props.altRef} src={this.props.srcRef} className={classes.avatar} />
          </div>
        </div>
      );
    }
}

export default (withStyles(styles)(MiniAvatar));
