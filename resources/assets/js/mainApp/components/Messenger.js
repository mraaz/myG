import React, { Component } from "react";
import ReactDOM from "react-dom";

export default class Messenger extends Component {
  constructor() {
    super();
    this.state = {
      name: "Raaz"
    };
  }
  render() {
    return (
      <section id="messenger">
        <div className="messenger-header">
        <img src="https://mygame-media.s3-ap-southeast-2.amazonaws.com/logos/Chat.png" />
        </div>
      </section>
    );
  }
}

const app = document.getElementById("app");
