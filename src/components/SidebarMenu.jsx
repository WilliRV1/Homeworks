import React from 'react';
import MenuNode from './MenuNode';

const SidebarMenu = ({ menuData, activeLink, onNodeClick, expandedNodes, onToggleExpand }) => {
  return (
    <div className="sidebar-menu">
      <div className="sidebar-header">
        <h2>Navigation</h2>
      </div>
      <nav className="sidebar-nav">
        <MenuNode
          node={menuData}
          level={0}
          activeLink={activeLink}
          onNodeClick={onNodeClick}
          expandedNodes={expandedNodes}
          onToggleExpand={onToggleExpand}
        />
      </nav>
    </div>
  );
};

export default SidebarMenu;