var log = require('fancy-log');
exports.install = function () {
    //framework.middleware("seo", require('prerender-node'));
    framework.route('/vidadateJson/*', validata_json, ['post']);
    framework.route('/{format}', view_format);
    framework.route('/', view_format);
};

function view_format(format) {
    var des = {
        json_format: {des: "json在线解析 格式化", keywords: "json 在线解析 格式化", title: "json在线解析 格式化"},
        js_format: {
            des: " javascript 在线 格式化",
            keywords: "javascript js 在线 格式化",
            title: "javascript 在线解析 格式化"
        },
        xml_format: {des: "xml格式化", keywords: "xml 在线格式化", title: "xml  在线解析 格式化"},
        html_format: {des: "html格式化", keywords: " html 在线格式化", title: "html  在线解析 格式化"},
        auto_format: {des: "万能代码在线格式化", keywords: "code  在线格式化 ", title: "万能代码 在线格式化"}
    };
    var self = this;

    if (format == null) format = "json_format";
    if (des[format] == null) {
        self.plain('错误的格式, 请检查输入的url是否正确');
        log.error("visib: " + format + " " + self.req.host + "(" + self.req.ip + ")" + " robot:" + self.req.robot + "错误的访问");
        return;
    }

    self.title(des[format].title);
    self.description(des[format].des);
    self.keywords(des[format].keywords);
    self.view('app');
    log("visib: " + format + " " + self.req.host + "(" + self.req.ip + ")" + " robot:" + self.req.robot);
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

