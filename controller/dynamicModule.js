/*
 * @Description: 动态模块控制器层
 * @Author: silin7
 * @Date: 2021-08-26
 */

const formidable = require('formidable');
const path = require('path')
const fs = require('fs')

const dynamicDao = require('../model/dao/dynamicDao');

// 发动态（图片）   这个不管用  唉   要重写
const dynamic_release_img = (req, res, next) => {
  let author_id = req.headers.author_id
  let form = new formidable.IncomingForm();
  let uploadDir = path.join(__dirname, '../../../birch-forest-media/dynamicModules', author_id);
  if (!fs.existsSync(uploadDir)) {
    fs.mkdir(uploadDir, (error) => {
      if (error) {
        res.json({
          code: 500,
          data: error
        })
      }
    })
  }
  form.uploadDir = uploadDir;
  form.parse(req, (err, fields, files) => {
    if (err) {
      res.json({
        code: 500,
        msg: err
      })
    } else {
      let oldPath = files.file.path;
      let newPath = path.join(path.dirname(oldPath), files.file.name);
      let backPath = path.join('https://www.silin7.cn/birch-forest-media/dynamicModules', files.file.name)
      //fs.rename重命名图片名称
      fs.rename(oldPath, newPath, () => {
        let parameter = fields
        dynamicDao.dynamic_release_img(parameter).then(result => {
          res.json({
            code: 0,
            msg: 'success'
          })
        }).catch(error => {
          res.json({
            code: 500,
            msg: JSON.stringify(error)
          })
        })
      })
    }
  })
}

// 发动态（文字）
const dynamic_release_txt = async (req, res, next) => {
  let parameter = req.body
  await dynamicDao.dynamic_release_txt(parameter).then(result => {
    res.json({
      code: 0,
      msg: 'success'
    })
  }).catch(error => {
    res.json({
      code: 500,
      msg: JSON.stringify(error)
    })
  })
}

// 动态列表
const dynamic_list = async (req, res, next) => {
  let parameter = req.query
  let page = parameter.page ? parameter.page : 1
  let limit = parameter.limit ? parameter.limit : 10
  let is_pass = parameter.is_pass ? parameter.is_pass : '02'
  let isNext = true
  let totalCount = 0
  let data = []
  await dynamicDao.dynamic_total(is_pass).then(result => {
    totalCount = result[0]["COUNT(*)"]
  }).catch(error => {
    res.json({
      code: 500,
      msg: JSON.stringify(error)
    })
    isNext = false
  })
  await dynamicDao.dynamic_list(page, limit, is_pass).then(result => {
    data = result
  }).catch(error => {
    res.json({
      code: 500,
      msg: JSON.stringify(error)
    })
    isNext = false
  })
  if (isNext) {
    res.json({
      code: 0,
      msg: 'success',
      page: page,
      limit: limit,
      totalCount: totalCount,
      data: data
    })
  }
}

// 动态详情
const dynamic_details = async (req, res, next) => {
  let parameter = req.query
  await dynamicDao.dynamic_details(parameter.id).then(result => {
    res.json({
      code: 0,
      msg: 'success',
      data: result[0]
    })
  }).catch(error => {
    res.json({
      code: 500,
      msg: JSON.stringify(error)
    })
  })
}

// 删除动态
const cancel_dynamic = async (req, res, next) => {
  let parameter = req.query
  await dynamicDao.cancel_dynamic(parameter.id, parameter.author_id).then(result => {
    res.json({
      code: 0,
      msg: 'success'
    })
  }).catch(error => {
    res.json({
      code: 500,
      msg: JSON.stringify(error)
    })
  })
}

// 写评论
const write_comment = async (req, res, next) => {
  let parameter = req.body
  await dynamicDao.write_comment(parameter).then(result => {
    res.json({
      code: 0,
      msg: 'success'
    })
  }).catch(error => {
    res.json({
      code: 500,
      msg: JSON.stringify(error)
    })
  })
}

// 动态评论的列表
const comment_list = async (req, res, next) => {
  let parameter = req.query
  let page = parameter.page ? parameter.page : 1
  let limit = parameter.limit ? parameter.limit : 10
  let is_pass = parameter.is_pass ? parameter.is_pass : '02'
  let isNext = true
  let totalCount = 0
  let data = []
  await dynamicDao.comment_total(parameter.dynamic_id, is_pass).then(result => {
    totalCount = result[0]["COUNT(*)"]
  }).catch(error => {
    res.json({
      code: 500,
      msg: JSON.stringify(error)
    })
    isNext = false
  })
  await dynamicDao.comment_list(page, limit, parameter.dynamic_id, is_pass).then(result => {
    data = result
  }).catch(error => {
    res.json({
      code: 500,
      msg: JSON.stringify(error)
    })
    isNext = false
  })
  if (isNext) {
    res.json({
      code: 0,
      msg: 'success',
      page: page,
      limit: limit,
      totalCount: totalCount,
      data: data
    })
  }
}

module.exports = {
  dynamic_release_img,
  dynamic_release_txt,
  dynamic_list,
  dynamic_details,
  cancel_dynamic,
  write_comment,
  comment_list
}