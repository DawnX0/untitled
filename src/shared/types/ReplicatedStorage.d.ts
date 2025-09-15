interface ReplicatedStorage extends Instance {
	game: Folder & {
		client: Script;
		server: Script;
		shared: Folder & {
			types: Folder;
			ui: Folder & {
				components: Folder;
				stories: Folder;
			};
		};
	};
}
