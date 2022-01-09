import { BaseNode, NodeType, Span } from '../node-types';

interface AbstractType {
  name: string;
  type?: AbstractType;
}

export function addAbsType(node: BaseNode, typeName: string) {
  const absType = { name: typeName };

  if (!(node as Node)._absType) {
    (node as Node)._absType = absType;
    return;
  }

  let type = (node as Node)._absType;
  while (type.type) {
    type = type.type;
  }
  type.type = absType;
}

export class Node implements BaseNode {
  _type: NodeType;
  attrs: any[];
  span: Span;

  _absType?: AbstractType;
  _parent?: BaseNode;

  isTypeOf(typeName: string) {
    return this._type === typeName || this.hasAbsType(typeName);
  }

  hasAbsType(typeName: string): boolean {
    if (!this._absType) {
      return false;
    }
    let type = this._absType;
    while (type) {
      if (type.name === typeName) {
        return true;
      }
      type = type.type;
    }
    return false;
  }

  addAbsType(typeName: string) {
    addAbsType(this, typeName);
  }

  getAbsType(): AbstractType | undefined {
    return this._absType;
  }

  getParent(): void | BaseNode {
    return this._parent;
  }
}