module.exports = {
  plugins: {
    "postcss-pxtorem": {
      rootValue() {
        return 192 / 2;
      },
      propList: ["*"],
    },
  },
};
