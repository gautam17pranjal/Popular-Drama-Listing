
var base_url = "" // enter base url
var url = new URL(window.location.href);
var page = url.searchParams.get("page");
var pre;
if(page == null || Number(page) <= 1 || Number(page)>10){
    page = 1
    pre = 1;
}
else{
    pre = Number(page)-1;
}
var next = document.getElementById("next-link");
var nxt = Number(page)+1;
next.setAttribute("href", base_url+"?page="+nxt);
var prev = document.getElementById("prev-link");

prev.setAttribute("href", base_url+"?page="+pre);
var curr = document.getElementById("curr-link");
var cur = Number(page);
curr.innerHTML = page;
collect_data(page)

function collect_data(page){
    var settings = {
        "url": "https://mydramalist.com/shows/top?page="+page,
        "method": "GET",
        "timeout": 0,
        "headers": {
        },
    }; 
    var box = [];
    $.ajax(settings).done(function (response) {
        var main = jQuery(response).find('.box');
        var id = new RegExp("mdl-*");
        for(var i=0; i<main.length; i++){
            if(id.test($(main[i]).attr('id'))){
                var s_info = $(main[i]).find('.text-muted').text().split(',');
                var cover = $(main[i]).find('img').attr('src').split("s.jpg");
                var item = {
                    "cover": cover[0]+"f.jpg",
                    "title": $(main[i]).find('h6').text(),
                    "short_info": s_info[0]+"<br>"+s_info[1],
                    "score": $(main[i]).find('.score').text(),
                    "link": "https://mydramalist.com"+$(main[i]).find('.title').find('a').attr('href')
                };
                box.push(item);
            }
        }
        make_data(box);
    });
}

function make_data(box){
    for(var i=0; i<box.length; i++){
        var drama = document.createElement("div");
        drama.setAttribute("class", "item");
        drama.innerHTML = `
            <div class="cover">
                <a href="${box[i]["link"]}" target="_blank"><img src="${box[i]["cover"]}" alt="${box[i]["title"]}"></a>
            </div>
            <div class="info">
                <h5 class="name">${box[i]["title"]}</h5>
                <span class="short_info">${box[i]["short_info"]}</span>
                <br><br>
                <span class="score">${box[i]["score"]}</span>
            </div>
        `;
        document.getElementById("mainContent").append(drama);
    }
}
