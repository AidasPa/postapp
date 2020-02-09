import loader from "../../services/LoaderService";
import RequestService from "../../services/RequestService";

class SinglePost {
  onload(props) {
    loader(true);
    this.comments = "";

    RequestService.get_post(props.params.id).then(resp => {
      route.target("postTitle").innerHTML = resp.data.title;
      route.target("postBody").innerHTML = resp.data.body;
      RequestService.get_user(resp.data.userId).then(userResp => {
        route.target("postAuthor").innerHTML +=
          userResp.data.username + " | " + userResp.data.name;
      });

      RequestService.get_comments().then(commentsResp => {
        const postComments = commentsResp.data.filter(
          comment => comment.postId == resp.data.id
        );

        postComments.forEach(comment => {
          this.comments += `

            <div class="px-4 py-2 m-2 rounded overflow-hidden shadow-lg">
              <div class="px-6 py-4">
               <div class="text-md mb-2">
                  <i><b>${comment.name}</b></i>
               </div>
                 ${comment.body}
              </div>
              <div class="px-6 py-4">
                  <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">By ${comment.email}</span>    
              </div>
            </div>
            `;
        });

        route.target("comments").innerHTML = this.comments;
        route.target(
          "commentCount"
        ).innerHTML = `<b>${postComments.length}</b> comments`;
      });

      loader(false);
    });
  }
  html(props) {
    return `
        <div class="w-full rounded overflow-hidden shadow-lg">
        <div class="px-6 py-4">
          <div class="font-bold text-xl mb-2" :target="postTitle"></div>
          <p :target="postBody" class="text-gray-700 text-base">
          </p>
        </div>
        <div class="px-6 py-4">
          <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2" :target="postAuthor">By </span>
          <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2" :target="commentCount"></span>
        </div>
      </div>
      <br>
      <br>
      
      <div class="grid gap-4 grid-cols-3" :target="comments">
      
      </div>

        `;
  }
}

export default new SinglePost();
