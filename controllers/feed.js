var cheerio = require('cheerio');
var iconv = require('iconv-lite');
const https = require('https');
const User = require('../models/user');


exports.getUser = (req, res, next) => {
    const userId = req.params.id;
    console.log(userId);
    const options = {
        hostname: 'vk.com',
        port: 443,
        path: '/' + userId,
        method: 'GET',
        headers: {
            'Content-Type': 'text/html; charset=UTF-8',
            'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/40.0.2214.94 Safari/537.36'
        }
    };
    User.find({
            where: {
                _id: userId
            }
        })
        .then(user => {
            if (!user) {
                let fio = '';
                https.get(options, (res) => {
                    var res_data = "";
                    res.charset = 'utf-8';
                    res.on('data', function (chunk) {
                        var data = iconv.encode(iconv.decode(new Buffer(chunk, 'binary'), 'win1251'), 'utf8');
                        res_data += data;
                    });
                    res.on('end', function (chunk) {
                        //username
                        var $ = cheerio.load(res_data);
                        var user_name = $('.page_name').text();
                        let userIPages = '';
                        fio += user_name;
                        let user_infos = [];
                        let base_info = '';
                        //группы
                        $('.line_cell a div').each((i, el) => {
                            userIPages = $(el).attr('alt');
                            user_infos.push(userIPages);
                        });
                        //основная
                        $('.clear_fix').each((i, el) => {
                            let user_age = $(el).find('.labeled').text().replace(/\s\s+/g, '');
                            let user_age_info = $(el).find('.label').text().replace(/\s\s+/g, '');
                            if (user_age_info && user_age) {

                                let data = (user_age_info + user_age + '\n');
                                base_info += (data);
                            }
                        });
                        User.create({
                                _id: userId,
                                fio: fio,
                                basicData: base_info,
                                interestingPages: user_infos.toString()
                            })
                            .then(result => {
                                // console.log(result);
                                console.log('Created Product');

                            })
                            .catch(err => {
                                console.log(err);
                            });
                    });
                }).on('error', function (e) {
                    console.log("Got error:" + e.message);
                });
                res.status(200).json({
                    post: [{
                        message: "Created Product"
                    }]
                });

            } else {

                res.status(200).json({
                    posts: [{
                        idUser: user._id,
                        FIOUser: user.fio,
                        basicData: user.basicData,
                        interestingPages: user.interestingPages,
                        audio: user.audioRecordings,
                        friends: user.friendsList,
                        recordHeaders: user.recordHeaders
                    }]
                });
            }
        })
        .catch(err => console.log(err));
};