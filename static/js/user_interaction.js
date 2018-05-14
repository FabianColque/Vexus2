$( function() {
	$.post("/is_developer", function(is_d) {
		if (is_d == 0) {
			$("#dialog-interactive-tour").show();
			$("#dialog-start").show();
			$("#dialog-end").show();
			$("#dialog-form").show();
			$("#dialog-thanks").show();
			$("#tasks_div").show();
			$("#end_interaction_div").show();
			var dialogInteractiveTourOpen = true;
			var dialogStartAutoOpen = false;
			var dialogFormAutoOpen = false;
			var dialogThanksAutoOpen = false;
			$.post("/certified_user", function(data_status) {
				if (data_status == 0) {
					dialogInteractiveTourOpen = true;
					dialogStartAutoOpen = false;
					dialogFormAutoOpen = false;
					dialogThanksAutoOpen = false;
				}
				else if (data_status == 1) {
					dialogInteractiveTourOpen = false;
					dialogStartAutoOpen = true;
					dialogFormAutoOpen = false;
					dialogThanksAutoOpen = false;
				}
				else if (data_status == 2) {
					dialogInteractiveTourOpen = false;
					dialogStartAutoOpen = false;
					dialogFormAutoOpen = true;
					dialogThanksAutoOpen = false;
				}
				else if (data_status == 3) {
					dialogInteractiveTourOpen = false;
					dialogStartAutoOpen = false;
					dialogFormAutoOpen = false;
					dialogThanksAutoOpen = true;
				}
				$("#dialog-interactive-tour").dialog({
					modal: true,
					resizable: false,
					dialogClass: "no-close",
					closeOnEscape: false,
					autoOpen: dialogInteractiveTourOpen,
					draggable: false,
               position: {
   					my: "center",
	   				at: "center",
		   			of: window
               },
					title: "Start interactive guided tour",
					buttons: [
						{
							text: "START",
							click: function() {
								$(this).dialog("close");
							}
						}
					],
					close: function(event, ui) {
						$.get("/register_user");
						test_enjoyhint();
					}
				});
				$("#dialog-start").dialog({
					modal: true,
					resizable: false,
					dialogClass: "no-close",
					closeOnEscape: false,
					autoOpen: dialogStartAutoOpen,
					draggable: false,
               position: {
   					my: "center",
	   				at: "center",
		   			of: window
               },
					title: "Start interaction",
					buttons: [
						{
							text: "START",
							click: function() {
								$(this).dialog("close");
							}
						}
					],
					close: function(event, ui) {
						$.get("/start_user");
						$("#tasks_button").button("option", "disabled", false);
						$("#end_interaction").button("option", "disabled", false);
					}
				});
				$("#dialog-end").dialog({
					modal: true,
					resizable: false,
					closeOnEscape: true,
					autoOpen: false,
					draggable: false,
               position: {
	   				my: "center",
   					at: "center",
					   of: window
               },
					title: "End interaction",
					buttons: [
						{
							text: "Continue",
							click: function() {
								$(this).dialog( "close" );
								$.get("/end_user");
								$("#tasks_button").button("option", "disabled", true);
								$("#end_interaction").button("option", "disabled", true);
								$("#dialog-form").dialog("open");
							}
						},
						{
							text: "Cancel",
							click: function() {
								$(this).dialog("close");
							}
						}
					],
				});
				$("#dialog-form").dialog({
					modal: true,
					resizable: false,
					dialogClass: "no-close",
					closeOnEscape: false,
					autoOpen: dialogFormAutoOpen,
					draggable: false,
               position: {
					   my: "center bottom-10",
   					at: "center bottom-10",
	   				of: window
               },
					width: "90%",
               height: ($(window).height() - 100),
					title: "Vexus 2 Questions",
					open: function(event, ui) {
						$.get("/start_form");
						$.post("/get_email", function(email) {
							document.getElementById("iframe_form").src = "https://docs.google.com/forms/d/e/1FAIpQLSdvagDwi3UsroT7xViFJwJh8ILlJwXAHUEPViFqmuHCiV_emw/viewform?embedded=true&entry.945529671=" + email;
							$("#iframe_form").load(function() {
								$.post("/is_load_spreadsheet", function(is_load) {
									if (is_load == 1) {
										$("#dialog-form").dialog("close");
									}
								});
							});
						});
					},
					close: function(event, ui) {
						$.get("/end_form");
						$("#dialog-thanks").dialog("open");
					}
				});
				$("#dialog-thanks").dialog({
					modal: true,
					resizable: false,
					dialogClass: "no-close",
					closeOnEscape: false,
					autoOpen: dialogThanksAutoOpen,
					draggable: false,
               position: {
   					my: "center",
	   				at: "center",
		   			of: window
               },
					title: "Thanks"
				});
				var buttonsDisabled = false;
				if (dialogInteractiveTourOpen || dialogStartAutoOpen || dialogFormAutoOpen || dialogThanksAutoOpen) {
					buttonsDisabled = true;
				}
				$("#tasks_button").button({
					disabled: buttonsDisabled
				});
				$("#tasks_button").click(function(event) {
               if ($("#sidenav_tasks").css("width") == "0px") {
                  $("#sidenav_tasks").css('width', '400px');
                  $("#main_body").css('margin-right', '400px');
                  $("#tasks_button").addClass('ui-state-active');
               }
               else {
                  $("#sidenav_tasks").css('width', '0');
                  $("#main_body").css('margin-right', '0');
                  $("#tasks_button").removeClass('ui-state-active');
               }
				});
				$("#end_interaction").button({
					disabled: buttonsDisabled
				});
				$("#end_interaction").click(function(event) {
					$("#dialog-end").dialog("open");
				});
			})
		}
		else if (is_d == 1) {
			$("#dialog-interactive-tour").hide();
			$("#dialog-start").hide();
			$("#dialog-end").hide();
			$("#dialog-form").hide();
			$("#dialog-thanks").hide();
			$("#tasks_div").hide();
			$("#end_interaction_div").hide();
		}
	})
});
