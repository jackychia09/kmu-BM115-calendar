document.addEventListener(
    'DOMContentLoaded',
    async function () {


        const calendarEl =
            document.getElementById('calendar');


        // 取得 Google Calendar 行程
        const apiURL =
        `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(CALENDAR_ID)}/events?key=${GOOGLE_API_KEY}&singleEvents=true&orderBy=startTime`;


        const response =
            await fetch(apiURL);


        const data =
            await response.json();



        // 如果 API 錯誤
        if (!data.items) {

            console.log("Google Calendar API 錯誤：", data);

            calendarEl.innerHTML =
            "❌ 無法取得課程資料";

            return;
        }



        // 取得 Google 官方顏色表
        const colorsResponse =
            await fetch(
            `https://www.googleapis.com/calendar/v3/colors?key=${GOOGLE_API_KEY}`
            );


        const colorsData =
            await colorsResponse.json();


        const eventColors =
            colorsData.event;



        // 將 Google 行程轉換成 FullCalendar 格式
        const events =
            data.items.map(event => {


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



                    // 使用 Google 真實顏色
                    backgroundColor:

                    event.colorId &&
                    eventColors[event.colorId]

                    ?

                    eventColors[event.colorId].backgroundColor

                    :

                    "#3788d8",




                    borderColor:

                    event.colorId &&
                    eventColors[event.colorId]

                    ?

                    eventColors[event.colorId].backgroundColor

                    :

                    "#3788d8",




                    textColor:
                    "#ffffff",




                    extendedProps:{


                        description:
                        event.description || "",



                        location:
                        event.location || ""

                    }


                };


            });





        // 建立 FullCalendar

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



    }

);
