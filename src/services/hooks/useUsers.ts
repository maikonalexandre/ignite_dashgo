import { useQuery } from "@tanstack/react-query";
import { api } from "../api";

type userType = {
  id: string;
  name: string;
  email: string;
  createdAt: string;
};

export async function getUsers(): Promise<userType[]> {
  const { data } = await api.get("/users");

  const users = data.users.map((user: userType) => {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: new Date(user.createdAt).toLocaleDateString("pt-br", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }),
    };
  });
  return users;
}

export function useUsers() {
  return useQuery(["users"], getUsers, {
    staleTime: 1000 * 5, // 5 segundos.
  });
}
