<template>
  <div id="app">
    <AddNote v-on:add-note="addNote" />
    <div class="filter" v-if="allNotes.length">
      <input
        type="text"
        v-model="filter"
        placeholder="Try searching notes..."
      />
    </div>
    <Notes
      v-bind:notes="notes"
      v-on:delete-note="deleteNote"
      v-on:archive-note="archiveNote"
      v-on:change-note="changeNote"
    />
    <p>
      Disclaimer: before using please make sure you run json-server (yarn run
      json-server)
    </p>
  </div>
</template>

<script>
import { getItems, addItem, updateItem, deleteItem } from "../utils/api";
import Notes from "../components/Notes";
import AddNote from "../components/AddNote";

export default {
  name: "Home",
  components: {
    Notes,
    AddNote
  },
  data() {
    return {
      notes: [],
      filter: "",
      allNotes: []
    };
  },
  watch: {
    filter: function(filterValue) {
      this.notes = this.allNotes.filter(
        ({ text, title }) =>
          text.includes(filterValue) || title.includes(filterValue)
      );
    }
  },
  methods: {
    async deleteNote(id) {
      await deleteItem(id);
      this.notes = this.notes.filter(note => note.id !== id);
    },
    async changeNote({ id, isCompleted }) {
      await updateItem(id, { isCompleted });
      this.getNotes();
    },
    async addNote(newNote) {
      await addItem(newNote);
      this.getNotes();
    },
    async getNotes() {
      const { data } = await getItems();
      this.notes = data;
      this.allNotes = data;
    },
    async archiveNote(id) {
      await updateItem(id, { isArchived: true });
      this.getNotes();
    },
    async deleteAllNotes() {
      const { data } = await getItems();
      const ids = data.map(item => item.id);
      ids.forEach(async id => await deleteItem(id));
    }
  },
  created() {
    this.getNotes();
  }
};
</script>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
body {
  font-family: Arial, Helvetica, sans-serif;
  line-height: 1.4;
}
.submit-button {
  display: inline-block;
  border: none;
  background: #555555;
  color: #ffffff;
  padding: 7px 20px;
  cursor: pointer;
}
.filter {
  background: rgb(139, 213, 223);
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.filter input {
  height: 25px;
}
.archiving {
  background: rgba(228, 236, 68, 0.322);
}
.action-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
}
.action-wrapper button {
  height: 25px;
  width: 200px;
  margin: 10px;
  cursor: pointer;
}
.save {
  background: rgba(79, 233, 7, 0.514);
}
.restore {
  background: rgba(233, 116, 7, 0.486);
}
</style>
