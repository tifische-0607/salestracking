import React, { useState } from "react";
import { MadeWithDyad } from "@/components/made-with-dyad";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import TodoForm from "@/components/TodoForm";
import TodoList from "@/components/TodoList";
import { Todo } from "@/types/todo";
import { Link } from "react-router-dom"; // Import Link
import { Button } from "@/components/ui/button";

const Index = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodo = (text: string) => {
    const newTodo: Todo = {
      id: crypto.randomUUID(), // Using crypto.randomUUID for unique IDs
      text,
      completed: false,
    };
    setTodos((prevTodos) => [...prevTodos, newTodo]);
  };

  const toggleTodo = (id: string) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <Card className="w-full max-w-md shadow-lg mb-4">
        <CardHeader>
          <CardTitle className="text-3xl text-center">My Todo List</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <TodoForm onAdd={addTodo} />
          <TodoList todos={todos} onToggle={toggleTodo} onDelete={deleteTodo} />
        </CardContent>
      </Card>

      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Sales App</CardTitle>
        </CardHeader>
        <CardContent className="p-4 text-center">
          <p className="mb-4 text-muted-foreground">Ready to track your sales opportunities?</p>
          <Link to="/opportunities">
            <Button>Go to Opportunities</Button>
          </Link>
        </CardContent>
      </Card>
      <MadeWithDyad />
    </div>
  );
};

export default Index;