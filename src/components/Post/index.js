import React, { Component } from "react";
import "./Post.css";

    class Post extends Component {
      render() {
        return <article className="Post" ref="Post">
            <header>
              <div className="Post-user">
                <div className="Post-user-avatar">
                  <img src="https://image.shutterstock.com/image-photo/tree-arranged-green-graph-on-600w-182134277.jpg" alt="Ivan" />
                </div>
                <div className="Post-user-nickname">
                  <span>IRa7</span>
                </div>
              </div>
            </header>
            <div className="Post-image">
              <div className="Post-image-bg">
                <img alt="Icon Living" src="https://image.shutterstock.com/image-photo/tree-arranged-green-graph-on-600w-182134277.jpg" />
              </div>
            </div>
            <div className="Post-caption">
              <strong>IRa7</strong> Nature
            </div>
          </article>;
        }
    }
    export default Post;