import React from 'react';
import MenuNode from './MenuNode';
import UserPreferences from './UserPreferences';

const SidebarMenu = ({ 
  menuData, 
  activeLink, 
  onNodeClick, 
  expandedNodes, 
  onToggleExpand,
  theme,
  onThemeChange,
  fontSize,
  onFontSizeChange,
  onNavigate
}) => {
  return (
    <div className="sidebar-menu">
      <div className="sidebar-header">
        <h2>Navigation</h2>
        <p className="sidebar-subtitle">Challenge 16 - LocalStorage</p>
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

      <div className="sidebar-footer">
        <UserPreferences
          theme={theme}
          onThemeChange={onThemeChange}
          fontSize={fontSize}
          onFontSizeChange={onFontSizeChange}
          onNavigate={onNavigate}
        />
      </div>
    </div>
  );
};

export default SidebarMenu;