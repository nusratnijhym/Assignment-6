//selecting from html
const searchBtn=document.getElementById('search-btn');
const searchInput=document.getElementById('search-input');
const singlePhone=document.getElementById('single-phone')

const row=document.getElementById('row');

searchBtn.addEventListener('click',()=>{
 row.innerHTML=''
 singlePhone.innerHTML=''
 
 
 
 
 //calling api 
 const url=`https://openapi.programming-hero.com/api/phones?search=${searchInput.value}`;
 
 
 fetch(url)
 .then(res=>res.json())
 .then(data=>{
   data=data.data.slice(0,20)
   if(data.length==0) {
     console.log("kali")
     document.getElementById('error').style.display='block';
     document.getElementById('error').innerText=`No phone found for ${searchInput.value}`
   }else{
     showPhone(data)
     console.log(data);
     document.getElementById('error').innerText=''
   }
   
   
   
 })
 
 
})





let showPhone=(something)=>{
 // console.log(something);
  
  something.forEach(item=>{
   // console.log(item);
    
    const div=document.createElement('div');
    div.classList.add('col-md-4');
    div.innerHTML=`
          <div class="card mt-5">
  <img src="${item.image}" class="card-img-top " alt="...">
  <div class="card-body">
    <h5 class="card-title">Phone Name :${item.phone_name}</h5>
        <h5 class="card-title">Model :${item.brand}</h5>
    <button onclick="showDetails('${item.slug}')" class="btn btn-danger"  >Explore</button>
  </div>
</div>`
    
    ;
    row.appendChild(div);
    
  })
  
  
}


let showDetails=(slug)=>{
  
  
  const url=`https://openapi.programming-hero.com/api/phone/${slug}`;
  
 
  fetch(url)
  .then(res=>res.json())
  .then(data=>{
    console.log(data.data);
    singlePhone.innerHTML=`
    
       <img src="${data.data.image}" class="img-fluid" alt="">
   <table class="table table-striped">
  <thead>
    <tr>
      <th scope="col">Phone Name</th>
      <th scope="col">${data.data.name}</th>
      
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">Release Date</th>
      
      <td>${data.data.releaseDate}</td>
    </tr>
    <tr>
      <th scope="row">chipset</th>
      <td>${data.data.mainFeatures.chipSet}</td>
      
      
    </tr>
        <tr>
      <th scope="row">memory</th>
      <td>${data.data.mainFeatures.memory}</td>
    </tr>
    <tr>
      <th scope="row">Sensors</th>
      <td>
      
      ${data.data.mainFeatures.sensors[0]}
            <br>
      ${data.data.mainFeatures.sensors[1]}
            <br>
      ${data.data.mainFeatures.sensors[2]}
            <br>
      ${data.data.mainFeatures.sensors[3]}
            <br>
      ${data.data.mainFeatures.sensors[4]}
                  <br>
      ${data.data.mainFeatures.sensors[5]}
      
      </td>
     
    </tr>
    
            <tr>
      <th scope="row">Others</th>
      <td>
      <b>WLAN</b>${data.data.others.WLAN} </br>
       <b>Bluetooth</b>${data.data.others.Bluetooth} </br>
       <b>GPS</b>${data.data.others.WLAN} </br> <b>WLAN</b>
       ${data.data.others.GPS} </br>
      
   }
      
      </td>
    </tr>
  </tbody>
</table>
   
   `
    
    
    
    
    
  })
  
}
