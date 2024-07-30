import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const deleteTodo = async (id: string) => {
	const response = await axios.delete(
		`${process.env.NEXT_PUBLIC_API_URL}/${id}`,
	);
	return response.data;
};

export const useDeleteTodo = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: deleteTodo,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["todos"] });
		},
	});
};
