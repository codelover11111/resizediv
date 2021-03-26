export function init({selector, dragLeft, dragRight, dragTop, dragBottom}) {
  console.log(selector);

  dragElement(document.querySelectorAll(selector + " div"));
  function dragElement(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0, direction = "left";
    let originX = 0, originY = 0, width = 0, height = 0, left = 0, right = 0, top = 0, bottom = 0;
    for (let i = 0; i < elmnt.length; i++) {
      elmnt[i].onmousedown = dragMouseDown;
      function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        // check which line is dragging
        let selectElmnt = elmnt[i].className;
        if(selectElmnt === "") {
          direction = elmnt[i].getAttribute("data-resize_handle");
        }else {
          if(selectElmnt.indexOf("left") !== -1) direction = "left";
          else if(selectElmnt.indexOf("right") !== -1) direction = "right";
          else if(selectElmnt.indexOf("top") !== -1) direction = "top";
          else if(selectElmnt.indexOf("bottom") !== -1) direction = "bottom";
        }
        let computedStyle = getComputedStyle(document.querySelectorAll(selector)[0]);
        width = document.querySelectorAll(selector)[0].offsetWidth;
        width -= parseFloat(computedStyle.paddingLeft) + parseFloat(computedStyle.paddingRight);
        height = document.querySelectorAll(selector)[0].offsetHeight;
        height -= parseFloat(computedStyle.paddingTop) + parseFloat(computedStyle.paddingBottom);
        left = document.querySelectorAll(selector)[0].offsetLeft;
        right = screen.width - left - width - parseFloat(computedStyle.paddingLeft) - parseFloat(computedStyle.paddingRight);
        top = document.querySelectorAll(selector)[0].offsetTop;
        bottom = window.innerHeight - top - height - parseFloat(computedStyle.paddingTop) - parseFloat(computedStyle.paddingBottom);
        console.log(left, right, top, bottom)
        pos3 = originX = e.clientX;
        pos4 = originY = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
      }
  
      function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        switch(direction) {
          case "left": {
            elmnt[i].style.left = (elmnt[i].offsetLeft/2 - pos1) + "px";
            document.querySelectorAll(selector)[0].style.left = "auto";
            document.querySelectorAll(selector)[0].style.right = right + "px";
            document.querySelectorAll(selector)[0].style.width = (width + ((-1) * pos3 + originX)) + "px";
            break;
          }
          case "right": {
            elmnt[i].style.left = (elmnt[i].offsetLeft - pos1) + "px";
            document.querySelectorAll(selector)[0].style.left = left + "px";
            document.querySelectorAll(selector)[0].style.right = "auto";
            document.querySelectorAll(selector)[0].style.width = (width + (pos3 - originX)) + "px";
            break;
          }
          case "top": {
            elmnt[i].style.top = (elmnt[i].offsetTop/2 - pos2) + "px";
            document.querySelectorAll(selector)[0].style.top = "auto";
            document.querySelectorAll(selector)[0].style.bottom = bottom + "px";
            document.querySelectorAll(selector)[0].style.height = height + ((-1) * pos4 + originY) + "px";
            break;
          }
          case "bottom": {
            elmnt[i].style.top = (elmnt[i].offsetTop - pos2) + "px";
            document.querySelectorAll(selector)[0].style.top = top + "px";
            document.querySelectorAll(selector)[0].style.bottom = bottom + "px";
            document.querySelectorAll(selector)[0].style.height = height + (pos4 - originY) + "px";
          }
        }
      }
  
      function closeDragElement() {
        /* stop moving when mouse button is released:*/
        document.onmouseup = null;
        document.onmousemove = null;
      }
    }
  }

  dropElement();
  function dropElement() {

  }
}