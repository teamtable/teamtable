
import React from "react";
import { object, func } from "prop-types";
import { Draggable } from "react-beautiful-dnd";


import connect from "react-redux/es/connect/connect";

// Material UI
import withStyles from "@material-ui/core/styles/withStyles";
import Card from "@material-ui/core/Card";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider/Divider";
import ListCards from "./ListCards";
import ListFooter from "./ListFooter";
import ListHeader from "./ListHeader";

const styles = theme => ({
  list: {
    padding: "0px 0px 8px 0px",

  },
  card: {
    margin: "0px 15px 0px 15px",
    width: "400px",
    backgroundColor: "#fafafa",

  },
});

// used to be PureComponent !!!
class TodoList extends React.Component {
    static propTypes = {
      list: object.isRequired,
      onRemoveList: func,
      onCreateCard: func,
      onUpdateListTitle: func,
    };

    static getDerivedStateFromProps({ list: { cards } }) {
      const sortedCards = cards
        ? Object.values(cards).sort((a, b) => a.index - b.index)
        : [];
      return {
        sortedCards,
        currentIndex:
                sortedCards.length > 0 ? sortedCards[sortedCards.length - 1].index : 0,
      };
    }

    constructor(props) {
      super(props);
      this.state = {
        open: true, // turn this back to false in order to display the add task element
        currentIndex: 0,
        sortedCards: [],
      };
      // console.log(JSON.stringify(this.props.list));
    }


    componentWillUnmount() {
      document.removeEventListener("click", this.handleClickOutside);
    }

    setFormState = open => () => {
      this.setState({ open }, () => {
        if (open) {
          document.addEventListener("click", this.handleClickOutside);
        } else {
          document.removeEventListener("click", this.handleClickOutside);
        }
      });
    };

    handleClickOutside = (event) => {
      if (!this.state.open) {
        return;
      }

      if (this.form.contains(event.target)) {
        return;
      }

      this.setFormState(false)();
    };

    onAddCard = (title) => {
      const { onCreateCard } = this.props;
      const { currentIndex } = this.state;

      onCreateCard({
        title,
        index: currentIndex + 1,
      });
    };

    getFormRef = (node) => {
      this.form = node;
    };


    render() {
      const {
        list: { title, id, index },
        classes,
      } = this.props;

      const { open, sortedCards } = this.state;

      return (
        <Draggable draggableId={id.toString()} index={index}>
          {(provided, snapshot) => (
            // if we drag, add the dragging class
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
            >
              <Card className={classes.card}>
                <List dense className={classes.list}>
                  <ListHeader
                    className="listHeader"
                    title={title}
                    dragHandleProps={provided.dragHandleProps}
                    list={this.props.list}
                  />
                  <Divider light />
                  <ListCards
                    list_id={id.toString()}
                    cards={sortedCards}
                    listType="CARD"
                    isFormShow={open}
                    onAddCard={this.onAddCard}
                    getFormRef={this.getFormRef}
                    onCloseForm={this.setFormState(false)}
                  />
                  <Divider light />
                  {!open && <ListFooter onClick={this.setFormState(true)} />}
                </List>
              </Card>
            </div>
          )}
        </Draggable>
      );
    }
}


export default TodoList = connect()(withStyles(styles)(TodoList));


/*
const Container = styled.div`
  border-radius: 3px;
  background: white;
  display: flex;
  flex-direction: column;
  max-height: 100%;
  ${ifProp(
    'dragging',
    css`
      border: 1px solid black;
      border-bottom-color: black;
      box-shadow: 0 1px 6px black;
    `
)};
`;

        const CardWithRef = (props) => {
            return(
                <div {...props} ref={props.domref} style={{
                    borderRadius: "3px",
                    background: "white",
                    display: "flex",
                    flexDirection: "column",
                    maxHeight: "100%",
                    margin: "0px 15px 0px 15px"}}
                >

                        {props.children}

                </div>
            );
        };
 */
