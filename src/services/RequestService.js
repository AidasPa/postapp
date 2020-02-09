import axios from "axios";

const API = "https://jsonplaceholder.typicode.com/";

class RequestService {
  get_posts() {
    return axios.get(API + "posts");
  }
  get_comments() {
    return axios.get(API + "comments");
  }
  get_users() {
    return axios.get(API + "users");
  }
  get_user(id) {
    return axios.get(API + "users/" + id);
  }
  get_post(id) {
    return axios.get(API + "posts/" + id);
  }
}

export default new RequestService();
