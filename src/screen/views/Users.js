import loader from "../../services/LoaderService";
import RequestService from "../../services/RequestService";


class Users {
    onload() {
        loader(true)
        this.rows = "";
        setTimeout(() => {
          RequestService.get_users().then(users => {
            users.data.forEach(user => {
                this.rows += `
                  <tr class="hover:underline cursor-pointer" onclick="window.route.route_and_render('/users/${user.id}')">
                    <td
                      class="border px-4 py-2"
                    >
                      ${user.name}
                    </td>
                    <td
                      class="border px-4 py-2"
                    >
                      ${user.username}
                    </td>
                    <td
                      class="border px-4 py-2"
                    >
                      ${user.email}
                    </td>
                  </tr>
                `;
              });
              loader(false);
              route.target("userTable").innerHTML = this.rows;
          });
        }, 1);
      }
      html() {
        return `
          <div class="w-full rounded overflow-hidden shadow-lg">
            <div class="px-6 py-4">
              <div class="font-bold text-xl mb-2">Users:</div>
              <hr>
              <table :target="tableRoot" class="w-full">
                <thead>
                  <tr>
                    <th :click="sort_table(0)" class="w-1/2 px-4 py-2 cursor-pointer">Name</th>
                    <th :click="sort_table(1)" class="w-1/4 px-4 py-2 cursor-pointer">Username</th>
                    <th :click="sort_table(2)" class="w-1/4 px-4 py-2 cursor-pointer">Email</th>
                  </tr>
                </thead>
                <tbody :target="userTable">
    
                </tbody>
              </table>
            </div>
          </div>
        `;
      }
    }

    export default new Users();