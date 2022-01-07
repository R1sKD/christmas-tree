export function getToysOnTree(): null | string[] {
  const savedToysOnTree = localStorage.getItem('toysOnTree');
  if (savedToysOnTree) {
    const actualToysOnTree = JSON.parse(savedToysOnTree);
    return actualToysOnTree;
  }
  return null;
}