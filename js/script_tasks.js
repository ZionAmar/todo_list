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
        str+=`<td>${line.due_date}</td>`;
        str+=`<td>${line.done_date}</td>`;
        str+=`<td>${line.category_id}</td>`;
        str+=`<td>${line.owner_id}</td>`;
        str+=`<td>${line.creator_id}</td>`;
        str+=`<td><button onclick="deleteLine(${line.id})">מחק</button></td>`;
        str+="</tr>";
    }
    document.getElementById("mainTable").innerHTML=str;
}
async function getList() {
    let response = await fetch('/T/List');
    let data = await response.json();
    raw_data = data.rows;
    console.log(raw_data);
    CreateTble();
    let s ='';
    for(let row of data){
        s +=`<option value="${row.id}">${row.name}</option>`
    }
    document.querySelector("#category_id").innerHTML=s;
}
async function AddNewLine() {
    let name = document.getElementById("name").value;
    let due_date = document.getElementById("due_date").value;
    let done_date = document.getElementById("done_date").value;
    let category_id = document.getElementById("category_id").value;
    let owner_id = document.getElementById("owner_id").value;
    let creator_id = document.getElementById("creator_id").value;
    let response = await fetch('/T/Add',{
            method: 'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({name:name,due_date:due_date,done_date:done_date,category_id:category_id,owner_id:owner_id,creator_id:creator_id})
        }
    );
    let data = await response.json();
    console.log(data);
    getList();
}
async function deleteLine(id) {
    let response = await fetch(`/T/Delete/${id}`,{
            method: 'DELETE',
        }
    );
    getList();
}
async function editLine(id) {
    let objToServer={};
    objToServer.id=id;
    objToServer.name=document.getElementById("name").value;
    objToServer.due_date=document.getElementById("due_date").value;
    objToServer.done_date=document.getElementById("done_date").value;
    objToServer.category_id=document.getElementById("category_id").value;
    objToServer.owner_id=document.getElementById("owner_id").value;
    objToServer.creator_id=document.getElementById("creator_id").value;
    let response = await fetch('/T/Update', {
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