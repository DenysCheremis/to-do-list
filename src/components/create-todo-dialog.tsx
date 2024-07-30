"use client";

import PriorityDropdown from "@/components/todo-table/priority-dropdown";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCreateTodo } from "@/hooks/use-create-todo";
import { todoSchema } from "@/lib/schemas";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import * as React from "react";
import { useForm } from "react-hook-form";
import type { z } from "zod";

export function CreateTodoDialog() {
	const [isOpen, setIsOpen] = useState(false);
	const { mutate } = useCreateTodo();

	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
		watch,
		reset,
	} = useForm<TodoFormValues>({
		resolver: zodResolver(todoSchema),
		defaultValues: {
			priority: "Low",
		},
	});

	const onSubmit = (data: TodoFormValues) => {
		const todo = {
			createdAt: Math.floor(Date.now() / 1000),
			isDone: false,
			dueDate: data?.dueDate,
			id: "15",
		};
		mutate(
			{ ...todo, ...data },
			{
				onSuccess: () => reset(),
			},
		);
		reset();
		setIsOpen(false);
	};

	const handleDialogOpen = () => {
		setIsOpen(!isOpen);
		reset();
	};

	const priority = watch("priority", "Low");

	return (
		<Dialog open={isOpen} onOpenChange={handleDialogOpen}>
			<DialogTrigger asChild>
				<Button variant="outline" className="gap-2">
					<FontAwesomeIcon icon={faPlus} />
					Create TODO
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Create TODO</DialogTitle>
					<DialogDescription>
						Create your TODO here. Click save when you&apos;re done.
					</DialogDescription>
				</DialogHeader>
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className="grid gap-4 py-4">
						<div className="grid grid-cols-4 items-center gap-x-4 gap-y-2">
							<Label htmlFor="title" className="text-right">
								Title
							</Label>
							<Input id="title" {...register("title")} className="col-span-3" />
							{errors.title && (
								<p className="col-start-2 col-span-3 text-destructive">
									{errors.title.message}
								</p>
							)}
						</div>
						<div className="grid grid-cols-4 items-center gap-x-4 gap-y-2">
							<Label htmlFor="description" className="text-right">
								Description
							</Label>
							<Input
								id="description"
								{...register("description")}
								className="col-span-3"
							/>
							{errors.description && (
								<p className="col-start-2 col-span-3 text-destructive">
									{errors.description.message}
								</p>
							)}
						</div>
						<div className="grid grid-cols-4 items-center gap-x-4 gap-y-2">
							<Label htmlFor="priority" className="text-right">
								Priority
							</Label>
							<PriorityDropdown
								priority={priority}
								onChange={(value) => setValue("priority", value)}
							/>
							{errors.priority && (
								<p className="col-start-2 col-span-3 text-destructive">
									{errors.priority.message}
								</p>
							)}
						</div>
						<div className="grid grid-cols-4 items-center gap-x-4 gap-y-2">
							<Label htmlFor="dueDate" className="text-right">
								Due Date
							</Label>
							<Input
								id="dueDate"
								type="date"
								{...register("dueDate", {
									setValueAs: (value) => {
										if (value) {
											const [year, month, day] = value.split("-").map(Number);
											return Math.floor(
												new Date(year, month - 1, day).getTime() / 1000,
											);
										}
										return undefined;
									},
								})}
								className="col-span-3"
							/>
							{errors.dueDate && (
								<p className="col-start-2 col-span-3 text-destructive">
									{errors.dueDate.message}
								</p>
							)}
						</div>
					</div>
					<DialogFooter>
						<Button type="submit">Save changes</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}

type TodoFormValues = z.infer<typeof todoSchema>;
