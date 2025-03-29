# What I Learned?

## How to Update an dom element using the setInterval function
```javascript
// For Digital Clock
 setInterval(function () {
      let date = new Date();
      time.innerText = date.toLocaleTimeString()
    }, 1000)
```
### Steps
- The setInterval takes a ***callback function*** inside it and time in ***milliseconds***.
- The `date` variable holds the Date that we get from the `new Date` object.
- `date.toLocaleTimeString()` converts the date into a readable format.
- We update the innerHtml of the the time element in the dom after 1000 milliseconds or 1 second.


## Used the setInterval function and CSS styling to make an Analog clock
```javascript
// For Analog clock
setInterval(() => {
    let d = new Date();
    htime = d.getHours();
    mtime = d.getMinutes();
    stime = d.getSeconds();
    // mstime = d.getMilliseconds();

    hrotation = 30 * htime + mtime/2;// hour hand rotation
    mrotation = 6 * mtime ;// minute hand rotation
    srotation = 6 * stime ;// second hand rotation
    // msrotation = (36/100) * mstime  ;// millisecond rotation

    hour.style.transform = ` rotate(${hrotation}deg)`;
    minute.style.transform = ` rotate(${mrotation}deg)`;
    second.style.transform = ` rotate(${srotation}deg)`;
    // millisec.style.transform = ` rotate(${msrotation}deg)`;
}, 1000);
```
### Steps
- The `d`  variable holds the Date that we get from the `new Date` object.
- The `htime` takes out the **hours** from the date.
- The `mtime` takes out the **minutes** from the date.
- The `stime` takes out the **seconds** from the date.
- We calculate the the ***degree of rotation*** and store in a variable for the no. of hands we want in the clock.

  ```javascript
    hrotation = 30 * htime + mtime/2;// hour hand rotation
    mrotation = 6 * mtime ;// minute hand rotation
    srotation = 6 * stime ;// second hand rotation
    // msrotation = (36/100) * mstime  ;// millisecond rotation
  ```
- Now we add the degree to the styles of the elements.
  ```javascript
    hour.style.transform = ` rotate(${hrotation}deg)`;
    minute.style.transform = ` rotate(${mrotation}deg)`;
    second.style.transform = ` rotate(${srotation}deg)`;
    // millisec.style.transform = ` rotate(${msrotation}deg)`;

- And we update the style every second.

