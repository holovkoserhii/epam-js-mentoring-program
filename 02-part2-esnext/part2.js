// Create custom class `Book` with constructor param `character` with fields: `name`, `age`.
// Inside `Book` instance interpolate `name` and `age` into string template (feel free to create any story you like).
// Create iterator property to be able to read your cool story line by line inside for..of loop.
// Export `Book` as module. Do not create instance in the same file.
// Use as many ES.Next features as you can.

class Book {
  constructor(name, age) {
    this.character = `Human`;
    this.name = name;
    this.age = age;
    this.description = `My name is ${this.name} and I am ${this.age} years young!`;
  }

  [Symbol.iterator]() {
    let index = 0;
    let data = this.description;

    return {
      next: () => ({ value: data[index++], done: !data[index] })
    };
  }
}

// const myBook = new Book("Serhii", 33);
// for (let i of myBook) {
//   console.log(i);
// }

module.exports = Book;
