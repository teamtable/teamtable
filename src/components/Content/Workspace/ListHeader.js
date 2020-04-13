import React from "react";
import { string, func, object } from "prop-types";

import withStyles from "@material-ui/core/styles/withStyles";
import styled, { css } from "styled-components";
import Typography from "@material-ui/core/Typography";
import Fab from "@material-ui/core/Fab";

import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/EditOutlined";
import ListEditDialog from "./ListEditDialog";

import CardNewDialog from "./CardNewDialog";

const styles = theme => ({
  titleTextWrap: {
    minWidth: "299px",
    maxWidth: "299px",
    paddingLeft: "6px",
  },
  icon: {
    marginLeft: "4px",
    height: "40px",
    width: "40px",
  },
  iconInner: {
    marginTop: "-4px",
  },
  iconInnerEdit: {
    marginTop: "-2px",
    height: "20px",
    width: "20px",
  },
});

const Container = styled.div`
  display: inline-flex;
  align-items: center;
  margin-bottom: 2px;
  flex: 0 0 auto;
  padding: 12px 68px 10px 3px;
  min-height: 22px;
  position: relative;
`;

class ListHeader extends React.PureComponent {
    static propTypes = {
      list: object.isRequired,
      onUpdateTitle: func,
      onRemove: func,
      dragHandleProps: object,
    };

    // replace this with the props passed from the workspace
    static getDerivedStateFromProps(props, state) {
      if (props.title === state.prevTitle) {
        return null;
      }

      return {
        title: props.title,
        prevTitle: props.title,
      };
    }

    state = {
      title: this.props.title,
      prevTitle: this.props.title,
      showTarget: true,
    };

    input = null;

    getInputRef = (node) => {
      this.input = node;
      this.resizeInput();
    };

    resizeInput = () => {
      if (this.input) {
        this.input.style.height = "auto";
        this.input.style.height = `${this.input.scrollHeight}px`;
        this.input.style.height = `${
          this.input.scrollHeight < 40 ? 26 : this.input.scrollHeight
        }px`;
      }
    };

    render() {
      const { title } = this.state;
      const { dragHandleProps, list, classes } = this.props;
      return (
        <Container {...dragHandleProps} ref={this.getInputRef}>

          <ListEditDialog list={list} />

          <div className={classes.titleTextWrap}>
            <Typography variant="h5" component="h2">
              {title}
            </Typography>
          </div>


          <CardNewDialog list={this.props.list} />
        </Container>
      );
    }
}

export default withStyles(styles)(ListHeader);


/*
                <Fab elevation="2" size="small" color="primary" aria-label="Add" >
                    <AddIcon />
                </Fab>

<TitleInput
                    spellCheck={false}
                    autoCorrect={'false'}
                    maxLength={512}
                    ref={this.getInputRef}
                    value={title}
                    onChange={this.onChange}
                    onBlur={this.onBlur}
                    onKeyDown={this.handleKeydown}
                />
 */
