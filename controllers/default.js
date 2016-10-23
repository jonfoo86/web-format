exports.install = function () {
    framework.route('/vidadateJson/*', validata_json, ['post']);
    framework.route('/*', view_app);
};

function view_app() {
    var self = this;
    self.view('app');
};

function validata_json() {
    var jsonlint = require("./assets/jsonlint/jsonlint");
    try {
        jsonlint.parse(this.body.date);
    }
    catch (error) {
        console.log(error);
        this.plain( error.message );
        return;
    }

    this.json({'data': '格式正常'});
}