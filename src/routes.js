import App from "./App";

import Home from "./screen/views/Home";
import Posts from "./screen/views/Posts";
import User from "./screen/views/User";

import SinglePost from "./screen/views/SinglePost";

const routes = {
  home: {
    path: "/",
    renderView: new App({ view: Home.html() }),
    onload: () => {}
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
    renderView: props => new App({ view: SinglePost.html(props)}),
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
  }
};
export default routes;
