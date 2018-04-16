import React, { Component } from "react";
import { Container, Header } from "semantic-ui-react";
import axios from "axios";
import _ from "lodash";
import { AgGridColumn, AgGridReact } from "ag-grid-react";

import "./App.css";

class App extends Component {
  state = {
    posts: []
  };

  async componentDidMount() {
    const res = await axios.get("http://192.168.0.42/api/posts/all");
    console.log("res", res);
    this.setState({ posts: res.data });
  }

  render() {
    return (
      <Container>
        <Header as="h1">Posts</Header>
        <div
          className="ag-theme-material"
          style={{ height: 650, width: "100%", marginTop: 15 }}
        >
          <AgGridReact rowData={this.state.posts}>
            <AgGridColumn autoHeight field="id" />
            <AgGridColumn autoHeight field="title" />
            <AgGridColumn autoHeight field="body" />
            <AgGridColumn autoHeight field="published" />
          </AgGridReact>
        </div>
      </Container>
    );
  }
}

export default App;
