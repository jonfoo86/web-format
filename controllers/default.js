var log = require('fancy-log');
exports.install = function () {
    framework.middleware("seo", require('prerender-node'));
    framework.route('/vidadateJson/*', validata_json, ['post']);
    framework.route('/{format}', view_format);
    framework.route('/', view_format);
};

function view_format(format) {
    var des = {
        json_format: {des: "智能格式化json (Intelligent  formatting json)", keywords: "format json 智能 格式化"},
        js_format: {
            des: "智能格式化javascript (Intelligent  formatting javascript) ",
            keywords: "format javascript js 智能 格式化 "
        },
        xml_format: {des: "智能格式化 xml(Intelligent  formatting xml)", keywords: "xml html format 智能 格式化"},
        html_format: {des: "智能格式化html(Intelligent  formatting html)", keywords: " html xml format 智能 格式化"},
        'c++_format': {des: "智能格式化c++ (Intelligent  formatting c++) ", keywords: "c++  format 智能 格式化 "},
        auto_format: {des: "智能格式化代码(Intelligent  formatting code)", keywords: " code format 智能 格式化 "}
    };
    var self = this;

    if (format == null) format = "auto_format";
    if (des[format] == null) {
        self.plain('错误的格式, 请检查输入的url是否正确');
        log.error("visib: " + format + " " + self.req.host + "(" + self.req.ip + ")" + " robot:" +self.req.robot + "错误的访问");
        return;
    }

    self.title(format);
    self.description(des[format].des);
    self.keywords(des[format].keywords);
    self.view('app');
    log("visib: " + format + " " + self.req.host + "(" + self.req.ip + ")" + " robot:" +self.req.robot);
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

