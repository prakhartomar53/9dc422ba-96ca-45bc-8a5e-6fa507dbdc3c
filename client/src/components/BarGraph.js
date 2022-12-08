import React from "react";
import Transanctions from "./transactions";
import Plot from 'react-plotly.js'
import { E } from "chart.js/dist/chunks/helpers.segment";
function BarGraph(props) {
    let data = { data: [] }
    let options = {}
    console.log(props.type);
    if (props.duration === "Annualy") {
        const monthArr = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        const monthDataExpense = [];
        const monthDataIncome = [];
        monthArr.forEach(element => {
            let incomeThisMonth = 0;
            let expenseThisMonth = 0;
            Transanctions.forEach(item => {
                if (item.date.substring(0, 3) === element) {
                    if (item.isCredited) {
                        incomeThisMonth += item.amount;
                    } else {
                        expenseThisMonth += item.amount;
                    }
                }
            })
            monthDataExpense.push(expenseThisMonth);
            monthDataIncome.push(incomeThisMonth);
        });
        data.data = [{
            x: monthArr,
            y: monthDataIncome,
            name: "Income",
            type: props.type

        },
        {
            x: monthArr,
            y: monthDataExpense,
            name: "Expense",
            type: props.type
        }
        ]
    } else if (props.duration === "Weekly") {
        var weekArr = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        var date = new Date();
        var today = date.getDay();
        var todayDate = date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear();
        todayDate = new Date(todayDate);
        // console.log(todayDate);
        // console.log(weekArr);
        // weekArr=weekArr.slice(today,weekArr.length)+weekArr.slice(0,today);
        // console.log(weekArr);
        let incomeArr = [0, 0, 0, 0, 0, 0, 0];
        let expenseArr = [0, 0, 0, 0, 0, 0, 0];
        // console.log(Transanctions.length);
        Transanctions.forEach(trans => {
            var transdate = new Date(trans.date);
            var dayDiff = todayDate.getTime() - transdate.getTime();
            dayDiff = dayDiff / (1000 * 3600 * 24);
            // console.log(dayDiff);
            if (dayDiff < 7) {
                if (trans.isCredited) {
                    incomeArr[transdate.getDay()] += trans.amount;

                } else {
                    expenseArr[transdate.getDay()] += trans.amount;

                }
            }
        })
        for (let i = 0; i < 6 - today; i++) {
            weekArr.unshift(weekArr.pop());
            incomeArr.unshift(incomeArr.pop());
            expenseArr.unshift(expenseArr.pop());
        }
        console.log(incomeArr, expenseArr);
        data.data = [{
            x: weekArr,
            y: incomeArr,
            name: "Income",
            type: props.type

        },
        {
            x: weekArr,
            y: expenseArr,
            name: "Expense",
            type:props.type
        }
        ]
    }
    else if(props.duration==="Monthly"){
        var date=new Date()
        var today=date.getDate();
        const monthArr=[];
        var incomeArr=[];
        var expenseArr=[];
        var todayDate = date.getMonth() + 1 + "/" + date.getDate()+ "/" + date.getFullYear();
        todayDate = new Date(todayDate);
        for(var i=1;i<=today;i++){
            monthArr.push(i);
            incomeArr.push(0);
            expenseArr.push(0);
        }
        Transanctions.forEach(item=>{
            var transdate=new Date(item.date);
            var dayDiff=todayDate.getTime()-transdate.getTime();
            dayDiff=dayDiff/(1000*3600*24);
            dayDiff++;
            if(dayDiff<=today){
                if(item.isCredited){
                    incomeArr[today-dayDiff]+=item.amount;
                }else{
                    expenseArr[today-dayDiff]+=item.amount;
                }
            }
        })
        data.data = [{
            x: monthArr,
            y: incomeArr,
            name: "Income",
            type: props.type

        },
        {
            x: monthArr,
            y: expenseArr,
            name: "Expense",
            type: props.type
        }
        ]
        // console.log(monthArr);

    }
    // console.log(data.data);
    return (<>
        <Plot
            data={data.data}
            layout={{ width: 980, height: 400 }}
        />

    </>)
}
export default BarGraph