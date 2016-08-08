/**
 * Created by xr on 16/8/8.
 */

var Q = require("q");
var Docker = require('dockerode');
var dockerClient = new Docker({host: 'http://162.105.30.224', port: 32375});

var ideApi = require('./ide-api');

module.exports = function(codebox) {

    var options = {
        AttachStdout: true,
        AttachStderr: true,
        Tty: false,
        Cmd: ['env']
    };

    codebox.rpc.service("project-runner", {
        run : function(args, meta) {
            return ideApi.get(meta.workspace.identity()).then(function(data, err) {
                var workspace = data.entity;
                var container =  workspace.container;
                var directory = '/home/tmy/workspace' || args.directory;
                var deferred = Q.defer();
                dockerClient.getContainer(container).exec({
                    Cmd: ['env', 'APP_DIR=' + directory, 'deploy'],
                    AttachStdin: true,
                    AttachStdout: true
                }, function(err, exec) {
                    if (err) return deferred.reject(400);
                    exec.start(function(err, stream) {
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
