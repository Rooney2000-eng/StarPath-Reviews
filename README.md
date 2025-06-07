# CodePal Helper Chrome Extension

A comprehensive Chrome extension that helps developers and web users with code highlighting, link extraction, and page analysis tools.

## Features

- **Code Highlighting**: Automatically highlight code blocks on web pages
- **Link Extraction**: Extract and analyze all links from the current page
- **Word Counter**: Count words, characters, and paragraphs on any page
- **Auto-Highlighting**: Optional automatic code highlighting on page load
- **Context Menu Integration**: Right-click menu options for quick access
- **Customizable Settings**: Personalize colors, positions, and behavior
- **Import/Export Settings**: Backup and restore your preferences

## Installation

### From Chrome Web Store (Recommended)
1. Visit the Chrome Web Store (link will be available after publication)
2. Click "Add to Chrome"
3. Confirm the installation

### Manual Installation (Developer Mode)
1. Download or clone this repository
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" in the top right corner
4. Click "Load unpacked" and select the extension folder
5. The extension should now appear in your extensions list

## Usage

### Popup Interface
- Click the CodePal Helper icon in the Chrome toolbar
- Use the quick action buttons for immediate functionality
- View current page information
- Toggle settings on/off

### Available Actions
- **Highlight Code**: Manually highlight all code blocks on the current page
- **Extract Links**: Gather all links from the page (results in console)
- **Count Words**: Get word count, character count, and page statistics

### Settings & Options
- Right-click the extension icon and select "Options"
- Or click the "Options" button in the popup
- Customize colors, notification positions, and behavior
- Set up excluded sites where the extension won't run

## File Structure

```
/
├── manifest.json          # Extension configuration
├── popup/
│   ├── popup.html         # Popup interface
│   ├── popup.css          # Popup styles
│   └── popup.js           # Popup functionality
├── content/
│   ├── content.js         # Content script (runs on web pages)
│   └── content.css        # Content script styles
├── background/
│   └── background.js      # Background service worker
├── options/
│   ├── options.html       # Settings page
│   ├── options.css        # Settings page styles
│   └── options.js         # Settings functionality
├── icons/
│   ├── icon16.png         # 16x16 icon
│   ├── icon32.png         # 32x32 icon
│   ├── icon48.png         # 48x48 icon
│   └── icon128.png        # 128x128 icon
└── README.md              # This file
```

## Permissions

The extension requires the following permissions:
- `activeTab`: Access to the current active tab
- `storage`: Save and sync user preferences
- `tabs`: Basic tab information access
- `host_permissions`: Access to web pages for content script functionality

## Development

### Prerequisites
- Chrome browser
- Basic knowledge of HTML, CSS, and JavaScript
- Understanding of Chrome Extension APIs

### Making Changes
1. Edit the relevant files
2. Go to `chrome://extensions/`
3. Click the refresh icon on the CodePal Helper extension
4. Test your changes

### Key Components

#### Manifest (manifest.json)
- Defines extension metadata and permissions
- Specifies which files to load and when

#### Popup (popup/)
- User interface when clicking the extension icon
- Quick access to main features
- Real-time page information display

#### Content Script (content/)
- Runs on web pages
- Handles DOM manipulation and page interaction
- Communicates with popup and background scripts

#### Background Script (background/)
- Handles extension lifecycle events
- Manages cross-tab functionality
- Handles context menus and notifications

#### Options Page (options/)
- Full settings and configuration interface
- Import/export functionality
- Advanced customization options

## API Usage

### Chrome Storage API
```javascript
// Save settings
chrome.storage.sync.set({ key: value });

// Load settings
chrome.storage.sync.get(['key'], (result) => {
  console.log(result.key);
});
```

### Chrome Tabs API
```javascript
// Get current tab
chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  const currentTab = tabs[0];
});
```

### Message Passing
```javascript
// Send message from popup to content script
chrome.tabs.sendMessage(tabId, { action: 'highlightCode' });

// Listen for messages in content script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'highlightCode') {
    // Handle the action
  }
});
```

## Troubleshooting

### Extension Not Working
1. Check if Developer mode is enabled
2. Verify all files are in the correct locations
3. Check the Chrome console for errors (`Ctrl+Shift+I`)
4. Try reloading the extension

### Content Script Not Running
1. Check if the site allows content scripts
2. Verify manifest permissions are correct
3. Check for JavaScript errors in the page console

### Settings Not Saving
1. Verify storage permissions in manifest
2. Check for quota exceeded errors
3. Try clearing extension storage

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the MIT License.

## Support

For support, feature requests, or bug reports:
- Create an issue on GitHub
- Email: support@codepal.com
- Documentation: Check the wiki section

## Version History

### v1.0.0
- Initial release
- Basic code highlighting functionality
- Link extraction feature
- Word counting tool
- Settings and options page
- Auto-highlighting capability

---

**CodePal Helper** - Making web development easier, one page at a time.