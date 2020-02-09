import App from "./App";

import Home from "./screen/views/Home";
import Posts from "./screen/views/Posts";
import User from "./screen/views/User";
import Users from "./screen/views/Users";

import SinglePost from "./screen/views/SinglePost";

import Error from "./screen/views/Error";

const errors = {
  404: {
    view: Error.err(404, "Page not found!")
  }
}

const routes = {
  home: {
    path: "/",
    renderView: new App({ view: Home.html() }),
    onload: () => {}
  },
  users: {
    path: "/users",
    renderView: new App({ view: Users.html() }),
    onload: () => Users.onload()
  },
  user: {
    path: "/users/:id",
    renderView: props => new App({ view: User.html(props) }),
    onload: props => {
      User.onload(props);
    }
  },
  single_post: {
    path: "/posts/:id",
    renderView: props => new App({ view: SinglePost.html(props) }),
    onload: props => {
      SinglePost.onload(props);
    }
  },
  posts: {
    path: "/posts",
    renderView: new App({
      view: Posts.html()
    }),
    onload: () => Posts.onload()
  },
};
export { routes, errors };
