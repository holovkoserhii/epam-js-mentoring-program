import { mount } from "@vue/test-utils";
import EditNote from "../../../src/views/EditNote.vue";
import { updateItem } from "../../../src/utils/api";
import api from "../../../src/utils/api";

jest.mock("../../../src/utils/api", () => ({
  updateItem: jest.fn(() => Promise.resolve())
}));

describe("EditNote", () => {
  let wrapper;
  const $route = {
    params: {
      text: "a",
      title: "b",
      id: 8
    }
  };

  const $router = {
    push: jest.fn()
  };

  beforeEach(() => {
    wrapper = mount(EditNote, {
      methods: {},
      propsData: {
        note: {
          text: "a",
          title: "b"
        }
      },
      mocks: {
        $route,
        $router,
        updateItem
      }
    });
  });

  afterEach(() => {
    wrapper.destroy();
    jest.resetModules();
  });

  it("should exist", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("should render a title", () => {
    expect(wrapper.find("h1").text()).toBe("Please edit your note");
  });

  it("should render an input with a default value - title", () => {
    expect(wrapper.find(".inputs [name='title']").element.value).toBe("b");
  });

  it("should render an input with a default value - text", () => {
    expect(wrapper.find(".inputs [name='text']").element.value).toBe("a");
  });

  it("should render a back button", () => {
    expect(wrapper.find(".actions button.back").exists()).toBe(true);
  });

  it("should render a back button with a correct text", () => {
    expect(wrapper.find(".actions button.back").text()).toBe(
      "I don't want to change anything, just let me back!!!111"
    );
  });

  it("should have a data property with text & title", () => {
    const data = {
      text: "a",
      title: "b"
    };
    expect(wrapper.vm.$data).toEqual(data);
  });

  it("should have a prop with a key 'note'", () => {
    const prop = ["note"];
    const data = {
      text: "a",
      title: "b"
    };
    expect(wrapper.vm.$props).toEqual({ [prop]: data });
  });

  describe("goBack", () => {
    it("should trigger goBack function", () => {
      wrapper.find(".back").trigger("click");
      expect($router.push).toBeCalled();
    });
  });

  describe("saveNote", () => {
    it("should trigger saveNote function upon submit", async () => {
      wrapper.vm.saveNote = jest.fn();
      wrapper.find("form").trigger("submit");
      expect(wrapper.vm.saveNote).toBeCalled();
    });
    it("should trigger updateItem function", async () => {
      wrapper.find("form").trigger("submit");
      expect(api.updateItem).toBeCalled();
    });
  });
});
