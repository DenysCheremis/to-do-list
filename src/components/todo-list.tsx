import TodoTable from "@/components/todo-table/todo-table";
import { useTodos } from "@/hooks/use-list-todo-query";
import type React from "react";

const TodoList: React.FC = () => {
	const { data: todos, error, isLoading } = useTodos();
	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>Error fetching todos</div>;
	}

	return (
		<div className="w-full">
			<TodoTable todos={todos || []} />
		</div>
	);
};

export default TodoList;
