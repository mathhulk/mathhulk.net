$(document).ready(function( ) {
	$.get("resources/templates/repository.tpl", function(template) {
		$.ajax({
			headers: {
				"Accept": "application/vnd.github.mercy-preview+json"
			},
			dataType: "json",
			url: "https://api.github.com/users/mathhulk/repos",
			success: function(repositories) {
				$(".github .row").empty( );
				
				$.each(repositories, function(index, value) {
					let repository = template;
					
					repository = repository.replace("{{ name }}", value.name.replace("-", " &bull; "));
					repository = repository.replace("{{ description }}", value.description);
					
					let topics = value.topics;
					
					$.each(topics, function(index, value) {
						topics[index] = "<span class=\"badge badge-pill badge-primary\">" + value + "</span>";
					});
					
					repository = repository.replace("{{ topics }}", topics.join(" "));
					
					repository = repository.replace("{{ html_url }}", value.html_url);
					
					$(".github .row").append(repository);
				});
			}
		});
		

		$.ajax({
			dataType: "json",
			url: "https://gitlab.com/api/v4/users/mathhulk/projects",
			success: function(repositories) {
				$(".gitlab .row").empty( );
				
				$.each(repositories, function(index, value) {
					let repository = template;
					
					repository = repository.replace("{{ name }}", value.name.replace("-", " &bull; "));
					repository = repository.replace("{{ description }}", value.description);
					
					let topics = value.tag_list;
					
					$.each(topics, function(index, value) {
						topics[index] = "<span class=\"badge badge-pill badge-primary\">" + value + "</span>";
					});
					
					repository = repository.replace("{{ topics }}", topics.join(" "));
					
					repository = repository.replace("{{ html_url }}", value.web_url);
					
					$(".gitlab .row").append(repository);
				});
			}
		});
	});
});