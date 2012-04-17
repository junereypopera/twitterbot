$().ready(function(){
  
	var ajaxResponse = "#ajax_response";
	
	// initialization's
	$("<div id='ajax_response'></div>").insertAfter(inputBox);
	$(mainHolder).addClass("fb_holder");
	
	if(ajaxFilePath == "")
		alert("Please set value for 'ajaxFilePath'");

	// on focus of textbox show friends list
	$(inputBox).keyup(function(event){
		var p = $(mainHolder);
		var offset = p.offset();

		// create ajax request and get all the friend names starting with name XXX
		var keyword = $(inputBox).val();
		
		// remove select-friend class

		$(mainHolder).find(".selected-friend").removeClass("selected-friend");
		$(mainHolder).find(".selected-friend").find("#close").css("color","#8F8F8F");

		if(keyword.length)
		 {
			 if(event.keyCode != 40 && event.keyCode != 38 && event.keyCode != 13)
			 {
				 $(ajaxResponse).css("left",parseInt(offset.left));
				 $(ajaxResponse).css("top",parseInt(offset.top + $(mainHolder).height()));
				 $(ajaxResponse).css("opacity","0.9");
				 $(ajaxResponse).css("width",parseInt($(mainHolder).width()));
				 
				 if(ajaxFilePath != "")
				 {
					 $.ajax({
					   type: "POST",
					   url: ajaxFilePath,
					   data: "data="+keyword,
					   success: function(rep){	
						if(rep != 0)
						  $(ajaxResponse).html(rep).css("display","block");
						else
						  $(".list").css("display","none");
					   }
					 });
				 }
			 }
			 else
			 {
				$("li .selected").removeClass("selected");
				switch (event.keyCode)
				{
				 case 40:
				 {
					  found = 0;
					  $("li").each(function(){
						 if($(this).attr("class") == "selected")
							found = 1;
					  });
					  if(found == 1)
					  {
						var sel = $("li[class='selected']");
						// check if his is a last element in the list
						// if so then add selected class to the first element in the list
						if(sel.next().text() == "")					
							$("li:first").addClass("selected");
						else
							sel.next().addClass("selected");
						// remove class selected from previous item
						sel.removeClass("selected");
					  }
					  else
						$("li:first").addClass("selected");
					 }
				 break;
				 case 38:
				 {
					  found = 0;
					  $("li").each(function(){
						 if($(this).attr("class") == "selected")
							found = 1;
					  });
					  if(found == 1)
					  {
						var sel = $("li[class='selected']");
						// check if his is a last element in the list
						// if so then add selected class to the first element in the list
						if(sel.prev().text() == "")					
							$("li:last").addClass("selected");
						else
							sel.prev().addClass("selected");
						// remove class selected from previous item
						sel.removeClass("selected");
					  }
					  else
						$("li:last").addClass("selected");
				 }
				 break;
				 case 13:
					$(ajaxResponse).css("display","none");
					$().addFriend($("li[class='selected']").text());
				 break;
				}
			 }
		 }
		else
			$(ajaxResponse).fadeOut("slow");
	});
	// on click of list item mark that friend as selected

	$("#close").live("click",function(){
		// remove selected friend
		$(this).parent().css("display","none");
	});
	$(inputBox).focus(function(){
		// remove class
		$(mainHolder).find(".selected-friend").removeClass("selected-friend");
		$(mainHolder).find("#close").css("color","#8F8F8F");
	});
	$(".list li").live("mouseover",function () {
		  $("li[class='selected']").removeClass("selected");
		  $(this).addClass("selected");
	});
	$(".list li").live("mouseout",function () {
		  $("li .selected").removeClass("selected");
		  $(this).removeClass("selected");
	});
	$(".list li").live("click",function () {
		var text = $(this).text();
		// mark friend as selected and add to selected ist
		$().addFriend(text);
	});
	$(mainHolder).click(function(){
		$(inputBox).focus();
	});

	$(".added").live("mouseover",function(){
		$(this).addClass("added-hover");
	});
	$(".added").live("mouseout",function(){
		$(this).removeClass("added-hover");
		$(this).addClass("added");
	});
	$(".added").live("click",function(){
		$(mainHolder).find(".selected-friend").removeClass("selected-friend");
		$(this).addClass("selected-friend");
		$(this).find("#close").css("color","white");
	});

	jQuery.fn.addFriend = function(text) {
		if(text)
		{
			if($(mainHolder).find("div").attr("class") != "added")
				$("<div class='added'>"+text+"<span id='close'>x</span></div>").prependTo($(mainHolder));
			else
				$("<div class='added'>"+text+"<span id='close'>x</span></div>").insertAfter($(inputBox).prev());
			// hide list
			$(".list").css("display","none");
			// clear textbox 
			$(inputBox).val("").focus();
		}
	}
});