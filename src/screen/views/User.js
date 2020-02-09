import { route } from "../../index";
import RequestService from "../../services/RequestService";
import loader from "../../services/LoaderService";

import "boxicons";

class User {
  onload(props) {
    loader(true);
    RequestService.get_user(props.params.id).then(resp => {
      const user = resp.data;
      route.target("userName").innerHTML = user.name;
      route.target("userUserName").innerHTML = user.username;
      route.target("userEmail").innerHTML += user.email;
      route.target("userPhone").innerHTML += user.phone;
      route.target("userWeb").innerHTML += user.website;

      route.target("companyName").innerHTML += user.company.name;
      route.target("companyCatch").innerHTML += user.company.catchPhrase;

      route.target("adrStreet").innerHTML = user.address.street;
      route.target("adrSuite").innerHTML = user.address.suite;
      route.target("adrCity").innerHTML = user.address.city;
      route.target("adrZip").innerHTML = user.address.zipcode;

      route.target("geoLat").innerHTML = user.address.geo.lat;
      route.target("geoLon").innerHTML = user.address.geo.lng;
      this.rows = "";

      RequestService.get_posts().then(posts => {
        posts.data.forEach(post => {
          this.rows += `
            <tr>
              <td
                class="border px-4 py-2 hover:underline cursor-pointer"
                onclick="window.route.route_and_render('/posts/${post.id}')"
              >
                ${post.title}
              </td>
            </tr>
          `;
        });
        loader(false);
        route.target("postTableUser").innerHTML = this.rows;
      });
    });
  }
  html() {
    return `
      <div class="w-full rounded overflow-hidden shadow-lg">
        <div class="px-6 py-4">
          <div class="font-bold text-xl mb-2">
            <span :target="userName"></span> ·
            <span class="text-base font-medium" :target="userUserName"></span>
          </div>

          <p class="text-gray-700 text-base">
          <div class="grid grid-cols-2 gap-4">
          <div>
          <p class="text-base">
            <b>Company: </b> <span :target="companyName"></span> | <span :target="companyCatch"></span>
            <br>
            <b>Street: </b> <span :target="adrStreet"></span>
            <br>
            <b>Suite: </b> <span :target="adrSuite"></span>
            <br>
            <b>City: </b> <span :target="adrCity"></span>
          </p>
        </div>
        <div>
        <p class="text-base">
            <b>ZIP Code: </b> <span :target="adrZip"></span> 
            <br>
            <b>Latitude: </b> <span :target="geoLat"></span>
            <br>
            <b>Longitude: </b> <span :target="geoLon"></span>

          </p>
        </div>
        </div>

        <div class="px-6 py-4">
          <span
            :target="userEmail"
            class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2"
            ><box-icon name="mail-send" size="xs"></box-icon
          > </span>
          <span
            :target="userPhone"
            class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2"
            ><box-icon type="solid" size="xs" name="phone"></box-icon> 
          </span>
          <span
            :target="userWeb"
            class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700"
            ><box-icon name="globe" size="xs"></box-icon
          > </span>
        </div>
      </div>
      <div class="w-full rounded overflow-hidden shadow-lg">
      <div class="px-6 py-4">
        <div class="font-bold text-xl mb-2">Posts:</div>
        <hr>
        <table class="w-full">
          <thead>
            <tr>
              <th class="w-1/2 px-4 py-2">Title</th>
            </tr>
          </thead>
          <tbody :target="postTableUser">

          </tbody>
        </table>
      </div>
    </div>
    `;
  }
}

export default new User();
