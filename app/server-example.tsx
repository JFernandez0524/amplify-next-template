import { cookieBasedClient, authClient } from './lib/amplify-server-utils';

export default async function ServerPage() {
  // Fetch data on the server
  const { data: todos } = await cookieBasedClient.models.Todo.list();
  
  // Get current user on the server
  const user = await authClient.getCurrentUser();

  return (
    <div>
      <h1>Server-Side Rendered Page</h1>
      {user && <p>Welcome, {user.username}!</p>}
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>{todo.content}</li>
        ))}
      </ul>
    </div>
  );
}
