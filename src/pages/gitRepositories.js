import React, { Component } from "react";
import { Apicaller } from "../util/apicaller";
import "../App.css";
import config from "../config/config";

class GitRepositories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topic: "",
      list: [],
      viewSet: {
        height: "400px",
        overflow: "auto"
      }
    };
  }

  componentWillMount(){
      let email = localStorage.getItem("username") || this.props.match.params.email;
      if(!email){
          localStorage.setItem("username", email);
      } else if(!email) {
          this.props.history.push("/");
      }
  }

  typeSearch = e => {
    this.setState({ topic: e.target.value });
  };

  searchData = e => {
    e.preventDefault();
    Apicaller(this.state.topic, config.gitUrl)
      .then(res => {
        if (res.hasOwnProperty("item")) {
          this.state.list = [];
          this.state.list = res.item.map(elem => {
            return (
              <div>
                <div style={{ clear: "both" }}>
                  <div className="name">{elem.name}</div>
                  <a
                    title="Download"
                    href={`https://github.com/${
                      elem.full_name
                    }/archive/master.zip`}
                    target="_blank"
                    className="downloadLink"
                  >
                    <img src={"/images/download.png"} />
                  </a>
                  <a
                    title="Open Repo"
                    href={elem.html_url}
                    target="_blank"
                    className="openLink"
                  >
                    <img src={"/images/link.png"} />
                  </a>
                </div>
                <br />
              </div>
            );
          });
          this.setState(this.state);
        }
      })
      .catch(err => {
        console.log("error");
      });
  };
  render() {
    return (
      <div className="App">
        <form
          onSubmit={e => {
            this.searchData(e);
          }}
        >
          <input
            type="text"
            id="git-search-box"
            value={this.state.topic}
            onChange={e => {
              this.typeSearch(e);
            }}
          />
          <input type="submit" defaultValue={"Submit"} />
        </form>
        <div className="listSet" style={this.state.viewSet}>
          <div className="linkSet">{this.state.list}</div>
        </div>
      </div>
    );
  }
}

export default GitRepositories;