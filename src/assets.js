const requireAll = r => r.keys().forEach(r);

// include pug-templates
requireAll(require.context('./pug/', false, /\.pug$/));
