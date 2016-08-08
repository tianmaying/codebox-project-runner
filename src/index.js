/**
 * Created by xr on 16/8/8.
 */

var rpc = codebox.require("core/rpc");
var commands = codebox.require("core/commands");

commands.register({
    id: "run.project",
    title: "PROJECT: RUN",
    icon: "playback-play",
    shortcuts: [
        "alt+r"
    ],
    run: function(args, context) {
        return rpc.execute("project-runner/run", {
            directory: "test directory"
        }).then(function(data){
            console.log(data);
            window.open(data);
        });
    }
});

