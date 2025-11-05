import React, { useState } from 'react';
import SidebarMenu from './components/SidebarMenu';
import MainContent from './components/MainContent';
import { menuData } from './Data/menuTree';
import './styles/Sidebar.css';
import './styles/MainContent.css';

function App() {
  const [activeLink, setActiveLink] = useState('/');
  const [currentNode, setCurrentNode] = useState(menuData);
  const [expandedNodes, setExpandedNodes] = useState(new Set(['/']));

  const handleNodeClick = (node) => {
    setActiveLink(node.link);
    setCurrentNode(node);
  };

  const handleToggleExpand = (link) => {
    setExpandedNodes(prev => {
      const newSet = new Set(prev);
      if (newSet.has(link)) {
        newSet.delete(link);
      } else {
        newSet.add(link);
      }
      return newSet;
    });
  };

  return (
    <div className="app-container">
      <SidebarMenu
        menuData={menuData}
        activeLink={activeLink}
        onNodeClick={handleNodeClick}
        expandedNodes={expandedNodes}
        onToggleExpand={handleToggleExpand}
      />
      <MainContent currentNode={currentNode} />
    </div>
  );
}

export default App;