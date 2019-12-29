<template>
  <div id="app">
    <AddTodo v-on:add-todo="addTodo" />
    <Todos v-bind:todos="todos" v-on:del-todo="deleteTodo" />
    <p>
      Disclaimer: before using please make sure you run json-server (yarn run
      json-server)
    </p>
  </div>
</template>

<script>
import axios from "axios";
import Todos from "../components/Todos";
import AddTodo from "../components/AddTodo";

export default {
  name: "Home",
  components: {
    Todos,
    AddTodo
  },
  data() {
    return {
      todos: []
    };
  },
  methods: {
    deleteTodo(id) {
      axios
        .delete(`http://localhost:3000/todos/${id}`)
        .then(() => (this.todos = this.todos.filter(todo => todo.id !== id)))
        // eslint-disable-next-line no-console
        .catch(console.log);
    },
    addTodo(newTodo) {
      const { title, completed } = newTodo;
      axios
        .post("http://localhost:3000/todos", { title, completed })
        .then(res => (this.todos = [...this.todos, res.data]))
        // eslint-disable-next-line no-console
        .catch(console.log);
    }
  },
  created() {
    axios
      .get("http://localhost:3000/todos")
      .then(res => (this.todos = res.data))
      // eslint-disable-next-line no-console
      .catch(console.log);
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
.submit-button:hover {
  background: #666666;
}
</style>
