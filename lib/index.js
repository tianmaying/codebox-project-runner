/**
 * Created by xr on 16/8/8.
 */

var Q = require("q");
var Docker = require('dockerode');

var host = process.env.DOCKER_HOST || 'http://162.105.30.224',
    port = process.env.DOCKER_PORT || 32375,
    dockerClient = new Docker({host: host, port: port});

module.exports = function(codebox) {

    var options = {
        AttachStdout: true,
        AttachStderr: true,
        Tty: false,
        Cmd: ['env']
    };

    codebox.rpc.service("project-runner", {
        run : function(args, meta) {
            return codebox.api.get(meta.workspace.identity()).then(function(data, err) {
                var workspace = data.entity;
                var container =  workspace.container;
                var directory = '/home/tmy/workspace';
                if(args.directory) {
                    directory += '/' + args.directory;
                }
                var deferred = Q.defer();
                dockerClient.getContainer(container).exec({
                    Cmd: ['env', 'APP_DIR=' + directory, 'deploy'],
                    AttachStdin: false,
                    AttachStdout: false,
                    AttachStderr: false,
                    Tty: false
                }, function(err, exec) {
                    if (err) return deferred.reject(400);
                    exec.start({
                        "Detach": false,
                        "Tty": false
                    }, function(err, stream) {
                        if (err) return deferred.reject(400);
                        deferred.resolve(workspace.appUrl);
                    });
                });
                return deferred.promise;
            }).catch(function(err) {
                return err;
            });
        }
    });

};
