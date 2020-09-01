import React, { useState } from "react";
import Table from "./Table";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as tableActions from "../../../redux/actions/tableActions";
import "./Table.css";
const TableList = (props) => {
  const [selectedItem, setSelectedItem] = useState("");
  const [input, setInput] = useState("");
  const handleFetchTableMetaData = ({ keyspace_name, table_name }) => {
    props.actions.loadTableMetaData(keyspace_name, table_name);
    setSelectedItem(table_name);
    props.actions.clearTableRows();
  };
  const handleKeyUp = (event) => {
    setInput(event.target.value);
  };
  const filterList = (event) => {
    const filteredList =
      props.tables &&
      props.tables
        .filter((table) => input === "" || table.table_name.includes(input))
        .map((table, index) => {
          return (
            <Table
              clickedItem={selectedItem}
              key={table.table_name}
              table={table}
              fetchTableMetaData={handleFetchTableMetaData}
            />
          );
        });
    return filteredList;
  };
  return (
    <aside id="left-content">
      <h4>Tables</h4>
      <input
        className="form-control mb-2 mt-2"
        id="myInput"
        type="text"
        placeholder="Search.."
        onKeyUp={handleKeyUp}
      />

      <div className="list-group">{filterList()}</div>
    </aside>
  );
};
function mapStateToProps(state) {
  return {
    tables: state.db.tables,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(tableActions, dispatch),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(TableList);
