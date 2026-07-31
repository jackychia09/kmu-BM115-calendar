const subjectColors = {

    // 特殊事件
    "測試": "#d81b60",
    "新生座談": "#d81b60",
    "註冊": "#d81b60",
    "健檢": "#d81b60",
    "開學": "#d81b60",
    "放假": "#d81b60",
    "考試": "#d81b60",


    // 醫學專業素養
    "醫學專業素養": "#424242",


    // 大體解剖學
    "大體解剖學": "#f57c00",


    // 大體解剖學實驗
    "大體解剖學實驗": "#e53935",


    // 生物化學
    "生物化學": "#fbc02d",


    // 組織學
    "組織學": "#0097a7",


    // 組織學實驗
    "組織學實驗": "#5e35b1",


    // 胚胎學
    "胚胎學": "#388e3c",


    // 生理學
    "生理學": "#9e9e9e",


    // 藥理學
    "藥理學": "#9575cd",


    // 微生物暨免疫學
    "微生物暨免疫學": "#7cb342",


    // 病理學
    "病理學": "#6a1b9a",


    // 病理學實驗
    "病理學實驗": "#8e24aa",


    // Laboratory Diagnostics
    "Laboratory Diagnostics": "#6d4c41"


};
function getSubjectColor(title){


    for(
        const subject in subjectColors
    ){


        if(
            title.includes(subject)
        ){

            return subjectColors[subject];

        }

    }


    // 找不到科目時預設藍色
    return "#3788d8";


}
document.addEventListener(
'DOMContentLoaded',
async function(){


const calendarEl =
document.getElementById('calendar');


const apiURL =
`https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(CALENDAR_ID)}/events?key=${GOOGLE_API_KEY}&singleEvents=true&orderBy=startTime`;



const response =
await fetch(apiURL);


const data =
await response.json();



if(!data.items){

console.log("API錯誤：", data);

calendarEl.innerHTML =
"❌ 無法取得課程資料";

return;

}



const colorsResponse =
await fetch(
`https://www.googleapis.com/calendar/v3/colors?key=${GOOGLE_API_KEY}`
);


const colorsData =
await colorsResponse.json();


const eventColors =
colorsData.event;



const events =
data.items.map(event=>{


console.log(
event.summary,
"colorId:",
event.colorId
);



const color =
getSubjectColor(
    event.summary || ""
);



return {


title:
event.summary || "未命名課程",


start:
event.start.dateTime ||
event.start.date,


backgroundColor:
color,


borderColor:
color,


textColor:
"#ffffff",


extendedProps:{


location:
event.location || "",


description:
event.description || ""


}


};



});



const calendar =
new FullCalendar.Calendar(

calendarEl,

{

initialView:
'dayGridMonth',

locale:
'zh-tw',

height:
'auto',

events:
events,


eventClick:function(info){


alert(

"📚 "
+
info.event.title

+

"\n\n📍 地點："

+
(
info.event.extendedProps.location
||
"無"
)

+

"\n\n📝 說明："

+
(
info.event.extendedProps.description
||
"無"
)


);


}


}


);



calendar.render();


});
