module.exports = {
    default: " --require-module ts-node/register" +
        " --require src/commons/hooks.ts" +
        " --require src/step-definitions/*.steps.ts" +
        " --format-options '{\"snippetInterface\": \"synchronous\"}'" +
        " default: '--publish-quiet'"
}
