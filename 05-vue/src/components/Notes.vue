<template>
  <div>
    <div v-bind:key="note.id" v-for="note in notes">
      <NoteItem
        v-bind="$attrs"
        v-bind:note="note"
        v-on:delete-note="$emit('delete-note', note.id)"
        v-on:archive-note="$emit('archive-note', note.id)"
        v-on:unArchive-note="$emit('unArchive-note', note.id)"
        v-on:change-note="updatedNote => $emit('change-note', updatedNote)"
      />
    </div>
  </div>
</template>
<script>
import NoteItem from "./NoteItem";
export default {
  name: "Notes",
  components: { NoteItem },
  props: ["notes"]
};
</script>
<style scoped></style>
