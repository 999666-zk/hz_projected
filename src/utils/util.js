import { getFileUrl } from '../api/file';
import md5 from 'js-md5';
import axios from 'axios';

const baseTask = `/mgr/task-engine`

export const getQueryStringByName = function (name) {
  var result = location.search.match(new RegExp('[?&]' + name + '=([^&]+)', 'i'))
  if (result == null || result.length < 1) {
    return ''
  }
  return result[1]
}

export const transformData = function (data) {
  const params = new FormData()
  for (const item in data) {
    params.append(item, data[item])
  }
  return params
}

export const DateFormat = function (date, fmt) {
  fmt = fmt || 'yyyy-MM-dd hh:mm:ss'
  if (date === null || typeof date === 'undefined' || date === '') {
    return null
  } else {
    // 时间要转成obj，否则报错
    date = new Date(date)
  }
  var o = {
    'M+': date.getMonth() + 1, // 月
    'd+': date.getDate(), // 日
    'h+': date.getHours(), // 时
    'm+': date.getMinutes(), // 分
    's+': date.getSeconds(), // 秒
    'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
    S: date.getMilliseconds() // 毫秒
  }
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length))
    }
  }
  return fmt
}
export const openLink = (url) => {
  window.open(url, 'blank')
}
// 转换文件地址并在浏览器中打开下载
export const handleTransUrlAndDownLoadFile = (url) => {
  const query = {
    url
  }
  getFileUrl(query).then(res => {
    if (res.data.code === 0) {
      const url = res.data.data.data
      openLink(url)
    }
  })
}
// 转换文件下载地址
export function getFileUrlLarger(bucketName, fileName) {
  return request({
    url: `${base}/base/getFileUrl?url=${bucketName}_${fileName}`,
    method: 'get',
  })
}

/**
 * 分片上传函数 支持多个文件
 * @param options
 * options.file 表示源文件
 * options.pieceSize 表示需要分片的大小 默认是5m
 * options.fileUrl 整个文件的上传地址
 * progress 进度回调
 * success 成功回调
 * error 失败回调
 */
export const uploadByPieces = ({files, pieceSize = 5, progress, success, error}) => {
  if (!files || !files.length) return
  // 上传过程中用到的变量
  let fileList = [] // 总文件列表
  let progressNum = 1 // 进度
  let successAllCount = 0 // 上传成功的片数
  // let currentAllChunk = 0 // 当前上传的片数索引
  let AllChunk = 0 // 所有文件的chunk数之和
  let AllFileSize = 0 // 所有文件size


  // 获取md5
  const readFileMD5 = (files) => {
    // 读取每个文件的md5
    files.map((file, index) => {
      let fileRederInstance = new FileReader()
      fileRederInstance.readAsBinaryString(file)
      fileRederInstance.addEventListener('load', e => {
        let fileBolb = e.target.result
        let fileMD5 = md5(fileBolb)
        if (!fileList.some((arr) => arr.md5 === fileMD5)) {
          fileList.push({md5: fileMD5, name: file.name, file})
          AllFileSize = AllFileSize + file.size
        }
        if (index === files.length - 1) readChunkMD5(fileList)
      }, false)
    })
  }
  const getChunkInfo = (file, currentChunk, chunkSize) => {
    let start = currentChunk * chunkSize
    let end = Math.min(file.size, start + chunkSize)
    let chunk = file.slice(start, end)
    return { start, end, chunk }
  }
  // 针对每个文件进行chunk处理
  const readChunkMD5 = (fileList) => {
    fileList.map((currentFile, fileIndex) => {
      const chunkSize = pieceSize * 1024 * 1024 // 5MB一片
      const chunkCount = Math.ceil(currentFile.file.size / chunkSize) // 总片数

      const certificateData = {
        filename: currentFile.name,
        num: chunkCount,
      }
      console.log("上课雌激素成功就开始从",getCertificate)
      getCertificate(certificateData).then(async res => {
        if(res.data.code === 0) {
          AllChunk = AllChunk + chunkCount // 计算全局chunk数
          // let fileSize = currentFile.file.size // 文件大小
          // 针对单个文件进行chunk上传
          const resData = res.data.data

          for (let i = 0; i < chunkCount; i++) {
            const { chunk } = getChunkInfo(currentFile.file, i, chunkSize)
            // let chunkFR = new FileReader()
            // chunkFR.readAsBinaryString(chunk)
            // chunkFR.addEventListener('load', e => {
            //   let chunkBolb = e.target.result
            //   let chunkMD5 = md5(chunkBolb)
            //   // this.readingFile = false
            //
            //   // bucketName: "manage"
            //   // createTime: 1614309462937
            //   // fileName: "bigfile/2021-02-26/0f948cdcb4f24db5be41d1833aeb8d9a.zip"
            //   // originFileName: "任务管理系统 - 副本.zip"
            //   // partNumber: 0
            //   // totalPartNumber: 12
            //   // uploadId: "345cc3b7-ee67-463b-b641-e5c3ff2f5e05"
            //
            //   uploadChunk(currentFile, {chunkMD5, chunk, currentChunk: i, chunkCount}, fileIndex, resData)
            // }, false)
            await uploadChunk(currentFile, {chunk, currentChunk: i, chunkCount}, fileIndex, resData)
          }
        }
      }).catch(e => {
        error && error(e)
      })
    })
  }
  // 更新进度
  const progressFun = (currentFile) => {
    progressNum = Math.ceil(successAllCount / AllChunk * 100)
    progress(progressNum, currentFile)
  }
  // 对分片已经处理完毕的文件进行上传
  // const uploadFile = (currentFile) => {
  //   let makeFileForm = new FormData()
  //   makeFileForm.append('file', currentFile.file)
  //
  //   fileUpload(makeFileForm).then(res => {
  //     progressFun()
  //     res.file_name = currentFile.name
  //     success && success(res)
  //     successAllCount++
  //   }).catch(e => {
  //     error && error(e)
  //   })
  // }
  const uploadChunk = (currentFile, chunkInfo, fileIndex, { bucketName, uploadId, partNumber, fileName }) => {
    currentFile.fileName = fileName
    return new Promise((resolve, reject) => {
      let fetchForm = new FormData()
      fetchForm.append('file', chunkInfo.chunk)
      // const chunkUrl = `/uploadPart/{bucketName}/{uploadId}/{partNumber}`
      const chunkUrl = `${config.uploadFileServer}/uploadPart/${bucketName}/${uploadId}/${chunkInfo.currentChunk + 1}`

      axios({
        url:chunkUrl,
        method: 'post',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: fetchForm,
      })
        .then(res => {
          resolve(res)
          progressFun(currentFile)
          if (chunkInfo.currentChunk <= chunkInfo.chunkCount - 1) {
            successAllCount++
            if(chunkInfo.currentChunk + 1 === chunkInfo.chunkCount) {
              const successData = {
                bucketName,
                fileName,
                name: currentFile.name,
                size: AllFileSize,
              }
              success && success(successData)
            }
          }
        }).catch((e) => {
        error && error(e)
        reject(e)
      })
    })

  }
  readFileMD5(files) // 开始执行代码
}

/**
 * 文件大小转换
 * @param   fileByte    {Number} 文件byte
 * @return  {String}
 * */
export function getFileSize(fileByte) {
  var fileSizeByte = fileByte;
  var fileSizeMsg = "";
  if (fileSizeByte < 1048576) fileSizeMsg = (fileSizeByte / 1024).toFixed(2) + "KB";
  else if (fileSizeByte == 1048576) fileSizeMsg = "1MB";
  else if (fileSizeByte > 1048576 && fileSizeByte < 1073741824) fileSizeMsg = (fileSizeByte / (1024 * 1024)).toFixed(2) + "MB";
  else if (fileSizeByte > 1048576 && fileSizeByte == 1073741824) fileSizeMsg = "1GB";
  else if (fileSizeByte > 1073741824 && fileSizeByte < 1099511627776) fileSizeMsg = (fileSizeByte / (1024 * 1024 * 1024)).toFixed(2) + "GB";
  else fileSizeMsg = "文件超过1TB";
  return fileSizeMsg;
}

// 获取文件后缀名 "xxx.png"  => ".png"
export const getFileSuffix = (filename) => {
  return filename.substring(filename.lastIndexOf("."), filename.length)
}


// 邮箱截取 前缀 xxx@qq.com> => xxx
export function getMailPrefix(str) {
  if (!str) return ''
  const reg = /^(\w)+(\.\w+)*/g
  if (!reg.test(str)) return ''
  return str.match(reg)[0]
}
// 邮箱截取 aaa<bbb@qq.com> => bbb@qq.com
export function getMailStr(str) {
  const reg = /([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})/g
  return str.match(reg) ? (str.match(reg)[0]) : ''
}

// 换行 '↵' => '\n'
export const transEnterTextBr = (str) => {
  return str.replace(/(\r\n|\n|\r)/gm, "<br />")
}

/**
 * xss 过滤
 * */
export const xssFilter = (htmlStr) => {
  const whiteList = xss.getDefaultWhiteList()
  const myWhiteList = JSON.parse(JSON.stringify(whiteList))
  const keys = Object.keys(myWhiteList)
  keys.forEach(key => {
    myWhiteList[key].push('style')
  })
  const myxss = new xss.FilterXSS({
    whiteList: myWhiteList,
    css: true
  })
  return myxss.process(htmlStr)
}

const CNDateDay2 = [
  { week: '星期日', num: 0 },
  { week: '星期一', num: 1 },
  { week: '星期二', num: 2 },
  { week: '星期三', num: 3 },
  { week: '星期四', num: 4 },
  { week: '星期五', num: 5 },
  { week: '星期六', num: 6 }
]


export const formatToCNDateDay2 = (dateDay) => {
  let str = ''
  CNDateDay2.forEach(item => {
    if (item.num === dateDay) {
      str = item.week
    }
  })
  return str
}

