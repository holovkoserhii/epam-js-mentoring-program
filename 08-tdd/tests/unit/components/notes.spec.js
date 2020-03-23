import { mount } from "@vue/test-utils";
import Notes from "../../../src/components/Notes.vue";
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
    wrapper = mount(Notes, {
      methods: {},
      propsData: {
        notes: [{ id: 77 }, { id: 88 }, { id: 99 }]
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

  it("should render notes components", () => {
    expect(wrapper.findAll(NoteItem).length).toBe(3);
  });
});
