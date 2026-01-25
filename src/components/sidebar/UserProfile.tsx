import {
  ArrowRightOnRectangleIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";

export default function UserProfile({
  onLogout,
  isCollapsed,
}: {
    
  onLogout: () => void;
  isCollapsed: boolean;
}) {
  return (
    <div className="flex-shrink-0 border-t border-indigo-900 bg-indigo-950/70">
      <div
        className={`flex items-center ${
          isCollapsed ? "justify-center p-3" : "p-4"
        }`}
      >
        {isCollapsed ? (
          <button
            onClick={onLogout}
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
                Doris, S.sos
              </p>
              <p className="text-xs text-gray-500">Admin</p>
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
