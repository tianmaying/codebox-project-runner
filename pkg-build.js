(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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


},{}]},{},[1]);
