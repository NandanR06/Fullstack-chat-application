import { User, Users } from "lucide-react";
import React from "react";
import '../../src/index.css'
const SidebarSkeleton = () => {
  const skeletonContacts = Array(6).fill(null);
  return (
    <aside className="h-full lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200">
      {/* header */}
      <div className="border-b border-base-300 w-full p-5">
        <div className="flex items-center gap-2">
          <Users className="size-6" />
          <span className="font-medium hidden lg:block">Contacts</span>
        </div>
      </div>

      {/* Skeleton Contacts */}
      <div className="overflow-y-auto custom-scrollbar  w-full py-3 h-120">
        {skeletonContacts.map((_, idx) => (
          <div className="w-full p-3 flex items-center gap-3" key={idx}>
            <div className="relative mx-auto lg:mx-0">
              <div className="skeleton size-12 rounded-full" />
            </div>
            {/* user info only in large screen */}
            <div className="hidden md:block lg:block text-left min-w-0 flex-1">
              <div className="skeleton h-4 w-32 mb-2" />
              <div className="skeleton h-3 w-16" />
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default SidebarSkeleton;
