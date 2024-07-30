import type { Todo } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const updateTodo = async (todo: Todo) => {
	const { id, ...updatedData } = todo;
	const response = await axios.put(
		`${process.env.NEXT_PUBLIC_API_URL}/${id}`,
		updatedData,
	);
	return response.data;
};

export const useUpdateTodo = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: updateTodo,
		// onSuccess: () => {
		// 	queryClient.invalidateQueries({ queryKey: ["todos"] });
		// },
		onSuccess: (updatedTodo) => {
			queryClient.setQueryData<Todo[]>(["todos"], (oldTodos) => {
				if (!oldTodos) return [];
				return oldTodos.map((todo) =>
					todo.id === updatedTodo.id ? updatedTodo : todo,
				);
			});
		},
	});
};
