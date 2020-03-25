import * as axios from "axios";
import {
  getItems,
  deleteItem,
  updateItem,
  addItem,
  getArchivedItems
} from "../../../src/utils/api";

jest.mock("axios", () => ({
  delete: jest.fn(() => Promise.resolve()),
  patch: jest.fn(() => Promise.resolve()),
  post: jest.fn(() => Promise.resolve()),
  get: jest.fn(() => Promise.resolve())
}));

describe("api", () => {
  describe("deleteItem", () => {
    it("should delete item", async () => {
      await deleteItem(4);
      expect(axios.delete).toHaveBeenCalledWith(
        "http://localhost:3000/notes/4"
      );
    });
  });

  describe("updateItem", () => {
    it("should update item", async () => {
      await updateItem(5, { a: "a" });
      expect(axios.patch).toHaveBeenCalledWith(
        "http://localhost:3000/notes/5",
        { a: "a" }
      );
    });
  });

  describe("addItem", () => {
    it("should add item", async () => {
      await addItem({ b: "b" });
      expect(axios.post).toHaveBeenCalledWith("http://localhost:3000/notes/", {
        b: "b"
      });
    });
  });

  describe("getItems", () => {
    it("should get all items", async () => {
      await getItems();
      expect(axios.get).toHaveBeenCalledWith(
        "http://localhost:3000/notes/?isArchived=false"
      );
    });
  });

  describe("getArchivedItems", () => {
    it("should get archived items", async () => {
      await getArchivedItems();
      expect(axios.get).toHaveBeenCalledWith(
        "http://localhost:3000/notes/?isArchived=true"
      );
    });
  });
});
