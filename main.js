let min = 80.0;
let max = 160.0;
let bound = min * 3.14;
let dock = document.getElementById('mockdock');
let dockBg = document.getElementById('mockdock-bg');
let icons = Array.from(dock.children);
let baseWidth = (icons.length * min);

icons.forEach((icon,i) => {
    icon.setAttribute('style','left:'+ i * min +'px');
    var anchors = icon.getElementsByTagName('a');
    if (anchors.length === 1) {
    var span = document.createElement('span');
    span.innerHTML = anchors[0].getAttribute('data-icon');
    icon.appendChild(span);
    }
});

dock.style.width = baseWidth +'px';
dockBg.style.width = baseWidth +'px';

dock.addEventListener('mousemove', function(e){
    var mouseX = e.clientX - dock.offsetLeft;
    scaleIcons(mouseX);
});

dock.addEventListener('mouseout', function(e){
    resetIconScale();
});

function resetIconScale(){
    for (var i=0; i < icons.length; i++) {
    icons[i].setAttribute('style','transition: .2s;left:'+ i * min +'px');
    }
    dockBg.setAttribute('style','transition: .3s;width:' + baseWidth + 'px;translate:0px');
}

function scaleIcons(x){
  var totalWidth = 0.0;
  var barLeft = 0.0;

  for (var i=0; i < icons.length; i++) {
    var left = 0.0;
    var iconWidth = min * 1.0;
    var distance = ((i*min) + (min/2)) - x;
    if (-bound < distance && distance < bound){
      var rad = (distance/min) * 0.5;
      var scale = 1.0 + ((max/min) - 1) * Math.cos(rad);
      left = (i*min) + 2*(max-min) * Math.sin(rad);
      iconWidth = scale * min;
      icons[i].setAttribute('style','left:'+ left +'px;transform:scale('+ scale +')');
    } else {
      left = (-bound < distance) ? (i*min) + 2*(max-min) : (i*min) - 2*(max-min);
      icons[i].setAttribute('style','left:'+ left +'px');
    }

    totalWidth += iconWidth;
    if (i === 0) barLeft = left - ((iconWidth - min) * 0.5);
  }

  var widthDiff = totalWidth - baseWidth;
  var shift = barLeft + (widthDiff * 0.5);
  dockBg.setAttribute('style','transition: 0s;width:' + totalWidth + 'px;translate:'+ shift +'px');
}
