import { emptyItemQuery } from './item.js';
// import getTodes from './helpers';

async function getTodes() {
  const res = await fetch(`https://jsonplaceholder.typicode.com/todos`);
  console.log('🚀 ~ file: helpers.js ~ line 34 ~ getTodes ~ res', res);
  const data = await res.json();

  console.log(data);
  return data;
}

export default class Store {
  constructor(name, callback) {
    const localStorage = window.localStorage;

    let liveTodos;
    // let liveTodos = getTodes();

    this.getLocalStorage = () => {
      return liveTodos || JSON.parse(localStorage.getItem(name) || '[]');
    };

    this.setLocalStorage = (todos) => {
      localStorage.setItem(name, JSON.stringify((liveTodos = todos)));
    };

    if (callback) {
      callback();
    }
  }

  find(query, callback) {
    const todos = this.getLocalStorage();

    callback(
      todos.filter((todo) => {
        for (let k in query) {
          if (query[k] !== todo[k]) {
            return false;
          }
        }
        return true;
      })
    );
  }

  update(update, callback) {
    const id = update.id;
    const todos = this.getLocalStorage();
    let i = todos.length;

    while (i--) {
      if (todos[i].id === id) {
        for (let k in update) {
          todos[i][k] = update[k];
        }
        break;
      }
    }

    this.setLocalStorage(todos);

    if (callback) {
      callback();
    }
  }

  insert(item, callback) {
    const todos = this.getLocalStorage();
    // return if item in todos / alert => Task 2
    const { title } = item;
    const isDuplicate = todos.map((todo) => todo.title).includes(title);
    if (isDuplicate) {
      alert('Item alreadt exist');
    } else {
      todos.push(item);
      this.setLocalStorage(todos);
    }

    if (callback) {
      callback();
    }
  }

  remove(query, callback) {
    const todos = this.getLocalStorage().filter((todo) => {
      for (let k in query) {
        if (query[k] === todo[k]) {
          return false;
        }
      }
      return true;
    });

    this.setLocalStorage(todos);

    if (callback) {
      callback(todos);
    }
  }

  count(callback) {
    this.find(emptyItemQuery, (data) => {
      const total = data.length;

      let i = total;
      let completed = 0;

      while (i--) {
        completed += data[i].completed;
      }
      callback(total, total - completed, completed);
    });
  }
}
