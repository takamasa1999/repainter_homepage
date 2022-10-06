function SetScript(src_dir) {
  var head = document.head;
  var script_tag = document.createElement('script');
  script_tag.setAttribute('src', src_dir);
  head.appendChild(script_tag)
}
function SetCSS(src_dir) {
  var head = document.head;
  var link_tag = document.createElement('link');
  link_tag.setAttribute('rel', 'stylesheet');
  link_tag.setAttribute('href', src_dir);
  head.appendChild(link_tag)
}
function SetOthers(html_str) {
  var head = document.head;
  var tag = document.createElement(html_str)
  head.append(tag)
}
function GetChildElement(dom){
  var child_count = dom.childElementCount;
  var child_element = ""
  for (var i = 0; i < child_count; i++) {
    child_element += dom.children[i].outerHTML
  }
  return(child_element)
}