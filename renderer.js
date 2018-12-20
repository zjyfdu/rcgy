// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

var request = require('request');
var cheerio = require('cheerio'); 

function login() {
    var headers = {
        'Connection': 'keep-alive',
        'Upgrade-Insecure-Requests': '1',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.110 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
        'Referer': 'https://rcgy.zjhui.net/',
        'Accept-Encoding': 'gzip, deflate, br',
        'Accept-Language': 'zh',
        'Cookie': 'ASP.NET_SessionId=wswwmebxaqeua055vo1jgj55; safedog-flow-item='
    };
    
    var options = {
        url: 'https://rcgy.zjhui.net/Login.aspx?flag=0&userName=13122358292&passWord=MzAyMDI4MnpqeWQ=&md5=08dcb32a31936c855b5f8f5c21f5b957',
        headers: headers
    };

    console.log("try login");
    request(options, function (error, response) {
        if (!error && response.statusCode == 200) {
            console.log("log in success");
            query_rank();
        }
    });
}


function query_rank() {
    var headers = {
        'Connection': 'keep-alive',
        'Cache-Control': 'max-age=0',
        'Upgrade-Insecure-Requests': '1',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.110 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
        'Referer': 'https://rcgy.zjhui.net/System/ApplyRecord.aspx',
        'Accept-Encoding': 'gzip, deflate, br',
        'Accept-Language': 'zh',
        'Cookie': 'ASP.NET_SessionId=wswwmebxaqeua055vo1jgj55; safedog-flow-item='
    };
    
    var options = {
        url: 'https://rcgy.zjhui.net/System/WaitingRecord.aspx',
        gzip: true,
        headers: headers
    };
    
    console.log("try to query rank");
    request(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log("rank request success");
            var $ = cheerio.load(response.body.toString());
            var rank = $("#ctl00_ctl00_ctl00_main_main_main_rptPtApplyRecord_ctl00_labPageRank");
            console.log(rank.text());
            document.getElementById("rank").textContent = "排名：" + rank.text();
        }
    });
}

login();
setInterval(login, 5*60*1000);


