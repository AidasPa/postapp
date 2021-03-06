import { route } from "../../index";
import loader from "../../services/LoaderService";

import RequestService from "../../services/RequestService";

class Posts {
  constructor() {
    this.rows = "";
  }
  onload() {
    loader(true)
    setTimeout(() => {
      RequestService.get_users().then(users => {
        RequestService.get_posts().then(posts => {
          posts.data.forEach(post => {
            this.rows += `
              <tr>
                <td
                  onclick="window.route.route_and_render('/posts/${post.id}')"
                  class="border px-4 py-2 hover:underline cursor-pointer"
                >
                  ${post.title}
                </td>
                <td
                  onclick="window.route.route_and_render('/users/${post.userId}')"
                  class="border px-4 py-2 hover:underline cursor-pointer"
                >
                  ${users.data[post.userId - 1].name}
                </td>
              </tr>
            `;
          });
          loader(false);
          route.target("postTable").innerHTML = this.rows;
        });
      });
    }, 1);
  }
  html() {
    return `
      <div class="w-full rounded overflow-hidden shadow-lg">
        <div class="px-6 py-4">
          <div class="font-bold text-xl mb-2">Posts:</div>
          <hr>
          <table :target="tableRoot" class="w-full">
            <thead>
              <tr>
                <th :click="sort_table(0)" class="w-1/2 px-4 py-2 cursor-pointer">Title</th>
                <th :click="sort_table(1)" class="w-1/4 px-4 py-2 cursor-pointer">Author Name</th>
              </tr>
            </thead>
            <tbody :target="postTable">

            </tbody>
          </table>
        </div>
      </div>
    `;
  }
}
export default new Posts();
