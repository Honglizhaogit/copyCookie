


const btn = document.getElementById('btn');

const urlRegex = /^(?:https?:\/\/)?(?:www\.)?((?:[\w.-]+\.[a-zA-Z]{2,})|(?:\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}))(?::\d+)?(?:\/[\w-]*)*\/?$/;

btn.addEventListener('click', async () => {
    let sourceUrl = document.getElementById('source').value;
    let targetUrl = document.getElementById('target').value;

    if (!targetUrl) {
        alert('请输入目标地址');
        return;
    }

    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    const source = sourceUrl || tab.url;
    chrome.cookies.getAll({ url: source }, (cookies) => {
        cookies.forEach(item => {
            const configCookie = {
                url: targetUrl,
                name: item.name,
                value: item.value,
            }
            chrome.cookies.set(configCookie)
        })
        alert('运行结束,复制了' + cookies.length + '条cookie');
    })
});



