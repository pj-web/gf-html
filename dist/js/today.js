function today() {
    d=new Date();
    p=new Date(d.getTime());
    monthA="января,февраля,марта,апреля,мая,июня,июля,августа,сентября,октября,ноября,декабря".split(",");
    document.write(p.getDate()+" "+monthA[p.getMonth()]+" "+p.getFullYear()) + " г. ";
}

console.log(today());