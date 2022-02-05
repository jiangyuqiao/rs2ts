import { register } from './registry';

register('PatIdent', function (node, c) {
  return c.t(node.ident);
});
