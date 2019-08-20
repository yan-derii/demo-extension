export class ChromeService {
    static sendMessage (message, onResponse) {
        chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, message /*, setCount */)
        });
    }
}