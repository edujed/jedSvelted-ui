/**
 * English messages — the source of truth for the message keys.
 * Other locales must provide every key defined here (enforced by the
 * `Messages` type in i18n.ts).
 */
export default {
	// Common actions
	save: 'Save',
	cancel: 'Cancel',
	delete: 'Delete',
	edit: 'Edit',
	view: 'View',
	search: 'Search',
	clear: 'Clear',
	close: 'Close',
	add: 'Add',
	loading: 'Loading...',
	empty: 'Nothing to display.',

	// Table
	exportCsv: 'Export CSV',
	csv: 'CSV',
	addNewRecord: 'Add new record',
	sort: 'Sort',
	filter: 'Filter...',
	actions: 'Actions',
	rows: '{count} row(s)',

	// CRUD panel titles
	viewTitle: 'View {entity}',
	editTitle: 'Edit {entity}',
	newTitle: 'New {entity}',
	deleteTitle: 'Delete {entity}',
	viewDetails: 'View details',

	// Delete confirmation
	confirmDeletion: 'Confirm Deletion',
	deleteMessage: 'Are you sure you want to delete this record?',
	deleteWarning: 'This action cannot be undone.',

	// Toast labels
	toastSuccess: 'Success',
	toastError: 'Error',
	toastInfo: 'Info',
	toastWarning: 'Warning',

	// Navigation
	mainNav: 'Main navigation bar',
	openSideMenu: 'Open side menu',
	quickSearch: 'Quick search (AI Agent)...',
	lightMode: 'Light mode',
	darkMode: 'Dark mode',
	navigationMenu: 'Navigation menu',
	closeMenu: 'Close menu',

	// Theme
	theme: 'Theme',

	// Form fields
	selectPlaceholder: 'Select...',

	// Toast messages (handleDetailAction)
	itemDeleted: '{item} "{value}" deleted',
	itemUpdated: '{item} "{value}" updated successfully',
	itemCreated: '{item} "{value}" created successfully',

	// Deep-link errors
	recordNotFound: 'Record not found',

	// Chat
	chat: 'Chat',
	user: 'User',
	assistant: 'Assistant',
	system: 'System',
	error: 'Error',
	tool: 'Tool',
	thought: 'Thought',
	processing: 'Processing...',
	send: 'Send',
	typeMessage: 'Type your message...',
	selectedFiles: 'Selected files:',
	executingTool: 'Running tool: **{tool}**...',
	serverError: 'Server error: {error}',
	unknownError: 'Unknown error',
	welcome: '👋 Welcome! Send a message to get started.',
	connectionLost: 'Connection lost during response — releasing UI',
	wsConnectFailed: 'Failed to connect WebSocket',
	chatError: 'Chat error: {error}',
	clearChat: 'Clear chat',
	fork: 'Fork',

	// LLM server / model config (generic for any llama.cpp app)
	llamaServerControl: 'Llama.cpp Server Control',
	checkStatus: 'Check Status',
	checkingStatus: 'Checking status...',
	serverRunning: '✅ Server running',
	serverStopped: '❌ Server stopped',
	statusCheckError: '⚠️ Error checking status: {error}',
	modelConfig: '⚙️ Model Configuration',
	personaProfile: '💬 Persona & Profile (Custom)',
	personaLabel: 'Persona & Profile',
	personaPlaceholder:
		'Describe the persona, profile, and desired behavior of the assistant...\n\nExample: You are a helpful and friendly assistant. Always respond in English. Be concise and direct.',
	savePersona: '💾 Save Persona',
	personaHint: '💡 This text will be combined with the tool instructions',
	basicParams: '🎲 Basic Parameters',
	penalties: '📉 Penalties',
	dry: '🛡️ D.R.Y. (Do Not Repeat)',
	xtcMirostat: '⚡ XTC & Mirostat',
	mirostatDisabled: 'Disabled',
	saveConfig: 'Save Settings',
	modelSelector: '🤖 Select Model',
	modelActive: '✅ Active',
	modelDisabled: '❌ Disabled',
	modelContext: 'Context: {size}',
	modelTemp: 'Temp: {value}',
	modelGeneral: 'General use, large context (180K)',
	modelCoding: 'Programming, tools enabled',
	modelComplex: 'Complex tasks, MoE',
	modelCode: 'Code, MoE',
	modelMultimodal: 'General tasks, multimodal',
	modelCreative: 'Creativity',
	modelAdvanced: 'Advanced tasks',
	fileViewerLoading: 'Loading...',
	fileLoadError: 'Error loading file',
	fileSelectHint: 'Select a file in the tree to view its content.',
	fileSelectEmpty: 'Select a file in the tree to view it.',
	running: 'Running...',
	commandSuccess: 'Command executed successfully',
	unknownCommandError: 'Unknown error',
	commandFinished: "Command '{command}' finished.",
	commandError: "Error in command '{command}': {error}",
	executionError: 'Execution error: {error}',
	fileTreeError: 'Error loading file tree: {error}',
	fileContentError: 'Error loading file content: {error}',
	configLoadError: 'Error loading config: {error}',
	errorPrefix: '⚠️ **Error:** {error}',
	errorWithId: '{error} (id: {id})',

	// Model config — parameter descriptions (tooltips)
	descTemp:
		'Controls the randomness of the responses. Higher values (e.g. 0.8) make the output more creative and varied, while lower values (e.g. 0.3) make it more focused and deterministic.',
	impactTemp: '💡 Low: more consistent responses. High: more creativity, but may lose coherence.',
	descTopK:
		'Limits the number of tokens with the highest probability of being selected. The model only considers the K most probable tokens at each step.',
	impactTopK:
		'💡 Low (e.g. 10): more focused and predictable. High (e.g. 100): more variety in the choices.',
	descTopP:
		'Selects tokens until accumulating P cumulative probability. It is a softer alternative to Top K, keeping a balance between quality and diversity.',
	impactTopP:
		'💡 Low (0.5): very conservative. High (0.95): allows less probable tokens, more diversity.',
	descMinP:
		"Minimum relative probability for token selection. Based on the most probable token's probability, it filters out very unlikely tokens.",
	impactMinP:
		'💡 Low (0.01): allows more tokens. High (0.5): only very probable tokens are considered.',
	descTypicalP:
		'Typical sampling that keeps tokens based on local entropy. Penalizes both very unlikely and very likely tokens, keeping the middle ground.',
	impactTypicalP:
		'💡 Low (0.1): behavior similar to Top P. High (1.0): disabled, default behavior.',
	descRepeatLastN:
		'Number of recent tokens considered for the repetition penalty. The model analyzes the last N tokens to avoid repetitions.',
	impactRepeatLastN:
		'💡 Low (16): only recent repetitions. High (128): considers a longer context to avoid repetitions.',
	descRepeatPenalty:
		'Penalty multiplier for tokens that repeat. Values > 1.0 reduce the probability of repetition.',
	impactRepeatPenalty:
		'💡 1.0: no penalty. 1.5: moderately reduces repetitions. 2.0+: aggressively avoids repetitions.',
	descFrequencyPenalty:
		'Penalty based on the token frequency in the response. Frequently used tokens are less likely to be selected again.',
	impactFrequencyPenalty:
		'💡 0.0: no penalty. 0.5: reduces excessive word usage. 1.0+: encourages a diverse vocabulary.',
	descPresencePenalty:
		'Penalty for new tokens vs. tokens already present. Encourages the model to talk about new topics instead of repeating the same ones.',
	impactPresencePenalty:
		'💡 0.0: no penalty. 0.5: encourages new topics. 1.0+: strong incentive for thematic diversity.',
	descDryMultiplier:
		'Strength multiplier of the DRY (Do Not Repeat) algorithm. Controls how aggressively the system avoids repetitions.',
	impactDryMultiplier:
		'💡 0.0: DRY disabled. 1.2-1.5: moderate repetition prevention. >1.5: strong prevention.',
	descDryBase:
		'Base parameter of the DRY algorithm. Sets the penalty threshold for repetitions based on n-gram patterns.',
	impactDryBase:
		'💡 0.8: low threshold, more tokens penalized. 1.75: default. 2.5+: only very obvious repetitions.',
	descDryAllowedLength:
		'Minimum token length before starting to penalize repetitions. Allows short sequences before applying DRY.',
	impactDryAllowedLength:
		'💡 0: penalizes immediately. 2: allows 2 tokens before penalizing. 5+: longer context before.',
	descDryPenaltyLastN:
		'Number of tokens to consider when applying the DRY penalty. Similar to Repeat Last N, but specific to the DRY algorithm.',
	impactDryPenaltyLastN:
		'💡 32: short context. 64: default. 128+: long context, detects complex patterns.',
	descXtcProbability:
		'Probability of activating XTC (eXclusion Tree Sampling). Removes tokens with very low probability after some steps.',
	impactXtcProbability:
		'💡 0.0: XTC disabled. 0.1-0.3: activates occasionally. >0.5: activates frequently, more deterministic.',
	descXtcThreshold:
		'Probability threshold for token removal by XTC. Tokens with probability below this threshold are removed.',
	impactXtcThreshold:
		'💡 0.1: low threshold, few tokens removed. 0.5: high threshold, more tokens removed.',
	descMirostat:
		'Adaptive perplexity control mode. The system automatically adjusts the temperature during generation.',
	impactMirostat:
		'💡 0: disabled. 1: Mirostat v1 (simpler). 2: Mirostat v2 (more precise, recommended).',
	descMirostatLr:
		'Learning rate of the Mirostat algorithm. Controls how quickly the system adjusts the temperature.',
	impactMirostatLr:
		'💡 0.01: smooth and slow adjustments. 0.1: default, balanced. 0.5: fast and aggressive adjustments.',
	descMirostatEnt:
		'Target entropy that Mirostat tries to reach. Controls the desired level of perplexity in the output.',
	impactMirostatEnt:
		'💡 1.0: very focused, less variable. 5.0: default, good balance. 10.0+: very diverse.',
	descAdaptiveTarget:
		'Adaptive target for dynamic parameter adjustment. Controls the automatic adjustment behavior of the model.',
	impactAdaptiveTarget:
		'💡 -1.0: disabled (default). Positive values: enables adaptive adjustment with different behaviors.',
	descAdaptiveDecay:
		'Decay factor for adaptive adjustment. Controls how the influence of adjustments decreases over time.',
	impactAdaptiveDecay:
		'💡 0.5: fast decay. 0.9: slow decay, keeps influence. 0.99: almost no decay.'
} as const;
