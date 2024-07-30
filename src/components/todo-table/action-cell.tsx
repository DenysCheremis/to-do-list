import { EditTodoDialog } from "@/components/edit-todo-dialog";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDeleteTodo } from "@/hooks/use-delete-todo";
import { useUpdateTodo } from "@/hooks/use-update-todo";
import type { Todo } from "@/types";
import { faCheck, faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import * as React from "react";
import { useState } from "react";

export default function ActionCell({ row }: ActionCellProps) {
	const todo = row.original;
	const [isEditDialogOpen, setEditDialogOpen] = useState(false);
	const { mutate: deleteMutate } = useDeleteTodo();
	const { mutate: updateMutate } = useUpdateTodo();

	const handleDelete = (id: string) => deleteMutate(id);
	const handleUpdate = () => updateMutate({ ...todo, isDone: !todo.isDone });
	const handleEdit = () => setEditDialogOpen(true);

	return (
		<>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant="ghost" className="h-8 w-8 p-0">
						<span className="sr-only">Open menu</span>
						<DotsHorizontalIcon className="h-4 w-4" />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end">
					<DropdownMenuLabel>Actions</DropdownMenuLabel>
					<DropdownMenuItem
						onClick={() => handleEdit()}
						className="gap-2"
						disabled={todo.isDone}
					>
						<FontAwesomeIcon icon={faPen} />
						Edit
					</DropdownMenuItem>
					<DropdownMenuItem className="gap-2" onClick={() => handleUpdate()}>
						<FontAwesomeIcon icon={faCheck} />
						{!todo.isDone ? "Mark as completed" : "Mark as incomplete"}
					</DropdownMenuItem>
					<DropdownMenuSeparator />
					<DropdownMenuItem
						className="gap-2 text-destructive"
						onClick={() => handleDelete(todo.id)}
					>
						<FontAwesomeIcon icon={faTrash} />
						Delete
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
			{isEditDialogOpen ? (
				<EditTodoDialog
					todo={todo}
					isOpen={isEditDialogOpen}
					onClose={() => setEditDialogOpen(false)}
				/>
			) : (
				""
			)}
		</>
	);
}

interface ActionCellProps {
	row: {
		original: Todo;
	};
}
