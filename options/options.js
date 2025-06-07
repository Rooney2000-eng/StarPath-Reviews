document.addEventListener('DOMContentLoaded', loadOptions);

// Default settings
const defaultSettings = {
  autoHighlight: false,
  showNotifications: true,
  contextMenu: true,
  highlightColor: '#1a73e8',
  notificationPosition: 'top-right',
  excludedSites: ''
};

// Load saved options
async function loadOptions() {
  try {
    const result = await chrome.storage.sync.get(defaultSettings);
    
    document.getElementById('autoHighlight').checked = result.autoHighlight;
    document.getElementById('showNotifications').checked = result.showNotifications;
    document.getElementById('contextMenu').checked = result.contextMenu;
    document.getElementById('highlightColor').value = result.highlightColor;
    document.getElementById('notificationPosition').value = result.notificationPosition;
    document.getElementById('excludedSites').value = result.excludedSites;
    
    console.log('Options loaded:', result);
  } catch (error) {
    showStatus('Error loading options: ' + error.message, 'error');
  }
}

// Save options
async function saveOptions() {
  try {
    const settings = {
      autoHighlight: document.getElementById('autoHighlight').checked,
      showNotifications: document.getElementById('showNotifications').checked,
      contextMenu: document.getElementById('contextMenu').checked,
      highlightColor: document.getElementById('highlightColor').value,
      notificationPosition: document.getElementById('notificationPosition').value,
      excludedSites: document.getElementById('excludedSites').value
    };
    
    await chrome.storage.sync.set(settings);
    showStatus('Settings saved successfully!', 'success');
    console.log('Options saved:', settings);
  } catch (error) {
    showStatus('Error saving options: ' + error.message, 'error');
  }
}

// Reset to defaults
async function resetOptions() {
  if (confirm('Are you sure you want to reset all settings to defaults?')) {
    try {
      await chrome.storage.sync.set(defaultSettings);
      await loadOptions();
      showStatus('Settings reset to defaults!', 'success');
    } catch (error) {
      showStatus('Error resetting options: ' + error.message, 'error');
    }
  }
}

// Export settings
function exportSettings() {
  chrome.storage.sync.get(null, (result) => {
    const dataStr = JSON.stringify(result, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    
    const link = document.createElement('a');
    link.href = URL.createObjectURL(dataBlob);
    link.download = 'codepal-helper-settings.json';
    link.click();
    
    showStatus('Settings exported successfully!', 'success');
  });
}

// Import settings
function importSettings() {
  document.getElementById('importFile').click();
}

// Handle file import
function handleFileImport(event) {
  const file = event.target.files[0];
  if (!file) return;
  
  const reader = new FileReader();
  reader.onload = async (e) => {
    try {
      const settings = JSON.parse(e.target.result);
      await chrome.storage.sync.set(settings);
      await loadOptions();
      showStatus('Settings imported successfully!', 'success');
    } catch (error) {
      showStatus('Error importing settings: ' + error.message, 'error');
    }
  };
  reader.readAsText(file);
}

// Show status message
function showStatus(message, type) {
  const status = document.getElementById('status');
  status.textContent = message;
  status.className = `status ${type}`;
  status.classList.remove('hidden');
  
  setTimeout(() => {
    status.classList.add('hidden');
  }, 3000);
}

// Event listeners
document.getElementById('saveBtn').addEventListener('click', saveOptions);
document.getElementById('resetBtn').addEventListener('click', resetOptions);
document.getElementById('exportBtn').addEventListener('click', exportSettings);
document.getElementById('importBtn').addEventListener('click', importSettings);
document.getElementById('importFile').addEventListener('change', handleFileImport);

// Help and feedback links
document.getElementById('helpLink').addEventListener('click', (e) => {
  e.preventDefault();
  chrome.tabs.create({ url: 'https://github.com/codepal/helper/wiki' });
});

document.getElementById('feedbackLink').addEventListener('click', (e) => {
  e.preventDefault();
  chrome.tabs.create({ url: 'mailto:feedback@codepal.com' });
});

document.getElementById('changelog').addEventListener('click', (e) => {
  e.preventDefault();
  showStatus('Changelog: Initial release v1.0.0 - Basic functionality', 'success');
});

// Auto-save on change
document.querySelectorAll('input, select, textarea').forEach(element => {
  element.addEventListener('change', () => {
    setTimeout(saveOptions, 500); // Auto-save after 500ms
  });
});