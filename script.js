const calendarAPI =
`https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events?key=${GOOGLE_API_KEY}&singleEvents=true&orderBy=startTime`;


async function loadCalendar(){

    const response = await fetch(calendarAPI);

    const data = await response.json();


    console.log(data);


    const calendar =
        document.getElementById("calendar");


    if (!data.items) {

        calendar.innerHTML =
        "❌ 無法取得 Google Calendar 資料";

        console.log(
            "API錯誤：",
            data
        );

        return;
    }



    data.items.forEach(event=>{


        const title =
            event.summary || "未命名課程";


        const start =
            event.start.dateTime ||
            event.start.date;



        const item =
        document.createElement("div");


        item.className="event";


        item.innerHTML =
        `
        <div>
        📚 ${title}
        </div>

        <small>
        ${start}
        </small>
        `;


        calendar.appendChild(item);


    });

}


loadCalendar();
