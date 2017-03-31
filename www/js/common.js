Date.prototype.Format = function(formatStr)
{
  var str = formatStr;
  var Week = ['日','一','二','三','四','五','六'];

  str=str.replace(/yyyy|YYYY/,this.getFullYear());
  str=str.replace(/yy|YY/,(this.getYear() % 100)>9?(this.getYear() % 100).toString():'0' + (this.getYear() % 100));

  str=str.replace(/MM/,this.getMonth()>9?this.getMonth().toString():'0' + this.getMonth());
  str=str.replace(/M/g,this.getMonth());

  str=str.replace(/w|W/g,Week[this.getDay()]);

  str=str.replace(/dd|DD/,this.getDate()>9?this.getDate().toString():'0' + this.getDate());
  str=str.replace(/d|D/g,this.getDate());

  str=str.replace(/hh|HH/,this.getHours()>9?this.getHours().toString():'0' + this.getHours());
  str=str.replace(/h|H/g,this.getHours());
  str=str.replace(/mm/,this.getMinutes()>9?this.getMinutes().toString():'0' + this.getMinutes());
  str=str.replace(/m/g,this.getMinutes());

  str=str.replace(/ss|SS/,this.getSeconds()>9?this.getSeconds().toString():'0' + this.getSeconds());
  str=str.replace(/s|S/g,this.getSeconds());

  return str;
};

Array.prototype.indexOf = function(val) {
  for (var i = 0; i < this.length; i++) {
    if (this[i] == val) return i
  }
  return -1
};

Array.prototype.append = function(e){
  if (e instanceof Array){
    for(var i = 0;i< e.length;i++){
      this.push(e[i])
    }
  }else{
    if (e != undefined || e != null){
      this.push(e)
    }
  }
}

  Array.prototype.remove = function(val) {
    var index = this.indexOf(val)
    if (index > -1) {
      this.splice(index, 1)
    }
  };

function dateFromTimestamp(timestamp){
  return new Date(timestamp)
}

//占位
function pad(num, n) {
  var len = num.toString().length;
  while(len < n) {
    num = "0" + num;
    len++;
  }
  return num;
}

function isEmptyObject(obj){
  for(var n in obj){return false}
  return true;
}
