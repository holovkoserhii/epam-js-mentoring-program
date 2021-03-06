import { Subject, from } from 'rxjs';
import { switchMap, debounceTime } from 'rxjs/operators';
import axios from 'axios';

const URL_BASE = 'https://jsonplaceholder.typicode.com/todos/'
const DEBOUNCE_TIME = 1000
const ITEMS_AT_ONCE = 30
let todoTitles = []

const filterSection: HTMLElement = document.querySelector('.filter')
filterSection.style.display = 'none';

interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

const makeListItem = item => `<li>${item}</li>`

const updateResult = (markup: string) => {
  document.querySelector('.result').innerHTML = `<ol>${markup}</ol>`
}

const getObservableResponse = () => from(axios.get(URL_BASE))

const updateView = (filteringValue: string) => {
  const resultingMarkup = todoTitles
    .filter(elem => elem.includes(filteringValue))
    .reduce((accum, elem) => accum += makeListItem(elem), '')
  updateResult(resultingMarkup)
}

const filterItems = evt => {
  evt.preventDefault()
  const subject = new Subject<string>();
  subject.pipe(
    debounceTime(DEBOUNCE_TIME),
  )
    .subscribe({
      next: () => updateView(evt.target.value),
    })
  subject.next(evt.target.value)
}

const generateTask5Markup = ({ data }: { data: Todo[] }, filterString?: string) => {
  filterSection.style.display = 'block';
  const first10titlesMarkup: string = data
    .map(({ title }) => title)
    .slice(0, ITEMS_AT_ONCE)
    .map(item => {
      todoTitles.push(item)
      return item
    })
    .filter(element => filterString ? element.includes(filterString) : true)
    .reduce((accum, elem) => accum += makeListItem(elem), '');
  updateResult(first10titlesMarkup)

}

const getTodoWithSubject = () => {
  const subject = new Subject<void>();
  subject
    .pipe(switchMap(() => getObservableResponse()))
    .subscribe({
      next: generateTask5Markup,
    })
  subject.next()
}

document.querySelector(".runTask4").addEventListener("click", getTodoWithSubject)
document.querySelector('.inputText').addEventListener('input', filterItems)