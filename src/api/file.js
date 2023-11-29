import request from '../utils/request';

// task 转换文件下载地址
export function getFileUrl(query) {
  return request({
    url: `/base/getFileUrl`,
    method: 'get',
    params: query
  })
}

// 邮件上传图片
export function uploadFile(data) {
  return request({
    url: `/base/imgUpload`,
    method: 'post',
    data,
    headers: { 'Content-Type': 'multipart/form-data' }
  })
}

// 查询邮箱
export function queryEmail(query) {
  return request({
    url: `/system/queryEmail`,
    method: 'get',
    params: query
  })
}
