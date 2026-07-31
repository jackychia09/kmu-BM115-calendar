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



let color =
"#3788d8";


if(
event.colorId &&
eventColors[event.colorId]
){

color =
eventColors[event.colorId].backgroundColor;

}



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
