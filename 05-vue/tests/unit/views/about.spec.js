import { shallowMount } from "@vue/test-utils";
import About from "../../../src/views/About.vue";

describe("About", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(About);
  });

  it("should exist", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("should be a vue instanse", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("should render a title", () => {
    expect(wrapper.find("h1").text()).toBe("Hi there!");
  });

  it("should render a text", () => {
    expect(wrapper.find("p").text()).toBe(
      "This is an about page of the coolest note list by Serhii Holovko powered by Vue JS, 2020"
    );
  });
});
