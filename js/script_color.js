let raw_data=[];
console.log("הדף עובד");
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
        str+=`<td>${line.background_color}</td>`;
        str+=`<td>${line.text_color}</td>`;
        str+=`<td><button onclick="deleteLine(${line.id})">מחק</button></td>`;
        str+="</tr>";
    }
    document.getElementById("mainTable").innerHTML=str;
}
async function getList() {
    let response = await fetch('/COLOR/List');
    let data = await response.json();
    raw_data = data.rows;
    console.log(raw_data);
    CreateTble();
}
async function AddNewLine() {
    let name = document.getElementById("name").value;
    let background_color = document.getElementById("background_color").value;
    let text_color = document.getElementById("text_color").value;
    let response = await fetch('/COLOR/Add',{
            method: 'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({name:name,background_color:background_color,text_color:text_color})
        }
    );
    let data = await response.json();
    console.log(data);
    getList();
}
async function deleteLine(id) {
    let response = await fetch(`/COLOR/Delete/${id}`,{
            method: 'DELETE',
        }
    );
    getList();
}
async function editLine(id) {
    let objToServer={};
    objToServer.id=id;
    objToServer.name=document.getElementById("name").value;
    objToServer.background_color=document.getElementById("background_color").value;
    objToServer.text_color=document.getElementById("text_color").value;
    let response = await fetch('/COLOR/Update', {
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