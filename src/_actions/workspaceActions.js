import { workspaceService } from "../_services/workspace.service";
import { Constants } from "../_constants";
import { projectService } from "../_services/project.service";


export const workspaceActions = {
  setCurrentProject,
  getAllLists,
  getCurrentLists,
  addList,
  updateListsState,
  updateList,
  deleteList,
  updateListPositions,
  updateCardPosition,
  addCard,
  updateCard,
  deleteCard,

  // unused for now
  createCard,
  getCard,

};

function setCurrentProject(project_id) {
  return (dispatch) => {
    dispatch(update(project_id));
  };

  function update(project_id) {
    return { type: Constants.WORKSPACE_SET_CURRENT_PROJECT, project_id };
  }
}

function getAllLists(project_id) {
  return (dispatch) => {
    dispatch(request());
    return workspaceService.getAllLists(project_id).then(
      (data) => {
        let formattedLists = {};
        for (const listKey in data) {
          if (data.hasOwnProperty(listKey)) {
            // add an index to all fetched cards (because they miss one)
            let indexedCards = {};
            for (const cardKey in data[listKey].cards) {
              if (data[listKey].cards.hasOwnProperty(cardKey)) {
                const indexedCard = {
                  [data[listKey].cards[cardKey].id]: {
                    ...data[listKey].cards[cardKey],
                    index: data[listKey].cards[cardKey].position,
                  },
                };

                indexedCards = {
                  ...indexedCards,
                  ...indexedCard,
                };
              }
            }

            // wrap the list with the id as required and add an index
            const wrappedList = {
              [data[listKey].id]: {
                ...data[listKey],
                index: data[listKey].position,
                cards: indexedCards,
              },
            };

            // join the lists
            formattedLists = {
              ...formattedLists,
              ...wrappedList,
            };
          }
        }

        console.log("fetched lists", formattedLists);
        dispatch(success(formattedLists));
        return Promise.resolve(formattedLists); // TODO: Evt. lieber die Projekte aus state holen statt sie zu übergeben
      },
      (error) => {
        console.log(error);
        // dispatch(failure(error.toString()));
        // dispatch(alertActions.error(error.toString()));
        return Promise.reject(error);
      },
    );
  };

  function request() {
    return { type: Constants.WORKSPACE_LISTS_GET_ALL_REQUEST };
  }

  function success(lists) {
    return { type: Constants.WORKSPACE_LISTS_GET_ALL_SUCCESS, lists };
  }
}

function getCurrentLists() {
  return (dispatch) => {
    dispatch(request());
    return workspaceService.getCurrentLists().then(
      (data) => {
        let formattedLists = {};
        for (const listKey in data) {
          if (data.hasOwnProperty(listKey)) {
            // add an index to all fetched cards (because they miss one)
            let indexedCards = {};
            for (const cardKey in data[listKey].cards) {
              if (data[listKey].cards.hasOwnProperty(cardKey)) {
                const indexedCard = {
                  [data[listKey].cards[cardKey].id]: {
                    ...data[listKey].cards[cardKey],
                    index: data[listKey].cards[cardKey].position,
                  },
                };

                indexedCards = {
                  ...indexedCards,
                  ...indexedCard,
                };
              }
            }

            // wrap the list with the id as required and add an index
            const wrappedList = {
              [data[listKey].id]: {
                ...data[listKey],
                index: data[listKey].position,
                cards: indexedCards,
              },
            };

            // join the lists
            formattedLists = {
              ...formattedLists,
              ...wrappedList,
            };
          }
        }

        console.log("fetched lists", formattedLists);
        dispatch(success(formattedLists));
        return Promise.resolve(formattedLists); // TODO: Evt. lieber die Projekte aus state holen statt sie zu übergeben
      },
      (error) => {
        console.log(error);
        // dispatch(failure(error.toString()));
        // dispatch(alertActions.error(error.toString()));
        return Promise.reject(error);
      },
    );
  };

  function request() {
    return { type: Constants.WORKSPACE_LISTS_GET_ALL_REQUEST };
  }

  function success(lists) {
    return { type: Constants.WORKSPACE_LISTS_GET_ALL_SUCCESS, lists };
  }
}

function addList(project_id, title) {
  const list = {
    title,
    description: "Tdestfdsbsdfbsd projekt",
    project_id,
  };

  return (dispatch) => {
    dispatch(request(project_id, list));
    return workspaceService.addList(project_id, list)
      .then(
        (data) => {
          const list = {
            [data.id]: {
              ...data,
            },
          };

          dispatch(success(list));
          return Promise.resolve(list);
        },
        (error) => {
          console.log(error);
          // dispatch(failure(error.toString())); // TODO: error handling
          // dispatch(alertActions.error(error.toString()));
          return Promise.reject(error);
        },
      );
  };

  function request(title, description) {
    return { type: Constants.WORKSPACE_LISTS_CREATE_REQUEST, title, description };
  }

  function success(data) {
    console.log("list to add to the reducer: ", JSON.stringify(data));
    return { type: Constants.WORKSPACE_LISTS_CREATE_SUCCESS, data };
  }
}

// after changing indexes for instance we want to send these changes to the reducer, in order to update the state for all components in order for them to access the newly updated lists.
function updateListsState(lists) {
  return { type: Constants.WORKSPACE_LISTS_UPDATE_ALL, lists };

  /*
    const cardRef = Firebase.database.ref(`list/${data.list_id}/cards/${data.id}`);
    return cardRef.update(data)
    */
}

// edit list
function updateList(list_id, title) {
  const list = {
    title,
    list_id,
  };

  return dispatch => workspaceService.updateList(list)
    .then(
      () =>
      // updated list successfully
        Promise.resolve(),
      (error) => {
        console.log(error);
        // dispatch(failure(error.toString())); // TODO: error handling
        // dispatch(alertActions.error(error.toString()));
        return Promise.reject();
      },
    ).then(() => {
      // get the successfully updated list TODO: put the list directly into the update response to avoid the need to get it here again
      workspaceService.getListById(list_id).then(
        (data) => {
          console.log(`Call dispatch with updated list: ${JSON.stringify(data)}`);
          dispatch(success(data));
        },
      );
    });

  function success(list) {
    return { type: Constants.WORKSPACE_LIST_UPDATE_SUCCESS, list };
  }
}

function deleteList(list_id, project_id) {
  return dispatch =>
  // dispatch(request(list_id));
    workspaceService.deleteList(list_id)
      .then(
        () =>
        // dispatch(success(list_id));
          Promise.resolve(),
        (error) => {
          console.log(error);
          // dispatch(failure(error.toString())); // TODO: error handling
          // dispatch(alertActions.error(error.toString()));
          return Promise.reject();
        },
      ).then(() => {
        console.log("deleteList resolve promise");
        dispatch(getAllLists(project_id));
      });
}


function updateListPositions(newLists) {
  // console.log( "updateListPositions newLists: ", newLists);
  /*
    PATCH /list-positions
params = { list_positions: [
      { card_id: 2, position: 2 },
      { card_id: 3, position: 1 },
      { card_id: 6, position: 3 },
    ] }

    params = { list_positions: [
      { list_id: @lists[1].id, position: 3 },
      { list_id: @lists[0].id, position: 4 }
    ] }
     */

  const list_positions = [];

  for (const listKey in newLists) {
    if (newLists.hasOwnProperty(listKey)) {
      const list = newLists[listKey];

      const listPosition = {
        list_id: list.id,
        position: list.index,
      };

      list_positions.push(listPosition);
    }
  }

  console.log("updateListPositions list_positions: ", list_positions);

  return (dispatch) => {
    // dispatch(request(list_id));
    dispatch(updateListsState(newLists));
    return workspaceService.updateListPositions(list_positions)
      .then(
        () =>
        // dispatch(success(list_id));
          Promise.resolve(),
        (error) => {
          console.log(error);
          // dispatch(failure(error.toString())); // TODO: error handling
          // dispatch(alertActions.error(error.toString()));
          return Promise.reject();
        },
      ).then(() => {
        console.log("updateListPositions resolve promise");
        const firstlist_id = newLists[Object.keys(newLists)[0]].id;
        const firstList = newLists[firstlist_id];

        // dispatch(getAllLists(firstList.project_id));
      });
  };
}

function updateCardPosition(card_id, list_id, changedLists, newLists) {
  // iterate over all cards in the changed lists and add them to our card_positions array in order to perform a position PATCH
  const card = {
    id: card_id,
    list_id,
  };

  const card_positions = [];

  for (const listKey in changedLists) {
    if (changedLists.hasOwnProperty(listKey)) {
      for (const cardKey in changedLists[listKey].cards) {
        if (changedLists[listKey].cards.hasOwnProperty(cardKey)) {
          const currentCard = changedLists[listKey].cards[cardKey];
          const cardPosition = {
            card_id: currentCard.id,
            position: currentCard.index,
          };
          card_positions.push(cardPosition);
        }
      }
    }
  }

  const cardsPatch = {
    card,
    card_positions,
  };
  return (dispatch) => {
    // dispatch(request(list_id));
    dispatch(updateListsState(newLists));
    return workspaceService.updateCardPositions(cardsPatch)
      .then(
        () =>
        // dispatch(success(list_id));
          Promise.resolve(),
        (error) => {
          console.log(error);
          // dispatch(failure(error.toString())); // TODO: error handling
          // dispatch(alertActions.error(error.toString()));
          return Promise.reject();
        },
      );
  };
}


function addCard(project_id, list_id, title) {
  const card = {
    title,
    list_id,
  };

  return (dispatch) => {
    dispatch(request(card));
    return workspaceService.addCard(project_id, list_id, card)
      .then(
        (data) => {
          const card = {
            [data.id]: {
              ...data,
            },
          };

          dispatch(success(card));
          return Promise.resolve(card);
        },
        (error) => {
          console.log(error);
          // dispatch(failure(error.toString())); // TODO: error handling
          // dispatch(alertActions.error(error.toString()));
          return Promise.reject(error);
        },
      );
  };

  function request(data) {
    return { type: Constants.WORKSPACE_LISTS_ADD_CARD_REQUEST, data };
  }

  function success(data) {
    console.log("card to add to the reducer: ", JSON.stringify(data));
    return { type: Constants.WORKSPACE_LISTS_ADD_CARD_SUCCESS, data };
  }

  function failure(error) {
    return { type: Constants.WORKSPACE_LISTS_ADD_CARD_FAILURE, error };
  }
}


// edit list
function updateCard(_card) {
  const card = {
    title: _card.title,
  };

  return dispatch => workspaceService.updateCard(card, _card.id)
    .then(
      () => {
        // updated list successfully
        dispatch(success(_card));
        return Promise.resolve();
      },
      (error) => {
        console.log(error);
        // dispatch(failure(error.toString())); // TODO: error handling
        // dispatch(alertActions.error(error.toString()));
        return Promise.reject();
      },
    )/* .then(() => {

                // get the successfully updated list TODO: put the list directly into the update response to avoid the need to get it here again
                workspaceService.getListById(_card.list_id).then(
                    data => {
                        console.log("Call dispatch with updateCard: " + JSON.stringify(data));

                    }
                )
            }); */
  ;

  function success(card) {
    return { type: Constants.WORKSPACE_LISTS_UPDATE_CARD, card };
  }
}


function deleteCard(card_id, project_id) {
  return dispatch =>
  // dispatch(request(list_id));
    workspaceService.deleteCard(card_id)
      .then(
        () =>
        // dispatch(success(list_id));
          Promise.resolve(),
        (error) => {
          console.log(error);
          // dispatch(failure(error.toString())); // TODO: error handling
          // dispatch(alertActions.error(error.toString()));
          return Promise.reject();
        },
      ).then(() => {
        console.log("deleteList resolve promise");
        dispatch(getCurrentLists());
      });
}


/*
function addList(title) {

    // just push and dispatch the return (including the id + index) with WORKSPACE_LISTS_ADD
    let randId = Math.floor((Math.random() * 100) + 1) + 10;
    let randBigId = randId + 50;
    let list = {
        [randId]: {
            id: randId,
            project_id: -1,
            title: title,
            index: -1,
            cards: {
                [randBigId]: {
                    id: randBigId,
                    list_id: randId,
                    index: 0,
                    title: "Custom List Card",
                    completed: false,
                    createdAt: "September 14, 2019",
                    owner: 3000,
                    members: [3000, 399,20234],
                    workers: [],
                    labels: [1,2,3],
                },
            },
        }
    };
    return { type: Constants.WORKSPACE_LISTS_ADD, list };
}


function addCard(project_id, list_id, title) {

    // just push and dispatch the return (including the id + index) with WORKSPACE_LISTS_ADD
    let randBigId = Math.floor((Math.random() * 1000) + 1)  + 160;

    let card = {
        [randBigId]: {
            id: randBigId,
            list_id: list_id,
            index: 0,
            title: title,
            completed: false,
            createdAt: "September 14, 2019",
            owner: 3000,
            members: [3000, 399,20234],
            workers: [],
            labels: [1,2,3],
        },
    };


    return { type: Constants.WORKSPACE_LISTS_ADD_CARD, card };
}
*/


export const createCard = ({ list_id, project_id, title, index, onComplete }) => {
  /*
    const cardRefs = Firebase.database.ref('list').child(list_id);
    const cardId = cardRefs.push().key;
    return Firebase.database
        .ref('list')
        .child(list_id)
        .update(
            {
                [`cards/${cardId}`]: { list_id, boardId, title, id: cardId, index },
            },
            onComplete
        )
        */
};

export const getCard = ({ list_id, cardId, onCardChange }) => {
  /*
    const cardRef = Firebase.database.ref(`list/${list_id}/cards/${cardId}`);
    cardRef.on('value', snapshot => onCardChange(snapshot.val()))
    return () => cardRef.off('value')
    */
};

/*
function updateCard ( card ) {
    return { type: Constants.WORKSPACE_LISTS_UPDATE_CARD, card };


    //const cardRef = Firebase.database.ref(`list/${data.list_id}/cards/${data.id}`);
    //return cardRef.update(data)

}
*/

export const removeCard = () => {};
