/**
 * Created by chj on 17-7-19.
 */
"use strict"
let readlineSync = require('readline-sync');
appInit();

function appInit() {
    let studentArray=[];
    let exit=1;
    while(exit){
    let choose=readlineSync.question(`1.添加学生
2.生成成绩单
3.退出
请输入你的选择（1～3）：`);
    switch (choose){
        case '1':addStu(studentArray);break;
        case '2':printSheet(studentArray);break;
        case '3':exit=0;break;
    }
    }
    console.log("thanks");
}
function addStu(stuArray) {

    let stu=readlineSync.question("请输入学生信息(格式：姓名,学号,民族,班级,学科:成绩...)，按回车提交:");
    let temp=stu.split(',');
    if(temp.length>=5){

        for(let i=4;i<temp.length;i++){

                temp[i]=temp[i].split(':');
            }

        stuArray.push(temp);
        console.log(`学生${temp[0]}的成绩被添加`);
        console.log(stuArray);
    }
}
function printSheet(stuArray) {
    let stu=readlineSync.question("请输入要打印的学生的学号（格式： 学号, 学号,...），按回车提交：");
    let temp=stu.split(',');
    let stuToPrint=stuArray.slice();
    for (let i=stuToPrint.length-1;i>=0;i--) {
        if (temp.indexOf(stuArray[i][1]) == -1) {
            stuToPrint.splice(i,1);
        }
    }
    let sums=getSumArray(stuToPrint);
    let aves=getAveArray(stuToPrint);
    let sumMid=calSumMid(sums);
    let sumAve=calSumAve(sums);
    let subjects=getSubjectArray(stuToPrint);
    let str="**成绩单***\n";
    str+="姓名";
    let subStr="";
    let scoreStr="";
    for(let i in subjects){
        subStr+="|"+subjects[i];
    }
    subStr+="|平均分|总分\n";
    str+=subStr;
    str+="==================\n";
    for (let i in stuToPrint){

            scoreStr+=stuToPrint[i][0];
            for(let j in stuToPrint[i]){
                if(stuToPrint[i][j].length==2){
                    scoreStr+="|"+stuToPrint[i][j][1];
                }
            }
            scoreStr+="|"+aves[i]+"|"+sums[i]+"\n";
    }
    str+=scoreStr;
    str+="总平均分："+sumAve+"\n"+"总分中位数："+sumMid;
    console.log(str);
}

function getSumArray(stuArray) {
    let sumArray=[];
    let sum=0;
    for(var i in stuArray){
        sum=0;
        for(var j in stuArray[i]){
            if(stuArray[i][j].length==2){
              sum+=parseFloat(stuArray[i][j][1]);
            }
        }
        sumArray.push(sum);
    }
    return sumArray;
}
function calSumAve(sumArray) {
    var sum=0;
    var sumAve=0;
    for(var i in sumArray){
        sum+=sumArray[i];
    }
    sumAve=sum/sumArray.length;
    return sumAve;
}
function calSumMid(sumArray) {
    var sumMid=0;
    var orderedSumArray=sumArray.slice().sort();
    if(orderedSumArray.length%2==0){
        sumMid=(orderedSumArray[orderedSumArray.length/2]+orderedSumArray[(orderedSumArray.length/2)-1])/2
    }
    else{
        sumMid=orderedSumArray[(orderedSumArray.length-1)/2];
    }
    return sumMid;
}
function getAveArray(stuArray) {
    let aveArray=[];
    let sum=0;
    for(var i in stuArray){
        sum=0;
        for(var j in stuArray[i]){
            if(stuArray[i][j].length==2){
                sum+=parseFloat(stuArray[i][j][1]) ;
            }
        }

        aveArray.push(sum/(stuArray[i].length-4));
    }
    return aveArray;
}
function getScoreArray(stuArray) {
    let scoreArray=[];
    let score=[];
    let sum=0;
    for(var i in stuArray){
        score=[];
        score.push()
        for(var j in stuArray[i]){
            if(stuArray[i][j].length==2){
                score.push(stuArray[i][j][1]);
            }
        }
        scoreArray.push(score);
    }
    return scoreArray;

}
function getSubjectArray(stuArray) {
    let subjectArray=[];
    for(let i in stuArray[0]){
        if(stuArray[0][i].length==2){
            subjectArray.push(stuArray[0][i][0]);
        }
    }
    return subjectArray;
}
