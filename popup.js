'use strict';

$(window).ready(function(){
	$('.progress').addClass('hidden');
	$('#btn_get_link').click(function(e){
		e.preventDefault();
		var youtube_url=$('#url').val();
		$('.alert').remove();
		console.log(encodeURIComponent(youtube_url));
		var url = 'http://ec2-54-87-165-71.compute-1.amazonaws.com:9000/'+encodeURIComponent(youtube_url);
		
		$.ajax({
			url: url,
			type: 'GET',
			dataType:'json',
			beforeSend: function(){
				$('.progress').removeClass('hidden');
			},
			error:function(){
				$('.progress').addClass('hidden');
					$('#data').append('<div class="alert alert-danger fade in">Something went wrong, try another Youtube url</div>');
			}
		}).done(function(data){
			console.log(data);
			$('.progress').addClass('hidden');
			for(var i=0;i<data.length;i++){
				console.log(data[i]);
				var filesize = (data[i].filesize!=='')?' - '+data[i].filesize+' MB':'';
				$('#links').append('<li class="list-group-item"><i class="fa fa-download" style="color:blue" aria-hidden="true"></i><a class="download_link" href="'+data[i].url+'&title='+data[i].file_name+'"> \>\>Download '+data[i].ext+'\<\<</a> - '+data[i].format+filesize+
					'</li>');
			}
		});
		
		});
	$(document).on('click','.download_link', function(){
		var link= this.href||'';
		chrome.tabs.create({url:link});
	});
});