import React, { Component } from "react";
import { Container, Header, Modal } from "semantic-ui-react";
import axios from "axios";
import _ from "lodash";
import { toBoolean } from "underscore.string";
import { AgGridColumn, AgGridReact } from "ag-grid-react";
import { ToastContainer, toast } from "react-toastify";

import NumericEditor from "grid/NumericEditor";
import { URL } from "./constants";
import Fab from "./components/Fab";

class App extends Component {
  state = {
    posts: [],
    openModal: false
  };

  componentDidMount() {
    this.getPosts();
  }

  async getPosts() {
    const res = await axios.get(URL + "/api/posts/all");
    this.setState({ posts: res.data });
    return res;
  }

  async updatePost(post) {
    const res = await axios
      .put(`${URL}/api/posts/${post.id}`, post)
      .catch(err => err);
    if (_.isError(res)) {
      toast.error("Failed to update post #" + post.id);
      return;
    }

    toast.success("Successfully updated post #" + post.id);
    return res;
  }

  updateField = async (
    { data, newValue, oldValue },
    boolean = false,
    field = ""
  ) => {
    if (boolean) {
      newValue = toBoolean(newValue);
      oldValue = toBoolean(oldValue);
      data[field] = newValue;
    }

    if (newValue === oldValue) return;
    console.log("udate field", data, newValue, oldValue);
    await this.updatePost(data);
    this.getPosts();
  };

  render() {
    return (
      <Container>
        <Header as="h1">Posts</Header>
        <Fab icon="add" />
        <div className="ag-theme-material">
          <AgGridReact
            rowData={this.state.posts}
            enableSorting
            enableFilter
            enableColResize
            domLayout="autoHeight"
            frameworkComponents={{
              numericEditor: NumericEditor
            }}
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
            <AgGridColumn
              editable
              field="published"
              onCellValueChanged={info =>
                this.updateField(info, true, "published")
              }
              cellEditor="agSelectCellEditor"
              cellEditorParams={{ values: [true, false] }}
            />
          </AgGridReact>
        </div>
        <Modal
          isOpen={this.state.openModal}
          onClose={() => this.setState({ openModal: false })}
          children={<div />}
        />
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
