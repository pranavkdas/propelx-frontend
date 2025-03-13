// Function to recursively find all children
export function getAllChildren(currentNodeId, tree) {
    let children = [];
    tree[currentNodeId].forEach(childId => {
        children.push(childId);
        children = children.concat(getAllChildren(childId, tree));
    });
    return children;
}