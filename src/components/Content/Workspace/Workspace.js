import React from "react";
import { object } from "prop-types";
import { withRouter } from "react-router-dom";

import withStyles from "@material-ui/core/styles/withStyles";
import styled from "styled-components";
import connect from "react-redux/es/connect/connect";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

import { workspaceActions } from "../../../_actions/workspaceActions";
import TodoList from "./TodoList";
import { projectActions } from "../../../_actions/projectActions";

/*
const styles = theme => ({
    canvas: {
        position: "relative",
        flex: "1",
    },
    content:{
        position: "absolute",
        top: "0",
        left: "0",
        right: "0",
        bottom: "0",
        userSelect: "none",
        overflowX: "auto",
        overflowY: "hidden",
        marginBottom: "8px",
        paddingBottom: "8px",
        whiteSpace: "nowrap",
    },
    column: {
            width: "272px",
            height: "100%",
            margin: "0 4px",
            display: "inline-block",
            verticalAlign: "top",
    },
    columnFirstChild: {
        marginLeft: "8px",
    },
    columnLastChild: {
        marginRight: "8px",
    }
});
*/

const Canvas = styled.div`
  flex: 1;
  position: relative;
`;

const Content = styled.div`
  position: relative;
  height: calc(100vh - 83px);
  top: 15px;
  left: 0;
  right: 0;
  bottom: 0;
  user-select: none;
  overflow-x: auto;
  overflow-y: hidden;
  margin-bottom: 8px;
  padding-bottom: 8px;
  white-space: nowrap;
`;

const Column = styled.div`
  height: 100%;
  padding: 2px 0px 0px 0px;
  display: inline-block;
  vertical-align: top;
  &:first-child {
    margin-left: 16px;
  }
  &:last-child {
    margin-right: 8px;
  }
`;


class Workspace extends React.PureComponent {
    static propTypes = {
      // project id match
      match: object,
    };

    state = {
      sortedLists: [],
      currentIndex: 0,
    };

    // this component just loaded, get all of our lists/cards from the server. Then sort them.
    componentDidMount() {
      const { dispatch } = this.props;

      if (this.props.match.params.id !== "undefined") {
        dispatch(projectActions.getAll());
        dispatch(workspaceActions.setCurrentProject(this.props.match.params.id));
      }


      console.log("componentDIdMount match: ", this.props.match.params.id);


      dispatch(workspaceActions.getAllLists(this.props.match.params.id)).then(((projects) => {
        this.resortLists(this.props.workspace.lists);
      }));
    }

    componentDidUpdate(prevProps) {
      if (prevProps.workspace.lists !== this.props.workspace.lists) { console.log("update component"); this.resortLists(this.props.workspace.lists); }
    }

    // sort our lists based on index
    resortLists(listToUpdate) {
      console.log(`resort!: ${JSON.stringify(listToUpdate)}`);
      if (listToUpdate != null) {
        const sorted = Object.values(listToUpdate).sort((a, b) => a.index - b.index);

        console.log(sorted);
        this.setState({ sortedLists: sorted });
      }
    }

    // drag handling
    onDragEnd = (result) => {
      const { destination, source, type, draggableId } = result;

      if (!destination) {
        return;
      }

      const destinationIndex = destination.index;
      const sourceIndex = source.index;

      const { dispatch } = this.props;
      const { lists } = this.props.workspace;
      const { sortedLists } = this.state;
      const mutatedLists = { ...lists };

      let differenceList = {};

      // console.log("onDragEnd - sortedList: " + sortedLists + " mutatedList:" + JSON.stringify(mutatedList));

      if (type === "LIST") {
        const moveToRight = destinationIndex > sourceIndex;
        const moveToLeft = destinationIndex < sourceIndex;
        const notMove = destinationIndex === sourceIndex;

        if (notMove) {
          return;
        }

        sortedLists.map((item) => {
          const itemIndex = item.index;

          if (item.index === sourceIndex) {
            console.log(`map - item.id: ${item.id} mutatedList[item.id]: ${JSON.stringify(mutatedLists[item.id])}`);
            mutatedLists[item.id].index = destinationIndex;
          }

          if (
            moveToRight
                    && itemIndex <= destinationIndex
                    && itemIndex > sourceIndex
          ) {
            mutatedLists[item.id].index -= 1;
          }

          if (
            moveToLeft
                    && itemIndex >= destinationIndex
                    && itemIndex < sourceIndex
          ) {
            mutatedLists[item.id].index += 1;
          }
        });

        // console.log("mutatedList list: " + JSON.stringify(mutatedList));
        // this.updateSortedLists(mutatedLists);

        dispatch(workspaceActions.updateListPositions(mutatedLists));
        // this.resortLists(mutatedLists)
        // INCLUDE THIS BACK IN WHEN USING REDUCERS
        // workspaceActions.updateList(mutatedList)
      }

      if (type === "CARD") {
        const destinationDroppableId = destination.droppableId;
        const sourceDroppableId = source.droppableId;
        const sourceList = mutatedLists[sourceDroppableId];
        const destinationList = mutatedLists[destinationDroppableId];


        if (destinationDroppableId === sourceDroppableId) {
          // Same list
          const moveTop = destinationIndex < sourceIndex;
          const moveDown = destinationIndex > sourceIndex;
          const notMove = destinationIndex === sourceIndex;

          if (notMove) {
            return;
          }

          Object.values(sourceList.cards).map((card) => {
            const cardIndex = card.index;
            const cardId = card.id;
            if (cardIndex === sourceIndex) {
              sourceList.cards[cardId].index = destinationIndex;
            }

            if (
              moveDown
                        && cardIndex <= destinationIndex
                        && cardIndex > sourceIndex
            ) {
              sourceList.cards[cardId].index -= 1;
            }

            if (
              moveTop
                        && cardIndex >= destinationIndex
                        && cardIndex < sourceIndex
            ) {
              sourceList.cards[cardId].index += 1;
            }
          });

          differenceList = {
            ...differenceList,
            sourceList,
          };
        } else {
          // Different list

          // Reorder sourceList.cards
          Object.values(sourceList.cards).map((card) => {
            if (card.index > sourceIndex) {
              sourceList.cards[card.id].index -= 1;
            }
          });

          const finalDestinationIndex = destinationIndex;

          // Add card to destinationList.cards
          destinationList.cards = {
            ...destinationList.cards,
            [draggableId]: {
              ...sourceList.cards[draggableId],
              index: finalDestinationIndex,
              list_id: destination.list_id,
            },
          };

          // console.log("destinationList.cards: " + JSON.stringify(destinationList.cards));

          // Reorder destinationList.cards
          Object.values(destinationList.cards)
            .filter(({ id }) => id !== draggableId)
            .map((card) => {
              if (card.index >= finalDestinationIndex && card.id.toString() !== draggableId) {
                destinationList.cards[card.id].index += 1;
              }
            });

          // Delete card from sourceList.cards
          delete sourceList.cards[draggableId];

          differenceList = {
            ...differenceList,
            sourceList,
            destinationList,
          };
        }

        console.log("differenceList: ", differenceList);

        // console.log("mutatedList card: " + JSON.stringify(mutatedList));
        // this.setState( {sortedLists:  Object.values(mutatedLists)} );
        // INCLUDE THIS BACK IN WHEN USING REDUCERS


        dispatch(workspaceActions.updateCardPosition(draggableId, destinationList.id, differenceList, mutatedLists));

        // this.resortLists(mutatedLists)
      }
    };

    onCreateList = (title) => {
      const {
        match: { params },
      } = this.props;
      workspaceActions.createList({
        title,
        project_id: params.id,
        index: this.state.currentIndex + 1,
      });
    };

    onCreateCard = (list_id, project_id) => ({ index, title }) => {
      workspaceActions.createCard({ list_id, project_id, index, title });
    };

    onRemoveList = list_id => () => {
      workspaceActions.deleteList({ list_id });
    };

    onUpdateList = list => (title) => {
      workspaceActions.updateList({ [list.id]: { ...list, title } });
    };


    render() {
      const { lists } = this.props.workspace;
      const { sortedLists } = this.state;
      if (!lists || !sortedLists) {
        // loading progress alternatively
        return null;
      }
      // console.log("sortedLists: " + JSON.stringify(this.state.sortedLists));

      return (
        <DragDropContext onDragEnd={this.onDragEnd}>
          <Canvas>
            <Droppable droppableId="list" type="LIST" direction="horizontal">
              {provided => (
                <Content
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {sortedLists.map(list => (
                    <Column key={list.id}>
                      <TodoList
                        list={list}
                        onCreateCard={this.onCreateCard(list.id, list.project_id)}
                        onRemoveList={this.onRemoveList(list.id)}
                        onUpdateListTitle={this.onUpdateList(list)}
                      />
                    </Column>
                  ))}
                  {provided.placeholder}

                </Content>
              )}
            </Droppable>
          </Canvas>
        </DragDropContext>
      );
    }
}

/*
                                <Column>
                                    <InitialList onCreate={this.onCreateList} />
                                </Column>
                                */


function mapStateToProps(state) {
  const { workspace } = state;
  console.log("workspace state update: ", state);
  return {
    workspace,
  };
}


export default withRouter(connect(mapStateToProps)(Workspace));
