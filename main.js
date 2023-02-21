let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let sudmit = document.getElementById('sudmit');

let mood ='create';
let tem;

function getTotal()
{
if(price.value !='')
{
    let result=(+price.value + +taxes.value+ +ads.value)
    - +discount.value;
    total.innerHTML = result;
    total.style.background ='#040';     
}
else
{
    total.innerHTML ='';
total.style.background = "#a50c01";
}

}
let datapro;
if(localStorage.produrt != null){
    datapro=JSON.parse(localStorage.produrt)
}else{
    datapro=[];
}
sudmit.onclick = function(){
    let newpro ={
        title:title.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value.toLowerCase(),
    }
    if(title.value!=''){
    if(mood=== 'create'){
            if(newpro.count > 1)
            for(let i=0; i < newpro.count; i++){
                datapro.push(newpro);
            }else{
                datapro.push(newpro);
            }
        
    } else{

        datapro[   tem    ] = newpro;
        mood = 'create';
        sudmit.innerHTML = 'Create';
        count.style.display = 'block';

    }
    claerData()
}


        localStorage.setItem('produrt',JSON.stringify(datapro))

    
    showData()
}

function claerData(){
    title.value ='',
    price.value ='',
    taxes.value ='',
    ads.value ='',
    discount.value ='',
    total.innerHTML ='',
    count.value ='',
    category.value ='';

}


function showData(){

    getTotal()
    let tabel =''
   
    for(let i = 0 ; i < datapro.length ; i++){
        tabel +=  `
        <tr>
        <td>${i+1}</td>
        <td>${datapro[i].title}</td>
        <td>${datapro[i].price}</td>
        <td>${datapro[i].taxes}</td>
        <td>${datapro[i].ads}</td>
        <td>${datapro[i].discount}</td>
        <td>${datapro[i].total}</td>
        <td>${datapro[i].category}</td>
        <td><button onclick=" updateData(${i})" id="update">update</button></td>
        <td><button onclick=" deletrData(${i})" id="delete">delete</button> </td>
    </tr>
        `
    }
    document.getElementById('tbody').innerHTML=tabel;

    let btnDelete = document.getElementById('deleteAll');
    if(datapro.length>0){
        btnDelete.innerHTML=
        ` <button onclick="deleteAll()">delete All(${datapro.length})</button>  `
    }
    else{
        btnDelete.innerHTML = ''
    }

}

function deletrData(i){

datapro.splice(i,1);
localStorage.produrt=JSON.stringify(datapro);
showData()


}
function deleteAll(){
localStorage.clear()
datapro.splice(0)
showData()

}
function updateData(i){
title.value = datapro[i].title;
price.value = datapro[i].price;
taxes.value = datapro[i].taxes;
ads.value = datapro[i].ads;
discount.value = datapro[i].discount;
getTotal()
count.style.display = 'none';
category.value = datapro[i].category;
sudmit.innerHTML= 'Update';

mood = 'update';
tem = i;
scroll({ 
    top:0,
    behavior:'smooth',
})



}


let searchMood = 'title';

function getSearchMood(id)
{
    let search = document.getElementById('search');
    if(id=='searchTitle')
    {
        searchMood = 'title';
        search.placeholder = 'search By Title';
    }
     else
         {
        searchMood = 'category';
        search.placeholder = 'search By category';
         }
         search.focus()
         search.value = '';
         showData()

}



function searchData(value){
    let tabel = '';

if(searchMood=='title')
{
        for(let i = 0 ; i < datapro.length ; i++){
        if(datapro[i].title.includes(value.toLowerCase())){
            tabel +=  `
                    <tr>
                    <td>${i}</td>
                    <td>${datapro[i].title}</td>
                    <td>${datapro[i].price}</td>
                    <td>${datapro[i].taxes}</td>
                    <td>${datapro[i].ads}</td>
                    <td>${datapro[i].discount}</td>
                    <td>${datapro[i].total}</td>
                    <td>${datapro[i].category}</td>
                    <td><button onclick=" updateData(${i})" id="update">update</button></td>
                    <td><button onclick=" deletrData(${i})" id="delete">delete</button> </td>
                </tr>
                    `;
        }

 }

}
else{ 
    for(let i = 0 ; i < datapro.length ; i++){
        if(datapro[i].category.includes(value.toLowerCase())){
            tabel +=  `
                    <tr>
                    <td>${i}</td>
                    <td>${datapro[i].title}</td>
                    <td>${datapro[i].price}</td>
                    <td>${datapro[i].taxes}</td>
                    <td>${datapro[i].ads}</td>
                    <td>${datapro[i].discount}</td>
                    <td>${datapro[i].total}</td>
                    <td>${datapro[i].category}</td>
                    <td><button onclick=" updateData(${i})" id="update">update</button></td>
                    <td><button onclick=" deletrData(${i})" id="delete">delete</button> </td>
                </tr>
                    `;
        }

 }


}




document.getElementById('tbody').innerHTML=tabel;


}

