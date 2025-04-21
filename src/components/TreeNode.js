function TreeNode({ node, selectedId, setSelected, depth = 0 }) {
    const isSelected = node.id === selectedId;
  
    return (
      <div onClick={(e) => { e.stopPropagation(); setSelected(node.id); }}>
        <div
          style={{
            display: "flex",
            alignItems: "center"
          }}
        >
          <div style={{ width: `${depth * 20}px` }}></div>

          <div
            style={{
              padding: "4px 4px",
              backgroundColor: isSelected ? "#e0f7ff" : "transparent",
              cursor: "pointer"
            }}
          >
            {node.title}
          </div>
        </div>
  
        {node.children.map((child) => (
          <TreeNode
            key={child.id}
            node={child}
            selectedId={selectedId}
            setSelected={setSelected}
            depth={depth + 1}
          />
        ))}
      </div>
    );
  }
  
  export default TreeNode;