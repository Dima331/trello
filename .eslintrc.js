module.exports = {
  extends: ['airbnb-typescript'],
  parserOptions: {
     project: './tsconfig.json',
  },
  rules: {
    ['no-console']: "off",
    ['import/no-cycle']: "off",
    ['consistent-return']: "off",
    ["import/extensions"]: "off",
    ["import/no-unresolved"]: "off",
    ["react/jsx-filename-extension"]: "off",
    ["arrow-body-style"]: "off",
    ["import/named"]: 2,
    ['import/namespace']: 2,
    ['import/default']: 2,
    ['import/export']: 2,
    ['jsx-a11y/no-static-element-interactions']: "off",
    ['jsx-a11y/no-noninteractive-tabindex']: "off",
    ['no-shadow']: "off",
    ['prefer-destructuring']: "off",
    ['no-param-reassign']: "off",
    ['import/prefer-default-export']: "off",
  }
};