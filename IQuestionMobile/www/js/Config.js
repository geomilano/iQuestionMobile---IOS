// JavaScript Document
// @author Khamsany 
// @Description

var iQConfig = new Config(); // for shortcut
function Config(){

};

//server config	
iQConfig.serverAlias = "beta";
iQConfig.domain = "http://" + iQConfig.serverAlias + ".completemr.com/";
iQConfig.apiURL =  iQConfig.domain + "ilink/iquestion_mobile_api-1.0/index.php?p=";

//phone type
iQConfig.PHONE_TYPE = 1;
iQConfig.IPHONE = 1;
iQConfig.BLACKBERRY = 2;
iQConfig.ANDROID = 3;
iQConfig.NOKIA = 4;
iQConfig.WINDOWPHONE = 5; //window phone 7 only
iQConfig.MAC = 6; //mac base device, e.g iPad




	
