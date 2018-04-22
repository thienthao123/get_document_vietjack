var request = require('request')


var getTailieuVietJack = (url,cb) =>{
request.get(url,{
    headers : {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.117 Safari/537.36'
    }
},(err,res,body) =>{
    var title = "B" + body.match(/\>B(.*?)\<\/h2\>/)[1]
    var dapAn = body.match(/\<p\>(.*?)\<\/p\>/g)
    var ketqua = body.match(/\<tr\>(.*?)\<\/tr\>/g)
    try{
        var bodyRemoveSpace = deleteSpace(body)
        var kqCau = bodyRemoveSpace.match(/\<td>[0-9]+\<\/td\>/g)
        var kqDapAn = deleteSpace(deleteHtmlTag(ketqua[1]))
        kqDapAn = kqDapAn.replace("Đápán","")
    }catch(err){
        console.log(err)
        cb("error")
        return 0
    }
    var arrayKq = []
    for(var k=0;k<kqCau.length;k++){
        arrayKq.push({
            cau : "Câu " + deleteSpace(deleteHtmlTag(kqCau[k])),
            dapAn : kqDapAn.substring(k,k+1)
        })
    }
    dapAn[0] = title
    delete dapAn[dapAn.length]
    delete dapAn[dapAn.length -1]
    delete dapAn[dapAn.length -2]
    delete dapAn[dapAn.length -3]
    delete dapAn[dapAn.length -4]
    delete dapAn[dapAn.length -5]
    for(var i=0;i<dapAn.length;i++){
        if(dapAn[i]){
            dapAn[i] = dapAn[i].replace(/<(?:.|\n)*?>/gm, '');
            dapAn[i] = dapAn[i].replace(/color\:green\;\"\>/g,"")
            dapAn[i] = dapAn[i].replace(/&nbsp;/g, ' ');
            for(var z = 0;z<arrayKq.length;z++){
                if(dapAn[i].indexOf(arrayKq[z].cau) != -1){
                    dapAn[i] += "\nĐáp Án : " + arrayKq[z].dapAn
                }
            }
        }
    }
    
    if(dapAn[0] == title){
        cb(dapAn)
    }
})
}


var deleteHtmlTag = (text) =>{
    return text.replace(/<(?:.|\n)*?>/gm, '');
}
var deleteSpace = (text) =>{
    return text.replace(/ /g,'')
}


module.exports = getTailieuVietJack

