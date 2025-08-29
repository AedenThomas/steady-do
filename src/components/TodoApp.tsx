import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Plus, Check } from 'lucide-react';

interface Task {
  id: string;
  title: string;
  completed: boolean;
}

const TodoApp = () => {
  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', title: 'Set up the project repository', completed: true },
    { id: '2', title: 'Design the database schema', completed: false },
    { id: '3', title: 'Build the API endpoints', completed: false },
  ]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTaskTitle.trim()) {
      const newTask: Task = {
        id: Date.now().toString(),
        title: newTaskTitle.trim(),
        completed: false,
      };
      setTasks([...tasks, newTask]);
      setNewTaskTitle('');
    }
  };

  const toggleTask = (id: string) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl mx-auto shadow-md">
        <div className="p-8">
          {/* Header */}
          <header className="mb-8">
            <h1 className="text-3xl font-bold text-foreground">My Tasks</h1>
          </header>

          {/* Task Input Form */}
          <form onSubmit={addTask} className="mb-8">
            <div className="flex gap-3">
              <Input
                type="text"
                placeholder="What needs to be done?"
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                className="flex-1 rounded-lg border-border focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <Button 
                type="submit" 
                className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg px-6 transition-all duration-200 hover:scale-105 flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Add Task
              </Button>
            </div>
          </form>

          {/* Task List */}
          <div className="space-y-2">
            {tasks.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-base">
                  Your list is empty! Add a new task to get started.
                </p>
              </div>
            ) : (
              tasks.map((task) => (
                <TaskItem
                  key={task.id}
                  task={task}
                  onToggle={() => toggleTask(task.id)}
                />
              ))
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};

interface TaskItemProps {
  task: Task;
  onToggle: () => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onToggle }) => {
  return (
    <div className="flex items-center gap-4 p-4 rounded-lg hover:bg-muted/50 transition-all duration-300 cursor-pointer group">
      <div className="flex items-center">
        <Checkbox
          checked={task.completed}
          onCheckedChange={onToggle}
          className="rounded-md data-[state=checked]:bg-primary data-[state=checked]:border-primary"
        />
      </div>
      <span
        className={`flex-1 text-base transition-all duration-300 ${
          task.completed
            ? 'line-through text-muted-foreground'
            : 'text-foreground'
        }`}
      >
        {task.title}
      </span>
    </div>
  );
};

export default TodoApp;