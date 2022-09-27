const userKey = "matt";
const passKey = "luna1234"
function login (){
    user = document.getElementById("username");
    pass = document.getElementById("password");
    if (user.value == userKey && pass.value == passKey){
        var success = document.createElement("P");
        var body = document.getElementById("m-body")
        success.style =`
        background: #00000;
        color: rgb(32,162,0);
        border-style: solid;
		margin-top: 5vmin;
        border-radius: 20rem!important;
        width: auto;
        heigth: 4vmin;
        padding: 10px;
        `;
		var content = document.createTextNode("LOGIN CORRECT");
        success.appendChild(content);
        body.appendChild(success);
		var modal = document.getElementById("modal-1");
		user.disabled = true;
		pass.disabled = true;
		setTimeout(() => { $('#modal-1').modal('hide');}, "3000");
    }else{
        var fail = document.createElement("P");
        var body = document.getElementById("m-body")
        fail.style =`
        background: #99999;
        color: #ff0f00;
        border-style: solid;
		margin-top: 5vmin;
        border-radius: 20rem!important;
        width: auto;
        heigth: 4vmin;
        padding: 10px;
        `;
        var content = document.createTextNode("LOGIN INCORRECT");
        fail.appendChild(content);
        body.appendChild(fail);;
		setTimeout(() => {body.removeChild(fail);}, "3000");
    }
}