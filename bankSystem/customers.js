customers = getCustomers()
addbtn = document.querySelector('#addbBtn')
showAllBtn = document.querySelector('#showAllBtn')
showSingleCustmor= document.querySelector("#showBtn")
IdDetalisBtn = document.querySelector("#showDetalis")
addBalanceBtn =document.querySelector("#addBalanceBtn")
getValueAddbalance =document.querySelector("#add")


function getCustomers(){
    return(JSON.parse(localStorage.getItem('customers')) || [])
}
const saveCustomers = function(){
    localStorage.setItem('customers', JSON.stringify(customers))
}
const showAllCustomers = function(){
    // customers = getCustomers()
    tableBody = document.querySelector('tbody')
    tableBody.innerText=''
    customers.forEach(customer=>{
        console.log(customer)
        let tr = document.createElement('tr')
        td = document.createElement('td')
        td.textContent = customer.accNum
        tr.appendChild(td)
        td = document.createElement('td')
        td.textContent = customer.cName
        tr.appendChild(td)
        td = document.createElement('td')
        td.textContent = customer.balance
        tr.appendChild(td)
        tableBody.appendChild(tr)
    })
    console.log(customers)
}
const addCustomer = function(customer){
    customers.push(customer)
    saveCustomers()
}
const showHide = function(btnName,sectionId,txt1, txt2) {
    document.querySelectorAll('section').forEach((section, index)=>{
        if(index!=0) section.classList.add('d-none')
    })
    if(btnName.innerText == txt1 ){
        btnName.textContent=txt2
        document.querySelector(`#${sectionId}`).classList.remove('d-none');
    }else{
        btnName.textContent=txt1
    }
    
}
addbtn.addEventListener('click', function(){
    showHide(addbtn, 'addCustomer', 'Add Customer','Hide Customer')
})
showAllBtn.addEventListener('click',function(e){
    showHide(showAllBtn, 'allCustomers', 'show All Customer','Hide customers')
    showAllCustomers();
})
document.querySelector('#addForm').addEventListener('submit',function(e){
    e.preventDefault()
    const ele = this.elements
    console.log(ele);
    let user = {
        accNum : Date.now(),
        cName: ele.cName.value,
        balance: ele.balance.value
    }
    addCustomer(user)
    this.reset()
    showHide()
})   
function showData(x){
    table = document.querySelector('hele')
    td = document.createElement('p')
    td.textContent = x.accNum
    table.appendChild(td)

}
showSingleCustmor.addEventListener("click",function(){
    showHide(showSingleCustmor, 'singleCustomer', 'show customers','Hide customers');
 
})
IdDetalisBtn.addEventListener("click",function(){
   let IdNumber = document.querySelector("#id").value
   let IdDetalisSec = document.querySelector(".IdDetalisSec")

   IdDetalisSec.innerHTML=""
        // IdDetalisSec.innerHTML=""

        if(Number(IdNumber)){
            
            customers.forEach(e=>{
            let idForeach=e.accNum
            if(IdNumber == idForeach){
                h1 = document.createElement("h1")
                h1.textContent =e.accNum
                h2 = document.createElement("h2")
                h2.textContent =e.cName
                h3 = document.createElement("h3")
                h3.textContent =e.balance
                button = document.createElement("button")
                button.textContent="Clear"
                button.addEventListener("click",function(){
                    IdDetalisSec.innerHTML=""
                })
                button.className ="btn btn-primary"
                IdDetalisSec.appendChild(h1)
                IdDetalisSec.appendChild(h2)
                IdDetalisSec.appendChild(h3)
                IdDetalisSec.appendChild(button)
            }         
            })
//    
        }else{
            h1 = document.createElement("h1")
            h1.textContent ="Please Right Numbers only"
            IdDetalisSec.appendChild(h1)
            
        }     
   console.log(customers)
console.log();
})

addBalanceBtn.addEventListener("click",function(e){
    showHide(addBalanceBtn, 'addbalace', 'Add Balance','Hide Balance');

 
})
getValueAddbalance.addEventListener("click",function(){
    
   let getValue= document.querySelector("#addbalace input").value
    console.log(getValue);
    let addbalance= document.getElementById("addbalance")
    addbalance.innerHTML=""
    customers.forEach(e=>{
        let id =e.accNum
        if(getValue == id){
            let valuew= Number(e.balance)
            h3 = document.createElement("h3")
            h3.textContent =`Welcome back ${e.cName} Your Balance ${e.balance}`
            addbalance.appendChild(h3)
            input= document.createElement("input")
            input.setAttribute("placeholder","How much you want to add")
            input.className="form-control handelValue"
            addbalance.appendChild(input)
            button = document.createElement("button")
            button.textContent="Add"
            button.className ="btn btn-primary"
            button.addEventListener("click", function(){
               value= Number(document.querySelector(".handelValue").value)
                console.log(typeof(value));
                valuew+=value
                console.log(valuew);
                h3.textContent =`Your Balance ${valuew}`
            })
            addbalance.appendChild(button)
            
        }         
        
    }
    )
   
})
