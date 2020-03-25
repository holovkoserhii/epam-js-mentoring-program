import { mount } from "@vue/test-utils";
import ArchivedNotes from "../../../src/views/ArchivedNotes.vue";
import Notes from "../../../src/components/Notes";
import { updateItem, getArchivedItems } from "../../../src/utils/api";
import api from "../../../src/utils/api";

jest.mock("../../../src/utils/api", () => ({
  updateItem: jest.fn(() => 42),
  getArchivedItems: jest.fn(() => Promise.resolve({ data: [1, 2, 3] }))
}));

describe("ArchivedNotes", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(ArchivedNotes, {
      archivedNotes: [],
      methods: {},
      mocks: { updateItem, getArchivedItems }
    });
  });

  afterEach(() => {
    wrapper.destroy();
    jest.resetModules();
  });

  it("should trigger a getArchivedNotes function when mounted", () => {
    const getArchivedNotes = jest.fn();
    wrapper = mount(ArchivedNotes, {
      archivedNotes: [],
      methods: { getArchivedNotes },
      mocks: {}
    });
    expect(getArchivedNotes).toHaveBeenCalled();
  });

  describe("getArchivedNotes", () => {
    it("should retrieve archived notes", () => {
      wrapper.find(Notes).vm.$emit("unArchive-note", 123);
      expect(api.updateItem).toBeCalled();
    });

    it("should place archived notes to data variable", () => {
      wrapper.find(Notes).vm.$emit("unArchive-note", 123);
      expect(wrapper.vm.archivedNotes).toEqual([1, 2, 3]);
    });
  });

  describe("unArchiveNote", () => {
    it("should unarchive notes", () => {
      wrapper.find(Notes).vm.$emit("archive-note", 123);
      expect(api.getArchivedItems).toBeCalled();
    });
  });
});
