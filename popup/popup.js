document.addEventListener('DOMContentLoaded', async () => {
  // Get current tab information
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      
  // Update UI with current tab info
  document.getElementById('currentUrl').textContent = tab.url;
  document.getElementById('currentTitle').textContent = tab.title;

  // Load saved settings
  const result = await chrome.storage.sync.get(['autoHighlight']);
  document.getElementById('autoHighlight').checked = result.autoHighlight || false;

  // Button event listeners
  document.getElementById('highlightBtn').addEventListener('click', () => {
    executeContentScript('highlightCode');
  });

  document.getElementById('extractLinksBtn').addEventListener('click', () => {
    executeContentScript('extractLinks');
  });

  document.getElementById('countWordsBtn').addEventListener('click', () => {
    executeContentScript('countWords');
  });

  document.getElementById('optionsBtn').addEventListener('click', () => {
    chrome.runtime.openOptionsPage();
  });

  document.getElementById('aboutBtn').addEventListener('click', () => {
    showAbout();
  });

  // Settings event listeners
  document.getElementById('autoHighlight').addEventListener('change', (e) => {
    chrome.storage.sync.set({ autoHighlight: e.target.checked });
  });

  // Execute content script functions
  async function executeContentScript(action) {
    try {
      await chrome.tabs.sendMessage(tab.id, { action });
      showStatus('Action completed successfully!', 'success');
    } catch (error) {
      showStatus('Error: ' + error.message, 'error');
    }
  }

  // Show status message
  function showStatus(message, type) {
    const existingStatus = document.querySelector('.status');
    if (existingStatus) {
      existingStatus.remove();
    }

    const status = document.createElement('div');
    status.className = `status ${type}`;
    status.textContent = message;
        
    document.querySelector('.container').appendChild(status);
        
    setTimeout(() => {
      status.remove();
    }, 3000);
  }

  // Show about information
  function showAbout() {
    showStatus('CodePal Helper v1.0.0 - A helpful Chrome extension', 'success');
  }
});