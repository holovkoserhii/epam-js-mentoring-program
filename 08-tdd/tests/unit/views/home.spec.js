import { mount } from "@vue/test-utils";
import Home from "../../../src/views/Home.vue";
import Notes from "../../../src/components/Notes.vue";
import AddNote from "../../../src/components/AddNote.vue";
import {
  getItems,
  deleteItem,
  updateItem,
  addItem
} from "../../../src/utils/api";
import api from "../../../src/utils/api";

jest.mock("../../../src/utils/api", () => ({
  updateItem: jest.fn(() =>
    Promise.resolve({ data: [{ id: 88 }, { id: 99 }] })
  ),
  getItems: jest.fn(() =>
    Promise.resolve({
      data: [
        { id: 8, text: "text1", title: "1" },
        { id: 9, text: "value2", title: "2" }
      ]
    })
  ),
  deleteItem: jest.fn(() => Promise.resolve()),
  addItem: jest.fn(() => Promise.resolve())
}));

describe("ArchivedNotes", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(Home, {
      data: () => ({
        notes: [{ id: 3 }, { id: 4 }, { id: 5 }],
        allNotes: [],
        filter: ""
      }),
      methods: {},
      mocks: {
        getItems,
        addItem,
        updateItem,
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
      wrapper.vm.getNotes();
      expect(api.getItems).toBeCalled();
    });

    it("should update notes variable", async () => {
      await wrapper.vm.getNotes();
      expect(wrapper.vm.notes).toEqual([
        { id: 8, text: "text1", title: "1" },
        { id: 9, text: "value2", title: "2" }
      ]);
    });

    it("should update allNotes variable", async () => {
      await wrapper.vm.getNotes();
      expect(wrapper.vm.allNotes).toEqual([
        { id: 8, text: "text1", title: "1" },
        { id: 9, text: "value2", title: "2" }
      ]);
    });
  });

  describe("changeNote", () => {
    it("should update item", async () => {
      await wrapper
        .find(Notes)
        .vm.$emit("change-note", { id: 3, isCompleted: true });
      expect(api.updateItem).toBeCalledWith(3, { isCompleted: true });
    });

    it("should get notes", async () => {
      await wrapper
        .find(Notes)
        .vm.$emit("change-note", { id: 3, isCompleted: true });
      expect(api.getItems).toBeCalled();
    });
  });

  describe("addNote", () => {
    it("should add item", async () => {
      await wrapper
        .find(AddNote)
        .vm.$emit("add-note", { id: 3, isCompleted: false });
      expect(api.addItem).toBeCalledWith({ id: 3, isCompleted: false });
    });

    it("should get notes", async () => {
      await wrapper
        .find(AddNote)
        .vm.$emit("add-note", { id: 3, isCompleted: false });
      expect(api.getItems).toBeCalled();
    });
  });

  describe("archiveNote", () => {
    it("should update item", async () => {
      await wrapper.find(Notes).vm.$emit("archive-note", 3);
      expect(api.updateItem).toBeCalledWith(3, { isArchived: true });
    });

    it("should get notes", async () => {
      await wrapper.find(Notes).vm.$emit("archive-note", 3);
      expect(api.getItems).toBeCalled();
    });
  });

  describe("deleteAllNotes", () => {
    it("should get notes", async () => {
      await wrapper.vm.deleteAllNotes();
      expect(api.getItems).toBeCalled();
    });

    it("should delete items", async () => {
      await wrapper.vm.deleteAllNotes();
      expect(api.deleteItem).toBeCalled();
    });
  });

  describe("filter watcher", () => {
    it("should filter notes by filter value", async () => {
      wrapper.setData({ filter: "val" });
      expect(wrapper.vm.notes).toEqual([{ id: 9, text: "value2", title: "2" }]);
    });
  });
});
