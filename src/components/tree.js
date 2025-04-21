import { useState } from "react";
import TreeNode from "./TreeNode";

const initialTree = [];

function Tree() {
  const [treeData, setTreeData] = useState(initialTree);
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
      if (node.children.length) {
        const found = findNodeById(node.children, id);
        if (found) return found;
      }
    }
    return null;
  };

  const handleAddChild = () => {
    if (!selectedNodeId) return alert("Сначала выберите элемент!");

    const name = prompt("Введите название дочернего элемента:");
    if (!name) return;

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

  const handleDelete = () => {
    if (!selectedNodeId) return alert("Сначала выберите элемент!");

    const deleteNode = (nodes) =>
      nodes
        .filter((n) => n.id !== selectedNodeId)
        .map((n) => ({ ...n, children: deleteNode(n.children) }));

    setTreeData(deleteNode(treeData));
    setSelectedNodeId(null);
  };

  const handleEdit = () => {
    if (!selectedNodeId) return alert("Сначала выберите элемент!");

    const newTitle = prompt("Введите новое название:");
    if (!newTitle) return;

    const updatedTree = structuredClone(treeData);
    const node = findNodeById(updatedTree, selectedNodeId);
    if (node) {
      node.title = newTitle;
      setTreeData(updatedTree);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Дерево</h2>

      <div style={{ display: "flex", gap: "10px", marginBottom: "15px" }}>
        <button onClick={handleAddRoot}>Добавить корневой</button>
        <button onClick={handleAddChild}>Добавить дочерний</button>
        <button onClick={handleEdit}>Редактировать</button>
        <button onClick={handleReset}>Сбросить</button>
      </div>

      {treeData.length === 0 ? (
        <p>Дерево пустое</p>
      ) : (
        treeData.map((node) => (
          <TreeNode
            key={node.id}
            node={node}
            selectedId={selectedNodeId}
            setSelected={setSelectedNodeId}
          />
        ))
      )}
    </div>
  );
}

export default Tree;