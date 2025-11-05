import React from 'react';
import { ChevronRight, ChevronDown } from 'lucide-react';

const MenuNode = ({ node, level = 0, activeLink, onNodeClick, expandedNodes, onToggleExpand }) => {
  const hasChildren = node.hijos && node.hijos.length > 0;
  const isExpanded = expandedNodes.has(node.link);
  const isActive = activeLink === node.link;
  const Icon = node.icon;

  const handleClick = () => {
    if (hasChildren) {
      onToggleExpand(node.link);
    }
    onNodeClick(node);
  };

  return (
    <div className="menu-node">
      <div
        className={`menu-item ${isActive ? 'active' : ''}`}
        style={{ paddingLeft: `${level * 20 + 12}px` }}
        onClick={handleClick}
      >
        {hasChildren && (
          <span className="expand-icon">
            {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </span>
        )}
        {!hasChildren && <span className="expand-icon-spacer" />}
        <Icon size={18} className="node-icon" />
        <span className="menu-title">{node.titulo}</span>
      </div>
      
      {hasChildren && isExpanded && (
        <div className="menu-children">
          {node.hijos.map((child, index) => (
            <MenuNode
              key={`${child.link}-${index}`}
              node={child}
              level={level + 1}
              activeLink={activeLink}
              onNodeClick={onNodeClick}
              expandedNodes={expandedNodes}
              onToggleExpand={onToggleExpand}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MenuNode;