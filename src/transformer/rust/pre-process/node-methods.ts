import { BaseNode, NodeType, Span, AbstractType } from '../node-types';

interface AbstractTypeProperty {
  name: AbstractType;
  type?: AbstractTypeProperty;
}

export function addAbsType(node: BaseNode, typeName: AbstractType) {
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

  _absType?: AbstractTypeProperty;
  _parent?: BaseNode;

  isTypeOf(typeName: NodeType | AbstractType) {
    return this._type === typeName || this.hasAbsType(typeName as AbstractType);
  }

  isTypeAmong(typeNames: string[]): boolean {
    return typeNames.includes(this._type);
  }

  getType(): string {
    return this._type;
  }

  hasAbsType(typeName: AbstractType): boolean {
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

  addAbsType(typeName: AbstractType) {
    addAbsType(this, typeName);
  }

  getAbsType(): AbstractTypeProperty | undefined {
    return this._absType;
  }

  getParent(): void | BaseNode {
    return this._parent;
  }
}