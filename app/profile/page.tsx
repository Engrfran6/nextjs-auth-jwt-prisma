import { getUserById } from "../libs/db/user";
import { getSession } from "../libs/sessions";

export default async function ProfilePage() {
  const session = await getSession();

  if (!session?.userId) {
    return (
      <div className="max-w-md mx-auto mt-40 p-6 text-center">
        <h2 className="text-xl font-semibold text-gray-800">
          You are not logged in.
        </h2>
      </div>
    );
  }

  const user = await getUserById(session.userId);

  if (!user) {
    return (
      <div className="max-w-md mx-auto mt-40 p-6 text-center">
        <h2 className="text-xl font-semibold text-gray-800">User not found.</h2>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-40 p-8 bg-white rounded-lg shadow-md space-y-4">
      <h2 className="text-2xl font-bold text-gray-800">Your Profile</h2>

      <div className="text-gray-700 space-y-1">
        <p>
          <span className="font-medium">Name:</span> {user.name}
        </p>
        <p>
          <span className="font-medium">Email:</span> {user.email}
        </p>
      </div>
    </div>
  );
}
