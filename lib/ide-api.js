/**
 * Created by xr on 16/8/8.
 */

var url = require('url'),
    rest = require('rest'),
    mime = require('rest/interceptor/mime');

var client = rest.wrap(mime),
    host = process.env.IDE_HOST || '127.0.0.1',
    port = process.env.IDE_PORT || 8084;

var apiUrl = (path) => {
    return url.format({
        protocol: 'http',
        host: `${host}:${port}`,
    pathname: path
});
};

exports.get = id => {
    return client({
        path: apiUrl(`workspaces/${id}`),
    method: 'GET'
});
};
