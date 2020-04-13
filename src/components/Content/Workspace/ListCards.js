import React from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { string, func, bool, array } from "prop-types";
import styled, { css } from "styled-components";

// import withStyles from "@material-ui/core/styles/withStyles";
import CardTask from "./CardTask";

/*
const styles = theme => ({
    container: {
        minHeight: "26px",
        display: "flex",
        flex: "1",
        flexDirection: "column",
        '&::-webkit-scrollbar-button': {
            display: "none",
        },
    },
    scrollView: {
        overFlowX: "hidden",
        overFlowY: "auto",
        flex: "1",
        minHeight: "100%",
        padding: "0 8px",
    },
});
*/

const Container = styled.div`
  min-height: 26px;
  flex: 1;
  display: flex;
  flex-direction: column;
  &::-webkit-scrollbar-button {
    display: none;
  }
`;

const ScrollView = styled.div`
  overflow-x: hidden;
  overflow-y: auto;
  max-height: 100%;
  flex: 1;
  padding: 0px 0px;
`;

class ListCards extends React.PureComponent {
    static propTypes = {
      list_id: string,
      listType: string,
      onAddCard: func,
      onCloseForm: func,
      getFormRef: func,
      cards: array,
    };


    calculateProgress(startDate, endDate) {
      if (!startDate || !endDate) return 0;

      return 1;
    }

    render() {
      const {
        list_id,
        listType,
        onAddCard,
        onCloseForm,
        getFormRef,
        cards,
      } = this.props;

      return (
        <Droppable droppableId={list_id} type={listType} ignoreContainerClipping>
          {provided => (
            <Container ref={provided.innerRef} {...provided.droppableProps}>
              <ScrollView>
                {cards.map(card => (
                  <Draggable
                    draggableId={card.id.toString()}
                    index={card.index}
                    key={card.id}
                  >
                    {(dragProvided, dragSnapshot) => (
                      <CardTask
                        domref={dragProvided.innerRef}
                        isDragging={dragSnapshot.isDragging}
                        {...dragProvided.dragHandleProps}
                        {...dragProvided.draggableProps}
                        card={card}
                      />
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </ScrollView>
            </Container>
          )}
        </Droppable>
      );
    }
}

export default ListCards;
