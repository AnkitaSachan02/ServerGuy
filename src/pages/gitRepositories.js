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
    let email = this.props.match.params.email;
    this.user = email;
    if(!this.user){
      this.props.history.push("/");
    }
  }

  typeSearch = e => {
    this.setState({ topic: e.target.value });
  };

  showHistory = () => {
    fetch('http://localhost:8081/git/search-history',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ user: this.user })
        })
            .then(res=>res.json())
            .then(res=>{
                if(res.error){
                    alert(res.error);
                } else {
                  let searches = res.searches.split(", ");
                  console.log("searches>>>>>>.",this.searches);
                  // do work here
                }
            });
  }

  searchData = e => {
    e.preventDefault();
    Apicaller(this.state.topic, this.user, config.gitUrl)
      .then(res => {
        if (res.hasOwnProperty("item")) {
          let list = res.item.map(elem => {
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
                    <img alt="download" src={"/images/download.png"} />
                  </a>
                  <a
                    title="Open Repo"
                    href={elem.html_url}
                    target="_blank"
                    className="openLink"
                  >
                    <img alt={"open"} src={"/images/link.png"} />
                  </a>
                </div>
                <br />
              </div>
            );
          });
          this.setState({list});
        }
      })
      .catch(err => {
        // do nothing
      });
  };
  render() {
    let { viewSet, list, topic } = this.state;
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
            value={topic}
            onChange={e => {
              this.typeSearch(e);
            }}
          />
          <input type="submit" defaultValue={"Submit"} />
        </form>
        <div className="listSet" style={ viewSet }>
          <div className="linkSet">{ list }</div>
        </div>
        <input type="submit" onClick={this.showHistory} value="Show History" />
      </div>
    );
  }
}

export default GitRepositories;