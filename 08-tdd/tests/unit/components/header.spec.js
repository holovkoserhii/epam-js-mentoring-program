import { shallowMount } from "@vue/test-utils";
import Header from "../../../src/components/layout/Header.vue";

describe("Header", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(Header, {
      stubs: ["router-link", "router-view"]
    });
  });

  it("should exist", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("should be a vue instance", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("should render a title", () => {
    expect(wrapper.find("h1").text()).toBe("NoteList");
  });

  it("should render nav links", () => {
    expect(wrapper.find("#nav")).toBeDefined();
  });
});
