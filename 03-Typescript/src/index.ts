// task 3
interface TodoItem {
  id: number;
  title: string;
  body: string;
  userId: number;
}

const showPostInConsole = async (): Promise<any> => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts/1')
  console.log('answer for the task 3 (I\'m too late, because I am async)');
  const result: TodoItem = await response.json()
  console.log(result)
}

showPostInConsole()

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
interface Customer {
  age: number;
  name: string;
}

const customerNamesLogger = <T extends Customer>(arg1: T, arg2: T): [string, string] => [arg1.name, arg2.name]

const customerA: Customer = {
  name: 'Capitan Morgan',
  age: 55,
}
const customerB = {
  name: 'Jack Daniels',
  age: 40,
}

console.log('answer for the task 5');
console.log(customerNamesLogger(customerA, customerB));