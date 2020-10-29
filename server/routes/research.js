const express = require('express')
const router = express.Router()
const cheerio = require("cheerio")
const axios = require('axios')

//=================================
//             Research
//=================================

const getHtml = async () => {
  try {
    return await axios.get("https://www.pinterest.co.kr/");
    // 해당 사이트 html 태그 가져오기
  } catch (error) {
    console.error(error);
  }
};

router.get('/crawling', (req, res) => {
    getHtml()
      .then((html) => {
        const $ = cheerio.load(html.data);
        let parentTag = $(".gridCentered");
        // 크롤링할 태그 찾기

        let resultArr = [];
        parentTag.each(function (i, elem) {
          let itemObj = {
            image: $(this).find(".hCL").attr('src'),
            title: $(this).find(".pBj").text(),
          };
          resultArr.push(itemObj);
          console.log($(this))
        });

        resultArr.forEach((elem) => {
          console.log(`이미지 : ${elem._image} \n 타이틀 : ${elem._title}`);
        });
        return resultArr;
      })
      .then((data) => res.send(data));
})

module.exports = router;
