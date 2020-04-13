import { Constants } from "../_constants";

const initialState = {
  lists: {
    0: {
      id: 0,
      project_id: 1,
      title: "Development",
      index: 0,
      cards: {
        100: {
          id: 100,
          list_id: 0,
          index: 0,
          title: "Do this task, now because it is very very very important and this is a long message bro",
          completed: false,
          createdAt: "September 14, 2019",
          owner: 3000,
          members: [3000, 399, 20234],
          workers: [3000, 399, 20234],
          labels: [1, 2, 3],
        },
        101: {
          id: 101,
          list_id: 0,
          index: 1,
          title: "Also do this soon",
          completed: true,
          createdAt: "September 14, 2019",
          owner: 3000,
          members: [3000, 399, 20234],
          workers: [],
          labels: [1, 2, 3],
        },
        102: {
          id: 102,
          list_id: 0,
          index: 2,
          title: "Another task todo",
          completed: true,
          createdAt: "September 14, 2019",
          owner: 3000,
          members: [3000, 399, 20234],
          workers: [399, 20234],
          labels: [1, 2, 3],
        },
      },
    },
    1: {
      id: 1,
      project_id: 1,
      title: "Design",
      index: 1,
      cards: {
        10: {
          id: 10,
          list_id: 1,
          index: 0,
          title: "testCard10",
          completed: false,
          createdAt: "September 14, 2019",
          owner: 3000,
          members: [3000, 399, 20234],
          workers: [],
          labels: [1, 2, 3],
        },
        11: {
          id: 11,
          list_id: 1,
          index: 1,
          title: "testCard11",
          completed: false,
          createdAt: "September 14, 2019",
          owner: 3000,
          members: [3000, 399, 20234],
          workers: [],
          labels: [1, 2, 3],
        },
        12: {
          id: 12,
          list_id: 1,
          index: 2,
          title: "testCard12",
          completed: false,
          createdAt: "September 14, 2019",
          owner: 3000,
          members: [3000, 399, 20234],
          workers: [20234],
          labels: [1, 2, 3],
        },
        13: {
          id: 13,
          list_id: 1,
          index: 3,
          title: "testCard12",
          completed: true,
          createdAt: "September 14, 2019",
          owner: 3000,
          members: [3000, 399, 20234],
          workers: [399, 20234],
          labels: [1, 2, 3],
        },
      },
    },
  },

  fetching: true,
  project_id: -1,
  sortMode: 1,
};

export function workspace(state = initialState, action = {}) {
  switch (action.type) {
  case Constants.WORKSPACE_SET_CURRENT_PROJECT: {
    console.log("action.project_id", action.project_id);
    return { ...state, project_id: action.project_id };
  }


  case Constants.WORKSPACE_LISTS_GET_ALL_REQUEST:
    return { ...state, fetching: true };

  case Constants.WORKSPACE_LISTS_GET_ALL_SUCCESS: {
    console.log("succesdata: ", action.lists);
    return { ...state, lists: action.lists, fetching: false };
  }

  // whenever we add a new list
  case Constants.WORKSPACE_LISTS_CREATE_SUCCESS: {
    console.log("list create succesdata: ", action.data);

    const list = action.data;

    // add an index prop based on the position prop
    const { id } = list[Object.keys(list)[0]];
    list[id].index = list[id].position;

    return {
      ...state,
      lists: {
        ...state.lists,
        ...list,

      },
    };
  }

  case Constants.WORKSPACE_LIST_UPDATE_SUCCESS: {
    console.log("list update succesdata: ", action);

    const { list } = action;

    return {
      ...state,
      lists: {
        ...state.lists,
        [list.id]: {
          ...state.lists[list.id],
          ...list,
        },
      },
    };
  }

  // unused atm, since we getAllLists on deletition
  case Constants.WORKSPACE_LIST_DELETE_SUCCESS: {
    console.log("list delete succesdata: ", action);

    const { list_id } = action;
    let listToDelete = state.lists[list_id];
    listToDelete = {
      [listToDelete.id]: {
        ...listToDelete,
      },
    };

    return {
      ...state,
      // lists
      /*
                lists: {
                    // ES6 deconstructing
                    listToDelete[0],
                    ...state.lists,
                }
                */
    };
  }

  case Constants.WORKSPACE_LISTS_ADD_CARD_SUCCESS: {
    const cardObj = action.data;

    // replace with api return list
    const cardId = cardObj[Object.keys(cardObj)[0]].id;
    const card = cardObj[cardId];

    console.log(card);
    cardObj[cardId].index = calcNewCardIndex(state, cardObj[cardId].list_id);
    cardObj[cardId].list_id = cardObj[cardId].list_id;

    console.log(cardObj);

    return {
      ...state,
      lists: {
        ...state.lists,
        [card.list_id]: {
          ...state.lists[card.list_id],
          cards: {
            ...state.lists[card.list_id].cards,
            ...cardObj,
          },
        },
      },
    };
  }


  // whenever we move a card/list
  case Constants.WORKSPACE_LISTS_UPDATE_ALL:
    console.log("Update all lists to these: ");
    console.log(action.lists);
    return {
      ...state,
      lists: action.lists,
    };


  case Constants.WORKSPACE_LISTS_UPDATE_CARD:

    console.log(action.list_id, action.card);
    return {
      ...state,
      lists: {
        ...state.lists,
        [action.card.list_id]: {
          ...state.lists[action.card.list_id],
          cards: {
            ...state.lists[action.card.list_id].cards,
            [action.card.id]: action.card,
          },
        },
      },
    };

  default:
    return state;

        /*

        case Constants.WORKSPACE_LISTS_ADD: {
            let list = action.list;

            // replace with api return list
            //let id = list[Object.keys(list)[0]].id;
            //list[id].index = calcNewListIndex(state);
            //list[id].project_id = state.project_id;

            return {
                ...state,
                lists: {...state.lists, ...list}
            };
        }
        */
  }
}

function calcNewListIndex(state) {
  let index = 0;
  for (const key in state.lists) {
    if (state.lists.hasOwnProperty(key)) {
      const keyIndex = state.lists[key].index;
      if (index < keyIndex) index = keyIndex + 1;
    }
  }
  console.log(`new list index: ${index}`);
  return index;
}

function calcNewCardIndex(state, list_id) {
  console.log(`calc new index card: ${list_id}`);
  console.log("state.lists ", state.lists);
  let index = 0;
  for (const key in state.lists[list_id].cards) {
    if (state.lists[list_id].cards.hasOwnProperty(key)) {
      const keyIndex = state.lists[list_id].cards[key].index;
      if (index <= keyIndex) index = keyIndex + 1;
    }
  }
  console.log(`new card index: ${index}`);
  return index;
}

/*
        case Constants.LISTS_CREATE_ERROR:
            return { ...state, formErrors: action.errors };

        case Constants.LISTS_RESET:
            return { ...state, showForm: false, formErrors: null, ownedFetched: false, fetching: false, };

        case Constants.LISTS_FULL_RESET:
            return initialState;

        case Constants.LISTS_ADDED:
            const { invitedBoards } = state;
            return { ...state, invitedBoards: [action.board].concat(invitedBoards) };

        case Constants.LISTS_NEW_BOARD_CREATED:
            return { ...state, lists: [action.board].concat(workspace.lists) };
*/


/*
            2: {
                id: 2,
                project_id: 1,
                title: "Marketing",
                index: 2,
                cards: {
                    20: {
                        id: 20,
                        list_id: 2,
                        index: 0,
                        title: "testCard20",
                        completed: false,
                        createdAt: "September 14, 2019",
                        owner: 3000,
                        members: [3000, 399,20234],
                        workers: [3000, 399,20234],
                        labels: [1,2,3],
                    },
                    21: {
                        id: 21,
                        list_id: 2,
                        index: 1,
                        title: "testCard21",
                        completed: true,
                        createdAt: "September 14, 2019",
                        owner: 3000,
                        members: [3000, 399,20234],
                        workers: [],
                        labels: [1,2,3],
                    },
                    22: {
                        id: 22,
                        list_id: 2,
                        index: 2,
                        title: "testCard22",
                        completed: false,
                        createdAt: "September 14, 2019",
                        owner: 3000,
                        members: [3000, 399,20234],
                        workers: [3000, 399,20234],
                        labels: [1,2,3],
                    },
                },
            },
            3: {
                id: 3,
                project_id: 1,
                title: "Production",
                index: 3,
                cards: {
                    30: {
                        id: 30,
                        list_id: 3,
                        index: 0,
                        title: "testCard30",
                        completed: false,
                        createdAt: "September 14, 2019",
                        owner: 3000,
                        members: [3000, 399,20234],
                        workers: [3000, 399,20234],
                        labels: [1,2,3],
                    },
                    31: {
                        id: 31,
                        list_id: 3,
                        index: 1,
                        title: "testCard31",
                        completed: true,
                        createdAt: "September 14, 2019",
                        owner: 3000,
                        members: [3000, 399,20234],
                        workers: [3000, 399,20234],
                        labels: [1,2,3],
                    },
                    32: {
                        id: 32,
                        list_id: 3,
                        index: 2,
                        title: "testCard32",
                        completed: false,
                        createdAt: "September 14, 2019",
                        owner: 3000,
                        members: [3000, 399,20234],
                        workers: [],
                        labels: [1,2,3],
                    },
                },
            },
            4: {
                id: 4,
                project_id: 1,
                title: "Milestones",
                index: 4,
                cards: {
                    40: {
                        id: 40,
                        list_id: 4,
                        index: 0,
                        title: "testCard40",
                        completed: false,
                        createdAt: "September 14, 2019",
                        owner: 3000,
                        members: [3000, 399,20234],
                        workers: [],
                        labels: [1,2,3],
                    },
                    41: {
                        id: 41,
                        list_id: 4,
                        index: 1,
                        title: "testCard41",
                        completed: false,
                        createdAt: "September 14, 2019",
                        owner: 3000,
                        members: [3000, 399,20234],
                        workers: [],
                        labels: [1,2,3],
                    },
                    42: {
                        id: 42,
                        list_id: 4,
                        index: 2,
                        title: "testCard42",
                        completed: true,
                        createdAt: "September 14, 2019",
                        owner: 3000,
                        members: [3000, 399,20234],
                        workers: [],
                        labels: [1,2,3],
                    },
                },
            },

 */
