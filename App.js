window.addEventListener('load' ,function(){
        let form=document.querySelector('form');
        form.addEventListener('submit',handleSubmit);

});

function handleSubmit(){
            event.preventDefault();

            let form=new FormData(event.target);
            let display=document.querySelector("#display");
            let searchTerm=form.get('searchTerm');
            let sortBased=form.get('sortBased');
            let sortOrder=form.get('sortOrder');
            console.log(searchTerm,sortBased,sortOrder)
            
            if(searchTerm!=""){
                handleDate(searchTerm,sortBased,sortOrder,printData);
            }
            else{
                displayErrorMessage();
            }
}

function displayErrorMessage(){
        
        display.innerHTML="";
        display.textContent=`enter a valid input `
}

function handleDate(q,sort,order,printData){

    let xhr=new XMLHttpRequest();
    
    let url=`https://api.github.com/search/repositories?q=${q}&sort=${sort}&order=${order}`;
    xhr.open('GET',url,true);
    xhr.send();
    xhr.onload=function(){
        if(xhr.status===200){
            let resDate=JSON.parse(xhr.response).items;
            printData(resDate)
        }
    }

}

function printData(data){
    display.innerHTML="";
    let table=document.createElement('table');
    let thead=document.createElement('thead');
    let theadRow=document.createElement('tr');
    let th1=document.createElement('th');
    th1.textContent='DISPLAY LANGUAGE';
    let th2=document.createElement('th');
    th2.textContent='REPO LINK';
    let th3=document.createElement('th');
    th3.textContent='DESCRIPTION';
    theadRow.append(th1,th2,th3);
    thead.append(theadRow);
let tbody=document.createElement('tbody');
    for(let i=0;i<data.length;i++){
        let current=data[i];
        console.log(current)
        let tBodyRow=document.createElement('tr');
        let td1=document.createElement('td');
        td1.textContent=current['language'];
        let td2=document.createElement('td');
        td2.innerHTML=`<a href=${current['html_url']}>${current['html_url']}</a>`;
        let td3=document.createElement('td');
        td3.textContent=current['description'];
        tBodyRow.append(td1,td2,td3);
        tbody.append(tBodyRow)
    }
    table.append(thead);
    table.append(tbody);
    display.append(table);
}