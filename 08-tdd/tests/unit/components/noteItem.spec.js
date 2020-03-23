import { mount } from "@vue/test-utils";
import NoteItem from "../../../src/components/NoteItem.vue";

describe("Notes", () => {
  let wrapper;
  const $route = {
    params: {}
  };

  const $router = {
    push: jest.fn()
  };

  beforeEach(() => {
    wrapper = mount(NoteItem, {
      methods: {},
      propsData: {
        note: {
          id: 5,
          text: "a",
          title: "b",
          isCompleted: false
        }
      },
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

  describe("markComplete", () => {
    it("should emit event with a note", () => {
      wrapper.vm.markComplete();
      expect(wrapper.emitted("change-note")).toBeTruthy();
    });
  });
});
