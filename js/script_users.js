let raw_data=[];
// function FilterData(el){
//     console.log("FilterData::",el);
//     if(srchTerm=="")
//         return true;
//     let reg=new RegExp(srchTerm,"i");
//     if(reg.test(el.name)){
//         return true;
//     }
//     return false;
// }
function CreateTble(){
    let str="";
    for(let line of raw_data){
        str+="<tr>";
        str+=`<td><button onclick="editLine(${line.id})">עדכן</button></td>`;
        str+=`<td>${line.id}</td>`;
        str+=`<td>${line.name}</td>`;
        str+=`<td>${line.username}</td>`;
        str+=`<td>${line.password}</td>`;
        str+=`<td><button onclick="deleteLine(${line.id})">מחק</button></td>`;
        str+="</tr>";
    }
    document.getElementById("mainTable").innerHTML=str;
}
async function getList() {
    let response = await fetch('/U/List');
    let data = await response.json();
    raw_data = data.rows;
    console.log(raw_data);
    CreateTble();
}
async function AddNewLine() {
    let name = document.getElementById("name").value;
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    let response = await fetch('/U/Add',{
            method: 'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({name:name,username:username,password:password})
        }
    );
    let data = await response.json();
    console.log(data);
    getList();

}
async function deleteLine(id) {
    let response = await fetch(`/U/Delete/${id}`,{
            method: 'DELETE',
        }
    );
    getList();
}
async function editLine(id) {
    let objToServer={};
    objToServer.id=id;
    objToServer.name=document.getElementById("name").value;
    objToServer.username=document.getElementById("username").value;
    objToServer.password=document.getElementById("password").value;
    let response = await fetch('/U/Update', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(objToServer)
        }
    );
    getList();
}
getList();
// CreateTble();