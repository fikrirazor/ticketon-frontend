import { useEffect } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import useUserStore from "@/store/user.store";

function Home() {
  const { users, fetchUsers } = useUserStore();
  useEffect(() => {
    fetchUsers({ page: 1, limit: 10 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <main className="p-8 flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Users</h1>
      </div>
      <Table className="w-full p-6 border">
        <TableHeader className="bg-gray-400">
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Updated At</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.id}</TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.status}</TableCell>
              <TableCell>{new Date(user.createdAt).toDateString()}</TableCell>
              <TableCell>{new Date(user.updatedAt).toDateString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex items-center justify-end gap-4">
        <Button variant="outline" size="sm">
          <ChevronLeftIcon className="size-4" />
          Prev
        </Button>
        <h1 className="font-semibold">1</h1>
        <Button variant="outline" size="sm">
          Next
          <ChevronRightIcon className="size-4" />
        </Button>
      </div>
    </main>
  );
}

export default Home;
