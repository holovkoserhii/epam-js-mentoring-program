import { shallowMount, mount, createLocalVue } from "@vue/test-utils";
import App from "../../../src/App.vue";
import VueRouter from "vue-router";
import Home from "../../../src/views/Home.vue";
import EditNote from "../../../src/views/EditNote.vue";
import ArchivedNotes from "../../../src/views/ArchivedNotes.vue";
import PageNotFound from "../../../src/views/PageNotFound.vue";
import About from "../../../src/views/About.vue";
import routes from "../../../src/router/routes";

const localVue = createLocalVue();
localVue.use(VueRouter);

describe("Routes", () => {
  let wrapper;
  let router;

  beforeAll(() => {
    router = new VueRouter({ routes });
    wrapper = mount(App, { localVue, router });
  });

  describe("Home", () => {
    it("should associate with / route", () => {
      router.push("/");
      expect(wrapper.find(Home).exists()).toBe(true);
    });
  });

  describe("EditNote", () => {
    it("should associate with /edit route", () => {
      router.push("/edit/4");
      expect(wrapper.find(EditNote).exists()).toBe(true);
    });
  });

  describe("ArchiveNotes", () => {
    it("should associate with /archive route", () => {
      router.push("/archive");
      expect(wrapper.find(ArchivedNotes).exists()).toBe(true);
    });
  });

  describe("PageNotFound", () => {
    it("should associate with any wrong route", () => {
      router.push("/wrong-route");
      expect(wrapper.find(PageNotFound).exists()).toBe(true);
    });
  });

  describe("About", () => {
    it("should associate with /about route", () => {
      router.push("/about");
      expect(wrapper.find(About).exists()).toBe(true);
    });
  });
});
