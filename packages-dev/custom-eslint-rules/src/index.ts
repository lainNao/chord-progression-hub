import { Rule } from "eslint";

const rule: Rule.RuleModule = {
  meta: {
    type: "problem",
    docs: {
      description: "asdf",
    },
    fixable: "code",
    schema: [],
  },
  create(context) {
    return {
      VariableDeclarator(node) {
        // context.report({
        //   node,
        //   message:
        //     'Value other than "bar" assigned to `const foo`. Unexpected value: {{ notBar }}.',
        //   data: {
        //     notBar: node.init.value,
        //   },
        //   fix(fixer) {
        //     return fixer.replaceText(node.init, '"bar"');
        //   },
        // });
      },
    };
  },
};

export default rule;
