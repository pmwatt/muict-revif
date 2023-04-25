let loginUsername = document.getElementById("username");
let loginPwd = document.getElementById("pwd");

async function callWs(url, method) {
    let data, response;
    if (method == 'login') {
        let aMethod = 'POST';
        response = await fetch(url, {
            method: aMethod,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: loginUsername.value,
                password: loginPwd.value
            })
        });
        data = await response.json();
    }
    else if (method == 'test') {
        response = await fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
        data = await response.json()
    }
    return data;
}

function loginVerify() {
    let url = "http://localhost:3030/login-verify";
    callWs(url, 'test').then(
        (s) => {
            if (s.error) {
                alert('successful');
            }
            else {
                alert('failed');
            }
        }
    )
    // let url = "http://localhost:3030/login-verify";
    // callWs(url, 'login').then(
    //     (data) => {
    //         if (data.error) {
    //             alert("Failed login");
    //         }
    //         else {
    //             alert("Successful login");
    //         }
    //     }
    // )

    // let response = callWs(url, {
    //     method: "POST",
    //     headers: {
    //         'Accept': 'application/json',

    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({
    //         username: loginUsername.value,
    //         pwd: loginPwd.value
    //     })
    // });

    // response.then((res) => res.json())
    // .then((data) => {
    //     // console.log(data);
    //     if (data.error) {
    //         alert("Login Failed");

    //     }
    //     else {
    //         alert("Login Successful");
    //     }
    // });
}

function test() {
    let response = fetch('http://localhost:3000/testing')
    .then(res => {
        console.log('hello from frontend');
    });
}