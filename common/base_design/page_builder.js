function GetChildElementAsText(dom){
  var child_count = dom.childElementCount;
  var child_element = ""
  for (var i = 0; i < child_count; i++) {
    child_element += dom.children[i].outerHTML
  }
  return(child_element)
}
function ShowLoader(display_message){
  if( display_message == undefined ){
    display_message = "";
  }
  $(".loading_message").text(display_message);
  $(".loader_wrap").show();
}
function HideLoader(){
  $(".loader_wrap").hide();
}

function ConvertStringToHTML(str) {
  let parser = new DOMParser();
  let doc = parser.parseFromString(str, 'text/html');
  return doc;
}
function ImportScript(src, post_func){
  var script_tag = document.createElement('script');
  script_tag.src = src;
  script_tag.onload = function(){
    post_func();
  }
  document.head.appendChild(script_tag);
}
function GetHTMLAsText(url){
  var dfd = $.Deferred();
  return $.ajax({
    type: 'POST',
    url: url,
    async: true,
    datatype:'html',
    context: document
  }).done(function(data){});
}
function GetChildElementAsTextAsText(dom){
  var child_count = dom.childElementCount;
  var child_element = ""
  for (var i = 0; i < child_count; i++) {
    child_element += dom.children[i].outerHTML
  }
  return(child_element)
}

var head_node_history
var body_node_history

async function main_func(html_link){

  common_html_text = await GetHTMLAsText('/common/base_design/base_design.html');
  common_html = await ConvertStringToHTML(common_html_text);
  await $('head').html(common_html.head.childNodes);
  await $('body').html(common_html.body.childNodes);
  document.body.className = await "drawer drawer--left";

  try {
    contents_html_text = await GetHTMLAsText(html_link);
    contents_html = await ConvertStringToHTML(contents_html_text);
    contents_head_nodes_text = await GetChildElementAsText(contents_html.head);
    head_node_history = await contents_html.head.childNodes
    // $('head').append("<!-- contents head start -->");
    await $('head').append(contents_head_nodes_text);
    // $('head').append("<!-- contents head end -->");
    contents_body_nodes_text = await GetChildElementAsText(contents_html.body);
    body_node_history = await contents_html.body.childNodes
    await $('#main_contents').append(contents_body_nodes_text);
    // console.log("contents.html has been imported by page_builder.js")
  } catch (e) {
    console.log(e)
  }

  $(document).ready(function() {
    $('.drawer').drawer();
    PageTopButton()
    var hash = $(location).attr('hash');
    if(hash){
      var target = $(hash).offset().top;
      $('html, body').animate({scrollTop: target});
    }
    HideLoader();
  });
}

function BuildContents(contents_html_link){
  ImportScript("https://code.jquery.com/jquery-3.6.1.min.js",function(){
    ImportScript("https://cdnjs.cloudflare.com/ajax/libs/iScroll/5.2.0/iscroll.min.js", function(){
      ImportScript("https://cdnjs.cloudflare.com/ajax/libs/drawer/3.2.2/js/drawer.min.js", function(){
        ImportScript("https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/js/bootstrap.min.js", function(){
            main_func(contents_html_link);
        })
      })
    })
  })
}

function PageTopButton(){
  var pagetop = $('#pagetop_button');
    $(window).scroll(function () {
       if ($(this).scrollTop() > 100) {
            pagetop.fadeIn();
       } else {
            pagetop.fadeOut();
            }
       });
    pagetop.click(function () {
       $('html, body').animate({scrollTop:0});
          return false;
   });
}
