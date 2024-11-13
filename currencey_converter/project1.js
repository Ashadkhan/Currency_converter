// to convert -> we add thi to link (&currencies=EUR%2CUSD%2CCAD)
const base_url="https://api.currencyapi.com/v3/latest?apikey=cur_live_DMVcfPhhTxaDsscrR0Qe2xPTA7VjaDiHXt0pZEnR";
const from_url="&base_currency="
const to_url="&curreurlncies=";    
const from_currancy=document.querySelector(".from select");
const to_currancy=document.querySelector(".to select");
const dropdown=document.querySelectorAll(".dropdown select");
const btn=document.querySelector("button");
for(let select of dropdown)
{
    for(currcode in countryList)
        {
            let newoption=document.createElement("option");
            newoption.innerText=currcode;
            newoption.value=currcode
            if (select.name==="from"&&currcode==="USD") {
                newoption.selected="seleceted";
            }
            if (select.name==="to"&&currcode==="INR") {
                newoption.selected="seleceted";
            }
            select.appendChild(newoption);
        }
        select.addEventListener("change",(evt)=>{
            updateflage(evt.target);
        });
}

const updateflage=(element)=>{
    let currcodes=element.value;
    let counterycode=countryList[currcodes];
    let newsrc=`https://flagsapi.com/${counterycode}/flat/64.png`
    let img=element.parentElement.querySelector("img")
    img.src=newsrc;
}
const updatemsg=(final_amount,amtval)=>{
    document.querySelector(".msg").innerText=`${amtval} ${from_currancy.value} = ${final_amount} ${to_currancy.value}`;
}

btn.addEventListener("click",async(evt)=>{
    evt.preventDefault();
    let amount =document.querySelector(".amount input");
    let amtval=parseInt(amount.value);
    if(amtval===""||amtval<1)
    {
        amtval=1;
        amount.value=1;
    }
    const from_curr= from_currancy.value
    const to_curr= to_currancy.value
    const url=`${base_url}${from_url}${from_curr}${to_url}${to_curr}`
    let response=await fetch(url);
    let rjson=await response.json();    
    let rate=rjson.data[to_curr].value;
    let final_amount=amtval*rate;
    console.log(final_amount);
    updatemsg(final_amount,amtval,);

})