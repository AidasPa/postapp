function Navbar(props = {}) {
  return `
    <nav class="flex items-center justify-between flex-wrap bg-blue-500 p-6">
      <div class="flex items-center flex-shrink-0 text-white mr-6">
        </svg>
        <span class="font-semibold text-xl tracking-tight">${props.appName}</span>
      </div>
      <div class="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
        <div class="text-sm lg:flex-grow">
          <a
            :click="page(/posts)" 
            class="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4 cursor-pointer"
          >
            Posts
          </a>
          <a
            class="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4 cursor-pointer"
          >
            ...
          </a>
        </div>
        <div>
        </div>
      </div>
    </nav>
  `;
}
export default Navbar;
