
const FACEBOOK_ACCESS_TOKEN = 'EAAMJfDsPFmsBAIjpTGuq0d91bZBn4SyF5BEFnugDhIDXomczwFgd82uq0orWxELTmKjNIvF3i2IZC4nZBEgjFNyHHZCij1maQjkIAISaZAuHvYqs51jonGAeZCxWEn5uBM15HsOVvXOol32yhu4g7ZCOS8pNSdHWc8sj5Dckwm6RsiuRNZCdfZAx3';
const COMMERCETOOL_AUTH = 'Bearer fAmDzrQsQ2vt41uV7_M4N1xgrE-d47kF';

const request = require('request');

class Services {
    sendTextMessage (senderId, text) {
        request({
            url: 'https://graph.facebook.com/v2.6/me/messages',
            qs: { access_token: FACEBOOK_ACCESS_TOKEN },
            method: 'POST',
            body: {
                recipient: { id: senderId },
                message: { text },
            },
            json: true
        }, function(err, res, body) {
            if (res.statusCode != 200) {
                console.log("Error: "+ err);
                console.log("ResponseBody: "+ res.statusCode);
                console.log("ResponseBody: "+ JSON.stringify(res.body));
            }
        });
    }

    sendTemplateMessage(senderId, templateJson){
        request({
            url: 'https://graph.facebook.com/v2.6/me/messages',
            qs: { access_token: FACEBOOK_ACCESS_TOKEN },
            method: 'POST',
            body:templateJson,
            json: true
        }, function(err, res, body) {
            if (res.statusCode != 200) {
                console.log("Error: "+ err);
                console.log("ResponseBody: "+ res.statusCode);
                console.log("ResponseBody: "+ JSON.stringify(res.body));
            }
        });
    }

    changeCommercePasswd (emailId) {
        request({
            uri: 'https://radiant-hollows-75895.herokuapp.com/changepwd',
            method: 'POST',
            body: {
                email: { emailId }
            },
            json: true
        }, function(err, res, body) {
            if (res.statusCode != 200) {
                console.log("Error: "+ err);
                console.log("ResponseBody: "+ res.statusCode);
                console.log("ResponseBody: "+ JSON.stringify(res.body));
            }
        })
    }

    getProductsUnderCategory(categoryId, senderId, callBackMethod) {
        request({
            url: 'https://api.sphere.io/hnb-59/product-projections/search',
            qs: {filter: 'categories.id: subtree("' + categoryId +'")', limit:5},
            headers : {
                Authorization : COMMERCETOOL_AUTH
            },
            method: 'POST',		 
        }, function (err, res, body) {
            if (res.statusCode != 200) {
                console.log("Error: "+ err);
                console.log("ResponseBody: "+ res.statusCode);
                console.log("ResponseBody: "+ JSON.stringify(res.body));
                return;
            }
            console.log("got response from CT");
            var result = JSON.parse(body);
            callBackMethod(result, senderId);
        });
    }
}

module.exports = new Services();