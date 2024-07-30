import type { Todo } from "@/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchTodos = async (): Promise<Todo[]> => {
	const response = await axios.get(process.env.NEXT_PUBLIC_API_URL as string);
	return response.data;
};

export const useTodos = () => {
	return useQuery({
		queryKey: ["todos"],
		queryFn: fetchTodos,
	});
};
