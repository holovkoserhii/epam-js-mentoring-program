<template>
  <div class="note-item">
    <div v-bind:class="{'is-complete': note.isCompleted}">
      <p class="title">Title: {{note.title}}</p>
      <p class="text">Text: {{note.text}}</p>
    </div>
    <p class="action-wrapper">
      <button @click="markComplete" class="action complete">✔</button>
      <router-link
        class="action change"
        :to="{name: 'edit', params: {id: this.note.id, text: this.note.text, title: this.note.title}}"
      >✎</router-link>
      <button @click="$emit('delete-note', note.id)" class="action delete">✖</button>
    </p>
  </div>
</template>

<script>
export default {
  name: "NoteItem",
  props: ["note"],
  methods: {
    markComplete() {
      const updatedNoteDetails = {
        id: this.note.id,
        isCompleted: !this.note.isCompleted
      };
      this.$emit("change-note", updatedNoteDetails);
    }
  }
};
</script>

<style scoped>
.title {
  font-size: 25px;
}
.note-item {
  background: #f4f4f4;
  padding: 10px;
  border-bottom: 1px #ccc dotted;
}
.is-complete {
  text-decoration: line-through;
}
.action-wrapper {
  display: flex;
  justify-content: center;
}
.action {
  display: inline-block;
  background: #ff0000;
  color: #fff;
  border: none;
  padding: 5px 9px;
  border-radius: 50%;
  cursor: pointer;
  width: 35px;
  height: 35px;
}
.delete {
  background: #ff0000;
}
.change {
  text-decoration: none;
  background: #325fb3;
}
.complete {
  background: #46bd28;
}
</style>