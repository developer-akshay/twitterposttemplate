import React, { Component } from "react";
import { Card } from "react-bootstrap";
import html2canvas from "html2canvas";
import ReactDOM from "react-dom";
import jsPdf from "jspdf";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import canvasToImage from "canvas-to-image";

import like from "./assets/icons/like.png";
import download from "./assets/icons/download.png";
import like1 from "./assets/icons/like1.png";
import share from "./assets/icons/sha.png";
import uploading from "./assets/icons/twi.png";
import comm from "./assets/icons/comm.png";

import "./App.css";
class App extends Component {
  constructor() {
    super();
    this.state = {
      profileImage: null,
      profileImage1: null,
      profileImage2: null,
      username: EditorState.createEmpty(),
      usernametemp: true,
      designation: EditorState.createEmpty(),
      designationtemp: true,
      desc: EditorState.createEmpty(),
      desctemp: true,
      comments: 0,
      likes: 0,
      chkbox: false,
    };
    this.onInputchange = this.onInputchange.bind(this);
    this.onSubmitForm = this.onSubmitForm.bind(this);
    this.onInputchangeImage = this.onInputchangeImage.bind(this);
    this.onInputchangeImage1 = this.onInputchangeImage1.bind(this);
    this.onInputchangeImage2 = this.onInputchangeImage2.bind(this);
    this.handleChangeComments = this.handleChangeComments.bind(this);
    this.handleChangeLikes = this.handleChangeLikes.bind(this);
    this.handleChangeChk = this.handleChangeChk.bind(this);
  }

  onInputchange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }
  onInputchangeImage(event) {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      this.setState({
        profileImage: URL.createObjectURL(img),
      });
    }
  }
  onInputchangeImage1(event) {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      this.setState({
        profileImage1: URL.createObjectURL(img),
      });
    }
  }
  onInputchangeImage2(event) {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      this.setState({
        profileImage2: URL.createObjectURL(img),
      });
    }
  }

  onSubmitForm() {
    console.log(this.state);
  }
  printPDF = () => {
    const domElement = document.getElementById("photo");

    html2canvas(domElement, {
      onclone: (document) => {
        document.getElementById("print").style.visibility = "hidden";
      },
    }).then((canvas) => {
      canvasToImage(canvas, {
        name: "myImage",
        type: "png",
        quality: 1,
      });
    });
  };
  onEditorStateChange = (username) => {
    this.setState({
      username,
      usernametemp: false,
    });
  };
  onDescChange = (desc) => {
    this.setState({
      desc,
      desctemp: false,
    });
  };

  onDesignationChange = (designation) => {
    this.setState({
      designation,
      designationtemp: false,
    });
  };
  handleChangeComments(event) {
    console.log(event);
    this.setState({ comments: event.target.value });
  }
  handleChangeLikes(event) {
    this.setState({ likes: event.target.value });
  }
  handleChangeChk(event) {
    this.setState({
      chkbox: !this.state.chkbox,
    });
  }
  render() {
    const {
      items,
      username,
      desc,
      options,
      designation,
      comments,
      likes,
      chkbox,
    } = this.state;
    let user = draftToHtml(convertToRaw(username.getCurrentContent()));

    let b = ` style="margin:0px"`;
    let position = 2;
    let output = [user.slice(0, position), b, user.slice(position)].join("");
    console.log(output);
    return (
      <div style={{ display: "flex", width: "100%", height: "100%" }}>
        ;
        <div style={{ flexDirection: "row", width: "50%", height: "100%" }}>
          <div>
            <label>
              Username :
              <Editor
                editorState={username}
                toolbarClassName="toolbarClassName"
                wrapperClassName="wrapperClassName"
                editorClassName="editorClassName"
                onEditorStateChange={this.onEditorStateChange}
              />
            </label>
          </div>
          <div>
            <label>
              Username title :
              <Editor
                editorState={designation}
                toolbarClassName="toolbarClassName"
                wrapperClassName="wrapperClassName"
                editorClassName="editorClassName"
                onEditorStateChange={this.onDesignationChange}
              />
            </label>
          </div>
          <div>
            <label>
              Description :
              <Editor
                editorState={desc}
                toolbarClassName="toolbarClassName"
                wrapperClassName="wrapperClassName"
                editorClassName="editorClassName"
                onEditorStateChange={this.onDescChange}
              />
            </label>
          </div>

          <div>
            <label>
              Profile image :
              <input
                name="profileImage"
                type="file"
                // value={this.state.profileImage}
                onChange={this.onInputchangeImage}
              />
            </label>
          </div>
          <div>
            <label>
              First image :
              <input
                name="profileImage1"
                type="file"
                // value={this.state.profileImage}
                onChange={this.onInputchangeImage1}
              />
            </label>
          </div>
          <div>
            <label>
              Second image :
              <input
                name="profileImage2"
                type="file"
                // value={this.state.profileImage}
                onChange={this.onInputchangeImage2}
              />
            </label>
          </div>
          <div>
            {/* <label>Dou you want to add comment and likes ?</label>
            <input
              type="checkbox"
              defaultChecked={this.state.chkbox}
              onChange={this.handleChangeChk}
            /> */}
            {chkbox === true ? (
              <div>
                <div>
                  <label> {"Comments"}</label>
                  <input
                    type="number"
                    // value={this.state.comments}
                    placeholder="0"
                    onChange={this.handleChangeComments}
                  />
                </div>
                <div>
                  <label> {"Likes"}</label>
                  <input
                    type="number"
                    placeholder="0"
                    onChange={this.handleChangeLikes}
                  />
                </div>
              </div>
            ) : null}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            width: "50%",
            height: "80%",
            justifyContent: "center",
            alignItems: "center",
            border: 1,
            borderWidth: 1,
            borderColor: "black",
            backgroundColor: "lightcyan",
          }}
        >
          <div
            id="photo"
            style={{
              width: "70%",
              height: "100%",
              margin: 10,
            }}
          >
            <div>
              <Card
                // className="text-center"
                style={{
                  width: "80%",
                  margin: 10,
                  backgroundColor: "white",
                  alignItems: "center",
                  justifyItems: "center",
                  padding: "25px 15px",
                  boxShadow: "rgb(0 0 0 / 13%) 0px 3px 10px 0px",
                }}
              >
                <Card.Body>
                  <div
                    style={{
                      display: "flex",
                      width: "100%",
                      height: "30%",
                      justifyContent: "center",
                    }}
                  >
                    <div
                      style={{
                        flexDirection: "row",
                        width: "20%",
                        height: "100%",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Card.Img
                        variant="top"
                        style={{
                          height: 80,
                          width: 80,
                          borderRadius: 40,
                          borderWidth: 1,
                          border: 1,
                          margin: 5,
                          borderColor: "black",
                        }}
                        src={this.state.profileImage}
                      />
                    </div>
                    <div
                      style={{
                        flexDirection: "row",
                        width: "80%",

                        height: "100%",
                        paddingLeft: 5,
                      }}
                    >
                      <div style={{ flexDirection: "column" }}>
                        <div
                          className="htmlTag"
                          style={{
                            flexDirection: "row",
                            fontSize: 14,
                            // fontWeight: "bold",
                            width: "70%",
                            display: "flex",
                            flexWrap: "wrap",
                          }}
                        >
                          {this.state.usernametemp == true ? (
                            "Username"
                          ) : (
                            <div
                              style={{
                                margin: 0,
                              }}
                              dangerouslySetInnerHTML={{
                                __html: `${user}`,
                              }}
                            />
                          )}
                          {console.log(
                            draftToHtml(
                              convertToRaw(username.getCurrentContent())
                            )
                          )}
                          <img
                            style={{
                              width: 18,

                              flexDirection: "row",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                            src={download}
                            alt=""
                          ></img>
                          <div
                            style={{
                              flexDirection: "row",
                              fontSize: 14,
                              color: "lightslategrey",
                              display: "flex",
                              flexWrap: "wrap",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <label>@</label>
                            <Card.Title>
                              {this.state.designationtemp == true ? (
                                "Username title"
                              ) : (
                                <div
                                  className="htmlTag1"
                                  dangerouslySetInnerHTML={{
                                    __html: draftToHtml(
                                      convertToRaw(
                                        designation.getCurrentContent()
                                      )
                                    ),
                                  }}
                                />
                              )}
                            </Card.Title>
                          </div>
                        </div>
                        <div
                          style={{
                            flexDirection: "column",
                          }}
                        >
                          <Card.Text
                            style={{
                              width: "98%",
                              margin: 10,
                              justifyContent: "center",
                            }}
                          >
                            {this.state.desctemp == true ? (
                              "Description ."
                            ) : (
                              <div
                                dangerouslySetInnerHTML={{
                                  __html: draftToHtml(
                                    convertToRaw(desc.getCurrentContent())
                                  ),
                                }}
                              />
                            )}
                          </Card.Text>
                        </div>
                        <div
                          style={{
                            flexDirection: "row",
                            display: "flex",
                            flexWrap: "wrap",
                            width: "100%",
                            alignItems: "center",
                            justifyContent: "center",
                            border: "1px ",
                            borderWidth: 1,
                            borderRadius: 16,
                          }}
                        >
                          <Card.Img
                            variant="top"
                            style={{
                              // height: "45%",
                              width: "45%",
                              borderRadius: 40,
                              borderWidth: 1,

                              margin: 5,
                              borderColor: "black",
                            }}
                            src={this.state.profileImage1}
                          />
                          <Card.Img
                            variant="top"
                            style={{
                              // height: "45%",
                              width: "45%",
                              borderRadius: 40,
                              borderWidth: 1,
                              border: 1,
                              margin: 5,
                              borderColor: "black",
                            }}
                            src={this.state.profileImage2}
                          />
                        </div>
                      </div>
                      <div
                        style={{
                          flexDirection: "row",
                          display: "flex",
                          flexWrap: "wrap",
                          justifyContent: "space-around",
                        }}
                      >
                        <div
                          style={{
                            flexDirection: "row",
                            justifyContent: "space-around",
                          }}
                        >
                          <img
                            style={{
                              width: 24,
                              height: 20,
                              flexDirection: "row",
                              alignItems: "center",
                            }}
                            src={comm}
                            alt=""
                          ></img>
                          <label style={{ fontSize: 14 }}>2.5k</label>
                        </div>

                        <div style={{ flexDirection: "row" }}>
                          <img
                            style={{
                              width: 24,
                              height: 20,
                              flexDirection: "row",
                              alignItems: "center",
                            }}
                            src={share}
                            alt=""
                          ></img>
                          <label style={{ fontSize: 14 }}>2.5k</label>
                        </div>

                        <div style={{ flexDirection: "row" }}>
                          <img
                            style={{
                              width: 24,
                              height: 20,
                              flexDirection: "row",
                              alignItems: "center",
                            }}
                            src={like1}
                            alt=""
                          ></img>
                          <label style={{ fontSize: 14 }}>2.5k</label>
                        </div>

                        <div style={{ flexDirection: "row" }}>
                          <img
                            style={{
                              width: 24,
                              height: 20,
                              flexDirection: "row",
                              alignItems: "center",
                            }}
                            src={uploading}
                            alt=""
                          ></img>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </div>
            <div
              style={{
                width: "90%",

                padding: 10,
              }}
            >
              <button id="print" onClick={this.printPDF}>
                Download
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

export default App;
