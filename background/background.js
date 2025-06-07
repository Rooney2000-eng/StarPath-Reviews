// Background script for CodePal Helper extension
console.log('CodePal Helper background script loaded');

// Handle extension installation
chrome.runtime.onInstalled.addListener((details) => {
  console.log('Extension installed:', details);
      
  // Set default settings
  chrome.storage.sync.set({
    autoHighlight: false,
    version: '1.0.0'
  });

  // Show welcome notification
  if (details.reason === 'install') {
    chrome.notifications.create({
      type: 'basic',
      iconUrl: '../icons/icon48.png',
      title: 'CodePal Helper Installed!',
      message: 'Click the extension icon to get started.'
    });
  }
});

// Handle extension startup
chrome.runtime.onStartup.addListener(() => {
  console.log('Extension started');
});

// Handle tab updates
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.url) {
    // Check if auto-highlight is enabled
    chrome.storage.sync.get(['autoHighlight']).then(result => {
      if (result.autoHighlight) {
        // Send message to content script to highlight code
        chrome.tabs.sendMessage(tabId, { action: 'highlightCode' }).catch(() => {
          // Ignore errors (tab might not have content script)
        });
      }
    });
  }
});

// Handle messages from content scripts and popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log('Background received message:', request);

  switch (request.action) {
    case 'getTabInfo':
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        sendResponse({ tab: tabs[0] });
      });
      return true; // Keep channel open for async response

    case 'saveData':
      chrome.storage.sync.set(request.data, () => {
        sendResponse({ success: true });
      });
      return true;

    case 'getData':
      chrome.storage.sync.get(request.keys, (result) => {
        sendResponse({ data: result });
      });
      return true;

    default:
      sendResponse({ success: false, error: 'Unknown action' });
  }
});

// Handle context menu (optional feature)
chrome.contextMenus.create({
  id: 'codepal-highlight',
  title: 'Highlight code blocks',
  contexts: ['page']
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === 'codepal-highlight') {
    chrome.tabs.sendMessage(tab.id, { action: 'highlightCode' });
  }
});

// Periodic cleanup (optional)
setInterval(() => {
  // Clean up old data or perform maintenance tasks
  console.log('Background script maintenance check');
}, 60000 * 60); // Every hour