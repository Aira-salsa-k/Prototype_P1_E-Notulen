import { useAuthStore } from "@/store/useAuthStore";
import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";
import { UsersIcon } from "@heroicons/react/24/outline";

export default function UserProfile({
  onLogout,
  isCollapsed,
}: {
  onLogout: () => void;
  isCollapsed: boolean;
}) {
  const currentUser = useAuthStore((state) => state.currentUser);
  const logout = useAuthStore((state) => state.actions.logout);

  const handleLogout = () => {
    logout();
    // Redirect logic if needed, but for now just clear state
  };

  return (
    <div className="flex-shrink-0 border-t border-indigo-900 bg-indigo-950/70">
      <div
        className={`flex items-center ${
          isCollapsed ? "justify-center p-3" : "p-4"
        }`}
      >
        {isCollapsed ? (
          <button
            onClick={handleLogout}
            title="Log out"
            className="p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition"
          >
            <ArrowRightOnRectangleIcon className="h-5 w-5" />
          </button>
        ) : (
          <>
            <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
              <UsersIcon className="h-6 w-6 text-gray-500" />
            </div>

            <div className="ml-3 flex-1 min-w-0">
              <p className="text-sm font-medium text-neutral-200 truncate">
                {currentUser?.name || "Guest"}
              </p>
              <p className="text-xs text-gray-500 capitalize">
                {currentUser?.role?.replace("_", " ") || "No Role"}
              </p>
            </div>

            <button
              onClick={onLogout}
              title="Log out"
              className="ml-2 p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition"
            >
              <ArrowRightOnRectangleIcon className="h-5 w-5" />
            </button>
          </>
        )}
      </div>
    </div>
  );
}
