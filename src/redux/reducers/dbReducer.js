import * as actionTypes from "../actions/actionTypes";
const INITIAL_STATE = {
  connections: [],
  keyspaces: [],
  tables: [],
  error: "",
};
export default function dbReducer(state = INITIAL_STATE, action) {
  let connections = [];
  switch (action.type) {
    case actionTypes.ADD_CONNECTION:
      console.log({ ...state });
      connections = [...state.connections];
      connections.push(action.connection);
      return { ...state, connections };

    case actionTypes.LOAD_CONNECTIONS:
      return { ...state, connections: action.connections };

    case actionTypes.OPEN_CONNECTION:
      connections = [...state.connections];
      connections = connections.map((elem) =>
        elem.connectionName === action.connection.connectionName
          ? { ...elem, isConnected: true }
          : { ...elem, isConnected: false }
      );
      return { ...state, connections, keyspaces: action.keyspaces };

    case actionTypes.CLOSE_CONNECTION:
      connections = [...state.connections];
      connections = connections.map((elem) =>
        elem.connectionName === action.connection.connectionName
          ? { ...elem, isConnected: false }
          : { ...elem }
      );

      return { ...state, connections, keyspaces: [], tables: [] };

    case actionTypes.CONNECTION_FAILED:
      console.log({ ...state, keyspaces: [], tables: [], error: action.error });
      return { ...state, keyspaces: [], tables: [], error: action.error };
    case actionTypes.LOAD_TABLES:
      return { ...state, tables: action.tables };
    default:
      return state;
  }
}