let arr=['apple','banana','apple','banana','carrat','apple']
let js={}
for(let i=0;i<arr.length;i++){
   
    let tar=arr[i]
    let count=0;
    for(let j=0;j<arr.length;j++){
       if(arr[j]==tar){
        count++
       }
    }
   
  
   js[tar]=count
   count=0
}
console.log(js);
console.log(js.apple)
