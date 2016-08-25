/**
 * Created by xr on 16/8/8.
 */

var rpc = codebox.require("core/rpc");
var commands = codebox.require("core/commands");

var projecRunnerService = {
    run: function(directory) {
        return rpc.execute("project-runner/run", {
            directory: directory
        });
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
codebox.services['projecRunnerService'] = projecRunnerService;

commands.register({
    id: "project.run",
    title: "PROJECT: RUN",
    icon: "playback-play",
    run: function(args, context) {
        return projecRunnerService.run().then(function(data){
            window.open(data);
        });
    }
});

commands.register({
    id: "project.view",
    title: "PROJECT: RUN",
    icon: "device-desktop",
    run: function(args, context) {
        return projecRunnerService.toApp();
    }
});

codebox.menubar.createMenu({
    id: "project-runner",
    caption: "访问应用",
    command: "project.view"
});

