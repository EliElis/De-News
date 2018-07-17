'use strict';
let date;
let getNews = () =>{
	  const xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
		date = JSON.parse(this.responseText);
		
		for(let i = 0; i < document.getElementsByClassName("article").length; i++){
			document.getElementsByClassName("title")[i].innerHTML=date[i].title;
			document.getElementsByClassName("description")[i].innerHTML=date[i].description;
			let dateArr = date[i].date.split(' ');
			document.getElementsByClassName("day")[i].innerHTML = dateArr[0];
			document.getElementsByClassName("month")[i].innerHTML = dateArr[1];
			document.getElementsByClassName("img")[i].innerHTML="<img src ='img/"+date[i].img+"'>";
			document.getElementsByClassName("video")[i].innerHTML="<img src ='img/"+date[i].img+"'>";
		}
    }
  };
  xhttp.open("GET", "db.json", true);
  xhttp.send();
}

getNews();
