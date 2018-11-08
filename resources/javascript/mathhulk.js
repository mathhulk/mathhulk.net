$(document).ready(function( ) {
	$.ajax({
		headers: {
			"Accept": "application/vnd.github.mercy-preview+json"
		},
		dataType: "json",
		url: "https://api.github.com/users/mathhulk/repos",
		success: function(repositories) {
			$.get("resources/templates/repository.tpl", function(template) {
				$(".parent .row").empty( );
				
				$.each(repositories, function(index, value) {
					if(index % 3 === 0) {
						$(".parent").append("<div class=\"row row-grid justify-content-center\"><!-- repositories --></div>");
					}
					
					let repository = template;
					
					repository = repository.replace("{{ name }}", value.name.replace("-", " &bull; "));
					repository = repository.replace("{{ description }}", value.description);
					
					let topics = value.topics;
					
					$.each(topics, function(index, value) {
						topics[index] = "<span class=\"badge badge-pill badge-primary\">" + value + "</span>";
					});
					
					repository = repository.replace("{{ topics }}", topics.join(" "));
					
					repository = repository.replace("{{ html_url }}", value.html_url);
					
					$(".parent .row:last-child").append(repository);
				});
			});
		}
	});
});