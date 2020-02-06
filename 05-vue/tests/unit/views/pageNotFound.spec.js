import { shallowMount } from "@vue/test-utils";
import PageNotFound from "../../../src/views/PageNotFound";

describe("PageNotFound", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(PageNotFound);
  });

  it("should exist", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("should be a vue instanse", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("should render a title", () => {
    expect(wrapper.find("h1").text()).toBe("Sorry, dude :(");
  });

  it("should render a text", () => {
    expect(wrapper.find("p").text()).toBe(
      "Oh, crap! This must be a mistake. There is no such page!"
    );
  });
});
