module.exports = {
  plugins: {
    "postcss-pxtorem": {
      rootValue() {
        return 108;
      },
      propList: ["*"],
    },
  },
};
