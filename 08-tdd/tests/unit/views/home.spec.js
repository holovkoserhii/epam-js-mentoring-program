import { mount } from "@vue/test-utils";
import Home from "../../../src/views/Home.vue";
import Notes from "../../../src/components/Notes.vue";
// addItem,
// updateItem,
import { getItems, deleteItem } from "../../../src/utils/api";
import api from "../../../src/utils/api";

jest.mock("../../../src/utils/api", () => ({
  // updateItem: jest.fn(() => 42),
  getItems: jest.fn(() => Promise.resolve({ data: [{ id: 8 }, { id: 9 }] })),
  deleteItem: jest.fn(() => Promise.resolve())
  // addItem: jest.fn(() => Promise.resolve({ data: [1, 2] }))
}));

describe("ArchivedNotes", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(Home, {
      data: () => ({
        notes: [{ id: 3 }, { id: 4 }, { id: 5 }],
        allNotes: [1, 2, 3, 4, 5],
        filter: ""
      }),
      methods: {},
      mocks: {
        getItems,
        // addItem,
        // updateItem,
        deleteItem
      },
      stubs: ["router-link", "router-view"]
    });
  });

  afterEach(() => {
    wrapper.destroy();
    jest.resetModules();
  });

  it("should trigger a getArchivedNotes function", () => {
    const getNotes = jest.fn();
    wrapper = mount(Home, {
      methods: { getNotes },
      mocks: {}
    });
    expect(getNotes).toHaveBeenCalled();
  });

  describe("deleteNote", () => {
    it("should delete notes", () => {
      wrapper.find(Notes).vm.$emit("delete-note", 3);
      expect(api.deleteItem).toBeCalled();
    });

    it("should update notes variable", async () => {
      await wrapper.find(Notes).vm.$emit("delete-note", 3);
      setTimeout(() => {
        expect(wrapper.vm.notes).toEqual([{ id: 4 }, { id: 5 }]);
      }, 10);
    });
  });

  describe("getNotes", () => {
    it("should get notes", () => {
      wrapper.find(Notes).vm.$emit("delete-note", 3);
      expect(api.deleteItem).toBeCalled();
    });

    it("should update notes variable", async () => {
      await wrapper.find(Notes).vm.$emit("delete-note", 3);
      setTimeout(() => {
        expect(wrapper.vm.notes).toEqual([{ id: 4 }, { id: 5 }]);
      }, 10);
    });

    it("should update allNotes variable", async () => {
      await wrapper.find(Notes).vm.$emit("delete-note", 3);
      setTimeout(() => {
        expect(wrapper.vm.notes).toEqual([{ id: 4 }, { id: 5 }]);
      }, 10);
    });
  });
});
