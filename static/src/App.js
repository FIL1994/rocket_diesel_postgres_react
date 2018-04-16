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

  componentDidMount() {
    this.getPosts();
  }

  async getPosts() {
    const res = await axios.get("http://192.168.0.42/api/posts/all");
    this.setState({ posts: res.data });
    return res;
  }

  async updatePost(post) {
    const res = await axios.put(`http://192.168.0.42/api/posts/${post.id}`, post);
    return res;
  }

  render() {
    return (
      <Container>
        <Header as="h1">Posts</Header>
        <div className="ag-theme-material">
          <AgGridReact
            rowData={this.state.posts}
            enableSorting
            enableFilter
            enableColResize
            domLayout="autoHeight"
          >
            <AgGridColumn field="id" />
            <AgGridColumn
              editable
              field="title"
              onCellValueChanged={async ({ data, newValue, oldValue }) => {
                console.log("title changed", data, newValue, oldValue);
                await this.updatePost(data)
                this.getPosts();
              }}
            />
            <AgGridColumn editable field="body" />
            <AgGridColumn field="published" />
          </AgGridReact>
        </div>
      </Container>
    );
  }
}

export default App;
