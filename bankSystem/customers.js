customers = getCustomers()
addbtn = document.querySelector('#addbBtn')
showAllBtn = document.querySelector('#showAllBtn')
showSingleCustmor= document.querySelector("#showBtn")
IdDetalisBtn = document.querySelector("#showDetalis")
addBalanceBtn =document.querySelector("#addBalanceBtn")
getValueAddbalance =document.querySelector("#add")
SubBalanceBtn = document.querySelector("#withDrawBtn")
getValueWithDraw =document.querySelector("#sub")


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
      let name=  btnName.textContent=txt2
        console.log(name);
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

function getbyID(id){

   x=  customers.findIndex(e=>
        e.accNum==id
        )
       console.log(x);
       return x
    }
IdDetalisBtn.addEventListener("click",function(){
   let IdNumber = Number(document.querySelector("#id").value)
   let IdDetalisSec = document.querySelector(".IdDetalisSec")
   IdDetalisSec.innerHTML=""
     index= getbyID(IdNumber)

    if(index== -1 && isNaN(IdNumber)){
        h1 = document.createElement("h1")
        h1.textContent =`Numbers only Allowed`
        IdDetalisSec.appendChild(h1)
       
      }else if(index== -1){
        h1 = document.createElement("h1")
        h1.textContent =`${IdNumber} does not exist`
        IdDetalisSec.appendChild(h1)
      }
      else{
        h1 = document.createElement("h1")
        h1.textContent =customers[index].accNum
        h2 = document.createElement("h2")
        h2.textContent =customers[index].cName
        h3 = document.createElement("h3")
        h3.textContent =customers[index].balance
        // button = document.createElement("button")
        // button.textContent="Clear"
        IdDetalisSec.appendChild(h1)
        IdDetalisSec.appendChild(h2)
        IdDetalisSec.appendChild(h3)
        // IdDetalisSec.appendChild(button)
        //  button.addEventListener("click",function(){
        //     IdDetalisSec.innerHTML=
        //  }
    
     
    
        
      }

})


addBalanceBtn.addEventListener("click",function(e){
    showHide(addBalanceBtn, 'addbalace', 'Add Balance','Hide Balance');

 
})
getValueAddbalance.addEventListener("click",function(){
    
  
   let getValue= Number(document.querySelector("#addbalace input").value)
    console.log(getValue);
    let addbalance= document.getElementById("addbalance")
    addbalance.innerHTML=""

    index= getbyID(getValue)
    console.log(index);

    if(index== -1 && isNaN(getValue) ){
        h3 = document.createElement("h3")
            h3.textContent =`Numbers only Allowed`
            addbalance.appendChild(h3)
    }else if(index== -1){
        h3 = document.createElement("h3")
        h3.textContent =`${getValue} not exist`
        addbalance.appendChild(h3)
    }else if(customers[index].accNum == getValue){
      
        let valuew= Number(customers[index].balance)
        h3 = document.createElement("h3")
            h3.textContent =`Welcome back ${customers[index].cName} Your Balance ${customers[index].balance}`
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
                if(isNaN(value)){
                    h3.textContent =`numbers only allowed`
                }else{
                   
                    console.log(typeof(value));
                    valuew+=value
                    console.log(valuew);
                    h3.textContent =`Your Balance ${valuew}`
                customers[index]={
                accNum:customers[index].accNum,
                cName :customers[index].cName,
                balance:valuew,
                
              }      
            // customers.push(customers)
            localStorage.setItem("customers", JSON.stringify(customers))

            console.log(customers);
                    
                }
                        
                        
                        })
                        addbalance.appendChild(button)
    }
    // customers.forEach(e=>{
    //     let id =e.accNum
    //     if(getValue == id){
    //         let valuew= Number(e.balance)
    //         h3 = document.createElement("h3")
    //         h3.textContent =`Welcome back ${e.cName} Your Balance ${e.balance}`
    //         addbalance.appendChild(h3)
    //         input= document.createElement("input")
    //         input.setAttribute("placeholder","How much you want to add")
    //         input.className="form-control handelValue"
    //         addbalance.appendChild(input)
    //         button = document.createElement("button")
    //         button.textContent="Add"
    //         button.className ="btn btn-primary"
    //         button.addEventListener("click", function(){
    //            value= Number(document.querySelector(".handelValue").value)
    //             console.log(typeof(value));
    //             valuew+=value
    //             console.log(valuew);
    //             h3.textContent =`Your Balance ${valuew}`
    //         })
    //         addbalance.appendChild(button)
            
    //     }  
        
    // }
    // )
   
})

SubBalanceBtn.addEventListener("click",function(e){
    showHide(withDrawBtn, 'withDraw', 'withDraw from Balance','Hide Balance');
})

getValueWithDraw.addEventListener("click",function(){
    
    let getValue= document.querySelector("#withDraw input").value
     console.log(getValue);
     let subBalance= document.getElementById("subbalance")
     subBalance.innerHTML=""
   
     customers.forEach(e=>{
         let id =e.accNum
         if(getValue == id){
             let valuew= Number(e.balance)
             h3 = document.createElement("h3")
             h3.textContent =`Welcome back ${e.cName} Your Balance ${e.balance}`
             subBalance.appendChild(h3)
             input= document.createElement("input")
             input.setAttribute("placeholder","How much you want to add")
             input.className="form-control handelValue"
             subBalance.appendChild(input)
             button = document.createElement("button")
             button.textContent="Sub"
             button.className ="btn btn-primary"
             button.addEventListener("click", function(){
                value= Number(document.querySelector(".handelValue").value)
                 console.log(typeof(value));
                
                 if(value <= valuew){
                    valuew-=value
                    console.log(valuew);
                    h3.textContent =`Your Balance ${valuew}`
                   
                 }else{
                    myNewBalance= document.createElement("h3")
                    subBalance.textContent=""
                    myNewBalance.textContent =`"You dont have enough credit"`
                    subBalance.appendChild(myNewBalance)
                 }
             })
             subBalance.appendChild(button)
             
         }         
         
     }
     )
    
 })
 

//  const ButtonLoop =document.querySelectorAll('.sw').forEach((section,index)=>{
//     let call= 
//     console.log(call);
//     section.addEventListener("click", function(e){
//         if (index== e.target) {
//             section.innerText="7ob"
//         }else{

//             section[index].classList.remove("sw")
//         }
         
//     })

// })

  
    // if(btnName.innerText == txt1 ){
    //   let name=  btnName.textContent=txt2
    //     console.log(name);
    //     document.querySelector(`#${sectionId}`).classList.remove('d-none');
    // }else{
    //     btnName.textContent=txt1
    // }
    

