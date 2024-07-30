import type { Todo } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const createTodo = async (todo: Omit<Todo, "id">) => {
	const response = await axios.post(
		process.env.NEXT_PUBLIC_API_URL as string,
		todo,
	);
	return response.data;
};

export const useCreateTodo = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: createTodo,
		// onSuccess: () => {
		// 	queryClient.invalidateQueries({ queryKey: ["todos"] });
		// },
		onSuccess: (newTodo) => {
			queryClient.setQueryData<Todo[]>(["todos"], (oldTodos) => {
				if (!oldTodos) return [newTodo];
				return [...oldTodos, newTodo];
			});
		},
	});
};
