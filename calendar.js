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

console.log(data);

return;

}



// Google 官方事件顏色

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



return {


title:
event.summary || "未命名課程",



start:
event.start.dateTime ||
event.start.date,



backgroundColor:

event.colorId && eventColors[event.colorId]

?

eventColors[event.colorId].backgroundColor

:

"#3788d8",



borderColor:

event.colorId && eventColors[event.colorId]

?

eventColors[event.colorId].backgroundColor

:

"#3788d8",



textColor:"#ffffff",



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


height:'auto',


events:events



}



);



calendar.render();


});
