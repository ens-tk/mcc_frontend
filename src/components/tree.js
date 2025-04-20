import { useState } from "react";


const tree = []; 

function Tree() {
  const [treeData, setTreeData] = useState(tree);
  const [selectedNodeId, setSelectedNodeId] = useState(null);

  const handleReset = () => {
    setTreeData([]);
    setSelectedNodeId(null);
  };

  const handleAddRoot = () => {
    const name = prompt("Введите название корневого элемента:");
    if (!name) return;

    const newNode = {
      id: Date.now(),
      title: name,
      children: []
    };

    setTreeData([...treeData, newNode]);
  };

  const findNodeById = (nodes, id) => {
    for (let node of nodes) {
      if (node.id === id) return node;
    }
    return null;
  };

  const handleAddChild = () => {

    const updatedTree = structuredClone(treeData);
    const parent = findNodeById(updatedTree, selectedNodeId);
    if (parent) {
      parent.children.push({
        id: Date.now(),
        title: name,
        children: []
      });
      setTreeData(updatedTree);
    }
  };



  return (
    <div style={{ padding: "20px" }}>
      <h2>Дерево</h2>

      <div style={{ display: "flex", gap: "10px", marginBottom: "15px" }}>
        <button onClick={handleAddRoot}>Добавить корневой</button>
        <button onClick={handleAddChild}>Добавить дочерний</button>
        <button onClick={handleReset}>Сбросить</button>
      </div>

      {treeData.length === 0 ? (
        <p>Дерево пустое</p>
      ) : (
        <p>будет дерево</p>
      )}
    </div>
  );
}

export default Tree;