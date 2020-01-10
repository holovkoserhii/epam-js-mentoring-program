// Create custom class `Bookshelf` and add `Book` instances to it.
// Implement method `read` as a generator that will return iterator over all added books. Read all books inside this loop.

const BookModule = require("./part2");

const myBook = new BookModule("Serhii", 33);
const myFriendBook = new BookModule("Sasha", 30);
const myDogBook = new BookModule("Ajax", 4);

class Bookshelf {
  constructor(...books) {
    this.booksCollection = books;
  }

  [Symbol.iterator]() {
    var index = 0;
    return {
      next: () => ({
        value: this.booksCollection[index++],
        done: !this.booksCollection[index - 1]
      })
    };
  }

  *read() {
    for (let book of this.booksCollection) {
      yield `This book is about ${book.name} who is ${book.age} years young`;
    }
    yield "This is the end, folks :)";
    return "Have a great day";
  }
}

const myBookShelf = new Bookshelf(myBook, myFriendBook, myDogBook);

for (let i of myBookShelf) {
  console.log(i);
}

console.log("Now let's see how it may be returned by the generator below:");
const generator = myBookShelf.read();

console.log(generator.next().value);
console.log(generator.next().value);
console.log(generator.next().value);
console.log(generator.next().value);
console.log(generator.next().value);
