import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

interface TodoFormProps {
  onAdd: (text: string) => void;
}

const TodoForm: React.FC<TodoFormProps> = ({ onAdd }) => {
  const [inputText, setInputText] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputText.trim()) {
      onAdd(inputText.trim());
      setInputText("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex space-x-2 p-4 border-b">
      <Input
        type="text"
        placeholder="Add a new todo..."
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        className="flex-grow"
      />
      <Button type="submit" size="icon" aria-label="Add todo">
        <PlusCircle className="h-5 w-5" />
      </Button>
    </form>
  );
};

export default TodoForm;