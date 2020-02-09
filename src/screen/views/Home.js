import loader from "../../services/LoaderService";


class Home {

  html() {
    return `
  <div class="w-6/12 rounded overflow-hidden shadow-lg pos-center">
  <div class="px-6 py-4">
    <div class="font-bold text-xl mb-2">PostAPP</div>
    <p class="text-gray-700 text-base">
      The best Single-Page-Application experience you will ever get.
    </p>
  </div>
  <div class="px-6 py-4">
    <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">Made with ❤️ by Aidas</span>

  </div>
</div>
        `;
  }
}

export default new Home();
