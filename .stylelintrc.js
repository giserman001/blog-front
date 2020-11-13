// StyleLint 配置文档: https://stylelint.docschina.org/user-guide/configuration/#extends
// StyleLint 规则列表: https://stylelint.docschina.org/user-guide/rules/
module.exports = {
  extends: ["stylelint-config-standard", "stylelint-config-recess-order", "stylelint-config-prettier"],
  plugins: ["stylelint-scss"],
  defaultSeverity: "warning",
  rules: {}
};
