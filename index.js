function bytesToSize(bytes) {
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
  if (bytes === 0) return 'n/a'
  const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10)
  if (i === 0) return `${bytes} ${sizes[i]}`
  return `${(bytes / (1024 ** i)).toFixed(1)} ${sizes[i]}`
}

function UrlExists(url){
    var http = new XMLHttpRequest();
    http.open('HEAD', 'https://wztd.herokuapp.com/'+url, false);
    http.send();
    return http.status!=404;
}

const copyToClipboard = str=>{
	const el = document.createElement('textarea');
	el.value = str;
	document.body.appendChild(el);
	el.select();
	document.execCommand('copy');
	document.body.removeChild(el)
}

function runArchive(){
	$('#archive').show().html('<h1>Recent files:</h1>');
	var archive = JSON.parse(localStorage.archive);
	for(var i=0; i<archive.length;i++){
		var fname = archive[i][0],
			fsize = bytesToSize(archive[i][1]),
			flink = 'puu.sh/'+archive[i][2],
			fthmb = archive[i][4],
			ftime = new Date(archive[i][3]).toString().split(' ');
			ftime = ftime[0]+' '+ftime[1]+' '+ftime[2]+' '+ftime[4];
		$('#archive>h1').after('<div class="arc"><div class="thmb" style="background-image:url('+fthmb+')"></div><div class="info"><span class="name">'+fname+'</span><input class="link" type="text" value="'+flink+'" readonly="readonly"/><span class="size">'+fsize+'</span><span class="time">'+ftime+'</span></div><div class="copy" data-url="'+flink+'">[copy]</div></div>')
	}
	$('.copy').on('click',function(){
		copyToClipboard($(this).data('url'));
		$(this).prev().find('input').focus().select();
	});
	$('.thmb').on('click',function(){
		window.open('https://'+$(this).next().next().data('url'));
	});
}

function showmsgbox(title, msg, btn, type){
	$('#msgbox').removeClass('shown');
	$('#msgbox').attr('class',type);
	$('#msgheader>span').html(title);
	$('#msgmsg').html(msg);
	$('#msgbtn').html(btn);
	$('#msgbox, #backdrop').show();
}

if(!!localStorage.archive && JSON.parse(localStorage.archive).length>=0){
	runArchive();
}

$('#msgbtn').on('click', function(){
	$('#msgbox').addClass('shown');
	$('#backdrop').fadeOut(1000);
	$('#msgbox').fadeOut(600);
});

$('#file')[0].onchange = function() {
    if(this.files[0].size > 20971520){
		showmsgbox('Error', 'File is too big!<br/>(20Mb Max)', 'ok', 'warn');
       this.value = "";
	   return false;
    }
	////////////////////////////////////////////////////////////////////////////////////////
    var file = $('#file')[0].files[0];
	var thumbnails = 'unknown.jpg';
    // Ensure it's an image
    if(file.type.match(/image.*/)) {
        // Load the image
        var reader = new FileReader();
        reader.onload = function (readerEvent) {
            var image = new Image();
            image.onload = function (imageEvent) {

                // Resize the image
                var canvas = document.createElement('canvas'),
                    max_size = 100,// TODO : pull max size from a site config
                    width = image.width,
                    height = image.height;
                if (width > height) {
                    if (width > max_size) {
                        height *= max_size / width;
                        width = max_size;
                    }
                } else {
                    if (height > max_size) {
                        width *= max_size / height;
                        height = max_size;
                    }
                }
                canvas.width = width;
                canvas.height = height;
                canvas.getContext('2d').drawImage(image, 0, 0, width, height);
                thumbnails = canvas.toDataURL('image/jpeg');
            }
            image.src = readerEvent.target.result;
        }
        reader.readAsDataURL(file);
    }
	////////////////////////////////////////////////////////////////////////////////////////
	$('#fileLabel>span').html('<b>'+$('#file')[0].files[0].name +'</b><b>' + bytesToSize($('#file')[0].files[0].size)+'</b>');
	var xhr = new XMLHttpRequest(),
		data = new FormData(),
		input = $('#file')[0].files[0];
	xhr.onreadystatechange = () => {
		if (xhr.readyState == XMLHttpRequest.DONE) {
			if(xhr.responseText.split(',')[0]==0 && UrlExists(xhr.responseText.split(',')[1])){ // Success
				var fname = $('#file')[0].files[0].name,
					fsize = $('#file')[0].files[0].size,
					ftime = new Date().getTime();
					fid = xhr.responseText.split(',')[1].split('/')[3].split('.')[0],
					archive = [];
					if(!!localStorage.archive){archive = JSON.parse(localStorage.archive)}
					archive.push([fname,fsize,fid,ftime,thumbnails]);
				localStorage.archive = JSON.stringify(archive);
				runArchive();
				showmsgbox('File Uploaded!', '[<b style="color: cornflowerblue;text-decoration: underline;font-family: consolas, monospace;">puu.sh/'+fid+'</b>]<br/>File Successfully uploaded, <br/>url copied to clipboard', 'ok', 'info');
				setTimeout(function(){$('#msgbtn').click();},4000);
			} else {
				// Error
				showmsgbox('Upload Error', 'Possible file duplicate? <br/>try renaming ur file', 'ok', 'error');
			}
			$("#fileLabel>span").html('Choose file..');
			$("#progressBar>i").html('');
			$("#progressBar").hide().width(0).show();
			$('#file').val('');
		}
	};
	xhr.upload.addEventListener("progress", function(evt) {
		if (evt.lengthComputable) {
			var percentComplete = ((evt.loaded / evt.total) * 100);
			$("#progressBar").width(percentComplete + '%');
			$("#progressBar>i").html(parseInt(percentComplete)+'%');
			if(percentComplete==100){
				$("#fileLabel>span").html('Processing your file...');
			}
		}
	}, false);
	xhr.open("POST", "https://puush.me/api/up", true);
	data.append("z", "poop");
	data.append("e", "akifalhakim@gmail.com");
	data.append("k", '755F164F8CA0DBAAF355AAEA0B0A3520');
	data.append("f", input);
	xhr.send(data);
	};