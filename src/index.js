/**
 * Created by xr on 16/8/8.
 */

var rpc = codebox.require("core/rpc");
var commands = codebox.require("core/commands");

var projectRunnerService = {
    run: function(directory) {
        var base = '/home/tmy/workspace';
        if(directory) {
            base += '/' + args.directory;
        }
        return codebox.services['terminalService'].open("cd " + base + " && deploy");
    },
    toApp: function() {
        return rpc.execute("api/workspace").then(function(data) {
            window.open(data.appUrl);
        });
    }
};

if(!codebox.services) {
    codebox.services = {};
}
codebox.services['projectRunnerService'] = projectRunnerService;

commands.register({
    id: "project.run",
    title: "PROJECT: RUN",
    icon: "playback-play",
    run: function(args, context) {
        return projectRunnerService.run();
    }
});

commands.register({
    id: "project.view",
    title: "PROJECT: RUN",
    icon: "device-desktop",
    run: function(args, context) {
        return projectRunnerService.toApp();
    }
});


