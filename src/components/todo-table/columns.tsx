import ActionCell from "@/components/todo-table/action-cell";
import PriorityDropdown from "@/components/todo-table/priority-dropdown";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useUpdateTodo } from "@/hooks/use-update-todo";
import { sortDueDate, sortIsDone, sortPriority } from "@/lib/sort-functions";
import { cn } from "@/lib/utils";
import type { Priority, Todo } from "@/types";
import { CaretSortIcon } from "@radix-ui/react-icons";
import type { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";

const DescriptionCell = ({
	description,
	isDone,
}: { description: string; isDone: boolean }) => {
	const [isTruncated, setIsTruncated] = useState(true);
	const MAX_LENGTH = 30;
	const toggleTruncate = () => {
		setIsTruncated(!isTruncated);
	};

	return (
		<div
			className={cn(
				"block min-w-48",
				isDone ? "line-through text-gray-500" : "",
			)}
		>
			{isTruncated ? (
				<>
					{description.length > MAX_LENGTH ? (
						<>
							{description.slice(0, MAX_LENGTH)}...
							<Button variant="text" onClick={toggleTruncate}>
								{" "}
								Show more
							</Button>
						</>
					) : (
						description
					)}
				</>
			) : (
				<>
					{description}
					{description.length > MAX_LENGTH && (
						<Button variant="text" onClick={toggleTruncate}>
							{" "}
							Show less
						</Button>
					)}
				</>
			)}
		</div>
	);
};

const DoneCell = ({ todo }: { todo: Todo }) => {
	const { mutate: updateMutate } = useUpdateTodo();

	return (
		<Checkbox
			checked={todo.isDone}
			onCheckedChange={() => updateMutate({ ...todo, isDone: !todo.isDone })}
			aria-label="Mark as done"
		/>
	);
};

const PriorityCell = ({ todo }: { todo: Todo }) => {
	const { mutate: updateMutate } = useUpdateTodo();

	const handlePriorityChange = (newPriority: Priority) => {
		updateMutate({ ...todo, priority: newPriority });
	};

	return (
		<PriorityDropdown
			isDone={todo.isDone}
			priority={todo.priority as Priority}
			onChange={handlePriorityChange}
		/>
	);
};

export const columns: ColumnDef<Todo>[] = [
	{
		accessorKey: "isDone",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					Done
					<CaretSortIcon className="ml-2 h-4 w-4" />
				</Button>
			);
		},
		cell: ({ row }) => <DoneCell todo={row.original} />,
		sortingFn: sortIsDone,
		enableSorting: true,
		enableHiding: false,
	},
	{
		accessorKey: "title",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					Title
					<CaretSortIcon className="ml-2 h-4 w-4" />
				</Button>
			);
		},
		cell: ({ row }) => (
			<span
				className={cn(row.original.isDone ? "line-through text-gray-500" : "")}
			>
				{row.original.title}
			</span>
		),
	},
	{
		accessorKey: "description",
		header: "Description",
		cell: ({ row }) => (
			<DescriptionCell
				description={row.original.description}
				isDone={row.original.isDone}
			/>
		),
	},
	{
		accessorKey: "priority",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					Priority
					<CaretSortIcon className="ml-2 h-4 w-4" />
				</Button>
			);
		},
		cell: ({ row }) => <PriorityCell todo={row.original} />,
		sortingFn: sortPriority,
	},
	{
		accessorKey: "dueDate",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					Due Date
					<CaretSortIcon className="ml-2 h-4 w-4" />
				</Button>
			);
		},
		cell: ({ cell, row }) => {
			const timestamp = cell.getValue();
			const date = typeof timestamp === "number" && new Date(timestamp * 1000);
			return (
				<span
					className={cn(
						row.original.isDone ? "line-through text-gray-500" : "",
					)}
				>
					{date ? date.toLocaleDateString() : "---"}
				</span>
			);
		},
		sortingFn: sortDueDate,
	},
	{
		id: "actions",
		enableHiding: false,
		cell: ActionCell,
	},
];
