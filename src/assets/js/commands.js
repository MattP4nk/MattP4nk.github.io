assistCommand("help", "returns this list", () => {
	for (let index = 0; index < commandList.length; index++) {
		print(commandList[index]);
	}
});

assistCommand("login", "Log into the platform", () => {
	
});

assistCommand("edit", "Edit some content", () => {
	communication("muse_task", "edit");
});


	
