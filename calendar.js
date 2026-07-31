document.addEventListener(
'DOMContentLoaded',
async function(){


const calendarEl =
document.getElementById('calendar');



const apiURL =
`https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events?key=${GOOGLE_API_KEY}&singleEvents=true&orderBy=startTime`;



const response =
await fetch(apiURL);


const data =
await response.json();



const colorsResponse =
await fetch(
`https://www.googleapis.com/calendar/v3/colors?key=${GOOGLE_API_KEY}`
);


const colorsData =
await colorsResponse.json();


const eventColors =
colorsData.event;


return {


title:
event.summary || "未命名課程",


start:
event.start.dateTime ||
event.start.date,



backgroundColor:
eventColors[event.colorId]?.backgroundColor || "#3788d8",


borderColor:
eventColors[event.colorId]?.backgroundColor || "#3788d8",


borderColor:
getColor(event.colorId),


textColor:"#ffffff",



extendedProps:{


description:
event.description || "",


location:
event.location || ""


}



}


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


events:events,



eventClick:function(info){


alert(

info.event.title
+
"\n\n"
+
"地點："
+
(info.event.extendedProps.location || "無")
+
"\n\n"
+
(info.event.extendedProps.description || "")

);


}


});



calendar.render();


});





function getColor(colorId){


const colors={

"1":"#7986cb",
"2":"#33b679",
"3":"#8e24aa",
"4":"#e67c73",
"5":"#f6bf26",
"6":"#f4511e",
"7":"#039be5",
"8":"#616161",
"9":"#3f51b5",
"10":"#0b8043",
"11":"#d60000"

};


return colors[colorId] || "#3788d8";


}
