// task 3
interface TodoItem {
  id: number;
  title: string;
  body: string;
  userId: number;
}

const showInConsole = (object: TodoItem) => {
  console.log('answer for the task 3');
  console.log(object)
}

fetch('https://jsonplaceholder.typicode.com/posts/1')
  .then(response => response.json())
  .then(json => showInConsole(json))

// task 4

type LanguageType = 'typed' | 'non-typed' | 'high-level' | 'low-level'

abstract class Language {
  constructor(public type: LanguageType) {

  }
  abstract sayHelloWorld(): void
}

class JavascriptLanguage extends Language {
  constructor(type: LanguageType) {
    super(type)
  }
  sayHelloWorld(): void {
    console.log('Hello world!!!111')
  }
}

const myJS = new JavascriptLanguage('high-level')
console.log('answer for the task 4');
console.log(myJS);

// task 5
interface Dictionary<T> {
  [key: string]: T;
}

class MyOwnClass<K, T> {
  constructor(
    public prop1: K,
    public prop2: T
  ) { }

  useProp1: () => {
    prop: this.prop1,
    type: K
  }

  useProp2: () => {
    prop: this.prop2,
    type: T
  }
}

class myFirstAbstractAttempt extends MyOwnClass {
  name: string
  age: number

  constructor(name: string, age: number) {
    super(name, age)
  }

  useProp1() {
    return {
      prop: this.name,
      type: typeof (this.name)
    }
  }

  useProp2() {
    return {
      prop: this.age,
      type: typeof (this.age)
    }
  }
}