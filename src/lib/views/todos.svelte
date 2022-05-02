<script lang="ts">
  import { browser } from '$app/env';
  import { goto } from '$app/navigation';
  import { writable, type Writable } from 'svelte/store';

  import CreateTodo from '$lib/components/todos/create.svelte';
  import DeleteModal from '$lib/components/todos/delete.svelte';
  import EditModal from '$lib/components/todos/edit.svelte';
  import { isAuthenticated, theme } from '$lib/global-state';
  import reducer from '$lib/components/todos/reducer';
  import apiRequest from '$lib/utilities/request';
  import Todo from '$lib/components/todos/todo.svelte';

  import type { Todo as TodoInterface } from '$lib/components/todos/interface';


  const todos: Writable<TodoInterface[]> = writable([]);
  const selectedDeleteTodo: Writable<TodoInterface | null> = writable(null);
  const selectedEditTodo: Writable<TodoInterface | null> = writable(null);
  let hasFetched = false;

  if (browser) {
    (async function fetchTodos() {
      let fetchedTodos: TodoInterface[] = [];
      try {
        fetchedTodos = await apiRequest('todos');
      } catch (err) {
        console.error(`Fetch todo request | ${err}`);
      }
      hasFetched = true;
      todos.set([ ...$todos, ...fetchedTodos ]);
    })();
  }

  $: {
    if (browser && !$isAuthenticated) {
      /**
       * If we detect user has lost authentication status, redirect to home
      */
      goto('/');
    }
  }

  function addTodo(newTodo: TodoInterface) {
    todos.set(reducer($todos, { type: 'add-todo', payload: { todo: newTodo } }));
  }

  async function completeTodo(_id: string, completed: boolean) {
    todos.set(reducer($todos, { type: 'complete-todo', payload: { _id, completed } }));
    await apiRequest(`todos/${_id}`, 'POST', { completed });
  }

  async function deleteTodo() {
    todos.set(reducer($todos, { type: 'delete-todo', payload: { _id: $selectedDeleteTodo?._id } }));
    await apiRequest(`todos/${$selectedDeleteTodo?._id}`, 'DELETE');
  }

  async function editTodo({ _id, title }: { _id: string; title: string }) {
    todos.set(reducer($todos, { type: 'edit-todo', payload: { _id, title } }));
    await apiRequest(`todos/${_id}`, 'POST', { title });
  }
</script>

<div class={`cstm_container container-fluid`}>
  <h1 class={`mt-5 ${$theme.textClass}`}>Your Todos</h1>
  <p class="fs-6 text-muted">Create and manage your todos.</p>
  <div class={`card shadow-sm mb-5 ${$theme.cardBgClass}`}>
    <CreateTodo {addTodo} />
    {#if hasFetched}
      <ul class={`list-group list-group-flush mb-1 ${$theme.listGroupClass}`}>
        {#if $todos.length}
          {#each $todos as todo (todo._id)}
            <Todo
              {completeTodo}
              {todo}
              setSelectedDeleteTodo={selectedDeleteTodo.set}
              setSelectedEditTodo={selectedEditTodo.set}
            />
          {/each}
        {:else}
          <li class="cstm_todo-item list-group-item list-group-item-action p-0">
            <div class="row">
              <p class="col d-flex align-items-center fs-5 text-muted w-100 ms-3 p-3">
                No todos yet. Create one above!
              </p>
            </div>
          </li>
        {/if}
      </ul>
    {:else}
      <p
        class={`d-flex justify-content-center align-items-center border-top px-3 ${$theme.borderClass}`}
      >
        <span class="spinner-border text-primary my-2" role="status" />
        <span class="p-3 fs-5 text-muted">Collecting your todos ...</span>
      </p>
    {/if}
  </div>
</div>
<EditModal {editTodo} selectedEditTodo={$selectedEditTodo} setSelectedEditTodo={selectedEditTodo.set} />
<DeleteModal {deleteTodo} />
