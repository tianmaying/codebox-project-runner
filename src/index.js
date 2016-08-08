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
    }
}

if(!codebox.services) {
    codebox.services = {};
}
codebox.services['projecRunnerService'] = projecRunnerService;

commands.register({
    id: "run.project",
    title: "PROJECT: RUN",
    icon: "playback-play",
    shortcuts: [
        "alt+r"
    ],
    run: function(args, context) {
        return projecRunnerService.run().then(function(data){
            window.open(data);
        });
    }
});

