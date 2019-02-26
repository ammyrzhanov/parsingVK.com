const cheerio = require('cheerio');
const iconv = require('iconv-lite');
const https = require('https');
const User = require('../models/user');


exports.user = (req, res) => {
  const userId = req.params.id;
  const options = {
    hostname: 'vk.com',
    port: 443,
    path: `/ + ${userId}`,
    method: 'GET',
    headers: {
      'Content-Type': 'text/html; charset=UTF-8',
      'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/40.0.2214.94 Safari/537.36',
    },
  };
  User.find({
    where: {
      idUser: userId,
    },
  })
    .then((user) => {
      if (!user) {
        let name = '';
        https.get(options, (response) => {
          let resData = '';
          response.charset = 'utf-8';
          response.on('data', (chunk) => {
            const data = iconv.encode(iconv.decode(Buffer.from(chunk, 'binary'), 'win1251'), 'utf8');
            resData += data;
          });
          response.on('end', () => {
            // username
            const $ = cheerio.load(resData);
            const userName = $('.page_name').text();
            let userIPages = '';
            name += userName;
            const userInfos = [];
            let baseInfo = '';
            // группы
            $('.line_cell a div').each((i, el) => {
              userIPages = $(el).attr('alt');
              userInfos.push(userIPages);
            });
            // основная
            $('.clear_fix').each((i, el) => {
              const userBase1 = $(el).find('.labeled').text().replace(/\s\s+/g, '');
              const userBase2 = $(el).find('.label').text().replace(/\s\s+/g, '');
              if (userBase1 && userBase2) {
                const data = `${userBase2} + ${userBase1} + \n`;
                baseInfo += (data);
              }
            });
            User.create({
              _id: userId,
              fio: name,
              basicData: baseInfo,
              nterestingPages: userInfos.toString(),
            })
              .then(() => {
                // console.log(result);
                console.log('Created Product');
              })
              .catch((err) => {
                console.log(err);
              });
          });
        }).on('error', (e) => {
          console.log(e.message);
        });
        res.status(200).json({
          post: [{
            message: 'Created Product',
          }],
        });
      } else {
        res.status(200).json({
          posts: [{
            idUser: user.idUser,
            FIOUser: user.fio,
            basicData: user.basicData,
            interestingPages: user.interestingPages,
            audio: user.audioRecordings,
            friends: user.friendsList,
            recordHeaders: user.recordHeaders,
          }],
        });
      }
    })
    .catch(err => console.log(err));
};
