import type { AstNode, TreeNode } from "@/features/compiler/types";

export function toTreeNode(node: AstNode): TreeNode {
  switch (node.type) {
    case "Assignment":
      return {
        name: "=",
        children: [
          { name: `${node.name} (${node.id})` },
          toTreeNode(node.value),
        ],
      };

    case "BinaryOperation":
      return {
        name: node.operator,
        children: [toTreeNode(node.left), toTreeNode(node.right)],
      };

    case "UnaryOperation":
      return {
        name: node.operator,
        children: [toTreeNode(node.expression)],
      };

    case "NumberLiteral":
      return {
        name: "Real",
        children: [{ name: node.value }],
      };

    case "Identifier":
      return { name: `${node.name} (${node.id})` };
  }
}
