import React, { useState, useEffect } from 'react';
import SidebarMenu from './components/SidebarMenu';
import MainContent from './components/MainContent';
import { menuData, findNodeByLink } from './Data/menuTree';
import {
  getExpandedNodes,
  saveExpandedNodes,
  getActiveLink,
  saveActiveLink,
  getTheme,
  getFontSize,
  addToNavigationHistory
} from './utils/localStorage';
import './styles/Sidebar.css';
import './styles/MainContent.css';

function App() {
  // Cargar estado desde localStorage
  const [activeLink, setActiveLink] = useState(getActiveLink());
  const [expandedNodes, setExpandedNodes] = useState(getExpandedNodes());
  const [theme, setTheme] = useState(getTheme());
  const [fontSize, setFontSize] = useState(getFontSize());
  
  // Encontrar el nodo actual basado en el activeLink guardado
  const [currentNode, setCurrentNode] = useState(() => {
    const savedLink = getActiveLink();
    return findNodeByLink(menuData, savedLink) || menuData;
  });

  // Aplicar tema al body cuando cambie
  useEffect(() => {
    document.body.className = `theme-${theme} font-${fontSize}`;
  }, [theme, fontSize]);

  // Guardar estado cuando cambie
  useEffect(() => {
    saveExpandedNodes(expandedNodes);
  }, [expandedNodes]);

  useEffect(() => {
    saveActiveLink(activeLink);
  }, [activeLink]);

  const handleNodeClick = (node) => {
    setActiveLink(node.link);
    setCurrentNode(node);
    
    // Añadir al historial
    addToNavigationHistory(node);
    
    console.log('📍 Navigated to:', node.titulo);
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

  const handleNavigateToLink = (link) => {
    const node = findNodeByLink(menuData, link);
    if (node) {
      handleNodeClick(node);
    }
  };

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    console.log('🎨 Theme changed to:', newTheme);
  };

  const handleFontSizeChange = (newSize) => {
    setFontSize(newSize);
    console.log('🔤 Font size changed to:', newSize);
  };

  // Log del estado inicial
  useEffect(() => {
    console.log('🚀 App initialized with:');
    console.log('  - Active Link:', activeLink);
    console.log('  - Expanded Nodes:', Array.from(expandedNodes));
    console.log('  - Theme:', theme);
    console.log('  - Font Size:', fontSize);
  }, []);

  return (
    <div className="app-container">
      <SidebarMenu
        menuData={menuData}
        activeLink={activeLink}
        onNodeClick={handleNodeClick}
        expandedNodes={expandedNodes}
        onToggleExpand={handleToggleExpand}
        theme={theme}
        onThemeChange={handleThemeChange}
        fontSize={fontSize}
        onFontSizeChange={handleFontSizeChange}
        onNavigate={handleNavigateToLink}
      />
      <MainContent 
        currentNode={currentNode}
        theme={theme}
      />
    </div>
  );
}

export default App;