<template>
  <div>
    <h1>Please edit your note</h1>
    <form @submit.prevent="saveNote">
      <div class="inputs">
        <input
          type="text"
          v-model="title"
          name="title"
          placeholder="This will be your new note TITLE"
        />
        <input
          type="text"
          v-model="text"
          name="text"
          placeholder="This will be your new note TEXT (optional)"
        />
      </div>
      <div class="actions">
        <button @click="goBack" class="back">
          I don't want to change anything, just let me back!!!111
        </button>
        <button type="submit" :disabled="this.title == ''">
          I'm done
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { updateItem } from "../utils/api";

export default {
  name: "EditNote",
  data() {
    return {
      text: this.$route.params.text,
      title: this.$route.params.title
    };
  },
  props: ["note"],
  methods: {
    goBack() {
      this.$router.push({ name: "home" });
    },
    async saveNote() {
      const updatedNote = {
        title: this.title,
        text: this.text
      };
      await updateItem(this.$route.params.id, updatedNote);
      this.goBack();
    }
  }
};
</script>

<style>
.inputs input {
  width: 80%;
  margin: 5px;
}
.actions {
  display: flex;
  justify-content: center;
}
.actions button {
  width: 40%;
  margin: 5px;
  height: 40px;
}
.actions .back {
  background: rgba(255, 0, 0, 0.308);
}
.actions button[type="submit"] {
  background: rgba(30, 255, 0, 0.308);
}
</style>
