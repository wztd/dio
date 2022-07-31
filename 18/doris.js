let req = new XMLHttpRequest();
var data;
req.onreadystatechange = () => {
  if (req.readyState == XMLHttpRequest.DONE) {
    data = JSON.parse(req.responseText).record;
	if (data.opened){
		$('body').html('').addClass('no');
	} else {
		updatejsonbin();
	}
  }
};

req.open("GET", "https://api.jsonbin.io/v3/b/62d9457d2c868775a5319951", true);
req.setRequestHeader("X-Master-Key", "$2b$10$ILPD./C/R7smh3bpdrFLlO8JNIXolEdObNlD.sqw6vJITh7vkAPni");
req.send();
var loadingText = $('#loading>div>span');
const loader = setInterval(function(){
	if(loadingText.text().length==10){
		loadingText.text('Loading');
	} else {
		loadingText.text(loadingText.text()+'.');
	}
	if($('#loaderbar>div').innerWidth()<($('#loaderbar').innerWidth()-2)/4*3){
		$('#loaderbar>div').animate({
		  width: $('#loaderbar>div').innerWidth()+($('#loaderbar').innerWidth()-2)/13
		},500)
	}
}, 500);

function updatejsonbin(){
	data.opened=true;
	data.statCount+=1;
	let req = new XMLHttpRequest();
	req.open("PUT", "https://api.jsonbin.io/v3/b/62d9457d2c868775a5319951", true);
	req.setRequestHeader("Content-Type", "application/json");
	req.setRequestHeader("X-Master-Key", "$2b$10$ILPD./C/R7smh3bpdrFLlO8JNIXolEdObNlD.sqw6vJITh7vkAPni");
	req.send(JSON.stringify(data));
}

$(window).on('load', function(){
	setTimeout(function(){
		$('#loaderbar>div').animate({
		  width: "100%"
		},1500);
		setTimeout(function(){
			clearInterval(loader);
			loadingText.text('Loaded!!');
			$('#loading').addClass('loaded');
			setTimeout(function(){$('#loaderbar').remove();$('#start').show()},1500)
		},1500)
	},1500)
});

function toggleFullScreen() {
	document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.msFullscreenElement ? document.exitFullscreen ? document.exitFullscreen() : document.msExitFullscreen ? document.msExitFullscreen() : document.mozCancelFullScreen ? document.mozCancelFullScreen() : document.webkitExitFullscreen && document.webkitExitFullscreen() : document.documentElement.requestFullscreen ? document.documentElement.requestFullscreen() : document.documentElement.msRequestFullscreen ? document.documentElement.msRequestFullscreen() : document.documentElement.mozRequestFullScreen ? document.documentElement.mozRequestFullScreen() : document.documentElement.webkitRequestFullscreen && document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT)
}

var noSleep = new NoSleep();
$('#start').on('click', function(){
	noSleep.enable();
	toggleFullScreen();
	$(this).removeClass('initial').addClass('started');
		setTimeout(function(){
			$('#loading').remove();
			$('body').addClass('started');
			$('#nextslide').hide();
			$('#frame>img:first').hide().addClass('show').fadeIn(3000);
			$('#nextslide').hide().delay(3000).fadeIn(1000);
		},800)
});


$('#nextslide').on('click', function(){
	$('#nextslide').fadeOut();
	$('#frame>img.show').fadeOut(500);
		setTimeout(function(){
			if($('#frame>img.show').attr('src')=='3.jpg'){
				$('#nextslide').text('click if u like potatoes');
			} else if($('#frame>img.show').attr('src')=='5.jpg') {
				$('#nextslide').text('i\'m short');
			} else {
				$('#nextslide').text('next');
			}
			$('#frame>img.show').removeClass('show').next().hide().addClass('show').fadeIn(3000);
			if($('#frame>img.show').attr('src')!='6.png'){
				$('#nextslide').hide().delay(3000).fadeIn(1000);
			} else {
				$('#mail').hide().delay(5000).fadeIn(1000);
			}
		},500)
});






const instance = new TypeIt('#typeit', {
	speed: 50,
	lifeLike: true,
	autoStart: false
});
	
$('#mail').on('click', function(){
	$(this).fadeOut();
	$('#frame').fadeOut();
	setTimeout(function(){
		$('#frame').remove();
		$('#typeit').show();
		},800);
	instance.pause(2000).type('Happy happy 18, u beautiful soul.').exec(async () => await toggletypeimg())
	.options({speed: 80}).pause(2000).exec(async () => await toggletypeimg())
	.break().pause(700).break().exec(async () => await scroll()).pause(1000).type('I hope u\'re feeling <b>happy,</b>').pause(666).type(' peaceful').pause(666).type(' and have good people looking after u.')
	.break().pause(700).break().exec(async () => await scroll()).pause(1000).type('I hope everyone around u').pause(666).type(' makes u feel loved today.')
	.break().pause(700).break().exec(async () => await scroll()).pause(1000).type('I hope ur <b>birthday</b> cake').pause(666).type(' is as <b>sweet</b> as u.')
	.exec(async () => await toggletypeimg()).pause(2000).exec(async () => await toggletypeimg()).break().pause(700).break().exec(async () => await scroll()).pause(1000).type('I hope the weather is treating u').pause(666).type(' nice.')
	.break().pause(700).break().exec(async () => await scroll()).pause(1000).type('I hope u\'re blessed with gifts').pause(666).type(' and wishes').pause(666).type(' and everything that u deserve.')
	.break().pause(700).break().exec(async () => await scroll()).pause(1000).type('I hope someone gets u <b>sunflowers</b>.')
	.break().pause(700).break().exec(async () => await scroll()).pause(1000).type('I hope u grow taller')
	.delete(13).pause(1000).type('u never shed a tear for the rest of ur days,').pause(666).type(' unless they are tears of joy.')
	.break().pause(700).break().exec(async () => await scroll()).pause(1000).type('I hope the universe opens up').pause(666).type(' and gives u everything').pause(666).type(' u’ve ever wanted.')
	.break().pause(700).break().exec(async () => await scroll()).pause(1000).type('I hope u find a <b>$100</b>').pause(666).type(' on every corner u walk across. ')
	.break().pause(700).break().exec(async () => await scroll()).pause(1000).type('I hope <b>18</b> is good to u.')
	.break().pause(700).break().exec(async () => await scroll()).pause(1000).type('I hope u\’ll have many,').pause(666).type(' many more birthdays to come.')
	.break().pause(700).break().exec(async () => await scroll()).pause(1000).type('I hope ur exam goes <b>well</b>')
	.pause(3000).exec(async () => await endtype()).go();
});

function toggletypeimg(){
	if(window.getComputedStyle($('div#typeit>img')[0]).visibility == "hidden"){
		$('div#typeit>img:first').hide().css('visibility','visible').show();
	} else {
		$('div#typeit>img:first').remove();
	}
}

function scroll(){
	$("#typeit").animate({ scrollTop: $("#typeit").innerHeight() }, 500);
}

function endtype(){
	$('#closing').hide().addClass('active').show();
	$("#typeit").slideUp();
	instance.freeze();
	instance.destroy();
	setTimeout(function(){
		$('#typeit').remove();
		$('.container').appendTo('body');
		lovemojs();
	},800);
}


function lovemojs(){
	const qs = document.querySelector.bind(document);
	const easingHeart = mojs.easing.path('M0,100C2.9,86.7,33.6-7.3,46-7.3s15.2,22.7,26,22.7S89,0,100,0');

	const el = {
	  container: qs('.mo-container'),

	  i: qs('.lttr--I'),
	  l: qs('.lttr--L'),
	  o: qs('.lttr--O'),
	  v: qs('.lttr--V'),
	  e: qs('.lttr--E'),
	  y: qs('.lttr--Y'),
	  o2: qs('.lttr--O2'),
	  u: qs('.lttr--U'),

	  lineLeft: qs('.line--left'),
	  lineRight: qs('.line--rght'),

	  colTxt: "#763c8c",
	  colHeart: "#fa4843",

	  blup: qs('.blup'),
	  blop: qs('.blop'),
	  sound: qs('.sound') };


	class Heart extends mojs.CustomShape {
	  getShape() {
		return '<path d="M50,88.9C25.5,78.2,0.5,54.4,3.8,31.1S41.3,1.8,50,29.9c8.7-28.2,42.8-22.2,46.2,1.2S74.5,78.2,50,88.9z"/>';
	  }
	  getLength() {return 200;}}

	mojs.addShape('heart', Heart);

	const crtBoom = (delay = 0, x = 0, rd = 46) => {
	  parent = el.container;
	  const crcl = new mojs.Shape({
		shape: 'circle',
		fill: 'none',
		stroke: el.colTxt,
		strokeWidth: { 5: 0 },
		radius: { [rd]: [rd + 20] },
		easing: 'quint.out',
		duration: 500 / 3,
		parent,
		delay,
		x });


	  const brst = new mojs.Burst({
		radius: { [rd + 15]: 110 },
		angle: 'rand(60, 180)',
		count: 3,
		timeline: { delay },
		parent,
		x,
		children: {
		  radius: [5, 3, 7],
		  fill: el.colTxt,
		  scale: { 1: 0, easing: 'quad.in' },
		  pathScale: [.8, null],
		  degreeShift: ['rand(13, 60)', null],
		  duration: 1000 / 3,
		  easing: 'quint.out' } });



	  return [crcl, brst];
	};

	const crtLoveTl = () => {
	  const move = 1000;
	  const boom = 200;
	  const easing = 'sin.inOut';
	  const easingBoom = 'sin.in';
	  const easingOut = 'sin.out';
	  const opts = { duration: move, easing, opacity: 1 };
	  const delta = 150;

	  return new mojs.Timeline().add([
	  new mojs.Tween({
		duration: move,
		onStart: () => {
		  [el.i, el.l, el.o, el.v, el.e, el.y, el.o2, el.u].forEach(el => {
			el.style.opacity = 1;
			el.style = 'transform: translate(0px, 0px) rotate(0deg) skew(0deg, 0deg) scale(1, 1); opacity: 1;';
		  });
		},
		onComplete: () => {
		  [el.l, el.o, el.v, el.e].forEach(el => el.style.opacity = 0);
		  el.blop.play();
		} }),


	  new mojs.Tween({
		duration: move * 2 + boom,
		onComplete: () => {
		  [el.y, el.o2].forEach(el => el.style.opacity = 0);
		  el.blop.play();
		} }),


	  new mojs.Tween({
		duration: move * 3 + boom * 2 - delta,
		onComplete: () => {
		  el.i.style.opacity = 0;
		  el.blop.play();
		} }),


	  new mojs.Tween({
		duration: move * 3 + boom * 2,
		onComplete: () => {
		  el.u.style.opacity = 0;
		  el.blup.play();
		} }),


	  new mojs.Tween({
		duration: 50,
		delay: 4050,
		onUpdate: progress => {
		  [el.i, el.l, el.o, el.v, el.e, el.y, el.o2, el.u].forEach(el => {
			el.style = `transform: translate(0px, 0px) rotate(0deg) skew(0deg, 0deg) scale(1, 1); opacity: ${1 * progress};`;
		  });
		},
		onComplete: () => {
		  [el.i, el.l, el.o, el.v, el.e, el.y, el.o2, el.u].forEach(el => {
			el.style.opacity = 1;
			el.style = 'transform: translate(0px, 0px) rotate(0deg) skew(0deg, 0deg) scale(1, 1); opacity: 1;';
		  });
		} }),


	  new mojs.Html({
		...opts,
		el: el.lineLeft,
		x: { 0: 52 } }).
	  then({
		duration: boom + move,
		easing,
		x: { to: 52 + 54 } }).
	  then({
		duration: boom + move,
		easing,
		x: { to: 52 + 54 + 60 } }).
	  then({
		duration: 150, // 3550
		easing,
		x: { to: 52 + 54 + 60 + 10 } }).
	  then({
		duration: 300 }).
	  then({
		duration: 350,
		x: { to: 0 },
		easing: easingOut }),


	  new mojs.Html({
		...opts,
		el: el.lineRight,
		x: { 0: -52 } }).
	  then({
		duration: boom + move,
		easing,
		x: { to: -52 - 54 } }).
	  then({
		duration: boom + move,
		easing,
		x: { to: -52 - 54 - 60 } }).
	  then({
		duration: 150,
		easing,
		x: { to: -52 - 54 - 60 - 10 } }).
	  then({
		duration: 300 }).
	  then({
		duration: 350,
		x: { to: 0 },
		easing: easingOut }),


	  new mojs.Html({ // [I] LOVE YOU
		...opts,
		el: el.i,
		x: { 0: 34 } }).
	  then({
		duration: boom,
		easing: easingBoom,
		x: { to: 34 + 19 } }).
	  then({
		duration: move,
		easing,
		x: { to: 34 + 19 + 40 } }).
	  then({
		duration: boom,
		easing: easingBoom,
		x: { to: 34 + 19 + 40 + 30 } }).
	  then({
		duration: move,
		easing,
		x: { to: 34 + 19 + 40 + 30 + 30 } }),


	  new mojs.Html({ // I [L]OVE YOU
		...opts,
		el: el.l,
		x: { 0: 15 } }),


	  new mojs.Html({ // I L[O]VE YOU
		...opts,
		el: el.o,
		x: { 0: 11 } }),


	  new mojs.Html({ // I LO[V]E YOU
		...opts,
		el: el.v,
		x: { 0: 3 } }),


	  new mojs.Html({ // I LOV[E] YOU
		...opts,
		el: el.e,
		x: { 0: -3 } }),


	  new mojs.Html({ // I LOVE [Y]OU
		...opts,
		el: el.y,
		x: { 0: -20 } }).
	  then({
		duration: boom,
		easing: easingBoom,
		x: { to: -20 - 33 } }).
	  then({
		duration: move,
		easing,
		x: { to: -20 - 33 - 24 } }),


	  new mojs.Html({ // I LOVE Y[O]U
		...opts,
		el: el.o2,
		x: { 0: -27 } }).
	  then({
		duration: boom,
		easing: easingBoom,
		x: { to: -27 - 27 } }).
	  then({
		duration: move,
		easing,
		x: { to: -27 - 27 - 30 } }),


	  new mojs.Html({ // I LOVE YO[U]
		...opts,
		el: el.u,
		x: { 0: -32 } }).
	  then({
		duration: boom,
		easing: easingBoom,
		x: { to: -32 - 21 } }).
	  then({
		duration: move,
		easing,
		x: { to: -32 - 21 - 36 } }).
	  then({
		duration: boom,
		easing: easingBoom,
		x: { to: -32 - 21 - 36 - 31 } }).
	  then({
		duration: move,
		easing,
		x: { to: -32 - 21 - 36 - 31 - 27 } }),


	  new mojs.Shape({
		parent: el.container,
		shape: 'heart',
		delay: move,
		fill: el.colHeart,
		x: -64,
		scale: { 0: 0.95, easing: easingHeart },
		duration: 500 }).
	  then({
		x: { to: -62, easing },
		scale: { to: 0.65, easing },
		duration: boom + move - 500 }).
	  then({
		duration: boom - 50,
		x: { to: -62 + 48 },
		scale: { to: 0.90 },
		easing: easingBoom }).
	  then({
		duration: 125,
		scale: { to: 0.8 },
		easing: easingOut }).
	  then({
		duration: 125,
		scale: { to: 0.85 },
		easing: easingOut }).
	  then({
		duration: move - 200,
		scale: { to: 0.45 },
		easing }).
	  then({
		delay: -75,
		duration: 150,
		x: { to: 0 },
		scale: { to: 0.90 },
		easing: easingBoom }).
	  then({
		duration: 125,
		scale: { to: 0.8 },
		easing: easingOut }).
	  then({
		duration: 125, // 3725
		scale: { to: 0.85 },
		easing: easingOut }).
	  then({
		duration: 125 // 3850
	  }).then({
		duration: 350,
		scale: { to: 0 },
		easing: easingOut }),


	  ...crtBoom(move, -64, 46),
	  ...crtBoom(move * 2 + boom, 18, 34),
	  ...crtBoom(move * 3 + boom * 2 - delta, -64, 34),
	  ...crtBoom(move * 3 + boom * 2, 45, 34)]);

	};

	const loveTl = crtLoveTl().play();
	// setInterval(() => {loveTl.replay();}, 4300);
	setTimeout(() => {
		$('.container').fadeOut(); 
		toggleFullScreen(); 
		noSleep.disable();
	}, 4300);
	const volume = 0.2;
	el.blup.volume = volume;
	el.blop.volume = volume;
}