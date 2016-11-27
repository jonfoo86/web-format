exports.install = function () {
    framework.route('/vidadateJson/*', validata_json, ['post']);
    framework.route('/{format}', view_format);
    framework.route('/', view_format);
};

function view_format() {
    var self = this;
    self.title('title controller');
    self.description('description controller');
    self.keywords('keywords controller');
    self.view('app');
    console.log("view");
};

function validata_json() {

    var jsonlint = require("./assets/jsonlint/jsonlint");
    try {
        jsonlint.parse(this.body.date);
    }
    catch (error) {
        console.log(error);
        this.plain(error.message);
        return;
    }

    this.json({'data': '格式正常'});
}

