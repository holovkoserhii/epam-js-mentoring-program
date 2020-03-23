import Home from "../views/Home.vue";
import EditNote from "../views/EditNote.vue";
import ArchivedNotes from "../views/ArchivedNotes.vue";
import PageNotFound from "../views/PageNotFound.vue";
import About from "../views/About.vue";

export default [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/edit/:id",
    name: "edit",
    component: EditNote
  },
  {
    path: "/archive",
    name: "archive",
    component: ArchivedNotes
  },
  {
    path: "/about",
    name: "about",
    component: About
  },
  {
    path: "*",
    name: "notFound",
    component: PageNotFound
  }
];
