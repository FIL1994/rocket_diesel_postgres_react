import React, { Component } from "react";
import { Container, Header } from "semantic-ui-react";
import axios from "axios";
import _ from "lodash";
import { AgGridColumn, AgGridReact } from "ag-grid-react";
import { ToastContainer, toast } from "react-toastify";

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
    const res = await axios
      .put(`http://192.168.0.42/api/posts/${post.id}`, post)
      .catch(err => err);
    if (_.isError(res)) {
      toast.error("Failed to update post #" + post.id);
      return;
    }

    toast.success("Successfully updated post #" + post.id);
    return res;
  }

  updateField = async ({ data, newValue, oldValue }) => {
    if (newValue === oldValue) return;
    await this.updatePost(data);
    this.getPosts();
  };

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
              onCellValueChanged={this.updateField}
            />
            <AgGridColumn
              editable
              field="body"
              onCellValueChanged={this.updateField}
            />
            <AgGridColumn field="published" />
          </AgGridReact>
        </div>
        <ToastContainer
          className="my-toast"
          position={toast.POSITION.BOTTOM_CENTER}
          autoClose={5000}
        />
      </Container>
    );
  }
}

export default App;
