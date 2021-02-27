# serve-utils

## 1. 上传图片

上传图片到七牛，返回七牛链接

### 1.1 请求说明

> 请求方式： POST  
> 请求 URL： image/upload

<br/>

### 1.2 请求参数

|   字段    |  字段类型   | 是否必填 |                                       字段说明                                       |
| :-------: | :---------: | :------: | :----------------------------------------------------------------------------------: |
|   file    |    File     |    是    |                                     表单上传图片                                     |
| qiniuConf | JSON String |    否    | 传入七牛参数 (accessKey, secretKey, scope, domain)，默认为个人七牛账号用于 demo 测试 |

<br/>

### 1.3 返回结果

```json
{
  "data": {
    "url": "xxxx"
  },
  "status": {
    "code": 0,
    "msg": "成功"
  }
}
```

<br/>
<br/>

## 2. 压缩图片并到七牛

### 1.1 请求说明

> 请求方式： POST  
> 请求 URL： image/compress

<br/>

### 1.2 请求参数

|   字段    |         字段类型          | 是否必填 |                                       字段说明                                       |
| :-------: | :-----------------------: | :------: | :----------------------------------------------------------------------------------: |
|   file    |           File            |    是    |                                     表单上传图片                                     |
|   type    | String: imagemin, squoosh |    否    |                               压缩方式,默认为 imagemin                               |
| qiniuConf |        JSON String        |    否    | 传入七牛参数 (accessKey, secretKey, scope, domain)，默认为个人七牛账号用于 demo 测试 |

<br/>

### 1.3 返回结果

```json
{
  "data": {
    "type": "success",
    "originalSize": "10kb",
    "compressSize": "1kb",
    "url": "xxx"
  },
  "status": {
    "code": 0,
    "msg": "成功"
  }
}
```

<br/>
<br/>
