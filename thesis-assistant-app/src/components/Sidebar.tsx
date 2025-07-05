import React from 'react';

const Sidebar = () => {
  return (
    <aside className="w-64 border-r p-4">
      <nav>
        <ul>
          <li className="mb-2">
            <a href="/" className="text-lg font-semibold">Dashboard</a>
          </li>
          <li className="mb-2">
            <a href="/references" className="text-lg font-semibold">References</a>
          </li>
          <li className="mb-2">
            <a href="/notes" className="text-lg font-semibold">Notes</a>
          </li>
          <li className="mb-2">
            <a href="/timeline" className="text-lg font-semibold">Timeline</a>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
