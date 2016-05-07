Package.describe({
    name: 'bitly',
    summary: "Bitly package",
    version: '0.0.2'
});

Package.onUse(function(api) {
    api.versionsFrom('0.9.4');
    api.addFiles('bitly.js', 'server');
    api.export('Bitly');
});
