        



					
				$('#article').click(function(){
					
					$('.submenu_wrapper').toggleClass('collapsed');
				});
					
	
				$('.info_block').click(function(){

					
					var clicked_id =  $(this).attr('id');
					
					var section_id = clicked_id.substring(0, clicked_id.indexOf('_'));
								
					var num_id= clicked_id.slice(-1);
					
					
					if($(this).hasClass('intro')){
					   
					   	//hide all options
						$('#'+section_id+'_info').addClass('hidden');	
						
						//show the selected info
						$('#'+section_id+'_content_'+num_id).addClass('selected');
					   
					}
					
					else if($(this).hasClass('content')){ 
					
					   	//hide the selected info
						$(this).removeClass('selected');
					
						//show all options
						$('#'+section_id+'_info').removeClass('hidden');	
					   
					}
					
	
				});
				
				
				$('.control').click(function(){
		
					navigation( $(this).attr('id') ,  'control');
					
				});
			
		
				$('.option').click(function(){

					navigation( $(this).attr('id') ,  'option');
					
				});
				
				
	

	
		var position = $(window).scrollTop(); 

		// should start at 0

		$(window).scroll(function() {
	
			//scroll progress function
			progress_bar_scrolling();
	
			let window_scrolled = $(document).scrollTop();
			
			
			let section1 = $('.section_wrapper.banner').height();
			
			
			
   			if (window_scrolled > section1 ){
				
				
				var scroll = $(window).scrollTop();
		
			
				if(scroll > position) {
        			//scroll down
					//$('#navbar').animate({marginTop: "-80px"});
					$('#navbar').addClass('collapsed');
					$('#navwrapper').addClass('collapsed');
	
				} else {
         			//scroll up
					$('#navbar').removeClass('collapsed');
					$('#navwrapper').removeClass('collapsed');
				}
				position = scroll;
				
				
				
			}
			
			
		});
	

	
	
				function navigation(clicked,  element_type){
					
					
					var num;
					var total;

					var section =  clicked.substring(0, clicked.indexOf('_'));
					
					if(element_type == 'option'){
						
						//what number of child is selected (1,2,3)
						num = clicked.slice(-1);
					
						//total number of children
						total =  $('#'+clicked).parent().children().length;
						
					}
					
					if(element_type =='control'){
						
						var temp = $('#'+section+'_controls > .gallery_texts > .gallery_text.selected').attr('id');
						num = temp.slice(-1);
						num = parseInt(num);
						
						
						total= $('#'+section+'_controls > .gallery_texts').children().length;
						
						
						//add or subtract
						if( $('#'+clicked).hasClass('next')){
							num = num +1;
						}
						else if ($('#'+clicked).hasClass('previous')){
							num = num -1;	
						}
						
						
						//adjust for total numbers 
						if(num > total){
							num = 1;
						}
						if(num == 0){
							num = total;
						}		
						
					}
					
					
					num = num.toString();
					
					//remove previous selections
					$('#'+section+'_options > .option.selected').removeClass('selected');
					$('#'+section+'_images > .gallery_image.selected').removeClass('selected');
					$('#'+section+'_controls > .gallery_texts > .gallery_text.selected').removeClass('selected');
					
					//apped new selection 
					$('#'+section+'_option_'+num).addClass('selected');
					$('#'+section+'_image_'+num).addClass('selected');
					$('#'+section+'_text_'+num).addClass('selected');
					
					
					
					
				}

	
	
	
			
				//progres bar scrolling 
				function progress_bar_scrolling() {
					
					//height of the page
					let page_heigth = $('body').height();			
					
					//how much did the user scroll
					let window_scrolled = $(document).scrollTop() +300;
					
					//what % it represents
					let scrolled_percentage = (window_scrolled / page_heigth) *100;
					
					//make sure it reaches the bottom
					if(scrolled_percentage > 94){
						scrolled_percentage = 100;
					}
					
					if(scrolled_percentage < 5){
						scrolled_percentage = 0;
					}
					
					
					//change progress bar width
					$('#progress_bar').css('width', scrolled_percentage+'%');
				}


		
	
