module.exports = {
  plugins: ["react"],
  extends: ["eslint:recommended", "plugin:react/recommended"],
  parser: "babel-eslint",
  parserOptions: {
    ecmaVersion: 6,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true
    }
  },
  env: {
    node: true
  },
  settings: {
    react: {
      version: "16.4.2"
    }
  }
};
