const requireAll = r => r.keys().forEach(r);
// include svg-sprite
requireAll(require.context('../svg-sprite/', true, /\.svg$/));
// include blocks
requireAll(require.context('../blocks/', true, /\.js$/));
