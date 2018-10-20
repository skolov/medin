module.exports = api => {
  const isProd = api.cache(() => process.env.NODE_ENV === 'production')

  return {
    plugins: [
      '@babel/plugin-syntax-dynamic-import'
    ],
    presets: [
      [
        '@babel/preset-env',
        {
          modules: false,
          useBuiltIns: "usage",
          targets: {
            browsers: ["last 20 versions", "ie >= 10"]
          }
        }
      ]
    ]
  }
}
