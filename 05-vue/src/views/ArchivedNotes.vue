<template>
  <div>
    <h1>This is the list of your archived notes</h1>
    <Notes isArchive="true" v-bind:notes="archivedNotes" v-on:unArchive-note="unArchiveNote" />
  </div>
</template>

<script>
import { getArchivedItems, updateItem } from "../utils/api";
import Notes from "../components/Notes";
export default {
  name: "ArchivedNotes",
  components: { Notes },
  data() {
    return {
      archivedNotes: []
    };
  },
  methods: {
    async getArchivedNotes() {
      const { data } = await getArchivedItems();
      this.archivedNotes = data;
    },
    async unArchiveNote(id) {
      await updateItem(id, { isArchived: false });
      this.getArchivedNotes();
    }
  },
  created() {
    this.getArchivedNotes();
  }
};
</script>

<style scoped></style>
