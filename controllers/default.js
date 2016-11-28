var log = require('fancy-log');
exports.install = function () {
    framework.route('/vidadateJson/*', validata_json, ['post']);
    framework.route('/{format}', view_format);
    framework.route('/', view_format);
};

function view_format(format) {
    var des = {
        format_json: {des: "智能格式化json (Intelligent  formatting json)", keywords: "format json 智能 格式化"},
        format_js: {
            des: "智能格式化javascript (Intelligent  formatting javascript) ",
            keywords: "format javascript js 智能 格式化 "
        },
        format_xml: {des: "智能格式化 xml(Intelligent  formatting xml)", keywords: " format  xml html  智能 格式化"},
        format_html: {des: "智能格式化html(Intelligent  formatting html)", keywords: "format  html xml   智能 格式化"},
        'format_c++': {des: "智能格式化c++ (Intelligent  formatting c++) ", keywords: "format  c++   智能 格式化 "},
        format_auto: {des: "智能格式化代码(Intelligent  formatting code)", keywords: "format  code   智能 格式化 "}
    };
    var self = this;

    if (format == null) format = "format_auto";
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

