// let time = document.getElementById('time')

// //For Analog clock
// setInterval(function () {
//     let date = new Date();
//     time.innerText = date.toLocaleTimeString()
// }, 1000)

// //For Digital Clock
// setInterval(() => {
//     let d = new Date();
//     let htime = d.getHours();
//     let mtime = d.getMinutes();
//     let stime = d.getSeconds();
//     // mstime = d.getMilliseconds();

//     hrotation = 30 * htime + mtime / 2;// hour hand rotation
//     mrotation = 6 * mtime;// minute hand rotation
//     srotation = 6 * stime;// second hand rotation
//     // msrotation = (36/100) * mstime  ;// millisecond rotation

//     hour.style.transform = ` rotate(${hrotation}deg)`;
//     minute.style.transform = ` rotate(${mrotation}deg)`;
//     second.style.transform = ` rotate(${srotation}deg)`;
//     // millisec.style.transform = ` rotate(${msrotation}deg)`;
// }, 1000);