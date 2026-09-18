
const routes={
 "Rupin Pass":{score:78,cal:1240,alt:4650},
 "Roopkund":{score:82,cal:1320,alt:5029},
 "Ladakh Circuit":{score:74,cal:1180,alt:5360},
 "Kedarkantha":{score:61,cal:980,alt:3810}
};
let current="Rupin Pass";
function selectTrek(name){
 current=name; const r=routes[name];
 const n=document.querySelector("#selectedName"); if(n)n.textContent=name;
 ["score","rScore"].forEach(id=>{const e=document.getElementById(id);if(e)e.textContent=r.score});
 const c=document.getElementById("calories");if(c)c.textContent=r.cal.toLocaleString()+" kcal";
 const rc=document.getElementById("rCal");if(rc)rc.textContent=r.cal.toLocaleString();
 const t=document.getElementById("analysisText");if(t)t.textContent=`${name} selected. Maximum altitude: ${r.alt.toLocaleString()} m.`;
}
function runAnalysis(){
 const w=Math.max(30,Number(document.getElementById("weight")?.value)||65);
 const h=Math.max(100,Number(document.getElementById("height")?.value)||170);
 const bmi=w/Math.pow(h/100,2), r=routes[current];
 const fit=document.getElementById("fitness")?.value||"Moderate";
 const bonus={Beginner:7,Moderate:3,Good:0,Excellent:-3}[fit]||0;
 const score=Math.max(35,Math.min(95,r.score+bonus+(bmi<18.5?5:0)));
 const cal=Math.round(r.cal*w/65);
 const set=(id,v)=>{const e=document.getElementById(id);if(e)e.textContent=v};
 set("rBmi",bmi.toFixed(1));set("rScore",score);set("score",score);set("rCal",cal.toLocaleString());set("calories",cal.toLocaleString()+" kcal");
 set("analysisText",`Analysis complete for ${current}. BMI ${bmi.toFixed(1)}, fitness ${fit}, estimated burn ${cal.toLocaleString()} kcal.`);
}
document.querySelectorAll("[data-route]").forEach(c=>c.addEventListener("click",()=>selectTrek(c.dataset.route)));
