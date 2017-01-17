function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function convertHTTPToHTTPS(url) {  
  if (url.match("https://") == "https://") {
    return url
  }

  if (url.match("http://") == "http://") {
    return url.replace(/http:\/\//, "https://")
  }

  return null
}

module.exports = {
  formatTime: formatTime,
  convertHTTP: convertHTTPToHTTPS
}

