<template>
  <div>
    <form @submit.prevent="addNote">
      <input type="text" v-model="title" name="title" placeholder="Add a title" />
      <input type="text" v-model="text" name="text" placeholder="Add a text (optional)" />
      <button type="submit" :disabled="this.title == ''" class="submit-button">Submit</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "AddNote",
  data() {
    return {
      title: "",
      text: ""
    };
  },
  methods: {
    addNote() {
      const newNote = {
        title: this.title,
        text: this.text,
        isCompleted: false
      };
      this.$emit("add-note", newNote);
      this.title = "";
      this.text = "";
    }
  }
};
</script>

<style scoped>
form {
  display: flex;
}

input[type="text"] {
  flex: 10;
  padding: 5px;
}

button {
  min-width: 200px;
  flex: 2;
}

button[disabled] {
  color: grey;
}
</style>
