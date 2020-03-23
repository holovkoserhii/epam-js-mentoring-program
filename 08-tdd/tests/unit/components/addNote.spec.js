import { mount } from "@vue/test-utils";
import AddNote from "../../../src/components/AddNote.vue";

describe("Notes", () => {
  let wrapper;
  const $route = {
    params: {}
  };

  const $router = {
    push: jest.fn()
  };

  beforeEach(() => {
    wrapper = mount(AddNote, {
      methods: {},
      propsData: {},
      mocks: {
        $route,
        $router
      },
      stubs: ["router-link", "router-view"]
    });
  });

  it("should exist", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("should be a vue instance", () => {
    expect(wrapper.exists()).toBe(true);
  });

  describe("addNote", () => {
    it("should emit event with a note", () => {
      wrapper.vm.addNote();
      expect(wrapper.emitted("add-note")).toBeTruthy();
    });
  });
});
