import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import { formatDateTime } from "@/lib/utils";

export default function RecentUsers({ recentUsers }: { recentUsers: User[] }) {
  const filteredUsers = recentUsers.slice(0, 5);
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-300 bg-gray-50 dark:border-gray-500 px-4 pb-3 pt-4 dark:bg-dark-200 sm:px-6">
      <div className="flex flex-col gap-2 mb-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Recent Users
          </h3>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href={`/dashboard/users`}
            className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-theme-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-500 dark:bg-dark-300 dark:text-gray-200 dark:hover:bg-dark-200"
          >
            See all
          </Link>
        </div>
      </div>
      <div className="max-w-full overflow-x-auto">
        <Table>
          <TableHeader className="border-gray-100 dark:border-gray-800 border-y">
            <TableRow>
              <TableCell className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                Image
              </TableCell>
              <TableCell className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                Username
              </TableCell>
              <TableCell className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                Created At
              </TableCell>
            </TableRow>
          </TableHeader>

          <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
            {filteredUsers.map((user, id) => (
              <TableRow key={id} className="">
                <TableCell className="py-3">
                  <div className="flex items-center gap-3">
                    <div className="h-[50px] w-[50px] overflow-hidden rounded-md">
                      <img
                        width={50}
                        height={50}
                        src={user.profilePicture}
                        className="w-20 h-10 object-cover"
                        alt={user.username}
                      />
                    </div>
                  </div>
                </TableCell>
                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-300">
                  {user.username}
                </TableCell>
                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-300">
                  {user.createdAt
                    ? formatDateTime(user.createdAt).dateOnly
                    : "N/A"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
