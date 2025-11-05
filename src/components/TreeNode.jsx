import React from 'react';

const TreeNode = ({ node }) => {
  if (!node) return null;

  return (
    <div className="tree-node">
      <div className="node-value">{node.valor}</div>
      <div className="children">
        {node.izquierda && <TreeNode node={node.izquierda} />}
        {node.derecha && <TreeNode node={node.derecha} />}
      </div>
    </div>
  );
};

export default TreeNode;