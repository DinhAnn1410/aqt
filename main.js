import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-analytics.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-auth.js";

var firebaseConfig = {
    apiKey: "AIzaSyCdzIHYkUzIKxRcMkYSAnUK8ABgzQtkCrQ",
    authDomain: "ndan-test-3ec22.firebaseapp.com",
    databaseURL: "https://ndan-test-3ec22-default-rtdb.firebaseio.com",
    projectId: "ndan-test-3ec22",
    storageBucket: "ndan-test-3ec22.appspot.com",
    messagingSenderId: "96584122988",
    appId: "1:96584122988:web:fdd229c22375fe2d104e49",
    measurementId: "G-S7XFJ8WD7J"
};

firebase.initializeApp(firebaseConfig);

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

document.getElementById('reg-btn').addEventListener('click', function() {
    document.getElementById('register-div').style.display="inline";
    document.getElementById('login-div').style.display="none";
});

document.getElementById('log-btn').addEventListener('click', function() {
    document.getElementById('register-div').style.display="none";
    document.getElementById('login-div').style.display="inline";
});

document.getElementById('register-btn').addEventListener('click', function() {
    const registerEmail = document.getElementById('register-email').value;
    const registerPassword = document.getElementById('register-password').value;
    
    createUserWithEmailAndPassword(auth, registerEmail, registerPassword)
    .then((userCredential) => {
        const user = userCredential.user;
        document.getElementById('result-box').style.display="inline";
        document.getElementById('register-div').style.display="none";
        document.getElementById('result').innerHTML="Welcome! <br> You was registered successfully. <br> Refresh the web and LOGIN to continue!";
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        document.getElementById('result-box').style.display="inline";
        document.getElementById('register-div').style.display="none";
        document.getElementById('result').innerHTML="Sorry! <br>" + errorMessage;
    });
});

document.getElementById('login-btn').addEventListener('click', function() {
    const loginEmail = document.getElementById('login-email').value;
    const loginPassword = document.getElementById('login-password').value;
    
    signInWithEmailAndPassword(auth, loginEmail, loginPassword)
    .then((userCredential) => {
        const user = userCredential.user;
        if (user) {
            document.getElementById('celcius').style.display="inline";
            document.getElementById('percent').style.display="inline";
            document.getElementById('micro1').style.display="inline";
            document.getElementById('micro2').style.display="inline";
            document.getElementById('ppm1').style.display="inline";
            document.getElementById('ppm2').style.display="inline";
            document.getElementById('swt-btn').style.display="inline";
            document.getElementById('account-info').style.marginTop="30px";

            if(loginEmail == "nghiemdinhan1410@gmail.com") {
                var database = firebase.database();
                var dataRefT = database.ref('/Room1/Temperature');
                var dataRefH = database.ref('/Room1/Humidity');
                var dataRefCO = database.ref('/Room1/CO Value');
                var dataRefG = database.ref('/Room1/Gas Value');
                var dataRefP25 = database.ref('/Room1/PM25');
                var dataRefP10 = database.ref('/Room1/PM10');
                var dataRefAQI = database.ref('/Room1/AQI');

                dataRefT.on('value', function(snapshot) {
                    var dataDisplayDiv1 = document.getElementById('displayTem');
                    var Tval = snapshot.val();
                    dataDisplayDiv1.textContent = Tval;
                    document.getElementById('svg1').style.display="inline";
                    const arc1 = document.querySelector("svg #path1");
                    const arc_length1 = arc1.getTotalLength();
                    const step1 = arc_length1 / (125 + 40); //length/(max-min)
                    const value1 = (snapshot.val() + 40) * step1;
                    arc1.style.strokeDasharray = `${value1} ${arc_length1 - value1}`;
                });

                dataRefH.on('value', function(snapshot) {
                    var dataDisplayDiv2 = document.getElementById('displayHum');
                    dataDisplayDiv2.textContent = snapshot.val();
                    document.getElementById('svg2').style.display="inline";
                    const arc2 = document.querySelector("svg #path2");
                    const arc_length2 = arc2.getTotalLength();
                    const step2 = arc_length2 / (100 - 0);
                    const value2 = (snapshot.val() - 0) * step2;
                    arc2.style.strokeDasharray = `${value2} ${arc_length2 - value2}`;
                });

                dataRefCO.on('value', function(snapshot) {
                    var dataDisplayDiv3 = document.getElementById('displayCO');
                    var coVal = snapshot.val();
                    dataDisplayDiv3.textContent = coVal;
                    document.getElementById('svg3').style.display="inline";
                    const arc3 = document.querySelector("svg #path3");
                    const arc_length3 = arc3.getTotalLength();
                    const step3 = arc_length3 / 800;
                    const value3 = snapshot.val() * step3;
                    arc3.style.strokeDasharray = `${value3} ${arc_length3 - value3}`;
                });
                
                dataRefG.on('value', function(snapshot) {
                    var dataDisplayDiv4 = document.getElementById('displayGas');
                    var gasVal = snapshot.val();
                    dataDisplayDiv4.textContent = gasVal;
                    document.getElementById('svg4').style.display="inline";
                    const arc4 = document.querySelector("svg #path4");
                    const arc_length4 = arc4.getTotalLength();
                    const step4 = arc_length4 / 800;
                    const value4 = snapshot.val() * step4;
                    arc4.style.strokeDasharray = `${value4} ${arc_length4 - value4}`;
                    if (gasVal >= 300)
                        audio2.play();
                    else    
                        audio2.pause();
                });

                dataRefP25.on('value', function(snapshot) {
                    var dataDisplayDiv5 = document.getElementById('displayPM25');
                    var pm25Val = snapshot.val();
                    dataDisplayDiv5.textContent = pm25Val;
                    document.getElementById('svg5').style.display="inline";
                    const arc5 = document.querySelector("svg #path5");
                    const arc_length5 = arc5.getTotalLength();
                    const step5 = arc_length5 / 1000; //length/(max-min)
                    const value5 = (snapshot.val()) * step5;
                    arc5.style.strokeDasharray = `${value5} ${arc_length5 - value5}`;
                });

                dataRefP10.on('value', function(snapshot) {
                    var dataDisplayDiv6 = document.getElementById('displayPM10');
                    var pm10Val = snapshot.val();
                    dataDisplayDiv6.textContent = pm10Val;
                    document.getElementById('svg6').style.display="inline";
                    const arc6 = document.querySelector("svg #path6");
                    const arc_length6 = arc6.getTotalLength();
                    const step6 = arc_length6 / 1000; //length/(max-min)
                    const value6 = (snapshot.val()) * step6;
                    arc6.style.strokeDasharray = `${value6} ${arc_length6 - value6}`;
                });

                dataRefAQI.on('value', function(snapshot) {
                    var dataDisplayDiv6 = document.getElementById('aqi-value');
                    var aqiVal = snapshot.val();
                    dataDisplayDiv6.textContent = aqiVal;
                    if (aqiVal >= 0 && aqiVal <= 50)
                        document.getElementById('aqi-status').innerHTML="Good";
                    else if (aqiVal >= 51 && aqiVal <= 100)
                        document.getElementById('aqi-status').innerHTML="Moderate";
                    else if (aqiVal >= 101 && aqiVal <= 150) {
                        document.getElementById('aqi-status').innerHTML="Unhealthy LvL 1";
                        document.getElementById('aqi-status').style.fontSize="20px";
                    }
                    else if (aqiVal >= 151 && aqiVal <= 200) {
                        document.getElementById('aqi-status').innerHTML="Unhealthy LvL 2";
                        document.getElementById('aqi-status').style.fontSize="20px";
                    }
                    else if (aqiVal >= 201 && aqiVal <= 300)
                        document.getElementById('aqi-status').innerHTML="Very unhealthy";
                    else if (aqiVal >= 301)
                        document.getElementById('aqi-status').innerHTML="Hazardous";
                    if (aqiVal >= 301)
                        audio1.play();
                    else
                        audio1.pause();
                });
            }
        }
        document.getElementById('login-div').style.display="none";
        document.getElementById('account-info').style.display="inline";
        document.getElementById('log-out-yes-btn').style.display="none";
        document.getElementById('log-out-no-btn').style.display="none";
        document.getElementById('log-out-btn').style.display="inline";
        document.getElementById('eye-slash-btn1').addEventListener('click', function() {
            document.getElementById('eye-btn1').style.display="inline";
            document.getElementById('eye-slash-btn1').style.display="none";
            document.getElementById('hid-email').innerHTML=loginEmail;
        });

        document.getElementById('eye-slash-btn2').addEventListener('click', function() {
            document.getElementById('eye-btn2').style.display="inline";
            document.getElementById('eye-slash-btn2').style.display="none";
            document.getElementById('hid-password').innerHTML=loginPassword;
        });
        
        document.getElementById('eye-btn1').addEventListener('click', function() {
            document.getElementById('eye-slash-btn1').style.display="inline";
            document.getElementById('eye-btn1').style.display="none";
            document.getElementById('hid-email').innerHTML="********";
        });
        
        document.getElementById('eye-btn2').addEventListener('click', function() {
            document.getElementById('eye-slash-btn2').style.display="inline";
            document.getElementById('eye-btn2').style.display="none";
            document.getElementById('hid-password').innerHTML="********";
        });
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        document.getElementById('result-box').style.display="inline";
        document.getElementById('login-div').style.display="none";
        document.getElementById('result').innerHTML="Sorry! <br>" + errorMessage;
    });
});

document.getElementById('log-out-btn').addEventListener('click', function() {
    document.getElementById('log-out-yes-btn').style.display="inline";
    document.getElementById('log-out-no-btn').style.display="inline";
    document.getElementById('log-out-btn').style.display="none";
});

document.getElementById('log-out-yes-btn').addEventListener('click', function() {
    signOut(auth).then(() => {
        document.getElementById('result-box').style.display="none";
        document.getElementById('login-div').style.display="inline";
        document.getElementById('account-info').style.display="none";
        document.getElementById('displayTem').innerHTML="Undefined";
        document.getElementById('displayHum').innerHTML="Undefined";
        document.getElementById('displayCO').innerHTML="Undefined";
        document.getElementById('displayGas').innerHTML="Undefined";
        document.getElementById('displayPM25').innerHTML="Undefined";
        document.getElementById('displayPM10').innerHTML="Undefined";
        document.getElementById('aqi-value').innerHTML="Undefined";
        document.getElementById('aqi-status').innerHTML="Undefined";
        document.getElementById('svg1').style.display="none";
        document.getElementById('svg2').style.display="none";
        document.getElementById('svg3').style.display="none";
        document.getElementById('svg4').style.display="none";
        document.getElementById('svg5').style.display="none";
        document.getElementById('svg6').style.display="none";
        document.getElementById('celcius').style.display="none";
        document.getElementById('percent').style.display="none";
        document.getElementById('ppm1').style.display="none";
        document.getElementById('ppm2').style.display="none";
        document.getElementById('micro1').style.display="none";
        document.getElementById('micro2').style.display="none";
        document.getElementById('swt-btn').style.display="none";
    }).catch((error) => {
        document.getElementById('result').innerHTML="Sorry! <br>" + errorMessage;
    });
});

document.getElementById('log-out-no-btn').addEventListener('click', function() {
    document.getElementById('log-out-yes-btn').style.display="none";
    document.getElementById('log-out-no-btn').style.display="none";
    document.getElementById('log-out-btn').style.display="inline";
});

let startX;
let scrollLeft;
let isDragging = false;

document.getElementById('hid-email').addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.pageX - document.getElementById('hid-email').offsetLeft;
    scrollLeft = document.getElementById('hid-email').scrollLeft;
    document.getElementById('hid-email').style.overflow = 'hidden';
});

document.getElementById('hid-email').addEventListener('mouseleave', () => {
    isDragging = false;
    document.getElementById('hid-email').style.overflow = 'hidden';
});

document.getElementById('hid-email').addEventListener('mouseup', () => {
    isDragging = false;
    document.getElementById('hid-email').style.overflow = 'hidden';
});

document.getElementById('hid-email').addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - document.getElementById('hid-email').offsetLeft;
    const walk = (x - startX) * 2;
    document.getElementById('hid-email').scrollLeft = scrollLeft - walk;
});

document.getElementById('hid-password').addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.pageX - document.getElementById('hid-password').offsetLeft;
    scrollLeft = document.getElementById('hid-password').scrollLeft;
    document.getElementById('hid-password').style.overflow = 'hidden';
});

document.getElementById('hid-password').addEventListener('mouseleave', () => {
    isDragging = false;
    document.getElementById('hid-password').style.overflow = 'hidden';
});

document.getElementById('hid-password').addEventListener('mouseup', () => {
    isDragging = false;
    document.getElementById('hid-password').style.overflow = 'hidden';
});

document.getElementById('hid-password').addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - document.getElementById('hid-password').offsetLeft;
    const walk = (x - startX) * 2;
    document.getElementById('hid-password').scrollLeft = scrollLeft - walk;
});

const deg = 6;
const hour = document.querySelector(".hour");
const min = document.querySelector(".min");
const sec = document.querySelector(".sec");

const setClock = () => {
	let day = new Date();
	let hh = day.getHours() * 30;
	let mm = day.getMinutes() * deg;
	let ss = day.getSeconds() * deg;

	hour.style.transform = `rotateZ(${hh + mm / 12}deg)`;
	min.style.transform = `rotateZ(${mm}deg)`;
	sec.style.transform = `rotateZ(${ss}deg)`;
};

setClock();

setInterval(setClock, 1000);

// Thêm sự kiện load vào thẻ audio
const audio1 = document.getElementById("audio1");
audio1.addEventListener('ended', function() {
    audio1.currentTime = 0; // Đặt lại thời gian của âm thanh về 0
    audio1.play(); // Phát lại âm thanh
});
const audio2 = document.getElementById("audio2");
audio2.addEventListener('ended', function() {
    audio2.currentTime = 0; // Đặt lại thời gian của âm thanh về 0
    audio2.play(); // Phát lại âm thanh
});

var toggle = document.getElementById('swt-btn');
var toggleContainer = document.getElementById('toggle-btn');
var toggleNumber;

toggle.addEventListener('click', function() {
	toggleNumber = !toggleNumber;
	if (toggleNumber) {
		toggleContainer.style.clipPath = 'inset(0 0 0 50%)';
		toggleContainer.style.backgroundColor = '#D74046';
        document.getElementById('account-info').style.display="none";
        document.getElementById('container').style.display="inline";
        document.getElementById('rooms-noti').style.display="inline";
	} else {
		toggleContainer.style.clipPath = 'inset(0 50% 0 0)';
		toggleContainer.style.backgroundColor = 'dodgerblue';
        document.getElementById('account-info').style.display="inline";
        document.getElementById('container').style.display="none";
        document.getElementById('rooms-noti').style.display="none";
	}
	console.log(toggleNumber)
});
