// Content script for CodePal Helper extension
console.log('CodePal Helper content script loaded');

// Listen for messages from popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  switch (request.action) {
    case 'highlightCode':
      highlightCodeBlocks();
      sendResponse({ success: true });
      break;
    case 'extractLinks':
      extractLinks();
      sendResponse({ success: true });
      break;
    case 'countWords':
      countWords();
      sendResponse({ success: true });
      break;
    default:
      sendResponse({ success: false, error: 'Unknown action' });
  }
});

// Highlight code blocks on the page
function highlightCodeBlocks() {
  const codeBlocks = document.querySelectorAll('code, pre, .code, .highlight');
  let count = 0;

  codeBlocks.forEach(block => {
    if (!block.classList.contains('codepal-highlighted')) {
      block.classList.add('codepal-highlighted');
      block.style.border = '2px solid #1a73e8';
      block.style.borderRadius = '4px';
      block.style.boxShadow = '0 2px 8px rgba(26, 115, 232, 0.2)';
      count++;
    }
  });

  showNotification(`Highlighted ${count} code blocks`);
}

// Extract all links from the page
function extractLinks() {
  const links = Array.from(document.querySelectorAll('a[href]'))
    .map(link => ({
      text: link.textContent.trim(),
      url: link.href
    }))
    .filter(link => link.text && link.url);

  console.log('Extracted links:', links);
      
  // Create a temporary display
  const linksList = links.slice(0, 10).map(link => 
    `${link.text}: ${link.url}`
  ).join('\n');

  showNotification(`Found ${links.length} links (check console for full list)`);
}

// Count words on the page
function countWords() {
  const textContent = document.body.innerText || document.body.textContent || '';
  const words = textContent.trim().split(/\s+/).filter(word => word.length > 0);
  const characters = textContent.length;
  const charactersNoSpaces = textContent.replace(/\s/g, '').length;

  const stats = {
    words: words.length,
    characters: characters,
    charactersNoSpaces: charactersNoSpaces,
    paragraphs: document.querySelectorAll('p').length
  };

  console.log('Page statistics:', stats);
  showNotification(`Words: ${stats.words} | Characters: ${stats.characters}`);
}

// Show notification on page
function showNotification(message) {
  // Remove existing notification
  const existing = document.getElementById('codepal-notification');
  if (existing) {
    existing.remove();
  }

  // Create notification element
  const notification = document.createElement('div');
  notification.id = 'codepal-notification';
  notification.className = 'codepal-notification';
  notification.textContent = message;

  // Add to page
  document.body.appendChild(notification);

  // Remove after 3 seconds
  setTimeout(() => {
    notification.remove();
  }, 3000);
}

// Auto-highlight code blocks if setting is enabled
chrome.storage.sync.get(['autoHighlight']).then(result => {
  if (result.autoHighlight) {
    setTimeout(highlightCodeBlocks, 1000);
  }
});

// Listen for dynamic content changes
const observer = new MutationObserver((mutations) => {
  chrome.storage.sync.get(['autoHighlight']).then(result => {
    if (result.autoHighlight) {
      highlightCodeBlocks();
    }
  });
});

observer.observe(document.body, {
  childList: true,
  subtree: true
});